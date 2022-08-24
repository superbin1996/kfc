import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, Pressable, Dimensions, ScrollView, TextInput, CheckBox } from 'react-native'
import style from '../../Style'
import CustomChoice from './CustomChoice'

const CustomChoices = (props) => {
  const {
    selection,
    itemsChosen,
    setItemsChosen,
  } = props

  // CHANGE STYLE WHEN CHOSEN
  const [chosen, setChosen] = useState([])

  useEffect(()=>{
    let itemIds = itemsChosen?.filter(element => element.selectionId == selection.default.selectionId).map(element => {
      return element.id
    })
    setChosen(itemIds)
    console.log(`chosen`, itemIds)
  }, [itemsChosen])
  
  return (
    <View style={{flexDirection:'row',flexWrap:'wrap',}}>
      {selection.choices?.map((choice) => {
        return (
          <CustomChoice key={choice.id}
            selection={selection} 
            choice={choice}
            chosen={chosen}
            setChosen={setChosen}
            itemsChosen={itemsChosen}
            setItemsChosen={setItemsChosen} 
          />
        )
      })}
    </View>
  )
}

export default CustomChoices