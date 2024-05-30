import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { DestinationsListProps } from '../Types/props_type'
import Destination from '../Components/Destination'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DestinationContext } from '../Context/DestinationContextProvider'

export default function DestinationsList({ destinations }: DestinationsListProps) {
    const { allDest } = useContext<any>(DestinationContext);

    useEffect(()=>{console.log(allDest)},[])

    if (destinations.length == 0)
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>No Destination Found</Text>
                </View>
            </SafeAreaView>
        )
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allDest}
                renderItem={({ item }) =>
                    <Destination dest={item} key={item.code}/>
                }
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    }
    
})