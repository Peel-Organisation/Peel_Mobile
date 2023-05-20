import { useState, useEffect } from "react";
import FilterButton from "../UI/FilterButton";
import FilterSelector from "../UI/FilterSelector";
import { ButtonView, Container, FilterIcon, FilterIconImg, FiltersView, Header, Search, TitleText } from "./styles";
import { useTranslation } from "react-i18next";
import FilterDetails from "../UI/FilterDetails";


const Filter = ({ filter, setFilter }) => {
    const { t } = useTranslation();

    const [FilterPage, setFilterPage] = useState(true);
    const [activeFilter, setActiveFilter] = useState([]);

    useEffect(() => {
        setActiveFilter(filtersArray);
    },[]) 

    const filtersArray = [
        {
            name: "interest",
            checked: false,
        },
        {
            name: "musics",
            checked: false,
        },
        {
            name: "sports",
            checked: false,
        },
        {
            name: "movies",
            checked: false,
        },
        {
            name: "games",
            checked: false,
        },
    ];

    return (
        <Container>
            <Header>
                <TitleText>{t("home.filter")}</TitleText>
                <FilterIcon onPress={()=>{setFilter(!filter)}}>
                    <FilterIconImg source={require('@public/sort.png')}/>
                </FilterIcon>
            </Header>
            <FiltersView>

                <Search>{t("home.filter")}</Search>

                {/* onclick fetch if interest == true*/}
                {
                    FilterPage ?(
                        <>
                            <FilterSelector title={"Mes centres d'intérêts"} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
                            <FilterSelector title={"Musiques"} setFilterPage={setFilterPage}/>
                            <FilterSelector title={"Sports"} setFilterPage={setFilterPage}/>
                            <FilterSelector title={"Films"} setFilterPage={setFilterPage}/>
                            <FilterSelector title={"Jeux"} setFilterPage={setFilterPage}/>
                        </>
                    ) : (
                        <>
                            <FilterDetails title={"Mes centres d'intérêts"} setFilterPage={setFilterPage}/>
                        </>
                    )
                }

                <ButtonView>
                    <FilterButton title={"Annuler"}/>
                    <FilterButton primary={true} title={"Appliquer"}/>
                </ButtonView>
            </FiltersView>
        </Container>
    );
};

export default Filter;