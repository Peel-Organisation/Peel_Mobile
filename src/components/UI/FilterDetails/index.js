import { Image } from "react-native";
import { CloseButton, Container, FilterInput, FilterText, TopContainer } from "./styles";

const FilterDetails = ({ title, setFilterPage }) => {

    return (
        <Container>
            <TopContainer>
                <FilterText>{title}</FilterText>
                <CloseButton onPress={()=>{setFilterPage(true)}}><Image source={require('../../../assets/images/icons/top-arrow.png')}/></CloseButton>
            </TopContainer>
            <FilterInput placeholder="Taper pour rechercher"/>
        </Container>
    );
};

export default FilterDetails;