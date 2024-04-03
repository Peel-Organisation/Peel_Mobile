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
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 70px;
    margin-bottom: 1%;
`

export const InterestBox = styled.View`
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    align-self: center;
    padding: 2%;
    margin: 2%;
`

export const InterestText = styled.Text`
    font-size: 12px;
    text-align: justify;
    color: ${props => props.theme.background};
`

export const Ellipsis = styled.Text`    
    color:  ${props => props.theme.ellipsisColor || 'gray'};
    font-size: 12px;
`

export const InterestFull = styled.TouchableOpacity`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    align-items: center;
    color: ${props => props.theme.primary};
`

export const ModalInterestView = styled.SafeAreaView`
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    margin: 3%;
    left: 2%;
    top: 2%;
    width: 90%;
    align-items: center;
`

export const ModalInterestText = styled.Text`
    font-size: 13px;
    padding: 5px;
    color: ${props => props.theme.background};
`