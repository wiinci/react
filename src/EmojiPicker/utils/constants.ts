export const EMOJI_PROPERTY_NAME = 'n'
export const EMOJI_PROPERTY_UNIFIED = 'u'
export const EMOJI_PROPERTY_SKIN_VARIATIONS = 'v'
export const EMOJI_PROPERTY_GROUP = 'g'
export const GROUP_NAME_PEOPLE = 'smileysPeople'
export const GROUP_NAME_NATURE = 'animalsNature'
export const GROUP_NAME_FOOD = 'foodDrink'
export const GROUP_NAME_TRAVEL = 'travelPlaces'
export const GROUP_NAME_ACTIVITIES = 'activities'
export const GROUP_NAME_OBJECTS = 'objects'
export const GROUP_NAME_SYMBOLS = 'symbols'
export const GROUP_NAME_FLAGS = 'flags'
export const GROUP_NAME_RECENTLY_USED = 'recentlyUsed'

export const GROUPS = [
  GROUP_NAME_PEOPLE,
  GROUP_NAME_NATURE,
  GROUP_NAME_FOOD,
  GROUP_NAME_TRAVEL,
  GROUP_NAME_ACTIVITIES,
  GROUP_NAME_OBJECTS,
  GROUP_NAME_SYMBOLS,
  GROUP_NAME_FLAGS,
  GROUP_NAME_RECENTLY_USED
] as const

export const PROPERTY_DATA_NAME = 'data-name'

export const GROUP_NAMES_ENGLISH = {
  [GROUP_NAME_PEOPLE]: 'smileys & people',
  [GROUP_NAME_NATURE]: 'animals & nature',
  [GROUP_NAME_FOOD]: 'food & drink',
  [GROUP_NAME_TRAVEL]: 'travel & places',
  [GROUP_NAME_OBJECTS]: GROUP_NAME_OBJECTS,
  [GROUP_NAME_ACTIVITIES]: GROUP_NAME_ACTIVITIES,
  [GROUP_NAME_SYMBOLS]: GROUP_NAME_SYMBOLS,
  [GROUP_NAME_FLAGS]: GROUP_NAME_FLAGS,
  [GROUP_NAME_RECENTLY_USED]: 'Recently Used'
}
