import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
// import GlobalApi from "../../utils/GlobalApi";

export default function Slider() {
  return (
    <View>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.sliderImage} key={index} source={item.image} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    margin: 10,
    fontFamily: "outfit_medium",
  },
  sliderImage: {
    width: 230,
    height: 150,
    borderRadius: 10,
    objectFit: "contain",
    margin: 10,
    resizeMode: "contain",
  },
});

const slider = [
  {
    id: 1,
    image: require("../../../assets/images/banner-1.jpg"),
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: 3,
    image: require("../../../assets/images/banner-3.jpg"),
    title: "Title 3",
    description: "Description 3",
  },
  {
    id: 4,
    image: require("../../../assets/images/banner-4.jpg"),
    title: "Title 3",
    description: "Description 3",
  },
];
