import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ListFooterComponent, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard';
import { SearchBar } from 'react-native-elements';

class MovieList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }

    componentWillMount() {
		console.log("[MovieList] componentWillMount raised");

        // this.setState({
        //     movies: this.props.screenProps.movies
        // });
	}

    componentWillReceiveProps(receivedProps) {
		console.log("[MovieList] componentWillReceiveProps raised");
        console.log("receivedProps: ", receivedProps);
        // this.setState({
        //     movies: receivedProps.screenProps.movies
        // });
    }

    render() {
        const props = this.props.screenProps;
        const movies = props.movies;

        console.log('props', props);

        return (
            <View>
                <SearchBar
                    showLoading
                    onChangeText={ (val) => props.search(val) }
                    onClear={ props.resetSearch }
                    platform="ios"
                    cancelButtonTitle="Cancel"
                    placeholder='search...' />
                <FlatList
                    refreshing={props.loading}
                    data={movies}
                    keyExtractor={(movie) => movie.id.toString()}
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
                            <ActivityIndicator size="large" hidesWhenStopped={!props.loading} />
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