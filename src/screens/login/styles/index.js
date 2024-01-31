import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    /* justify-content: center; */
    background-color: ${props => props.theme.background};
`

export const BarStyle = styled.View`
    background-color: #F5F5F5;
    border: 1px solid #F5F5F5;
    height: 1px;
    margin-top: 10px;
    width: 120px;
`;

export const ButtonOrange = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ButtonOrangeText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
`

export const Spacer = styled.SafeAreaView`
    height: 100px;
`

export const Header = styled.SafeAreaView`
    width: ${DIMENSION_WIDTH}px;
    height: 100px;
    background-color: ${props => props.theme.primary};
    align-items: center;
    justify-content: center;
`

export const HeaderText = styled.Text`
    font-size: 25px;
    font-weight: lighter;
    letter-spacing: 4px;
    color: ${props => props.theme.background};
`

export const FieldInput = styled.TextInput`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const PasswordInput = styled.TextInput`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const Link = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.primary};
`

export const Title = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
`

export const MainText = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.text};
`
