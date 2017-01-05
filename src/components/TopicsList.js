import React, { PropTypes } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

import List from './List'
import TopicItem from './TopicItem'

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
})

const TopicsList = ({ topics }) =>
  <List
    style={styles.container}
    listItems={topics}
    renderRow={
      function ({ id, title, image_url: imageUrl, questionsCount }) {
        return (
          <TopicItem
            id={id}
            title={title}
            imageUrl={imageUrl}
            questionsCount={questionsCount}
          />
        )
      }
    }
  />


TopicsList.propTypes = {
  topics: PropTypes.object.isRequired,
}

export default TopicsList
