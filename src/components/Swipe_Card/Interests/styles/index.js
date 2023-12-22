import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const InterestTitle = styled.Text`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    color: ${props => props.theme.text};
`

export const InterestView = styled.SafeAreaView`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`

export const InterestBox = styled.Text`
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    padding: 2%;
    margin: 10px 0px;
`

export const InterestText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
`
