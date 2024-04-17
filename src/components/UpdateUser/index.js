import React, { useState, useEffect, PureComponent } from "react";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../functions/api_request";
import { Next_Button, Next_Button_Text, Prev_Button, Prev_Button_Text, NavigatorView } from './styles';

// Export UpdateButton component
export const UpdateButton = (props) => {
    const user = props.user;
    const nextPage = props.nextPage;
    const prevPage = props.prevPage;
    const navigation = props.navigation;

    return (
        <NavigatorView>
            <PrevButton prevPage={prevPage} navigation={navigation} user={user} />
            <NextButton nextPage={nextPage} navigation={navigation} user={user} />
        </NavigatorView>
    );
}

// Export NextButton component
export const NextButton = (props) => {
    const { t } = useTranslation();
    const nextPage = props.nextPage;
    const navigation = props.navigation;
    const user = props.user;

    if (!nextPage) {
        return null;
    }

    return (
        <Next_Button onPress={() => nextAction(nextPage, navigation, user)}>
            <Next_Button_Text>{t("profile_navigator.next_button")}</Next_Button_Text>
        </Next_Button>
    );
}

// Export PrevButton component
export const PrevButton = (props) => {
    const { t } = useTranslation();
    const prevPage = props.prevPage;
    const navigation = props.navigation;
    const user = props.user;

    if (!prevPage) {
        return null;
    }

    return (
        <Prev_Button onPress={() => prevAction(prevPage, navigation, user)}>
            <Prev_Button_Text>{t("profile_navigator.prev_button")}</Prev_Button_Text>
        </Prev_Button>
    );
}

// Export nextAction function
export const nextAction = (nextPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(nextPage);
}

// Export prevAction function
export const prevAction = (prevPage, navigation, user) => {
    updateUser(user);
    navigation.navigate(prevPage);
}
