import {View, Text, StatusBar, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';
import {ScrollView} from 'react-native-gesture-handler';
import Layout from '../index';
import images from '@/assets/images';

type Props = {
  children?: React.ReactNode;
};

const LoginRegisterLayout = ({children}: Props) => {
  const tailwind = useTailwind();
  return (
    <Layout>
      <View style={tailwind('justify-center')}>
        <Image
          source={images.brand}
          style={{...tailwind('w-6/12'), resizeMode: 'contain'}}
        />
      </View>
      <View style={{height: '100%', backgroundColor: 'red'}}>
        <View>{children}</View>
      </View>
    </Layout>
  );
};

export default LoginRegisterLayout;
