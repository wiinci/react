import React, {createContext, useState, useContext, FC} from 'react'
import {
  EMOJI_PROPERTY_SKIN_VARIATIONS,
  EMOJI_PROPERTY_UNIFIED,
  GROUPS,
  GROUP_NAME_PEOPLE,
  PROPERTY_DATA_NAME
} from './utils/constants'
import {DATA_NAME} from './components/SkinTones'
import {Emoji} from './utils/types'

const constGroups = GROUPS
export type GroupNames = typeof constGroups[number]

export interface PickerConfig {
  emojiUrl: string
  preload: boolean
  skinTone: string
  groupNames: Partial<Record<GroupNames, string>>
  native: boolean
  groupVisibility: Partial<Record<GroupNames, boolean>>
  disableAutoFocus: boolean
  disableSearchBar: boolean
  disableSkinTonePicker: boolean
}

export interface FilterState {
  terms: Array<string>
  value: string
}

export interface RecentlyUsedEmoji {
  [EMOJI_PROPERTY_UNIFIED]: string
  [EMOJI_PROPERTY_SKIN_VARIATIONS]?: string
}

export type SeenGroupsState = {
  [key in GroupNames]?: boolean
}

export interface PickerContext {
  activeCategoryState?: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
  activeSkinToneState?: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>]
  config?: PickerConfig
  filterState?: [Array<FilterState>, React.Dispatch<React.SetStateAction<Array<FilterState>>>]
  filterResult?: [
    Record<keyof GroupNames, Record<string, boolean>> | undefined,
    React.Dispatch<React.SetStateAction<Record<keyof GroupNames, Record<string, boolean>> | undefined>>
  ]
  missingEmojiState?: [Record<string, boolean>, React.Dispatch<React.SetStateAction<Record<string, boolean>>>]
  onEmojiClick?: (
    e: React.MouseEvent<HTMLButtonElement>,
    unified: string,
    emoji: Emoji,
    activeSkinTone?: string
  ) => void
  recentlyUsed?: Array<RecentlyUsedEmoji>
  seenGroupsState?: [SeenGroupsState, React.Dispatch<React.SetStateAction<SeenGroupsState>>]
  skinToneSpreadState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  variationMenuState?: [Emoji | undefined, React.Dispatch<React.SetStateAction<Emoji | undefined>>]
}

const PickerContext = createContext<PickerContext>({})

export interface PickerContextProviderProps {
  config: PickerConfig
  recentlyUsed: Array<RecentlyUsedEmoji>
  onEmojiClick: (e: React.MouseEvent<HTMLButtonElement>, unified: string, emoji: Emoji, activeSkinTone?: string) => void
}

export const PickerContextProvider: FC<PickerContextProviderProps> = ({
  children,
  config,
  recentlyUsed,
  onEmojiClick
}) => {
  const activeCategoryState = useState<string>()
  const filterState = useState<Array<FilterState>>([])
  const filterResult = useState<Record<keyof GroupNames, Record<string, boolean>>>()
  const seenGroupsState = useState<SeenGroupsState>({[GROUP_NAME_PEOPLE]: true})
  const missingEmojiState = useState({})
  const variationMenuState = useState<Emoji>()
  const skinToneSpreadState = useState(false)
  const activeSkinToneState = useState<string | undefined>(config.skinTone)

  return (
    <PickerContext.Provider
      value={{
        activeCategoryState,
        filterState,
        filterResult,
        seenGroupsState,
        missingEmojiState,
        variationMenuState,
        skinToneSpreadState,
        activeSkinToneState,
        config,
        recentlyUsed,
        onEmojiClick
      }}
    >
      {children}
    </PickerContext.Provider>
  )
}

export function useActiveCategory() {
  return useContext(PickerContext).activeCategoryState
}

export function useSetFilter() {
  const dispatch = useContext(PickerContext).filterState?.[1]
  const setFilterResult = useContext(PickerContext).filterResult?.[1]
  return ({
    filter,
    filterResult
  }: {
    filter: Array<FilterState>
    filterResult: Record<keyof GroupNames, Record<string, boolean>>
  }) => {
    dispatch?.(filter)
    setFilterResult?.(filterResult)
  }
}

export function useFilterValue() {
  const value = useContext(PickerContext).filterState?.[0]
  return value
}

export function useFilterResult() {
  const result = useContext(PickerContext).filterResult?.[0]
  return result
}

export function useSeenGroups() {
  const seenGroups = useContext(PickerContext).seenGroupsState?.[0]

  return seenGroups
}

export function useSetSeenGroups() {
  const setSeenGroups = useContext(PickerContext).seenGroupsState?.[1]

  return (group: GroupNames) => {
    setSeenGroups?.((seenGroups = {}) => {
      return seenGroups[group] ? seenGroups : {...seenGroups, [group]: true}
    })
  }
}

export function useSetMissingEmoji() {
  const setMissingEmoji = useContext(PickerContext).missingEmojiState?.[1]

  return (emoji: string) => {
    setMissingEmoji?.(missingEmoji => {
      return {...missingEmoji, [emoji]: true}
    })
  }
}

export function useMissingEmojis() {
  const missingEmojis = useContext(PickerContext).missingEmojiState?.[0]

  return missingEmojis
}

export function useVariationMenuValue() {
  const value = useContext(PickerContext).variationMenuState?.[0]
  return value
}

export function useOpenVariationMenu() {
  const setVariationMenu = useContext(PickerContext).variationMenuState?.[1]

  return (emoji: Emoji) => {
    setVariationMenu?.(activeVariation => {
      if (activeVariation === emoji) {
        return activeVariation
      }

      return emoji
    })
  }
}

export function useCloseVariationMenu() {
  const setVariationMenu = useContext(PickerContext).variationMenuState?.[1]
  const skinToneSpreadValue = useSkinToneSpreadValue()
  const collapseSkinTones = useCollapseSkinTones()

  return ({currentTarget}: React.MouseEvent<HTMLButtonElement>) => {
    setVariationMenu?.(undefined)

    if (skinToneSpreadValue && currentTarget.getAttribute(PROPERTY_DATA_NAME) !== DATA_NAME) {
      collapseSkinTones()
    }
  }
}

export function useSkinToneSpreadValue() {
  const skinToneSpread = useContext(PickerContext).skinToneSpreadState?.[0]

  return skinToneSpread
}

export function useToggleSpreadSkinTones() {
  const setSkinToneSpread = useContext(PickerContext).skinToneSpreadState?.[1]

  return () => setSkinToneSpread?.(skinToneSpread => !skinToneSpread)
}

export function useCollapseSkinTones() {
  const setSkinToneSpread = useContext(PickerContext).skinToneSpreadState?.[1]

  return () => setSkinToneSpread?.(false)
}

export function useActiveSkinTone() {
  const activeSkinTone = useContext(PickerContext).activeSkinToneState?.[0]

  return activeSkinTone
}

export function useSetActiveSkinTone() {
  const setActiveSkinTone = useContext(PickerContext).activeSkinToneState?.[1]

  return (skinTone: string) => {
    setActiveSkinTone?.(skinTone)
  }
}

export function useConfig() {
  return useContext(PickerContext).config
}

export function useRecentlyUsed() {
  return useContext(PickerContext).recentlyUsed
}

export function useOnEmojiClick() {
  return useContext(PickerContext).onEmojiClick
}
