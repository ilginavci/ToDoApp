import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../components/firebaseConfig';

var isLoggedIn= false;
var userName = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn= true;
    userName = user.email.split('@')[0].toUpperCase();
  } else {
    isLoggedIn= false;
  }
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Home');
      console.log("Logged out");
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
    setIsMenuOpen(false);
  };

  const navigateToNotes = () => {
    navigation.navigate('AddNote');
    setIsMenuOpen(false);
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
    setIsMenuOpen(false);
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Image source={require('../Images/menuIcon.png')} style={styles.menuIcon} />
      </TouchableOpacity>

      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={[styles.menuContainer, { height: screenHeight }]}>
            <View style={[styles.menu, { height: screenHeight }]}>
              {isLoggedIn && (
                <View>
                  <View style={styles.menuItem}>
                    <Image source={require('../Images/userIcon.png')} style={styles.userIcon} />
                    <Text>Merhaba, {userName}</Text>
                  </View>
                  <TouchableOpacity onPress={navigateToNotes} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Not Ekle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToHome} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Ana Sayfa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Çıkış Yap</Text>
                  </TouchableOpacity>
                </View>
              )}

              {!isLoggedIn && (
                <View>
                  <View style={styles.menuItem}>
                    <Image source={require('../Images/userIcon.png')} style={styles.userIcon} />
                    <Text>Kullanıcı</Text>
                  </View>
                  <TouchableOpacity onPress={navigateToLogin} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Giriş Yap</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={navigateToRegister} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>Kayıt Ol</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#1ed6ff',
  },
  menuIcon: {
    margin: 10,
    width: 20,
    height: 20,
  },
  menuButton: {
    marginRight: 20,
    width: 40,
    height: 40,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  menu: {
    padding: 10,
    paddingTop : 30,
    backgroundColor: '#1ed6ff',
    width: 200,
  },
  menuItem: {
    flexDirection: 'column',
    marginBottom: 10,
    alignItems: 'center',
  },
  userIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  menuItemText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Navbar;
