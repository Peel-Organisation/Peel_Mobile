import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import {TMDB_API_KEY, TMDB_API_PATH} from '@env';
import {Update_Button, nextAction} from '../../../components/Update_User';
import {getStorage} from '../../../functions/storage';
import {ViewCustom, Title, MainText, FieldInput} from '../styles';
import crashlytics from '@react-native-firebase/crashlytics';

const Film = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const updatedUser = {
        ...user,
        movie: {
          id: movieToUpdate.id,
          title: movieToUpdate.title,
          images: {
            backdrop_path: `${imageBaseUrl}${movieToUpdate.backdrop_path}`,
            poster_path: `${imageBaseUrl}${movieToUpdate.poster_path}`,
          },
          genres_ids,
        },
      };
      setUser(updatedUser);
      nextAction('Profile7', navigation, user);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => updateMovie(item)}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={{
            uri: `${imageBaseUrl}${item.poster_path}`,
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
        prevPage="Profile5"
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
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.4}
      />
    </ViewCustom>
  );
};

export default Film;
