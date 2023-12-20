import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;



export const Biography = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.background_button_border};
    width: auto;
    height: 22%;
    padding: 10px;
`

export const BiographyText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    text-align: justify;
`