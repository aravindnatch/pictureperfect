import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text } from "react-native";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroSpinner,
  Viro3DObject,
  ViroARPlaneSelector,
} from "@viro-community/react-viro";

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
      }
    })
  },[])

  const HelloWorldSceneAR = () => {
    const [loading, setLoading] = useState(true);
    return (
      <ViroARScene>
        <ViroARPlaneSelector minHeight={0.5} minWidth={0.5}>
          <ViroSpinner type="light" position={[0, 0, 0]} visible={loading} scale={[0.1, 0.1, 0.1]}/>
          <Viro3DObject
            source={require("./assets/man.obj")}
            highAccuracyEvents={true}
            position={[0, 0, 0]}
            scale={[0.2, 0.2, 0.2]}
            type="OBJ"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  };

  if (device == null || !available) return ( 
    <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
      <Text style={{color: '#fff', textAlign: 'center'}}>This device does not support camera usage</Text>
    </View>
  )

  return (
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={{'flex': 1}}
      />
  )

}