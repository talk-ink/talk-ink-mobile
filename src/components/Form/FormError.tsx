import fonts from '@/assets/fonts';
import React from 'react';
import {Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type TProps = {
  children?: React.ReactNode;
};

const FormError = ({children}: TProps) => {
  return (
    <Text
      style={{
        color: 'red',
        fontSize: wp('3%'),
        fontFamily: fonts.regular400,
        marginTop: 5,
      }}>
      {children}
    </Text>
  );
};

export default FormError;
