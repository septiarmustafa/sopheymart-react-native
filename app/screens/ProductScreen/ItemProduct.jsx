import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { BASE_HOST } from "../../config/baseUrl";
import http from "../../config/httpConfig";

export default function ItemProduct({ id, name, desc, price }) {
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const apiEndpoint = `${BASE_HOST}/product/${id}`;
      const response = await http.get(apiEndpoint);

      const detailedProduct = response.data;
      console.log("detail == " + detailedProduct);

      navigation.navigate("ProductDetail", { detailedProduct });
    } catch (error) {
      console.error("Error fetching detailed product information:", error);
    }
  };
  return (
    <TouchableOpacity style={styles.containerItem} onPress={handlePress}>
      <Image
        source={require("../../../assets/images/latte.jpg")}
        style={styles.imageItem}
      />
      <View style={styles.textItem}>
        <Text style={styles.titleItem}>{name}</Text>
        <Text>{desc}</Text>
        <Text>Rp {price}</Text>
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
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
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
    marginLeft: 10,
    flex: 1,
  },
  titleItem: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.PRIMARY_COLOR,
  },
});
