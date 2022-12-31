import { StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

// To void error when try to get undefined cookie, use this function istead of package
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

const token = getCookie('kfc')
const host = (process.env.NODE_ENV === "development") ? "http://127.0.0.1:8000" : ""
const baseURL = `${host}/api/v1/`

const initialState = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  token: token,
  host: host,
  baseURL: baseURL,
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {

  const [state, setState] = useState(initialState)

  function handleWindowSizeChange() {
    // setWindowWidth(Dimensions.get('window').width)
    // setWindowHeight(Dimensions.get('window').height)
    setState({...state, windowWidth: Dimensions.get('window').width, windowHeight: Dimensions.get('window').height})
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])


  const style = StyleSheet.create({
    // HomeScreen
    homeContainer: {
      width: state.windowWidth > 1000 ? 1000 : state.windowWidth,
      // maxWidth: 1000,
      // paddingLeft: windowWidth > 1000 ? (windowWidth - 1000)/2 : 5,
      paddingLeft: state.windowWidth > 1000 ? 'auto' : 5,
      // paddingRight: windowWidth > 1000 ? (windowWidth - 1000)/2 : 5,
      paddingRight: state.windowWidth > 1000 ? 'auto' : 5,
      paddingTop: 5,
      height: state.windowHeight - 100,
      marginTop: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderColor: 'green',
      borderWidth: 3,
      minHeight: state.windowHeight - 100,
      height: 'auto',
      // borderLeftWidth: 1,
      // borderRightWidth: 1,
    },
    homeCategories: {
      flexDirection: 'row',
      borderColor: 'violet',
      borderWidth: 2,
      justifyContent: "space-around",
      marginTop: 10,
    },
    homeCategory: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 0.2 * state.windowWidth,
      maxWidth: 200,
      height: 0.1 * state.windowWidth,
      maxHeight: 200,
      borderColor: 'lightblue',
      borderWidth: 1,
      borderRadius: 10,
    },
    homeCategoryChosen: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 8,
      width: 0.2 * state.windowWidth,
      height: 0.1 * state.windowWidth,
      borderColor: 'orange',
    },
    homeSingleItemCategory: {
      width: 0.2 * state.windowWidth,
      maxWidth: 200,
      height: 0.2 * state.windowWidth,
      maxHeight: 200,
      borderColor: 'lightblue',
      borderWidth: 1,
      borderRadius: 10,
    },
    homeSingleItemCategoryChosen: {
      borderWidth: 2,
      borderRadius: 8,
      width: 0.2 * state.windowWidth,
      height: 0.2 * state.windowWidth,
      borderColor: 'orange',
    },
    homeFoodListCover: {
      // textAlign:'center',
      marginTop: 10,
    },
    homeFoodList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderWidth: 2,
      borderColor: 'Crimson',
      // justifyContent: 'flex-start',
      // justifyContent: 'space-around',
      justifyContent: 'center',
    },
    dishContainer: {
      borderColor: 'green',
      borderWidth: 1,
      width: 0.32 * state.windowWidth,
      height: 'fit-content',
      paddingLeft: state.windowWidth > 1000 ? '2.5%' : 0.033 * state.windowWidth,
      paddingRight: state.windowWidth > 1000 ? '2.5%' : 0.033 * state.windowWidth,
      maxWidth: 240,
      flexDirection: 'column',
      flexGrow: 1,
      marginBottom: 20,
    },
    dishName: {
      borderWidth: 1,
      borderColor: 'chartreuse',
      // height: state.windowWidth > 1000 ? '2%' : 0.16*state.windowWidth,
      overflow: 'hidden',
      wordWrap: 'break-word',
      hyphens: 'auto',
      width: '100%',
      height: 18,
      fontSize: 14,
      // textOverflow: 'ellipsis',
      // overflow: 'hidden',
      // whiteSpace:'wrap',
    },
    dishImageContainer: {
      width: '100%',
      height: state.windowWidth > 1000 ? 0.07 * state.windowWidth : 0.25 * state.windowWidth,
    },
    DishImage: {
      flexGrow: 1,
      borderRadius: 10,
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 10,
      marginRight: 10,
      resizeMode: 'stretch',
      minHeight: 50,
      width: '100%',
      height: '100%',
    },
    dishInfo: {
      borderColor: 'red',
      borderWidth: 1,
      // minHeight: windowWidth > 1000 ? '80%' : 0.35*windowWidth,
    },
    dishInfoHide: {
      borderWidth: 1,
      borderColor: 'yellowBlanchedAlmond',
      height: state.windowWidth > 1000 ? 0.04 * state.windowWidth : 0.15 * state.windowWidth,
      overflow: 'hidden',
      wordWrap: 'break-word',
      textOverflow: 'ellipsis',
      hyphens: 'auto',
    },
    dishInfoShow: {
      borderWidth: 1,
      borderColor: 'yellowBlanchedAlmond',
      minHeight: state.windowWidth > 1000 ? 0.04 * state.windowWidth : 0.15 * state.windowWidth,
    },
    customBtn: {
      marginTop: 8,
      alignSelf: 'center',
      width: '70%',
      height: 25,
      borderWidth: 2,
      borderColor: 'rgba(var(--b6a, 219, 219, 219), 1)',
    },
    // CUSTOM SCREEN
    customOrder: {
      width: '100%',
    },
    customName: {
      fontStyle: 'italic',
      fontSize: '1.333333333333333em',
      color: 'rgb(232, 230, 227)',
      fontWeight: 'bold',
      wordWrap: 'break-word',
    },
    customList: {

    },
    // DEALS SCREEN
    dealImageContainer: {
      width: state.windowWidth,
      height: 0.45 * state.windowWidth,
    },
    dealImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'stretch',
    }
  })

  // fetch without token
  const customAxios = axios.create({
    baseURL: state.baseURL,
  })

  // THIS SHIT WON'T WORK
  // fetch with token
  const authFetch = axios.create({
    baseURL: state.baseURL,
  })

  // THIS SHIT WON'T WORK
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Token ${token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Change iamge url, on development, react need host to serve image files
  // On production, we don't need host
  function changeImagePath(image) {
    const baseUrl = `${state.host}`
    if ((image || '').includes(baseUrl)) {
      return image
    }
    else {
      return baseUrl + image
    }
  }

  return (
    <AppContext.Provider
      value={{ 
        ...state,
        style,
        customAxios,
        authFetch,
        changeImagePath,
       }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => { return (useContext(AppContext)) }


export { useAppContext, AppProvider, baseURL, token }