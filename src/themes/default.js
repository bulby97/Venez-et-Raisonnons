// @flow

import { globalVariables as globals } from '@src/helpers'

export default {
  colors: {
    default: 'black',
    reverse: 'white',
    border: 'rgb(230,230,230)',
    grey: '#4E4F4F',
    darkGrey: 'rgba(0,0,0,0.5)',
    primary: '#C22839',
    primaryLighten: 'rgba(194, 40, 57, 0.7)',
    primaryDarken: '#AE2333',
    secondary: '#FFBC00',
    tertiary: 'rgb(98,113,122)',
    tertiaryLighten: 'rgba(99, 113, 122, 0.5)',
    quart: '#1A806F'
  },
  fonts: {
    primaryFont: globals.font.title,
    secondaryFont: globals.font.heading,
    tertiaryFont: globals.font.title_italic,
    text: globals.font.text
  }

}
