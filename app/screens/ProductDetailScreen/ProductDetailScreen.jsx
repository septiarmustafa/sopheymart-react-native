import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utils/Colors";
import { Text } from "react-native";

export default function ProductDetailScreen({ route }) {
  const { detailedProduct } = route.params;

  const { productName, desc, price, stock, store } = detailedProduct.data;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>{productName}</Text>
        <Text>{desc}</Text>
        <Text>Price: ${price}</Text>
        <Text>Stock: {stock}</Text>
        <Text>Store: {store.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    padding: 10,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
});
