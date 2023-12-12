import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { GENIUS_API_TOKEN, GENIUS_API_PATH } from '@env';
import { UpdateButton, nextAction } from '../../../components/Update_User';
import { getStorage } from '../../../functions/storage';
import crashlytics from '@react-native-firebase/crashlytics';

import { CustomView } from '../../../components/StyledComponents/Profile/General/CustomView';
import { PageTitle } from '../../../components/StyledComponents/Profile/General/PageTitle';
import { MainText } from '../../../components/StyledComponents/Profile/General/MainText';
import { FieldInput } from '../../../components/StyledComponents/Profile/General/FieldInput';
import {
  HeaderView,
  HeaderText,
} from '../../../components/StyledComponents/Profile/General/Header';
import { FieldView } from '../../../components/StyledComponents/Profile/General/FieldView';

const Music = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navButton, setNavButton] = useState(null);
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
      let newUser = user;

      newUser.music = {
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
      };
      setUser(newUser);
      nextAction('Profile8', navigation, user);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const renderItem = ({ item }) => {
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

  useEffect(() => {
    console.log('user : ', user.music);
    if (
      user.music?.title != undefined && user.music?.title != '' && user.music?.id != undefined && user.music?.id != '' && user.music?.artist != undefined && user.music?.artist != '' && user.music?.image != undefined && user.music?.image != '' && user.music?.album != undefined && user.music?.album != ''
    ) {
      setNavButton(
        <UpdateButton
          user={user}
          prevPage="Profile6"
          nextPage="Profile8"
          navigation={navigation}
        />
      );
    } else {
      setNavButton(
        <UpdateButton
          user={user}
          prevPage="Profile6"
          nextPage=""
          navigation={navigation}
        />
      );
    }
  }, [user]);

  return (
    <CustomView>
      <HeaderView>
        <HeaderText>{t('profile.title')}</HeaderText>
      </HeaderView>
      <FieldView>
        <PageTitle>{t('profile.music_condition')}</PageTitle>
        <FieldInput
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            setPage(1);
            setMusics([]);
          }}
          placeholder={t('profile.music_placeholder')}
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
      </FieldView>
      {loading && <MainText>Chargement...</MainText>}
      {navButton}
    </CustomView>
  );
};

export default Music;
