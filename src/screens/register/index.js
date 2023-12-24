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
} from './styles';
import crashlytics from '@react-native-firebase/crashlytics';
import {registerRequest} from '../../functions/api_request';

const Register = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    crashlytics().log('Register screen mounted');
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          navigation.navigate('Auth');
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
      });
  }, []);

  const SignIn = () => {
    const email_regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      email.length < 5 ||
      password.length < 8 ||
      password != repeatPassword ||
      !email.toLowerCase().match(email_regex)
    ) {
      alert('erreur de saisie');
    } else {
      registerRequest(email, password, navigation).then(({ error, message }) => {
        if (error) {
          alert(message);
        }
      }).catch((error) => {
        crashlytics().recordError(error)
        alert(error.message);
      });
    }
  };

  return (
    <>
      <Header>
        <HeaderText>{t('register.title')}</HeaderText>
      </Header>
      <ViewCustom>
        <StatusBar barStyle="light-content" backgroundColor="#FC912F" />
        <Spacer />
        <MainText>{t('register.email')}</MainText>
        <FieldInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          autoComplete="email"
        />
        <MainText>{t('register.password')}</MainText>
        <PasswordInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          autoComplete="password"
        />
        <MainText>{t('register.password_confirm')}</MainText>
        <PasswordInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={repeatPassword}
          secureTextEntry={true}
          onChangeText={text => setRepeatPassword(text)}
          autoComplete="password"
        />
        <ButtonOrange
          title={t('register.button_register')}
          onPress={() => SignIn()}>
          <ButtonOrangeText>
            {t('register.button_register').toUpperCase()}
          </ButtonOrangeText>
        </ButtonOrange>
        <MainText>{t('register.already_account')} </MainText>
        <Link onPress={() => navigation.navigate('Login')}>
          {t('register.button_login')}
        </Link>
      </ViewCustom>
    </>
  );
};

export default Register;
