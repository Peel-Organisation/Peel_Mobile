import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewAuth =  styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.loadingbg};
`


export const ButtonAuth = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 25px;
    border: 2px solid ${props => props.theme.background};
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ButtonAuthText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
    font-family: 'Roboto-Light';
    letter-spacing: 2px;
`

export const Title = styled.Text`
    font-size: 50px;
    color: ${props => props.theme.background};
    font-family: 'Roboto-Medium';
    letter-spacing: 2px;
`

export const MainText = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.background};
    font-family: 'Roboto-Regular';
    margin-top: 15px;
`
 