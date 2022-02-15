import React from 'react';

import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTailwind} from 'tailwind-rn/dist';

const Splash = ({navigation}) => {
  const tailwind = useTailwind();
  return (
    <SafeAreaView>
      <View style={tailwind('h-full bg-red-300')}>
        <Text>awewae</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
