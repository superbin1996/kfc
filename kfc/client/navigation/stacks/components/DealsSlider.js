import React, {useState, useEffect, useRef} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/appContext";

const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
const windowHeight = windowWidth * 0.4

const DealsSlider = (props) => {
  const {changeImagePath} = useAppContext()
  const {
    deals,
  } = props

  const navigation = useNavigation()

  // Dot state
  const [currentSlide, setCurrentSlide] = useState(0)

  // Scroll state
  const scrollRef = useRef()
  // const scrollRef = React.createRef()

  var autoPlay = null

  // useEffect(()=>{
  //   console.log(`scrollRef:`, scrollRef)
  // }, [scrollRef.current])

  // useEffect(()=>{
  //   console.log(`currentSlide:`, currentSlide)
  // }, [currentSlide])

  useEffect(()=>{
    autoPlay = setTimeout(changeSlide, 2000)
    
    // clearTimeout right after setTimeout in infinity useEffect can help
    // function run one time to one time
    // this resolves turbulent-slide-problem after users swipe on their own
    return () => clearTimeout(autoPlay)
  })

  // Change active dot
  function onSlideChange(event) {
    // clearInterval(autoPlay)

    // const slide = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width)
    const slide = Math.round(event.nativeEvent.contentOffset.x / windowWidth)
    // console.log(`slide: ${slide}`)
    // console.log(`contentOffset.x: `, event.nativeEvent.contentOffset.x)
    // console.log(`layoutMeasurement.width:`, event.nativeEvent.layoutMeasurement.width)

    if (currentSlide !== slide) {
      setCurrentSlide(slide)
    }
  }

  function changeSlide() {
    if (currentSlide === deals.length - 1) {
      scrollRef.current.scrollTo({ x: 0, animated: true })
    }
    else {
      scrollRef.current.scrollTo({ x: windowWidth * (currentSlide + 1), animated: true })
    }
  }
  
  // var autoPlay = setTimeout(changeSlide, 2000)

  function userBeginDrag() {
    clearTimeout(autoPlay)
  }

  function userEndDrag() {
    autoPlay = setTimeout(autoPlay, 5000)
  }

  function imagePress(deal) {
    navigation.navigate('Deals', {
      deal,  
    })
  }

  return (
    <View style={style.container}>

      <ScrollView ref = {scrollRef}
        style={style.scroll}
        pagingEnabled
        horizontal 
        showsHorizontalScrollIndicator={false}
        onScroll={onSlideChange}
        scrollEventThrottle={windowWidth}
        onScrollBeginDrag={()=>userBeginDrag()}
        onScrollEndDrag={()=>userEndDrag()}
        overScrollMode={'never'}
      >
        {deals.map((deal) => {
          return (
            <Pressable
              key={ deal.id }
              style={style.imageContainer} 
              onPress={()=>imagePress(deal)}
            >
              <Image 
                source={{ uri: changeImagePath(deal.image_url) }}
                style={style.image} 
              />
            </Pressable>
          )
        })}
      </ScrollView>

      {/* <Text 
        style={{
          position:'absolute',
          bottom:0,
          flexDirection:'row',
          alignSelf: 'start',
          fontSize: 22,
          fontWeight:500,
          color: '#0066ff',
        }}>
          Deals
        </Text> */}
      
      <View
        style={style.pagination}
      >
        {deals.map((image, index)=>{
          return (
            <Text 
              key={index}
              style={index === currentSlide ? style.dotActive : style.dots} 
            >
              ⬤ 
            </Text>
          )
        })}
      </View>

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    // height, 
    maxHheight: 300,
    borderWidth: 2,
    borderColor: 'violet',
    // paddingLeft: '10px', 
    // paddingRight: '10px', 
    // paddingTop: '10px',
  },
  scroll: {
    height:'100%',
    maxHheight:300,
  },
  imageContainer: { 
    width: windowWidth, 
    height: windowHeight,
    // maxHeight:300,
  },
  image: {
    // flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  pagination: {
    position: 'absolute', 
    bottom: 0, 
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dots: {
    color: 'white',
    margin: 3,
    fontSize: windowWidth/30,
  },
  dotActive: {
    color: 'green',
    margin: 3,
    fontSize: windowWidth/30,
  },
})

export default DealsSlider