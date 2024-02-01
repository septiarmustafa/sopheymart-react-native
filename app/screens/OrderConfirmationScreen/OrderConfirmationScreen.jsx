import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderConfirmationScreen = ({ route }) => {
  const { detailedProduct } = route.params;
  const { productName, price, store } = detailedProduct.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Text style={styles.body}>
          Thank you for your purchase!{"\n"}
          Product: {productName}
          {"\n"}
          Store: {store.name}
          {"\n"}
          Price: Rp {price}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
  },
});

export default OrderConfirmationScreen;
