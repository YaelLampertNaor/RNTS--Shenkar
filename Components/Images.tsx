import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Images() {
    return (
        // <ScrollView>
            <View style={styles.mainView}>
                <View>
                    <Text style={styles.text}>Hawaii:</Text>
                    <Image style={styles.img} source={{ uri: 'https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/12/1140-oahu-hero.jpg' }} />
                </View>
                <View>
                    <Text style={styles.text}>Seychelles:</Text>
                    <Image style={styles.img} source={require('../assets/pics/seychelles.jpeg')} />
                </View>
                <View>
                    <Text style={styles.text}>Mauritius:</Text>
                    <Image style={styles.img} source={{ uri: 'https://planetofhotels.com/guide/sites/default/files/styles/paragraph__live_banner__lb_image__1880bp/public/live_banner/Mauritius.jpg' }} />
                </View>
                <View>
                    <Text style={styles.text}>Tahiti:</Text>
                    <Image style={styles.img} source={require('../assets/pics/tahiti.jpeg')} />
                </View>
            </View>
        // </ScrollView>
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