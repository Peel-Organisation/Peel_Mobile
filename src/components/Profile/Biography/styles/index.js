import styled from 'styled-components/native';

export const BioInput = styled.TextInput`
    margin: 5%;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.grey};
    background-color: white;
    color: ${props => props.theme.text};
`