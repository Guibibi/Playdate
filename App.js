import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

// Screens
import DiscoverScreen from './pages/DiscoverScreen';
import MessageScreen from './pages/MessageScreen';

export default function App() {

  // Initialize the BottomTab
  const Tab = createMaterialBottomTabNavigator();

  //TODO: Add a focused and unfocused icon

  return (
    <NavigationContainer>
      <SafeAreaProvider style={{height: '100%'}}>
        <StatusBar style='dark' translucent={false} />
        <Tab.Navigator>
          <Tab.Screen name="Discover" component={DiscoverScreen} options={{tabBarIcon: 'dog'}} />
          <Tab.Screen name='Messages' component={MessageScreen} options={{tabBarIcon: 'message'}} />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

