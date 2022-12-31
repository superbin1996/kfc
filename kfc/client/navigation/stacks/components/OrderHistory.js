import React, {useState, useEffect} from "react";
import { View, ScrollView, Dimensions, Text, StyleSheet, Pressable, Modal} from "react-native";
import { useAppContext } from "../../../context/appContext";

const OrderHistory = (props) => {
  const {
    showHistory,
    setShowHistory,
    // modalVisible,
  } = props
  
  const { style, customAxios, token } = useAppContext()
  
  // const navigation = useNavigation()

  // const [token, setToken, removeToken] = useCookies(['kfc'])

  const [allOrders, setAllOrders] = useState([])
  
  function getOrderHistory() {
    const uri = `order/`
    customAxios(uri, {
			headers: {
				Authorization: `Token ${token}`
			}
		})
    .then(response=>response.data)
    .then((data)=>{
      setAllOrders(data)
      console.log(`allOrders:`, data)
    })
  }

  useEffect(()=>{
    // GET ORDER HISTORY

    if (showHistory) {
      getOrderHistory()
    }
  }, [showHistory])



  	function priceSum(orders) {
      let priceSum = 0
      try {
        orders?.map(order => {
          return priceSum += order.price * order.amount
        }
      )}
      finally {
        return priceSum
      }
    }
  
  if (allOrders.length == 0) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHistory}
        onRequestClose={() => {
          setShowHistory(!showHistory)
        }}
      >
        <View>
          <ScrollView showsVerticalScrollIndicator={false}
            style={style.homeContainer} 
          >
            <Text>You have not ordered anything</Text>

            <Pressable onPress={()=>{
                setShowHistory(!showHistory)
              }}
              style={{
                width: windowWidth/2,
                backgroundColor: 'green',
                color: 'rgb(232, 230, 227) !important',
                fontWeight: 'bold',
                textTransform:'uppercase',
                textAlign:'center',
                paddingBottom: 15,
                paddingTop: 15,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text>
                Close Modal
              </Text>
            </Pressable>

          </ScrollView>
        </View>
      </Modal>
    )
  }
  else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHistory}
        onRequestClose={() => {
          setShowHistory(!showHistory)
        }}
      >
        <View style={styles.modalView}>

          <ScrollView showsVerticalScrollIndicator={false}
            style={[style.homeContainer, {flexGrow:1}]} 
          >
            {allOrders?.map((element, index) => {
              return (
                <View key={index}
                  style={{
                    borderColor: 'red',
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    paddingBottom:20,
                  }}
                >
                  <View>
                    {element.orders.map(order => {
                      return (
                        <View key={order.id}
                          style={{
                            // borderColor: 'green',
                            // borderWidth: 1,
                            paddingBottom: 5,
                          }}
                        >
                          <Text style={{
                            flexGrow: 1,
                            // color: '#000',
                            fontWeight: 600,
                            fontFamily: 'National2Condensed',
                            textTransform: 'uppercase',
                            fontSize: 26,
                            marginBottom: 10,
                          }}>
                            {order?.categoryDish?.name.toUpperCase()}
                          </Text>
                    
                          <View>
                            {order.itemsChosen?.map((item, index) => {
                              return (
                                <Text key={index}>・{item.name}</Text>	
                              )
                            })}
                          </View>
                    
                          <View style={{flexDirection:'row'}}>
                            <Text style={{flexGrow:1}}>{element.orders.length} Items</Text>
                            <Text>{order.amount * order.price}</Text>
                          </View>
                        </View>
                      )
                    })}
                  </View>
            
                  <View style={{flexDirection: 'row', paddingTop:20}}>
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
                    }}>
                      {priceSum(element.orders)}
                    </Text>
                  </View>
          
                </View>
              )
            })}
          </ScrollView>
        
          <Pressable
            onPress={() => {
              setShowHistory(!showHistory)
            }}
            style={{
              width: '100%',
              backgroundColor: 'green',
              paddingBottom: 15,
              paddingTop: 15,
              borderRadius: 8,
              marginTop: 5,
              textAlign:'center',
              // position: 'fixed',
              // bottom: 0,
            }}
          >
            <Text style={{
              // width: '100%',
              color: 'rgb(232, 230, 227) !important',
              fontWeight: 'bold',
              textTransform:'uppercase',
            }}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </Modal>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  centeredView: {
  },
  modalView: {
    paddingLeft: windowWidth>1000?(windowWidth-1000)/2:5,
    paddingRight: windowWidth>1000?(windowWidth-1000)/2:5,
    height: windowHeight,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

export default OrderHistory;