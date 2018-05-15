import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';

const moviePosterUrl = 'https://image.tmdb.org/t/p/w45';

const styles = StyleSheet.create({
    image: {
        height: 300,
        borderColor: 'blue',
        borderWidth: 1
    },
    overview: {
        margin: 15
    }
});

const MovieDetails = (props) => {
    const navigationParams = props.navigation.state.params;
    const img = { uri: moviePosterUrl + navigationParams.poster_path };
    return (
        <View>
            <Image
                style={styles.image}
                source={img}
            />
            <View style={styles.overview}>
                <HTMLView
                    value={navigationParams.overview} />
            </View>
        </View>
    );
}

MovieDetails.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                poster_path: PropTypes.string,
                overview: PropTypes.string,
            })
        })
    })
}

export default MovieDetails;

