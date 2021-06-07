export interface AbstractSize {
	app: string,
	name: string,
	width: number,
	height: number,
}

export interface SizeWithSrc extends AbstractSize {
	src: string,
}

export interface SizeWithBlob extends SizeWithSrc {
	blob: Blob,
}
