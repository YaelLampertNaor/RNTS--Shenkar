import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { DestinationProps } from '../Types/props_type'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function FlatListex1({ dest }: DestinationProps) {
    return (
        <View style={styles.mainView}>
            <View style={styles.secondView}>
                <View style={styles.destinationText}>
                    <TouchableOpacity onPress={()=>console.log(dest.destination_name)}>
                        <Text style={[styles.titleText, styles.boldFont]}>{dest.destination_name}</Text>
                    </TouchableOpacity>
                    <Text>{dest.continent}</Text>
                    <Text style={dest.is_direct_flight ? [styles.greenText, styles.boldFont] : styles.redText}>{dest.is_direct_flight ? "Direct Flight" : "No Direct Flight"}</Text>
                </View>
                <View>
                    <Image source={{ uri: dest.main_img }} style={styles.mainImage} />
                </View>
            </View>
            {
                dest.images ? <FlatList
                    data={dest.images}
                    horizontal={true}
                    renderItem={({ item, index }) =>
                        <Image source={{ uri: item }} key={index} style={styles.images} />
                    } />
                    :
                    <Text style={[styles.redText, styles.boldFont]}>No additional images</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#9ed7e6',
        paddingVertical: 25,
        borderWidth: 1,
        borderColor: '#e6e6e6'
    },
    secondView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    destinationText: {
        marginRight: 25
    },
    boldFont: {
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: 25,
        color: '#006864',
    },
    greenText: {
        color: 'green',
    },
    redText: {
        color: 'red'
    },
    mainImage: {
        height: 200,
        width: 200,
        marginBottom: 10
    },
    images: {
        height: 150,
        width: 150,
        borderRadius: 100,
        margin: 2,
    }
})