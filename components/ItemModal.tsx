import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Box,
    Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text
} from '@chakra-ui/react';


const ModalFullWidth = (item) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontWeight={600} cursor={"pointer"} onClick={onOpen}>
        {item.name}
      </Text>

      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent mt={0}>
          <ModalHeader p={0}>
            <Box
              height={"240px"}
              w={"full"}
              bg={"gray.200"}
              d={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text color={"gray.300"}>Image Placeholder</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton
            left={2}
            bg={"white"}
            borderRadius={"full"}
            w={12}
            h={12}
            fontSize={"lg"}
          />
          <ModalBody>
            <Text fontWeight="bold" fontSize={"xl"} mb={0}>
              {item.name}
            </Text>
            <Text mb={2}>{item.description}</Text>
            <Text>{JSON.stringify(item)}</Text>
            <Button mt={4} backgroundColor={"black"} color={"white"}>Add To Cart</Button>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalFullWidth
