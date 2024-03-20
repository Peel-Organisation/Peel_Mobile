import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom = styled.SafeAreaView`
    flex-direction: row;
    background-color: ${props => props.theme.background};
    top: ${DIMENSION_HEIGHT * 0.02}px;
    bottom: ${DIMENSION_HEIGHT * 0.1}px;
`

export const FieldInput = styled.TextInput`
    width: ${DIMENSION_WIDTH * 0.8}px;
    height: ${DIMENSION_HEIGHT * 0.05}px;
    margin: ${DIMENSION_WIDTH * 0.02}px;
    bottom: ${DIMENSION_HEIGHT * 0.01}px;
    border-radius: 10px;
    border: ${DIMENSION_HEIGHT * 0.002}px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.text};
    flex: 1;
`

export const MessageButton = styled.TouchableOpacity`
    width: ${DIMENSION_WIDTH * 0.1}px;
    height: ${DIMENSION_HEIGHT * 0.05}px;
    margin: ${DIMENSION_WIDTH * 0.02}px;
    bottom: ${DIMENSION_HEIGHT * 0.01}px;
    border-radius: 25px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`
export const MessageButtonText = styled.Text`
    top: ${DIMENSION_HEIGHT * 0.01}px;
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
`;

export const SendIcon = styled.Image`
    width: ${DIMENSION_WIDTH * 0.05}px;
    height: ${DIMENSION_HEIGHT * 0.03}px;
    align-self: center;
    margin-top: ${DIMENSION_HEIGHT * 0.01}px;
    margin-left: ${DIMENSION_WIDTH * 0.01}px;
`