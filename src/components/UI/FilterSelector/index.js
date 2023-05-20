import { Text } from "react-native";
import { Container, FilterText } from "./styles";

const FilterSelector = ({ title, activeFilter, setActiveFilter }) => {

    return (
        <Container onPress={()=>console.log(activeFilter)} >
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterSelector;