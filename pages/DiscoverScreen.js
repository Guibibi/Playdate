import { StyleSheet, Text, View, } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { useEffect, useState } from "react";
import { createDog } from "../helpers/Dog";


export default function DiscoverScreen() {

  const [profiles, setProfiles] = useState([])
  const [shouldFetch, setShouldFetch ] = useState(true);

  const dismissCallback = () => {
    setProfiles((prevProfiles) => prevProfiles.slice(1));
  }

  // "Fetch" a dog and add it to our profiles
  const fetchDogs = async () => {
    if (profiles.length <= 5 ) {
      const newProfiles = await Promise.all(
        Array.from({length: 20}, createDog)
      );
        setProfiles((prevProfiles) => ([...prevProfiles, ...newProfiles]))
    }
  }

  // Fetch dogs, and add more if we are running out.
  useEffect(() => {
    fetchDogs();
  }, [profiles.length])

  //WARNING: Lag starts when rendering too much elements, investigating way to optimise performance.
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
