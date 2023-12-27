"use client";
// Core
import { type FC } from "react";

// Components
import { Button } from "antd";

// Store
import { usePassword } from "@/store";

// Utils
import { generatePassword } from "@/utils/passwordUtils";

const PasswordGenerateBtn: FC = () => {
  const passwordStore = usePassword();
  const [
    password,
    passwordLength,
    isUppercase,
    isLowercase,
    isNumbers,
    isSymbols,
  ] = usePassword((state) => [
    state.password,
    state.passwordLength,
    state.isUppercase,
    state.isLowercase,
    state.isNumbers,
    state.isSymbols,
  ]);

  const handleGeneratePassword = () => {
    passwordStore.set({
      password: generatePassword(
        passwordLength,
        isUppercase,
        isLowercase,
        isNumbers,
        isSymbols
      ),
    });
  };

  return (
    <section className="mx-auto">
      <Button type="primary" onClick={handleGeneratePassword}>
        Generate password
      </Button>
    </section>
  );
};

export default PasswordGenerateBtn;
