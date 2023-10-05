import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

/*
 * TODO: Create a store and store some fake conversation with it.
 * TODO: Create a ScrollableList (FlatList) that will render a custom chat preview component 
 * (Avatar on left, name as a title and last message under the title)
 * TODO: Fetch the store conversation, loop over all the conversation and render the chat preview into the flatlist
 * TODO: When clicking on a chat preview, open a stack navigator to the chatScreen.
 *
 */
export default function MessageScreen() {
  return (
    <SafeAreaView>
      <View >
        <Text>Message us!</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
  }
})
