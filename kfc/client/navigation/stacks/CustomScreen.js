import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
// import style from '../Style'
import { EvilIcons } from '@expo/vector-icons';
import CustomChoices from './components/CustomChoices'
import ImageSlider from './components/ImageSlider'
// import { useCookies } from 'react-cookie';
import { useAppContext } from '../../context/appContext';
import { Wrapper } from '../../assets/wrappers/ImageSlider';

// Width and height of device
// const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
// const windowHeight = Dimensions.get('window').height 

export const CustomScreenContext = React.createContext()
const CustomScreen = ({navigation, route}) => {
	const {style, changeImagePath}=useAppContext()

	const {
		images,
		categoryDish, 
		dishItems,
	} = route.params

	// ARRAY OF DISH IMAGES
	const [imageArray, setImageArray] = useState([])

	// NUMBER OR DISHES
	const [orderTotal, setOrderTotal] = useState(1)

	const [itemsChosen, setItemsChosen] = useState([])

	const [price, setPrice] = useState(0)

	// const [token, setToken] = useCookies(['kfc'])

	// IMAGE ARRAY
	useEffect(() => {
		// CHANGE IMAGES OBJECT ARRAY TO ARRAY
		// console.log('custom dishItem', dishItems)
		let imgArray = images.map((image) => changeImagePath(image.image_url))
		setImageArray(imgArray)
		// console.log(`singleItems`, dishItems.singleItems)
	}, [images])

	// SET itemsChosen
	useEffect(()=>{
		// Cannot setState inside map
		let selectionsDefault = dishItems.selections?.map((selection) => {
		return selection.default
		})

		let singleItemDefault = dishItems.singleItems
		// console.log('singleItemDefault', singleItemDefault)
		
		try {
		let c = selectionsDefault?.find(element => element.amount > 1)
		if (c !== undefined) {
			for (let i = 0; i < c.amount - 1 ; i += 1) {
			selectionsDefault.push(c)
			}
		}
		}
		finally {
		// console.log(`selectionsDefault`, selectionsDefault)
		setItemsChosen([...selectionsDefault.sort(), ...singleItemDefault])  
		}
		
	}, [dishItems])

	// SET PRICE
	useEffect(() => {
		let total = categoryDish?.price
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
	}, [itemsChosen, categoryDish])

	function subtractAmount() {
		if (orderTotal > 1) {
		setOrderTotal(orderTotal-1)
	}}

	function addAmount() {setOrderTotal(orderTotal+1)}

	function addToCart() {
		navigation.goBack()
		navigation.navigate('Cart', {
			dish: {
				id: Date.now(), // use time for key, because we can order a dish two times
				// dishId: categoryDish.id,
				// name: categoryDish.name,
				categoryDish: categoryDish,
				itemsChosen: itemsChosen,
				dishItems: dishItems,
				images: images,
				price: price, //one set only
				amount: orderTotal,
			},
		})
	}
	
	return (
		<CustomScreenContext.Provider
			value={{setItemsChosen, itemsChosen}}
		>
			{/* {console.log(`itemsChosen`, itemsChosen)} */}
			<ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>

				{/* ORDER AND COST */}
				<View style={style.orderTotal}>
					<Wrapper>
						<ImageSlider imageArray={imageArray} />
					</Wrapper>

					{/* DASHBOARD */}
					<View>
						<Text style={style.customName}>{orderTotal}X {categoryDish.name.toUpperCase()}</Text>
						
						{/* CHOSEN ITEM LIST */}
						<View>
						{itemsChosen.map((element, index) => {
							return (
							<View key={index}
								style={{
									flexDirection:'row',
								}}
							>
								<Text style={{flexGrow:1}}>・{element.name}</Text>
								<Text>+{element.due||0} đ</Text>
							</View>

							)
						})}
						</View>
						
						<View style={{flexDirection:'row'}}>
							<View style={{
								flexDirection:'row',
								flexGrow: 1,
							}}>
								<Pressable onPress={subtractAmount}>
									<Text style={{
											transform: 'scale(1.5)',
									}}>⊖</Text>
								</Pressable>
								<TextInput value={orderTotal} onChangeText={setOrderTotal}
									style={{
											width:30,
											fontSize: 18,
											paddingLeft: 5,
											paddingRight: 5,
										}}
								/>
								<Pressable onPress={addAmount}>
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
							}}>{orderTotal * price}</Text>
						</View>

					</View>

					<View>
						<View style={{flexDirection:'row',paddingTop: 10,}}>
							<Text 
								style={{
									flexGrow:1,
									fontSize: 18,
									fontFamily: "National2",
									lineHeight: 1.5,
									fontWeight: 600,
								}}
							>
								ORDER TOTAL
							</Text>
							<Text style={{
									fontSize: 18,
									fontFamily: "National2",
									lineHeight: 1.5,
									fontWeight: 600,
									color: 'red',
							}}>{orderTotal * price}</Text>
						</View>

						<View>
							<Pressable style={style.customBtn} 
								onPress={addToCart}
							>
								<Text style={{color:'green', textAlign:'center', borderRadius:5}}>
									ADD TO CART
								</Text>
							</Pressable>

							<Pressable style={style.customBtn}
								onPress={() => {
									navigation.goBack()
								}}
							>
								<Text style={{color:'green', textAlign:'center', borderRadius:5}}>
									BACK TO MENU
								</Text>
							</Pressable>
						</View>
					</View>
				</View>

				<View>
					<View>
						<Text>{categoryDish.name}</Text>

						{/* SELECT NON-DRINK ITEMS FIRST */}
						{dishItems.selections?.map((selection, index) => { 
							if (selection.default.category__field !== 'singleItems-desserts-drinks') {
								return (
									<View key={index}>
										<Text>SELECT 1 IN OPTIONS BELOW</Text>
										<CustomChoices selection={selection}
											itemsChosen={itemsChosen}
											setItemsChosen={setItemsChosen} 
										/>
									</View>
								) 
							}
						})}

						{/* SINGLE ITEMS */}
						{dishItems.singleItems?.map(singleItem => {
							return (
								<View key={singleItem.id}
									style={{
										flexDirection:'row',
									}}
								>
									<EvilIcons name="check" size={24} color="green" />
									<Text>{singleItem.name}</Text>
								</View>
							)
						})}

						{/* DINK SELECTION */}
						<View>
							<Text>UP SIZE DESSERTS DRINKS</Text>
							{dishItems.selections?.map((selection, index) => {  
								if (selection.default.category__field === 'singleItems-desserts-drinks') {
									return (
										<CustomChoices key={index} selection={selection}
											itemsChosen={itemsChosen}
											setItemsChosen={setItemsChosen}
										/>
									) 
								}
							})}
						</View>
					</View>

				</View>

			</ScrollView>

		</CustomScreenContext.Provider>
	)
}

export default CustomScreen