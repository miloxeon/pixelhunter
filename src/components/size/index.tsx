import React from 'react'
import Tilt, { HTMLVanillaTiltElement } from 'vanilla-tilt'
import { useImageZoom } from 'react-medium-image-zoom'
import { FiArrowDown } from 'react-icons/fi'
import css from './size.module.css'
import { SizeWithSrc } from '../../types'
import { getUrl, getCrookedUrl, getSizeKey } from '../../helpers'

interface Props extends SizeWithSrc {
	compress: boolean,
	app: string,
}

const zoomDuration = 300
const tiltSpeed = zoomDuration

const Size: React.FC<Props> = props => {
	const url = getUrl(props.src, props.width, props.height, props.compress)
	const previewUrl = getCrookedUrl(props.src, props.width, props.height, props.compress)
	const alt = getSizeKey(props)
	const id = `${props.app}${props.name}${props.width}x${props.height}`.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '')
	const tiltWrapperRef = React.useRef<HTMLDivElement & HTMLVanillaTiltElement>(null)

	const [isZoomed, setIsZoomed] = React.useState<boolean>(false)
	const [loaded, setLoaded] = React.useState<boolean>(true)

	const { ref: zoomRef } = useImageZoom({
		onZoomChange: setIsZoomed,
		transitionDuration: zoomDuration,
		overlayBgColor: 'var(--b)',
		zoomMargin: 30,
	})

	React.useEffect(() => {
		const current = tiltWrapperRef.current
		if (!current) return

		if (!isZoomed && !current.vanillaTilt) {
			setTimeout(() => Tilt.init(current, {
				max: 3,
				perspective: 2000,
				scale: 1.02,
				easing: 'cubic-bezier(.17, .67, .24, 1.01)',
				glare: true,
				'max-glare': 0.5,
				'mouse-event-element': `#${id}`,
				speed: tiltSpeed,
				transition: false,
			}), zoomDuration)
		}

		return () => current?.vanillaTilt?.destroy()
	}, [isZoomed, id])

	const detectButterLoading = React.useCallback(e => {
		const classList = e.target.classList
		const imgLoaded =
			classList.contains('butter-loaded') ||
			!classList.contains('butter-loading')
		setLoaded(imgLoaded)
	}, [])

	return (
		<div className={css.root}>
			<h3 className={css.heading}>
				{props.name}
			</h3>

			<div className={loaded ? css.imageWrapper : css.imageWrapperGhost} id={id}>
				<div className={css.imgTiltWrapper} ref={tiltWrapperRef} data-tilt>
					<div
						ref={zoomRef as React.Ref<HTMLDivElement>}
						className={!isZoomed ? css.fakeImageWrapper : css.fakeImageWrapperZoomed}
					>
						<img
							className={css.fakeImage}
							src={previewUrl}
							width={props.width + 1}
							height={props.height + 1}
							alt=''
							aria-hidden={true}
						/>
					</div>
					<img
						className={css.image}
						src={previewUrl}
						width={props.width + 1}
						height={props.height + 1}
						alt={alt}
						onAnimationEnd={detectButterLoading}
					/>
					<div className={css.infoOverlay}>
						<div className={css.infoOverlayContent}>
							<p className={css.infoOverlayText}>
								PNG, {props.width}x{props.height}
							</p>
							<a
								className={css.download}
								href={url}
								target='_blank'
								rel='noreferrer'
								download={`${alt}.png`}
								aria-label={`Download ${alt}.png`}
								title={`Download ${alt}.png`}
							>
								<FiArrowDown aria-hidden={true} />
							</a>
						</div>
					</div>
					<div className={css.gradient} aria-hidden={true} />
				</div>
			</div>
		</div>
	)
}

export default Size
