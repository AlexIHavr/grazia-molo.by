type settingsType = {
  headerHeight: number;
  offsetNavScroll: number;
  addOffsetContentScroll: number;
  sliderHeight: number;
  headerHeight1: number;
  adaptiveWidth1: number;
  adaptiveWidth2: number;
};

export type navigationResponseType = {
  _id: string;
  category: string;
  subCategory: string;
  section: string;
  startDescription: string[];
  description: string[];
  photoNames: string[];
  videoNames: string[];
  videoLinks: string[];
};

export type mainNavigationResponseType = {
  _id: string;
  category: string;
  name: string;
  changeable: boolean;
  withSubCategories: boolean;
};

export type mainType = {
  documentElem: HTMLElement;
  activateIMoveUpDocument: boolean;
  activateIMoveUp: boolean;
  activateIMoveDown: boolean;
  activateMainMenu: boolean;
  fixedNavMainPage: boolean;
  fixedNav: boolean;
  refContent: React.MutableRefObject<HTMLDivElement> | null;
  refNavContent: React.MutableRefObject<HTMLDivElement> | null;
  iSelectedItem: number;
  currentPage: string;
  navigations: navigationResponseType[];
  mainNavigations: mainNavigationResponseType[];
  imagesUrl: string;
  settings: settingsType;
};
