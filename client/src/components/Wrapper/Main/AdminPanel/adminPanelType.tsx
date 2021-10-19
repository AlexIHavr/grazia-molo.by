import { postCommentResponseType, postResponseType } from '../Forum/forumType';
import { navigationResponseType } from '../mainType';
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

export type changeableNavigationType = {
  _id: string;
  name: string;
};

export type adminPanelType = {
  panels: panelType[];
  changeableNavigations: changeableNavigationType[];
  posts: postResponseType[];
  comments: commentType[];
  users: usersResponseType;
  lessons: lessonsResponseType;
  changedSubCategories: navigationResponseType[];
  changedPost: postResponseType | null;
  changedCategories: navigationResponseType[];
  changedSection: navigationResponseType | null;
  selectedCategory: string | null;
  isValidatedAll: boolean;
};
