import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Modal, TouchableOpacity, View, Text,TextInput, Button, Keyboard,SectionList, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import axios from 'axios';

export function SearchModal({ modal, setModal }: any) {
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
          <View style={[styles.searchSection, {backgroundColor: 'rgb(18, 18, 18)'}]}>
            {/* <MaterialCommunityIcons name="magnify" size={20} style={[styles.searchIcon, {
              color: '#E5E5E7'
            }]}/> */}
            <TextInput
              style={[styles.input, {
                color: '#E5E5E7'
              }]}
              // onChangeText={onChangeSearch}
              // value={search}
              placeholder="Name, @username"
              keyboardType="visible-password"
              autoCorrect={false}
              autoCapitalize='none'
            />
            <Button title="Done" onPress={() => {
              setModal(!modal);
            } }/>
          </View>
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
});