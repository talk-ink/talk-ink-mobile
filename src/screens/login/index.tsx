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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {kontenbase} from '@/utils/customClient';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {setAuthToken, setAuthUser} from '@/store/features/auth';
import Layout from '@/components/Layout/LoginRegister/index';
import TextInput from '@/components/TextInput';
import FormControl from '@/components/Form/FormControl';
import FormLabel from '@/components/Form/FormLabel';
import FormError from '@/components/Form/FormError';
import BigButton from '@/components/Form/Button/BigButton';
import colors from '@/utils/themes/colors';

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
    <Layout title="Login">
      <View style={{marginTop: hp('5%')}}>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <TextInput
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            placeholder="Enter your email"
          />
          {formik.errors.email && formik.touched.email && (
            <FormError>{formik.errors.email}</FormError>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextInput
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <FormError>{formik.errors.password}</FormError>
          )}
        </FormControl>
        <FormControl style={{marginTop: 20}}>
          <BigButton
            title="Login"
            onPress={formik.handleSubmit}
            disabled={isDisabled}
            loading={apiLoading}
          />
        </FormControl>
        <FormControl style={{marginTop: 20}}>
          <FormLabel style={{alignSelf: 'center'}}>
            Don't have an account?{' '}
            <Text style={{color: colors.primary}}>Sign Up</Text>
          </FormLabel>
        </FormControl>
      </View>
    </Layout>
  );
};

export default LoginPage;
