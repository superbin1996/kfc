import React, {useState, useEffect, useContext} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, Pressable, } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import style from "../Style";
import FetchingFunctions from "../FetchingFunctions";
import Categories from "./components/Categories";
import DealsSlider from "./components/DealsSlider";

// Width and height of device
const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height 

export const HomeScreenContext = React.createContext()

const HomeScreen = ({ navigation }) => {

  // ALL DEALS
  const [deals, setDeals] = useState([])

  useEffect(()=>{
    FetchingFunctions.GetDeals()
    .then((data) => {
      setDeals(data)
      console.log(`deals`, data)
    })
  }, [])

  return (
    <HomeScreenContext.Provider
      value={{
      }}
    >
      <ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>
        
        {/* Deals recommendation */}
        <View>
          <DealsSlider deals={deals} />
        </View>

        {/* Categories */}
        <Categories navigation={navigation} />

      </ScrollView>
    </HomeScreenContext.Provider>
  )
}

export default HomeScreen
