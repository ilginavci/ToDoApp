import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import LoginScreen from './screens/LoginScreen'; 
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Navbar {...props} />, // Navbar'ı header olarak ayarlıyoruz
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Not Alma Uygulaması' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Not Ekle' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
