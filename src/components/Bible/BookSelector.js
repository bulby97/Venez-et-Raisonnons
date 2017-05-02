import React, { PropTypes, Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import * as BibleActions from '@src/redux/modules/bible'
import books from '@src/helpers/livres'
import { BookSelectorItem, List } from '@src/components'


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
})

@connect(
  state => ({
    selectedBook: state.getIn(['bible', 'temp', 'selectedBook']).toJS(),
  }),
  BibleActions,
)
export default class BookSelector extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setTempSelectedBook: PropTypes.func.isRequired,
    selectedBook: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.onBookChange = ::this.onBookChange
  }

  onBookChange(book) {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('sliding-tab-navigation').jumpToTab('chapitre')
    })
    this.props.setTempSelectedBook(book)
  }

  render() {
    const {
      selectedBook,
    } = this.props

    return (
      <List
        listItems={fromJS(books)}
        renderRow={book =>
          <BookSelectorItem
            onChange={this.onBookChange}
            book={book}
            isSelected={book.Numero === selectedBook.Numero}
          />
        }
        style={styles.container}
      />
    )
  }
}
