import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const QuestionView = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.background_button_border};
`

export const QuestionText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    font-weight: bold;
    text-align: center;
`

export const ResponseText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    text-align: center;
    padding: 5px;
`
