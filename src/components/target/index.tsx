import React from 'react'
import { getSizeKey } from '../../helpers'
import Size from '../size'
import css from './target.module.css'
import { TargetApp } from '../../sizes'

// @ts-ignore
import butter from 'image-butter'
interface Props extends TargetApp {
	compress: boolean,
	src: string,
}

const Target: React.FC<Props> = props => {

	React.useEffect(() => {
		butter()
	}, [props.src])

	// sort sizes by aspect ratio — taller ones come first
	const sortedSizes = [...props.sizes].sort((a, b) => {
		const byRatio = (a.width / a.height) - (b.width / b.height)
		if (byRatio !== 0) return byRatio
		return b.height - a.height
	})

	const targetId = props.app

	return (
		<article className={css.root} aria-labelledby={targetId}>
			<header className={css.header}>
				<img
					src={props.logoSrc}
					width={40}
					height={40}
					alt=''
					aria-hidden={true}
				/>
				<h2 className={css.heading} id={targetId}>
					{props.app}
				</h2>
			</header>

			<p className={css.description}>
				{props.description}
			</p>

			<div className={css.grid}>
				{sortedSizes.map(size => {
					const key = getSizeKey({
						...size,
						app: props.app
					})
					return (
						<Size
							key={key}
							compress={props.compress}
							src={props.src}
							app={props.app}
							{...size}
						/>
					)
				})}
			</div>
		</article>
	)
}

export default Target
