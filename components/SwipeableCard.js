import { useRef } from "react";
import { StyleSheet, View, Animated, PanResponder, useWindowDimensions } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function SwipeableCard(props) {
  const { height, width } = useWindowDimensions()
  const panPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      panPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
      console.log(panPosition.x)
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(panPosition, {
          toValue: { x: width + 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          // Dismiss the card when we swipe it to the right.
          dismissCard()
        })
      } else if (gestureState.dx < -120) {
        Animated.spring(panPosition, {
          toValue: { x: -width, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          // Dismiss the card when we swipe it to the left.
          dismissCard()
        })
      }
    }
  }))

  const panRotation = panPosition.x.interpolate({
    inputRange: [-width / 2, 0, height / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: 'clamp'
  })


  const dismissCard = () => {
    // Callback for when the card gets dismissed
    props.dismissCallback();
  }

  return (
    <Animated.View style={{ transform: [{ translateX: panPosition.x }, { translateY: panPosition.y }, { rotate: panRotation }] }} {...panResponder.current.panHandlers}>
      <Card>
        <Card.Cover source={{ uri: 'https://images.dog.ceo/breeds/malamute/n02110063_11227.jpg' }} />
        <Card.Content style={styles.cardContent}>
          <Text variant='titleLarge' style={styles.cardTitle}>Jack</Text>
          <Text variant='bodyMedium'>Looking for some friends to go to the dogpark. I'm a very energtic dog who loves to play play and play!</Text>
        </Card.Content>
        <Card.Actions style={{ marginTop: 80 }}>
          <View style={styles.cardActions}>
            <IconButton onPress={dismissCard} mode='contained' icon='window-close' size={40} iconColor='red' containerColor='white' />
            <IconButton onPress={dismissCard} mode='contained' icon='check' size={40} iconColor='green' containerColor='white' />
          </View>
        </Card.Actions>
      </Card >
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  cardContent: {
    paddingTop: 24
  },
  cardTitle: {
    marginBottom: 8
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
