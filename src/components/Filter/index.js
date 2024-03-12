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
                    <FilterSelector title={t('Filter.interest')} filterName="interest" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={t('Filter.music')} filterName="music" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={t('Filter.sport')} filterName="sport" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={t('Filter.movie')} filterName="movie" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    <FilterSelector title={t('Filter.games')} filterName="games" filtersArray={filtersArray} setFiltersArray={setFiltersArray} />
                    
                    <ButtonView>
                        <FilterButton title={t('Filter.cancel')} setActiveFilters={setActiveFilters} activeFilters={activeFilters} filtersArray={filtersArray} setFiltersArray={setFiltersArray} filter={filter} setFilter={setFilter} />
                        <FilterButton primary={true} title={t('Filter.apply')} setActiveFilters={setActiveFilters} activeFilters={activeFilters} filtersArray={filtersArray} setFiltersArray={setFiltersArray} filter={filter} setFilter={setFilter} />
                    </ButtonView>

                </FiltersView>
            </Container>
        </Background>
    );
};

export default Filter;