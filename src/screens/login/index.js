import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {
  ViewCustom,
  ButtonOrange,
  ButtonOrangeText,
  HeaderText,
  MainText,
  Link,
  FieldInput,
  PasswordInput,
  Header,
  Spacer,
  BarStyle,
} from './styles';
import crashlytics from '@react-native-firebase/crashlytics';
import {loginRequest, IsProfileCompleted} from '../../functions/api_request';
import {StatusBar} from 'react-native';

const Login = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function checkProfile() {
      let profile_bool = await IsProfileCompleted();
      if (profile_bool) {
        navigation.navigate('Auth');
      } else {
        navigation.navigate('Profile');
      }
    }
    crashlytics().log('Login screen mounted');
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          checkProfile();
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  const log = () => {
    const email_regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.toLowerCase().match(email_regex)) {
      alert('Addresse email non valide');
    } else {
      loginRequest(email, password, navigation)
        .then(({error, message}) => {
          if (error) {
            alert(message);
          }
        })
        .catch(error => {
          crashlytics().recordError(error);
          alert(error.message);
        });
    }
  };

  return (
    <>
      <Header>
        <HeaderText>{t('login.title')}</HeaderText>
        <BarStyle />
      </Header>
      <ViewCustom>
        <Spacer />
        <FieldInput
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email" 
          placeholder={t('login.email_placeholder')}
        />
        <Spacer />
        <PasswordInput
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          autoComplete="password"
          placeholder={t('login.password_placeholder')}
        />
        <Spacer />
        <ButtonOrange title={t('login.button_login')} onPress={() => log()}>
          <ButtonOrangeText>
            {t('login.button_login').toUpperCase()}
          </ButtonOrangeText>
        </ButtonOrange>
        <Spacer />
        <MainText>{t('login.no_account')}</MainText>
        <Link onPress={() => navigation.navigate('Register')}>
          {t('login.button_register')}
        </Link>
      </ViewCustom>
    </>
  );
};

export default Login;
