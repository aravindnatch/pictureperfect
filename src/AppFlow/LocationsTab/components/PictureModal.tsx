import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Modal, TouchableOpacity, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import axios from 'axios';

export function PictureModal({ modal, setModal, pictureData }: any) {
  // useEffect(() => {
  //   if (searchCall) {
  //     const data = {
  //       "query": search,
  //       "limit": 15
  //     }
  
  //     axios({
  //       method: 'get',
  //       url: `https://api.venmo.com/v1/users`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'device-id': 'aravindn-tcha-4vin-natc-aravindnatch',
  //         'Authorization': `Bearer ${user?.apikey}`
  //       },
  //       params: data
  //     }).then((response) => {
  //       setSearchData(response.data.data)
  //     }).catch((error) => {
  //       console.log(error.response.data);
  //     });
  //   }
  // },[searchCall])

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modal}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModal(!modal);
          // onChangeSearch('');
        }}
      >
        <View 
          style={{
            flex: 1,
            backgroundColor: '#000',
            paddingBottom: 40,
          }}
        >
          <Text style={{color: '#fff'}}>Picture Modal</Text>
        </View>
        <View style={styles.picture}>
          <Image
            style={{width: "100%", height: "100%", borderRadius: 16}}
            source={{uri: pictureData.url}}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15
  },
  searchSection: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 25,
    marginRight: 25,
    marginLeft: 25,
    padding: 5,
    borderRadius: 20,
  },
  searchIcon: {
    padding: 10,
  },
  picture: {
    height: 175,
    width: "90%",
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginBottom: 16,
  }
});