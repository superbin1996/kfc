import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, {useContext, useEffect, useState} from 'react'
import { Text, View, Image, ScrollView, StyleSheet, Dimensions, Button, TextInput, Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartOrder = (props) => {
  const {
    order = {},
    orders = [],
    setOrders,
  } = props

  const navigation = useNavigation()
  
  // NUMBER OR DISHES
  const [orderAmount, setOrderAmount] = useState(1)

  const [price, setPrice] = useState(0)

  useEffect(()=>{
    setOrderAmount(order.amount)
    setPrice(order.price)
  }, [order])

  useEffect(() => {
    if (orderAmount != order.amount) {
      order.amount = orderAmount
      // order.price = orderAmount * order.price
      let a = orders.find(element => element.id == order.id)
      let index = orders.indexOf(a)
      let ordersCopy = JSON.parse(JSON.stringify(orders))
      try
        {
          ordersCopy.splice(index, 1, order)
          console.log('order:', order)
        }
      finally {
        setOrders(ordersCopy)
      }
    }

  }, [orderAmount])

  function editOrder() {
    navigation.navigate('EditCart', {
      order,
    })
  }

  function delOrder() {
		let newOrders = orders.filter(element => element.id != order.id)
		setOrders(newOrders)
	}

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
        <View style={{
          flexDirection:'row',
        }}>
          <Text style={{
            flexGrow: 1,
            // color: '#000',
            fontWeight: 600,
            fontFamily: 'National2Condensed',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontSize: 26,
          }}>{order?.categoryDish?.name.toUpperCase()}</Text>
          <View style={{
            flexDirection: 'row',
          }}>
            {/* EDIT ORDER */}
            <Pressable
              onPress={editOrder}
            >
              <MaterialIcons name="edit" size={24} color="black" />
            </Pressable>
  
            {/* DELETE ORDER */}
            <Pressable
              onPress={delOrder}
            >
              <MaterialIcons name="highlight-remove" size={24} color="black" />
            </Pressable>

          </View>
        </View>
  
        <View>
          {order.itemsChosen?.map((item, index) => {
            return (
              <Text key={index}>・{item.name}</Text>	
            )
          })}
        </View>
  
        <View style={{
            flexDirection:'row',
          }}>
          <View style={{
            flexDirection:'row',
            flexGrow: 1,
          }}>
            <Pressable 
              onPress={()=>{
                if (orderAmount > 1) {
                setOrderAmount(orderAmount-1)
              }}}
            >
              <Text style={{
                transform: 'scale(1.5)',
              }}>⊖</Text>
            </Pressable>

            <TextInput style={{
                width:30,
                fontSize: 18,
                paddingLeft: 5,
                paddingRight: 5,
              }}
              value={orderAmount} onChangeText={setOrderAmount} />

            <Pressable onPress={()=>{
              setOrderAmount(orderAmount + 1)
            }}>
              <Text style={{
                transform: 'scale(1.5)',
              }}>⊕</Text>
            </Pressable>
          </View>
  
          <Text style={{
            fontSize: 18,
            fontFamily: "National2",
            lineHeight: 1.5,
            fontWeight: 600,
            alignSelf: 'center',
          }}>{orderAmount * price}</Text>
        </View>
      </View>
    )
  }
}

export default CartOrder