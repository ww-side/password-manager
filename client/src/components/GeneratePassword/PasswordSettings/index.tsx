"use client";
// Core
import { ChangeEvent, type FC } from "react";

// Components
import CheckboxList from "@/components/CheckboxList";
import { Input, Typography } from "antd";

// Store
import { usePassword } from "@/store";

// Types
import { CheckboxToggleState, CheckboxToggleStateType } from "@/types/checkbox";

const PasswordSettings: FC = () => {
  const passwordStore = usePassword();
  const [passwordLength, checkboxes] = usePassword((state) => [
    state.passwordLength,
    [
      {
        propertyKey: CheckboxToggleState.isUppercase,
        label: "Uppercase",
        checked: state.isUppercase,
      },
      {
        propertyKey: CheckboxToggleState.isLowercase,
        label: "Lowercase",
        checked: state.isLowercase,
      },
      {
        propertyKey: CheckboxToggleState.isNumbers,
        label: "Numbers",
        checked: state.isNumbers,
      },
      {
        propertyKey: CheckboxToggleState.isSymbols,
        label: "Symbols",
        checked: state.isSymbols,
      },
    ],
  ]);

  const handleChangePasswordLength = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value.trim() === "" ? "" : parseInt(e.target.value, 10);

    if (newValue === "" || (!isNaN(newValue) && newValue >= 0)) {
      passwordStore.set({ passwordLength: Number(newValue) });
    }
  };

  const handleSetState = (state: CheckboxToggleStateType) => {
    passwordStore.set({ [state]: !passwordStore[state] });
  };

  return (
    <section>
      <section className="flex gap-40 justify-center max-md:flex-col max-md:gap-3">
        <div>
          <Typography.Title level={3}>Password Length</Typography.Title>
          <Input
            type="number"
            value={passwordLength === 0 ? "" : String(passwordLength)}
            onChange={handleChangePasswordLength}
          />
        </div>
        <CheckboxList checkboxes={checkboxes} onToggle={handleSetState} />
      </section>
    </section>
  );
};

export default PasswordSettings;
