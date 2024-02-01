import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import http from "../../config/httpConfig";
import { BASE_HOST } from "../../config/baseUrl";
import { Alert } from "react-native";

export default function ProductDetailScreen({ route }) {
  const { detailedProduct } = route.params;
  const navigation = useNavigation();

  const { productName, desc, price, stock, store } = detailedProduct.data;

  const handleAddToCart = () => {
    // console.log("Product added to cart");
  };

  const handleBuyNow = async () => {
    try {
      const orderData = {
        productName: productName,
        desc: desc,
        price: price,
        stock: 1,
        storeId: {
          id: store.id,
        },
      };

      const response = await http.post(`${BASE_HOST}/order`, orderData);

      console.log(orderData);

      if (response.ok) {
        console.log("Order successful!");
        Alert.alert("Success", "Order successful!", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("OrderConfirmation", { detailedProduct }),
          },
        ]);
      } else {
        console.error("Order failed");
        Alert.alert("Error", "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during order:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../../assets/images/latte.jpg")}
        style={styles.productImage}
      />

      <Text style={styles.title}>{productName}</Text>
      <Text style={styles.title}>Store: {store.name}</Text>
      <Text style={styles.title}>Rp {price}</Text>
      <Text style={styles.body}>Description: {desc}</Text>
      <Text style={styles.body}>Stock: {stock}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <FontAwesome5 name="cart-arrow-down" size={24} color={Colors.WHITE} />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="money-check-alt" size={24} color={Colors.WHITE} />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.PRIMARY_COLOR,
  },
  body: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    flexDirection: "row",
    backgroundColor: Colors.PRIMARY_COLOR,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 18,
  },
});
