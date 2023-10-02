import { StyleSheet, Text, View, } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { useEffect, useState } from "react";
import { createDog } from "../helpers/Dog";


export default function DiscoverScreen() {

  const [profiles, setProfiles] = useState([])

  const dismissCallback = (index) => {
    console.log('The index' + index);
    setProfiles(prevProfiles => prevProfiles.filter((profile, i) => i !== index))
    // TODO: Fix the removing part of the code
    // Could be caused by the .reverse (in the template) which create a copy of the array
  }

  // "Fetch" a dog and add it to our profiles
  const fetchDogs = async () => {
    if (profiles.length < 20) {
      createDog().then((dog) => {
        setProfiles((prevArr) => ([...prevArr, dog]))
      })
    }
  }

  // Fetch dogs, and add more if we are running out.
  useEffect(() => {
    fetchDogs();
  }, [profiles.length])

  return (
    <View style={styles.container}>
      <Text style={styles.debug}>{profiles[0].name}</Text>
      {profiles.map((profile, i) => (
        <SwipeableCard name={profile.name} description={profile.description} imageUrl={profile.imageUrl} dismissCallback={() => dismissCallback(i)} key={i} />
      )).reverse()}
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
  },
  debug: {
    position: 'absolute',
    top: 30
  }
})
