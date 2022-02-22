import {SendEmail, Thread, User} from '@/types/index';
import axios, {AxiosResponse} from 'axios';
//@ts-ignore
import FileResizer from 'react-image-file-resizer';
import {FRONTEND_URL} from 'react-native-dotenv';

const EMAIL_API: string = process.env.REACT_APP_EMAIL_API ?? '';

export const getNameInitial = (name: string): string | undefined => {
  if (name) {
    const splitted = name.split(' ');
    if (splitted[1]) return splitted[0][0] + splitted[1][0];
    return name[0];
  }
};

export const sendEmail = async ({
  emails,
  subject,
  message,
}: SendEmail): Promise<AxiosResponse> => {
  const send = await axios.post(EMAIL_API, {emails, subject, message});
  return send;
};

export const randomString = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const inviteWorkspaceTemplate = ({
  inviteLink,
  workspaceName,
  invitee,
}: {
  inviteLink: string;
  workspaceName: string;
  invitee: string;
}): string => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Workspace Invitation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins"
        rel="stylesheet"
      />
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: "Poppins", sans-serif;
        }
        a {
          text-decoration: none;
        }
        .bg-primary {
          background-color: #6f6cd9;
        }
        .bg-grey {
          background-color: #f0f0f0;
        }
        .bg-white {
          background-color: #f9f9f9;
        }
        .table-container {
          padding: 100px 0;
        }
        .table-content {
          padding: 30px;
          border-radius: 3px;
          border-top: 3px solid #6f6cd9;
        }
        p {
          line-height: 1.8;
        }
        p,
        strong {
          margin: 0;
        }
        .button {
          padding: 10px 30px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <table
        border="0"
        align="center"
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        class="bg-grey table-container"
      >
        <tr>
          <td>
            <table
              width="600px"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
              class="bg-white table-content"
            >
              <tr>
                <td>
                  <img
                    src="https://bit.ly/3r508kl"
                    alt="logo"
                    style="width: 150px"
                  />
                </td>
              </tr>
              <tr>
                <td style="padding-top: 30px">
                  <p>You are invited by <strong>${invitee}</strong> to join into workspace :</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px 0px">
                  <strong>${workspaceName}</strong>
                </td>
              </tr>
              <tr>
                <td style="text-align: center; padding-top: 15px">
                  <a
                    href="${inviteLink}"
                    target="_blank"
                    class="bg-primary button"
                    style="color: white"
                    >Join into workspace</a
                  >
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  
  
  `;
};

export const getBase64 = (
  img: Blob,
  callback: (result: string | ArrayBuffer) => void,
) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const validateEmail = (email: string) => {
  /* eslint-disable no-useless-escape */
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(email);
};
export const resizeFile = (file: Blob, maxSize: number): Promise<any> =>
  new Promise(resolve => {
    FileResizer.imageFileResizer(
      file,
      maxSize,
      maxSize,
      'WEBP',
      75,
      0,
      (uri: string): void => {
        resolve(uri);
      },
      'file',
    );
  });

export const beforeUploadImage = ({
  file,
  types,
  maxSize,
}: {
  file: Blob;
  types: string[];
  maxSize: number;
}): {error: boolean; message: string} => {
  const isImage = types.includes(file.type);
  if (!isImage) {
    let fileTypes = '';
    types.forEach(type => {
      const split = type.split('image/');
      fileTypes += split[1] + ' ';
    });
    return {
      error: true,
      message: `Only supported ${fileTypes.toUpperCase()}`,
    };
  }
  const isOverSize = file.size / 1024 / 1024 < maxSize;
  if (!isOverSize) {
    return {
      error: true,
      message: `Can't upload beyond ${maxSize}MB`,
    };
  }

  return {
    error: false,
    message: '',
  };
};

export const inboxFilter = ({
  thread,
  channelIds,
  userData,
  isDoneThread,
}: {
  thread: Thread;
  channelIds: string[];
  userData: User;
  isDoneThread: boolean;
}) => {
  if (thread.draft) return false;
  if (!channelIds.includes(thread.channel![0])) return false;

  if (!userData.doneThreads) return true;
  if (isDoneThread) return userData.doneThreads.includes(thread._id!);
  return !userData.doneThreads.includes(thread._id!);
};

export const isDevelopmet: boolean = !!(
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
);

export const frontendUrl: string = process.env.REACT_APP_FRONTEND_URL ?? '';
export const notificationUrl: string =
  process.env.REACT_APP_NOTIFICATION_API ?? '';
export const oneSignalId: string = process.env.REACT_APP_ONE_SIGNAL_ID ?? '';

export const filterDistinct = (array: any[], key: string) => {
  const result: any[] = [];
  const map = new Map();
  for (const item of array) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      result.push(item);
    }
  }

  return result;
};

export const createUniqueArray = (array: string[]): string[] => {
  const unique = new Set([...array]);
  return [...unique];
};

export const getDeeplinkPath = (string: string): string => {
  const isLocalhost: boolean = !string.split('http://localhost:3000')?.[0];
  let manipulateUrl: string = string;

  if (isLocalhost) {
    manipulateUrl = string.replace('http://localhost:3000', FRONTEND_URL);
  }
  return manipulateUrl.split(FRONTEND_URL)[1];
};
