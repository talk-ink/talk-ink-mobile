import React from 'react';

import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useFormik} from 'formik';
import {useTailwind} from 'tailwind-rn/dist';
import {loginValidation} from '@/utils/validators';
import {Login} from '@/types';
import {RootStackParamList} from '@/navigations/root';

const initialValues: Login = {
  email: '',
  password: '',
};

type TProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginPage = ({navigate}: TProps) => {
  const tailwind = useTailwind();

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: values => {
      // onSubmit(values);
    },
  });

  const isDisabled: boolean =
    !formik.values.email ||
    !formik.values.password ||
    !!formik.errors.email ||
    !!formik.errors.password;
  // apiLoading;

  return (
    <SafeAreaView>
      <View style={tailwind('bg-indigo-500 h-full')}>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
