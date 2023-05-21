import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import {GENIUS_API_TOKEN, GENIUS_API_PATH} from '@env';
import { uniqBy } from 'lodash';
import {Update_Button, nextAction} from '../../../components/Update_User';
import {getStorage} from '../../../functions/storage';
import {ViewCustom, Title, MainText, FieldInput} from '../styles';
import crashlytics from '@react-native-firebase/crashlytics';

const Music = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      setUser(fetchedUser);
    }).catch((error) => {
      crashlytics().recordError(error)
    });
  }, []);

  useEffect(() => {
    setPage(1);
    setMusics([]);
    if (searchText.length > 0) {
      searchMusics();
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText.length > 0) {
      searchMusics();
    }
  }, [page]);

  const searchMusics = async () => {
    const url = `https://${GENIUS_API_PATH}search?q=${searchText}&page=${page}`;
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        if (
          data.response !== null &&
          data.response.hits.length > 0
        ) {
          setMusics((oldMusics) => uniqBy([...oldMusics, ...data.response.hits], 'result.id'));
          setLoading(false); 
        }
      }
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const updateMusic = async (musicToUpdate) => {
    try {
      const url = `https://${GENIUS_API_PATH}songs/${musicToUpdate.result.id}?text_format=plain&`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });
      const data = await response.json();
      let music = data.response.song
      const updatedUser = {
        ...user,
        music: {
          id: music.id,
          title: music.title,
          artist: { id: music.primary_artist.id, name: music.primary_artist.name, image: music.primary_artist.image_url },
          image: music.song_art_image_thumbnail_url,  
          album: { id: music.album.id, title: music.album.name, image: music.album.cover_art_url } ,
        },
      };
      setUser(updatedUser);
      nextAction('Profile8', navigation, user);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => updateMusic(item)}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: `${item.result.song_art_image_thumbnail_url}`,
          }}
        />
        <MainText>{item.result.title}</MainText>
      </TouchableOpacity>
    );
  };



  return (
    <ViewCustom>
      <Update_Button
        user={user}
        prevPage="Profile6"
        nextPage=""
        navigation={navigation}
      />
      <Title>Rechercher une musique</Title>
      <FieldInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={musics}
        renderItem={renderItem}
        keyExtractor={item => item.result.id.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.4}
      />
      {loading && <MainText>Chargement...</MainText>}
    </ViewCustom>
  );
};

export default Music;
