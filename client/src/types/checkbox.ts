export type CheckboxItemType = {
  propertyKey: CheckboxToggleStateType;
  label: string;
  checked: boolean;
};

export type CheckboxToggleHandler = (state: CheckboxToggleStateType) => void;

export const CheckboxToggleState = {
  isUppercase: "isUppercase",
  isLowercase: "isLowercase",
  isNumbers: "isNumbers",
  isSymbols: "isSymbols",
} as const;

export type CheckboxToggleStateType = keyof typeof CheckboxToggleState;
