import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeSwiperView =  styled.View`
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    /* width: 100%; */
    height: 100%
    background-color: ${props => props.theme.background};
    `

export const TitleView =  styled.View`
    align-items: center;
    position: absolute;
    background-color: ${props => props.theme.primary};
    width: 100%;
    height: 50%;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    `

export const TitleText = styled.Text`
    font-size: 30px;
    color: ${props => props.theme.background};
    margin: 5%;
`

export const FilterIcon = styled.TouchableOpacity `
    position: absolute;
    background-color: rgba(255, 251, 236, 0.35);
    border-radius: 22.5px;
    width: 45px;
    height: 45px;
    top: 20px;
    left: 20px;
    align-items: center;
`
export const FilterIconImg = styled.Image `
    top: 8px;
    width: 30px;
    height: 30px;
`