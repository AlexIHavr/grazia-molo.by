import { Document } from 'mongoose';

export type userModelType = {
  fullName: string;
  email: string;
  password: string;
  age: number;
  isClubMember: boolean;
  isActivated: boolean;
  dateCreation: Date;
  date: string;
  activationLink: string;
  refreshToken: string;
  roles: string[];
  isBan: boolean;
  photoName: string;
} & Document;

export type postModelType = {
  name: string;
  description: string[];
  photoName: string;
  date: string;
  dateCreation: Date;
  viewsUsers: string[];
} & Document;

export type commentModelType = {
  user: string;
  post: string;
  date: string;
  dateCreation: Date;
  text: string[];
  isValidated: boolean;
} & Document;

export type lessonModelType = {
  day: string;
  time: string;
  hours: number;
  group: string;
} & Document;

export type navigationModelType = {
  category: string;
  subCategory: string;
  section: string;
  startDescription: string[];
  description: string[];
  photoNames: string[];
  videoNames: string[];
  videoLinks: string[];
} & Document;

export type sliderModelType = {
  photoNames: string[];
} & Document;

export type mainNavigationModelType = {
  category: string;
  name: string;
  changeable: boolean;
  withSubCategories: boolean;
} & Document;
