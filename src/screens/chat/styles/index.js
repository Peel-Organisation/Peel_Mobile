import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom = styled.View`
    background-color: ${props => props.theme.background};
    width: 100%;
`

export const KeyboardAvoidingViewCustom = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${props => props.theme.background};
    height: 100%;
    bottom: 20px;
    /* align-content : flex-end; 
    justify-content: flex-end; */
    /* bottom: 0px; */
`