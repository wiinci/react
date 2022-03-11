import React from 'react'
import emojiSrc from '../../utils/emojiSrc'
import './style.css'
import {useSetMissingEmoji} from '../../PickerContext'

interface EmojiImgProps {
  name: string
  unified: string
  shouldLoad: boolean
  native: boolean
}

const EmojiImg = ({name, unified, shouldLoad = true, native = false}: EmojiImgProps) => {
  return native ? (
    <div className="native" role="img" aria-label={name}>
      {unified
        .split('-')
        .map(hex => parseInt(hex, 16))
        .map(hex => String.fromCodePoint(hex))
        .join('')}
    </div>
  ) : (
    <Img name={name} shouldLoad={shouldLoad} unified={unified} />
  )
}

interface ImgProps {
  name: string
  unified: string
  shouldLoad: boolean
}

function Img({name, unified, shouldLoad}: ImgProps) {
  const setMissingEmoji = useSetMissingEmoji()
  const src = emojiSrc(unified)
  return (
    <img
      className="emoji-img"
      alt={name}
      aria-label={name}
      onError={() => setMissingEmoji(unified)}
      {...(shouldLoad && src)}
    />
  )
}

export default EmojiImg
