import React from 'react'
import css from './size.module.css'

const ensureEndingWithSlash = (str: string) => {
	const lastSymbol = str[str.length - 1]
	if (lastSymbol === '/') return str
	return `${str}/`
}

interface Props {
	src: string,
	app: string,
	name: string,
	width: number,
	height: number,
}

const Size: React.FC<Props> = props => {
	const srcWithSlash = ensureEndingWithSlash(props.src)
	const thisSizeSrc = `${srcWithSlash}-/scale_crop/${props.width}x${props.height}/smart/-/quality/smart/`

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
				src={thisSizeSrc}
				width={props.width}
				height={props.height}
				alt={`${props.name} for ${props.app} (${props.width}x${props.height})`}
			/>
		</div>
	)
}

export default Size
