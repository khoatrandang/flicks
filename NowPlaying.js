
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import { StackNavigator } from 'react-navigation';

const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
const apiKey = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';

const Routes = StackNavigator({
	MovieList: {
		screen: MovieList,
		navigationOptions: ({ navigation }) => ({
			title: 'Welcome to Flicks'
		})
	},
	MovieDetails: {
		screen: MovieDetails,
		navigationOptions: ({ navigation }) => ({
			title: `${navigation.state.params.title}`
		})
	}
});

class NowPlaying extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movies: [],
			isLoading: false,
			page: 1
		}

		this.fetchMovies = this.fetchMovies.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	static navigationOptions = {
		tabBarLabel: "Now playing",
		tabBarOnPress: (navigation) => {
			// console.log(navigation);
		}
	}

	async componentWillMount() {
		console.log("[NowPlaying] componentWillMount raised");
		this.fetchMovies(1);
	}

	async fetchMovies(page) {
		this.setState({
			isLoading: true,
		});

		const response = await fetch(`${apiUrl}?api_key=${apiKey}&page=${page}`);
		const data = await response.json();
		console.log(data);
		await this.setState({
			movies: data.results,
			isLoading: false,
		});
	}

	async loadMore() {
		const newPage = this.state.page + 1;
		await this.fetchMovies(newPage);
		this.setState({
			page: newPage
		});
	}

	render() {
		return (
			<Routes
				screenProps={{
					movies: this.state.movies,
					loadMore: this.loadMore,
					loading: this.state.isLoading
				}} />
		);
	}
}

export default NowPlaying;