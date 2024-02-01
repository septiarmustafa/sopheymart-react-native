import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const getUserDataFromStorage = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedRole = await AsyncStorage.getItem("role");

      if (storedUsername) {
        setUsername(storedUsername);
      }

      if (storedRole) {
        setRole(storedRole);
      }
    } catch (error) {
      console.error("Error getting user data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");

      navigation.navigate("Login");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require("./../../../assets/images/young.jpeg")}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{username}</Text>
        <Text style={styles.userName}>{role}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookingScreen");
        }}
      >
        <View style={styles.card}>
          <AntDesign name="hearto" size={26} color="black" />
          <Text style={styles.cardText}>Wishlist</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.card}>
        <AntDesign name="shoppingcart" size={26} color="black" />
        <Text style={styles.cardText}>Order</Text>
      </View>
      <View style={styles.card}>
        <AntDesign name="file1" size={26} color="black" />
        <Text style={styles.cardText}>History Order</Text>
      </View>
      <View style={styles.card}>
        <Ionicons name="settings-outline" size={26} color="black" />
        <Text style={styles.cardText}>Setting Account</Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.card}>
          <AntDesign name="logout" size={26} color="black" />
          <Text style={styles.cardText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.PRIMARY_COLOR,
  },
  userName: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit_bold",
    marginTop: 15,
  },
  card: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: "outfit",
    color: Colors.PRIMARY_COLOR,
  },
  logo: {
    flexDirection: "row",
  },
});
