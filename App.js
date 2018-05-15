import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import NowPlaying from './NowPlaying';
import TopRated from './TopRated';

const AppNavigator = createBottomTabNavigator(
	{
		NowPlaying: {
			screen: NowPlaying,
			navigationOptions: () => ({
				title: 'Now Playing'
			})
		},
		TopRated: {
			screen: TopRated,
			navigationOptions: () => ({
				title: 'Top Rated'
			})
		}
	},
	{
		initialRouteName: 'NowPlaying',
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: 'white',
			activeBackgroundColor: 'darkgreen',
			inactiveTintColor: 'black',
			inactiveBackgroundColor: 'green',
			labelStyle: {
				fontSize: 16,
				padding: 20
			}
		}
	}
);

const App = () => (<AppNavigator />);

export default App;
