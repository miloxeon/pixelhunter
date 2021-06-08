import React from 'react'
import css from './container.module.css'

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
	return (
		<div className={css.root} {...props}>
			{ props.children}
		</div>
	)
}

export default Container
