import React, {useState, useEffect, useRef, useContext} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import style from "../Style";

const DealsScreen = ({navigation, route}) => {
  const {
    deal,
  } = route.params

  useEffect(()=>{
    console.log('deal', deal)
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text>{deal.title}</Text>
      <Text>{deal.description}</Text>
      <Text>{deal.hashtag}</Text>
      <View style={style.dealImageContainer}>
        <Image
          style={style.dealImage}
          source={{uri: `http://127.0.0.1:8000/media/${deal.image}`}}
        />
      </View>
    </ScrollView>
  )
}

export default DealsScreen