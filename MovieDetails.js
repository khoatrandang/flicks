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

class MovieDetails extends React.Component {
    render() {
        const props = this.props.navigation.state.params;
        const img = { uri: moviePosterUrl + props.poster_path };
        return (
            <View>
                <Image
                    style={styles.image}
                    source={img}
                />
                <View style={styles.overview}>
                    <HTMLView
                        value={props.overview} />
                </View>
            </View>
        );
    }
}

MovieDetails.propTypes = {
    navigation: PropTypes.shape({
        results: PropTypes.object,
    })
}

export default MovieDetails;

