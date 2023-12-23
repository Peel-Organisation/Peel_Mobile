import React, { useState, useEffect } from "react";
import { GetContactList } from "../../functions/api_request";
import { ContactView, ContactTitle, NewMatchTitle, NewMatchView, OrangeView } from './styles';
import Loading from "../../components/loading";
import { getStorage } from '../../functions/storage';
import crashlytics from '@react-native-firebase/crashlytics';
import { useTranslation } from "react-i18next";
import { ButtonContact, ButtonContactText, Container, ButtonContactSubText } from './styles';
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import RetryButton from "../../components/Retry";


const Contact = ({ navigation }) => {

    const { t } = useTranslation();

    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState()
    const [retry, setRetry] = React.useState(false);
    const [error, setError] = React.useState("");

    useEffect(() => {
        crashlytics().log("Contact screen mounted");
        getContactList()
    }, []);

    const getContactList = () => {
        setLoading(true);
        setRetry(false);
        setError("");
        getStorage('userId').then(userId => {
            setUserId(userId)
        }).catch((error) => {
            crashlytics().recordError(error)
        })
        GetContactList().then(list => {
            if (list != undefined) {
                setContactList(list);
                setLoading(false);
            }
        }).catch((error) => {
            crashlytics().recordError(error)
            setError(error.message);
            setRetry(true);
            setLoading(false);
        })
    }


    const refresh = () => {
        setLoading(true);
        getContactList();
    }

    if (loading) {
        return (
            <Loading />
        );
    }
    if (retry) {
        return (
            <RetryButton error={error} retryFunc={() => getContactList()} />
        )
    }


    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
        }>
            <ContactView className="message-app">
                <OrangeView>
                    <NewMatchTitle>{t("Contact.newMatchs")}</NewMatchTitle>
                    <NewMatchView>
                        {contactList.map((contact) => (<ContactCard contact={contact} key={contact?._id} userId={userId} navigation={navigation} newContact={true} />))}
                    </NewMatchView>
                </OrangeView>
                <ContactTitle>{t("Contact.title")}</ContactTitle>
                {contactList.map((contact) => (<ContactCard contact={contact} key={contact?._id} userId={userId} navigation={navigation} newContact={false} />))}
            </ContactView>
        </ScrollView>
    );
}

const ContactCard = ({ contact, userId, navigation, newContact }) => {
    let name = ""
    if (contact.members[0]._id == userId) {
        name = contact?.members[1]?.firstName
    } else {
        name = contact?.members[0]?.firstName
    }
    if ((newContact && contact.last_message_content != undefined) || (!newContact && contact.last_message_content == undefined)) {
        return null
    }
    return (
        <Container>
            <ButtonContact onPress={() => {
                navigation.navigate('Chat', { conversation: contact, name: name })
            }}>
                <ButtonContactText>{name}</ButtonContactText>
                <ButtonContactSubText>{contact.last_message_content}</ButtonContactSubText>
            </ButtonContact>
        </Container>
    )
}




export default Contact;
