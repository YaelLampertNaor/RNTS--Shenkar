import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function SingleImage() {
    return (
        <View style={styles.mainView}>
            <View>
                <Text style={styles.text}>Hawaii:</Text>
                <Image style={styles.img} source={{ uri: 'https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/12/1140-oahu-hero.jpg' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom:'5%',
    },
    img: {
        height: 150,
        width: 150,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    }
})