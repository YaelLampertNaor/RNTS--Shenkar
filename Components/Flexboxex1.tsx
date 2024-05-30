import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

export default function Flexboxex1() {
    return (
        <View style={styles.container}>
            <View style={[styles.view, styles.view1]}>
                <Text style={[styles.text, styles.text1]}>Red</Text>
            </View>
            <View style={[styles.view, styles.view2]}>
                <Text style={[styles.text, styles.text2]}>White</Text>
            </View>
            <View style={[styles.view, styles.view3]}>
                <Text style={[styles.text, styles.text3]}>Black</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    view: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        backgroundColor: '#f1ee8e',
    },
    view2: {
        backgroundColor: '#90e0ef',
    },
    view3: {
        backgroundColor: 'pink',
    },
    text: {
        fontWeight: 'bold'
    },
    text1: {
        color: 'red',
    },
    text2: {
        color: 'white'
    },
    text3: {
        color: 'black'
    },
})