import React from "react";
import { View, Image, Text, Pressable, } from "react-native";
import { EvilIcons } from '@expo/vector-icons';

const CustomChoice = (props) => {
  const {style, changeImagePath,} =useAppContext()
  const {
    selection,
    choice,
    chosen,
    // setChosen,
    itemsChosen,
    setItemsChosen,
  } = props

  function imagePath() {
    return changeImagePath(choice.image__image)
  }

  function replaceChoice() {
    console.log(choice.selectionId)
    let newItemsChosen = JSON.parse(JSON.stringify(itemsChosen))
    let otherSelections = newItemsChosen?.filter(element => element.selectionId != choice.selectionId)
    let changedSelection = newItemsChosen?.filter(element => element.selectionId == choice.selectionId)
    try{
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
      let a  = newItemsChosen?.find(element => JSON.stringify(element) == JSON.stringify(choice))
      console.log(`choice`, choice)
      let b = newItemsChosen.indexOf(a)
      try{
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
    <View style={style.dishContainer}>
      {choice.image__image ?
        // THERE IS IMAGE
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
            <Text numberOfLines={1}
              style={{
                width: '100%',
                maxHeight:18,
                fontSize: 14,
              }}
            >
                {choice.name}
            </Text>
            <View style={{flexDirection:'row'}}>
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
              <View style={{flexDirection:'row',}}>
                <Pressable 
                  onPress={subtractPress}
                >
                  <Text>⊖</Text>
                </Pressable>
                <Text style={{marginLeft:5,marginRight:5}}>{itemNumber()}</Text>
                <Pressable onPress={replaceChoice}>
                  <Text>⊕</Text>
                </Pressable>
              </View>

            }
          </View>

        </Pressable>
      :
        // THERE ARE NOT IMAGES
        <Pressable
          onPress={replaceChoice}
          style={{flexDirection:'row'}}
        >
          {chosen.includes(choice.id) ?
            <EvilIcons name="check" size={24} color="green" />
          :
            <EvilIcons name="check" size={24} color="black" />
          }

          <Text numberOfLines={3}>{choice.name}</Text>
        </Pressable>
      }
      
    </View>
  )
  

}

export default CustomChoice