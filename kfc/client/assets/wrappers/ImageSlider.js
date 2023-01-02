import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth= Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
const windowHeight = windowWidth * 0.4

const initialState = {
	windowWidth,
	windowHeight,
}

const ImageSliderWrapperContext = React.createContext()
const Wrapper = ({ children }) => {

	const [state, setState] = useState(initialState)
	// console.log(state.windowWidth, state.windowHeight);

	function handleWindowSizeChange() {
		const windowWidth1= Dimensions.get('window').width > 1000 ? 1000 : Dimensions.get('window').width
		const windowHeight2 = windowWidth * 0.4
		setState({ ...state, windowWidth: windowWidth1, windowHeight: windowHeight2 })
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, [])

	const style = StyleSheet.create({
		container: {
			// height, 
			maxHheight: 300,
			borderWidth: 2,
			borderColor: 'violet',
		},
		scroll: {
			height: '100%',
			maxHheight: 300,
		},
		imageContainer: {
			width: state.windowWidth,
			// height: state.windowHeight,
			aspectRatio: 2,
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
			fontSize: state.windowWidth / 30,
		},
		dotActive: {
			color: 'green',
			margin: 3,
			fontSize: state.windowWidth / 30,
		},
	})


	return (
		<ImageSliderWrapperContext.Provider
			value={{
				...state,
				style,
			}}
		>
			{children}
		</ImageSliderWrapperContext.Provider>
	)
}

const useImageSliderWrapperContext = () => {
	return (
		useContext(ImageSliderWrapperContext)
	)
}

export { Wrapper, useImageSliderWrapperContext }