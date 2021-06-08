import React from 'react'
import sizes from './sizes.json'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import { getSizeKey, downloadSizes } from './helpers'

import Size from './components/size'
import Button from './components/button'
import Container from './components/container'

const sizesForSimpleMode = sizes.filter(size => size.simple)

// preview
// tabs
// download all
// nice ui

const App: React.FC = () => {
	const [src, setSrc] = React.useState<string | null>(null)
	const [loading, setLoading] = React.useState<boolean>(false)
	const [compress, setCompress] = React.useState<boolean>(false)

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		setSrc(fileInfo.cdnUrl)
	}, [])

	// demo
	const downloadAll = React.useCallback(() => {
		if (!src) return
		setLoading(true)
		const sizesToDownload = sizes.map(size => ({ ...size, src }))
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

			{src !== null && sizesForSimpleMode.map(size => (
				<Size
					key={getSizeKey(size)}
					src={src}
					compress={compress}
					app={size.app}
					name={size.name}
					width={size.width}
					height={size.height}
				/>
			))}
		</Container>
	)
}

export default App
