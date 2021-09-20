import { postCommentResponseType, postResponseType } from '../Forum/forumType';
import { lessonsResponseType } from '../Timetable/timetableType';

type panelType = {
  panel: string;
  panelName: string;
  errorMessage: string;
  successMessage: string;
};

export type commentType = postCommentResponseType & { isValidated: boolean };

export type userResponseType = {
  _id: string;
  fullName: string;
  photoName: string;
  date: string;
  isBan: boolean;
  zoomInPhoto: boolean;
};

export type usersResponseType = userResponseType[];

export type adminPanelType = {
  panels: panelType[];
  posts: postResponseType[];
  comments: commentType[];
  users: usersResponseType;
  lessons: lessonsResponseType;
  changedPost: postResponseType | null;
  isValidatedAll: boolean;
};
