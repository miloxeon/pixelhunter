import React from 'react'
import { getSizeKey, nameToId } from '../../helpers'
import Size from '../size'
import css from './target.module.css'
import { TargetApp } from '../../sizes'
import { UCMeta } from '../../types'
import { TabsEnum } from '../tabs'
// @ts-ignore
import butter from 'image-butter'
interface Props extends TargetApp {
	ucMeta: UCMeta,
	src: string,
	mode: TabsEnum
}

const Target: React.FC<Props> = props => {

	React.useEffect(() => {
		butter()
	}, [props.src])

	// sort sizes by aspect ratio — taller ones come first
	const sortedSizes = [...props.sizes].sort((a, b) => {
		const byRatio = (a.width / a.height) - (b.width / b.height)
		if (byRatio !== 0) return byRatio
		return b.height - a.height
	})

	const targetId = nameToId(props.app)

	return (
		<article className={css.root} aria-labelledby={targetId}>
			<header>
				<img
					className={css.image}
					src={props.logoSrc}
					width={40}
					height={40}
					alt=''
					aria-hidden={true}
				/>
				<h2 className={css.heading} id={targetId}>
					Pictures for {props.app}
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

					const sizeRest = {
						...size,
						description: props.mode === TabsEnum.simple ? size.description : undefined,
						positionSrc: props.mode === TabsEnum.simple ? size.positionSrc : undefined,
					}

					return (
						<Size
							key={key}
							ucMeta={props.ucMeta}
							src={props.src}
							app={props.app}
							{...sizeRest}
						/>
					)
				})}
			</div>
		</article>
	)
}

export default Target
