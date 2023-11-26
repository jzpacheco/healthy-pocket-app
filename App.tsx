

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


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Transaction: TransactionScreen,
    Analytics: AnalyticsScreen
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
    </TransactionProvider>
  )
}

export default App;
