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

export const IconSettings = styled.Image`
    width: 30px;
    height: 30px;
    margin-left: 10px;
`

export const BarStyle = styled.View`
    width: ${DIMENSION_WIDTH-250}px;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.background};
    height: 1px;
    margin-top: 10px;
`;

export const SettingsView = styled.SafeAreaView`
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
    width: 100%;
    height: 70px;
    border: 1px solid ${props => props.theme.background_button_border};
    /* margin: 10px; */
    background-color: ${props => props.theme.background};;
`
export const Button_Settings_Text = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.text};
    /* align-self: center; */
    padding-top: 10px;
    margin-left: 50px;
`

