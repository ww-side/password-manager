"use client";
// Core
import { ChangeEvent, type FC, useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import toast from "react-hot-toast";

// Components
import { Button, Flex, Input, Modal } from "antd";

// Store
import { usePassword } from "@/store";

// Utils
import userService from "@/services/UserService";
import classes from "@/components/GeneratePassword/PasswordOutput/styles.module.css";

const PasswordOutput: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState("");
  const password = usePassword((state) => state.password);
  const passwordStore = usePassword();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSavePassword = async (password: string, label: string) => {
    if (label.trim() === "") {
      toast.error("Label must be not empty");
      return;
    }

    setIsLoading(true);
    await userService.savePassword({ password, label });
    passwordStore.set({ password: "" });
    setIsLoading(false);
    handleCancel();
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    passwordStore.set({ password: e.target.value });
  };

  return (
    <>
      <Flex gap={10}>
        <Input type="text" value={password} readOnly />
        <VscDiffAdded
          className={classes.addBtn}
          onClick={showModal}
          color="black"
          size={30}
        />
      </Flex>
      <Modal
        title="Add password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            disabled={isLoading}
            onClick={() => handleSavePassword(password, label)}
          >
            Save to store
          </Button>,
        ]}
      >
        <Input type="text" value={password} onChange={handlePasswordChange} />
        <Input
          type="text"
          placeholder="Label"
          value={label}
          onChange={handleLabelChange}
        />
      </Modal>
    </>
  );
};

export default PasswordOutput;
