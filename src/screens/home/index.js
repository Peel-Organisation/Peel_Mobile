import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Background, BackgroundTop, Container, Header, TitleText, FilterIcon, FilterIconImg } from "./styles"
import Swipe from "../../components/Swipe";
import crashlytics from '@react-native-firebase/crashlytics';
import { PostMatchList } from "../../functions/api_request"
import Loading from "../../components/Loading";
import Filter from "../../components/Filter";
import RetryButton from "../../components/Retry";


const Match = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [filter, setFilter] = useState(false);
    const [retry, setRetry] = React.useState(false);
    const [error, setError] = React.useState("");

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
        setLoading(true);
        setRetry(false);
        setError("");
        crashlytics().log("Match screen mounted");
        getMatchList()
    }, [activeFilters]);

    const getMatchList = () => {
        PostMatchList(activeFilters).then(matchList => {
            if (matchList != undefined) {
                setUserList(userList.concat(matchList.splice(0, 10)));
                setLoading(false);
            } else {
                navigation.navigate('Public');
            }
        }).catch((error) => {
            crashlytics().recordError(error)
            setError(error.message);
            setRetry(true);
            setLoading(false);
        })
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    if (retry) {
        return (
            <RetryButton error={error} retryFunc={() => getMatchList()} />
        )
    }

    return (
        <>
            <Background><BackgroundTop /></Background>
            <Container>
                <Header>
                    <TitleText>{t("home.title")}</TitleText>
                    <FilterIcon onPress={() => { setFilter(!filter) }}>
                        <FilterIconImg source={require('../../../assets/images/icons/sort.png')} />
                    </FilterIcon>
                </Header>
                <Swipe userList={userList} onSwipeCountOffsetThreshold={() => getMatchList()} />
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