import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MainContainer from './navigation/bottomTabs/MainContainer';
import SettingsScreen from './navigation/bottomTabs/SettingsScreen'
import CartScreen from './navigation/bottomTabs/CartScreen'
import { CookiesProvider} from 'react-cookie'
import { AppProvider, baseURL, token} from './context/appContext';
import axios from 'axios';

const homeName = 'Main'
const cartName = 'Cart'
const settingsName = 'Settings'
const Tab = createBottomTabNavigator()

const App = () => {
  // SHOW LOGIN MODAL
  const [modalVisible, setModalVisible] = useState(true)

  // SHOW ORDER HISTOPRY
  const [showHistory, setShowHistory] = useState(false)

  const [user, setUser] = useState([])

  const getUser = () => {
    // console.log(baseURL, token);

    axios(`${baseURL}current_user/`, {headers:{Authorization:`Token ${token}`}})
    .then(response=>response.data)
    .then((data)=>{
      setUser(data)
      // console.log('User:', data)
      if (!Object.keys(data).includes('detail')) {
        setModalVisible(false)
        // console.log('Already login')
      }
    })
  }

  useEffect(() => {
    // CHECK CURRENT TOKEN
    // console.log('Check login');
    getUser()
  }, [token])


  return (
    <CookiesProvider>
      <AppProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
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
              labelStyle: { paddingBottom: 10, fontSize: 10 },
              style: { padding: 10, height: 70 },
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
      </AppProvider>
    </CookiesProvider>

  )
}

export default App