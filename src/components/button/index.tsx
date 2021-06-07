import React from 'react'
import css from './button.module.css'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => (
	<button
		type='button'
		className={css.accent}
		{...props}
	/>
)

export default Button
