import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {Update_Button, nextAction} from "../../../components/Update_User";

import { getStorage } from "../../../functions/storage";

const CustomProfile = ({ route, navigation }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [navButton, setNavButton] = useState(null);

    useEffect(() => {
        getStorage('user').then(fetchedUser => {
            if (fetchedUser.biographie == undefined) {
                fetchedUser.biographie = "";
            }
            setUser(fetchedUser);
        });
    }, []);

    useEffect(() => {
        if (user.biographie != undefined && user.biographie != "" && user.biographie.length < 200 && user.biographie.length > 20 ) {
            setNavButton(
                <>
                    <Update_Button user={user} prevPage="Profile8" nextPage="Auth"  navigation={navigation} />
                </>
            )
        } else {
            if (user.biographie != undefined) {
                if (user.biographie.length < 20) {
                    setNavButton(
                        <>
                            <ConditionText>{t("profile.fill_min_bio")}</ConditionText>
                            <ConditionText>{t("profile.fill")}</ConditionText>
                            <Update_Button user={user} prevPage="Profile8" nextPage=""  navigation={navigation} />
                        </>
                    )
                } else if (user.biographie.length > 200) {
                    setNavButton(
                        <>
                            <ConditionText>{t("profile.fill_max_bio")}</ConditionText>
                            <ConditionText>{t("profile.fill")}</ConditionText>
                            <Update_Button user={user} prevPage="Profile8" nextPage=""  navigation={navigation} />
                        </>
                    )
                }
            } else {
                setNavButton(
                    <>
                        <ConditionText>{t("profile.fill")}</ConditionText>
                        <Update_Button user={user} prevPage="Profile8" nextPage=""  navigation={navigation} />
                    </>
                )
            }
        }
    }, [user]);

    return (
        <ViewCustom>
            <Title>{t("profile.custom_title")}</Title>
            <MainText>{t("profile.custom_text")}</MainText>
            {navButton}
        </ViewCustom>
    );
}

export default CustomProfile;