import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, {useEffect, useState} from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Dimensions, Button, TextInput, Pressable } from 'react-native'

const OrderHistoryChild = (props) => {
  const {
    order = {},
  } = props
  
  // NUMBER OR DISHES
  // const [orderAmount, setOrderAmount] = useState(1)

  // const [price, setPrice] = useState(0)

  // useEffect(()=>{
  //   setOrderAmount(order.amount)
  //   setPrice(order.price)
  // }, [order])

  if (Object.keys(order).length == 0) {
    return (
      <View>
        <Text>There are nothing here</Text>
      </View>
    )
  }
  else {
    return (
      <View style={{
        borderWidth: 1,
        borderColor: 'red',
      }}>
        <View>
          <Text>{order?.categoryDish?.name.toUpperCase()}</Text>
        </View>
  
        <View>
          {order.itemsChosen?.map((item, index) => {
            return (
              <Text key={index}>・{item.name}</Text>	
            )
          })}
        </View>
  
        <View>
          <Text>{order.amount * order.price}</Text>
        </View>
      </View>
    )
  }

}

export default OrderHistoryChild