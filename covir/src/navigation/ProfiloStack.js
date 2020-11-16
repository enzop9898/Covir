import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/Registrazione';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ScegliSlot from '../screens/ScegliSlotTempo';
import CambioPassword from '../screens/cambioPassword';
import ConfermaPrenot from '../screens/ConfermaPrenotazione';
import ScegliVolontario2 from '../screens/ScegliVolontario2'
import Appuntamenti from '../screens/IMieiAppuntamenti';
import MieiSlot from '../screens/MieiSlot';
import AggiuntaSlot2 from '../screens/AggiuntaSlot2';
import { View, Text, Image } from 'react-native';
import IlmioProfilo from '../screens/IlMioProfilo';


const Stack = createStackNavigator();

function Header() {
  return(
    <Image style={{ width: 50, height: 50}} 
    source= { require('../images/logo.png')}/>
  )
}

export default function AuthStack() {
    return (
      <Stack.Navigator initialRouteName='Profilo'>
        <Stack.Screen name='Profilo' component={IlmioProfilo}  />
        <Stack.Screen name='ImieiAppuntamenti' component={Appuntamenti}  />
        <Stack.Screen name='MieiSlot' component={MieiSlot}  />
        <Stack.Screen name='CambioPass' component={CambioPassword}  />
        
        

      </Stack.Navigator>
    );
  }