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
    justify-content: space-around;
    width: ${DIMENSION_WIDTH - 90}px;
    height: ${DIMENSION_HEIGHT - 900}px;
`

export const InterestBox = styled.Text`
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    align-self: center;
    padding: 2px 3px 2px 4px;
    margin: 1px;
`

export const InterestText = styled.Text`
    font-size: 12px;
    text-align: justify;
    color: ${props => props.theme.background};
`

export const Ellipsis = styled.Text`    
    color:  ${props => props.theme.ellipsisColor || 'gray'};
    font-size: 11px;
`

export const InterestFull = styled.TouchableOpacity`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    align-items: center;
    color: ${props => props.theme.primary};
`

export const InterestBoxFull = styled.Text`
    background-color: ${props => props.theme.primary};
    text-align: center;
    border-radius: 10px;
    padding: 2%;
    margin: 2%;
    width: 100%;
`
export const InterestTextFull = styled.Text`
    font-size: 13px;
    text-align: justify;
    color: ${props => props.theme.background};
`