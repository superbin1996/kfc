// import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, TextInput, Pressable } from 'react-native'
import { useCookies } from 'react-cookie';
import { useAppContext } from '../../context/appContext';

export const CartScreenContext = React.createContext()

const SettingsScreen = (props) => {
  const {
    style,
    baseURL,
    customAxios,
  } = useAppContext()

  const {
    modalVisible,
    setModalVisible,
    navigation,
    // route,
    user,
    setUser,
    // showHistory,
    // setShowHistory,
  } = props

  const [token, setToken, removeToken] = useCookies(['kfc'])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Change button
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    // console.log('cookie:', token['kfc'])
    // getUser()
  }, [token])

  // Login handle
  const login = (e) => {
    // console.log(`login run`)
    e.preventDefault()

    // console.log(`username: ${username}, password: ${password}`)
    // Get token then push to cookie
    const url = `auth/`
    customAxios.post(url, { username, password })
      .then(response => response.data)
      .then((jsonData) => {
        // console.log(`token:`, jsonData)
        setToken("kfc", jsonData.token)
        setToken('username', username)

        // DONT KNOW WHY BUT IT NEED DOUBLE
        setModalVisible(false)
        setModalVisible(false)

        // GET USER
        customAxios(`current_user/`, {
            headers: {
              Authorization: `Token ${jsonData.token}`
            }
          }
        )
        .then(response=>response.data)
        .then((data) => {
          setUser(data)
          // console.log('User:', data)
          if (!Object.keys(data).includes('detail')) {
            setModalVisible(false)
            // console.log('Already login')
          }
        })
      })
  }

  function logout() {
    removeToken('kfc')
    removeToken('username')
    setModalVisible(true)
  }

  // Register handle
  const register = async (event) => {
    event.preventDefault()
    // console.log(`register run: ${username} and password`)
    
    const url = `register/`
    await customAxios.post(
      url,
      { username, password }
    )
    // console.log(data)
    setTimeout(()=>{
      login(event)
    }, 500)

  }

  function changeButton() {
    setShowRegister(!showRegister)
  }

  // To log in 
  // console.log(modalVisible);
  if (modalVisible) {
    return (
      <ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>

        <View>

          <TextInput placeholder='Username' value={username} onChangeText={setUsername}
            style={{
              width: windowWidth,
              minHeight: 50,
              marginBottom: 5,
              backgroundColor: '#d0d5db',
            }}
          />

          <TextInput secureTextEntry={true} placeholder='Password' value={password} onChangeText={setPassword}
            style={{
              width: windowWidth,
              minHeight: 50,
              marginBottom: 5,
              backgroundColor: '#d0d5db',
            }}
          />

          {/* BUTTOM */}
          {showRegister ?
            // Register
            <Pressable onPress={register}
              style={{
                width: '50%',
                backgroundColor: 'chartreuse',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: 500,
              }}>Register</Text>
            </Pressable>
            :
            // Login
            <Pressable onPress={login}
              style={{
                width: '50%',
                backgroundColor: 'chartreuse',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{
                fontSize: 16,
                fontWeight: 500,
              }}>Login</Text>
            </Pressable>
          }

          {showRegister ?
            // CHANGE TO LOGIN
            <Pressable onPress={changeButton} style={{ paddingTop: 15 }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 500,
              }}>Already have an account? Sign in</Text>
            </Pressable>
            :
            // CHANGE TO REGISTER
            <Pressable onPress={changeButton} style={{ paddingTop: 15 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 500,
                }}>Don't have an account? <Text style={{color:'blue'}}>Sign up</Text></Text>
            </Pressable>
          }
        </View>

      </ScrollView>
    )
  }
  // AFTER LOGIN
  else {
    return (
      <ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>
        <View>
          <Text>Username:</Text>
          <Text>{user.username}</Text>
        </View>

        <View>
          <Text>Email:</Text>
          <Text>{user.email}</Text>
        </View>

        <Pressable onPress={() => {
          navigation.navigate('Cart')
        }}>
          <Text>Transaction History</Text>
        </Pressable>
        <Pressable onPress={logout}
          style={{
            width: '50%',
            backgroundColor: 'chartreuse',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center',
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 6,
            marginTop: 5,
          }}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: 500,
          }}>Logout</Text>
        </Pressable>
      </ScrollView>
    )
  }

}

export default SettingsScreen

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  centeredView: {
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: '100%',
    height: '100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: '95%',
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    paddingTop: 20,
    paddingLeft: 7,
    paddingRight: 7,
  },
  modalInnerText: {
    fontWeight: 'bold',
    fontSize: 14,
    flexGrow: 1,
    textAlign: 'left',
  },
  modalChoosingText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

