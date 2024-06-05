import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // signInWithEmailAndPassword doğru şekilde içe aktarılıyor
import { useNavigation } from '@react-navigation/native';
import { auth } from '../components/firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password) // Doğru şekilde signInWithEmailAndPassword fonksiyonunu kullanıyoruz
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...    
      navigation.navigate('Home');
      console.log("basarili");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("basarisiz");
    });
     
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Email:</Text>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Text>Şifre:</Text>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
