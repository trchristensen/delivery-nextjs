import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Badge,
  Divider,
  MenuItem,
} from "@chakra-ui/react";

import { formatDistance } from "date-fns";
import Link from "next/link";
// import ItemModal from "../../../components/ItemModal";

const QUERY = gql`
  query store($id: ID!) {
    store(id: $id) {
      id
      name
      items {
        id
        name
        description
        price
      }
    }
  }
`;

const Store = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(QUERY, { variables: { id: id } });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const store = data.store;
  return (
    <>
      {/* {JSON.stringify(store)} */}

      <Box>
        <Stack
          mt={6}
          direction={"column"}
          spacing={4}
          align={"center"}
          w={"full"}
          p={4}
        >
          {store.items.map((item) => {
            return (
              <Box w={"full"}>
                <Link href={`/store/${store.id}/item/${item.id}`}>
                  <a>
                    <Stack
                      direction={"row"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      borderWidth={1}
                      px={4}
                      py={2}
                    >
                      <Stack
                        mt={2}
                        direction={"column"}
                        spacing={2}
                        align={"left"}
                        key={item.id}
                        width={"50%"}
                      >
                        <Box>
                          <Text as={"h2"} fontSize={"lg"} fontWeight={700}>
                            {item.name}
                          </Text>
                        </Box>
                        <Box>
                          <Text as={'p'} fontSize={'sm'}>{item.description}</Text>
                        </Box>
                        <Box>
                          <Text>₱{item.price}</Text>
                        </Box>
                      </Stack>
                      <Box
                        w={"50%"}
                        d={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Text color={"gray.500"}>Image</Text>
                      </Box>
                    </Stack>
                  </a>
                </Link>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Store;
