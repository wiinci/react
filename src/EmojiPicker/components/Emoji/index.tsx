import React from 'react'
import cn from 'classnames'
import {EMOJI_PROPERTY_SKIN_VARIATIONS, EMOJI_PROPERTY_UNIFIED} from '../../utils/constants'
import EmojiImg from '../EmojiImg'
import {PASTEL_BLUE, PASTEL_RED, PASTEL_GREEN, PASTEL_PURPLE, PASTEL_YELLOW} from './colors'
import './style.css'
import {Emoji} from '../../utils/types'

const pastels = [PASTEL_BLUE, PASTEL_RED, PASTEL_GREEN, PASTEL_PURPLE, PASTEL_YELLOW]
const bgColor = (order: number) => pastels[order % pastels.length]

let mouseDownTimeout: number | undefined

const handleMouseUp = () => clearTimeout(mouseDownTimeout)

interface EmojiProps {
  emoji: Emoji
  shouldLoad: boolean
  hidden: boolean
  activeSkinTone: string
  openVariationMenu?: (emoji: Emoji) => void
  variationMenuOpenRef: React.RefObject<boolean>
  handleMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => void
  onEmojiClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    unified: string | undefined,
    emoji: Emoji,
    activeSkinTone: string
  ) => void
  index: number
  native?: boolean
}

const Emoji = ({
  emoji,
  shouldLoad,
  hidden,
  activeSkinTone,
  openVariationMenu,
  variationMenuOpenRef,
  handleMouseEnter,
  handleMouseLeave,
  onEmojiClick,
  index,
  native = false
}: EmojiProps) => {
  const hasSkinVariation = emoji[EMOJI_PROPERTY_SKIN_VARIATIONS]
  let unified: string | undefined

  const style = {
    ...(hidden && {display: 'none'}),
    color: bgColor(index)
  }

  if (hasSkinVariation && emoji[EMOJI_PROPERTY_SKIN_VARIATIONS]) {
    unified = emoji[EMOJI_PROPERTY_SKIN_VARIATIONS]?.find(u => u.indexOf(activeSkinTone) >= 0)
  }

  if (!unified) {
    unified = emoji[EMOJI_PROPERTY_UNIFIED]
  }

  const handleMouseDown = () => {
    if (!hasSkinVariation || !openVariationMenu) {
      return
    }

    mouseDownTimeout = window.setTimeout(() => {
      openVariationMenu(emoji)
    }, 500)
  }

  const handleEmojiClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variationMenuOpenRef.current) {
      return
    }

    onEmojiClick(e, unified, emoji, activeSkinTone)
  }

  return (
    <li
      style={style}
      className={cn('emoji', {
        'has-skin-variation': hasSkinVariation && openVariationMenu
      })}
    >
      <button
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        type="button"
        onClick={handleEmojiClick}
      >
        <EmojiImg unified={unified} shouldLoad={shouldLoad} native={native} />
      </button>
    </li>
  )
}

export default Emoji
