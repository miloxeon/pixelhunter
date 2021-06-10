import React from 'react'
import { FaCropAlt } from 'react-icons/fa'
import { debounce } from 'lodash'
import css from './tabs.module.css'
import sizes from '../../sizes.json'
import { getSimpleModeSizes } from '../../helpers'

export enum TabsEnum {
	simple,
	advanced,
	custom,
}

const simpleModeTargets = getSimpleModeSizes(sizes)

const simpleModeLogos = simpleModeTargets.map(target => ({
	logoSrc: target.logoSrc,
	app: target.app,
}))

const advancedModeLogos = sizes.map(target => ({
	logoSrc: target.logoSrc,
	app: target.app,
}))

interface Props {
	onChange: (selectedTab: TabsEnum) => void
	value: TabsEnum
}

const gapX = 0
const gapY = 0

const Tabs: React.FC<Props> = props => {
	const {
		onChange,
		value
	} = props

	const rootRef = React.useRef<HTMLDivElement>(null)
	const pillRef = React.useRef<HTMLDivElement>(null)

	const setActiveTab = React.useCallback((selectedTab: TabsEnum) => {
		onChange(selectedTab)
	}, [onChange])

	// CAUTION: don't forget to specify deps yourself
	// because React can't detect them in debounced callback
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const recalculatePill = React.useCallback(debounce(() => {
		const root = rootRef.current
		const pill = pillRef.current
		if (!root || !pill) return

		const selectedTabElement = root.querySelector('[data-active="true"]')
		if (!selectedTabElement) return
		const selectedTabRect = selectedTabElement.getBoundingClientRect()
		const rootRect = root.getBoundingClientRect()

		const offsetX = selectedTabRect.left - rootRect.left
		const offsetY = selectedTabRect.top - rootRect.top

		pill.style.width = `${selectedTabRect.width + gapX * 2}px`
		pill.style.height = `${selectedTabRect.height + gapY * 2}px`
		pill.style.transform = `translate(${offsetX - gapX}px, ${offsetY - gapY}px)`
		
		// pill needs recalculation on value change
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, 100, {
		leading: true,
		trailing: true,
	}), [value])

	React.useEffect(() => {
		recalculatePill()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	React.useEffect(() => {
		window.addEventListener('resize', recalculatePill)
		return () => window.removeEventListener('resize', recalculatePill)
	}, [recalculatePill])

	return (
		<div className={css.root} ref={rootRef}>
			<button
				className={css.tab}
				type="button"
				data-active={value === TabsEnum.simple}
				onClick={() => setActiveTab(TabsEnum.simple)}
				aria-label={`This mode supports ${simpleModeLogos.map(info => info.app).join(', ')}`}
				title={`This mode supports ${simpleModeLogos.map(info => info.app).join(', ')}`}
			>
				Simple
			</button>
			<button
				className={css.tab}
				type="button"
				onClick={() => setActiveTab(TabsEnum.advanced)}
				data-active={value === TabsEnum.advanced}
				aria-label={`This mode supports ${advancedModeLogos.map(info => info.app).join(', ')}`}
				title={`This mode supports ${advancedModeLogos.map(info => info.app).join(', ')}`}
			>
				Advanced
			</button>
			<button
				className={css.tab}
				type="button"
				onClick={() => setActiveTab(TabsEnum.custom)}
				data-active={value === TabsEnum.custom}
				aria-label='This mode supports cropping your image to any size'
				title='This mode supports cropping your image to any size'
			>
				Custom
			</button>

			<div className={css.simpleModeInfo}>
				{simpleModeLogos.map(appInfo => {
					return (
						<img
							className={css.infoLogo}
							key={appInfo.app}
							src={appInfo.logoSrc}
							width={20}
							height={20}
							alt=''
							aria-hidden={true}
						/>
					)
				})}
			</div>

			<div className={css.advancedModeInfo}>
				{advancedModeLogos.map(appInfo => {
					return (
						<img
							className={css.infoLogo}
							key={appInfo.app}
							src={appInfo.logoSrc}
							width={20}
							height={20}
							alt=''
							aria-hidden={true}
						/>
					)
				})}
			</div>

			<div className={css.customModeInfo}>
				<FaCropAlt />
			</div>

			<div className={css.pill} ref={pillRef} />
		</div>
	)
}

export default Tabs
