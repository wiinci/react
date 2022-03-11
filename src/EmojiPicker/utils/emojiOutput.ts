import {EMOJI_PROPERTY_UNIFIED, EMOJI_PROPERTY_NAME} from './constants'
import {Emoji} from './types'

const emojiOutput = (unified: string, emoji: Emoji, activeSkinTone = 'neutral', extra = {}) =>
  Object.assign(
    {
      unified,
      emoji: unified
        .split('-')
        .map(hex => parseInt(hex, 16))
        .map(hex => String.fromCodePoint(hex))
        .join(''),
      originalUnified: emoji[EMOJI_PROPERTY_UNIFIED],
      names: emoji[EMOJI_PROPERTY_NAME],
      activeSkinTone
    },
    extra
  )

export default emojiOutput
