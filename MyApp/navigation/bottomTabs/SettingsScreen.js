import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, {useContext, useEffect, useState} from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Dimensions, Button, TextInput, Pressable, Modal } from 'react-native'
import style from '../Style';
import { useCookies } from 'react-cookie';
import FetchingFunctions from '../FetchingFunctions';

export const CartScreenContext = React.createContext()

const SettingsScreen = (props) => {
	const {
		modalVisible,
		setModalVisible,
		navigation,
		route,
    user,
    setUser,
    showHistory,
    setShowHistory,
	} = props

	const [token, setToken, removeToken] = useCookies(['kfc'])

	const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Change button
  const [showRegister, setShowRegister] = useState(false)

	useEffect(()=>{
		console.log('cookie:', token['kfc'])
		// getUser()
	}, [token])

	// Login handle
  const login = (e) => {
    console.log(`login run`)
    e.preventDefault()
    
    // console.log(`username: ${username}, password: ${password}`)
    
    // Get token then push to cookie
    FetchingFunctions.P('auth/', {username, password})
    .then((jsonData) => {
      console.log(`token:`, jsonData)
      setToken("kfc", jsonData.token)
      setToken('username', username)
      
      // DONT KNOW WHY BUT IT NEED DOUBLE
      setModalVisible(false)
      setModalVisible(false)

      // GET USER
      FetchingFunctions.CurrentUser(jsonData.token)
      .then((data)=>{
        setUser(data)
        console.log('User:', data)
        if (!Object.keys(data).includes('detail')) {
          setModalVisible(false)
          console.log('Already login')
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
  const register = (event) => {
    event.preventDefault()
    console.log(`register run: ${username}, ${password}`)
    
    FetchingFunctions.Register({username, password})
    .then(() => event)
    .then((e)=>{
      console.log(event)
      login(e)
    })
  }

  function changeButton() {
    setShowRegister(!showRegister)
  }

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
                textTransform:'uppercase',
                textAlign:'center',
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
                textTransform:'uppercase',
                textAlign:'center',
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
            <Pressable onPress={changeButton} style={{paddingTop:15}}>
              <Text style={{
                fontSize: 16,
                fontWeight: 500,
              }}>Already have an account? Sign in</Text> 
            </Pressable>
					: 
            // CHANGE TO REGISTER
						<Pressable onPress={changeButton} style={{paddingTop:15}}>
							<Text style={{
                fontSize: 16,
                fontWeight: 500,
              }}>Don't have an account? Sign up</Text>
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
            textTransform:'uppercase',
            textAlign:'center',
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

