// // @flow
// import { Component, PropTypes } from 'react'
// import { withNavigation } from 'react-navigation'
// import qs from 'query-string'
// import { SnackBar } from '@components'
// import { pure } from 'recompose'

// import {
//   Linking
// } from 'react-native'
// import { store } from '@src/App'
// import { Router } from '@src/routes'

// @withNavigation
// @pure
// export default class DeepLinking extends Component {
//   static propTypes = {
//     navigation: PropTypes.object.isRequired
//   }

//   componentWillMount () {
//     Linking.getInitialURL().then((url) => {
//       if (url) this.handleOpenURL({ url })
//     }).catch(() => SnackBar.show('Lien invalide'))

//     Linking.addEventListener('url', this.handleOpenURL)
//   }

//   componentWillUnmount () {
//     Linking.removeEventListener('url', this.handleOpenURL)
//   }

//   handleOpenURL = (e) => {
//     const { navigation } = this.props
//     const url = e.url.replace('venezetraisonnons://', '').split('?')
//     const [path, urlParams] = url
//     const params = qs.parse(urlParams)

//     const isQuestion = (path === 'question' && params.questionId)
//     const hasQuestion = params.questionId ? store.getState().questions.get('questions').get(params.questionId) : null
//     if (isQuestion && hasQuestion) {
//       navigation.navigate(Router.getRoute(path, params))
//     } else {
//       SnackBar.show('Lien invalide')
//     }
//   }

//   render () {
//     return null
//   }
// }
