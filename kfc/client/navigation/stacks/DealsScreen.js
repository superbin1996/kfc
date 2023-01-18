import React, {useEffect} from "react";
import { View, Image, ScrollView, Text } from "react-native";
import { useAppContext } from "../../context/appContext";
// import style from "../Style";

const DealsScreen = ({navigation, route}) => {
  const {style, changeImagePath} = useAppContext()

  const {
    deal,
  } = route.params

  // useEffect(()=>{
  //   console.log('deal', deal)
  // }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>{deal.title}</Text>
      <Text>{deal.description}</Text>
      <Text>{deal.hashtag}</Text>
      <View style={style.dealImageContainer}>
        {/* Deal image */}
        <Image
          style={style.dealImage}
          source={{uri: changeImagePath(deal.image_url)}}
        />
      </View>
    </ScrollView>
  )
}

export default DealsScreen