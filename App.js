import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle : {
          backgroundColor: '#FFF'
        },
        headerTintColor: '#067d26'
      }}
      >
        <Stack.Screen
          name='Login'
          component={Login}
          options = {{title : ''}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
