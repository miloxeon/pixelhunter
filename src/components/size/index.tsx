import React from 'react'
import Tilt from 'vanilla-tilt'
import { FiArrowDown } from 'react-icons/fi'
import css from './size.module.css'
import { SizeWithSrc } from '../../types'
import { getUrl, getSizeKey } from '../../helpers'

interface Props extends SizeWithSrc {
	compress: boolean,
	app: string,
}

type TiltedElement = {
	vanillaTilt: {
		destroy: () => void
	}
}

const Size: React.FC<Props> = props => {
	const url = getUrl(props.src, props.width, props.height, props.compress)
	const alt = getSizeKey(props)
	const imageWrapperRef = React.useRef<HTMLDivElement & TiltedElement>(null)

	React.useEffect(() => {
		const current = imageWrapperRef.current
		if (!current) return
		Tilt.init(current, {
			max: 3,
			perspective: 2000,
			scale: 1.02,
			easing: 'cubic-bezier(.17, .67, .24, 1.01)',
		})

		return () => current && current.vanillaTilt?.destroy()
	}, [])

	return (
		<div>
			<h3>
				{props.name}
			</h3>

			<div className={css.imageWrapper} ref={imageWrapperRef}>
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
	)
}

export default Size
