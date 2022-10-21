import React, { useEffect, useState } from 'react'
import { Modal, TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark'
import axios from 'axios';

export function PictureModal({ modal, setModal, pictureData }: any) {
  const FLICKR_API_KEY = '5d1b29b5a9c367dfcbe7ac194e9bee83'
  const EXIF_BASE_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1`;
  const INFO_BASE_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1`;

  const [ exifData, setExifData ] = useState([]);
  const [ infoData, setInfoData ] = useState<any>({});

  function closeModal() {
    setModal(false)
    setExifData([]);
    setInfoData({});
  }

  useEffect(() => {
    if (pictureData.id) {
      axios.get(`${EXIF_BASE_URL}&photo_id=${pictureData.id}`)
      .then((res) => {
        if (res.data.code) {
          setExifData([]);
        } else {
          setExifData(res.data.photo.exif)
        }
      })

      axios.get(`${INFO_BASE_URL}&photo_id=${pictureData.id}`)
      .then((res) => {
        setInfoData({
          'title': res.data.photo.title._content,
          'username': res.data.photo.owner.username,
          'date': res.data.photo.dates.taken,
        })
      })
    }
  }, [pictureData]);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modal}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View style={styles.container}>
          <View style={styles.pictureContainer}>
            <Image
              style={styles.picture}
              source={{uri: pictureData.url}}
            />
            <TouchableOpacity style={styles.icon} onPress={() => closeModal()}>
              <FontAwesomeIcon icon={faCircleXmark} style={styles.icon} size={30} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={exifData}
            keyExtractor={(_item, index) => index.toString()}
            style={{height: '100%'}}
            renderItem={({ item }: any) =>
              <Text style={{color: '#fff', marginLeft: 15}}>
                {item.label}: {item.raw._content}
              </Text>
            }
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 15}}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: '700', opacity: 0.9}}>Exif data is restricted by author</Text>
              </View>
            )}
            ListHeaderComponent={() => (
              <>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}onPress={() => {}}>
                  <View style={styles.button}>
                    <Text style={styles.buttonTitle}>Overlay</Text>
                  </View>
                </TouchableOpacity>
                
                <Text style={{color: '#fff', marginHorizontal: 15, marginTop: 15, fontSize: 25, fontWeight: '700'}}>
                  {infoData.title}
                </Text>
                <Text style={{color: '#fff', marginLeft: 15, marginTop: 5, fontSize: 15, fontWeight: '500', marginBottom: 15}}>@{infoData.username}</Text>
              </>
            )}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    paddingBottom: 40, 
    position: 'relative'
  },
  picture: {
    width: "100%", 
    height: "100%", 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16
  },
  input: {
    flex: 1,
    fontSize: 15
  },
  icon: {
    zIndex: 1,
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fff',
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
  pictureContainer: {
    width: "100%",
    height: "40%",
    // borderTopEndRadius: 16,
    justifyContent: 'center',
    backgroundColor: '#000',
    marginBottom: 15
  },
  infoText: {
    color: '#fff',
    margin: 15,
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(93, 95, 222)',
    borderRadius: 8,
    height: 48,
    width: '95%',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
});