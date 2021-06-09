import React from 'react'
import sizes from './sizes.json'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { downloadSizes, mimeToExtension } from './helpers'

import Button from './components/button'
import Container from './components/container'
import Target from './components/target'

// text info about simple mode sizes
// simple mode sizes' positions
// tabs
// checkboxes
// download all
// footer

enum Tabs {
	simple,
	advanced,
	custom,
}

const simpleModeImages = sizes.map(target => ({
	...target,
	sizes: target.sizes.filter(size => size.simple)
})).filter(target => target.sizes.length > 0)

const App: React.FC = () => {
	// const [src, setSrc] = React.useState<string | null>(null)

	// bright
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/15f79d17-2619-46e6-b120-8fc7f58f50a4/')

	// dim
	const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/0c17d734-460a-4d79-9824-30b6e6378181/')
	
	const [loading, setLoading] = React.useState<boolean>(false)
	const [compress, setCompress] = React.useState<boolean>(false)
	const [extension, setExtension] = React.useState<string>('jpg')
	const [activeTab, setActiveTab] = React.useState<Tabs>(Tabs.simple)

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		console.log(fileInfo)
		setSrc(fileInfo.cdnUrl)
		setExtension(mimeToExtension(fileInfo.mimeType))
	}, [])

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
		downloadSizes(sizesToDownload, compress).finally(() => setLoading(false))
	}, [compress, src])

	const currentSizes = activeTab === Tabs.simple ? simpleModeImages : sizes

	return (
		<Container>
			<UploadcareUpload
				publicKey='3828f4d78b7de9c98461'
				onChange={uploadOnChange}
			/>

			<label>
				<input
					type='checkbox'
					checked={compress}
					onChange={e => setCompress(e.target.checked)}
				/>
				Apply smart compression
			</label>

			<div>
				<button
					type="button"
					onClick={() => setActiveTab(Tabs.simple)}
					style={{
						color: activeTab === Tabs.simple ? 'red' : 'black'
					}}
				>
					Simple
				</button>
				<button
					type="button"
					onClick={() => setActiveTab(Tabs.advanced)}
					style={{
						color: activeTab === Tabs.advanced ? 'red' : 'black'
					}}
				>
					Advanced
				</button>
				<button
					type="button"
					onClick={() => setActiveTab(Tabs.custom)}
					style={{
						color: activeTab === Tabs.custom ? 'red' : 'black'
					}}
				>
					Custom
				</button>
			</div>

			<div>
				{ src !== null && (
					<Button onClick={downloadAll} aria-busy={loading}>
						{ loading ? 'Loading...' : 'Download all'}
					</Button>
				)}
			</div>

			{ src !== null && activeTab !== Tabs.custom && currentSizes.map(target => {
				return (
					<Target
						key={target.app}
						compress={compress}
						src={src}
						extension={extension}
						{...target}
					/>
				)
			})}
		</Container>
	)
}

export default App
