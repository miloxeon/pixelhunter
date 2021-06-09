import React from 'react'
import sizes from './sizes.json'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { downloadSizes } from './helpers'

import Button from './components/button'
import Container from './components/container'
import Target from './components/target'

// support proper mime types
// preview
// tabs
// checkboxes
// download all

const App: React.FC = () => {
	// const [src, setSrc] = React.useState<string | null>(null)

	// bright
	// const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/15f79d17-2619-46e6-b120-8fc7f58f50a4/')

	// dim
	const [src, setSrc] = React.useState<string | null>('https://ucarecdn.com/0c17d734-460a-4d79-9824-30b6e6378181/')
	
	const [loading, setLoading] = React.useState<boolean>(false)
	const [compress, setCompress] = React.useState<boolean>(false)

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		setSrc(fileInfo.cdnUrl)
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
				{ src !== null && (
					<Button onClick={downloadAll} aria-busy={loading}>
						{ loading ? 'Loading...' : 'Download all'}
					</Button>
				)}
			</div>

			{ src !== null && sizes.map(target => {
				return (
					<Target
						key={target.app}
						compress={compress}
						src={src}
						{...target}
					/>
				)
			})}
		</Container>
	)
}

export default App
