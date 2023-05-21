import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import {GENIUS_API_TOKEN, GENIUS_API_PATH} from '@env';
import { uniqBy } from 'lodash';
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
      searchMusics(searchText, page);
    }
  }, [searchText, page]);

  const searchMusics = async (currentText, currentPage) => {
    const url = `https://${GENIUS_API_PATH}search?q=${currentText}&page=${currentPage}`;
    setLoading(true);
    console.log({ url, Authorization: `Bearer ${GENIUS_API_TOKEN}` });
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer VDoACK776IWvsMlkKcEixpSGu1gqPejwyRXcyri3gtGD3Xsh64mg3VWG5NGNG2mO`,
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
      console.log(error)
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
      nextAction('Profile8', navigation, user);
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


  const handleChangeText = (text) => {
    console.log(text);
    if(!text) {
      return
    }
    setSearchText(text)
  }

  console.log(musics);
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
        onChangeText={handleChangeText}
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
