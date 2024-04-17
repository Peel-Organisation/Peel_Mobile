import { Dimensions } from "react-native";
import styled from 'styled-components/native';
import CardStack from "react-native-card-stack-swiper";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export const CardStackView = styled(CardStack)`
    width: ${DIMENSION_WIDTH - 40}px;
    height: ${DIMENSION_HEIGHT - 270}px;
    align-self: center;
    margin-top: 3%;
    border-radius: 15px;
`

export const ButtonStack = styled.SafeAreaView`
    margin-top: 2%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    position: relative;
`

export const Button = styled.TouchableOpacity`
    background-color: white;
    border-radius: 30px;
    width: 45px;
    height: 45px;
    align-items: center;
    justify-content: center;
    ${Platform.OS === 'android' ? 'elevation: 3' : 'shadow-color: #000; shadow-offset: 0 2px; shadow-opacity: 0.1; shadow-radius: 4px;'};
`

export const Icon = styled.Image`
    width: 50%;
    height: 50%;
`

export const ModalButton = styled.TouchableOpacity`
    align-self: center;
    width: 60%;
    height: 50px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const ModalButtonText = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.background};
    align-self: center;
    padding-top: 10px;
`

export const ModalTitle = styled.Text`
    font-size: 18px;
    color: ${props => props.theme.primary};
    align-self: center;
    margin-bottom: 3%;
`

export const ModalQuestion = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${props => props.theme.text};
    margin-top: 3%;
    margin-bottom: 3%;
`

export const ModalWarning = styled.Text`
    font-size: 12px;
    font-style: italic;
    text-align: justify;
    color: ${props => props.theme.text};
    margin-top: 3%;
    margin-bottom: 3%;
`
