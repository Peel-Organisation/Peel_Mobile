import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard =  styled.View`
    background-color: white;
    border-radius: 20px;
    margin: 5%;
    padding: 5%;
    height: 100%;
    max-height: 600px;

`    /* width: 80%; */

export const Name = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
    align-self: center;
`

export const BiographyTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    margin: 5%;
`

export const Biography = styled.View`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    margin: 5%;
`

export const BiographyText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    margin: 5%;
`

export const InteretTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    margin: 5%;
`

export const InteretView = styled.View`
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
    border-radius: 30px;
    margin: 1%;
    padding: 2%;
`

export const InteretText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
`

export const QuestionView = styled.View`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    margin: 5%;
`

export const QuestionText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    margin-left: 5%; 
    font-weight: bold;
    text-align: center;
`

export const ResponseText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    margin-left: 5%;
    text-align: center;
    padding: 5px;
`
