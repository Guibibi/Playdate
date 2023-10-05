import { StyleSheet, Text, View, } from "react-native";
import SwipeableCard from "../components/SwipeableCard";
import { useEffect, useState } from "react";
import { createDog } from "../helpers/Dog";


export default function DiscoverScreen() {

  const [profiles, setProfiles] = useState([])

  // Called when SwipeableCard swipes left.
  const onSwipeLeft = () => {
    //Remove the profile from the array after dismissing it.
    console.log('Swiped left!')
    setProfiles((prevProfiles) => prevProfiles.slice(1));
  }

  // Called when SwipeableCard swipes right.
  const onSwipeRight = () => {
    //Remove the profile from the array after dismissing it.
    console.log('Swiped right!')
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

  return (
    <View style={styles.container}>
      {profiles.slice(0, 5).map((profile, i) => (
        <SwipeableCard name={profile.name} description={profile.description} imageUrl={profile.imageUrl} onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} id={profile.id} key={profile.id} />
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
