import React, { useState, useContext, useEffect } from 'react';
import { Title } from 'react-native-paper';
import { IconButton,Portal,Paragraph,Dialog, Card, Avatar } from 'react-native-paper';
import { View, Text, Image, StyleSheet, VirtualizedList,ActivityIndicator } from 'react-native'
import {ListItem, Button, Icon, SocialIcon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../common/crud'; 
import { AuthContext } from '../navigation/AuthProvider';
import { set } from 'react-native-reanimated';
import DialogButton from '../components/FormButton4';

export default function MieiSlot({navigation}) {
  
  const [loading,setLoading] = useState(true);
  const [result,setResult] = useState([]);
  const { user, setUser } = useContext(AuthContext); 
  const [chiave,setChiave] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [appuntamento, setAppuntamento] = useState(null);
  const [ids,setid] = useState("");
  const { emailU, setEmailU } = useContext(AuthContext);
  function showDialog(id){ setVisible(true); setid(id);};  
  function showDialog1(id){ setVisible1(true); setid(id);};                         
  function confermaDialog(){ hideDialog(); db.removeAppuntamento(ids); db.removeSlot(ids); caricaDati();};
  function hideDialog(){ setVisible(false)};    
  function hideDialog1(){ setVisible1(false)};  

  useEffect(() => {
    const f = navigation.addListener("focus",() => {caricaDati()});
    setVisible(false);     //per far partire la fetch appena viene creato lo screen, senno la chiamavo sull on press di un button la getWallet
    //caricaDati();
  }, []);

  async function caricaDati(){
    
    var listaslot=[];
    var slot= await db.getAllSlotByVol(user.email);
    console.log(slot);
    var i=0;
    var dataoggi= new Date(Date.now()+(10*60*1000));
    for(i=0;i<slot.length;i++){
      const datajs = slot[i].dataorainizio.toDate();
      console.log("dataaaaaaa");
      console.log(datajs);
      if(datajs>dataoggi){
          listaslot.push(slot[i]); 
    }
    }
    /*
    const datajs = slot.dataorainizio.toDate().toDateString();
    const inizio = slot.inizio;
    const fine = slot.fine;
    console.log(datajs);
    console.log(inizio);
    console.log(fine);
    */
  setLoading(false);
  console.log("listaslot");
  console.log(listaslot);
  setResult( listaslot)
 };

  
  const renderContent =()=>{
    

  if(loading){
    return (
      <ActivityIndicator size="small" color={"#000000"}/>
    )
  }else{
    return(
      <View> 
      <View>
      <Portal>
  <Dialog visible={visible}  onDismiss={hideDialog}>
    <Dialog.Title>CONFERMA</Dialog.Title>
    <Dialog.Content>
      <Paragraph>Sei sicuro di voler eliminare questo slot?</Paragraph>
    </Dialog.Content>
    <Dialog.Actions>
    <DialogButton title=' No' modeValue='contained' labelStyle={styles.loginButtonLabel} onPress={hideDialog}/>
      <DialogButton title=' Si' modeValue='contained' labelStyle={styles.loginButtonLabel}onPress={ () => {confermaDialog();}}/>
    </Dialog.Actions>
  </Dialog>
</Portal>

              <Text style={styles.scelta}>SLOT MESSI A DISPOSIZIONE:</Text>
              <FlatList
                  scrollEnabled={true}
                  title="SLOT MESSI A DISPOSIZIONE"
                  containerStyle={styles.app}
                  data={result}
                  renderItem={({item}) => <Card.Title
                      style={styles.card}
                      title={item.dataorainizio.toDate().toDateString()}
                      titleStyle={styles.testo}
                      subtitle={"occupato: "+item.occupato}
                      left={(props) => <IconButton icon={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/visual.png' }} style={styles.icona} onPress={() =>
                      {var mesi = new Array(12);
                        mesi[0] = "Gennaio";
                        mesi[1] = "Febbraio";
                        mesi[2] = "Marzo";
                        mesi[3] = "Aprile";
                        mesi[4] = "Maggio";
                        mesi[5] = "Giugno";
                        mesi[6] = "Luglio";
                        mesi[7] = "Agosto";
                        mesi[8] = "Settembre";
                        mesi[9] = "Ottobre";
                        mesi[10] = "Novembre";
                        mesi[11] = "Dicembre";      
                        var n = mesi[item.inizio.toDate().getMonth()];
                        alert('Sarai impegnato il '+item.inizio.toDate().getDate()+' '+n+' dalle ore '+ item.inizio.toDate().getHours() +' fino a '+item.fine.toDate().getHours());
                      }} />} 
                      leftStyle={styles.bottoneLeft}
                      right={(props) => <IconButton icon={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/trash.png' }} style={styles.bottoneRight} onPress={() => showDialog(item.id)} />
                      } />} />
          </View>
</View>
    )
  }
}

  return (
    <View>
    {renderContent()}
    </View>
  );
  }

const styles = StyleSheet.create({
    scelta: {
        fontSize: 26,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        color:'#1979a9',
        fontWeight: "bold"

    },
    loginButtonLabel: {
        fontSize: 17
      },

    botton:{
      height: '10%',
      width: '10%',
      padding: '10%'
    },
    icona:{
      backgroundColor: 'rgba(172, 213, 211, 1)',
      borderRadius:0,
        marginLeft: '-40%',
        height: '200%',
        width:'140%'

    },
    app:{
        height: '45%',
        borderColor: '#1979a9'

    },
    bottoneLeft:{
        paddingLeft: '0%',
        marginRight: '10%'
    },
    card: {
        borderColor: 'rgba(172, 213, 211, 1)',
        borderTopWidth: 4,
        borderBottomWidth: 4,
        marginTop: '0%'
    },
    testo: {
        color:'rgb(33,82,114)'
    }
});