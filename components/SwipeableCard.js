import { useRef, } from "react";
import { StyleSheet, View, Animated, PanResponder, useWindowDimensions } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function SwipeableCard(props) {
  const { height, width } = useWindowDimensions()
  const SWIPE_THRESHOLD = 120;

  // Current position of the card
  const panPosition = useRef(new Animated.ValueXY()).current;

  // Controls how to react to the movement of the card
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      panPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
    },
    // Check if we swipe the card until a certain threshold to determine if we dismiss the card or not.
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > SWIPE_THRESHOLD) {
        Animated.spring(panPosition, {
          toValue: { x: width + 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          // User has swiped card to the right
          onSwipeRight()
        })
      } else if (gestureState.dx < -SWIPE_THRESHOLD) {
        Animated.spring(panPosition, {
          toValue: { x: -width, y: gestureState.dy },
          useNativeDriver: true,
        }).start(() => {
          // User has swiped card to the left
          onSwipeLeft()
        })
      } else {
        // Resets the card in the middle if we haven't gone past the threshold
        Animated.spring(panPosition, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true
        }).start()
      }
    }
  }))

  // Clamp our rotation to mimic the swipeable card effect
  const panRotation = panPosition.x.interpolate({
    inputRange: [-width / 2, 0, height / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: 'clamp'
  })


  // Callback for when the card gets swiped right
  const onSwipeLeft = () => {
    props.onSwipeLeft();
  }

  // Callback for when the card gets swiped left
  const onSwipeRight = () => {
    props.onSwipeRight();
  }

  // Callback for when left button gets pressed
  const onPressLeftButton = () => {
    props.onSwipeLeft()
  }

  // Callback for when right button gets pressed
  const onPressRightButton = () => {
    props.onSwipeRight()
  }

  return (
    <Animated.View style={{ position: 'absolute', transform: [{ translateX: panPosition.x }, { translateY: panPosition.y }, { rotate: panRotation }] }} {...panResponder.current.panHandlers}>
      <Card mode='contained' style={styles.cardContainer}>
        <Card.Cover source={{ uri: props.imageUrl }} />
        <Card.Content style={styles.cardContent}>
          <Text variant='titleLarge' style={styles.cardTitle}>{props.name}</Text>
          <Text variant='bodyMedium'>{props.description}</Text>
        </Card.Content>
        <Card.Actions style={{ marginTop: 80 }}>
          <View style={styles.cardActions}>
            <IconButton onPress={onPressLeftButton} mode='contained' icon='window-close' size={40} iconColor='red' containerColor='white' />
            <IconButton onPress={onSwipeRight} mode='contained' icon='check' size={40} iconColor='green' containerColor='white' />
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
  },
  cardContainer: {
    width: 300,
  }
})
