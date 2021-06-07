import JSZip from 'jszip'
import { AbstractSize, SizeWithSrc, SizeWithBlob } from './types'

const ensureEndingWithSlash = (str: string): string => {
	const lastSymbol = str[str.length - 1]
	if (lastSymbol === '/') return str
	return `${str}/`
}

export const getUrl = (src: string, width: number, height: number): string => {
	const srcWithSlash = ensureEndingWithSlash(src)
	return `${srcWithSlash}-/scale_crop/${width}x${height}/smart/-/quality/smart/`
}

export const getSizeKey = (size: AbstractSize): string => `${size.app} ${size.name} ${size.width}x${size.height}`

const downloadSize = (size: SizeWithSrc): Promise<SizeWithBlob> => {
	const url = getUrl(size.src, size.width, size.height)
	return fetch(url).then(response => response.blob()).then(blob => ({
		...size,
		blob,
	}))
}

export const downloadSizes = (sizes: SizeWithSrc[]): Promise<void> => new Promise((resolve, reject) => {
	Promise.all(sizes.map(downloadSize)).then(sizesWithBlobs => {
		const zip = new JSZip()
		sizesWithBlobs.forEach(sizeWithBlob => {
			const fileName = `${getSizeKey(sizeWithBlob)}.png`
			zip.file(fileName, sizeWithBlob.blob)
		})

		zip.generateAsync({
			type: 'base64'
		}).then(content => {
			resolve()
			const a = document.createElement('a')
			a.href = `data:application/zip;base64,${content}`
			a.setAttribute('download', 'pixelhunter-social-media-images.zip')
			a.setAttribute('_target', 'blank')
			a.click()
		}).catch(reject)
	}).catch(reject)
})
