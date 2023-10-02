import { StyleSheet, View, } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { useState } from "react";


export default function DiscoverScreen() {

  const [profiles, setProfiles] = useState([])

  const dismissCallback = () => {
    // remove from the index the dismissed card
    console.log('Parent has received!')
  }

  return (
    <View style={styles.container}>
      <SwipeableCard dismissCallback={dismissCallback} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContent: {
    paddingTop: 24
  },
  cardTitle: {
    marginBottom: 8
  }
})
