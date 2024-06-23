import { View, TextInput, Text, Dimensions, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, Pressable, Switch } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AdminProps } from '../Types/props_type';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DestinationContext } from '../Context/DestinationContextProvider';
import { UserContext } from '../Context/UserContextProvider';
import { Image } from 'expo-image';
import { UserType } from '../Types/user';

export default function Admin() {
  //-------- GLOBAL Context of Dest & Users instances: --------
  const { allDest } = useContext<any>(DestinationContext);
  const { allUsers, AddUser } = useContext<any>(UserContext);

  //-------- Navigation instnace: --------
  const navigation = useNavigation();

  //-------- Modals control: --------
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showDatePickerVisibility, setDatePickerVisibility] = useState(false);

  //-------- User useStates: --------
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [isActive, setIsActive] = useState(true);

  //-------- UseEffect WITH dependency: --------
  useEffect(() => {
    console.log(dob);
  }, [dob])

  //-------- Other Functions: --------
  const SubmitAddUser = () => {
    const user: UserType = {
      id,
      firstName,
      middleName,
      lastName,
      dob,
      image,
      isActive
    }
    if (AddUser(user)) {
      console.log(allUsers);
      setAddModalVisible(!addModalVisible);
    }
  }

  function toggleSwitch() { setIsActive(!isActive) }
  
  //-------- Add User Modal: --------
  const AddUserModal = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setAddModalVisible(!addModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please enter new user details:</Text>

              {/* //-------- Inputs: -------- */}
              <TextInput style={[styles.inputStyle, styles.border]} placeholder='User Id' onChangeText={(t) => setId(parseInt(t))} />
              <TextInput style={[styles.inputStyle, styles.border]} placeholder='First Name' onChangeText={(t) => setFirstName(t)} />
              <TextInput style={[styles.inputStyle, styles.border]} placeholder='Middle Name (optional)' onChangeText={(t) => setMiddleName(t)} />
              <TextInput style={[styles.inputStyle, styles.border]} placeholder='Last Name' onChangeText={(t) => setLastName(t)} />

              {/* //-------- DATE INPUT: -------- */}
              <TouchableOpacity style={[styles.button, styles.buttonClose]}
                onPress={() => setDatePickerVisibility(true)}>
                <Text style={styles.textStyle}>Enter Your DOB</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={showDatePickerVisibility}
                mode="date"
                onConfirm={HandleConfirmDate}
                onCancel={() => { console.log("onCancel Date"); }}
              />
              <Text>{dob}</Text>

              {/* //-------- Image input: -------- */}
              <TextInput style={[styles.inputStyle, styles.border]} placeholder='Profile Picture' onChangeText={(t) => setImage(t)} />

              <Switch
                trackColor={{ false: '#e6e6e6', true: '#cfe4cc' }}
                thumbColor={isActive ? '#9cc493' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => { toggleSwitch(); setIsActive(!isActive) }}
                value={isActive}
              />

              {/* //-------- Submit btn: -------- */}
              <TouchableOpacity style={[styles.button, styles.buttonClose]}
                onPress={() => SubmitAddUser()}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  //-------- DATE handling function: --------
  const HandleConfirmDate = (date: any) => {
    setDatePickerVisibility(false);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd; //08
    }
    if (mm < 10) { 
      mm = '0' + mm; //03
    }
    setDob(`${yyyy}-${mm}-${dd}`);
  }

  return (
    <View style={styles.mainViewHeight}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mainTitle}>Welcome, Admin</Text>

        <View style={[styles.paging]}>

          {/* //-------- Destination functions area: -------- */}
          <Text style={styles.secTitle}>Destinations Functions ({allDest.length} destinations)</Text>
          <View style={[styles.secViewHeight, styles.paging]}>
            <TouchableOpacity onPress={() => navigation.navigate('AddDest')}>
              <Text>Add destinations</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Capture')}>
              <Text>Delete destinations</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('EditDest')}>
              <Text>Edit destinations</Text>
            </TouchableOpacity>
          </View>

          {/* //-------- User functions area: -------- */}
          <Text style={styles.secTitle}>Users Functions ({allUsers.length} users)</Text>
          <View style={[styles.secViewHeight, styles.paging]}>

            <TouchableOpacity onPress={() => { setAddModalVisible(!addModalVisible); }}>
              <Text>Add User</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Delete User</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Edit User</Text>
            </TouchableOpacity>
          </View>

          {addModalVisible && AddUserModal()}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    height: Dimensions.get("window").height,
  },
  mainViewHeight: {
    height: 'auto',
    paddingVertical: 25,
    marginTop: 25
  },
  secViewHeight: {
    height: '35%',
    width: '90%',
  },
  paging: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'blue',
    marginVertical: 30,
  },
  secTitle: {
    fontSize: 20,
    color: 'red'
  },
  border: {
    borderWidth: 1,
    borderRadius: 50
  },
  inputStyle: {
    width: 250,
    margin: 20,
    paddingHorizontal: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
})