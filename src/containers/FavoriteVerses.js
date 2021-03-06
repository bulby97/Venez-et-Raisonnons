// @flow

import React from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { compose, pure, branch, renderComponent } from 'recompose'
import { Container } from '@ui'
import { Header, NoItems, VersesList } from '@components'

type Props = {
  verseIds: Object
}

const Verses = compose(
  branch(
    ({ verseIds }: Props) => verseIds.isEmpty(),
    renderComponent(() =>
      <NoItems
        icon='bookmark-border'
        text='Aucun favori'
      />
    )
  )
)(({ verseIds }: Props) =>
  <VersesList
    verseIds={verseIds.toJS()}
    isFavorite
  />
)

const FavoriteVerses = ({ verseIds }: Props) => (
  <Container>
    <StatusBar barStyle='light-content' />
    <Header
      title='Favoris'
    />
    <Verses verseIds={verseIds} isFavorite />
  </Container>
)

export default compose(
  pure,
  connect((state) => ({ verseIds: state.getIn(['user', 'bible', 'favorites']) }))
)(FavoriteVerses)
