// @flow
import React from 'react'
import Modal from 'react-native-modalbox'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { pure } from 'recompose'

import { Loading } from '@src/components'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: '$font.title',
    fontSize: 20
  },
  titleBorder: {
    marginTop: 20,
    marginBottom: 20,
    width: 35,
    height: 3,
    backgroundColor: '$color.secondary'
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '$color.tertiary'
  },
  strong: {
    fontWeight: 'bold'
  },

  // Modal
  modal: {
    backgroundColor: '#EFF0F4',
    padding: 20,
    height: '80%'
  }
})

type Props = {
  isLoading: boolean,
  title: string,
  text: any,
  refValue: Function
}

const VerseModal = ({ isLoading, title, text, refValue }: Props) => {
  let content

  // To be refactored
  if (!Array.isArray(text)) {
    content = text
  } else {
    content = text.map(t =>
      <Text key={t.verse}> <Text style={styles.strong}>{t.verse}</Text> {t.text} </Text>
    )
  }
  return (
    <Modal
      style={styles.modal}
      backButtonClose
      position='bottom'
      ref={refValue}
    >
      {
        isLoading &&
        <Loading />
      }
      {
        !isLoading &&
        <View>
          <Text style={styles.title}>{title} (DBY)</Text>
          <View style={styles.titleBorder} />
          <Text style={styles.text}>{content}</Text>
        </View>
      }
    </Modal>
  )
}

export default pure(VerseModal)
