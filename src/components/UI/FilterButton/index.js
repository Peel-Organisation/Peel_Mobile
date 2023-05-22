import { Container, FilterText } from "./styles";

const FilterButton = ({ title, primary, activeFilter }) => {

    return (
        <Container primary={primary} onPress={()=> console.log(activeFilter[0].interest)}>
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterButton;