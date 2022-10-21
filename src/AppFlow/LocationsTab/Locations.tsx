import React, {  useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from "react-native";
import { LocationsStackParamProps } from './LocationsParamList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { PictureComponent } from './components/PictureComponent';
import axios from 'axios';

export function Locations({ navigation }: LocationsStackParamProps<"Locations">) {
  const FLICKR_API_KEY = '5d1b29b5a9c367dfcbe7ac194e9bee83'
  const BASE_URL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}`;
  
  const [ location, setLocation ] = useState('Locating...');
  const [ refresh, setRefresh ] = useState(false);
  const [ pictures, setPictures ] = useState([]);
  const [ noPictures, setNoPictures] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <FontAwesomeIcon icon={ faSearch } size={20} style={{
            marginRight: 16,
            color: '#E5E5E7'
          }}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setTimeout(() => {
      setLocation('Atlanta, GA');
    }, 2000);
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}&lat=33.7724995&lon=-84.3968859&format=json&nojsoncallback=1&per_page=20&content_type=1&safe_search=2`)
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
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setLocation('Locating...');
    setTimeout(() => {
      setLocation('Atlanta, GA');
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <View>
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
        style={{height: '100%'}}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
        renderItem={({ item }) =>
          <PictureComponent
            item={item}
          />
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
    backgroundColor: 'rgb(44, 44, 44)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 34,
    paddingHorizontal: 16,
  },
});