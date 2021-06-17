import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import { formatDistance } from "date-fns";
import { Grid } from "@chakra-ui/layout";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";

const QUERY = gql`
  query {
    stores {
      id
      name
      __typename
    }
  }
`;

export default function StoresIndex() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const stores = data.stores;

  return (
    <main>
        {stores.map((store) => (
          <div key={`store-${store.id}`}>
            <Link href={`/stores/${store.id}`}>
              <a>
                <Box>
                  {stores.map((store) => (
                    <div key={`store-${store.id}`}>
                      <Link href={`/store/${store.id}`}>
                        <a>
                          <Center py={6}>
                            <Box
                              maxW={"445px"}
                              w={"full"}
                              bg={useColorModeValue("white", "gray.900")}
                              // boxShadow={"2xl"}
                              // rounded={"md"}
                              p={6}
                              overflow={"hidden"}
                            >
                              <Box
                                h={"210px"}
                                bg={"gray.100"}
                                mt={-6}
                                mx={-6}
                                mb={6}
                                pos={"relative"}
                              >
                                {/* <Image
                                  src={
                                  'http://localhost:1337' + store.logo.url
                                  }
                                  layout={"fill"}
                                /> */}
                                {/* <img src={`http://localhost:1337${store.logo.url}`} /> */}
                              </Box>
                              <Stack>
                                <Heading
                                  color={useColorModeValue("gray.700", "white")}
                                  fontSize={"2xl"}
                                  fontFamily={"body"}
                                >
                                  {store.name}
                                </Heading>
                                {/* <Text color={"gray.500"}>
                                  {store.description}
                                </Text> */}
                              </Stack>
                              {/* <Stack direction="row">
                                {store.categories.map((category) => {
                                  return (
                                    <Badge id={category.id} key={category.id}>
                                      {category.category}
                                    </Badge>
                                  );
                                })}
                              </Stack> */}
                              <Stack
                                mt={6}
                                direction={"row"}
                                spacing={4}
                                align={"center"}
                              >
                                <Stack
                                  direction={"column"}
                                  spacing={0}
                                  fontSize={"sm"}
                                >

                                  {/* <Text color={"gray.500"}>
                                    <Text display="block">
                                      Monday - {store.Hours.monday_open} -{" "}
                                      {store.Hours.monday_close}
                                    </Text>
                                    <Text display="block">
                                      Tuesday - {store.Hours.tuesday_open}{" "}
                                      - {store.Hours.tuesday_close}
                                    </Text>
                                    <Text display="block">
                                      Wednesday -{" "}
                                      {store.Hours.wednesday_open} -{" "}
                                      {store.Hours.wednesday_close}
                                    </Text>
                                    <Text display="block">
                                      Thursday -{" "}
                                      {store.Hours.thursday_open} -{" "}
                                      {store.Hours.thursday_close}
                                    </Text>
                                    <Text display="block">
                                      Friday - {store.Hours.friday_open} -{" "}
                                      {store.Hours.friday_close}
                                    </Text>
                                    <Text display="block">
                                      Saturday -{" "}
                                      {store.Hours.saturday_open} -{" "}
                                      {store.Hours.saturday_close}
                                    </Text>
                                    <Text display="block">
                                      Sunday - {store.Hours.sunday_open} -{" "}
                                      {store.Hours.sunday_close}
                                    </Text>
                                  </Text> */}
                                </Stack>
                              </Stack>
                            </Box>
                          </Center>
                        </a>
                      </Link>
                    </div>
                  ))}
                </Box>
              </a>
            </Link>
          </div>
        ))}
    </main>
  );
}
