import React, { useState, useEffect } from "react";
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from "react-i18next";

import { ViewCustom } from "../../../components/StyledComponents/Profile/General/CustomView";
import { PageTitle } from "../../../components/StyledComponents/Profile/General/PageTitle";
import { InputView } from "../../../components/StyledComponents/Profile/General/InputView";
import { MainText } from "../../../components/StyledComponents/Profile/General/MainText";
import { CustomView } from "../../../components/StyledComponents/Profile/General/CustomView";
import { ConditionText } from "../../../components/StyledComponents/Profile/General/ConditionText";
import { FieldInput } from "../../../components/StyledComponents/Profile/General/FieldInput";

import {Update_Button} from "../../../components/Update_User";

import { getStorage } from "../../../functions/storage"; 



 
const Profile1 = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [navButton, setNavButton] = useState(null);   
 
    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            setUser(fetchedUser);
        }).catch((error) => {
            crashlytics().recordError(error)
        });
    }, []);


    useEffect(() => {
        if (user.firstName != undefined && user.firstName != "" && user.lastName != undefined && user.lastName != ""  ){ 
            setNavButton(
                <>
                    <Update_Button user={user} prevPage="" nextPage="Profile2"  navigation={navigation} />
                </>
            )
        } else {
            setNavButton(
                <> 
                    <ConditionText>{t("profile.fill")}</ConditionText>
                    <Update_Button user={user} prevPage="" nextPage=""  navigation={navigation} />
                </>
            )
        }
    }, [user]);


    return (
        <ViewCustom>

            <PageTitle>{t("profile.title")}</PageTitle>

            <InputView>
                <FieldInput
                    value={user.firstName}
                    onChangeText={(text) => {
                        let newUser = {...user}
                        newUser.firstName = text; 
                        setUser(newUser) 
                    }}
                    placeholder={t("profile.firstname")}
                />
            </InputView>
            <InputView>
                <FieldInput 
                    value={user.lastName}
                    onChangeText={(text) => { 
                        let newUser = {...user}
                        newUser.lastName = text; 
                        setUser(newUser)
                    }}
                    placeholder={t("profile.lastname")}
                />
            </InputView>
            {navButton} 
               
        </ViewCustom>  
    );
}

export default Profile1;






   
  