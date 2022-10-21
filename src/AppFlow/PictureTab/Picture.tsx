import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, Switch, StyleSheet } from "react-native";
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export function Picture() {
  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(false);
  const devices = useCameraDevices()
  const device = devices.front

  useFocusEffect(
    React.useCallback(() => {
      setActive(true)
      return () => {
        setActive(false);
      };
    }, [])
  );

  useEffect(() => {
    Camera.getCameraPermissionStatus().then((status) => {
      if (status === 'not-determined') {
        Camera.requestCameraPermission().then((status) => {
          console.log(status)
        })
      } else if (status == 'denied') {
        setAvailable(false)
      } else {
        const devices = Camera.getAvailableCameraDevices()
        console.log(devices)
      }
    })
  },[])

  if (device == null || !available) return ( 
    <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{color: '#fff', textAlign: 'center'}}>This device does not support camera usage</Text>
    </View>
  )

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={active}
    />
  )
}