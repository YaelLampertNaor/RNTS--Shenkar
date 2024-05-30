import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const CheckCred = () => {
    if (username === 'User' && password === '1234')
      navigation.navigate('UserScreens');
    else if (username === 'Admin' && password === '5678')
      navigation.navigate('AdminScreens');
    else
      Alert.alert('Error', 'No matching credentials');
  }

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <Text style={styles.title}>Welcome To My Awesome Destination App</Text>
        <Text style={styles.secondaryText}>Please sign in to continue</Text>
        <TextInput onChangeText={(t) => setUsername(t)} style={[styles.inputStyle, styles.border]} placeholder='Username' />
        <TextInput onChangeText={(t) => setPassword(t)} style={[styles.inputStyle, styles.border]} placeholder='Password' />
        <TouchableOpacity style={styles.submit} onPress={CheckCred}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 40,
    textAlign: 'center'
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red'
  },
  secondaryView: {
    marginVertical: 20
  },
  border: {
    borderWidth: 1,
    borderRadius: 50
  },
  inputStyle: {
    width: '60%',
    margin: 20,
    paddingHorizontal: 10
  },
  submit: {
    padding: 10,
    margin: 20,
    alignSelf: 'center',
    backgroundColor: '#FFC0CB',
    borderRadius: 50
  }
})