import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const SettingsView =  styled.View`
    flex: 1;
    align-items: center;
    /* justify-content: center; */
    background-color: ${props => props.theme.background};
    height: 100%;
`

export const SettingsList = styled.ScrollView`
    width: 100%;
    /* background-color: ${props => props.theme.background}; */
    /* align-items: center; */
`


export const Button_Settings = styled.TouchableOpacity`
    width: 110%;
    height: 150px;
    border: 1px solid ${props => props.theme.sub_text};
    /* margin: 10px; */
    background-color: ${props => props.theme.background};
`
export const Button_Settings_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    /* align-self: center; */
    padding-top: 10px;
    margin-left: 50px;
`

export const SettingsTitle = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
    padding-top: 10px;
    padding-bottom: 10px;
`