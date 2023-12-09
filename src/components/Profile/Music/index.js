import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { GENIUS_API_TOKEN, GENIUS_API_PATH } from '@env';
import { updateUser } from '../../../functions/api_request';
import { getStorage } from '../../../functions/storage';
import { MainText, FieldInput } from './styles';
import crashlytics from '@react-native-firebase/crashlytics';

const MusicEdit = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getStorage('user')
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
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
    console.log('url : ', url);
    console.log('authorization : ', `Bearer ${GENIUS_API_TOKEN}`);
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
        crashlytics().log('data : ', data);
        let hits = [];
        data.response.hits.forEach(hit => {
          if (
            musics.findIndex(music => music.result.id === hit.result.id) === -1
          ) {
            hits.push(hit);
          }
        });
        let newMusic = [];

        if (page > 0) {
          newMusic = [...musics, ...hits];
        } else {
          newMusic = data;
        }
        setMusics(newMusic);
        setLoading(false);
      }
    } catch (error) {
      console.log('error : ', error);
      crashlytics().recordError(error);
    }
  };

  const updateMusic = async musicToUpdate => {
    try {
      const url = `https://${GENIUS_API_PATH}songs/${musicToUpdate.result.id}?text_format=plain&`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${GENIUS_API_TOKEN}`,
        },
      });
      const data = await response.json();
      let music = data.response.song;
      const updatedUser = {
        ...user,
        music: {
          id: music.id,
          title: music.title,
          artist: {
            id: music.primary_artist.id,
            name: music.primary_artist.name,
            image: music.primary_artist.image_url,
          },
          image: music.song_art_image_thumbnail_url,
          album: {
            id: music.album.id,
            title: music.album.name,
            image: music.album.cover_art_url,
          },
        },
      };
      setUser(updatedUser);
      updateUser(updatedUser);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => updateMusic(item)}>
        <Image
          style={{
            width: 150,
            height: 150,
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
    <>
      <FieldInput
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          setPage(1);
          setMusics([]);
        }}
        placeholder={t('profile.custom.music')}
      />
      <FlatList
        data={musics}
        renderItem={renderItem}
        keyExtractor={item => item.result.id.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.4}
        numColumns={2}
      />
      {loading && <MainText>Chargement...</MainText>}
    </>
  );
};

export default MusicEdit;