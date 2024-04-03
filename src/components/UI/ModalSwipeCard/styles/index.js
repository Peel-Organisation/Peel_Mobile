import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Container = styled.SafeAreaView`
    top: 15%;
    left: 10%;
    padding: 15px;
    width: 80%;
    border-radius: 15px;
    z-index: 999998;
    background: ${props => props.theme.background_light_blur};
`
export const Content = styled.SafeAreaView`
    padding: 15px;
`

export const Overlay = styled.TouchableOpacity`
    position: absolute;
    width: ${DIMENSION_WIDTH}px;
    height: ${DIMENSION_HEIGHT}px; 
    background: rgba(0,0,0,0.5);
    z-index: 9999999;
    border-radius: 15px;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 2;
`

export const Icon = styled.Image`
    width: 15px;
    height: 15px;
`


