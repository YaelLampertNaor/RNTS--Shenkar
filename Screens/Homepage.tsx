import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Homepage() {
    
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View style={styles.mainView}>
                
                <TouchableOpacity onPress={() => navigation.navigate('DestinationList')} style={styles.clickableArea}>
                    <Text>All Destinations Page</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Images')} style={styles.clickableArea}>
                    <Text>Images</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Flexboxex1')} style={styles.clickableArea}>
                    <Text>תרגיל פלקסבוקס</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('FlatListex')} style={styles.clickableArea}>
                    <Text>תרגיל רשימות</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        height: '100%',
    },
    clickableArea:{
        borderRadius:50,
        padding: 10,
        backgroundColor:'#FFC0CB'
    }
})