import { Dimensions } from "react-native";
import styled from 'styled-components/native';



const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const UserMessage = styled.SafeAreaView`
    background-color: ${props => props.theme.user_message};
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    align-self: flex-end;
    max-width: 70%;
    width: 50%;
`

export const UserMessageText = styled.Text`
    font-size: 14px;
    width: 100%;
    padding: 7px;
    color: ${props => props.theme.background};
    text-align: left;
`

export const UserMessageDate = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.background};
    padding: 5px;
    text-align: right;
`

export const ContactMessage = styled.SafeAreaView`
    background-color: ${props => props.theme.contact_message};
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    align-self: flex-start;
    max-width: 70%;
    width: 50%;
`

export const ContactMessageText = styled.Text`
    font-size: 14px;
    width: 100%;
    padding: 7px;
    text-align: left;
`

export const ContactMessageDate = styled.Text`
    font-size: 10px;
    color: ${props => props.theme.black};
    text-align: right;
    padding: 5px;
`

export const CustomFlatList = styled.SafeAreaView`
    bottom: 50px;
    padding: 10px;
    flex-direction: column;
    height: 88%;
    background-color: ${props => props.theme.background};
`