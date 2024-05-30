import { View, Text, ScrollView, TextInput, StyleSheet, Switch, FlatList, Alert, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { DestinationContext } from '../Context/DestinationContextProvider';
import { DestinationType } from '../Types/destination';
import { Image } from 'expo-image';


export default function AddDest() {

  //-------- Destination Context: --------
  const { allDest, AddDestination } = useContext<any>(DestinationContext);

  //-------- Destination useStates: --------
  const [code, setCode] = useState(0);
  const [destination_name, setDestinationName] = useState('');
  const [continent, setContinent] = useState<string>('');
  const [capital, setCapital] = useState('');
  const [is_direct_flight, setIsDirectFlight] = useState(true);
  const [main_img, setMainImg] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImageToList, setNewImageToList] = useState<string>('')
  const [desc, setDesc] = useState('');

  //-------- UseEffects: --------
  useEffect(() => { console.log(is_direct_flight) }, [is_direct_flight])
  useEffect(() => {
    console.log(images);
    console.log(newImageToList)
  }, [images])

  //--------- Continent List for DD Menu: -----------
  const continents = [
    { label: 'Asia', value: 'Asia' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Oceania', value: 'Oceania' },
    { label: 'Europe', value: 'Europe' },
    { label: 'North America', value: 'North America' },
    { label: 'South America', value: 'South America' },
  ]

  //--------- DD Menu focus fields useState: -----------
  const [isFocus, setIsFocus] = useState(false);

  //--------- DD Menu Submit function: -----------
  const SubmitAddDestination = () => {
    const dest: DestinationType = {
      code,
      destination_name,
      continent,
      capital,
      is_direct_flight,
      main_img,
      images,
      desc
    }
    AddDestination(dest);
  }

  //--------- 'More Images' Modal & control: -----------
  const [addModalVisible, setAddModalVisible] = useState(false);
  const AddImagesModal = () => {
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

              {/* //--------- URL input field: ----------- */}
              <Text style={styles.modalText}>Please add image URL:</Text>
              <TextInput style={[styles.modalTextInput, styles.border]} placeholder='URL' onChangeText={(t) => setNewImageToList(t)} />

              {/* //--------- Submitting URL area: ----------- */}
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => { setImages([...images, newImageToList]); setAddModalVisible(!addModalVisible) }}>
                <Text style={styles.textStyle}>Add Image</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
    )
  }

  //--------- Switch control: -----------
  const toggleSwitch = () => setIsDirectFlight(previousState => !previousState);

  return (
    <ScrollView>
      <View style={styles.mainViewHeight}>
        {/* //--------- Screen title: ----------- */}
        <Text style={styles.mainTitle}>Add Destination</Text>

        {/* //--------- Dest code & name inputs: ----------- */}
        <TextInput style={[styles.inputStyle, styles.border]} placeholder='Destination code' onChangeText={(t) => setCode(parseInt(t))} />
        <TextInput style={[styles.inputStyle, styles.border]} placeholder='Destination name' onChangeText={(t) => setDestinationName(t)} />

        {/* //--------- Continent selection drop down menu: ----------- */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={continents}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={continent}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setContinent(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />

        {/* //--------- Capital inputs: ----------- */}
        <TextInput style={[styles.inputStyle, styles.border]} placeholder='Destination capital' onChangeText={(t) => setCapital(t)} />

        {/* //--------- Direct flight Switch use & VIEW: ----------- */}
        <View style={styles.directFlightView}>
          <Text>Is there a direct flight ?</Text>
          <Switch
            trackColor={{ false: '#e6e6e6', true: '#cfe4cc' }}
            thumbColor={is_direct_flight ? '#9cc493' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => { toggleSwitch(); setIsDirectFlight(!is_direct_flight) }}
            value={is_direct_flight}
          />
        </View>

        {/* //--------- Main image inputs: ----------- */}
        <TextInput style={[styles.inputStyle, styles.border]} placeholder='Destination main image' onChangeText={(t) => setMainImg(t)} />

        {/* //--------- More images btn: ----------- */}
        <TouchableOpacity style={[styles.button, styles.buttonClose, styles.inputStyle]} onPress={() => setAddModalVisible(true)}>
          <Text style={styles.textStyle}>Add More Images</Text>
        </TouchableOpacity>

        {/* //--------- Description input: ----------- */}
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder='Destination description'
          style={[styles.inputStyle, styles.border]}
          onChangeText={(t) => setDesc(t)} />

        {/* //--------- Submit area: ----------- */}
        <TouchableOpacity style={[styles.button, styles.buttonClose, styles.inputStyle]} onPress={SubmitAddDestination}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>

        {addModalVisible && AddImagesModal()}

        {/* //--------- Testing area: ----------- */}
        {/* <Text>{code}</Text>
        <Text>{destination_name}</Text>
        <Text>{continent}</Text>
        <Text>{capital}</Text>
        <Image source={main_img} style={{ height: 200, width: 200 }} />
        {
          images ? <FlatList
            data={images}
            horizontal={true}
            renderItem={({ item, index }) =>
              <Image source={item} key={index} style={{ height: 100, width: 100, margin:5 }} />
            } />
            :
            <Text>No additional images</Text>
        }
        <Text>{desc}</Text> */}

      </View>
    </ScrollView>
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
    elevation: 2,
    alignSelf: 'center'
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
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  directFlightView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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