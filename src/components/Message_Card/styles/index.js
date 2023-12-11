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
    right: 0px;
    
`


export const UserMessageText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.background};
    text-align: left;
`

export const ContactMessage = styled.SafeAreaView`
    background-color: ${props => props.theme.contact_message};
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    align-self: flex-start;
    max-width: 70%;
`

export const ContactMessageText = styled.Text`
    font-size: 14px;
    color: ${props => props.theme.black};
    text-align: left;
`

export const CustomFlatList = styled.SafeAreaView`
    /* background-color: ${props => props.theme.background}; */
    bottom: 50px;
    /* border-radius: 5px; */
    /* word-wrap:break-word; */
    padding: 10px;
    /* margin: 10px 0; */
    flex-direction: column;
    
    /* flex-grow: 1; */
    /* min-width: 120px; */
    /* width: 100%; */
    height: 88%;
    background-color: ${props => props.theme.background};
`