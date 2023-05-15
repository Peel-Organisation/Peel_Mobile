import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Biography from '../../../components/Profile/Biography';
import Gif from '../../../components/Profile/Gifs';
import Interest from '../../../components/Profile/Interest';
import Question from '../../../components/Profile/Question';
import {Switch} from 'react-native';
import {ViewCustom, Title, MainText, ModuleView, ModuleTitle} from './styles';

import {getStorage} from '../../../functions/storage';

const EditProfile = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [listModule, setListModule] = useState([]);

  return (
    <ViewCustom>
      <Title>{t('profile.custom_title')}</Title>
      <MainText>{t('profile.custom_text')}</MainText>
      <Title>{t('profile.title')}</Title>

      <ModuleView>
        <ModuleTitle>Biographie</ModuleTitle>
        <Biography user={user} setUser={setUser} />
      </ModuleView>
      <ModuleView>
        <ModuleTitle>Intérêts</ModuleTitle>
        <Interest user={user} setUser={setUser} />
      </ModuleView>
      <ModuleView>
        <ModuleTitle>Questions</ModuleTitle>
        <Question user={user} setUser={setUser} />
      </ModuleView>
      {/* <ModuleView>
        <ModuleTitle>Gifs</ModuleTitle>
        <Gif user={user} setUser={setUser} />
      </ModuleView> */}
    </ViewCustom>
  );
};

export default EditProfile;
