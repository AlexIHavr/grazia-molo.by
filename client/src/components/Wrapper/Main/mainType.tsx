type settingsType = {
  headerHeight: number;
  offsetNavScroll: number;
  addOffsetContentScroll: number;
  sliderHeight: number;
  headerHeight1: number;
  adaptiveWidth1: number;
  adaptiveWidth2: number;
};

export type mainType = {
  documentElem: HTMLElement;
  activateIMoveUp: boolean;
  activateIMoveDown: boolean;
  activateMainMenu: boolean;
  fixedNavMainPage: boolean;
  fixedNav: boolean;
  refContent: React.MutableRefObject<HTMLDivElement> | null;
  refNavContent: React.MutableRefObject<HTMLDivElement> | null;
  iSelectedItem: number;
  currentPage: string;
  settings: settingsType;
};
