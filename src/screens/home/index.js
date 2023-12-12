import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { Background, BackgroundTop, Container, Header, TitleText, FilterIcon, FilterIconImg } from "./styles"
import Swipe from "../../components/Swipe";
import crashlytics from '@react-native-firebase/crashlytics';
import { PostMatchList } from "../../functions/api_request"
import Loading from "../../components/loading";
import Filter from "../../components/Filter";


const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([{}]);
    const [filter, setFilter] = useState(false);

    const [filtersArray, setFiltersArray] = useState({
        interest: false,
        music: false,
        sport: false,
        movie: false,
        games: false,
    });

    const [activeFilters, setActiveFilters] = useState({
        interest: false,
        music: false,
        sport: false,
        movie: false,
        games: false,
    });

    useEffect(() => {
        crashlytics().log("Match screen mounted");
        PostMatchList(activeFilters).then(matchList => {
            if (matchList != undefined) {
                setUserList(matchList);
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
        }).catch((error) => {
            crashlytics().recordError(error)
        })
    }, [activeFilters]);

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
                    <FilterIcon onPress={() => { setFilter(!filter) }}>
                        <FilterIconImg source={require('../../../assets/images/icons/sort.png')} />
                    </FilterIcon>
                </Header>
                <Swipe userList={userList} />

                {
                    filter && (
                        <Filter filter={filter} setFilter={setFilter} filtersArray={filtersArray} setFiltersArray={setFiltersArray} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
                    )
                }
            </Container>
        </>
    );
};


export default Match;