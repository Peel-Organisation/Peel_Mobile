import { Container, FilterText } from "./styles";

const FilterButton = ({ title, primary }) => {

    return (
        <Container primary={primary}>
            <FilterText>{title}</FilterText>
        </Container>
    );
};

export default FilterButton;