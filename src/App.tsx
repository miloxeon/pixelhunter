import React from 'react'
import sizes from './sizes.json'
import { FileInfo, Widget as UploadcareUpload } from '@uploadcare/react-widget'
import Size from './components/size'

const App: React.FC = () => {

	const [src, setSrc] = React.useState<string | null>(null)

	const sizesForSimpleMode = sizes.filter(size => size.simple)
	const uploadOnChange = React.useCallback((fileInfo: FileInfo) => {
		setSrc(fileInfo.cdnUrl)
	}, [])

	return (
		<div>
			<UploadcareUpload
				publicKey='3828f4d78b7de9c98461'
				onChange={uploadOnChange}
			/>

			{src !== null && sizesForSimpleMode.map(size => (
				<Size
					key={`${size.app}_${size.name}_${size.width}x${size.height}`}
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
