import React, {useState} from 'react';

import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form, useFormik} from 'formik';
import {useTailwind} from 'tailwind-rn/dist';
import {loginValidation} from '@/utils/validators';
import {Login} from '@/types';
import {RootStackParamList} from '@/navigations/root';
import {TextInput} from 'react-native-gesture-handler';
import {kontenbase} from '@/utils/customClient';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthToken, setAuthUser} from '@/store/features/auth';
import Layout from '@/components/Layout/LoginRegister/index';

const initialValues: Login = {
  email: '',
  password: '',
};

type TProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginPage = ({navigate}: TProps) => {
  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const onSubmit = async (values: Login) => {
    setApiLoading(true);

    try {
      console.log(values);
      const {user, error, token} = await kontenbase.auth.login(values);
      if (error) throw new Error(error.message);
      AsyncStorage.setItem('token', token);
      dispatch(setAuthToken({token}));
      dispatch(setAuthUser(user));
    } catch (error) {
      console.log('err', error);
    } finally {
      setApiLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const isDisabled: boolean =
    !formik.values.email ||
    !formik.values.password ||
    !!formik.errors.email ||
    !!formik.errors.password ||
    apiLoading;

  return (
    <Layout>
      <View style={tailwind('bg-white h-full')}>
        <TextInput
          placeholder="Email"
          style={tailwind('w-full border-b border-b-indigo-500 text-slate-800')}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />
        <TextInput
          placeholder="Password"
          style={tailwind('w-full border-b border-b-indigo-500 text-slate-800')}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={formik.handleSubmit}
          disabled={isDisabled}
        />
      </View>
    </Layout>
  );
};

export default LoginPage;
