import styled from "styled-components/native";
import ModalSelector from 'react-native-modal-selector'

export const ModalSelectorCustom = styled(ModalSelector)`
    border-radius: 10px;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.text};
`

export const InputView = styled.View`
    width: 80%;
    /* flex: 1; */
    align-self: center;
`

export const QuestionView = styled.View`
    width: 100%;
`
export const FieldInput = styled.TextInput`
    height: 50px;
    margin: 10px 0px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
`

export const ValidButton = styled.TouchableOpacity`
    width: 80%;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.primary};
    align-self: center;
    justify-content: center;
`

export const ValidButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.white};
    align-self: center;
`
