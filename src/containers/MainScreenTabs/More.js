import React, { PropTypes } from 'react'
import { SnackBar } from '@components'
import { List, ListItem } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import {
  ScrollView,
  Alert,
  Linking,
  Platform,
  Share
} from 'react-native'
import { persistedStore } from '@src/App'
import { Container } from '@src/styled'
import { Header } from '@src/components'

// const primaryList = [
//   {
//     title: 'Poser une question',
//     icon: 'add-circle',
//     onPress (navigation) {
//       navigation.navigate('add')
//     }
//   },
//   {
//     title: 'Chercher une question',
//     icon: 'search',
//     onPress (navigator) {
//       navigator.navigate('search')
//     }
//   }
// ]

const secondaryList = [
  {
    title: 'À propos',
    icon: 'info',
    onPress (navigation) {
      navigation.navigate('about')
    }
  },
  {
    title: 'Astuces',
    icon: 'help-outline',
    onPress (navigation) {
      navigation.navigate('astuces')
    }
  },
  {
    title: 'Idées de fonctionnalités',
    icon: 'lightbulb-outline',
    onPress () {
      Linking.openURL('https://venez-et-raisonnons.canny.io/fonctionnalites')
    }
  },
  {
    title: 'Signaler un bug',
    icon: 'bug-report',
    onPress () {
      Linking.openURL('https://venez-et-raisonnons.canny.io/bugs')
    }
  },
  {
    title: 'Nous soutenir',
    icon: 'thumb-up',
    onPress () {
      Linking
        .openURL('https://igg.me/at/CVE7THZnG6w')
        .catch(err => console.log(err))
    }
  },
  // {
  //   title: 'Réseaux sociaux',
  //   icon: 'share'
  // },
  {
    title: 'Noter l\'application',
    icon: 'star',
    onPress () {
      const url = (Platform.OS === 'ios')
      ? 'https://itunes.apple.com/us/app/venez-et-raisonnons/id1206099949?mt=8'
      : 'https://play.google.com/store/apps/details?id=com.pleadapp&hl=fr'

      Linking.openURL(url)
    }
  },
  {
    title: 'Partager l\'application',
    icon: 'share',
    onPress () {
      const url = 'https://itunes.apple.com/us/app/venez-et-raisonnons/id1206099949?mt=8' // iOS only

      Share.share({
        message: (Platform.OS === 'ios') ? 'Venez et Raisonnons !' : 'Venez et Raisonnons ! https://play.google.com/store/apps/details?id=com.pleadapp&hl=fr',
        url
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  },
  {
    title: 'Nous contacter',
    icon: 'mail',
    onPress () {
      Linking.openURL('mailto:venezetraisonnons@gmail.com')
    }
  }
]

const tertiaryList = [
  {
    title: 'Effacer les données sauvegardées',
    icon: 'delete-forever',
    onPress () {
      Alert.alert(
        'Effacer les données',
        'Toutes les données sauvegardées (questions, images, favoris) seront définitivement effacées à votre prochaine connexion et devront être re-téléchargées. Êtes-vous sur de vouloir tout supprimer ?',
        [
          { text: 'Annuler', onPress: () => {}, style: 'cancel' },
          {
            text: 'Effacer',
            onPress: () => {
              persistedStore.purge()
              // @TODO - Unlink everyfile too
              SnackBar.show('Toutes les données ont été effacées.')
            },
            style: 'destructive'
          }
        ]
      )
    }
  }
]

const More = ({ navigation }) =>
  <Container grey>
    <Header
      title='Plus'
      hasBackButton={false}
    />
    <ScrollView>
      {/* <List>
        {
          primaryList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => item.onPress && item.onPress(navigation)}
            />
          ))
        }
      </List> */}
      <List>
        {
          secondaryList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => item.onPress && item.onPress(navigation)}
            />
          ))
        }
      </List>
      <List>
        {
          tertiaryList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => item.onPress && item.onPress(navigation)}
            />
          ))
        }
      </List>
    </ScrollView>
  </Container>

More.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default withNavigation(More)
