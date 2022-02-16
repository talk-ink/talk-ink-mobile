import images from '@/assets/images';
import React from 'react';

import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';

const Splash = () => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <View style={tailwind('h-full bg-white items-center justify-center')}>
        <Image
          source={images.brand}
          style={{...tailwind('w-6/12'), resizeMode: 'contain'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
