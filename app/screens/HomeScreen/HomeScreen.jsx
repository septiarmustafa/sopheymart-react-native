import { View, StyleSheet, FlatList, Text } from "react-native";
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
      <View style={styles.content}>
        <Text style={styles.title}>Products</Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    padding: 10,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
});
