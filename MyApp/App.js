import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MainContainer from './navigation/bottomTabs/MainContainer';
import SettingsScreen from './navigation/bottomTabs/SettingsScreen'
import CartScreen from './navigation/bottomTabs/CartScreen'
import FetchingFunctions from './navigation/FetchingFunctions';
import {CookiesProvider, useCookies} from 'react-cookie'
import { useWindowDimensions } from 'react-native';

const homeName = 'Main'
const cartName = 'Cart'
const settingsName = 'Settings'
const Tab = createBottomTabNavigator()

const App = () => {

  const [token, setToken, removeToken] = useCookies(['kfc'])
  
  // SHOW LOGIN MODAL
  const [modalVisible, setModalVisible] = useState(true)

  // SHOW ORDER HISTOPRY
  const [showHistory, setShowHistory] = useState(false)
  
  const [user, setUser] = useState([])

  const { height, width } = useWindowDimensions();

  useEffect(()=>{
    // CHECK CURRENT TOKEN
    function getUser() {
      // use getCookie() func to prevent undefined value
      let token = getCookie('kfc')
      FetchingFunctions.CurrentUser(token)
      .then((data)=>{
        setUser(data)
        console.log('User:', data)
        if (!Object.keys(data).includes('detail')) {
          setModalVisible(false)
          console.log('Already login')
        }
      })
    }

    getUser()
  }, [token])

  useEffect(()=>{
    console.log('CHANGE WINDOWS SIZE')
  }, [width, height])


  function getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

  return (
    <CookiesProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName = {homeName}
          screenOptions = {({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              let rn = route.name
              
              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline'
              }
              else if (rn === cartName) {
                iconName = focused ? 'cart' : 'cart-outline'
              }
              else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline'
              }
              return (
                <Ionicons name={iconName} size={size} color={color} />
              )
            },
            // activeTinColor: 'tomato',
            // inactiveTinColor: 'grey',
            // title: 'Hello',
            headerShown: false,
            headerStyle: { backgroundColor: 'papayawhip' },
            labelStyle: {paddingBottom:10,fontSize:10},
            style:{padding:10,height:70},
          })}
        >

        <Tab.Screen name={homeName} component={MainContainer} />

        <Tab.Screen name={cartName} 
          // component={CartScreen}
          children={props => (
            <CartScreen {...props}
             modalVisible={modalVisible} 
             setModalVisible={setModalVisible}
             showHistory={showHistory}
             setShowHistory={setShowHistory}
            />
          )}
             
          initialParams={{
            'dish': undefined,
          }} 
        />
        <Tab.Screen name={settingsName}
        //  component={SettingsScreen} 
          children={props => (
            <SettingsScreen {...props}
             modalVisible={modalVisible} 
             setModalVisible={setModalVisible}
             user={user}
             setUser={setUser}
             showHistory={showHistory}
             setShowHistory={setShowHistory}
            />
          )}
        />

        </Tab.Navigator>
      </NavigationContainer>
    </CookiesProvider>
    
  )
}

export default App