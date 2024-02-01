import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utils/Colors";
import { Text } from "react-native";

export default function ProductDetailScreen({ route }) {
  // Extract detailedProduct from route.params
  const { detailedProduct } = route.params;
  // Extract id from detailedProduct
  const { productId: id } = detailedProduct.data;

  // Now id should be defined
  console.log(" id : " + id);
  console.log(" detailed product ======= " + detailedProduct.data);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Product Detail</Text>
        {/* Display other details of the product using detailedProduct */}
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
