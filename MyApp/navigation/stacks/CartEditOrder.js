import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TextInput, CheckBox } from 'react-native'
import { DishContext } from './components/Dish'
import style from '../Style'
import { EvilIcons } from '@expo/vector-icons';
import CustomChoices from './components/CustomChoices'
import ImageSlider from './components/ImageSlider';

// Width and height of device
const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height 

export const CustomScreenContext = React.createContext()

const CartEditOrder = ({navigation, route}) => {

  const {
    order,
  } = route.params

  // ARRAY OF DISH IMAGES
  const [imageArray, setImageArray] = useState([])

  // NUMBER OR DISHES
  const [orderAmount, setOrderAmount] = useState(1)

  const [itemsChosen, setItemsChosen] = useState([])

  const [price, setPrice] = useState(0)

  useEffect(() => {
    // CHANGE IMAGES OBJECT ARRAY TO ARRAY
    // console.log('custom dishItem', dishItems)
    let imgArray = order.images.map((image) => `http://127.0.0.1:8000/media/${image.image}`)
    setImageArray(imgArray)
    console.log(`singleItems`, order.dishItems.singleItems)

    setItemsChosen(order.itemsChosen)
    setPrice(order.price)
    setOrderAmount(order.amount)
  }, [order])

  // SET PRICE
  useEffect(() => {
    let total = order?.categoryDish.price
    try {
      itemsChosen?.map(element => {
        // CHECK FOR SINGLE ITEM
        if (Object.keys(element).includes('due')) {
          total += element.due
        }
      })
    }
    finally {
      setPrice(total)
    }
  }, [itemsChosen, order])

  function updateCart() {
    navigation.goBack()
    navigation.navigate('Cart', {
      dish: {
        id: order.id, // use time for key, because we can order a dish two times
        // dishId: categoryDish.id,
        // name: categoryDish.name,
        categoryDish: order.categoryDish,
        itemsChosen: itemsChosen,
        dishItems: order.dishItems,
        images: order.images,
        price: price,
        amount: orderAmount,
      },
    })
  }
  
  if (order == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  else {
    return (
      <CustomScreenContext.Provider
        value={{setItemsChosen, itemsChosen}}
      >
        {console.log(`itemsChosen`, itemsChosen)}
        <ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>
          
          {/* ORDER AND COST */}
          <View style={style.orderAmount}>
            <ImageSlider imageArray={imageArray} />
  
            <View>
              <Text style={style.customName}>{orderAmount}X {order.categoryDish.name.toUpperCase()}</Text>
  
              <View>
                {order.itemsChosen.map((element, index) => {
                  return (
                    <View key={index} style={{
                      flexDirection:'row',
                    }}>
                      <Text style={{flexGrow:1}}>・{element.name}</Text>
                      <Text>+{element.due}</Text>
                    </View>
  
                  )
                })}
              </View>
              
              <View style={{flexDirection:'row'}}>
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
                  <TextInput value={orderAmount} onChangeText={setOrderAmount} style={{
											width:30,
											fontSize: 18,
											paddingLeft: 5,
											paddingRight: 5,
										}} />
                  <Pressable onPress={()=>{setOrderAmount(orderAmount+1)}}>
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
  
            <View>
              <View style={{flexDirection:'row',paddingTop: 10,}}>
                <Text style={{
									flexGrow:1,
									fontSize: 18,
									fontFamily: "National2",
									lineHeight: 1.5,
									fontWeight: 600,
								}}>ORDER TOTAL</Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: "National2",
                    lineHeight: 1.5,
                    fontWeight: 600,
                    color: 'red',
                }}>{orderAmount * price}</Text>
              </View>
  
              <View>
                <View>
                  {/* UPDATE CART */}
                  <Pressable style={style.customBtn}
                    onPress={updateCart}>
                    <Text style={{color:'green', textAlign:'center'}}>UPDATE CART</Text>
                  </Pressable>
                  
                  {/* BACK TO HOME */}
                  <Pressable style={style.customBtn} 
                    onPress={()=>{
                      navigation.navigate('Home')
                    }}>
                    <Text style={{color:'green', textAlign:'center'}}>ADD MORE COMBO</Text>
                  </Pressable>
  
                </View>
                
                {/* GO BACK TO CART */}
                <Pressable style={style.customBtn}
                  onPress={() => {
                    navigation.goBack()
                  }}>
                  <Text style={{color:'green', textAlign:'center'}}>BACK TO CART</Text>
                </Pressable>
              </View>
            </View>
          </View>
  
          <View>
            <View>
              <Text>{order.categoryDish.name}</Text>
  
              {/* SELECT NON-DRINK ITEMS FIRST */}
              {order.dishItems.selections?.map((selection, index) => { 
  
                if (selection.default.category__field !== 'singleItems-desserts-drinks')
                {
                  return (
                    <View key={index} >
                      <Text>SELECT 1 IN OPTIONS BELOW</Text>
                      <CustomChoices selection={selection}
                        itemsChosen={itemsChosen}
                        setItemsChosen={setItemsChosen} />
                    </View>
                  ) 
                }
              })}
  
              {/* SINGLE ITEMS */}
              {order.dishItems.singleItems?.map((singleItem, index) => {
                // if (singleItem === undefined || singleItem.length == 0) {
                //   return (
                //     <Text key={index}></Text>
                //   )
                // }
                // else {
                  return (
                    <View key={singleItem.id}>
                      <EvilIcons name="check" size={24} color="green" />
                      <Text>{singleItem.name}</Text>
                    </View>
                  )
                // }
              })}
  
              {/* DINK SELECTION */}
              <View>
                <Text>UP SIZE DESSERTS DRINKS</Text>
  
                {order.dishItems.selections?.map((selection, index) => {  
  
                  if (selection.default.category__field === 'singleItems-desserts-drinks')
                  {
                    return (
                      <CustomChoices key={index} selection={selection}
                        itemsChosen={itemsChosen}
                        setItemsChosen={setItemsChosen} />
                    ) 
                  }
                })}
              </View>
            </View>
  
            <View>
  
            </View>
          </View>
  
        </ScrollView>
  
      </CustomScreenContext.Provider>
    )

  }
}

export default CartEditOrder