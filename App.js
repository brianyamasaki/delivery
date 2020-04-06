import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Provider as ResultsProvider } from './src/context/ResultsContext';
import { Provider as CategoriesProvider } from './src/context/CategoryContext';
import { Provider as PostsProvider } from './src/context/PostsContext';
import SplashScreen from './src/screens/SplashScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import ChooseFlowScreen from './src/screens/ChooseFlowScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  }, []);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <ResultsProvider>
      <CategoriesProvider>
        <PostsProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='ChooseFlow'>
              <Stack.Screen
                name='ChooseFlow'
                component={ChooseFlowScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='Delivery'
                component={DeliveryScreen}
                options={({ navigation }) => ({
                  title: 'Catch-22 Delivery',
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Settings')}
                    >
                      <MaterialIcons name='settings' size={25} />
                    </TouchableOpacity>
                  )
                })}
              />
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen
                name='Details'
                component={DetailsScreen}
                options={{
                  title: 'Business Details'
                }}
              />
              <Stack.Screen name='Settings' component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PostsProvider>
      </CategoriesProvider>
    </ResultsProvider>
  );
}

export default App;
