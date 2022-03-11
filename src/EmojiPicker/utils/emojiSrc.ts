import useEmojiUrl from '../hooks/useEmojiUrl'

const emojiSrc = (unified: string) => ({
  src: useEmojiUrl(unified)
})

export default emojiSrc
