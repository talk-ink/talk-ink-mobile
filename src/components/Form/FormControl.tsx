import React from 'react';
import {View, ViewStyle} from 'react-native';

type TProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
};

const FormControl = ({children, style}: TProps) => {
  return (
    <View
      style={{
        marginBottom: 16,
        ...style,
      }}>
      {children}
    </View>
  );
};

export default FormControl;
