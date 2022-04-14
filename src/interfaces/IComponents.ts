export interface IMinimalButton {
  children: React.ReactNode;
  onClick?: () => void;
  style?: string;
  [x: string]: any;
}

export interface ISearchInput {
  onChange: () => any;
}

export interface ISearchCard {
  photoUrl: string;
  name: string;
  location: string;
  age: number;
}

export interface ISpinner {
  text?: string;
}

export interface IPropsPage {
  interval: number;
}

export interface ISearchPage {
  isLoading: boolean;
  isError: boolean;
  countDown: number;
}
