import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;


export const Biography = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    height: ${DIMENSION_HEIGHT - 800}px;
    width: auto;
    padding: 10px;
    margin-top: 4%;
    border-radius: 10px;
    margin-bottom: 2%;
`
export const BiographyText = styled.Text`
    font-size: 12px;
    letter-spacing: 1px;
    color: ${props => props.theme.text};
    text-align: justify;
    line-height: 22px;   
`
export const Ellipsis = styled.Text`
    color:  ${props => props.theme.ellipsisColor || 'gray'};
    font-size: 11px;
`

export const BiographyTitle = styled.Text`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    color: ${props => props.theme.text};
`

export const BiographyFull = styled.TouchableOpacity`
    padding: 10px 0px 0px 0px;
    font-size: 16px;
    align-items: flex-end;
    color: ${props => props.theme.primary};
`