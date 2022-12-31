import React, {useState, useEffect, useRef} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, } from "react-native";
import { useImageSliderWrapperContext} from "../../../assets/wrappers/ImageSlider";
import { useAppContext } from "../../../context/appContext";

const ImageSlider = (props) => {
  const {
    imageArray,
  } = props
  const {changeImagePath} = useAppContext()
  const {style, windowWidth, windowHeight} = useImageSliderWrapperContext()

  
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
    if (currentSlide === imageArray.length - 1) {
      scrollRef.current.scrollTo({ x: 0, animated: true })
    }
    else {
      scrollRef.current.scrollTo({ x: windowWidth * (currentSlide + 1), animated: true })
    }
  }

  function userBeginDrag() {
    clearTimeout(autoPlay)
  }

  function userEndDrag() {
    autoPlay = setTimeout(autoPlay, 5000)
  }

  console.log(windowWidth, windowHeight, style);

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
        {imageArray?.map((image, index) => {
          return (
            <View
              key={ index }
              style={style.imageContainer} 
            >
              <Image 
                source={{ uri: changeImagePath(image) }}
                style={style.image} 
              />
            </View>
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
        {imageArray?.map((image, index)=>{
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


// const windowWidth = Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
// const windowHeight = windowWidth * 0.4

// const style = StyleSheet.create({
//   container: {
//     // height, 
//     maxHheight: 300,
//     borderWidth: 2,
//     borderColor: 'violet',
//   },
//   scroll: {
//     height:'100%',
//     maxHheight:300,
//   },
//   imageContainer: { 
//     width: windowWidth, 
//     height: windowHeight,
//     // maxHeight:300,
//   },
//   image: {
//     // flex: 1,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'stretch',
//   },
//   pagination: {
//     position: 'absolute', 
//     bottom: 0, 
//     flexDirection: 'row',
//     alignSelf: 'center',
//   },
//   dots: {
//     color: 'white',
//     margin: 3,
//     fontSize: windowWidth/30,
//   },
//   dotActive: {
//     color: 'green',
//     margin: 3,
//     fontSize: windowWidth/30,
//   },
// })

export default ImageSlider