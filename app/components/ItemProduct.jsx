import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { BASE_HOST } from "../config/baseUrl";
import http from "../config/httpConfig";

export default function ItemProduct({ id, name, desc, price }) {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const apiEndpoint = `${BASE_HOST}/product/${id}`;
      const response = await http.get(apiEndpoint);

      const detailedProduct = response.data;
      console.log("detail ========= " + detailedProduct);

      navigation.navigate("ProductDetail", { detailedProduct });
    } catch (error) {
      console.error("Error fetching detailed product information:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={require("../../assets/favicon.png")}
        style={styles.imageItem}
      />
      <View style={styles.textItem}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  containerItem: {
    margin: 2,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 16,
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageItem: {
    width: 150,
    height: 150,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
  },
  textItem: {
    padding: 10,
    flex: 1,
  },
  titleItem: {
    fontSize: 12,
    color: Colors.PRIMARY_COLOR,
  },
});
