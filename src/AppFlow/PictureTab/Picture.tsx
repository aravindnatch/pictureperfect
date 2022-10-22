import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet } from "react-native";
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroSpinner,
  Viro3DObject,
  ViroARPlaneSelector,
} from "@viro-community/react-viro";
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Picture() {
  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(false);
  const devices = useCameraDevices()
  const device = devices.front

  const viroNav = useRef<any>();
  
  useEffect(() => {
    function plswork() {
      console.log(viroNav.current?._takeScreenshot("123", true))
    }

    setTimeout(() => {
      plswork();
    }, 5000)
  }, [])

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
        Camera.requestCameraPermission()
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
            onClick={() => {
              viroNav.current?._takeScreenshot("123", true)
            }}
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
    <>
    <ViroARSceneNavigator
      ref={viroNav}
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={{'flex': 1}}
    />
    <View style={styles.captureContainer}>
      <TouchableOpacity style={styles.captureButton} onPress={() => {
        viroNav.current?._takeScreenshot("123", true)
      }}>
        <Text style={{color: "#fff"}}>Capture</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  captureContainer: {
    position: 'absolute', 
    left: 0, 
    bottom: 20, 
    width: "100%", 
    alignItems: 'center'
  },
  captureButton: {
    borderColor: '#fff', 
    borderWidth: 2, 
    height: 80, 
    width: 80, 
    borderRadius: 40, 
    justifyContent: 'center', 
    alignContent: 'center',
    alignItems: 'center'
  }
})