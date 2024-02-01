import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { BASE_HOST } from "../../config/baseUrl";
import http from "../../config/httpConfig";
import Store from "./Store";
import Colors from "../../utils/Colors";

export default function StoreScreen() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEndpoint = BASE_HOST + "/product";
        const authToken = await AsyncStorage.getItem("token");
        console.log(authToken);

        const response = await http.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Store
        name={item.name}
        desc={item.description}
        id={item.id}
        price={item.productPrice[0].price}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>All Store</Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 16,
    color: Colors.PRIMARY_COLOR,
    fontWeight: "bold",
  },
});
