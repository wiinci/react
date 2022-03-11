import React, {FC, useEffect, useRef} from 'react'

import CategoriesNav from './components/CategoriesNav'
import EmojiList from './components/EmojiList'
import RecentlyUsed from './components/RecentlyUsed'
import Search from './components/Search'
import {
  SKIN_TONE_DARK,
  SKIN_TONE_LIGHT,
  SKIN_TONE_MEDIUM,
  SKIN_TONE_MEDIUM_DARK,
  SKIN_TONE_MEDIUM_LIGHT,
  SKIN_TONE_NEUTRAL
} from './components/SkinTones'
import VariationsMenu from './components/VariationsMenu'
import clickHandler from './utils/clickHandler'
import {GROUP_NAMES_ENGLISH} from './utils/constants'
import {getRecentlyUsed} from './utils/recentlyUsed'
import {GroupNames, PickerContextProvider, useCloseVariationMenu} from './PickerContext'

import './style.css'
import {SkinTones} from './utils/types'

const DEFAULT_EMOJI_URL = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64'

export interface EmojiPickerProps {
  onEmojiClick: (
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    output: {
      unified: string
      emoji: string
      originalUnified: string
      names: string[]
      activeSkinTone?: string
    }
  ) => void
  emojiUrl?: string
  preload?: boolean
  native?: boolean
  skinTone?: keyof typeof SkinTones
  disableAutoFocus?: boolean
  disableSearchBar?: boolean
  disableSkinTonePicker?: boolean
  groupNames?: Partial<Record<GroupNames, string>>
  pickerStyle?: React.CSSProperties
  groupVisibility?: Partial<Record<GroupNames, boolean>>
  searchPlaceholder?: string
}

const EmojiPicker = ({
  emojiUrl = DEFAULT_EMOJI_URL,
  onEmojiClick,
  preload = false,
  native = false,
  skinTone = 'Neutral',
  disableAutoFocus = false,
  disableSearchBar = false,
  disableSkinTonePicker = false,
  groupNames = {},
  pickerStyle = {},
  groupVisibility = {},
  searchPlaceholder
}: EmojiPickerProps) => {
  const emojiListRef = useRef<HTMLElement>(null)
  const isMounted = useRef(true)
  const onClickRef = useRef(onEmojiClick)

  onClickRef.current = onEmojiClick

  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )

  return (
    <PickerContextProvider
      config={{
        skinTone: SkinTones[skinTone],
        emojiUrl,
        preload,
        native,
        groupNames: Object.assign(GROUP_NAMES_ENGLISH, groupNames),
        groupVisibility,
        disableSearchBar,
        disableAutoFocus,
        disableSkinTonePicker
      }}
      recentlyUsed={getRecentlyUsed()}
      onEmojiClick={clickHandler(onClickRef)}
    >
      <Aside pickerStyle={pickerStyle}>
        <CategoriesNav emojiListRef={emojiListRef} />
        <Search searchPlaceholder={searchPlaceholder} />

        <div className="content-wrapper">
          <VariationsMenu />
          <section className="emoji-scroll-wrapper" ref={emojiListRef}>
            <RecentlyUsed emojiListRef={emojiListRef} />
            <EmojiList emojiListRef={emojiListRef} />
          </section>
        </div>
      </Aside>
    </PickerContextProvider>
  )
}

interface AsideProps {
  pickerStyle?: React.CSSProperties
}

const Aside: FC<AsideProps> = ({children, pickerStyle}) => {
  const closeVariations = useCloseVariationMenu()
  return (
    <aside className="emoji-picker-react" style={pickerStyle} onScroll={closeVariations} onMouseDown={closeVariations}>
      {children}
    </aside>
  )
}

export {
  SKIN_TONE_NEUTRAL,
  SKIN_TONE_LIGHT,
  SKIN_TONE_MEDIUM_LIGHT,
  SKIN_TONE_MEDIUM,
  SKIN_TONE_MEDIUM_DARK,
  SKIN_TONE_DARK
}

export default EmojiPicker
