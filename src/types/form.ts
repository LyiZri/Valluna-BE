declare const ButtonTypes: ['primary', 'default'];
export declare type ButtonType = typeof ButtonTypes[number];
export interface IFormItem {
  name?: string;
  label?: string | React.ReactNode;
  value?: string | number | number[];
  require?: boolean;
  type?: string;
  placeholder?: string;
  children?: any;
  selectOption?: ISelectOption[];
  render?: React.ReactNode;
  col?: number;
  icon?: string;
  disabled?: boolean;
  className?: string;
  requireMsg?: string;
  validator?: any;
}
export interface ISelectOption {
  value: string | number;
  text: string;
}
export interface IButtonItem {
  context: string;
  type?: ButtonType;
  method: Function;
}
