import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const NavigatorView = styled.SafeAreaView`
    flex-direction: row;
    width: 100%;
    height: 11%;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 0%;
    background-color: ${props => props.theme.background};
`

export const Next_Button = styled.TouchableOpacity`
    width: 40%;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const Next_Button_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    margin: 10px;
    letter-spacing: 1px;
`

export const Prev_Button = styled.TouchableOpacity`
    width: 40%;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const Prev_Button_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    margin: 10px;
    letter-spacing: 1px;
`