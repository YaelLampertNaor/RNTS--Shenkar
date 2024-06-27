import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function AdminCrud() {
    const navigation = useNavigation();

  return (
    <View>
        <Text>Crud</Text>
    </View>
  )
}