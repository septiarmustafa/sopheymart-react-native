import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utils/Colors";
import ItemProduct from "../../components/ItemProduct";
import Slider from "./Slider";
import { BASE_HOST } from "../../config/baseUrl";
import http from "../../config/httpConfig";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiEndpoint = BASE_HOST + "/product";

    http
      .get(apiEndpoint)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <ItemProduct
        style={styles.cardProduct}
        name={item.name}
        desc={item.description}
        id={item.id}
        price={item.productPrice[0].price}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Slider />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>New Arrivals</Text>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
          <Text style={styles.title}>Recommended For You</Text>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
          <Text style={styles.title}>Best Seller</Text>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  cardProduct: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  title: {
    fontSize: 16,
    padding: 10,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
});
