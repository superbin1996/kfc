import React from 'react'
import { Pressable, Image } from 'react-native'
import { useAppContext } from '../../../context/appContext'
// import style from "../../Style";

const SingleItemCategory = (props) => {
  const { style, changeImagePath, } = useAppContext()
  const {
    singleItemCategory,
    categoryChosen,
    setCategoryChosen,
  } = props
  // console.log(singleItemCategory)

  return (
    <Pressable
      onPress={() => {
        setCategoryChosen(singleItemCategory.id)
      }} 
    >
      <Image source={{uri: changeImagePath(singleItemCategory.image_url)}} 
        style={singleItemCategory.id === categoryChosen ? style.homeSingleItemCategoryChosen : style.homeSingleItemCategory}
        />
    </Pressable>
  )
}


export default SingleItemCategory