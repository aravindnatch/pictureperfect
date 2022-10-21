import React from 'react'
import { View, Text, StyleSheet, Image } from "react-native";

export function PictureComponent({ item }: any) {
  return (
    <View style={styles.holder}>
      <View style={styles.picture}>
        {/* <Text style={{color: '#000'}}>{item.name}</Text> */}
        <Image
          style={{width: "100%", height: "100%", borderRadius: 16}}
          source={{uri: item.url}}
        ></Image>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  holder: {
    alignItems: 'center',
    // borderColor: 'red', // REMOVE THIS
    // borderWidth: 2, // REMOVE THIS
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
    height: '100%'
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