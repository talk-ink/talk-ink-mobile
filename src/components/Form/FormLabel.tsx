import fonts from '@/assets/fonts';
import colors from '@/utils/themes/colors';
import React from 'react';
import {Text, TextStyle} from 'react-native';
import RequiredSymbol from './RequiredSymbol';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type TProps = {
  children?: React.ReactNode;
  isRequired?: boolean;
  style?: TextStyle;
};

const FormLabel = ({children, isRequired, style}: TProps) => {
  return (
    <Text
      style={{
        fontSize: wp('3.2%'),
        fontFamily: fonts.semiBold600,
        color: colors.black,
        ...style,
      }}>
      {children} {isRequired && <RequiredSymbol />}
    </Text>
  );
};

export default FormLabel;
