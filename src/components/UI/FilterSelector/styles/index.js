import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity `
    background-color: ${props => props.theme.not_selected};;
    width: 100%;
    height: 36px;
    border-radius: 8px;
    margin-bottom: 6px;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
`
export const FilterText = styled.Text `
    font-size: 16px;
    color: black;
`