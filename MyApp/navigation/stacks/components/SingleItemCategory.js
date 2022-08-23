import React, {useEffect, useState} from 'react'
import { Pressable, Text, View, Image } from 'react-native'
import style from "../../Style";

const SingleItemCategory = (props) => {
  const {
    singleItemCategory,
    categoryChosen,
    setCategoryChosen,
  } = props

  return (
    <Pressable
      onPress={() => {
        setCategoryChosen(singleItemCategory.id)
      }} 
    >
      <Image source={{uri: `http://127.0.0.1:8000/media/${singleItemCategory.image}`}} 
        style={singleItemCategory.id === categoryChosen ? style.homeSingleItemCategoryChosen : style.homeSingleItemCategory}
        />
    </Pressable>
  )
}


export default SingleItemCategory