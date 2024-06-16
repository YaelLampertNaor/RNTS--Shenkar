import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, TouchableOpacity, Modal, Alert, Switch, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { DestinationContext } from '../Context/DestinationContextProvider';
import { Image } from 'expo-image';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function EditDest() {
  //-------- Navigation instance: --------
  const navigation = useNavigation();

  //-------- useContext & useState variables: --------
  const { allDest, EditDestination, currentDest, setCurrentDest } = useContext<any>(DestinationContext);
  const [is_direct_flight, setIsDirectFlight] = useState(true);
  const [main_img, setMainImg] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImageToList, setNewImageToList] = useState<string>('')
  const [desc, setDesc] = useState('');

  //-------- Initial useEffect: --------
  useEffect(() => {
    console.log(currentDest);
    setIsDirectFlight(currentDest?.is_direct_flight)
    setMainImg(currentDest?.main_img);
    setImages([currentDest?.images]);
    setDesc(currentDest?.desc)
  }, [currentDest])
  const [editModal, setEditModal] = useState(false);
  const toggleSwitch = () => setIsDirectFlight(previousState => !previousState);

    //-------- Edit Modal: --------
  const EditModal = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setEditModal(!editModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Please Edit {currentDest.destination_name}'s details:</Text>

              {/* //-------- Inputs: -------- */}
              <View style={styles.cannotChangeView}>
                <Text style={styles.selectedTextStyle}>Code: {currentDest.code}</Text>
                <Text> (cannot be changed)</Text>
              </View>
              <View style={styles.cannotChangeView}>
                <Text style={styles.selectedTextStyle}>Destination Name: {currentDest.destination_name}</Text>
                <Text> (cannot be changed)</Text>
              </View>
              <View style={styles.cannotChangeView}>
                <Text style={styles.selectedTextStyle}>Continent: {currentDest.continent}</Text>
                <Text> (cannot be changed)</Text>
              </View>
              <View style={styles.cannotChangeView}>
                <Text style={styles.selectedTextStyle}>Capital: {currentDest.capital}</Text>
                <Text> (cannot be changed)</Text>
              </View>

              <View style={styles.cannotChangeView}>
                <Text style={styles.selectedTextStyle}>Change direct flight:</Text>
                <Switch
                  trackColor={{ false: '#e6e6e6', true: '#cfe4cc' }}
                  thumbColor={is_direct_flight ? '#9cc493' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => { toggleSwitch(); setIsDirectFlight(!is_direct_flight) }}
                  value={is_direct_flight}
                />
              </View>

              {/* //-------- Image input: -------- */}
              <Text style={styles.selectedTextStyle}>Current main image:</Text>
              <View style={styles.editImage}>
                <Image source={currentDest.main_img} style={{ height: 200, width: 200 }} />
              </View>
              <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Capture')}>
                <Text style={[styles.margin, styles.textStyle]}>Capture Image</Text>
              </TouchableOpacity>


              {/* <TextInput style={[styles.inputStyle, styles.border]} placeholder='Change Main Image' onChangeText={(t) => setMainImg(t)} /> */}

              {/* //-------- Edit Additional Images: -------- */}
              {
                images.length > 0 ?
                  <FlatList
                    data={images}
                    horizontal={true}
                    renderItem={({ item }) =>

                      <View>
                        <Image source={item} style={{ height: 100, width: 100 }} />
                        <TouchableOpacity>
                          <Text>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    }
                  />
                  :
                  null
              }
              {/* //-------- Submit btn: -------- */}
              <TouchableOpacity style={[styles.button, styles.buttonClose]}
                onPress={() => { }}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  return (
    <View style={styles.mainViewHeight}>
      {/* //--------- Screen title: ----------- */}
      <Text style={styles.mainTitle}>Choose Destination To Edit:</Text>

      <FlatList
        data={allDest}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.button} onPress={() => { setCurrentDest(item); setEditModal(!editModal) }}>
            <Text style={styles.textStyle}>{item.destination_name}</Text>
          </TouchableOpacity>
        }
      />
      
      {editModal && EditModal()}
    </View>
  )
}


const styles = StyleSheet.create({
  mainViewHeight: {
    height: 'auto',
    paddingVertical: 25,
    marginTop: 25
  },
  mainTitle: {
    fontSize: 25,
    alignSelf: 'center',
    color: 'blue',
    marginVertical: 30,
  },
  border: {
    borderWidth: 1,
    borderRadius: 50
  },
  margin: {
    margin: 10
  },
  inputStyle: {
    width: '90%',
    margin: 20,
    paddingHorizontal: 10
  },
  modalTextInput: {
    width: 200,
    margin: 20,
    paddingHorizontal: 10
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    alignSelf: 'center',
    margin: 20,
    width: 100,
    backgroundColor: '#FFC0CB'
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cannotChangeView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  editImage: {
    flexDirection: 'row',
    alignItems: 'center',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
})