// import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Dimensions, TextInput, Pressable, Modal } from 'react-native'
import CartOrder from '../stacks/components/CartOrder';
import { useCookies } from 'react-cookie';
import OrderHistory from '../stacks/components/OrderHistory';
import { useAppContext } from '../../context/appContext';

const CartScreen = (props) => {
	const {
		modalVisible,
		// setModalVisible,
		navigation,
		route,
		showHistory,
		setShowHistory,
	} = props
	
	// DISH NEED INITIAL VALUE, DEFINED IN APP INITIALPARAMS
	const {
		dish,
	} = route.params

	const {
		style,
		token,
		customAxios,
	} = useAppContext()	

	// const [token, setToken, removeToken] = useCookies(['kfc'])

	// const [username, setUsername] = useState("")
	// const [password, setPassword] = useState("")

	// Change button
	// const [showRegister, setShowRegister] = useState(false)

	// ALL ITEMS
	const [orders, setOrders] = useState([])

	// NOTE FOR ORDER
	const [note, setNote] = useState('')

	// PROMOTION
	const [promotion, setPromotion] = useState('')

	useEffect(() => {
		// console.log('dish', dish)
		// console.log('cookie:', token['kfc'])
		// getUser()

	}, [token, dish])

	const sendOrder = async () => {
		let body = orders?.map(order => {
			return (
				{
					// orderId: order.id,
					// dish: order.categoryDish.id, 
					// amount: order.amount,
					order: order,
					// price: order.price,
					promotion: promotion,
				}
			)
		})
		let a = { orders: orders, orderDetails: body }

		const url = `order/`
		const { data } = await customAxios.post(url, { data: a }, {
			headers: {
				Authorization: `Token ${token}`
			}
		})
		setOrders([])
	}

	const initializeOrder = () => {
		let check = orders.find(e => e.id == dish.id)
		if (dish != undefined) {
			if (check === undefined) {
				setOrders([...orders, dish])
			}
			else {
				let index = orders.indexOf(check)
				let copyArray = JSON.parse(JSON.stringify(orders))
				try { copyArray.splice(index, 1, dish) }
				finally { setOrders(copyArray) }
			}
		}
	}

	useEffect(() => {
		initializeOrder()
	}, [dish])

	// useEffect(() => {
	// 	console.log(`orders:`, orders)
	// }, [orders])

	function priceSum() {
		let priceSum = 0
		try {
			orders?.map(order => {
				return priceSum += order.price * order.amount
			}
			)
		}
		finally {
			return priceSum
		}
	}

	// HAVE NOT LOGIN
	if (modalVisible) {
		return (
			<ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>

				<Pressable
					onPress={() => {
						navigation.navigate('Settings')
					}}
					style={{
						width: '50%',
						backgroundColor: 'chartreuse',
						fontWeight: 'bold',
						textTransform: 'uppercase',
						textAlign: 'center',
						paddingBottom: 10,
						paddingTop: 10,
						borderRadius: 6,
					}}
				>
					<Text style={{
						fontSize: 16,
						fontWeight: 500,
					}}>LOGIN FIRST</Text>
				</Pressable>

			</ScrollView>
		)
	}
	// HAVE NOT ORDER ANYTHING
	else if (orders.length == 0) {
		return (
			<ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>
				<OrderHistory
					showHistory={showHistory}
					setShowHistory={setShowHistory}
				/>
				<Text style={{
				}}>
					Your Cart is empty?
				</Text>
				<Text>Making order to enjoy KFC special secret recipes</Text>
				<Pressable
					style={{
						width: '50%',
						backgroundColor: 'green',
						color: 'rgb(232, 230, 227) !important',
						fontWeight: 'bold',
						textTransform: 'uppercase',
						textAlign: 'center',
						paddingBottom: 15,
						paddingTop: 15,
						borderRadius: 8,
						marginTop: 20,
					}}
					onPress={() => {
						navigation.navigate('Main')
					}}
				>
					<Text style={{ color: 'chartreuse' }}>ORDER NOW</Text>
				</Pressable>

				<Pressable
					style={{
						width: '100%',
						backgroundColor: 'green',
						color: 'rgb(232, 230, 227) !important',
						fontWeight: 'bold',
						textTransform: 'uppercase',
						textAlign: 'center',
						paddingBottom: 15,
						paddingTop: 15,
						borderRadius: 8,
						position: 'fixed',
						bottom: 0,
					}}
					onPress={() => {
						setShowHistory(true)
					}}
				>
					<Text style={{ color: 'chartreuse' }}>ORDER HISTORY</Text>
				</Pressable>
			</ScrollView>
		)
	}
	// Ordered
	else {
		return (
			<ScrollView style={style.homeContainer} showsVerticalScrollIndicator={false}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={showHistory}
					onRequestClose={() => {
						setShowHistory(!showHistory)
					}}
				>
					<OrderHistory
						showHistory={showHistory}
						setShowHistory={setShowHistory}
					/>
				</Modal>

				<Text style={{
					backgroundColor: 'rgb(182, 0, 34)',
					color: 'rgb(232, 230, 227) !important',
					fontWeight: 'bold',
					textTransform: 'uppercase',
					textAlign: 'center',
					width: '100%',
					paddingBottom: 15,
					paddingTop: 15,
					borderRadius: 8,
				}}>PROCEED TO PAYMENT</Text>

				{orders?.map((order) => {
					return (
						<CartOrder key={order.id}
							order={order}
							orders={orders}
							setOrders={setOrders}
						/>
					)
				})}

				<TextInput style={{
					width: windowWidth,
					minHeight: 50,
					marginBottom: 20,
					backgroundColor: '#d0d5db',
				}}
					placeholder='Notes for your order' value={note} onChangeText={setNote}
				/>

				<View style={{ width: '100%' }}>

					<View style={{
						flexDirection: 'row',
					}}
					>
						<Text style={{
							flexGrow: 1,
							fontWeight: 600,
						}}>{orders.length} Items</Text>

						<Text style={{
							fontSize: 20,
							fontFamily: "National2",
							lineHeight: 1.5,
							fontWeight: 600,
							alignSelf: 'center',
						}}>{priceSum()}</Text>
					</View>

					<View style={{
						flexDirection: 'row',
						paddingBottom: 20,
						alignItems: 'center',
					}}>
						<View style={{
							flexGrow: 1,
							minHeight: 50,
						}}>
							<TextInput style={{
								width: '100%',
								minHeight: 50,
								backgroundColor: '#d0d5db',
							}}
								value={promotion} onChangeText={setPromotion} placeholder='Enter promotion code' />
						</View>

						<Pressable style={{
							borderWidth: 1,
							borderColor: 'gray',
							height: 50,
							alignSelf: 'center',
							flexDirection: 'column',
							justifyContent: 'center',
						}}>
							<Text style={{
								padding: 5,
								fontSize: 18,
								fontFamily: "National2",
								lineHeight: 1.5,
								fontWeight: 600,
							}}>
								APPLY CODE
							</Text>
						</Pressable>
					</View>

					<View style={{
						flexDirection: 'row',
						paddingBottom: 20,
					}}>
						<Text style={{
							flexGrow: 1,
							fontSize: 18,
							fontFamily: "National2",
							lineHeight: 1.5,
							fontWeight: 600,
						}}>
							SUBTOTAL
						</Text>

						<Text style={{
							fontSize: 18,
							fontFamily: "National2",
							lineHeight: 1.5,
							fontWeight: 600,
							color: 'red',
						}}>{priceSum()}</Text>
					</View>

					<View style={{
						position: 'fixed',
						bottom: 0,
						width: '100%',
					}}>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}>
							<Pressable
								onPress={() => {
									navigation.navigate('Main')
								}}
								style={{
									width: '49%',
									paddingBottom: 15,
									paddingTop: 15,
									borderRadius: 8,
									backgroundColor: 'rgb(182, 0, 34)',
								}}
							>
								<Text style={{
									color: 'rgb(232, 230, 227) !important',
									fontWeight: 'bold',
									textTransform: 'uppercase',
									textAlign: 'center',
								}}>CONTINUE ORDERING</Text>
							</Pressable>

							<Pressable onPress={sendOrder}
								style={{
									width: '49%',
									paddingBottom: 15,
									paddingTop: 15,
									borderRadius: 8,
									backgroundColor: 'rgb(182, 0, 34)',
								}}
							>
								<Text style={{
									color: 'rgb(232, 230, 227) !important',
									fontWeight: 'bold',
									textTransform: 'uppercase',
									textAlign: 'center',
								}}>SEND ORDER</Text>
							</Pressable>

						</View>

						<Pressable onPress={() => {
							setShowHistory(true)
						}}>
							<Text style={{
								// width: '100%',
								backgroundColor: 'green',
								color: 'rgb(232, 230, 227) !important',
								fontWeight: 'bold',
								textTransform: 'uppercase',
								textAlign: 'center',
								paddingBottom: 15,
								paddingTop: 15,
								borderRadius: 8,
								marginTop: 5,
							}}>
								ORDER HISTORY
							</Text>
						</Pressable>

					</View>

				</View>



			</ScrollView>
		)
	}

}

export default CartScreen

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	centeredView: {
	},
	modalView: {
		// margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		// padding: '100%',
		height: '100%',
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 20
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		width: '95%',
		borderRadius: 5,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		width: '100%',
		paddingTop: 20,
		paddingLeft: 7,
		paddingRight: 7,
	},
	modalInnerText: {
		fontWeight: 'bold',
		fontSize: 14,
		flexGrow: 1,
		textAlign: 'left',
	},
	modalChoosingText: {
		color: 'green',
		fontWeight: 'bold',
		fontSize: 14,
	},
});

