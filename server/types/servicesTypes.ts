export type onlineMailRequestType = {
  name: string;
  phone: string;
  age: string;
};

export type payloadType = {
  userId: string;
};

export type cookiesType = {
  refreshToken: string;
  userId: string;
};

export type registrationRequestType = {
  fullName: string;
  email: string;
  password: string;
  age: number;
  isClubMember: boolean;
};

export type loginRequestType = {
  email: string;
  password: string;
};

export type postCommentRequestType = {
  user: string;
  post: string;
  text: string;
};

export type postRequestType = {
  name: string;
  description: string;
  photoName: string;
};

export type changePostRequestType = {
  postId: string;
} & postRequestType;

export type deletePostRequestType = {
  postId: string;
};

export type postViewsRequest = {
  _id: string;
};

export type userSettingsRequestType = {
  fullName: string;
  photoName: string;
};

export type isValidatedCommentsRequest = {
  comments: {
    _id: string;
    isValidated: boolean;
  }[];
};

export type isBanUsersRequest = {
  users: {
    _id: string;
    isBan: boolean;
  }[];
};

export type lessonsRequestType = {
  lessons: {
    _id: string;
    day: string;
    time: string;
    group: string;
  }[];
};

export type eventRequestType = {
  year: string;
  name: string;
  description: string;
  photoNames: string[];
  videoNames: string;
  videoLinks: string;
};
