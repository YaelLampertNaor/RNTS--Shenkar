import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Flexboxex1 from './Components/Flexboxex1';
import Images from './Components/Images';
import dest from './Data/destinations.json';
import usersData from './Data/users.json';
import DestinationsList from './Screens/DestinationsList';
import FlatListex from './Components/FlatListex';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import Admin from './Screens/Admin';
import AddDest from './Screens/AddDest';
import DeleteDest from './Screens/DeleteDest';
import EditDest from './Screens/EditDest';
import { useContext } from 'react';
import UserContextProvider from './Context/UserContextProvider';
import DestinationContextProvider from './Context/DestinationContextProvider';
import DestinationPage from './Components/DestinationPage';

//-------- GLOBAL Navigation stack & tab instances: --------
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//-------- GLOBAL Admin screens function: --------
function AdminScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Admin' component={() => <Admin />}
        options={{ headerShown: false }} />
      <Stack.Screen name='AddDest' component={AddDest} />
      <Stack.Screen name='DeleteDest' component={DeleteDest} />
      <Stack.Screen name='EditDest' component={EditDest} />
    </Stack.Navigator>
  )
}

//-------- GLOBAL User screens function: --------
function UserScreens() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllDestinations" component={() => <DestinationsList destinations={dest} />}
        options={{
          tabBarLabel: 'All Destinations',
          tabBarIcon: () => (<MaterialCommunityIcons name="compass" size={35} color="red" />)
        }} />
      <Tab.Screen name="Images" component={Images}
        options={{
          tabBarLabel: 'Images Screen',
          tabBarIcon: () => (<MaterialCommunityIcons name="image-area" size={35} color="purple" />)
        }} />
      <Tab.Screen name="Flexboxex1" component={Flexboxex1}
        options={{
          tabBarLabel: 'Squares',
          tabBarIcon: () => (<MaterialCommunityIcons name="square-outline" size={35} color="blue" />)
        }} />
      <Tab.Screen name="FlatListex" component={() => <FlatListex destinations={dest} />}
        options={{
          tabBarLabel: 'FlatList',
          tabBarIcon: () => (<MaterialCommunityIcons name="flower" size={35} color="green" />)
        }} />
    </Tab.Navigator>
  )
}

//-------- Main App function: --------
export default function App() {
  return (
    <UserContextProvider>
      <DestinationContextProvider>

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AdminScreens" component={AdminScreens} />
            <Stack.Screen name="UserScreens" component={UserScreens} />
            <Stack.Screen name="DestinationPage" component={DestinationPage}/>

          </Stack.Navigator>
        </NavigationContainer>

      </DestinationContextProvider>
    </UserContextProvider>
  );
}

//-------- Component CSS: --------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0d55',
    justifyContent: 'space-around'
  },
  contentContainer: {
    paddingVertical: 600
  },
  view: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textColor: {
    color: 'yellow'
  }
});