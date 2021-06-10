import React from 'react'
import css from './tabs.module.css'
import { debounce } from 'lodash'

export enum TabsEnum {
	simple,
	advanced,
	custom,
}

interface Props {
	onChange: (selectedTab: TabsEnum) => void
	value: TabsEnum
}

const gapX = 7
const gapY = 7

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
				className={value === TabsEnum.simple ? css.tabActive : css.tab}
				type="button"
				data-active={value === TabsEnum.simple}
				onClick={() => setActiveTab(TabsEnum.simple)}
			>
				Simple
			</button>
			<button
				className={value === TabsEnum.advanced ? css.tabActive : css.tab}
				type="button"
				onClick={() => setActiveTab(TabsEnum.advanced)}
				data-active={value === TabsEnum.advanced}
			>
				Advanced
			</button>
			<button
				className={value === TabsEnum.custom ? css.tabActive : css.tab}
				type="button"
				onClick={() => setActiveTab(TabsEnum.custom)}
				data-active={value === TabsEnum.custom}
			>
				Custom
			</button>
			<div className={css.pill} ref={pillRef} />
		</div>
	)
}

export default Tabs
