import {
  View,
  Text,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import React from 'react';
import colors from '@/utils/themes/colors';
import fonts from '@/assets/fonts';
import {TextStyle} from 'react-native';

interface Props extends TextInputProps {
  style?: TextStyle;
}

const TextInput = ({style, ...rest}: Props) => {
  return (
    <RNTextInput
      style={{
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        color: colors.black,
        fontFamily: fonts.regular400,
        paddingLeft: 0,
        paddingVertical: 5,
        ...style,
      }}
      placeholderTextColor={colors.grey}
      {...rest}
    />
  );
};

export default TextInput;
