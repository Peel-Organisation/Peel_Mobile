import { Text } from "react-native";
import { Container, FilterText } from "./styles";

const FilterSelector = ({ title, handleFilterArray, filterName }) => {

    return (
        <Container onPress={ () => handleFilterArray(filterName)} >
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterSelector;