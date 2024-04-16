import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const Header = styled.SafeAreaView`
    width: ${DIMENSION_WIDTH}px;
    height: 100px;
    background-color: ${props => props.theme.primary};
    align-items: center;
    justify-content: center;
`
export const HeaderText = styled.Text`
    font-size: 25px;
    letter-spacing: 4px;
    color: ${props => props.theme.background};
`

export const BarStyle = styled.View`
    width: ${DIMENSION_WIDTH-250}px;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.background};
    height: 1px;
    margin-top: 10px;
`

export const SettingsView = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.background};
`
export const ButtonSettings = styled.TouchableOpacity`
    width: 100%;
    padding: 5%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.theme.background};;
`

export const IconSettings = styled.Image`
    width: 30px;
    height: 30px;
    margin-right: 10%;
`

export const SettingsList = styled.ScrollView`
    width: 100%;    
    background-color: ${props => props.theme.background};
`


export const ButtonSettingsText = styled.Text`
    font-size: 20px;
    letter-spacing: 2px;
    color: ${props => props.theme.text};
`

