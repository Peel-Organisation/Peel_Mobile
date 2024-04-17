import { StatusBar, SafeAreaView, View, Platform } from "react-native";

const StatusBarCustom = ({ bgColor, theme }) => {
    return (
        <View style={{backgroundColor: bgColor}}>
            <SafeAreaView>
                {
                    Platform.OS === 'android' ?
                        <StatusBar barStyle={theme} backgroundColor={bgColor} />
                        : null
                }
                <StatusBar barStyle={theme} />
            </SafeAreaView>
        </View>
    );
};

export default StatusBarCustom;