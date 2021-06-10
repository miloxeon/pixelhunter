import React from 'react'
import Tilt, { HTMLVanillaTiltElement } from 'vanilla-tilt'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { CSSTransition } from 'react-transition-group'
import { downloadSizes, mimeToExtension, getSimpleModeSizes } from './helpers'
import { UCMeta } from './types'
import sizes from './sizes.json'
import css from './app.module.css'

import Button from './components/button'
import Container from './components/container'
import Target from './components/target'
import Tabs, { TabsEnum } from './components/tabs'

// prefetch link
// hero
// checkboxes
// download all
// footer

// text info about simple mode sizes
// simple mode sizes' positions

const timeouts = {
	appear: 2000,
	enter: 500,
	exit: 500,
}

const simpleModeImages = getSimpleModeSizes(sizes)

const App: React.FC = () => {
	// bright
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/15f79d17-2619-46e6-b120-8fc7f58f50a4/')

	// dim
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/0c17d734-460a-4d79-9824-30b6e6378181/')

	// demo (cat on blue background)
	const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/b2f5992e-49bb-4fe4-b0e3-ad78dfa109e9/')

	const [loading, setLoading] = React.useState<boolean>(false)
	const [activeTab, setActiveTab] = React.useState<TabsEnum>(TabsEnum.simple)
	const likeImageRef = React.useRef<HTMLImageElement & HTMLVanillaTiltElement>(null)
	const instagramImageRef = React.useRef<HTMLImageElement & HTMLVanillaTiltElement>(null)
	const heartImageRef = React.useRef<HTMLImageElement & HTMLVanillaTiltElement>(null)

	const [ucMeta, setUcMeta] = React.useState<UCMeta>({
		compress: false,
		extension: 'jpg'
	})

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		console.log(fileInfo)
		setSrc(fileInfo.cdnUrl)
		setUcMeta({
			...ucMeta,
			extension: mimeToExtension(fileInfo.mimeType)
		})
	}, [ucMeta])

	// demo
	const downloadAll = React.useCallback(() => {
		if (!src) return
		setLoading(true)
		const sizesForSimpleMode = sizes.map(target => [...target.sizes.map(
			size => ({
				...size,
				app: target.app
			})
		)]).flat()
		const sizesToDownload = sizesForSimpleMode.map(size => ({ ...size, src }))
		downloadSizes(sizesToDownload, ucMeta).finally(() => setLoading(false))
	}, [ucMeta, src])

	const onCompressCheck = React.useCallback(e => {
		setUcMeta({
			...ucMeta,
			compress: e.target.checked
		})
	}, [ucMeta])

	React.useEffect(() => {
		const likeImage = likeImageRef.current
		const instagramImage = instagramImageRef.current
		const heartImage = heartImageRef.current
		if (!likeImage || !instagramImage || !heartImage) return

		const commons = {
			'mouse-event-element': '#hero',
			perspective: 2000,
			easing: 'cubic-bezier(.17, .67, .24, 1.01)',
			speed: 500,
			transition: false,
		}

		Tilt.init(likeImage, { ...commons, max: 3 })
		Tilt.init(instagramImage, { ...commons, max: 3 })
		Tilt.init(heartImage, { ...commons, max: 4 })

		return () => {
			likeImage?.vanillaTilt?.destroy()
			instagramImage?.vanillaTilt?.destroy()
			heartImage?.vanillaTilt?.destroy()
		}
	}, [])

	return (
		<>
			<Container>
				<div className={css.hero} id='hero'>
					<div className={css.content}>
						<h1 className={css.h1}>Pixel&shy;hunter&nbsp;— free AI image resizer for social media.</h1>
						<p className={css.p}>
							Sed in fuga illo. Deleniti dicta est nihil et quia doloribus dignissimos assumenda est. Animi ut nesciunt nostrum nostrum et adipisci sapiente. Voluptates ut non sapiente distinctio ut et.
						</p>
						<p className={css.p}>
							Ea ducimus autem debitis et. Sed qui esse qui. Quia corporis perferendis nostrum corporis error. Mollitia maxime dolorem labore inventore.
						</p>
						<p className={css.p}>
							Illum animi at. Voluptatem tempora ut et ducimus velit quibusdam quo et esse. Voluptatem pariatur et. Qui quas sit autem. Quaerat architecto consectetur.
						</p>

						<div className={css.upload}>
							<UploadcareUpload
								publicKey='3828f4d78b7de9c98461'
								onChange={uploadOnChange}
							/>

							<label>
								<input
									type='checkbox'
									checked={ucMeta.compress}
									onChange={onCompressCheck}
								/>
								Apply smart compression
							</label>

							{ src !== null && (
								<Button onClick={downloadAll} aria-busy={loading}>
									{ loading ? 'Loading...' : 'Download all'}
								</Button>
							)}
						</div>
						<Tabs
							onChange={setActiveTab}
							value={activeTab}
						/>
					</div>
					<div className={css.background}>
						<div className={css.likeImageWrapper}>
							<img
								ref={likeImageRef}
								width={1000}
								height={910}
								src="like.png"
								alt=''
							/>
						</div>
						<div className={css.instagramImageWrapper}>
							<img
								ref={instagramImageRef}
								width={1000}
								height={1000}
								src="instagram.png"
								alt=''
							/>
						</div>
						<div className={css.heartImageWrapper}>
							<img
								ref={heartImageRef}
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
