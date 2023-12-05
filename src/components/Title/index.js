import React from "react";

import { SafeAreaView, Text } from "react-native";

const Title = (props) => {
    return (
        <SafeAreaView>
            <Text>{props.title}</Text>
        </SafeAreaView>);
}


export default Title;