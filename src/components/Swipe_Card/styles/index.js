import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard =  styled.View`
    background-color: white;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 7%;
`
export const UserCont = styled.View `
    margin: 0px 0px 15px 0px;
`

export const Name = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    align-self: center;
`
export const Locate = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.sub_text};
    align-self: center;
`

export const Biography = styled.View`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.background_button_border};
    margin: 10px 0px;
    `

export const BiographyText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    `

export const InteretTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
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
    padding: 2%;
    margin: 10px 0px;
`

export const InteretText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
`

export const QuestionView = styled.View`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.background_button_border};
`

export const QuestionText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    font-weight: bold;
    text-align: center;
`

export const ResponseText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    text-align: center;
    padding: 5px;
`

export const GifImage = styled.Image`
    width: 100%;
    min-width: 100%;
    height: 200px;
    border-radius: 13px;
`
