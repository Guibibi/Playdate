import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

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
