import React from 'react';

import Layout from '@components/layouts';
import LoginForm from '@components/organisms/login';

const Login = ({navigation}) => {
  return (
    <Layout scrollable>
      <LoginForm navigation={navigation} />
    </Layout>
  );
};

export default Login;
