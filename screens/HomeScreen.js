import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { getFirestore, collection, query, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { app, db, auth } from '../components/firebaseConfig'; // Firebase yapılandırmanızı ve auth modülünü buradan içe aktarın
import { onAuthStateChanged } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      fetchNotes();
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotes = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userEmail = currentUser.email;
        const q = query(collection(db, 'users', userEmail, 'notes'));
        console.log(userEmail);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedNotes = [];
          querySnapshot.forEach((doc) => {
            fetchedNotes.push({ id: doc.id, ...doc.data() });
            console.log(fetchedNotes)
          });

          // Tarihe göre sıralama
          const sortedNotes = fetchedNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
          setNotes(sortedNotes);
        });
        
        // Cleanup listener on unmount
        return () => {
          unsubscribe();
        };
      }
    } catch (error) {
      console.error('Error fetching notes: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = fetchNotes();

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth, db]);

  const handleDeleteNote = async (noteId) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userEmail = currentUser.email;
        await deleteDoc(doc(db, 'users', userEmail, 'notes', noteId));
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note: ', error);
    }
  };

  const handleShareNote = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser && selectedNote) {
        await setDoc(doc(db, 'users', email, 'notes', selectedNote.id), selectedNote);
        Alert.alert('Not paylaşıldı', `Not ${email} adresine başarıyla paylaşıldı.`);
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error sharing note: ', error);
    }
  };

  const renderRightActions = (noteId) => {
    return (
      <View style={styles.actionsContainer}>
        <Button title="Sil" color="#ff0000" onPress={() => handleDeleteNote(noteId)} />
      </View>
    );
  };

  const renderLeftActions = (item) => {
    return (
      <View style={styles.actionsContainer}>
        <Button title="Paylaş" color="#0000ff" onPress={() => {
          setSelectedNote(item);
          setModalVisible(true);
        }} />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      renderLeftActions={() => renderLeftActions(item)}
    >
      <View style={[styles.noteItem, { backgroundColor: item.color }]}>
        <Text style={{ color: item.textColor }}>{item.text}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {user ? (
        <View>
          <Button title="Not Ekleyin" onPress={() => navigation.navigate('AddNote')} />
          {notes.length > 0 ? (
            <FlatList
              data={notes}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          ) : (
            <Text style={styles.noNotesText}>Henüz bir not eklenmedi.</Text>
          )}
        </View>
      ) : (
        <Text style={styles.noNotesText}>Lütfen giriş yapın.</Text>
      )}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Notu Paylaş</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresi"
            value={email}
            onChangeText={setEmail}
          />
          <Button title="Paylaş" onPress={handleShareNote} />
          <Button title="İptal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  noteItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  noNotesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: '100%',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default HomeScreen;
