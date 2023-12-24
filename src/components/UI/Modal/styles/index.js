import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Container = styled.View`
    background: white;
    padding: 15px;
    z-index: 999999;
    width: 90%;
    top: 25%;
    left: 5%;
    border-radius: 15px;
`
export const Content = styled.View`
    padding: 15px;
`

export const Overlay = styled.TouchableOpacity`
    position: absolute;
    width: ${DIMENSION_WIDTH}px;
    height: ${DIMENSION_HEIGHT}px;
    background: rgba(0,0,0,0.5);
    top: 0;
    z-index: 999998;
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


