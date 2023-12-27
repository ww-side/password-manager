"use client";
// Core
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

// Components
import { Input, Typography } from "antd";
import Header from "@/components/Header";

// Hooks
import useAuth from "@/hooks/useAuth";

// Utils
import userService from "@/services/UserService";
import classes from "@/components/PasswordStore/styles.module.css";

// Types
import { PasswordType } from "@/types/password";

type ResType = {
  label: string;
  password: string;
};

const PasswordStore = () => {
  const [savedPasswords, setSavedPasswords] = useState([]);

  useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getAllSavedPasswords();
        console.log(res);
        setSavedPasswords(res.savedPasswords);
      } catch (error) {
        console.error("Error fetching saved passwords:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePassword = async (label: string) => {
    try {
      await userService.deletePassword(label);
      setSavedPasswords((prevPasswords) =>
        prevPasswords.filter((item: PasswordType) => item.label !== label)
      );
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  return (
    <>
      <Header />
      <main className={classes.passwordWrapper}>
        {savedPasswords.length > 0 ? (
          savedPasswords.map((item: ResType) => (
            <div className={classes.passwordLayout} key={item.label}>
              <RiDeleteBin6Line
                className={classes.deleteBtn}
                size={25}
                onClick={() => handleDeletePassword(item.label)}
              />
              <Typography.Title level={3}>{item.label}</Typography.Title>
              <Input.Password value={item.password} readOnly />
            </div>
          ))
        ) : (
          <div>Your not have passwords</div>
        )}
      </main>
    </>
  );
};

export default PasswordStore;
