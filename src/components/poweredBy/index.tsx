import React from 'react'
import UC from './uc.svg'
import MV from './mv.png'
import css from './poweredBy.module.css'

const PoweredBy: React.FC = () => {
	return (
		<div className={css.root}>
			<div className={css.ucInfo}>
				<p className={css.p}>Powered&nbsp;by</p>
				<br />
				<p className={css.p}>Sponsored&nbsp;by</p>
			</div>
			<p className={[css.p, css.mvInfo].join(' ')}>Made&nbsp;by</p>
			<a href='https://uploadcare.com' target='_blank' rel='noreferrer' className={css.ucLogo} title='Uploadcare' aria-label='Uploadcare'>
				<img src={UC} width={59} height={59} alt='' />
			</a>
			{/* eslint-disable-next-line */}
			<a href='https://miloxeon.com' target='_blank' className={css.mvLogo} title='Milo Xeon' aria-label='Milo Xeon'>
				<img src={MV} width={59} height={59} alt='' />
			</a>
		</div>
	)
}

export default PoweredBy
