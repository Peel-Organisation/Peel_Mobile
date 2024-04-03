import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;


export const Biography = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    height: 120px;
    width: 100%;
    margin-top: 4%;
    border-radius: 10px;
    margin-bottom: 2%;
    align-self: center;
`
export const BiographyText = styled.Text`
    font-size: 12px;
    padding: 10px;
    letter-spacing: 1px;
    color: ${props => props.theme.text};
    text-align: justify;
    line-height: 22px;   
`
export const Ellipsis = styled.Text`
    color:  ${props => props.theme.ellipsisColor || 'gray'};
    font-size: 12px;
    padding: 5px;
`

export const BiographyTitle = styled.Text`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    color: ${props => props.theme.text};
`

export const BiographyFull = styled.TouchableOpacity`
    font-size: 16px;
    align-items: flex-end;
    color: ${props => props.theme.primary};
`