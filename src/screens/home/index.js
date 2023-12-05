import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { Background, BackgroundTop, Container, Header, TitleText, FilterIcon, FilterIconImg } from "./styles"
import Swipe from "../../components/Swipe";
import crashlytics from '@react-native-firebase/crashlytics';
import { GetMatchList } from "../../functions/api_request"
import Loading from "../../components/loading";



const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([{}]);

    useEffect(() => {
        crashlytics().log("Match screen mounted");
        GetMatchList().then(matchList => {
            if (matchList != undefined) {
                setUserList(matchList);
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
        }).catch((error) => {
            crashlytics().recordError(error)
        })
    }, []);



    if (loading) {
        return (
            <Loading />
        );
    }



    return (
        <>
            <Background><BackgroundTop /></Background>
            <Container>
                <StatusBar backgroundColor="#FC912F" />
                <Header>
                    <TitleText>{t("home.title")}</TitleText>
                    <FilterIcon>
                        <FilterIconImg source={require('./styles/sort.png')} />
                    </FilterIcon>
                </Header>
                <Swipe userList={userList} />
                {/* <Filter>

                </Filter> */}
            </Container>
        </>
    )
}


export default Match




