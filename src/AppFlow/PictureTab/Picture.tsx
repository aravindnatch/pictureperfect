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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCameraRotate, faBolt, faRobot, faPerson } from '@fortawesome/free-solid-svg-icons';

export function Picture() {
  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(false);
  const devices = useCameraDevices()
  const device = devices.front
  const ViroScene = useRef<any>(null);
  const ViroPlaneSelector = useRef<any>(null);
  const DRef = useRef<any>(null);

  const [flip, setFlip] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setActive(true)
      return () => {
        setActive(false);
        if (ViroScene.current !== null) {
          ViroScene.current._resetARSession(true, true);
          ViroPlaneSelector.current.reset();
        }
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
          <ViroARPlaneSelector ref={ViroPlaneSelector} minHeight={0.5} minWidth={0.5}>
          <ViroSpinner type="light" position={[0, 0, 0]} visible={loading} scale={[0.1, 0.1, 0.1]}/>
          <Viro3DObject
            source={require("./assets/man.obj")}
            highAccuracyEvents={true}
            position={[0, 0, 0]}
            scale={[0.9, 0.9, 0.9]}
            style={{ opacity: 0.5 }}
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

  if (flip) {
    return (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
        />

        <View style={styles.settingsContainer}>
          <TouchableOpacity onPress={() => {setFlip(!flip)}}>
            <FontAwesomeIcon icon={ faCameraRotate } size={30} style={{color: "#fff", marginTop: 10}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon icon={ faBolt } size={30} style={{color: "#fff", marginTop: 20}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon icon={ faRobot } size={30} style={{color: "#fff", marginTop: 20}}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon icon={ faPerson } size={30} style={{color: "#fff", marginTop: 20}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.captureContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={() => {
            ViroScene.current?._takeScreenshot("123", true)
          }}/>
        </View>
      </>
    )
  }

  return (
    <>
      <ViroARSceneNavigator
        ref={ViroScene}
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={{'flex': 1}}
      />

      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => {setFlip(!flip)}}>
          <FontAwesomeIcon icon={ faCameraRotate } size={30} style={{color: "#fff", marginTop: 10}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon icon={ faBolt } size={30} style={{color: "#fff", marginTop: 20}}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon icon={ faPerson } size={30} style={{color: "#fff", marginTop: 20}}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon icon={ faRobot } size={30} style={{color: "#fff", marginTop: 20}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={() => {
          ViroScene.current?._takeScreenshot("123", true)
        }}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  captureContainer: {
    position: 'absolute', 
    left: 0, 
    bottom: 40, 
    width: "100%", 
    alignItems: 'center'
  },
  captureButton: {
    borderColor: '#fff', 
    borderWidth: 10, 
    height: 100, 
    width: 100, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignContent: 'center',
    alignItems: 'center'
  },
  settingsContainer: {
    position: 'absolute', 
    right: 5, 
    top: 50, 
    height: 205,
    width: "15%", 
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#000',
    opacity: 0.4,
  }
})