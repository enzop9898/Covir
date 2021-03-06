import React, { useState, useContext } from 'react';
import {View, StyleSheet, Text, Dimensions, Keyboard, TouchableWithoutFeedback,Button } from 'react-native';
import { Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormButton2 from '../components/FormButton2';
import CheckBox from '@react-native-community/checkbox';
import Swiper from 'react-native-swiper';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AuthContext, AuthProvider } from '../navigation/AuthProvider';
import { db } from '../common/crud';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

function Volontario(props){
return <FormInput labelName='Associazione' value= {props[0]} autoCapitalize='none' onChangeText={associazione => props[1](associazione)}></FormInput>;
}
function NVolontario(props){
  return ;
}
/*
function registrazione(obj,isSelected){
  if(isSelected==true){
    db.addVolontario(obj);
  }
  else{
    const utenteric={email:obj.email, nome:obj.nome, cognome:obj.cognome, datanascita:obj.datanascita, descrizione:obj.descrizione, password:obj.password};
    db.addUtente(utenteric);
  }
}*/
export default function Registrazione({navigation}) {
    //const { login } = useContext(AuthContext);
    const {register} = useContext(AuthContext);
    const [nome, setnome] = useState('');
    const [cognome, setcognome] = useState('');
    const [cellulare, setCellulare] = useState('');
    const [DNascita, setDNascita] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [associazione, setAssociazione] = useState('');

    const [dateG, setDateG] = useState(new Date());
    const [dateDO, setDateDO] = useState(new Date());
    const [dateAO, setDateAO] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showG, setShowG] = useState(false);
    const [showDO, setShowDO] = useState(false);
    const [showAO, setShowAO] = useState(false);
  
    const onChangeG = (event, selectedDate) => {
      const currentDate = selectedDate || dateG;
      setDateG(currentDate);
      setShowG(false);
      setDNascita(selectedDate);
      };

    const showMode = (currentMode) => {
      setMode(currentMode);
    };
  
    const showDatepickerG = () => {
      setShowG(true);
      showMode('date');
    };
  
    
  
    return (
      <TouchableWithoutFeedback onPress= {() => {Keyboard.dismiss();}}>
      <View style={styles.container}>
        <View style= {styles.container2}>
        <Title style={styles.titleText}>Registrazione</Title>
        <FormInput
          labelName='Nome'
          value={nome}
          autoCapitalize='none'
          onChangeText={userName => setnome(userName)}
        />
        <FormInput
          labelName='Cognome'
          value={cognome}
          autoCapitalize='none'
          onChangeText={userCognome => setcognome(userCognome)}
        /><View style={styles.part}>
        <Button color="#1979a9" onPress={showDatepickerG} title="Data di nascita:" /></View>
        <Text style= {styles.giornotesto} testID="Giorno">
          {dateG !== undefined ? moment(dateG).format('DD/MM/YYYY') : moment.format('DD/MM/YYYY')}
        </Text>
        <View>
        {showG && (
        <DateTimePicker
          testID="dateTimePickerG"
          value={dateG}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeG}
          minuteInterval={30}
        />
      )}
        </View>
        <FormInput
          labelName='Cellulare'
          value={cellulare}
          autoCapitalize='none'
          onChangeText={userCel => setCellulare(userCel)}
        />
        <FormInput
          labelName='Email'
          value={email}
          autoCapitalize='none'
          onChangeText={userEmail => setEmail(userEmail)}
        />
        <FormInput
          labelName='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={userPassword => setPassword(userPassword)}
        />
        <View style={styles.containerView}>
        <Text style={styles.label}>Sei un volontario?</Text>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        /> 
        
        </View>
        {isSelected ? Volontario(associazione, setAssociazione) : NVolontario()}
        <FormButton2
          title='Registrati'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() =>{register({descrizioneUtente:"",email:email, nome:nome, cognome:cognome, datanascita:DNascita, cellulare:cellulare, password:password, associazione:associazione},isSelected);}} //navigation.navigate('HomeTab')}  //deve andare alla schermata del documento
          //onPress={() =>{ registrazione({email:email, nome:nome, cognome:cognome, datanascita:DNascita, descrizione:descrizione, password:password, associazione:associazione},isSelected ); register(email, password);}} //navigation.navigate('HomeTab')}  //deve andare alla schermata del documento
          //onPress={() =>{ registrazione({email:email, nome:nome, cognome:cognome, datanascita:DNascita, descrizione:descrizione, password:password, associazione:associazione},isSelected ); register(email, password);}} //navigation.navigate('HomeTab')}  //deve andare alla schermata del documento

        />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    part: {
      marginTop:'4%',
    },
    giornotesto: {
      fontSize: 17,
      marginBottom: 10,
      marginTop: 15,
      textAlign: 'center',
      fontWeight: "bold"
    },

    containerView:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    checkbox: {
      alignSelf: "center",
    },
    register:{
      fontSize: 17,
      marginBottom: 10,
      marginTop: 15,
      textAlign: 'center',
      color: '#9ca2ad',
      textDecorationLine: 'underline'
      
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10,
      marginTop: 25,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    loginButtonLabel: {
      fontSize: 22,
      marginLeft: '26%'
    },
    navButtonText: {
      fontSize: 16
    },
    container1: {
      flex: 1
    },
    container2: {
      flex: 2.5
    },
    swiper: {
      alignItems: 'flex-start'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },

    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: '10%',
      marginRight:'10%'
    },
    label:{
    color: '#1979a9',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 3,
    marginRight: 10
    }
  });