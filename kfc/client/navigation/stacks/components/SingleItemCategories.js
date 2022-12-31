import React from 'react'
import { View } from 'react-native'
import { useAppContext } from '../../../context/appContext';
import SingleItemCategory from './SingleItemCategory'

const SingleItemCategories = (props) => {
  const { style } = useAppContext()
  const {
    categories,
    categoryChosen,
    setCategoryChosen,
  } = props

  function filterSingleItems(input) {
    if (Boolean(input.field.startsWith('singleItems-')) === true) {
      return input
    }
  }

  return (
    <View style={style.homeCategories}>
      {categories.filter(singleItemCategory => filterSingleItems(singleItemCategory)).map((singleItemCategory)=>{
        return(
          <SingleItemCategory key={singleItemCategory.id}
            singleItemCategory={singleItemCategory}
            categoryChosen={categoryChosen}
            setCategoryChosen={setCategoryChosen}
          />
        )
      })}
    </View>
  )
}

// const singleItemCategories = [
//   {
//     id: 0,
//     uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a01.png',
//   },
//   {
//     id: 1,
//     uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a13.png',
//   },
//   {
//     id: 2,
//     uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_f18.png',
//   },
//   {
//     id: 3,
//     uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_g01_201125.png',
//   },
// ]

export default SingleItemCategories