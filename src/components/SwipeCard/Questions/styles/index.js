import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const QuestionView = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    width: 100%;
    padding: 10px;
    margin-top: 4%;
    border-radius: 10px;
`

export const QuestionText = styled.Text`
    font-size: 13px;
    color: ${props => props.theme.text};
    font-weight: bold;
    text-align: center;
    padding: 10px;
`

export const ResponseText = styled.Text`
    font-size: 12px;
    letter-spacing: 1px;
    color: ${props => props.theme.text};
    text-align: justify;
    align-self: center;
    line-height: 20px;
    padding: 10px;   
`

export const Ellipsis = styled.Text`    
    font-size: 12px;
    color:  ${props => props.theme.ellipsisColor || 'gray'};
    margin-bottom: 5px;
    padding: 10px;
`

export const QuestionTitle = styled.Text`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    color: ${props => props.theme.text};
`

export const QuestionFull = styled.TouchableOpacity`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    align-items: flex-end;
    color: ${props => props.theme.primary};
`

