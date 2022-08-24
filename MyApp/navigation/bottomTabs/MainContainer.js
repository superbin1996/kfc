import React, {useState, useEffect} from "react";
import { View, Image, ScrollView, Dimensions, Text, StyleSheet, Pressable, } from "react-native";
import HomeScreen from "../stacks/HomeScreen";
import DealsScreen from "../stacks/DealsScreen";
import ComboScreen from "../stacks/ComboScreen";
import CustomScreen from '../stacks/CustomScreen'
import CartEditOrder from "../stacks/CartEditOrder";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { CookiesProvider } from "react-cookie";

// Width and height of device
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Stack = createNativeStackNavigator();

function MyStack() {

  return (
    // <CookiesProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Deals" component={DealsScreen} />
        <Stack.Screen name="Combo" component={ComboScreen} />
        <Stack.Screen name="Custom" component={CustomScreen} />
        <Stack.Screen name="EditCart" component={CartEditOrder} />
      </Stack.Navigator>
    // </CookiesProvider>      
  );
}

export default MyStack