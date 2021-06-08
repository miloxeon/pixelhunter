import React from 'react'
import { Target as TargetType } from '../../types'
import { getSizeKey } from '../../helpers'
import Size from '../size'
import css from './target.module.css'
interface Props extends TargetType {
	compress: boolean,
	src: string,
}

const Target: React.FC<Props> = props => {

	// sort sizes by aspect ratio — taller ones come first
	const sortedSizes = [...props.sizes].sort((a, b) => {
		return (b.height / b.width) - (a.height / a.width)
	})

	return (
		<div className={css.root}>
			<h2>
				{props.app}
			</h2>
			<p>
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
		</div>
	)
}

export default Target
