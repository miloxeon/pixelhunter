import React from 'react'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { CSSTransition } from 'react-transition-group'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiArrowDown } from 'react-icons/fi'
import { downloadSizes, mimeToExtension, getSimpleModeSizes } from './helpers'
import { SizeWithSrc, UCMeta } from './types'
import { detect } from 'detect-browser'
import sizes from './sizes.json'
import css from './app.module.css'

import Button from './components/button'
import Container from './components/container'
import Target from './components/target'
import Tabs, { TabsEnum } from './components/tabs'
// import target from './components/target'
import PoweredBy from './components/poweredBy'

const timeouts = {
	appear: 2000,
	enter: 500,
	exit: 500,
}

const simpleModeImages = getSimpleModeSizes(sizes)

const advancedModeLogos = sizes.map(target => ({
	logoSrc: target.logoSrc,
	app: target.app,
}))

const sizesCount = sizes.map(target => target.sizes.length).reduce((a, b) => a + b, 0)

const sizePlural = sizesCount.toString().split('').pop() === '1' ? 'size' : 'sizes'

const browserInfo = detect()
const isSafari = !browserInfo || browserInfo.name === 'safari' || browserInfo.name === 'ios'

const App: React.FC = () => {
	// bright
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/15f79d17-2619-46e6-b120-8fc7f58f50a4/')

	// dim
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/0c17d734-460a-4d79-9824-30b6e6378181/')

	// demo (cat on blue background)
	const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/b2f5992e-49bb-4fe4-b0e3-ad78dfa109e9/')

	const [loading, setLoading] = React.useState<boolean>(false)
	const [activeTab, setActiveTab] = React.useState<TabsEnum>(TabsEnum.simple)

	const [ucMeta, setUcMeta] = React.useState<UCMeta>({
		compress: false,
		extension: 'jpg'
	})

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		setSrc(fileInfo.cdnUrl)
		setUcMeta({
			...ucMeta,
			extension: mimeToExtension(fileInfo.mimeType)
		})
	}, [ucMeta])

	// demo
	const downloadAll = React.useCallback(() => {
		if (!src) return

		const sizesToDownload = Array.from(
			document.querySelectorAll('[data-checkbox]:checked')
		).map(node => {
			const checkbox = node as HTMLInputElement
			const { app, name, width, height } = checkbox.dataset
			if (!app || !name || !width || !height) return null

			return {
				app,
				name,
				width: parseInt(width, 10),
				height: parseInt(height, 10),
				src
			}
		}).filter(Boolean) as SizeWithSrc[]

		if (sizesToDownload.length === 0) return

		setLoading(true)
		downloadSizes(sizesToDownload, ucMeta).finally(() => setLoading(false))
	}, [ucMeta, src])

	return (
		<>
			<Container>
				<div className={css.hero} id='hero'>
					<div className={css.content}>
						{!isSafari ? (
							<h1 className={css.h1}>
								Pixel&shy;hunter&nbsp;— free AI image resizer for <span className={css.rose}>social media.</span>
							</h1>
						) : (
							<h1 className={css.h1}>
								Pixel&shy;hunter&nbsp;— free AI image resizer for social media.
							</h1>
						)}

						<p className={css.p}>
							Cropping each and every image by hand can be tiresome. Pixelhunter utulizes amazing <strong>Uploadcare Intelligence API</strong> to <strong>recognize objects and crop pictures automatically</strong>, in a smarter way.
						</p>
						<p className={css.p}>
							Just upload your image of any size and it will be automatically resized to each and every of <strong>{sizesCount} {sizePlural}</strong> we support. AI is there to ensure that your image is resized in the best way that a robot can do.
						</p>
						<p className={css.p}>
							Other than that, Pixelhunter features <strong>real pro-tips</strong> that are there to actually help you and not just to fill up the space.
						</p>

						<PoweredBy />

						<div className={css.upload}>
							<div className={css.uploaderWrapper}>
								<UploadcareUpload
									publicKey='3828f4d78b7de9c98461'
									onChange={uploadOnChange}
								/>
							</div>

							<div className={css.support}>
								<h2 className={css.h2}>
									We support:
								</h2>
								<div className={css.grid}>
									{advancedModeLogos.map(appInfo => {
										return (
											<img
												className={css.infoLogo}
												key={appInfo.app}
												src={appInfo.logoSrc}
												width={40}
												height={40}
												alt={`Images for ${appInfo.app}`}
												title={`Images for ${appInfo.app}`}
											/>
										)
									})}
								</div>
							</div>
						</div>
						{ src !== null && (
							<Tabs
								onChange={setActiveTab}
								value={activeTab}
							/>
						)}
					</div>
					<div className={css.background}>
						<div className={css.likeImageWrapper}>
							<img
								width={1000}
								height={910}
								src="like.png"
								alt=''
							/>
						</div>
						<div className={css.instagramImageWrapper}>
							<img
								width={1000}
								height={1000}
								src="instagram.png"
								alt=''
							/>
						</div>
						<div className={css.heartImageWrapper}>
							<img
								width={1000}
								height={860}
								src="heart.png"
								alt=''
							/>
						</div>
					</div>
				</div>
			</Container>
			
			{src !== null && (
				<div className={css.tabsWrapper}>
					{ src !== null && (
						<Button
							className={css.download}
							onClick={downloadAll}
							aria-busy={loading}
						>
							{ loading ? (
								<AiOutlineLoading3Quarters className={css.loading} />
							) : (
								<FiArrowDown className={css.arrowDown} />
							)}
							{ loading ? 'Loading...' : 'Download all'}
						</Button>
					)}

					<CSSTransition
						classNames="tab"
						in={activeTab === TabsEnum.simple}
						timeout={timeouts}
						appear
					>
						<Container className={css.tab}>
							{simpleModeImages.map(target => {
								return (
									<Target
										mode={TabsEnum.simple}
										key={target.app}
										ucMeta={ucMeta}
										src={src}
										{...target}
									/>
								)
							})}
						</Container>
					</CSSTransition>
					<CSSTransition
						classNames="tab"
						in={activeTab === TabsEnum.advanced}
						timeout={timeouts}
						appear
					>
						<Container className={css.tab}>
							{sizes.map(target => {
								return (
									<Target
										mode={TabsEnum.advanced}
										key={target.app}
										ucMeta={ucMeta}
										src={src}
										{...target}
									/>
								)
							})}
						</Container>
					</CSSTransition>
				</div>
			)}
		</>
	)
}

export default App
