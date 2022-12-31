import React, { useContext, useEffect, useState } from 'react'
import { View} from 'react-native'
// import style from '../../Style'
import CustomChoice from './CustomChoice'
// import { EvilIcons } from '@expo/vector-icons';
import { CustomScreenContext } from '../CustomScreen';
import { useAppContext } from '../../../context/appContext';

const CustomChoices = (props) => {
  const { style } = useAppContext()
  const {
    selection,
  } = props

  const {
    itemsChosen,
    setItemsChosen,
  } = useContext(CustomScreenContext)

  // CHANGE STYLE WHEN CHOSEN
  const [chosen, setChosen] = useState([])

  useEffect(()=>{
    let itemIds = itemsChosen.filter(element => {
      return element.id
    })
    setChosen(itemIds)
  }, [itemsChosen])

  return (
    <View>
      {selection.choices?.map((choice) => {
        return (
          <CustomChoice key={choice.id}
            selection={selection} 
            choice={choice}
            chosen={chosen}
            setChosen={setChosen} />
        )
      })}
    </View>
  )
}

export default CustomChoices