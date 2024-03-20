import styled from 'styled-components/native';
import { Dimensions } from "react-native";


const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;


export const CustomFlatList = styled.SafeAreaView`
    /* background-color: ${props => props.theme.background}; */
    top: 0px;
    bottom: ${DIMENSION_HEIGHT * 0.1}px;
    /* border-radius: 5px; */
    /* word-wrap:break-word; */
    padding: ${DIMENSION_WIDTH * 0.01}px;
    /* margin: 10px 0; */
    flex-direction: column;
    
    /* flex-grow: 1; */
    /* min-width: 120px; */
    /* width: 100%; */
    height: ${DIMENSION_HEIGHT * 0.72}px;
    background-color: ${props => props.theme.background};
`