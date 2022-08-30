export type loginResponseType = {
  _id: string;
  accessToken: string;
  refreshToken: string;
  fullName: string;
  isActivated: boolean;
  photoName: string;
  roles: string[];
};

type userDataType = {
  _id: string;
  fullName: string;
  photoName: string;
  roles: string[];
};

export type loginType = {
  showLoginPassword: boolean;
  errorMessage: string;
  activateThanksLogin: boolean;
  activateLogin: boolean;
  isAuth: boolean;
  userData: userDataType;
};
