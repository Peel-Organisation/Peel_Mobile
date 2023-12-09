import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const InteretTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    `

export const InteretView = styled.SafeAreaView`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    
    /* width: 100%; */
    /* display: block; */
    /* display:inline; */
    `

export const InteretBox = styled.Text`
    background-color: ${props => props.theme.primary};
    border-radius: 10px;
    padding: 2%;
    margin: 10px 0px;
`

export const InteretText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
`
