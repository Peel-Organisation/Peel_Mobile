import styled from "styled-components/native";

export const FieldInput = styled.TextInput`
    width: 80%;
    height: 50px;
    /* margin: 10px; */
    margin-top: 10px;
    border-radius: 10px;
    background-color: ${props => props.theme.background};
    border: 1px solid ${props => props.theme.primary};
    color: ${props => props.theme.text};
`