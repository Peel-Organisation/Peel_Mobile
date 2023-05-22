import { useState, useEffect } from "react";
import FilterButton from "../UI/FilterButton";
import FilterSelector from "../UI/FilterSelector";
import { ButtonView, Container, FilterIcon, FilterIconImg, FiltersView, Header, Search, TitleText } from "./styles";
import { useTranslation } from "react-i18next";
import FilterDetails from "../UI/FilterDetails";


const Filter = ({ filter, setFilter, handleFilterArray }) => {
    const { t } = useTranslation();

    const [FilterPage, setFilterPage] = useState(true);

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
                            <FilterSelector title={"Mes centres d'intérêts"} filterName="interest" handleFilterArray={handleFilterArray}/>
                            <FilterSelector title={"Musiques"} filterName="music" handleFilterArray={handleFilterArray}/>
                            <FilterSelector title={"Sports"} filterName="sport" handleFilterArray={handleFilterArray}/>
                            <FilterSelector title={"Films"} filterName="movie" handleFilterArray={handleFilterArray}/>
                            <FilterSelector title={"Jeux"} filterName="games" handleFilterArray={handleFilterArray}/>
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