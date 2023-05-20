import { Text } from "react-native";
import { Container, FilterText } from "./styles";

const FilterSelector = ({ title, setFilterPage }) => {

    return (
        <Container /*onPress={()=>{setFilterPage(false)}}*/>
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterSelector;