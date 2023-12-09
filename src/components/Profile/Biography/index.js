import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { updateUser } from '../../../functions/api_request';
import { getStorage } from '../../../functions/storage';

import { BioInput } from './styles';
import { Text } from 'react-native';

const BiographyEdit = () => {
  const { t } = useTranslation();
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
      setStatus({ isCorrect: true, statusPrompt: '' });
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
        setStatus({ isCorrect: false, statusPrompt: t('profile.fill') });
      }
    }
  }, [user]);

  return (
    <>
      {status.statusPrompt != '' && <Text>{status.statusPrompt}</Text>}
      <BioInput
        multiline
        numberOfLines={4}
        onChangeText={text => {
          let newUser = { ...user };
          newUser.biographie = text;
          setUser(newUser);
        }}
        onEndEditing={() => {
          updateUser(user);
        }}
        value={user.biographie}
        placeholder={t('profile.biography')}
      />
    </>
  );
};

export default BiographyEdit;
