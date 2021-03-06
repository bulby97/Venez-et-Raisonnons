// @flow
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { pure, compose } from 'recompose'
import getDB from '../../helpers/database'
import * as BibleActions from '../../redux/modules/bible'
import { SelectorItem } from '../../components'

import { type Book } from '../../types'

const styles: Object = EStyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    paddingLeft: 10,
    paddingRight: 10
  }
})

type Props = {
  screenProps: Object,
  setTempSelectedVerse: Function,
  validateSelected: Function,
  selectedBook: Book,
  selectedChapter: number,
  selectedVerse: number
}

class VerseSelector extends Component {
  props: Props
  verses: Array<{ count: number }>
  DB: Object

  static navigationOptions = {
    tabBarLabel: 'Verset'
  }

  state = {
    isLoaded: false
  }

  componentWillMount () {
    this.DB = getDB()
    this.loadVerses()
  }

  componentDidUpdate (oldProps: Props) {
    if (
      (this.props.selectedChapter !== oldProps.selectedChapter) ||
      this.props.selectedBook.Numero !== oldProps.selectedBook.Numero) {
      this.loadVerses()
    }
  }

  onValidate = (verse: number) => {
    this.props.setTempSelectedVerse(verse)
    this.props.validateSelected()
    setTimeout(() => this.props.screenProps.mainNavigation.goBack(), 0)
  }

  loadVerses () {
    const { selectedBook, selectedChapter } = this.props
    const part = selectedBook.Numero > 39 ? 'LSGSNT2' : 'LSGSAT2'
    this.verses = []
    this.setState({ isLoaded: false })
    this.DB.executeSql(`SELECT count(*) as count FROM ${part} WHERE Livre = ${selectedBook.Numero} AND Chapitre = ${selectedChapter}`)
      .then(([results]) => {
        const len = results.rows.length
        for (let i = 0; i < len; i += 1) { this.verses.push(results.rows.item(i)) }
        this.setState({ isLoaded: true })
      })
  }

  render () {
    const { isLoaded } = this.state
    const {
      selectedVerse
    } = this.props

    if (!isLoaded) {
      return null
    }

    const array = Array(...Array(this.verses[0].count)).map((_, i) => i)

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {array.map(v =>
          <SelectorItem
            key={v}
            item={v + 1}
            isSelected={selectedVerse === (v + 1)}
            onChange={this.onValidate}
          />
        )}
      </ScrollView>
    )
  }
}

export default compose(
  pure,
  connect(
    state => ({
      selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS(),
      selectedChapter: state.getIn(['bible', 'temp', 'selectedChapter']),
      selectedVerse: state.getIn(['bible', 'temp', 'selectedVerse'])
    }),
    { ...BibleActions }
  )
)(VerseSelector)
