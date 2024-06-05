import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../components/firebaseConfig';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); // createUserWithEmailAndPassword fonksiyonunu doğru şekilde kullanıyoruz
      // Kayıt başarılı ise yapılacak işlemler
      Alert.alert('Başarılı', 'Kayıt başarılı! Giriş yapabilirsiniz.');
      navigation.navigate('Home');
    } catch (error) {
      // Kayıt başarısız ise hata göster
      Alert.alert('Hata', error.message);
    }
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
      <Button title="Kayıt Ol" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
