import React, { useState, useEffect } from "react";
import { GetContactList } from "../../functions/api_request";

// const dateformat = require('dateformat');
import { View } from "react-native";

import { ContactView, Button_Contact, Button_Contact_Text, ContactTitle, Container, NewMatchTitle, NewMatchView, Button_Contact_Sub_Text, Button_New_Contact, Button_New_Contact_Text, OrangeView } from './styles';
import Loading from "../../components/loading";
import  { getStorage } from '../../functions/storage';

import { useTranslation } from "react-i18next";

 
const Contact = ({navigation}) => {

    const { t } = useTranslation();

    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState()

    useEffect(() => {
        getStorage('userId').then(userId => {
            setUserId(userId)
        })
        GetContactList().then(list => {
            if (list != undefined) {
                setContactList(list);
                setLoading(false);
            } 
        })
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <ContactView className="message-app">
            <OrangeView>
                <NewMatchTitle>{t("Contact.newMatchs")}</NewMatchTitle>
                <NewMatchView>
                    {contactList.map((contact, index) => {
                        let name = ""
                        if (contact.members[0]._id == userId){
                            name = contact?.members[1]?.firstName
                        } else {
                            name = contact?.members[0]?.firstName 
                        }
                        console.log("contact : ", contact)
                        if (contact.last_message_content == undefined) {
                            
                            return(
                                <Button_New_Contact key={index} onPress={() => {
                                    navigation.navigate('Chat', {conversation : contact, name : name})
                                }}>
                                    <Button_New_Contact_Text>{name}</Button_New_Contact_Text>
                                </Button_New_Contact>
                            )
                        }
                    })}
                </NewMatchView>
            </OrangeView>
            <ContactTitle>{t("Contact.title")}</ContactTitle>
            {contactList.map((contact, index) => {
                let name = ""
                    if (contact.members[0]._id == userId){
                        name = contact?.members[1]?.firstName
                    } else {
                        name = contact?.members[0]?.firstName 
                    }
                if (contact.last_message_content != undefined) {
                    return(
                        <Container key={index}>
                            <Button_Contact onPress={() => {
                                navigation.navigate('Chat', {conversation : contact, name : name})
                            }}>
                                <Button_Contact_Text>{name }</Button_Contact_Text>
                                    <View>
                                        <Button_Contact_Sub_Text>{contact.last_message_content}</Button_Contact_Sub_Text>
                                    </View>
                                </Button_Contact>
                        </Container>
                    )
                }
            })}
        </ContactView>
    );
}

export default Contact;
