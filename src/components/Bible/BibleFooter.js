// @flow
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '$color.grey',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3
  }
})

type Props = {
  book: Object,
  chapter: number,
  goToPrevChapter: Function,
  goToNextChapter: Function,
  disabled: boolean
}

const BibleFooter = ({ book, chapter, goToNextChapter, goToPrevChapter, disabled }: Props) => (
  <View style={styles.container}>
    { !(book.Numero === 1 && chapter === 1) &&
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.5}
        style={styles.button}
        onPress={goToPrevChapter}
      >
        <Icon
          name={'chevron-left'}
          size={26}
        />
      </TouchableOpacity>
    }
    <View style={{ flex: 1 }} />
    { !(book.Numero === 66 && chapter === 22) &&
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.5}
        style={styles.button}
        onPress={goToNextChapter}
      >
        <Icon
          name={'chevron-right'}
          size={26}
        />
      </TouchableOpacity>
    }
  </View>
)

export default pure(BibleFooter)
