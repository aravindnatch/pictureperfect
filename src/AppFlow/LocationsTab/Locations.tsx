import React, {  PureComponent, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl, Image } from "react-native";
import { LocationsStackParamProps } from './LocationsParamList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import axios from 'axios';

import { SearchModal } from './components/SearchModal';
import { PictureModal } from './components/PictureModal';

export function Locations({ navigation }: LocationsStackParamProps<"Locations">) {
  const FLICKR_API_KEY = '5d1b29b5a9c367dfcbe7ac194e9bee83'
  const BASE_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}`;
  
  const [ location, setLocation ] = useState('Searching...');
  const [ refresh, setRefresh ] = useState(false);
  const [ pictures, setPictures ] = useState([]);
  const [ searchModal, setSearchModal ] = useState(false);
  const [ pictureModal, setPictureModal ] = useState(false);
  const [ pictureData, setPictureData ] = useState({});

  function getPictures() {
    axios.get(`${BASE_URL}&lat=33.7724995&lon=-84.3968859&format=json&nojsoncallback=1&per_page=40&content_type=1&safe_search=1&text=pencil+building`)
    .then((res) => {
      const dataArray = res.data.photos.photo;
      if (dataArray.length > 0) {
        var imageArray = dataArray.map((item: any) => {
          return {
            id: item.id,
            'url': `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
          }
        })
        setPictures(imageArray);
      } else {
        setPictures([]);
      }
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSearchModal(true)}>
          <FontAwesomeIcon icon={ faSearch } size={20} style={{
            marginRight: 16,
            color: '#E5E5E7'
          }}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getPictures();
    setTimeout(() => {
      setLocation('Atlanta, GA');
    }, 1500);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setLocation('Searching...');
    setTimeout(() => {
      getPictures();
      setLocation('Atlanta, GA');
      setRefresh(false);
    }, 1500);
  }, []);

  return (
    <View>
      <SearchModal modal={searchModal} setModal={setSearchModal}/>
      <PictureModal modal={pictureModal} setModal={setPictureModal} pictureData={pictureData} />

      <View style={{height: 16, width: 16}}/>

      <View style={styles.currentLocHeader}>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '700', opacity: 0.9}}>Showing Images For</Text>
        <Text style={{color: '#fff', marginLeft: 'auto', fontSize: 16, opacity: 0.9}}>{location}</Text>
      </View>

      <View style={{height: 16, width: 16}}/>

      <FlatList
        data={pictures}
        numColumns={2}
        keyExtractor={(_item, index) => index.toString()}
        style={{height: '100%', borderRadius: 16}}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
        renderItem={({ item }: any) =>
          <TouchableOpacity style={styles.holder} onPress={() => {
            setPictureModal(true)
            setPictureData({
              url: item.url,
              id: item.id
            })
          }}>
            <View style={styles.picture}>
              <Image
                style={{width: "100%", height: "100%", borderRadius: 16}}
                source={{uri: item.url}}
              />
            </View>
          </TouchableOpacity>
        }
        ListEmptyComponent={() => (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '700', opacity: 0.9}}>No Pictures Found</Text>
          </View>
        )}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  currentLocHeader: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: 'rgb(18, 18, 18)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 34,
    paddingHorizontal: 16,
  },
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