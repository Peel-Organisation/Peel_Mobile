import { Text, Button } from 'react-native';
import { useTranslation } from "react-i18next";

import { ViewCustom, CustomRetryButton } from './styles';

const RetryButton = ({ error, retryFunc }) => {
    const { t } = useTranslation();

    return (
        <ViewCustom>
            <Text>{error}</Text>
            <CustomRetryButton onPress={() => retryFunc()} >
                <Text>{t("retry")}</Text>
            </CustomRetryButton>
        </ViewCustom>
    );
};

export default RetryButton;