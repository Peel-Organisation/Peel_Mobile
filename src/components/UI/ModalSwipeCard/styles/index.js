import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Container = styled.SafeAreaView`
    top: 16%;
    width: 70%;
    align-self: center;
    border-radius: 15px;
    z-index: 99999999;
    background: ${props => props.theme.background_light_blur};
`
export const Content = styled.SafeAreaView`
    padding: 15px;
`

export const Overlay = styled.TouchableOpacity`
    position: absolute;
    width: 100%;
    height: ${DIMENSION_HEIGHT}px; 
    background: rgba(0,0,0,0.5);
    z-index: 99999999;
    border-radius: 15px;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 2%;
    right: 2%;
    z-index: 2;
`

export const Icon = styled.Image`
    width: 15px;
    height: 15px;
`


