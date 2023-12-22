import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard = styled.SafeAreaView`
    width: ${DIMENSION_WIDTH - 40}px;
    height: ${DIMENSION_HEIGHT - 230}px;
    background-color: white;
    border-radius: 15px;
    overflow: scroll;
    padding: 10px;
    border: 5px solid white;
    ${Platform.OS === 'android' ? 'elevation: 3' : 'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.1; shadow-radius: 4px;'};
`
export const UserCont = styled.SafeAreaView`
    display: block;
    padding: 5px;
`

export const Name = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    align-self: center;
`
export const Locate = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.sub_text};
    align-self: center;
`




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

export const MovieImage = styled.Image`
    width: 100%;

`

export const MusicImage = styled.Image`
    width: 100%;
    min-width: 100%;
    height: 100px;
    border-radius: 10px;
`
