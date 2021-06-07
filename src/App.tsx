import React from 'react'
import sizes from './sizes.json'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import Size from './components/size'
import { getSizeKey, downloadSizes } from './helpers'

const sizesForSimpleMode = sizes.filter(size => size.simple)

// preview
// tabs
// download all
// nice ui

const App: React.FC = () => {
	const [src, setSrc] = React.useState<string | null>(null)
	const [loading, setLoading] = React.useState<boolean>(false)

	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		setSrc(fileInfo.cdnUrl)
	}, [])

	// demo
	const downloadAll = React.useCallback(() => {
		if (!src) return
		setLoading(true)
		const sizesToDownload = sizes.map(size => ({ ...size, src }))
		downloadSizes(sizesToDownload).finally(() => setLoading(false))
	}, [src])

	return (
		<div>
			<UploadcareUpload
				publicKey='3828f4d78b7de9c98461'
				onChange={uploadOnChange}
			/>

			{ src !== null && (
				<button type="button" onClick={downloadAll} aria-busy={loading}>
					{ loading ? 'Loading...' : 'Download all'}
				</button>
			)}

			{src !== null && sizesForSimpleMode.map(size => (
				<Size
					key={getSizeKey(size)}
					src={src}
					app={size.app}
					name={size.name}
					width={size.width}
					height={size.height}
				/>
			))}
		</div>
	)
}

export default App
