interface TargetApp {
	/**
	 * @description  taget service: Facebook, Instagram, etc. Case-sensitive.
	 */
	app: string,

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

type Sizes = TargetApp[]

export default Sizes
