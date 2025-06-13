import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useProductStore from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleCreateProduct = async () => {
    const productToCreate = {
      ...newProduct,
      price: newProduct.price ? Number(newProduct.price) : "",
    };

    setIsSubmitted(true);

    try {
      const result = await createProduct(productToCreate);
      console.log("Success:", result.success);
      console.log("Message:", result.message);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setNewProduct({ name: "", price: "", image: "" });
        setIsSubmitted(false);
      } else {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the product",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex w="100%" py={8} px={4} direction="column" align="center">
      <VStack spacing={8} maxW="container.sm" w="100%">
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Create New Product
        </Heading>
        <VStack spacing={6} w="100%">
          <VStack spacing={2} w="100%">
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              size="lg"
              fontSize="lg"
              p={6}
              width="100%"
              minWidth="300px"
            />
            {isSubmitted && !newProduct.name && (
              <Text fontSize="sm" color="red.500">
                This field is required
              </Text>
            )}
          </VStack>

          <VStack spacing={2} w="100%">
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              size="lg"
              fontSize="lg"
              p={6}
              width="100%"
              minWidth="300px"
            />
            {isSubmitted && !newProduct.price && (
              <Text fontSize="sm" color="red.500">
                This field is required
              </Text>
            )}
          </VStack>

          <VStack spacing={2} w="100%">
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              size="lg"
              fontSize="lg"
              p={6}
              width="100%"
              minWidth="300px"
            />
            {isSubmitted && !newProduct.image && (
              <Text fontSize="sm" color="red.500">
                This field is required
              </Text>
            )}
          </VStack>

          <Button
            colorScheme="blue"
            width="100%"
            mt={6}
            onClick={handleCreateProduct}
            size="lg"
            fontSize="lg"
            p={6}
            minWidth="300px"
          >
            Create Product
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default CreatePage;
