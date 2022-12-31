import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
// import { AntDesign } from '@expo/vector-icons';
import Categories from "./components/Categories";
import DealsSlider from "./components/DealsSlider";
import { useAppContext } from "../../context/appContext";

// Width and height of device
// const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height 

export const HomeScreenContext = React.createContext()
const HomeScreen = ({ navigation }) => {
  const {
    style,
    customAxios,
  } = useAppContext()

  // ALL DEALS
  const [deals, setDeals] = useState([])

  const getDeals = async () => {
    const url = `get_deals/`
    const { data } = await customAxios(url)
    setDeals(data)
    console.log(`deals`, data)
  }


  useEffect(() => {
    getDeals()
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
