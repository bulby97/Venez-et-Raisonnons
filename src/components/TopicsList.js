import React, { PropTypes } from 'react';
import { Link } from 'react-router-native';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import List from './List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const TopicsList = ({ topics }) =>
  <List
    listItems={topics}
    renderRow={
      function ({ id, title }) {
        return (
          <Link to={`/topics/${id}`}>
            <View style={styles.row}>
              <Text style={styles.text}>{title}</Text>
            </View>
          </Link>
        );
      }
    }
  />
;

TopicsList.propTypes = {
  topics: PropTypes.object.isRequired,
};

export default TopicsList;
