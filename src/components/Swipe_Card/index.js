import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Image } from "react-native";
import {HomeCard, Name, Biography, BiographyText, InteretTitle, InteretBox, InteretView, InteretText, QuestionView, QuestionText, ResponseText, GifImage, Locate, UserCont} from './styles';




const Swipe_Card = (props) => { 

    const { t } = useTranslation();

    const [User, setUser] = useState(props.User)

    const getAge = (birthday) => {
        birthday = new Date(birthday)
        let now = new Date()
        var month_diff = (now.getTime() - birthday.getTime())
        //convert the calculated difference in date format  
        var age_dt = new Date(month_diff);
        //extract year from date      
        var year = age_dt.getUTCFullYear();
        //now calculate the age of the user  
        var user_age = Math.abs(year - 1970);

        return user_age
    }
    


    return (
        <HomeCard>
            <UserCont>
                <Name>
                    {User.firstName} {getAge(User.birthday)}
                </Name>
                <Locate>? km de vous</Locate>
            </UserCont>
            {User.gif != undefined && User.gif != "" && User.gif != null ? (
                <View>
                    <GifImage
                    source={{
                        uri: `${User?.gif?.image?.webp}`,
                    }}
                    />
                </View>
            ) : (
                <View>
                    <Text>no gif</Text>
                </View>
            )}
            <Biography>
                <BiographyText>
                    {User.biographie}
                </BiographyText>
            </Biography>
            <InteretTitle>{t("Card.interest")}</InteretTitle>
            <InteretView>
                {User.interests?.map((interet) => {
                    return (
                        <InteretBox key={interet._id}>
                            <InteretText>{interet.name}</InteretText>
                        </InteretBox>
                    )
                })}
            </InteretView>

            <QuestionView>
            {User.questions?.map((question) => {
                return (
                    <View key={question._id}>
                        <View>
                            <QuestionText>{question.question?.question}</QuestionText>
                        </View>
                        <View>
                            <ResponseText>{question.answer}</ResponseText>
                        </View>
                    </View>
                ) 
            })}
            </QuestionView>
        </HomeCard >
    );
    }

 
 

export default Swipe_Card; 