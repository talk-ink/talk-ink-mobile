import fonts from '@/assets/fonts';
import React from 'react';

import {Text, TextStyle} from 'react-native';

type TProps = {
  style?: TextStyle;
};

const RequiredSymbol = ({style}: TProps) => {
  return (
    <Text
      style={{
        color: 'red',
        fontSize: 14,
        fontFamily: fonts.semiBold600,
        ...style,
      }}>
      *
    </Text>
  );
};

export default RequiredSymbol;
