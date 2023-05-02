import styled from 'styled-components/native';

export const BioInput = styled.TextInput`
    /* width: 80%; */
    height: 50%;
    margin: 10px;
    border-radius: 10px;
    background-color: white;
    color: ${props => props.theme.text};
`