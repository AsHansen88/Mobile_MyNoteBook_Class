import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app, database } from './firebase'
import { collection, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore'


export default function App() {

  const Stack = createNativeStackNavigator()
    //const notes = [{key:1, name: "Anna"}, {key:2, name: "Bob"}]
  


   //alert (JSON.stringify(app, null, 4))


      return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='ListPage'>     
      <Stack.Screen 
      name='list' 
      component={ListPage}
      />
      
      <Stack.Screen 
      name='DetailPage' 
      component={DetailPage}
      />

      </Stack.Navigator>
           
      </NavigationContainer>
  );
}

const ListPage = ({navigation, route}) => {
  
  const myList = [{key:1, name: "Anna"}, {key:2, name: "Bob"}]
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [values, loading, error] = useCollection(collection(database, "notes"))
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))


    function handleButon(item){

    navigation.navigate('DetailPage', {message:item})

  }

  async function buttonHandler(){
    try{
    await addDoc(collection(database, "notes"), {
      text: text
    })
    }catch(err){
      console.log("Fejl i DB" + err)
    }
    
    }


  return(
    <View>
      <Text>Hej</Text>
      <Button title ='DetailPage' onPress={handleButon}></Button>
      <FlatList
      data={myList}
      renderItem={(note) => <Button title = {note.item.name} onPress={() => handleButon(note.item)}></Button>}
      />
      <TextInput style={styles.TextInput} onChangeText={(txt) => setText(txt)} />
      <Button title='press me' onPress={buttonHandler}></Button>
      <FlatList
      data={data}
      renderItem={(note) => <Text title = {note.item.text}></Text>}
      />
    </View>
  )
}

const DetailPage = ({ route}) => {

  const message = route.params?.message
 
  return(
    <View>
      <Text>Detaljer {message.text}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200
  },
  TextInput: {
    backgroundColor: 'lightblue',
    minWidth: 200
  }
});
