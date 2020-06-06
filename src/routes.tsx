import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Detail from './pages/detail';
import Home from './pages/home';
import Points from './pages/points';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
