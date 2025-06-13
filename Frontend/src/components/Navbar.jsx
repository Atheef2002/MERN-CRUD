import React from "react";
import {
  Flex,
  HStack,
  Text,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Flex
      as="nav"
      h={16}
      alignItems="center"
      justifyContent="space-between"
      px={4}
      w="100%"
      bg={bg}
      boxShadow="sm"
      position="relative"
      zIndex={1000}
    >
      <Text
        fontSize={{ base: "22", sm: "28" }}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={"center"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
      >
        <Link to={"/"}>Product Store 🛒</Link>
      </Text>

      <HStack spacing={2} alignItems="center" flexShrink={0}>
        <Link to="/create">
          <Button variant="ghost" color={color}>
            <PlusSquareIcon fontSize={20} />
          </Button>
        </Link>
        <Button variant="ghost" onClick={toggleColorMode} color={color}>
          {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
