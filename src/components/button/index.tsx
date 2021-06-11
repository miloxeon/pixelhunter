import React from 'react'
import css from './button.module.css'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => (
	<button
		type='button'
		{...props}
		className={[css.accent, (props.className || '')].join(' ')}
	/>
)

export default Button
