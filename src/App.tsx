import React from 'react'
import sizes from './sizes.json'
import css from './app.module.css'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { CSSTransition } from 'react-transition-group'
import { downloadSizes, mimeToExtension } from './helpers'
import { UCMeta } from './types'

import Button from './components/button'
import Container from './components/container'
import Target from './components/target'
import Tabs, { TabsEnum } from './components/tabs'

// text info about simple mode sizes
// simple mode sizes' positions
// tabs
// checkboxes
// download all
// footer

const timeouts = {
	appear: 2000,
	enter: 500,
	exit: 500,
}

const simpleModeImages = sizes.map(target => ({
	...target,
	sizes: target.sizes.filter(size => size.simple)
})).filter(target => target.sizes.length > 0)

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

	return (
		<>
			<Container>
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

				<Tabs
					onChange={setActiveTab}
					value={activeTab}
				/>

				<div>
					{ src !== null && (
						<Button onClick={downloadAll} aria-busy={loading}>
							{ loading ? 'Loading...' : 'Download all'}
						</Button>
					)}
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
