import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const MovieTitle = styled.Text`
    font-size: 16px;
    margin-top: 2%;
    height: 30px;
    color: ${props => props.theme.text};
`  

export const MovieArea = styled.SafeAreaView`
    height: 150px;
    width: 100%;
    border-radius: 15px;
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    overflow: hidden; 
    margin-bottom: 4%;
`

export const MovieImage = styled.Image`
    top: 10%;
    align-self: center;
    width: 70%;
    height: 70%;
    border-radius: 10px;
`

export const MovieInfo = styled.SafeAreaView`
    top: 10%;
    width: 100%;
    align-items: center;
    padding: 10px;
`

export const MovieName = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.theme.text};
`
