import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator } from 'react-native';
import MovieCard from './MovieCard';
import { SearchBar } from 'react-native-elements';

const MovieList = (props) => {
    const movies = props.screenProps.movies;

    return (
        <View>
            <SearchBar
                showLoading
                onChangeText={props.screenProps.search}
                platform="ios"
                cancelButtonTitle="Cancel"
                placeholder="search..."
            />
            <FlatList
                refreshing={props.screenProps.loading}
                data={movies}
                keyExtractor={movie => movie.id.toString()}
                onEndReachedThreshold={0.05}
                onEndReached={props.screenProps.loadMore}
                numColumns={1}
                horizontal={false}
                renderItem={movieItem => (
                        <MovieCard
                            movie={movieItem.item}
                            loadDetails={() => {
                                props.navigation.navigate('MovieDetails', movieItem.item);
                            }}
                        />
                    )
                }
                ListFooterComponent={() => (
                    <View>
                        <ActivityIndicator size="large" hidesWhenStopped={!props.screenProps.loading} />
                    </View>
                )}
            />
        </View>
    );
};

MovieList.propTypes = {
    screenProps: PropTypes.shape({
        movies: PropTypes.array,
        loading: PropTypes.bool,
        loadMore: PropTypes.func,
        search: PropTypes.func,
    }),
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    })
};

export default MovieList;