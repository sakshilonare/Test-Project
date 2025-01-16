import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  const { movie } = useLocalSearchParams();

  // Ensure `movie` is a string
  if (!movie || typeof movie !== 'string') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movie details not found!</Text>
      </View>
    );
  }

  const parsedMovie = JSON.parse(movie);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: parsedMovie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{parsedMovie.name}</Text>
      <Text style={styles.summary}>{parsedMovie.summary?.replace(/<[^>]*>/g, '')}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  image: { width: '100%', height: 350, borderRadius: 10, margin: 5 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  summary: { color: '#ccc', fontSize: 12 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  errorText: { color: 'red', fontSize: 18, fontWeight: 'bold' },
});
