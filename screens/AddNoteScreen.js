import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore'; 
import { db, auth } from '../components/firebaseConfig';

const AddNoteScreen = () => {
  const [note, setNote] = useState({
    text: "Bu bir not örneğidir.",
    color: "#ffcc00",
    textColor: "#000000"
  });
  const navigation = useNavigation();

  const handleSave = async () => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    if (note.text.trim()) {
      const newNote = {
        ...note,
        date: formatDate(new Date()),
      };
      navigation.navigate('Home');
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = collection(db, "users", auth.currentUser.email, "notes");
        const noteDocRef = await addDoc(userDocRef, newNote);
        console.log("Document written with ID: ", noteDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const setColor = (color) => {
    setNote({ ...note, color });
  };

  const setTextColor = (textColor) => {
    setNote({ ...note, textColor });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { backgroundColor: note.color, color: note.textColor }]}
        placeholder="Bir not yazın..."
        value={note.text}
        onChangeText={(text) => setNote({ ...note, text })}
      />
      <View style={styles.colorButtons}>
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ffffff', borderColor: '#000000' }]} onPress={() => setColor('#ffffff')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff0000', borderColor: '#000000' }]} onPress={() => setColor('#ff0000')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#0000ff', borderColor: '#000000' }]} onPress={() => setColor('#0000ff')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#00ff00', borderColor: '#000000' }]} onPress={() => setColor('#00ff00')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ffff00', borderColor: '#000000' }]} onPress={() => setColor('#ffff00')} />
      </View>
      <View style={styles.colorButtons}>
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#000000', borderColor: '#000000' }]} onPress={() => setTextColor('#000000')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ffffff', borderColor: '#000000' }]} onPress={() => setTextColor('#ffffff')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#ff0000', borderColor: '#000000' }]} onPress={() => setTextColor('#ff0000')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#0000ff', borderColor: '#000000' }]} onPress={() => setTextColor('#0000ff')} />
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#00ff00', borderColor: '#000000' }]} onPress={() => setTextColor('#00ff00')} />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  colorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2, // Add a border width
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddNoteScreen;
