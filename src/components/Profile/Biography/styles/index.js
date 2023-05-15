import styled from 'styled-components/native';

export const BioInput = styled.TextInput`
    /* width: 80%; */
    height: 50%;
    margin: 5%;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.grey};
    background-color: white;
    color: ${props => props.theme.text};
`