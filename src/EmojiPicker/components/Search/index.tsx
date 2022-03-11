import React from 'react'

import useFilter from '../../hooks/useFilter'
import {useConfig} from '../../PickerContext'
import SkinTones from '../SkinTones'

import './style.css'

interface SearchProps {
  searchPlaceholder?: string
}

function Search({searchPlaceholder}: SearchProps) {
  const config = useConfig()
  const onChange = useFilter()

  if (config?.disableSearchBar) {
    return null
  }

  return (
    <div style={{position: 'relative'}}>
      <input placeholder={searchPlaceholder} className="emoji-search" onChange={onChange} />
      {config?.disableSkinTonePicker ? null : <SkinTones />}
    </div>
  )
}

export default Search
