import React from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, useToast, Text, Stack } from "@chakra-ui/react";

const QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      id
      createdAt
      updatedAt
      name
      description
      price
      store {
        id
        name
      }
      __typename
    }
  }
`;

const addToCart = (item) => {
  // need to check if user has a cart already.
  // if user already has a cart
  // IF the cart has items from the current restaurant:
  // add new item to cart.
  // ELSE IF the cart has items from a different restaurant:
  // prompt to empty old cart (make a new cart).
  // (probably need to status it as abandoned so abandoned carts can be tracked).
  // create a new cart with current item added to it.
};

const ItemPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { itemId } = router.query;

  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: itemId },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  const item = data.item;

  return (
    <Box height={"100vh"}>
      
      {/* <Box p={4}>{JSON.stringify(item)}</Box> */}

      <Stack spacing={2} p={4}>
        <Text as={"h2"} fontSize={"xl"} fontWeight={700}>
          {item.name}
        </Text>
        <Text as={"p"} fontSize={"md"} fontWeight={"normal"}>
          {item.description}
        </Text>
        <Text as={"span"} fontSize={"md"} fontWeight={"normal"}>
          ₱{item.price}
        </Text>
      </Stack>
      <Button
        fontSize={"xl"}
        size={"lg"}
        pos={"fixed"}
        bottom={"40px"}
        marginX={"auto"}
        left={0}
        right={0}
        onClick={() =>
          toast({
            title: "Cart Updated",
            description: `${item.name} has been added to your cart! `,
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ItemPage;
