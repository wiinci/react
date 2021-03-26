import {Meta} from '@storybook/react'
import React from 'react'
import {Button, theme, ThemeProvider} from '..'
import BaseStyles from '../BaseStyles'
import {DropdownMenu} from '../DropdownMenu'
import {registerPortalRoot} from '../Portal'

const meta: Meta = {
  title: 'Composite components/DropdownMenu',
  component: DropdownMenu,
  decorators: [
    (Story: React.ComponentType): JSX.Element => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works in isolation.
      registerPortalRoot(undefined)
      return (
        <ThemeProvider theme={theme}>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ],
  parameters: {
    controls: {
      disabled: true
    }
  }
}
export default meta

export function FavoriteColorStory(): JSX.Element {
  return (
    <>
      <h1>Favorite Color</h1>
      <div>Please select your favorite color:</div>
      <DropdownMenu
        renderAnchor={({children, ...anchorProps}) => <Button {...anchorProps}>{children || '🎨'}</Button>}
        items={[{text: '🔵 Cyan'}, {text: '🔴 Magenta'}, {text: '🟡 Yellow'}]}
      />
    </>
  )
}
FavoriteColorStory.storyName = 'Favorite Color'
