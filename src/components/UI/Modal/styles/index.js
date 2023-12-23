import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Container = styled.View`
    padding: 20px 10px;
    background: white;
    z-index: 999999;
    width: 70%;
    border-radius: 5px;
    margin-top: 30%;
    margin-left: 15%;
`
export const Content = styled.View`
    padding: 20px 10px;
`


export const Overlay = styled.TouchableOpacity`
    position: absolute;
    width: ${DIMENSION_WIDTH}px;
    height: ${DIMENSION_HEIGHT}px;
    background: #0000005c;
    top: 0;
    z-index: 999998;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
`

export const Icon = styled.Image`
    width: 20px;
    height: 20px;
`


