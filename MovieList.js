import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ListFooterComponent, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard';
import { SearchBar } from 'react-native-elements';

class MovieList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allMovies: [],
            movies: []
        }

        this.resetSearch = this.resetSearch.bind(this);
        this.filterMovies = this.filterMovies.bind(this);
    }

    componentWillMount() {
		console.log("[MovieList] componentWillMount raised");

        this.setState({
            allMovies: this.props.screenProps.movies,
            movies: this.props.screenProps.movies
        });
	}

    componentWillReceiveProps(receivedProps) {
		console.log("[MovieList] componentWillReceiveProps raised");
        console.log("receive", receivedProps);
        this.setState({
            allMovies: receivedProps.screenProps.movies,
            movies: receivedProps.screenProps.movies
        });
    }

    resetSearch() { }

    filterMovies(searchString) {
        const filteredMovies = this.state.allMovies.filter(item => item.title.indexOf(searchString) !== -1);

        this.setState({
            movies: filteredMovies !== undefined ? filteredMovies : this.state.allMovies
        });
    }

    render() {
        const props = this.props.screenProps;
        const movies = this.state.movies;

        console.log('props', props);

        return (
            <View>
                <SearchBar
                    showLoading
                    onChangeText={this.filterMovies}
                    onClear={this.resetSearch}
                    platform="ios"
                    cancelButtonTitle="Cancel"
                    placeholder='search...' />
                <FlatList
                    refreshing={props.loading}
                    data={movies}
                    keyExtractor={(movie) => movie.id}
                    onEndReachedThreshold={0.05}
                    onEndReached={props.loadMore}
                    numColumns={1}
                    horizontal={false}
                    renderItem={(movieItem) => {
                        return (
                            <MovieCard movie={movieItem.item} loadDetails={() => {
                                this.props.navigation.navigate('MovieDetails', movieItem.item);
                            }
                            } />
                        )
                    }}
                    ListFooterComponent={() =>
                        <View>
                            <ActivityIndicator size="large" />
                        </View>
                    }
                />
            </View>
        );
    }
}

MovieList.propTypes = {
    screenProps: PropTypes.shape({
        results: PropTypes.object,
    }),
    navigation: PropTypes.shape({
        results: PropTypes.object,
    })
}

export default MovieList;