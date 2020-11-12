import React /*, { useContext }*/ from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Title } from 'react-native-paper';
//import { AuthContext } from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

var utente=2;

const renderContentOperatore = () => {
  return (
    <View style={styles.container}>
        <View style={styles.welcome}>
            <View style={styles.welcome2}>
                <Image
                style={{ width: 150, height: 150, borderRadius: 100,marginTop: 15,marginLeft: 10}}
                source={require('../images/anziano1.jpg')}
                />
            </View>
            <View style={styles.welcome2}>
                <Title style={styles.frase}>Vincenzo Pecoraro</Title> 
                <Title style={styles.frase2}>vpec998@gmail.com</Title> 
                <Title style={styles.frase2}>+39/3206613981</Title> 
            </View>
        </View>
           
        <View style={styles.welcome3}>
            <Title style={styles.frasesotto2}>Ciao, mi chiamo Vincenzo Pecoraro e ho 22 anni. Lavoro per l'associazione MAI SOLI, la quale si occupa di tenere compagnia agli anziani sul territori di Salerno.</Title> 
        </View>
        <View style={styles.welcome4}>
          <View style={styles.welcome5}>
           <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              title="  Cambio Password              "
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}

            />
            </View>
            <View style={styles.welcome6}>
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}
              title="  Slot messi a disposizione "
            />
            </View>
            <View style={styles.welcome6}>
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}
              title="  Aggiorna documento          "
            />
            </View>
        </View>
    </View>
  );
};

const renderContentUtente = () => {
  return (
    <View style={styles.container}>
        <View style={styles.welcome}>
            <View style={styles.welcome2}>
                <Image
                style={{ width: 150, height: 150, borderRadius: 100,marginTop: 15,marginLeft: 10}}
                source={require('../images/anziano2.jpg')}
                />
            </View>
            <View style={styles.welcome2}>
                <Title style={styles.frase}>Gaetano Ansanelli</Title> 
                <Title style={styles.frase2}>g.ansanelli@gmail.com</Title> 
                <Title style={styles.frase2}>+39/3318095598</Title> 
            </View>
        </View>
           
        <View style={styles.welcome3}>
            <Title style={styles.frasesotto2}>Ciao, mi chiamo Nicola Ansanelli e ho 64 anni, vivo a Baronissi, un piccolo paesino in provincia di Salerno. In questo periodo per via della pandemia mi sento spesso molto solo, mi piacerebbe che qualuno ogni tanto potesse tenermi compagnia.</Title> 
        </View>
        <View style={styles.welcome4}>
          <View style={styles.welcome5}>
           <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              title="  Cambio Password    "
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}

            />
            </View>
            <View style={styles.welcome6}>
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}
              title="  I Miei Appuntamenti "
            />
            </View>
            <View style={styles.welcome6}>
            <Button
              icon={
                <Icon
                  name="arrow-right"
                  size={10}
                  color="white"
                />
              }
              buttonStyle={{borderRadius: 10,backgroundColor: '#1979a9'}}
              title="  Aggiorna documento"
            />
            </View>
        </View>
    </View>
  );
};


export default function IlMioProfilo({navigation}) {
    //const { user, logout } = useContext(AuthContext);
    return (
     <View style={styles.container}>
      {utente==1 ? renderContentUtente() : renderContentOperatore() }
      </View> 
    ); // {{user.uid}}
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      flex: 1,
      margin: 10,
      marginTop: -10,
      textAlign: 'center',
      flexDirection: 'row',
    },
      welcome2: {
        flex: 1,
        marginTop: 50
      },
      titolo: {
        fontSize: 30,
        color: '#4d5354'
      },
      frase: {
         fontSize: 21,
         color: '#4d5354',
         marginTop: 20,
         fontWeight: "bold"
         
      },
      frasesotto2:{
        fontSize: 15,
        color: '#ffffff',
        marginLeft: 30,
        marginRight:20,
        marginTop:-10

      },
      frase2: {
        fontSize: 17,
        color: '#4d5354',
        marginTop: 20
     },
     frasesotto:{
      fontSize: 22,
      color: '#1979a9',
      marginTop: -10
     },
     welcome3:{
        backgroundColor: '#1979a9',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        margin: 10
         },
      welcome4:{
          flex: 1, 
          alignItems: "flex-start",
      },
      welcome5:{
        flex: 1,
        marginTop: 30,
        marginLeft: 20
    },
    welcome6:{
      flex: 1,
      marginLeft: 20,
      marginTop: -20
  },
  });