
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
const apiKey = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';

const NowPlayingNavigator = createStackNavigator({
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
			allMovies: [],
			movies: [],
			isLoading: false,
			page: 1,
			searchText: ''
		}

		this.fetchMovies = this.fetchMovies.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
	}

	static router = NowPlayingNavigator.router;

	async componentWillMount() {
		console.log("[NowPlaying] componentWillMount raised");
		try {
			this.movies = await this.fetchMovies(1);
		} catch (e) {
			alert('Error fetching the initial movie list');
			this.movies = [];
		}

		console.log("movies: ", this.movies);

		await this.setState({
			allMovies: this.movies,
			movies   : this.movies,
			isLoading: false
		});
	}

	async fetchMovies(page) {
		try {
			const response = await fetch(`${apiUrl}?api_key=${apiKey}&page=${page}`);
			const data = await response.json();
			console.log(data);
			return data.results;
		} catch (e) {
			console.log('Error fetching the movie list');
			return [];
		}
	}

	async loadMore() {
		this.setState({
			isLoading: true,
		});

		const page = this.state.page + 1;
		try {
			const newResults = await this.fetchMovies(page);
			this.setState({
				page,
				allMovies: this.state.allMovies.concat(newResults)
			});
			this.handleSearch(this.state.searchText);
		} catch (e) {
			alert(`Error while fetching page ${page}`)
		}
	}

	handleSearch(value) {
		console.log("handleSearch: ", value);
		const filteredMovies = this.state.allMovies.filter( m => m.title.indexOf(value) !== -1 );
		this.setState({
			searchText: value,
			movies: filteredMovies !== undefined ? filteredMovies : this.state.allMovies,
			isLoading: false
		});
	}

    resetSearch() { }

	render() {
		return (
			<NowPlayingNavigator navigation={this.props.navigation}
				screenProps={{
					movies: this.state.movies,
					loadMore: this.loadMore,
					search: this.handleSearch,
					loading: this.state.isLoading
				}} />
		);
	}
}

export default NowPlaying;