import { Dimensions, Platform } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const HomeCard = styled.FlatList`
    width: ${DIMENSION_WIDTH - 40}px;
    height: ${DIMENSION_HEIGHT - 270}px;
    background-color: white;
    border-radius: 15px;
    padding: 15px;
    border: 5px solid white;
    ${Platform.OS === 'android' ? 'elevation: 3' : 'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.1; shadow-radius: 4px;'};
`

export const Block = styled.View`
    justify-content: center;
    align-items: flex-start;
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