import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import {HomeSwiperView, TitleView, TitleText, FilterIcon, FilterIconImg} from "./styles"
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
        <View>
            <HomeSwiperView>
                <TitleView>
                    <TitleText>{t("home.title")}</TitleText>
                </TitleView>
                <Swipe userList={userList} />
            </HomeSwiperView>
            <FilterIcon>
                <FilterIconImg source={require('./styles/sort.png')}/>
            </FilterIcon>
        </View>
    )
}


export default Match




