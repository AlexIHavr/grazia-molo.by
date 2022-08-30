export type postResponseType = {
  _id: string;
  name: string;
  description: string[];
  photoName: string;
  date: string;
  viewsUsers: string[];
};

export type postCommentRequestType = {
  user: string;
  post: string;
  text: string;
};

export type postCommentResponseType = {
  _id: string;
  fullName: string;
  date: string;
  text: string[];
  photoName: string;
  zoomInPhoto: boolean;
};

export type postCommentsResponseType = postCommentResponseType[];

export type postType = {
  section: string; //для навигации
  showComments: boolean;
  showCreateComment: boolean;
  showThanksComment: boolean;
  textNewComment: string;
  errorMessage: string;
  isLoadedComments: boolean;
  comments: postCommentsResponseType;
} & postResponseType;

export type forumType = {
  posts: postType[];
  postImgUrl: string;
  userImgUrl: string;
  viewedPosts: string[];
};

export type postViewsRequest = {
  _id: string;
};
