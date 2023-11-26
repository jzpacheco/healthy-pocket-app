

import React from 'react';
import {
  StyleSheet, View,

} from 'react-native';

import {createAppContainer} from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from './src/screens/HomeScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import TransactionScreen from './src/screens/TransactionScreen';


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





export default createAppContainer(navigator);
