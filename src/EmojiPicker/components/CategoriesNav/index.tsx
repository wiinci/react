import React, {useRef} from 'react'
import cn from 'classnames'
import {PROPERTY_DATA_NAME} from '../../utils/constants'
import {groups} from '../../emojis'
import {useActiveCategory, useConfig, useFilterValue, useSetSeenGroups} from '../../PickerContext'
import styled from 'styled-components'
import {IconButton} from '../../../Button2'

const EmojiNav = styled.nav`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`

const EmojiCategoryButton = styled(IconButton)`
  height: 40px;
  width: 20px;
  padding: 5px 0;
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 50% 50%;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.7;
  }

  &.active {
    opacity: 1;
  }

  .inactive &,
  .inactive &:hover,
  .inactive &:active {
    opacity: 0.4;
    cursor: default;
  }
`

const ActiveCategoryWrapper = styled.div`
  position: relative;
  width: 100%;

  & > .active-category-indicator {
    background: #99c2f1;
    height: 3px;
    width: 5px;
    position: absolute;
    bottom: 3px;
    border-radius: 5px;
    transition: 0.3s;
    width: 30px;
    left: -7px;
  }
`

interface CategoriesNavProps {
  emojiListRef: React.RefObject<HTMLElement>
}

const CategoriesNav = ({emojiListRef}: CategoriesNavProps) => {
  const refNav = useRef<HTMLElement>(null)
  const setSeenGroups = useSetSeenGroups()
  const filter = useFilterValue()
  const {groupVisibility} = useConfig()
  const [activeCategory, setActiveCategory] = useActiveCategory()

  let inactive = false
  if (filter && filter.length) {
    inactive = true
  }

  const handleClick = ({
    currentTarget
  }: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (inactive) {
      return
    }

    const id = currentTarget.getAttribute(PROPERTY_DATA_NAME)

    if (!emojiListRef.current || !id) {
      return
    }

    setActiveCategory(id)

    setSeenGroups(id)

    const {current} = emojiListRef
    const category = current.querySelector<HTMLElement>(`[${PROPERTY_DATA_NAME}="${id}"]`)

    current.scrollTop = category?.offsetTop ?? 0
  }

  let $group
  let left = 0
  let index = 0
  let barOpacity = '0'

  if (refNav.current) {
    $group = refNav.current.querySelector<HTMLElement>(`[${PROPERTY_DATA_NAME}="${activeCategory}"]`)

    if ($group) {
      left = ($group.offsetLeft || (refNav.current.firstChild as HTMLElement | null)?.offsetLeft) ?? 0
      barOpacity = '1'
    } else {
      left = (refNav.current.firstChild as HTMLElement | null)?.offsetLeft ?? 0
      barOpacity = '0'
    }
  }

  return (
    <>
      <EmojiNav className={cn('emoji-categories', {inactive})} ref={refNav}>
        {groups.map((group, i) => {
          if (groupVisibility[group.id] === false) {
            return null
          }
          const active = activeCategory === group

          if (active) {
            index = i
          }
          return (
            <EmojiCategoryButton
              key={group.id}
              type="button"
              className={cn(`icn-${group}`, {active})}
              onKeyPress={handleClick}
              onClick={handleClick}
              data-name={group.id}
              icon={group.icon}
              iconLabel={group.name}
            />
          )
        })}
      </EmojiNav>
      <ActiveCategoryWrapper className="active-category-indicator-wrapper">
        <div
          className="active-category-indicator"
          style={{
            transform: `translateX(${Math.max(left + index / 2, left)}px)`,
            opacity: barOpacity,
            ...(inactive && {
              display: 'none',
              opacity: '0',
              transform: 'translateX(0)'
            })
          }}
        ></div>
      </ActiveCategoryWrapper>
    </>
  )
}

export default CategoriesNav
