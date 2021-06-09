import JSZip from 'jszip'
import { StandaloneSize, SizeWithSrc, SizeWithBlob } from './types'

const ensureEndingWithSlash = (str: string): string => {
	const lastSymbol = str[str.length - 1]
	if (lastSymbol === '/') return str
	return `${str}/`
}

export const getUrl = (src: string, width: number, height: number, compress: boolean): string => {
	const srcWithSlash = ensureEndingWithSlash(src)
	return compress
		? `${srcWithSlash}-/scale_crop/${width}x${height}/smart/-/quality/smart/`
		: `${srcWithSlash}-/scale_crop/${width}x${height}/smart/`
}

export const getCrookedUrl = (src: string, width: number, height: number, compress: boolean) => getUrl(src, width + 1, height + 1, compress)

export const getSizeKey = (size: StandaloneSize): string => `${size.app} ${size.name} (${size.width}x${size.height})`

export const downloadSize = (size: SizeWithSrc, compress: boolean): Promise<SizeWithBlob> => {
	const url = getUrl(size.src, size.width, size.height, compress)
	return fetch(url).then(response => response.blob()).then(blob => ({
		...size,
		blob,
	}))
}

export const downloadAbstractContent = (href: string, filename: string): void => {
	const a = document.createElement('a')
	a.href = href
	a.setAttribute('download', filename)
	a.setAttribute('_target', 'blank')
	a.click()
}

export const downloadFile = (base64content: string, filename: string): void =>
	downloadAbstractContent(`data:application/zip;base64,${base64content}`, filename)

export const downloadSizes = (sizes: SizeWithSrc[], compress: boolean): Promise<void> => new Promise((resolve, reject) => {
	const downloadSizeWithCompress =
		(compress: boolean) => (size: SizeWithSrc) => downloadSize(size, compress)

	Promise.all(sizes.map(downloadSizeWithCompress(compress))).then(sizesWithBlobs => {
		const zip = new JSZip()
		sizesWithBlobs.forEach(sizeWithBlob => {
			const fileName = `${getSizeKey(sizeWithBlob)}.png`
			zip.file(fileName, sizeWithBlob.blob)
		})

		zip.generateAsync({
			type: 'base64'
		}).then(content => {
			resolve()
			downloadFile(content, 'pixelhunter-social-media-images.zip')
		}).catch(reject)
	}).catch(reject)
})

export const mimeToExtension = (mime: string | null): string => {
	if (!mime) return 'jpg'
	const lowercaseMime = mime.toLowerCase()
	if (lowercaseMime === 'image/gif') return 'gif'
	if (['image/jpeg', 'image/pjpeg'].includes(lowercaseMime)) return 'jpg'
	if (lowercaseMime === 'image/png') return 'png'
	if (lowercaseMime === 'image/svg+xml') return 'svg'
	if (lowercaseMime === 'image/tiff') return 'tiff'
	if (lowercaseMime === 'image/vnd.microsoft.icon') return 'ico'
	if (lowercaseMime === 'image/vnd.wap.wbmp') return 'wbmp'
	if (lowercaseMime === 'image/webp') return 'webp'

	const mimeTuple = lowercaseMime.split('/')
	return mimeTuple[mimeTuple.length - 1]
}
