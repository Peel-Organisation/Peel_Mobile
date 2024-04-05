import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TMDB_API_KEY, TMDB_API_PATH } from '@env';
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
  FilmImage
} from '../styles/content.js';
import { UpdateButton, nextAction } from '../../../components/UpdateUser';
import arrow from '../../../../assets/images/icons/top-arrow-white.png';
import { Spacer } from '../../login/styles/index.js';
import Loading from '../../../components/Loading';

const Film = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [navButton, setNavButton] = useState(null);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

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
      searchMovies();
    } else {
      getPopularMovies();
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    if (searchText.length > 0) {
      searchMovies();
    } else {
      getPopularMovies();
    }
  }, [searchText]);



  const getPopularMovies = async () => {
    const url = `${TMDB_API_PATH}/trending/movie/day?api_key=${TMDB_API_KEY}&page=${page}`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data != null && data.results != null && data.results.length > 0) {
        if (page > 1) {
          setMovies([...movies, ...data.results]);
          setLoading(false);
        } else {
          setMovies(data.results);
          setLoading(false);
        }
      }
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const searchMovies = async () => {
    const url = `${TMDB_API_PATH}/search/movie?api_key=${TMDB_API_KEY}&query=${searchText}&page=${page}`;
    setLoading(true);
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      if (data != null && data.results != null && data.results.length > 0) {
        setMovies(data.results);
        setLoading(false);
      }
    }
  };

  const updateMovie = async movieToUpdate => {
    try {
      console.log('movieToUpdate : ', movieToUpdate);
      const url = `${TMDB_API_PATH}/genre/movie/list?api_key=${TMDB_API_KEY}`;
      const reponse = await fetch(url);
      const data = await reponse.json();
      const genres = data.genres;
      const genres_ids = movieToUpdate.genre_ids.map(genre_id => {
        const genre = genres.find(genre => genre.id === genre_id);
        return {
          id: genre_id,
          name: genre?.name || '',
        };
      });
      let newUser = user;
      newUser.movie = {
        id: movieToUpdate.id,
        title: movieToUpdate.title,
        images: {
          backdrop_path: `${imageBaseUrl}${movieToUpdate.backdrop_path}`,
          poster_path: `${imageBaseUrl}${movieToUpdate.poster_path}`,
        },
        genres_ids,
      }
      console.log('updatedUser : ', newUser);
      setUser(newUser);
      nextAction('Profile7', navigation, user);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <ListItem onPress={() => updateMovie(item)}>
        <FilmImage
          source={{
            uri: `${imageBaseUrl}${item.poster_path}`,
          }}
        />
      </ListItem>
    );
  };

  useEffect(() => {
    if (
      user.movie?.title != undefined && user.movie?.title != '' && user.movie?.id != undefined && user.movie?.id != '' && user.movie?.images != undefined && user.movie?.images != ''
    ) {
      setNavButton(
        <UpdateButton
          user={{ movie: user.movie }}
          prevPage="Profile5"
          nextPage="Profile7"
          navigation={navigation}
        />
      );
    } else {
      setNavButton(
        <UpdateButton
          user={{ movie: user.movie }}
          prevPage="Profile5"
          nextPage=""
          navigation={navigation}
        />
      );
    }
  }, [user]);


  return (
    <CustomView>
      <HeaderView>
        <GoBackArrow onPress={() => navigation.navigate('Settings')}>
          <GoBackArrowImage source={arrow} />
        </GoBackArrow>
        <HeaderTextView> 
          <HeaderText>{t('profile.title')}</HeaderText>
          <BarStyle />
        </HeaderTextView>
      </HeaderView>
      <ContentView>
      <Spacer />
        <PageTitle>{t('profile.movie_condition')}</PageTitle>
        <FieldInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder={t('profile.movie_placeholder')}
        />
        {loading ? <Loading /> :
          <FlatListCustom
            data={movies}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
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
  );
};

export default Film;
