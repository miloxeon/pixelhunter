import React from 'react'
import Tilt, { HTMLVanillaTiltElement } from 'vanilla-tilt'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FiArrowDown } from 'react-icons/fi'
import css from './size.module.css'
import { SizeWithSrc } from '../../types'
import { getUrl, getSizeKey } from '../../helpers'

interface Props extends SizeWithSrc {
	compress: boolean,
	app: string,
}

const zoomDuration = 300
const tiltSpeed = zoomDuration

const Size: React.FC<Props> = props => {
	const url = getUrl(props.src, props.width, props.height, props.compress)
	const alt = getSizeKey(props)
	const id = `${props.app}${props.name}${props.width}x${props.height}`.replaceAll(' ', '')
	const tiltWrapperRef = React.useRef<HTMLDivElement & HTMLVanillaTiltElement>(null)

	const [isZoomed, setIsZoomed] = React.useState<boolean>(false)

	const handleZoomChange = React.useCallback(shouldZoom => {
		// if (shouldZoom) tiltWrapperRef.current?.vanillaTilt?.destroy()
		setIsZoomed(shouldZoom)
	}, [])

	// React.useEffect(() => {
	// 	const current = tiltWrapperRef.current
	// 	if (!current) return

	// 	if (!isZoomed && !current.vanillaTilt) {
	// 		setTimeout(() => Tilt.init(current, {
	// 			max: 3,
	// 			perspective: 2000,
	// 			scale: 1.02,
	// 			easing: 'cubic-bezier(.17, .67, .24, 1.01)',
	// 			glare: true,
	// 			'max-glare': 0.5,
	// 			'mouse-event-element': `#${id}`,
	// 			speed: tiltSpeed,
	// 			transition: false,
	// 		}), zoomDuration)
	// 	}

	// 	return () => current?.vanillaTilt?.destroy()
	// }, [isZoomed, id])

	return (
		<div className={css.root}>
			<h3 className={css.heading}>
				{props.name}
			</h3>

			<div className={css.imageWrapper} id={id}>
				<ControlledZoom
					isZoomed={isZoomed}
					onZoomChange={handleZoomChange}
					transitionDuration={zoomDuration}
					overlayBgColorEnd='var(--b)'
					zoomMargin={30}
					wrapStyle={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 3,
					}}
				>
					<img
						className={!isZoomed ? css.fakeImage : css.fakeImageZoomed}
						src={url}
						width={props.width}
						height={props.height}
						alt=''
						aria-hidden={true}
					/>
				</ControlledZoom>
				<div className={css.imgTiltWrapper} ref={tiltWrapperRef}>
					<img
						className={css.image}
						src={url}
						width={props.width}
						height={props.height}
						alt={alt}
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
