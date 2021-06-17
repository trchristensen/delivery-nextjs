import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";

// const LOGIN_LOCAL = gql`
//   mutation Login($id: String!, $password: String!) {
//     login(input: { identifier: $id, password: $password, provider: "local" }) {
//       jwt
//       user {
//         id
//         confirmed
//         username
//         email
//         role {
//           type
//         }
//       }
//       __typename
//     }
//   }
// `;

const LOGIN_LOCAL = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password, provider: "local" }) {
      jwt
      user {
        id
        confirmed
        username
        email
        role {
          type
        }
      }
    }
  }
`;

const SignIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginLocal, { data, loading, error }] = useMutation(LOGIN_LOCAL, {
      variables: {
        identifier: username,
        password: password
      },
    onCompleted(res) {
        console.log(res.login.jwt)
      if (res.login.jwt) {
          console.log(loginLocal)
        localStorage.setItem("token", res.login.jwt as string);
        localStorage.setItem("userId", res.login.username as string);
      }
    },
    onError: (res) => {
      console.log("error!", res, error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    loginLocal({
    //   variables: {
    //     $id: "user",
    //     $password: "password",
    //   }
    })

    // run login mutation. async await for results with jwt then assign to cookie.
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={0} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign in to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
