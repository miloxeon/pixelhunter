import React from 'react'
import css from './container.module.css'

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
	const {
		className = '',
		...rest
	} = props
	return (
		<div className={[css.root, className].join(' ')} {...rest}>
			{ props.children}
		</div>
	)
}

export default Container
