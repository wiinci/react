import {setRecentlyUsed} from './recentlyUsed'
import emojiOutput from './emojiOutput'
import {Emoji} from './types'
import React from 'react'

type OnClickHandler = (
  event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  output: {
    unified: string
    emoji: string
    originalUnified: string
    names: string[]
    activeSkinTone?: string
  }
) => void

const clickHandler =
  (onClickRef: React.RefObject<OnClickHandler>) =>
  (
    e: React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
    unified: string,
    emoji: Emoji,
    activeSkinTone?: string
  ) => {
    const output = emojiOutput(unified, emoji, activeSkinTone)
    setRecentlyUsed(output)
    return onClickRef.current && onClickRef.current(e, output)
  }

export default clickHandler
