// Core
import { create } from "zustand";

type usePasswordState = {
  password: string;
  passwordLength: number;
  isUppercase: boolean;
  isLowercase: boolean;
  isNumbers: boolean;
  isSymbols: boolean;
  set: (newState: Partial<usePasswordState>) => void;
};

export const usePassword = create<usePasswordState>((set) => ({
  password: "",
  passwordLength: 10,
  isUppercase: true,
  isLowercase: true,
  isNumbers: true,
  isSymbols: true,
  set,
}));
