import React, {useState, useEffect} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, Pressable, } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import style from "../../Style";
import { Dish } from "./Dish";

// Width and height of device
const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height 

export const Dishes = (props) => {
  const {
    categoryDishes,
  } = props
  
  return (
    <View style={style.homeFoodListCover}>
      {/* Arrow icon */}
      <AntDesign name="downcircleo" size={24} color="black" 
        style={{marginLeft:'auto',marginRight:'auto'}} />
      
      <View 
        style={{
          // maxHeight:windowHeight*0.45, 
          marginTop:10}}
      >
        {/* Food list */}
        <View style={style.homeFoodList}>
          {categoryDishes.map((categoryDish) => {
            return (
              <Dish key={categoryDish.id}
                categoryDish={categoryDish}/>
            )
          })}

        </View>
      </View>

    </View>
  )
}

export const nigiri = [
  {
    id: 0,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a01.png',
    // name: 'Combo Fried Chicken',
    // price: 78000,
    // compose: {
    //   singleItem: '1 Pepsi Can',
    //   selection: '2 Pcs of Hot & Spicy Chicken / 2 Pcs of Non Spicy Crispy Chicken / 2 Pcs of Original Recipe Chicken',
    // }
  },
  {
    id: 1,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a02.png',
  },
  {
    id: 2,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a43.png',
  },
  {
    id: 3,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_a49.png',
  },
  {
    id: 4,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_b02.png',
  },
  {
    id: 5,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_b03.png',
  },
  {
    id: 6,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_b06.png',
  },
  {
    id: 7,
    uri: 'https://www.akindo-sushiro.co.jp/en/img/top/sushi/menu_b07.png',
  },
]