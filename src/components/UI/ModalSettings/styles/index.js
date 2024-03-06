import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Container = styled.View`
    top: 15%;
    left: 10%;
    padding: 15px;
    width: ${DIMENSION_WIDTH - 80}px;
    border-radius: 15px;
    z-index: 999999;
    background: ${props => props.theme.background_light_blur};
`
export const Content = styled.View`
    padding: 15px;
`

export const Overlay = styled.TouchableOpacity`
    position: absolute;
    width: ${DIMENSION_WIDTH}px;
    height: ${DIMENSION_HEIGHT}px;
    background: rgba(0,0,0,0.5);
    z-index: 999998;
    border-radius: 15px;
`

export const Button = styled.TouchableOpacity`
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 2;
`

export const Icon = styled.Image`
    margin-top: 5px;
    width: 15px;
    height: 15px;
`

export const Button_Settings = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    display: flex;
    border: 2px solid ${props => props.theme.background_button_border};
    background-color: ${props => props.theme.background};;
`

export const ButtonView = styled.View`
    flex-direction: row;
    align-self: center;
`

export const Flag = styled.Image`
    width: 30px;
    height: 30px;
    align-self: center;
`

export const ButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    align-self: center;
    padding: 8px;
`
