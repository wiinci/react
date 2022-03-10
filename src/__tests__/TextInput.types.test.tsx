import React from 'react'
import TextInput from '../TextInput'

export function shouldNotAcceptInvalidDomProps() {
  return (
    <>
      {/* @ts-expect-error invalid DOM props should not be accepted */}
      <TextInput onKeyDown={true} />
    </>
  )
}
