import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GENIUS_API_TOKEN, GENIUS_API_PATH } from '@env';
import { getStorage } from '../../../functions/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  HeaderView,
  HeaderText,
  HeaderTextView,
  BarStyle,
  GoBackArrow,
  GoBackArrowImage,
} from '../styles/header.js';
import { Spacer } from '../../login/styles/index.js';
import settings from '../../../../assets/images/icons/settings-white.png';
import {
  CustomView,
  PageTitle,
  FieldInput,
  ListMusic,
  MusicImage,
  FlatListCustom,
  MusicText,
  MusicContainer
} from '../styles/content.js';
import { UpdateButton, nextAction } from '../../../components/UpdateUser';
import Loading from '../../../components/Loading';
import StatusBarCustom from '../../../components/UI/StatusBarCustom/index.js';


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
    if (searchText.length > 0) {
      searchMusics();
    } else {
      //TODO: getPopularMusic();
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
      <ListMusic onPress={() => updateMusic(item)}>
        <MusicImage
          source={{
            uri: `${item.result.song_art_image_thumbnail_url}`,
          }}
        />
        <MusicText>{item.result.full_title}</MusicText>
      </ListMusic>
    );
  };

  useEffect(() => {
    if (
      user.music?.title != undefined && user.music?.title != '' && user.music?.id != undefined && user.music?.id != '' && user.music?.artist != undefined && user.music?.artist != '' && user.music?.image != undefined && user.music?.image != '' && user.music?.album != undefined && user.music?.album != ''
    ) {
      setNavButton(
        <UpdateButton
          user={{ music: user.music }}
          prevPage="Profile6"
          nextPage="Profile8"
          navigation={navigation}
        />
      );
    } else {
      setNavButton(
        <UpdateButton
          user={{ music: user.music }}
          prevPage="Profile6"
          nextPage=""
          navigation={navigation}
        />
      );
    }
  }, [user]);

  return (
    <>
      <StatusBarCustom bgColor="#FC912F" theme="light-content" />
      <CustomView>
        <HeaderView>
          <GoBackArrow onPress={() => navigation.navigate('Settings')}>
            <GoBackArrowImage source={settings} />
          </GoBackArrow>
          <HeaderTextView>
            <HeaderText>{t('profile.title')}</HeaderText>
            <BarStyle />
          </HeaderTextView>
        </HeaderView>
        <Spacer />
        <MusicContainer>
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
          {loading ? <Loading /> : (
            <FlatListCustom
              data={musics}
              renderItem={renderItem}
              keyExtractor={item => item.result.id.toString()}
              onEndReached={() => {
                setPage(page + 1);
              }}
              onEndReachedThreshold={0.4}
              numColumns={1}
            />
          )}
        </MusicContainer>
        {loading && <MusicText>Chargement...</MusicText>}
        {navButton}
      </CustomView>
    </>
  );
};

export default Music;
