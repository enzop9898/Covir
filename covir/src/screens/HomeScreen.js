import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, LogBox } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext, AuthProvider } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import { Divider } from 'react-native-elements';
import { db } from '../common/crud'; 

const renderContentUtente = (navigation,n,s) => {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
  const { nome, setNome } = useContext(AuthContext);
  var width = Dimensions.get('window').width;

  console.log(nome);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 30, marginTop: 70 }}
          source={require('../images/anziano1.jpg')}
        />
        <Title style={styles.titolo}>Ciao {n}!</Title>
        <Title style={styles.frase}>Prenota il tuo incontro</Title>
      </View>
      <Divider style={{ backgroundColor: '#009bd6', height: 10, width: width , marginTop: 80 }} />
      <View style={styles.container}>
        <Title style={styles.frase2}>Sono prenotabili:</Title>
        <Title style={styles.titolo}>{s} slot</Title>
        <FormButton
          backgroundColor='#2196F3'
          modeValue='contained'
          title='Prenota'
          onPress={() => navigation.navigate('Prenota')} // logout()
        />
      </View>
    </View>
  );
};

const renderContentOperatore = (navigation,n,s) => {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
  const { nome, setNome } = useContext(AuthContext);
  var width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 30, marginTop: 70 }}
          source={require('../images/anziano2.jpg')}
        />
        <Title style={styles.titolo}>Ciao {n}!</Title>
        <Title style={styles.frase}>Dona il tuo tempo per aiutare</Title>
        <Title style={styles.frasesotto}>chi cerca compagnia</Title>
      </View>
      <Divider style={{ backgroundColor: '#009bd6', height: 10, width: width, marginTop: 80 }} />
      <View style={styles.container}>
        <Title style={styles.frase2}>Hai messo a disposizione:</Title>
        <Title style={styles.titolo}>{s} slot</Title>
        <FormButton
          backgroundColor='#2196F3'
          modeValue='contained'
          title='DonaTempo'
          onPress={() => navigation.navigate('Dona tempo')} // logout()
        />
      </View>
    </View>
  );
};


export default function HomeScreen({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
  const { user, logout } = useContext(AuthContext);
  const [ tipo, setTipo ] = useState("");
  const [ nome, setNome ] = useState("");
  const [ numSlot, setNumSlot ] = useState("");
  const [ numSlotTotali, setNumSlotTotali ] = useState("");


  console.log(" tipo utente: " + tipo);

  useEffect(() => {
    console.log("ENTRO NELLA USE EFFECT DI IL MIO PROFILO");
    caricaDati();
  }, []);

  async function caricaDati(){
    LogBox.ignoreLogs(['Warning: ...', 'Require cycle:']);
    var listadisponibiliVol = [];
    var listadisponibiliTot = [];
    var temp = await db.getUtenteByMail(user.email);
    var nS = await db.getAllSlotByVolontario(user.email);
    var dataoggi= new Date(Date.now()+(10*60*1000));
    for(i=0;i<nS.length;i++){
      const datajs = nS[i].dataorainizio.toDate();
      const orafine = nS[i].fine.toDate();
      datajs.setHours(orafine.getHours());
      datajs.setMinutes(orafine.getMinutes());
      if (datajs > dataoggi) listadisponibiliVol.push(nS[i]);
    }
    var nST = await db.getAllSlot();
    for(i=0;i<nST.length;i++){
      const datajs = nST[i].dataorainizio.toDate();
      if (nST[i].occupato == false && datajs > dataoggi) listadisponibiliTot.push(nST[i]);
    }
    setNumSlot(listadisponibiliVol.length);
    setNumSlotTotali(listadisponibiliTot.length);
    setTipo(temp.tipo);
    setNome(temp.nome);
    }
  return (
    <View style={styles.container}>
      { tipo != "volontario" ? renderContentUtente(navigation, nome, numSlotTotali) : renderContentOperatore(navigation, nome, numSlot)}
    </View>
  ); // {{user.uid}}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titolo: {
    fontSize: 30,
    color: '#1979a9'
  },
  frase: {
    fontSize: 22,
    color: '#1979a9'
  },
  frase2: {
    fontSize: 22,
    color: '#1979a9',
    marginTop: -50
  },
  frasesotto: {
    fontSize: 22,
    color: '#1979a9',
    marginTop: -10
  }
});