import React from "react";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import { ViewAuth, ButtonAuth, ButtonAuthText, Title, MainText } from './styles';
import Logo from "../../components/Logo";
import { Spacer } from "../../components/StyledComponents/Profile/General/ConditionText/Test";




const Auth = ({ navigation }) => {
    const { t } = useTranslation();
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#FC912F" />
            <ViewAuth>
                <Logo />
                <Title>
                    {t("Auth.title")}
                </Title>
                <MainText>
                    {t("Auth.main_text")}
                </MainText>
            </ViewAuth>
            <ViewAuth>
                <ButtonAuth onPress={() => navigation.navigate('Login')} >
                    <ButtonAuthText>
                        {t("Auth.login").toUpperCase()}
                    </ButtonAuthText>
                </ButtonAuth>
                <ButtonAuth title={t("Auth.register")} onPress={() => navigation.navigate('Register')} >
                    <ButtonAuthText>
                        {t("Auth.register").toUpperCase()}
                    </ButtonAuthText>
                </ButtonAuth>
            </ViewAuth>
        </>
    );
}





export default Auth; 