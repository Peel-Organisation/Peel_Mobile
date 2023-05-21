import React, {useState, useEffect} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import {useTranslation} from 'react-i18next';

import { FieldInput, ViewCustom, Title, MainText, InputView, ConditionText } from "../styles";


import {getStorage} from '../../../functions/storage';

const Profile1 = ({route, navigation}) => {
  const {t} = useTranslation();
  const [user, setUser] = useState({});
  const [navButton, setNavButton] = useState(null);

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
    if (
      user.firstName != undefined &&
      user.firstName != '' &&
      user.lastName != undefined &&
      user.lastName != ''
    ) {
      setNavButton(
        <>
          <Update_Button
            user={user}
            prevPage=""
            nextPage="Profile2"
            navigation={navigation}
          />
        </>,
      );
    } else {
      setNavButton(
        <>
          <ConditionText>{t('profile.fill')}</ConditionText>
          <Update_Button
            user={user}
            prevPage=""
            nextPage=""
            navigation={navigation}
          />
        </>,
      );
    }
  }, [user]);


    return (
        <ViewCustom>

            <Title>{t("profile.title")}</Title>

            <InputView>
                <MainText>{t("profile.firstname")}</MainText>
                <FieldInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value={user.firstName}
                    onChangeText={(text) => {
                        let newUser = {...user}
                        newUser.firstName = text; 
                        setUser(newUser) 
                    }}
                />
            </InputView>
            <InputView> 
                <MainText>{t("profile.lastname")}</MainText> 
                <FieldInput 
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                    value={user.lastName}
                    onChangeText={(text) => { 
                        let newUser = {...user}
                        newUser.lastName = text; 
                        setUser(newUser)
                    }} 
                />
            </InputView>
            {navButton} 
               
        </ViewCustom>  
    );
}

export default Profile1;
