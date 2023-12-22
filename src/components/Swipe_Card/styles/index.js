import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard = styled.SafeAreaView`
    width: ${DIMENSION_WIDTH - 40}px;
    height: ${DIMENSION_HEIGHT - 240}px;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
    padding: 15px;
    border: 5px solid white;
    ${Platform.OS === 'android' ? 'elevation: 3' : 'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.1; shadow-radius: 4px;'};
`
export const UserCont = styled.SafeAreaView`
    display: block;
    padding: 5px;
    /* background-color: blue; */
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

export const Biography = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border-radius: 10px;
    border: 2px solid ${props => props.theme.background_button_border};
    width: auto;
    max-height: 20%;
    padding: 15px;
`

export const BiographyText = styled.Text`
    font-size: 15px;
    color: ${props => props.theme.text};
    line-height: 20px;
    text-align: justify;
`



export const InteretView = styled.SafeAreaView`
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    /* align-items: start; */
   
`


// .tags {
//     margin-top: 10px;
// }

// .tag {
//     display: inline-block;
//     padding: 5px 10px;
//     margin-right: 10px;
//     background-color: #3498db;
//     color: #fff;
//     border-radius: 4px;
//     font-size: 14px;
// }

export const InteretBox = styled.Text`
    background-color: ${props => props.theme.primary};
    padding: 5px 10px;
    border-radius: 8px;
    margin: 10px 0px;
    width: 15px;
    font-size: 14px;
    color: ${props => props.theme.text};
`

export const InteretTitle = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.text};
    display: flex;
    width: 116px;
    height: 28px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
`

export const InteretText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
`




export const QuestionView = styled.SafeAreaView`
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

export const MovieImage = styled.Image`
    width: 100%;

`

export const MusicImage = styled.Image`
    width: 100%;
    min-width: 100%;
    height: 100px;
    border-radius: 10px;
`
