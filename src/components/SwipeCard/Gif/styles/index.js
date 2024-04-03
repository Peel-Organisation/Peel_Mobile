import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const GifArea = styled.SafeAreaView`
    height: ${DIMENSION_HEIGHT - 500}px;
    width: ${DIMENSION_WIDTH - 90}px;
    /* background-color: ${props => props.theme.background}; */
    align-self: center;
    overflow: hidden;
    border-radius: 15px;
    margin-top: 2%;  
`

export const GifImage = styled.Image`
    height: 100%;
    width: 100%;
    flex: 1;
    border-radius: 20px; 
`

