import React from 'react'
import css from './size.module.css'
import { SizeWithSrc } from '../../types'
import { getUrl } from '../../helpers'

interface Props extends SizeWithSrc {
	compress: boolean
}

const Size: React.FC<Props> = props => {
	const url = getUrl(props.src, props.width, props.height, props.compress)

	return (
		<div>
			<h2>
				{props.app} — {props.name}
			</h2>
			<p>
				{props.width}x{props.height}
			</p>
			<img
				className={css.sizeImg}
				src={url}
				width={props.width}
				height={props.height}
				alt={`${props.name} for ${props.app} (${props.width}x${props.height})`}
			/>
		</div>
	)
}

export default Size
