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
import ItemModal from "../../components/ItemModal";

const QUERY = gql`
  query restaurant($id: ID!) {
    restaurant(id: $id) {
      id
      created_at
      name
      description
      address
      logo {
        url
      }
      menu_categories {
        name
        id
        description
        menuitem {
          id
          name
          description
          price
          options {
            id
            description
            price
          }
        }
      }
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

const Restaurant = () => {
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

  const restaurant = data.restaurant;
  return (
    <>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        rounded={"md"}
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
          {/* <img
              src={`http://localhost:1337${restaurant.logo.url}`}
            /> */}
        </Box>
        <Stack id="restaurant-info__main" borderBottomWidth={1}>
          {/* <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {title}
          </Text> */}
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {restaurant.name}
          </Heading>
          <Stack direction="row" d="block">
            {restaurant.categories.map((category) => {
              return (
                <Badge id={category.id} key={category.id}>
                  {category.category}
                </Badge>
              );
            })}
          </Stack>
          <Text color={"gray.700"} marginBottom={6} d="block">
            {restaurant.description}
          </Text>

          <Stack>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              marginBottom={6}
              display="block"
            >
              {restaurant.address} •{" "}
              <Text color={"gray.600"} fontSize={"sm"} d="inline-block">
                <Link href="#">
                  <a>More Info</a>
                </Link>
              </Text>
            </Text>
          </Stack>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Hours
            </Text>
            <Text color={"gray.500"}>
              <Text display="block">
                Monday - {restaurant.Hours.monday_open} -{" "}
                {restaurant.Hours.monday_close}
              </Text>
              <Text display="block">
                Tuesday - {restaurant.Hours.tuesday_open} -{" "}
                {restaurant.Hours.tuesday_close}
              </Text>
              <Text display="block">
                Wednesday - {restaurant.Hours.wednesday_open} -{" "}
                {restaurant.Hours.wednesday_close}
              </Text>
              <Text display="block">
                Thursday - {restaurant.Hours.thursday_open} -{" "}
                {restaurant.Hours.thursday_close}
              </Text>
              <Text display="block">
                Friday - {restaurant.Hours.friday_open} -{" "}
                {restaurant.Hours.friday_close}
              </Text>
              <Text display="block">
                Saturday - {restaurant.Hours.saturday_open} -{" "}
                {restaurant.Hours.saturday_close}
              </Text>
              <Text display="block">
                Sunday - {restaurant.Hours.sunday_open} -{" "}
                {restaurant.Hours.sunday_close}
              </Text>
            </Text>
          </Stack>
        </Stack>

        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          {restaurant.menu_categories.map((cat) => {
            return (
              <Box>
                <Text
                  // color={"green.500"}
                  // textTransform={"uppercase"}
                  fontWeight={800}
                  // fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {cat.name}
                </Text>
              </Box>
            );
          })}
        </Stack>

        <Divider />

        <Stack mt={6} direction={"column"} spacing={2}>
          {restaurant.menu_categories.map((cat) => {
            return (
              <Box>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"xl"}
                  letterSpacing={1.1}
                >
                  {cat.name}
                </Text>
                <Stack mt={6} direction={"row"} spacing={4}>
                  {cat.menuitem.map((item) => {
                    return (
                      <Stack id="menuItem" direction={"column"} spacing={2} pb={4} borderBottomWidth={1} w={"full"}>
                        <ItemModal {...item} />
                        <Text id="menuItem__price" fontSize={"xs"}>
                          ₱{item.price}
                        </Text>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

export default Restaurant;
