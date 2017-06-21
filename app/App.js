import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';


const SimpleApp = TabNavigator({
  Home: { screen: HomeScreen },
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'white',
  },
});

AppRegistry.registerComponent('lab2', () => SimpleApp);

