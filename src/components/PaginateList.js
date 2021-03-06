// @flow
import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { pure } from 'recompose'

type Props = {
  currentPage: number,
  list: Object,
  itemsPerPage: number
}

@pure
export default class PaginateList extends Component {
  props: Props

  defaultProps: {
    currentPage: number
  }

  itemsPerPage: number
  list: Object
  itemsPerPage: number
  numberOfPages: number

  static defaultProps = {
    currentPage: 1
  }

  constructor (props: Props) {
    super(props)

    const { list, itemsPerPage } = this.props

    this.itemsPerPage = itemsPerPage
    this.list = list
    this.numberOfPages = Math.ceil(this.list.count() / this.itemsPerPage)
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.list !== nextProps.list) {
      this.list = nextProps.list
      this.numberOfPages = Math.ceil(this.list.count() / this.itemsPerPage)
    }
  }

  render () {
    const startAt = ((this.props.currentPage - 1) * this.itemsPerPage)
    const endAt = startAt + this.itemsPerPage

    return (
      <View>
        <FlatList
          data={Object.values(this.list.slice(startAt, endAt).toJS())}
          contentContainerStyle={(this.numberOfPages > 1) && { paddingBottom: 30 }}
          {...this.props}
        />
      </View>
    )
  }
}
