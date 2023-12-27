// Core
import Link from "next/link";

// Components
import { Flex } from "antd";

// Utils
import classes from "@/components/Header/styles.module.css";

const Header = () => {
  return (
    <header className={classes.headerLayout}>
      <Flex gap={15}>
        <Link className={classes.headerTypography} href="/">
          Generate password
        </Link>
        <Link className={classes.headerTypography} href="/store">
          Store
        </Link>
      </Flex>
    </header>
  );
};

export default Header;
