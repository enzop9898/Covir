// React Native Time Picker – To Pick the Time using Native Time Picker
// https://aboutreact.com/react-native-timepicker/

// import React in our code
import React, { useState,useContext,useEffect } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Platform, Button, LogBox } from 'react-native';

//import TimePicker from the package we installed
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Card, Icon } from 'react-native-elements'; import { color } from 'react-native-reanimated';
import { db } from '../common/crud';
const { width, height } = Dimensions.get('screen');
LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);

export default function AggiuntaSlot({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

  /*const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);*/

  const [dateG, setDateG] = useState(new Date());
  const [dateDO, setDateDO] = useState(new Date());
  const [dateAO, setDateAO] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showG, setShowG] = useState(false);
  const [showDO, setShowDO] = useState(false);
  const [showAO, setShowAO] = useState(false);
  const {user,setUser} = useContext(AuthContext);
 


  const onChangeG = (event, selectedDate) => {
    LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
    const currentDate = selectedDate || dateG;
    setDateG(currentDate);
    setShowG(false);
    console.log("GIORNO " + dateG + " showG " + showG);
  };

  const onChangeDO = (event, selectedDate) => {
    const anno = dateG.getFullYear();
    const mese = dateG.getMonth();
    const giorno = dateG.getDate();
    const ora = selectedDate.getHours();
    const min =selectedDate.getMinutes();
    const sec = selectedDate.getSeconds();
    const databuona = new Date(anno,mese,giorno,ora,min,sec,0);
    const currentDate = databuona;
    setDateDO(currentDate);
    setShowDO(false);
    console.log("DALLE ORE " + dateDO + " showDO " + showDO);
  };

  const onChangeAO = (event, selectedDate) => {
    const anno = dateG.getFullYear();
    const mese = dateG.getMonth();
    const giorno = dateG.getDate();
    const ora = selectedDate.getHours();
    const min =selectedDate.getMinutes();
    const sec = selectedDate.getSeconds();
    const databuona = new Date(anno,mese,giorno,ora,min,sec,0);
    const currentDate = databuona;
    setDateAO(currentDate);
    setShowAO(false);
    console.log("ALLE ORE " + dateAO + " showAO " + showAO);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const showDatepickerG = () => {
    setShowG(true);
    showMode('date');
  };

  const showTimepickerDO = () => {
    setShowDO(true);
    showMode('time');
  };

  const showTimepickerAO = () => {
    setShowAO(true);
    showMode('time');
  };

  async function confermadonatempo(){
    LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
       const list = await db.getAllSlot();
       var num = list[0].id+1;
       const slot = {chiavevolontario:user.email, dataorainizio:dateG, fine:dateAO , id:num,inizio:dateDO,occupato:false};
       db.addSlot(slot);
  }

  return (
    <View style={styles.container}>
      <View containerStyle={styles.container1}>
        <Text style={styles.scelta}>Selezione data e ora</Text>
        <Card containerStyle={styles.card}>
        </Card>
      </View>
      <View>
      <View style ={styles.mnng}>
        <Button color='#1979a9' onPress={showDatepickerG} title="Giorno:" />
        <Text style={styles.centrato} testID="Giorno">
          {dateG !== undefined ? moment(dateG).format('DD/MM/YYYY') : moment.format('DD/MM/YYYY')}
        </Text>
        </View>
        <View style={styles.mnng}>
        <Button color='#1979a9'onPress={showTimepickerDO} title="Dalle ore:" />
        <Text style={styles.centrato} testID="DalleOre">
          {dateDO !== undefined ? moment(dateDO).format('HH:mm') : moment.format('HH:mm')}
        </Text>
        </View>
        <View style={styles.mnng}>
        <Button color='#1979a9' onPress={showTimepickerAO} title="Alle ore:" />
        <Text style={styles.centrato} testID="AlleOre">
          {dateAO !== undefined ? moment(dateAO).format('HH:mm') : moment.format('HH:mm')}
        </Text>
        </View>
      </View>
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
      {showDO && (
        
        <DateTimePicker
          testID="dateTimePickerDO"
          value={dateDO}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeDO}
          minuteInterval={30}
        />
        
      )}
      {showAO && (
        <DateTimePicker
          testID="dateTimePickerAO"
          value={dateAO}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeAO}
          minuteInterval={30}
        />
      )}
      <View style={styles.container300}>
      <FormButton
          containerStyle={styles.bottone}
          title='Conferma'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() => {confermadonatempo(); navigation.navigate('Home');}}  //{() => login(email, password)}
        />
        </View>
    </View>
  );
};



const styles = StyleSheet.create({
  scelta: {
    fontSize: 26,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: '10%',
    marginRight: '10%',
    color: '#1979a9',
    fontWeight: "bold"
  },
  centrato:{
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: '0%',
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#1979a9',
    borderWidth: 0,
    height: 30,
    width: '100%',
    padding: 7,
    marginBottom: '0%',
    marginLeft: '0%'


  },
  loginButtonLabel: {
    fontSize: 22,
    marginLeft: '0%',
    textAlign: 'center'
  },
  container: {
    backgroundColor: '#f5f5f5',
    alignItems: 'stretch',

    justifyContent: 'center'
  },
  container1: {
    marginTop: '20%',
    marginBottom: '10%',
    flex: 1
  },
  container2: {
    flex: 2,
    width: '70%',

  },
  container300: {
    marginTop:'16%',
    marginLeft:'25%',
    marginLeft:'25%',
    width: '50%',

  },

  mnng: {
    marginTop:'12%',
    marginLeft:'25%',
    marginLeft:'25%',
    width: '50%',
  },
  bttn:{
    borderRadius: 15,
    backgroundColor: '#1979a9'
  },
  coloreBott: {
    marginTop: 20,
    backgroundColor: '#1979a9',
    borderRadius: 9,
    width: width / 1.5,
    height: height / 16,
    justifyContent: 'center',
    alignItems: 'center'
  }

});