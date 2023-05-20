import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import {GENIUS_API_TOKEN, GENIUS_API_PATH} from '@env';
import {Update_Button, nextAction} from '../../../components/Update_User';
import {getStorage} from '../../../functions/storage';
import {ViewCustom, Title, MainText, FieldInput} from '../styles';

const Music = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if (fetchedUser.biographie === undefined) {
        fetchedUser.biographie = '';
      }
      setUser(fetchedUser);
    });
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      searchMusics();
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (searchText.length > 0) {
      searchMusics();
    }
  }, [searchText]);

  const searchMusics = async () => {
    const url = `${GENIUS_API_PATH}/search?q=${searchText}&page=${page}`;
    setLoading(true);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${GENIUS_API_TOKEN}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      if (
        data != null &&
        data.response != null &&
        data.response.hits.length > 0
      ) {
        setMusics(data.response.hits);
        setLoading(false);
      }
    }
  };

  const updateMusic = async musicToUpdate => {
    try {
      const updatedUser = {
        ...user,
        music: {
          title: musicToUpdate.title,
          artist: musicToUpdate.artist,
        },
      };
      setUser(updatedUser);
      nextAction('Profile6', navigation, user);
    } catch (error) {
      console.log({error});
    }
  };
  const renderItem = ({item}) => {
    const handlePress = item => updateMusic(item.result);
    return (
      <TouchableOpacity onPress={handlePress(item)}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: `${item.result.song_art_image_thumbnail_url}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  if (loading) return <MainText>Chargement...</MainText>;

  return (
    <ViewCustom>
      <Update_Button
        user={user}
        prevPage="Profile4"
        nextPage=""
        navigation={navigation}
      />
      <Title>Choix du film</Title>
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
    </ViewCustom>
  );
};

export default Music;
