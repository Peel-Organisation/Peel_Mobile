import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const GifArea = styled.SafeAreaView`
    height: ${DIMENSION_HEIGHT - 600}px;
    width: ${DIMENSION_WIDTH - 90}px;
    border-radius: 15px;
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    overflow: hidden;
    margin-bottom: 2%;
    margin-top: 2%;  
`
export const GifImage = styled.Image`
    flex:1;
    width: 100%;
    border-radius: 15px;
`

