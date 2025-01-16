import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../home';
import SearchScreen from '../search';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function Tabs() {

  const [fontsLoaded] = useFonts({
      'MyCustomFont': require('../../assets/fonts/BebasNeue.otf'),
    });
  

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else {
            iconName = 'help';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle:{
          backgroundColor:'rgb(41, 35, 35)',
        },
        headerStyle: {
          backgroundColor: '#121212', 
        },
        headerTintColor: 'tomato',
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 35,
          fontFamily: 'MyCustomFont',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen}  />
    </Tab.Navigator>
  );
}
