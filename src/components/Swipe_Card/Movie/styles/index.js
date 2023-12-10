import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const MovieImage = styled.Image`
    width: 100%;
    min-width: 100%;
    height: 100px;
    border-radius: 10px;
`
