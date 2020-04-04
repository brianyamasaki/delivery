import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ResultsProvider } from './src/context/ResultsContext';
import SplashScreen from './src/screens/SplashScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import ChooseFlowScreen from './src/screens/ChooseFlowScreen';

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
            options={{ title: 'Catch-22 Delivery' }}
          />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen
            name='Details'
            component={DetailsScreen}
            options={{ title: 'Business Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ResultsProvider>
  );
}

export default App;
