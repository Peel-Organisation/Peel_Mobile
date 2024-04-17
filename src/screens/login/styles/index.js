import { Dimensions } from "react-native";
import styled from 'styled-components/native';

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const ViewCustom = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.background};
`

export const BarStyle = styled.View`
    width: ${DIMENSION_WIDTH-250}px;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.background};
    height: 1px;
    margin-top: 10px;
`;

export const ButtonOrange = styled.TouchableOpacity`
    width: 60%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ButtonOrangeText = styled.Text`
    font-size: 18px;
    text-align: center;
    letter-spacing: 2px; 
    color: ${props => props.theme.background};
    padding: 12px;
`

export const Spacer = styled.View`
    height: 50px;
`

export const Header = styled.SafeAreaView`
    width: ${DIMENSION_WIDTH}px;
    height: 130px;
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
    width: ${DIMENSION_WIDTH-70}px;
    margin-top: 20px;
    padding : 10px;
    font-size: 13px;
    border: 1px solid  ${props => props.theme.grey};
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    letter-spacing: 4px;
`

export const PasswordInput = styled.TextInput`
    width: ${DIMENSION_WIDTH-70}px;
    padding : 10px;
    font-size: 13px;
    border: 1px solid  ${props => props.theme.grey};
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    letter-spacing: 4px;
`

export const Link = styled.Text`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 10px;  
    color: ${props => props.theme.primary};
`

export const Title = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.primary};
`

export const MainText = styled.Text`
    font-size: 16px;
    letter-spacing: 1px;
    color: ${props => props.theme.text};
`
