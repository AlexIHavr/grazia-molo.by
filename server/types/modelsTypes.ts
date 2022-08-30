import { Model } from 'sequelize';

type UserModel = {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  age: number;
  isClubMember: boolean;
  isActivated?: boolean;
  date?: string;
  activationLink: string | null;
  refreshToken: string | null;
  roles?: string[];
  isBan?: boolean;
  photoName?: string;
};

export type userModelType = Model<Required<UserModel>, UserModel> & Required<UserModel>;

type PostModel = {
  _id?: string;
  name: string;
  description: string[] | null;
  photoName: string | null;
  date?: string;
  viewsUsers: string[];
};

export type postModelType = Model<Required<PostModel>, PostModel> & Required<PostModel>;

type CommentModel = {
  _id?: string;
  user: string;
  post: string;
  date?: string;
  text: string[] | null;
  isValidated?: boolean;
};

export type commentModelType = Model<Required<CommentModel>, CommentModel> & Required<CommentModel>;

type LessonModel = {
  _id?: string;
  day: string;
  time: string;
  hours: number;
  group: string;
};

export type lessonModelType = Model<Required<LessonModel>, LessonModel> & Required<LessonModel>;

type NavigationModel = {
  _id?: string;
  category: string;
  subCategory: string | null;
  section: string | null;
  startDescription?: string[];
  description?: string[];
  photoNames?: string[];
  videoNames?: string[];
  videoLinks?: string[];
};

export type navigationModelType = Model<Required<NavigationModel>, NavigationModel> & Required<NavigationModel>;

type SliderModel = {
  _id?: string;
  photoNames: string[];
};

export type sliderModelType = Model<Required<SliderModel>, SliderModel> & Required<SliderModel>;

type MainNavigationModel = {
  _id?: string;
  category: string;
  name: string;
  changeable: boolean;
  withSubCategories: boolean;
};

export type mainNavigationModelType = Model<Required<MainNavigationModel>, MainNavigationModel> & Required<MainNavigationModel>;
