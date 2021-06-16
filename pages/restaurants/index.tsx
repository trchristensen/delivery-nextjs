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
    restaurants {
      id
      created_at
      name
      Hours {
        monday_open
        monday_close
        tuesday_open
        tuesday_close
        wednesday_open
        wednesday_close
        thursday_open
        thursday_close
        friday_open
        friday_close
        saturday_open
        saturday_close
        sunday_open
        sunday_close
      }
      categories {
        id
        category
      }
      __typename
    }
  }
`;

export default function RestaurantsIndex() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const restaurants = data.restaurants;

  return (
    <main>
        {restaurants.map((restaurant) => (
          <div key={`restaurant-${restaurant.id}`}>
            <Link href={`/restaurants/${restaurant.id}`}>
              <a>
                <Box>
                  {restaurants.map((restaurant) => (
                    <div key={`restaurant-${restaurant.id}`}>
                      <Link href={`/restaurants/${restaurant.id}`}>
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
                                  'http://localhost:1337' + restaurant.logo.url
                                  }
                                  layout={"fill"}
                                /> */}
                                {/* <img src={`http://localhost:1337${restaurant.logo.url}`} /> */}
                              </Box>
                              <Stack>
                                <Heading
                                  color={useColorModeValue("gray.700", "white")}
                                  fontSize={"2xl"}
                                  fontFamily={"body"}
                                >
                                  {restaurant.name}
                                </Heading>
                                <Text color={"gray.500"}>
                                  {restaurant.description}
                                </Text>
                              </Stack>
                              <Stack direction="row">
                                {restaurant.categories.map((category) => {
                                  return (
                                    <Badge id={category.id} key={category.id}>
                                      {category.category}
                                    </Badge>
                                  );
                                })}
                              </Stack>
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

                                  <Text color={"gray.500"}>
                                    <Text display="block">
                                      Monday - {restaurant.Hours.monday_open} -{" "}
                                      {restaurant.Hours.monday_close}
                                    </Text>
                                    <Text display="block">
                                      Tuesday - {restaurant.Hours.tuesday_open}{" "}
                                      - {restaurant.Hours.tuesday_close}
                                    </Text>
                                    <Text display="block">
                                      Wednesday -{" "}
                                      {restaurant.Hours.wednesday_open} -{" "}
                                      {restaurant.Hours.wednesday_close}
                                    </Text>
                                    <Text display="block">
                                      Thursday -{" "}
                                      {restaurant.Hours.thursday_open} -{" "}
                                      {restaurant.Hours.thursday_close}
                                    </Text>
                                    <Text display="block">
                                      Friday - {restaurant.Hours.friday_open} -{" "}
                                      {restaurant.Hours.friday_close}
                                    </Text>
                                    <Text display="block">
                                      Saturday -{" "}
                                      {restaurant.Hours.saturday_open} -{" "}
                                      {restaurant.Hours.saturday_close}
                                    </Text>
                                    <Text display="block">
                                      Sunday - {restaurant.Hours.sunday_open} -{" "}
                                      {restaurant.Hours.sunday_close}
                                    </Text>
                                  </Text>
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
