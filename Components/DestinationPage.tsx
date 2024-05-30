import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { DestinationContext } from '../Context/DestinationContextProvider';
import FlatListex1 from './FlatListex1';

export default function DestinationPage() {
    const { currentDest } = useContext<any>(DestinationContext);

    useEffect(()=>{console.log("Current Dest ==> ",currentDest)},[])

  return (
    <View>
      <FlatListex1 dest={currentDest}/>
    </View>
  )
}