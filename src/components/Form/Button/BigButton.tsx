import {
  View,
  Text,
  Button,
  ButtonProps,
  Pressable,
  PressableProps,
} from 'react-native';
import React from 'react';
import colors from '@/utils/themes/colors';
import fonts from '@/assets/fonts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface IProps extends PressableProps {
  title?: string;
  loading?: boolean;
}

const BigButton = ({title, loading, ...rest}: IProps) => {
  return (
    <View style={{borderRadius: hp('10%'), overflow: 'hidden'}}>
      <Pressable
        style={{
          backgroundColor:
            rest?.disabled || loading ? colors.lightGrey : colors.primary,
          paddingVertical: hp('2%'),
        }}
        {...rest}
        android_ripple={{color: colors.lightGrey}}>
        <Text
          style={{
            fontFamily: fonts.semiBold600,
            color: rest?.disabled ? colors.grey : colors.white,
            alignSelf: 'center',
          }}>
          {loading ? 'Loading...' : title}
        </Text>
      </Pressable>
    </View>
  );
};

export default BigButton;
