import styled from 'styled-components/native';

export const Section = styled.SafeAreaView`
    background-color: ${props => props.theme.background};
    border: 2px solid ${props => props.theme.background_button_border};
    border-radius: 10px;
    width: auto;
    height: 20%;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;   
`;