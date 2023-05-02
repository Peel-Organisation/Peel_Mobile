import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {GIPHY_API_KEY, GIPHY_PATH} from '@env';
import {Update_Button, nextAction} from '../../../components/Update_User';
import Biography from '../../../components/Profile/Biography';
import Gif from '../../../components/Profile/Gifs';
// import {FlatList, TouchableOpacity, Image} from 'react-native';
import {
  ViewCustom,
  Title,
  MainText,
  ConditionText,
  ModuleView,
  BioInput,
  FieldInput,
} from './styles';

import {getStorage} from '../../../functions/storage';

const EditProfile = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [navButton, setNavButton] = useState(null);
  const [listModule, setListModule] = useState([]);

  return (
    <ViewCustom>
      <Title>{t('profile.custom_title')}</Title>
      <MainText>{t('profile.custom_text')}</MainText>
      <Title>{t('profile.title')}</Title>

      {/* BIOGRAPHIE */}

      <ModuleView>
        <Title>Test</Title>
        <Biography user={user} setUser={setUser} />
      </ModuleView>

      {/* GIFS */}

      <ModuleView>
        <Title>Test2</Title>
        <Gif user={user} setUser={setUser} />
      </ModuleView>
      <ModuleView>
        <Title>Test3</Title>
      </ModuleView>
      {/* {navButton} */}
    </ViewCustom>
  );
};

export default EditProfile;
