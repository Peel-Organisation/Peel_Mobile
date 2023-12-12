import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity `
    flex: 1;
    height: 50px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.primary ? props.theme.white : 'rgba(255, 255, 255, 0.5)')};
`
export const FilterText = styled.Text `
    font-size: 16px;
    color: black;
`