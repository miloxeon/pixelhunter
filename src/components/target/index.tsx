import React from 'react'
import { Target as TargetType } from '../../types'
import { getSizeKey } from '../../helpers'
import Size from '../size'

interface Props extends TargetType {
	compress: boolean,
	src: string,
}

const Target: React.FC<Props> = props => {
	return (
		<div>
			<h2>
				{props.app}
			</h2>
			<p>
				{props.description}
			</p>

			{props.sizes.map(size => {
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
	)
}

export default Target
