import FilterButton from "../UI/FilterButton";
import FilterSelector from "../UI/FilterSelector";
import { ButtonView, Container, Background, FilterIcon, FilterIconImg, FiltersView, Header, Search, TitleText } from "./styles";
import { useTranslation } from "react-i18next";


const Filter = ({ filter, setFilter, filtersArray, setFiltersArray, activeFilters, setActiveFilters, FilterPage }) => {
    const { t } = useTranslation();

    return (
        <Background onPress={() => { setFilter(!filter) }} activeOpacity={1}>
            <Container activeOpacity={1}>
                <Header>
                    <TitleText>{t("home.filter")}</TitleText>
                    <FilterIcon onPress={() => { setFilter(!filter) }}>
                        <FilterIconImg source={require('../../../assets/images/icons/sort.png')} />
                    </FilterIcon>
                </Header>
                <FiltersView>
                    <FilterSelector title={"Mes centres d'intérêts"} filterName="interest" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={"Musiques"} filterName="music" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={"Sports"} filterName="sport" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={"Films"} filterName="movie" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={"Jeux"} filterName="games" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    
                    <ButtonView>
                        <FilterButton title={"Annuler"} setActiveFilters={setActiveFilters} activeFilters={activeFilters} filtersArray={filtersArray} setFiltersArray={setFiltersArray} filter={filter} setFilter={setFilter} />
                        <FilterButton primary={true} title={"Appliquer"} setActiveFilters={setActiveFilters} activeFilters={activeFilters} filtersArray={filtersArray} setFiltersArray={setFiltersArray} filter={filter} setFilter={setFilter} />
                    </ButtonView>

                </FiltersView>
            </Container>
        </Background>
    );
};

export default Filter;