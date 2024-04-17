import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GIPHY_API_KEY, GIPHY_PATH } from '@env';
import { getStorage } from '../../../functions/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {
  HeaderView,
  HeaderText,
  HeaderTextView,
  BarStyle,
  GoBackArrow,
  GoBackArrowImage,
} from '../styles/header.js'
import {
  CustomView,
  ContentView,
  FieldInput,
  LabelInput,
  PageTitle,
  SwitchSelectorCustom,
  DatePickerCustom,
  BioInput,
  FlatListCustom,
  ListItem,
  GifImage
} from '../styles/content.js';
import { UpdateButton, nextAction } from '../../../components/UpdateUser';
import settings from '../../../../assets/images/icons/settings-white.png';
import Loading from '../../../components/Loading';
import { Spacer } from '../../login/styles/index.js';
import StatusBarCustom from '../../../components/UI/StatusBarCustom/index.js';

const Gif = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(0);
  const [navButton, setNavButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    getPopularGifs();
    getStorage('user')
      .then(fetchedUser => {
        if (fetchedUser.biographie == undefined) {
          fetchedUser.biographie = '';
        }
        setUser(fetchedUser);
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  useEffect(() => {
    getPopularGifs();
  }, [page]);

  useEffect(() => {
    setPage(0);
    if (searchText.length > 0) {
      searchGif();
    } else {
      getPopularGifs();
    }
  }, [searchText]);

  useEffect(() => {
    if (
      user.gif != undefined && user.gif != null && user.gif?.id != undefined && user.gif?.id != '' && user.gif?.title != undefined && user.gif?.title != '' && user.gif?.url != undefined && user.gif?.url != '' && user.gif?.image != undefined && user.gif?.image != null) {
      setNavButton(
        <UpdateButton
          user={{ gif: user.gif }}
          prevPage="Profile3"
          nextPage="Profile6"
          navigation={navigation}
        />
      );
    } else {
      setNavButton(
        <UpdateButton
          user={{ gif: user.gif }}
          prevPage="Profile3"
          nextPage=""
          navigation={navigation}
        />
      );
    }
  }, [user]);

  const getPopularGifs = async () => {
    setLoading(true);
    const limit = 20;
    let link = '';
    if (searchText.length > 0) {
      link = `${GIPHY_PATH}/search?api_key=${GIPHY_API_KEY}&limit=${limit}&q=${searchText}&offset=${page * limit
        }`;
    } else {
      link = `${GIPHY_PATH}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${page * limit
        }`;
    }
    crashlytics().log('serach link : ', link);
    const response = await fetch(link);
    if (response.status == 200) {
      const jsonData = await response.json();
      if (
        jsonData?.data != null &&
        jsonData.meta.status == 200 &&
        jsonData.data.length > 0
      ) {
        crashlytics().log('jsonData : ', jsonData);
        let newGifs = [];
        if (page > 0) {
          newGifs = [...gifs, ...jsonData.data];
        } else {
          newGifs = jsonData.data;
        }
        setLoading(false);
        setGifs(newGifs);
      }
    }
  };

  const searchGif = async () => {
    setLoading(true);
    const limit = 20;
    const link = `${GIPHY_PATH}/search?api_key=${GIPHY_API_KEY}&limit=${limit}&q=${searchText}`;
    crashlytics().log('serach link : ', link);
    const response = await fetch(link);
    if (response.status == 200) {
      const jsonData = await response.json();
      if (
        jsonData?.data != null &&
        jsonData.meta.status == 200 &&
        jsonData.data.length > 0
      ) {
        setLoading(false);
        setGifs(jsonData.data);
      }
    }
  };

  const updateGif = gif => {
    let newUser = user;
    newUser.gif = {
      id: gif.id,
      title: gif.title,
      url: gif.url,
      image: gif.images.original,
    };
    setUser(newUser);
    nextAction('Profile6', navigation, user);
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => updateGif(item)}>
        <GifImage
          source={{
            uri: `${item?.images?.original?.webp}`,
          }}
        />
      </ListItem>
    );
  };

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
        <ContentView>
          <Spacer />
          <PageTitle>{t('profile.gifs_condition')}</PageTitle>
          <FieldInput
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholder={t('profile.gifs_condition')}
          />
          {loading ? <Loading /> :
            <FlatListCustom
              data={gifs}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              onEndReached={() => {
                setPage(page + 1);
              }}
              onEndReachedThreshold={0.4}
              numColumns={2}
            />
          }
        </ContentView>
        {navButton}
      </CustomView>
    </>
   
  );
};

export default Gif;
