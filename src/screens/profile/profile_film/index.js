import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import {TMDB_API_KEY, TMDB_API_PATH} from '@env';
import {Update_Button, nextAction} from '../../../components/Update_User';
import {getStorage} from '../../../functions/storage';
import {ViewCustom, Title, MainText, FieldInput} from '../styles';

const Film = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if (fetchedUser.biographie === undefined) {
        fetchedUser.biographie = '';
      }
      setUser(fetchedUser);
    });
  }, []);

  useEffect(() => {
    getPopularMovies();
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (searchText.length > 0) {
      searchMovies();
    } else {
      getPopularMovies();
    }
  }, [searchText]);

  const getPopularMovies = async () => {
    const url = `${TMDB_API_PATH}/trending/movie/day?api_key=${TMDB_API_KEY}&page=${page}`;
    console.log({url});
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log({data});
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
      console.log({error});
    }
  };

  const searchMovies = async () => {
    const url = `${TMDB_API_PATH}/search/movie?api_key=${TMDB_API_KEY}&query=${searchText}&page=${page}`;
    console.log({url});
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

  const updateMovie = movie => {
    let newUser = user;
    newUser.movie = {
      id: movie.id,
      title: movie.title,
      image: `${imageBaseUrl}${movie.poster_path}`,
    };
    console.log({newUser});
    setUser(newUser);
    nextAction('Profile6', navigation, user);
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

  if (loading) return <MainText>Loading...</MainText>;

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
        onChangeText={text => setSearchText(text)}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        onEndReached={() => {
          setPage(page + 1);
        }}
        onEndReachedThreshold={0.4}
      />
    </ViewCustom>
  );
};

export default Film;
