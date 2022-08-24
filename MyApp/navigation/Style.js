import { StyleSheet, Dimensions } from 'react-native'

// Width and height of device
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const style = StyleSheet.create({
  // HomeScreen
  homeContainer: {
    width: windowWidth > 1000 ? 1000 : windowWidth,
    // maxWidth: 1000,
    // paddingLeft: windowWidth > 1000 ? (windowWidth - 1000)/2 : 5,
    paddingLeft:  windowWidth > 1000 ? 'auto' : 5,
    // paddingRight: windowWidth > 1000 ? (windowWidth - 1000)/2 : 5,
    paddingRight: windowWidth > 1000 ? 'auto' : 5,
    paddingTop: 5,
    height: windowHeight - 100,
    marginTop: 10, 
    marginLeft: 'auto',
    marginRight: 'auto',
    borderColor: 'green',
    borderWidth: 3,
    minHeight: windowHeight - 100,
    height: 'auto',
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
  },
  homeCategories: {
    flexDirection: 'row',
    borderColor: 'violet',
    borderWidth: 2,
    justifyContent: "space-around",
    marginTop: 10,
  }, 
  homeCategory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    width: 0.2 * windowWidth,
    maxWidth: 200,
    height: 0.1 * windowWidth,
    maxHeight: 200,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 10,
  },
  homeCategoryChosen: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    borderWidth: 2, 
    borderRadius: 8, 
    width: 0.2 * windowWidth, 
    height: 0.1 * windowWidth, 
    borderColor: 'orange',
  },
  homeSingleItemCategory: {
    width: 0.2 * windowWidth,
    maxWidth: 200,
    height: 0.2 * windowWidth,
    maxHeight: 200,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 10,
  },
  homeSingleItemCategoryChosen: {
    borderWidth: 2, 
    borderRadius: 8, 
    width: 0.2 * windowWidth, 
    height: 0.2 * windowWidth, 
    borderColor: 'orange',
  },
  homeFoodListCover: {
    // textAlign:'center',
    marginTop: 10,
  },
  homeFoodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: 'Crimson',
    // justifyContent: 'flex-start',
    // justifyContent: 'space-around',
    justifyContent: 'center',
  },
  dishContainer: {
    borderColor: 'green',
    borderWidth: 1,
    width: 0.32*windowWidth,
    height: 'fit-content',
    paddingLeft: windowWidth > 1000 ? '2.5%' : 0.033*windowWidth,
    paddingRight: windowWidth > 1000 ? '2.5%' : 0.033*windowWidth,
    maxWidth: 240,
    flexDirection: 'column',
    flexGrow: 1,
    marginBottom: 20,
  },
  dishName: {
    borderWidth: 1,
    borderColor: 'chartreuse',
    // height: windowWidth > 1000 ? '2%' : 0.16*windowWidth,
    overflow: 'hidden',
    wordWrap: 'break-word',
    hyphens: 'auto',
    width: '100%',
    height:18,
    fontSize: 14,
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // whiteSpace:'wrap',
  },
  dishImageContainer: {
    width: '100%',
    height: windowWidth > 1000 ? 0.07*windowWidth : 0.25*windowWidth,
  },
  DishImage: {
    flexGrow: 1,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    marginRight:10,
    resizeMode: 'stretch',
    minHeight: 50,
    width: '100%',
    height: '100%',
  },
  dishInfo: {
    borderColor: 'red',
    borderWidth: 1,
    // minHeight: windowWidth > 1000 ? '80%' : 0.35*windowWidth,
  },
  dishInfoHide: {
    borderWidth: 1,
    borderColor: 'yellowBlanchedAlmond',
    height: windowWidth > 1000 ? 0.04*windowWidth : 0.15*windowWidth,
    overflow: 'hidden',
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    hyphens: 'auto',
  },
  dishInfoShow: {
    borderWidth: 1,
    borderColor: 'yellowBlanchedAlmond',
    minHeight: windowWidth > 1000 ? 0.04*windowWidth : 0.15*windowWidth,
  },
  customBtn: {
    marginTop: 8,
    alignSelf:'center',
    width: '70%',
    height: 25,
    borderWidth: 2,
    borderColor: 'rgba(var(--b6a, 219, 219, 219), 1)',
  },
  // CUSTOM SCREEN
  customOrder: {
    width: '100%',
  },
  customName: {
    fontStyle: 'italic',
    fontSize: '1.333333333333333em',
    color: 'rgb(232, 230, 227)',  
    fontWeight: 'bold',
    wordWrap: 'break-word',
  },
  customList: {
    
  },
  // DEALS SCREEN
  dealImageContainer: {
    width: windowWidth,
    height: 0.45*windowWidth,
  },
  dealImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  }
})

export default style