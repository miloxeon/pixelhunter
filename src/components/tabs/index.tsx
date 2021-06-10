import React from 'react'
import css from './tabs.module.css'

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

	React.useEffect(() => {
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
	}, [value])

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
