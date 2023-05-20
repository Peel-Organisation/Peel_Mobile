import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { Background, BackgroundTop, Container, Header, TitleText, FilterIcon, FilterIconImg } from "./styles"
import Swipe  from "../../components/Swipe";

import { GetMatchList} from "../../functions/api_request"
import Loading from "../../components/loading";
import { Icon } from "../../components/Swipe/styles";
import Filter from "../../components/Filter";



const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([{}]);
    const [filter, setFilter] = useState(false);
    
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
                    <FilterIcon onPress={()=>{setFilter(!filter)}}>
                        <FilterIconImg source={require('./styles/sort.png')}/>
                    </FilterIcon>
                </Header>
                <Swipe userList={userList} />
                
                {
                    filter &&(
                        <Filter filter={filter} setFilter={setFilter}/>
                    )
                }
            </Container>
        </>
    )
}


export default Match




