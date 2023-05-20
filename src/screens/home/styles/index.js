import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Background = styled.View`
    position: absolute;
    background-color: ${props => props.theme.background};
    width: 100%;
    height: 100%;
`
export const BackgroundTop = styled.View`
    position: absolute;
    background-color: ${props => props.theme.primary};
    width: 100%;
    height: 45%;
    border-bottom-left-radius: 39px;
    border-bottom-right-radius: 39px;
`

export const Container = styled.View`
    width: 100%;
    height: 100%;
    /* border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px; */
`

export const Header =  styled.View`
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleText = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.background};
`

export const FilterIcon = styled.TouchableOpacity `
    position: absolute;
    left: 7%;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    background-color: rgba(255, 251, 236, 0.35);
    justify-content: center;
    align-items: center;
`
export const FilterIconImg = styled.Image `
    width: 30px;
    height: 30px;
`

export const Filter = styled.View `
    position: absolute;
    width: 100%;
    height: 50%;
    background-color: ${props => props.theme.primary};
    border-bottom-left-radius: 39px;
    border-bottom-right-radius: 39px;
`