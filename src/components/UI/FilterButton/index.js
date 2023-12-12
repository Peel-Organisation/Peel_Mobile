import { View } from "react-native";
import { Container, FilterText } from "./styles";

const FilterButton = ({ title, primary, activeFilters, setActiveFilters, filtersArray, setFiltersArray, filter, setFilter }) => {

    return (
        <Container primary={primary} onPress={ primary ? (()=>(setActiveFilters(filtersArray), setFilter(!filter))) : (()=>(setFiltersArray(activeFilters), setFilter(!filter))) }>
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterButton;