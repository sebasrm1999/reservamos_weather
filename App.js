import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle : {
          backgroundColor: '#002674'
        },
        headerTintColor: '#067d26'
      }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options = {{title : ''}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
