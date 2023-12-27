"use client";
// Core
import React, { useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

// Components
import { Button, Flex, Input, Typography } from "antd";

// Services
import formService from "@/services/FormService";

// Hooks
import useAuth from "@/hooks/useAuth";

// Utils
import classes from "@/components/AuthForm/styles.module.css";

const AuthForm = () => {
  const [isLoginTemplate, setIsLoginTemplate] = useState(true);

  useAuth();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitLogin: SubmitHandler<FieldValues> = async (data) => {
    const res = await formService.login(data);

    if (res?.status === 200) {
      location.reload();
      reset();
    }
  };

  const onSubmitRegistration: SubmitHandler<FieldValues> = async (data) => {
    const res = await formService.registration(data);

    if (res?.status === 200) {
      location.reload();
      reset();
    }
  };

  const changeFormTemplate = () => {
    setIsLoginTemplate(!isLoginTemplate);
  };
  console.log(getValues());

  return (
    <form
      className={classes.formLayout}
      onSubmit={handleSubmit(
        isLoginTemplate ? onSubmitLogin : onSubmitRegistration
      )}
    >
      <Typography.Title level={1}>
        {isLoginTemplate ? "Login" : "Registration"}
      </Typography.Title>
      <Button type="text" onClick={changeFormTemplate}>
        {isLoginTemplate ? "Switch to registration" : "Switch to login"}
      </Button>
      <Flex gap={5}>
        <Controller
          render={({ field }) => (
            <Input {...field} placeholder="Username" size="large" />
          )}
          name="username"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <Input.Password {...field} placeholder="Password" size="large" />
          )}
          name="password"
          control={control}
        />
        <Button type="primary" htmlType="submit" size="large">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default AuthForm;
