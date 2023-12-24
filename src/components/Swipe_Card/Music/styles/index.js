import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const MusicTitle = styled.Text`
    margin-top: 2%;
    font-size: 16px;
    height: 30px;
    color: ${props => props.theme.text};
`  
export const MusicArea = styled.SafeAreaView`
    height: ${DIMENSION_HEIGHT - 600}px;
    width: ${DIMENSION_WIDTH - 90}px;
    border-radius: 15px;
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    overflow: hidden; 
`
export const MusicImage = styled.Image`
    top: 15%;
    left: 5%;
    width: 50%;
    height: 70%;
    border-radius: 10px;
`
export const MusicInfo = styled.SafeAreaView`
    left: 55%;
    top: -40%;
    padding: 10px;
    height: 50%;
    width: 50%
`
export const MusicName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.text};
`
export const MusicArtist = styled.Text`
    font-size: 12px;
    color: ${props => props.theme.text};
`