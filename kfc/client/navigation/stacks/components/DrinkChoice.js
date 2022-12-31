import React, { useState, useEffect, useContext } from "react";
import { View, Image, Text, Pressable, } from "react-native";
// import { HomeScreenContext } from "../HomeScreen";
// import style from "../../Style";
import { EvilIcons } from '@expo/vector-icons';
import { CustomScreenContext } from "../CustomScreen";
import { useAppContext } from "../../../context/appContext";

const DrinkChoice = (props) => {
  const { style,changeImagePath } = useAppContext()
  const {
    selection,
    choice,
    chosen,
    // setChosen,
  } = props

  const {
    itemsChosen,
    setItemsChosen,
  } = useContext(CustomScreenContext)

  // const [number, setNumber] = useState(0)

  useEffect(() => {

  }, [])

  function imagePath() {
    return changeImagePath(choice.image__image)
  }

  function replaceChoice() {
    console.log(choice.selectionId)
    let newItemsChosen = JSON.parse(JSON.stringify(itemsChosen))
    let otherSelections = newItemsChosen?.filter(element => element.selectionId != choice.selectionId)
    let changedSelection = newItemsChosen?.filter(element => element.selectionId == choice.selectionId)
    try {
      console.log(`otherSelections`, otherSelections)
      console.log(`changedSelection`, changedSelection)
      changedSelection.shift()
      changedSelection.push(choice)
    }
    finally {
      console.log(`newItemsChosen`, newItemsChosen)
      setItemsChosen([...otherSelections, ...changedSelection])
    }
  }

  function subtractPress() {
    console.log(choice.selectionId)
    let newItemsChosen = JSON.parse(JSON.stringify(itemsChosen))
    if (choice.id != selection.default.id && choice.selectionId == selection.default.selectionId) {
      let a = newItemsChosen?.find(element => JSON.stringify(element) == JSON.stringify(choice))
      console.log(`choice`, choice)
      let b = newItemsChosen.indexOf(a)
      try {
        newItemsChosen.splice(b, 1)
        newItemsChosen.push(selection.default)
      }
      finally {
        console.log(`newItemsChosen`, newItemsChosen)
        setItemsChosen([...newItemsChosen])
      }
    }
  }

  function itemNumber() {
    let number = chosen?.filter(element => element == choice.id)
    return number.length
  }

  return (
    <Pressable
      onPress={replaceChoice}
    >
      <View style={style.dishImageContainer}>
        <Image
          style={style.DishImage}
          source={imagePath()}
        />
      </View>

      <View>
        <Text>{choice.name}</Text>
        <View>
          {chosen.includes(choice.id) ?
            // CHOSEN
            <EvilIcons name="check" size={24} color="green" />
            :
            // NOT CHOSEN
            <EvilIcons name="check" size={24} color="black" />
          }
          {selection.default.id == choice.id ?
            // IS DEFAULT
            <Text>
              Included
            </Text>
            :
            // IS NOT DEFAULT
            <Text>
              {(choice.price - selection.default.price > 0 ? `+${choice.price - selection.default.price}đ` : `+0đ`)}
            </Text>
          }
        </View>

        {selection.default.amount != 1 &&
          <View>
            <Pressable
              onPress={subtractPress}
            >
              <Text>⊖</Text>
            </Pressable>
            <Text>{itemNumber()}</Text>
            <Pressable onPress={replaceChoice}>
              <Text>⊕</Text>
            </Pressable>
          </View>

        }
      </View>

    </Pressable>
  )
}

export default DrinkChoice