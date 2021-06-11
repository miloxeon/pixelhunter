export interface Size {
	/**
	 * @description  taget service: short description of this size: Avatar, Cover, etc. Should be unique.
	 */
	name: string,

	/**
	 * @description  width in pixels
	 */
	width: number,

	/**
	 * @description height in pixels
	 */
	height: number,

	/**
	 * @description should this target size be featured in "Simple mode"
	 */
	simple?: boolean,

	/**
	 * @description a src of the image that explains where this size will be displayed on the corresponding social media. Will be put in an img tag and inserted as-is.
	 */
	positionSrc?: string,

	description?: string,
}

export interface TargetApp {
	/**
	 * @description  taget service: Facebook, Instagram, etc. Case-sensitive. Should be unique.
	 */
	app: string,

	/**
	 * @description  some SEO description text about the target service.
	 */
	description: string,

	/**
	 * @description  a logo image src. Will be put in an img tag and inserted as-is.
	 */
	logoSrc: string,

	sizes: Size[],
}

export type Sizes = TargetApp[]

export default Sizes
