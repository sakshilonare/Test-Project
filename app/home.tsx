import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface MovieItem {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    };
  };
  empty?: boolean;
}

const formatData = (data: MovieItem[], numColumns: number): MovieItem[] => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ show: { id: -1, name: '', image: undefined }, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const getNumColumns = () => {
  const screenWidth = Dimensions.get('window').width;

  if (screenWidth >= 1200) return 6; // Web browser (large screens)
  if (screenWidth >= 768) return 4; // Tablets
  return 2; // Default for mobile
};

export default function HomeScreen() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setNumColumns(getNumColumns());
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=the')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const renderMovie = ({ item }: { item: MovieItem }) => {
    if (item.empty) {
      return <View style={[styles.movieContainer, styles.itemInvisible]} />;
    }

    // Dynamically calculate the width and height using responsive dimensions
    const containerWidth = wp(90) / numColumns; // Total width divided by the number of columns
    const containerHeight = containerWidth * 1.5; // Maintain 2:3 aspect ratio

    return (
      <TouchableOpacity
        style={[
          styles.movieContainer,
          { width: containerWidth, height: containerHeight },
        ]}
        onPress={() => router.push({ pathname: '/details', params: { movie: JSON.stringify(item.show) } })}
      >
        <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
        <Text style={styles.title}>{item.show.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => router.push('/search')}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a movie..."
          placeholderTextColor="#aaa"
          editable={false}
        />
      </TouchableOpacity>

      <FlatList
        data={formatData(movies, numColumns)}
        keyExtractor={(item, index) => `${item.show.id}-${index}`}
        renderItem={renderMovie}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
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
  list: { paddingBottom: 20 },
  movieContainer: {
    flexDirection: 'column',
    margin: wp(1.5), // Margin based on percentage width
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '80%',
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: hp(1.8), // Font size relative to screen height
    marginTop: 5,
    textAlign: 'center',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
