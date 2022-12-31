import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Dimensions } from "react-native-web";
import { AntDesign } from '@expo/vector-icons';
// import style from "../Style";
import { useAppContext } from "../../../context/appContext";

const App = (props) => {
  const { style } = useAppContext()
  const {
    modalVisible,
    setModalVisible,
  } = props

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        //Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      {/* <View style={styles.centeredView}> */}
      <View style={styles.modalView}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
          width: '100%',
          padding: 20,
        }}>
          <Text style={{
            width: '60%',
            fontWeight: 'bold',
            fontSize: 24,
            fontWeight: 600,
            backgroundColor: 'lightblue',
            textAlign: 'center',
          }}>
            CHOOSE 1 IN 3 OPTIONS BELOW
          </Text>
          <Pressable
            style={{
              position: 'absolute',
              right: 15,
              top: 10,
            }}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}
          >
            <Text style={{
              fontSize: 24,
              fontWeight: 500,
            }}
            >
              ⓧ
            </Text>
          </Pressable>
        </View>

        <View style={styles.modalText}>
          <Text style={styles.modalInnerText}>1 Miếng gà Giòn Cay</Text>
          <AntDesign name="checkcircleo" size={22} color="green" />
          <Text style={styles.modalChoosingText}>
            Choosing
          </Text>
        </View>

        <View style={styles.modalText}>
          <Text style={styles.modalInnerText}>1 Miếng Gà Giòn Không Cay</Text>
          <AntDesign name="checkcircleo" size={22} color="green" />
          <Text style={styles.modalChoosingText}>
            Choosing
          </Text>
        </View>

        <View style={styles.modalText}>
          <Text style={styles.modalInnerText}>1 Miếng Gà Giòn Truyền Thống</Text>
          <AntDesign name="checkcircleo" size={22} color="green" />
          <Text style={styles.modalChoosingText}>
            Choosing
          </Text>
        </View>

        <Pressable
          style={[styles.button, styles.buttonClose, { position: 'absolute', bottom: 0 }]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Confirm</Text>
        </Pressable>
      </View>
      {/* </View> */}
    </Modal>
  );
};

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

export default App;