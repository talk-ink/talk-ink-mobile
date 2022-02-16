import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import {ScrollView} from 'react-native-gesture-handler';
import Layout from '../index';
import images from '@/assets/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '@/utils/themes/colors';
import fonts from '@/assets/fonts';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const LoginRegisterLayout = ({children, title}: Props) => {
  return (
    <Layout scrollable>
      <View style={{marginHorizontal: wp('10%'), marginTop: hp('2%')}}>
        <View>
          <Image
            source={images.brand}
            style={{
              width: wp('40%'),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#312e81',
              fontFamily: fonts.semiBold600,
              fontSize: wp('8%'),
              textAlign: 'center',
              marginTop: hp('3%'),
            }}>
            {title}
          </Text>
        </View>
        <View>
          <View>{children}</View>
        </View>
      </View>
    </Layout>
  );
};

export default LoginRegisterLayout;
