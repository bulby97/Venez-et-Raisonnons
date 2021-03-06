// @flow
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { pure, compose } from 'recompose'
import getDB from '@src/helpers/database'
import { BibleVerse, BibleFooter, Loading, SelectedVersesModal } from '@src/components'
import { loadBible } from '@src/helpers'
import * as BibleActions from '@src/redux/modules/bible'

import type { Verse, Book } from '../../types'

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 40
  },
  button: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: 'white',
    borderColor: '$color.primary',
    borderRadius: 5,
    borderWidth: 2
  },
  buttonText: {
    color: '$color.primary'
  }
})

type Props = {
  arrayVerses?: {
    book: Book,
    chapter: number,
    verses: Array<number>
  },
  book: Book,
  chapter: number,
  clearSelectedVerses: Function,
  goToPrevChapter?: Function,
  goToNextChapter?: Function,
  navigation: Object,
  verse: number,
  version: string
}

type State = {
  isLoading: boolean,
  verses: Array<Verse>
}

class BibleViewer extends Component {
  props: Props
  state: State

  state = {
    isLoading: true,
    verses: []
  }

  DB: Object
  versesMeasure: Object
  scrollView: Object
  contentHeight: number
  scrollViewHeight: number

  componentWillMount () {
    this.DB = getDB()
    setTimeout(() => this.loadVerses(), 500)
    this.props.clearSelectedVerses()
  }

  componentWillReceiveProps (oldProps: Props) {
    if (
      (this.props.chapter !== oldProps.chapter) ||
      (this.props.book.Numero !== oldProps.book.Numero) ||
      (this.props.version !== oldProps.version)
    ) {
      setTimeout(() => this.loadVerses(), 0)
      this.props.clearSelectedVerses()
    }

    // Scroll ONLY when verse change ALONE
    if (
      (this.props.verse !== oldProps.verse) &&
      (this.props.chapter === oldProps.chapter) &&
      (this.props.book.Numero === oldProps.book.Numero)
    ) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  getPosition = (numVerset: number, measures: Object) => {
    this.versesMeasure[`verse${numVerset}`] = measures
    // We need to wait 'til every Bible verse component get calculated
    if (Object.keys(this.versesMeasure).length === this.state.verses.length) {
      setTimeout(() => this.scrollToVerse(), 0)
    }
  }

  scrollToVerse = () => {
    const { verse } = this.props
    if (this.versesMeasure[`verse${verse}`] && this.scrollView) {
      const scrollHeight = (this.contentHeight - this.scrollViewHeight) + 20
      const y = (verse === 1) ? 0 : this.versesMeasure[`verse${verse}`].py - 75

      this.scrollView.scrollTo({
        x: 0,
        y: (y >= scrollHeight) ? scrollHeight : y,
        animated: false
      })
    }
  }

  loadVerses () {
    const { book, chapter, version } = this.props
    let tempVerses: Array<Verse>
    this.versesMeasure = {}

    if (version === 'STRONG') {
      const part = book.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
      this.setState({ isLoading: true })
      this.DB.executeSql(`SELECT * FROM ${part} WHERE LIVRE = ${book.Numero} AND CHAPITRE  = ${chapter}`)
        .then(([results]) => {
          const len = results.rows.length
          tempVerses = []
          for (let i = 0; i < len; i += 1) { tempVerses.push(results.rows.item(i)) }
          this.setState({ isLoading: false, verses: tempVerses })
        })
    } else {
      this.setState({ isLoading: true })
      loadBible(version)
      .then((res) => {
        const versesByChapter = res[book.Numero][chapter]
        tempVerses = []
        tempVerses = Object.keys(versesByChapter)
          .map(v => ({ Verset: v, Texte: versesByChapter[v], Livre: book.Numero, Chapitre: chapter }))
        this.setState({ isLoading: false, verses: tempVerses })
      })
    }
  }

  renderVerses = () => {
    const { version, arrayVerses, book, chapter } = this.props
    let array = this.state.verses

    if (arrayVerses && book.Numero === arrayVerses.book.Numero && chapter === arrayVerses.chapter) {
      array = array.filter(v => arrayVerses.verses.find(aV => aV === Number(v.Verset)))
    }

    return array.map(verse =>
      <BibleVerse
        version={version}
        verse={verse}
        key={`${verse.Verset}${verse.Livre}${verse.Chapitre}`}
        getPosition={this.getPosition}
      />
    )
  }

  render () {
    const { isLoading } = this.state
    const { book, chapter, arrayVerses, navigation, goToPrevChapter, goToNextChapter } = this.props

    if (isLoading) {
      return (<Loading />)
    }

    return (
      <View
        style={styles.container}
      >
        <ScrollView
          ref={(r) => { this.scrollView = r }}
          onContentSizeChange={(w, h) => { this.contentHeight = h }}
          onLayout={(ev) => { this.scrollViewHeight = ev.nativeEvent.layout.height }}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollView}
        >
          {this.renderVerses()}
          {
            !!arrayVerses &&
            <Button
              title='Lire le chapitre entier'
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => navigation.navigate('bible', { hasBack: true, verse: arrayVerses.verses[0] })}
            />
          }
        </ScrollView>
        {
          !arrayVerses &&
          <BibleFooter
            disabled={isLoading}
            book={book}
            chapter={chapter}
            goToPrevChapter={goToPrevChapter}
            goToNextChapter={goToNextChapter}
          />
        }
        <SelectedVersesModal verses={this.state.verses} />
      </View>
    )
  }
}

export default compose(
  pure,
  connect(
    null,
    { ...BibleActions }
  )
)(BibleViewer)
