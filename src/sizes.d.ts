interface Size {
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
}

interface TargetApp {
	/**
	 * @description  taget service: Facebook, Instagram, etc. Case-sensitive.
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

type Sizes = TargetApp[]

export default Sizes
