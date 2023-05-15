import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { Background, BackgroundTop, Container, Header, TitleText, FilterIcon, FilterIconImg, Filter } from "./styles"
import Swipe  from "../../components/Swipe";

import { GetMatchList} from "../../functions/api_request"
import Loading from "../../components/loading";
import { Icon } from "../../components/Swipe/styles";



const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([{}]);
    
    useEffect(() => {
        GetMatchList().then(matchList => {
            if (matchList != undefined) {
                setUserList(matchList);
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
        })
    }, []);



    if (loading) {
        return (
            <Loading />
        );
    }


    
    return (
        <>
            <Background><BackgroundTop/></Background>
            <Container>
                <StatusBar backgroundColor="#FC912F"/>
                <Header>
                    <TitleText>{t("home.title")}</TitleText>
                    <FilterIcon>
                        <FilterIconImg source={require('./styles/sort.png')}/>
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




