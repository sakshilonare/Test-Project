import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const searchMovies = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  };

  const renderMovie = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => router.push({ pathname: '/details', params: { movie: JSON.stringify(item.show) } })}
    >
      <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary}>
          {item.show.summary ? item.show.summary.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : 'No summary available'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a movie..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={searchMovies}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={renderMovie}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: wp('3%') },
  searchContainer: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
    backgroundColor: '#1e1e1e',
    padding: wp('2%'),
    borderRadius: wp('2%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  thumbnail: {
    width: wp('20%'),
    marginRight: wp('3%'),
    borderRadius: wp('2%'),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  summary: {
    color: '#ccc',
    fontSize: wp('3.5%'),
  },
  list: {
    paddingBottom: hp('2%'),
  },
});
