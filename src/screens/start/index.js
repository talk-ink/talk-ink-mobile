import React from 'react';

import {Text, View, Image} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Layout from '@components/layouts';
import {useAuthContext} from '@utils/context/auth';
import Button from '@components/atoms/button';

import images from '@assets/images';

import * as colors from '@utils/themes/colors';
import fonts from '@utils/fonts';

const Start = ({navigation}) => {
  const [state, dispatch] = useAuthContext();

  const startApp = async () => {
    try {
      dispatch({
        type: 'START_APP',
      });
      // await AsyncStorage.setItem('isStart', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout
      style={{
        padding: wp('5%'),
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: hp('3%'),
          marginTop: hp('1%'),
        }}>
        <Image
          source={images.dw}
          style={{width: wp('15%'), height: hp('5%')}}
          resizeMode="contain"
        />
      </View>
      <Text
        style={{
          fontFamily: fonts.semiBold600,
          fontSize: wp('4.5%'),
          paddingLeft: 8,
          paddingRight: 8,
          width: '100%',
          color: colors.BLACK,
          textAlign: 'center',
        }}>
        Get Hired as Full Stack Developer at{' '}
        <Text
          style={{
            fontWeight: 'bold',

            color: colors.PRIMARY,
          }}>
          150+ hiring partners
        </Text>
      </Text>
      <Image
        source={images.dwPartner}
        style={{
          marginBottom: hp('1%'),
          width: '100%',
          height: hp('25%'),
        }}
        resizeMode="stretch"
      />
      <Text
        style={{
          fontFamily: fonts.semiBold600,
          fontSize: wp('4%'),
          paddingLeft: 8,
          paddingRight: 8,
          width: '100%',
          color: colors.BLACK,
          textAlign: 'center',
        }}>
        Be a part of our successful Alumni
      </Text>
      <Image
        source={images.alumni}
        style={{
          marginBottom: hp('2%'),
          marginTop: hp('2%'),
          width: '100%',
          height: hp('34%'),
        }}
        resizeMode="stretch"
      />

      <Button
        onPress={startApp}
        contentStyle={{
          height: hp('7%'),
        }}>
        Mulai
      </Button>
    </Layout>
  );
};

export default Start;
