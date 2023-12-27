"use client";
// Core
import { Toaster } from "react-hot-toast";

// Components
import Header from "@/components/Header";
import PasswordSettings from "./PasswordSettings";
import PasswordOutput from "./PasswordOutput";
import PasswordGenerateBtn from "./PasswordGenerateBtn";

// Hooks
import useAuth from "@/hooks/useAuth";

// Utils
import classes from "@/components/GeneratePassword/styles.module.css";

const GeneratePassword = () => {
  useAuth();

  return (
    <>
      <Header />
      <main className={classes.generatePasswordLayout}>
        <Toaster position="bottom-left" reverseOrder={false} />
        <PasswordOutput />
        <PasswordSettings />
        <PasswordGenerateBtn />
      </main>
    </>
  );
};

export default GeneratePassword;
