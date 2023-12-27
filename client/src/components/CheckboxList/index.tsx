"use client";
// Core
import { type FC } from "react";

// Components
import { Checkbox, Flex } from "antd";

// Types
import { CheckboxItemType, CheckboxToggleHandler } from "@/types/checkbox";

type CheckboxListProps = {
  checkboxes: CheckboxItemType[];
  onToggle: CheckboxToggleHandler;
};

const CheckboxList: FC<CheckboxListProps> = ({ checkboxes, onToggle }) => {
  return (
    <Flex gap={10}>
      {checkboxes.map(({ propertyKey, label, checked }) => (
        <Flex gap={5} key={propertyKey}>
          {label}
          <Checkbox checked={checked} onChange={() => onToggle(propertyKey)} />
        </Flex>
      ))}
    </Flex>
  );
};

export default CheckboxList;
