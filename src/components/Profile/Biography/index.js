import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import { nextAction } from '../../Update_User';

import {getStorage} from '../../../functions/storage';
import { BioInput } from './styles';
import { Text } from 'react-native';

// Biography component that will be used in the edit profile screen
const Biography = () => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [status, setStatus] = useState({
    isCorrect: false,
    statusPrompt: '',
  });

  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if (fetchedUser.biographie == undefined) {
        fetchedUser.biographie = '';
      }
      setUser(fetchedUser);
    });
  }, []);

  useEffect(() => {
    if (
      user.biographie != undefined &&
      user.biographie != '' &&
      user.biographie.length < 200 &&
      user.biographie.length > 20
    ) {
      setStatus({isCorrect: true, statusPrompt: ''});
    } else {
      if (user.biographie != undefined) {
        if (user.biographie.length < 20) {
          setStatus({
            isCorrect: false,
            statusPrompt: t('profile.fill_min_bio'),
          });
        } else if (user.biographie.length > 200) {
          setStatus({
            isCorrect: false,
            statusPrompt: t('profile.fill_max_bio'),
          });
        }
      } else {
        setStatus({isCorrect: false, statusPrompt: t('profile.fill')});
      }
    }
  }, [user]);

  return (
    <>
      {status.statusPrompt != '' && (
        <Text>{status.statusPrompt}</Text>
      )}
      <BioInput
        multiline
        numberOfLines={10}
        // style={styles.input}
        onChangeText={text => {
          let newUser = {...user};
          newUser.biographie = text;
          setUser(newUser);
          
        }}
        value={user.biographie}
        placeholder={t('profile.biography')}
      />
    </>
  );
};

export default Biography;
