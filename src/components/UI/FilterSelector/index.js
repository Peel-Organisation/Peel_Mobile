import { Text } from "react-native";
import { Container, FilterText } from "./styles";

const FilterSelector = ({ title, filterName, filtersArray, setFiltersArray }) => {
    return (
        <Container active={filtersArray[filterName]} onPress={()=> setFiltersArray({...filtersArray, [filterName]: !filtersArray[filterName]})}>
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterSelector;