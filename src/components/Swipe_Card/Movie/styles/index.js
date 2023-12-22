import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const MovieArea = styled.SafeAreaView`
    height: ${DIMENSION_HEIGHT - 600}px;
    width: ${DIMENSION_WIDTH - 90}px;
    border-radius: 15px;
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    overflow: hidden;  
`

export const MovieImage = styled.Image`
    width: 100%;
    min-width: 100%;
    height: 100px;
    border-radius: 10px;
`

export const MovieInfo = styled.SafeAreaView`
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
`
export const MovieTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    font-weight: bold;
`  
