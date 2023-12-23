import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import CardStack from "react-native-card-stack-swiper";




export const CardStackView = styled(CardStack)`
    width: ${DIMENSION_WIDTH - 40}px;
    height: ${DIMENSION_HEIGHT - 230}px;
    align-self: center;
    margin-top: 4%;
    border-radius: 15px;
`

export const ButtonStack = styled.SafeAreaView`
    margin-top: 5%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    position: relative;
`

export const Button = styled.TouchableOpacity`
    background-color: white;
    border-radius: 30px;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    ${Platform.OS === 'android' ? 'elevation: 3' : 'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.1; shadow-radius: 4px;'};
`

export const Icon = styled.Image`
    width: 50%;
    height: 50%;

`
export const ModalButton = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ModalButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
`
