import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from "../../../context/appContext";

export const Dish = (props) => {
  const {
    categoryDish,
  } = props

  const { style, customAxios, changeImagePath } = useAppContext()

  const navigation = useNavigation()


  // Dish images
  const [images, setImages] = useState([])

  // Dish items
  const [dishItems, setDishItems] = useState({})

  // Show another things before finishing loading
  const [loading, setLoading] = useState(false)

  // Hide detail info if category is drink or snack
  const [hideInfo, setHideInfo] = useState(false)

  // Change dish info height to shorten or show text
  const [shorten, setShorten] = useState(true)

  // HIDE DRINK AND SNACK DISH INFO
  function hideDishInfo(categoryDish) {
    if ([`singleItems-desserts-drinks`, `singleItems-snacks`].includes(categoryDish.category__field)) {
      setHideInfo(true)
    }
  }


  function imagePath() {
    let p
    if (images === undefined || images.length === 0) {
      // array empty or does not exist
      p = ''
    }
    else {
      p = images[0].image_url
    }
    return { uri: changeImagePath(p) }
  }


  function choicesText(array) {
    let text = ''
    try {
      for (let i = 0; i < array.length; i += 1) {
        text += `/${array[i].name}`
      }
    }
    finally {
      if (text[0] == '/') {
        return text.substr(1, text.length)
      }
      else {
        return text
      }
    }
  }

  function customProps() {
    navigation.navigate('Custom', {
      images,
      categoryDish,
      dishItems,
    })

  }

  function cartPrams() {
    let itemsChosen
    try {
      let selectionsDefault = dishItems.selections?.map((selection) => {
        return selection.default
      })
      let singleItemDefault = dishItems.singleItems
      itemsChosen = [...selectionsDefault, ...singleItemDefault]
    }
    finally {
      // console.log(`Dish-itemsChosen`, itemsChosen)
      navigation.navigate('Cart', {
        dish: {
          id: Date.now(), // use index for key, because we can order a dish two times
          categoryDish: categoryDish,
          itemsChosen: itemsChosen,
          dishItems: dishItems,
          images: images,
          price: categoryDish.price,  //one set only
          amount: 1,
        }
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    // console.log('categoryDish', categoryDish)

    hideDishInfo(categoryDish)
    
    const url = `item_images/${categoryDish.id}/`
    // GET ITEM IMAGES
    customAxios(url)
    .then((response)=>{
      return response.data
    })
    .then((data) => {
      setImages(data)
      // console.log('images', data)
    })

    const url1 = `dish_items/${categoryDish.id}/`
    // GET DISH ITEMS
    customAxios(url1)
    .then(response=>response.data)
    .then((data) => {
      // console.log(`dishItems:`, data)
      setDishItems(data)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  // If have not finished loading
  if (loading) {
    return (
      <View style={style.homeFoodContainer}>
        <Text>Data is loading...</Text>
      </View>
    )
  }

  return (
    <View style={style.dishContainer}>
      <Pressable style={style.dishImageContainer}
        onPress={customProps}
      >
        {/* Dish image */}
        <Image
          style={style.DishImage}
          source={imagePath()}
        />
      </Pressable>

      <View>
        <Text numberOfLines={1} style={style.dishName}>
          {categoryDish.name}
        </Text>
        <Text>{categoryDish.price}</Text>
      </View>

      <View style={shorten ? style.dishInfo : [style.dishInfo, { height: 'fit-content' }]}>
        {/* IF DISH IS DRINK, HIDE INFO */}
        {hideInfo ||
          // Dish ITEMS
          <View style={shorten ? style.dishInfoHide : style.dishInfoShow}>

            {/* SELECTIONS TEXT */}
            {dishItems.selections?.filter(selection =>
              selection.default.category__field != 'singleItems-desserts-drinks'
            ).map((selection, index) => {
              return (
                <Text key={index}>
                  {choicesText(selection.choices)}
                </Text>
              )
            })}

            {/* SINGLE ITEM TEXT */}
            {dishItems.singleItems?.map((singleItem, index) => {
              return (
                <Text key={index}>
                  {singleItem.name}
                </Text>
              )
            })}

            {/* DRINK TEXT */}
            {dishItems.selections?.filter(selection =>
              selection.default.category__field == 'singleItems-desserts-drinks'
            ).map((selection, index) => {
              return (
                <Text key={index}>
                  {selection.default.name}
                </Text>
              )
            })}

          </View>
        }

        <Pressable style={{ alignSelf: 'center' }}
          onPress={() => setShorten(!shorten)}
        >
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" style={shorten ? { transform: 'rotate(0deg)', transitionDuration: '500ms' } : { transform: 'rotate(180deg)', transitionDuration: '500ms' }} />
        </Pressable>

        <Pressable style={style.customBtn}
          onPress={customProps}
        >
          <Text style={{ color: 'green', textAlign: 'center' }}>Cumtom</Text>
        </Pressable>

        <Pressable style={style.customBtn}
          onPress={cartPrams}
        >
          <Text style={{ color: 'green', textAlign: 'center' }}>Order</Text>
        </Pressable>
      </View>

    </View>


  )
}
