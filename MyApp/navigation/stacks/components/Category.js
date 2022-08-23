import React, {useEffect, useState} from 'react'
import { Pressable, Text } from 'react-native'
import style from "../../Style";

const Category = (props) => {
  const {
    category,
    setShowSingleItems,
    categoryChosen,
    setCategoryChosen,
  } = props

  return (
    <Pressable
      onPress={() => {
        setCategoryChosen(category.id)
        setShowSingleItems(false)
      }} 
      style={categoryChosen === category.id ? style.homeCategoryChosen : style.homeCategory}
    >
      <Text>
        {category.field.replace('combo-', '').toUpperCase()}
      </Text>
        
    </Pressable>
  )
}

export default Category