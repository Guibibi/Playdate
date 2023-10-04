import { StyleSheet, Text, View, } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { useEffect, useState } from "react";
import { createDog } from "../helpers/Dog";


export default function DiscoverScreen() {

  const [profiles, setProfiles] = useState([])

  const dismissCallback = () => {
    // NOTE: I could track the index and make it so that we fetch more profiles if we get 
    // close to the end of the array
    setProfiles((prevProfiles) => prevProfiles.slice(1));
  }

  // "Fetch" a dog and add it to our profiles
  const fetchDogs = async () => {
    if (profiles.length < 20 ) {
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
      {profiles.map((profile, i) => (
        <SwipeableCard name={profile.name} description={profile.description} imageUrl={profile.imageUrl} dismissCallback={dismissCallback} id={profile.id} key={profile.id} />
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
})
