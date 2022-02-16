import {KontenbaseClientOptions} from '@kontenbase/sdk';
import {
  AuthResponse,
  AuthResponseFailure,
  TokenResponse,
} from '@kontenbase/sdk/dist/main/auth';
import axios from 'axios';
import {KONTENBASE_API_KEY} from 'react-native-dotenv';

const apiKey = KONTENBASE_API_KEY;

const authClient = (url: string) => {
  const _error = (error: any): AuthResponseFailure => {
    if (axios.isAxiosError(error) && error.response) {
      return {
        error: {
          message: error.response.data?.message
            ? error.response.data.message
            : typeof error.response.data === 'object'
            ? JSON.stringify(error.response.data)
            : String(error.response.data),
        },
        status: error.response.status,
        statusText: error.response.statusText,
      };
    }

    return {
      error: {
        message: 'Failed',
      },
      status: 500,
      statusText: 'FAILED',
    };
  };
  const login = async <T = any>(body: {
    email: string;
    password: string;
  }): Promise<AuthResponse<T>> => {
    return new Promise(async (resolve, _reject) => {
      try {
        const {data, status, statusText} = await axios.post<TokenResponse<T>>(
          `${url}/auth/login`,
          body,
        );

        const user = data.user;
        resolve({
          user,
          status,
          statusText,
          token: data.token,
        });
      } catch (error) {
        resolve(_error(error));
      }
    });
  };

  return {
    login,
  };
};

const customClient = (options: KontenbaseClientOptions) => {
  const url = options?.url ? options?.url : 'https://api.kontenbase.com';
  const queryUrl = `${url}/query/api/v1/${options.apiKey}`;

  return {
    auth: authClient(queryUrl),
  };
};

export const axiosClient = axios.create({
  baseURL: `https://api.kontenbase.com/query/api/v1/${apiKey}`,
});

export const kontenbase = customClient({apiKey});

export {};
