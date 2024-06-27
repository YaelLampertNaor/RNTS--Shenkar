import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { DestinationProps } from '../Types/props_type'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { DestinationContext } from '../Context/DestinationContextProvider'


export default function Destination({ dest }: DestinationProps) {
    const { setCurrentDest } = useContext<any>(DestinationContext);
    const navigation = useNavigation();

    return (
        <View style={styles.mainView}>
            <Text style={styles.titleText}>Destination: {dest.destination_name}</Text>
            <Text>Continent: {dest.continent}</Text>
            <Text>Direct Flight: {dest.is_direct_flight?"Available":"Not available"}</Text>
            <Image source={{uri:dest.main_img}} style={styles.mainImage} />
            {/* {
                dest.images && <FlatList
                data={dest.images}
                horizontal={true}
                renderItem={({ item, index }) =>
                    <Image source={{uri:item}} key={index} style={styles.images}/>
                }/>
            } */}
            <TouchableOpacity onPress={()=>{navigation.navigate("DestinationPage"); setCurrentDest(dest);}}>
                <Text style={styles.moreDetails}>See more details ...</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        alignItems: 'center',
        justifyContent:'space-between',
        marginVertical:10,
    },
    titleText:{
        fontSize:25,
        color:'#2c7da0'
    },
    mainImage:{
        height:200,
        width:200,
        borderRadius:100,
        marginBottom:10
    },
    images:{
        height: 150,
        width:150,
        margin:2
    },
    moreDetails:{
        color:'red'
    }
})