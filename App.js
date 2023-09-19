import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app, database } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen name='ListPage' component={ListPage} />
        <Stack.Screen name='DetailPage' component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ListPage = () => {
  const [text, setText] = useState('');
  const [values, loading, error] = useCollection(collection(database, 'notes'));
  const data = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const [editobj, setEditObj] = useState(null);

  async function buttonHandler() {
    try {
      await addDoc(collection(database, 'notes'), {
        text: text,
      });
      setText('');
    } catch (err) {
      console.log('Fejl i DB' + err);
    }
  }

  async function deleteDocument(id) {
    try {
      await deleteDoc(doc(database, 'notes', id));
    } catch (err) {
      console.log('Error deleting document:', err);
    }
  }

  function viewUpdateDialog(item) {
    setEditObj(item);
    setText(item.text); // Initialize the text input with the current text
  }

  async function saveupdate() {
    await updateDoc(doc(database, 'notes', editobj.id), {
      text: text,
    });
    setText('');
    setEditObj(null);
  }

  return (
    <View>
      {editobj && (
        <View>
          <TextInput value={text} onChangeText={(txt) => setText(txt)} />
          <Text onPress={saveupdate}>Save</Text>
        </View>
      )}

      <Text>My Notes</Text>

      <TextInput
        style={styles.TextInput}
        onChangeText={(txt) => setText(txt)}
        placeholder='Enter your note'
        value={text}
      />

      <Button title='Add Note' onPress={buttonHandler} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Button title='Delete' onPress={() => deleteDocument(item.id)} />
            <Button title='Update' onPress={() => viewUpdateDialog(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const DetailPage = ({ route }) => {
  const message = route.params?.message;

  return (
    <View>
      <Text>Detaljer {message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  TextInput: {
    backgroundColor: 'white',
    minWidth: 200,
  },
});
