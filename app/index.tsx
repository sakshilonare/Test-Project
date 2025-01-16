import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

export default function SplashScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('../assets/fonts/BebasNeue.otf'),
  });

  return (
    <ImageBackground
      source={require('../assets/images/wallpaper.jpg')}
      resizeMode="cover" 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>MovieFlix</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 0, 0, 0.79)', 
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 50,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'MyCustomFont',
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
