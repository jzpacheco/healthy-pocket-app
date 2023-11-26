

import React from 'react';
import {
  StyleSheet, View,

} from 'react-native';

import {createAppContainer} from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from './src/screens/HomeScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import { TransactionProvider } from './src/context/TransactionContext';
import Toast from 'react-native-toast-message';
import EditTransactionScreen from './src/screens/EditTransactionScreen';


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Transaction: TransactionScreen,
    Analytics: AnalyticsScreen,
    EditTransaction: EditTransactionScreen
},
{
  initialRouteName:"Home",
  defaultNavigationOptions:{
    title: "Healthy Pocket",
  }
}
)

const AppContainer = createAppContainer(navigator)

const App = () => {
  return(
    <TransactionProvider>
      <AppContainer />
      <Toast/>
    </TransactionProvider>
  )
}

export default App;
