import styled from 'styled-components/native';

export const InterestButton = styled.TouchableOpacity`
    /* width: 70%; */
    padding: 2%;
    margin: 5%;
    border-radius: 4px;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.background};
`

export const InterestView = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InterestButtonSelected = styled.TouchableOpacity`
    /* width: 70%; */
    padding: 2%;
    margin: 5%;
    border-radius: 4px;
    background-color: red;
    color: ${props => props.theme.background};
`

export const InterestButtonDisabled = styled.TouchableOpacity`
    /* width: 70%; */
    padding: 2%;
    margin: 5%;
    border-radius: 4px;
    background-color: grey;
    color: ${props => props.theme.background};
`

export const InterestButtonText = styled.Text`
    font-size: 20px;
    color: ${props => props.theme.background};
    align-self: center;
`