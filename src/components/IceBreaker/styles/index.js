import styled from 'styled-components/native';

export const Container = styled.View`
    height: 100%;
    top: 20px;
`

export const QuestionButton = styled.TouchableOpacity`
    background-color: ${props => props.theme.user_message};
    width: 93%;
    border-radius: 10px;
    padding: 10px;
    `
export const Question = styled.Text`
    color: ${props => props.theme.white};
`