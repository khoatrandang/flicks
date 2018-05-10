import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import NowPlaying from './NowPlaying';
import TopRated from './TopRated';

const AppNavigator = createBottomTabNavigator({
		NowPlaying: {
			screen: NowPlaying,
			navigationOptions: ({ navigation }) => ({
				title: "Now Playing"
			})
		},
		TopRated: {
			screen: TopRated,
			navigationOptions: ({ navigation }) => ({
				title: "Top Rated"
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
			inactiveTintColor: "black",
			inactiveBackgroundColor: "green",
			labelStyle: {
				fontSize: 16,
				padding: 20
			}
		}
	}
);

class App extends React.Component {
	render() {
		return (
			<AppNavigator />
		);
	}
}

export default App;