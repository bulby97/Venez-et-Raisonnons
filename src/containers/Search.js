import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import R from 'ramda'
import debounce from 'debounce'
import { View, StatusBar } from 'react-native'
import * as SearchActions from '@src/redux/modules/search'
import {
  SearchHeader,
  QuestionsList,
  NoItems
} from '@src/components'

const getSearchInput = state => state.get('search').get('input')
const getQuestions = state => state.get('questions').get('questions')

const findQuestion = input => question => question.get('title').toLowerCase().includes(input.toLowerCase())

const filterQuestionsBySearch = createSelector(
  [getSearchInput, getQuestions],
  (input, questions) => R.pipe(
    R.filter(findQuestion(input)),
    R.slice(0, 20)
  )(questions)
)

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

const IfQuestions = (input, questions) => {
  if (!input) {
    return (
      <NoItems
        icon='search'
        text='Rechercher une question'
      />
    )
  }

  if (questions.isEmpty()) {
    return (
      <NoItems
        icon='sentiment-dissatisfied'
        text='Aucune question trouvée'
      />
    )
  }

  return (
    <QuestionsList
      questions={questions}
    />
  )
}

const Search = ({ questions, setSearchInput, input }) => (
  <View style={styles.container}>
    <StatusBar barStyle='light-content' />
    <SearchHeader
      placeholder='RECHERCHE'
      onChangeText={value => debounce(setSearchInput(value), 500)}
      hasBackButton
    />
    {IfQuestions(input, questions)}
  </View>
)

Search.propTypes = {
  input: PropTypes.string.isRequired,
  questions: PropTypes.object.isRequired,
  setSearchInput: PropTypes.func.isRequired
}

export default connect(
  state => ({
    questions: filterQuestionsBySearch(state),
    input: getSearchInput(state)
  }),
  SearchActions
)(Search)
