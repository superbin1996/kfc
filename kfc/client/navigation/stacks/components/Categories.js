import React, { useState, useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import Category from './Category'
import SingleItemCategories from './SingleItemCategories'
import { Dishes } from './Dishes'
import { useAppContext } from '../../../context/appContext';

const Categories = () => {
  const {
    style,
    customAxios
  } = useAppContext()

  // Category Array
  const [categories, setCategories] = useState([])

  // Category Items
  const [categoryDishes, setCategoryDishes] = useState([])

  // Press on Category
  const [categoryChosen, setCategoryChosen] = useState(0)

  // Show Category Items
  const [showSingleItems, setShowSingleItems] = useState(false)

  
  function getCategoryItems(categoryId) {
    const url = `category_items/${categoryId}`
    customAxios(url)
    .then(response=>response.data)
    .then((data) => {
      setCategoryDishes(data)
    })
  }

  
  function findFirstComboId(categories) {
    var jsonPromise = new Promise(function (resolve, reject) {
      let a = categories.find(category => category.field.startsWith('combo-'))
      if (a) {
        resolve(a)
      }
      else {
        reject(Error("There are no combo categoreis"))
      }

    })

    jsonPromise.then((data) => {
      // This never happens:
      // console.log("It worked!", data.id);
      // Set first combo id to category id
      setCategoryChosen(data.id)
    }).catch((err) => {
      // Instead, this happens:
      // console.log("It failed!", err);
    })
    console.log()
  }

  function findFirstSingleItemId() {
    var jsonPromise = new Promise(function (resolve, reject) {
      let a = categories.find(category => category.field.startsWith('singleItems-'))
      if (a) {
        resolve(a)
      }
      else {
        reject(Error("There are no combo categoreis"))
      }

    })

    jsonPromise.then(function (data) {
      // console.log("It worked!", data.id);
      // Set first combo id to category id
      setCategoryChosen(data.id)

    }).catch(function (err) {
      // Instead, this happens:
      // console.log("It failed!", err);
    })
  }

  function filterCombo(input) {
    if (Boolean(input.field.startsWith('combo-')) === true) {
      return input
    }
  }

  const getCategories = async () => {
    const url = `get_categories/`
    const { data } = await customAxios(url)
    // console.log('get_categories:',data);
    setCategories(data)
    findFirstComboId(data)
  }

  useEffect(() => {
    // console.log('categories useEffect')
    getCategories()
  }, [])

  useEffect(() => {
    // console.log('categories useEffect1')
    if (categoryChosen !== 0) {
      getCategoryItems(categoryChosen)
    }
  }, [categoryChosen])

  return (
    <View style={{
      width: '100%',
      // borderColor: 'gray',
      // borderWidth: 1,
    }}>
      <View style={[style.homeCategories, { alignContent: 'stretch' }]}>
        {categories.filter(category => filterCombo(category)).map((category) => {
          return (
            <Category key={category.id}
              category={category}
              setShowSingleItems={setShowSingleItems}
              categoryChosen={categoryChosen}
              setCategoryChosen={setCategoryChosen} />
          )
        })}

        {/* For Single-Items-Category */}
        <Pressable
          onPress={() => {
            setShowSingleItems(true)
            findFirstSingleItemId()
          }}
          style={showSingleItems ? style.homeCategoryChosen : style.homeCategory}
        >
          <Text>
            SINGLE ITEMS
          </Text>

        </Pressable>

      </View>

      {/* Single item Categories */}
      {showSingleItems &&
        <SingleItemCategories
          categories={categories}
          categoryChosen={categoryChosen}
          setCategoryChosen={setCategoryChosen}
        />
      }

      {/* {console.log('categoryDishes:', categoryDishes)} */}
      <Dishes categoryDishes={categoryDishes} />

    </View>

  )
}
export default Categories

// const categories = [
//   {
//     id: 0,
//     name: 'FOR ONE',
//   },
//   {
//     id: 1,
//     name: 'FOR SHARING',
//   },
//   {
//     id: 2,
//     name: 'HOT DEALS',
//   },
//   // {
//   //   id: 3,
//   //   name: 'SINGLE ITEM',
//   // },
// ]



