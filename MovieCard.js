import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

const moviePosterUrl = 'https://image.tmdb.org/t/p/w342';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 150,
        width: '100%',
        paddingTop: 10
    },
    image: {
        width: '25%',
        height: 80,
    },
    title: {
        width: '75%',
        marginLeft: 10,
        color: 'black',
        fontSize: 20

    },
    overview: {
        width: '75%',
        marginLeft: 10,

    }
});

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props.movie;
        const img = { uri: moviePosterUrl + props.poster_path };
        return (
            <TouchableHighlight onPress={this.props.loadDetails}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={img}
                    />
                    <View>
                        <Text style={styles.title}> {props.title} </Text>
                        <Text style={styles.overview}>  {props.overview} </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        results: PropTypes.array,
    })
}

export default MovieCard;
