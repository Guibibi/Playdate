import { useRef, memo } from "react";
import { StyleSheet, View, Animated, PanResponder, useWindowDimensions } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

const  SwipeableCard = memo((props) => {
  const { height, width } = useWindowDimensions()

  // Current position of the card
  const panPosition = useRef(new Animated.ValueXY()).current;

  // Controls how to react to the movement of the card
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      panPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
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
      } else {
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


  // Callback for when the card gets dismissed
  const dismissCard = () => {
    props.dismissCallback();
  }

  return (
    <Animated.View style={{ position: 'absolute', transform: [{ translateX: panPosition.x }, { translateY: panPosition.y }, { rotate: panRotation }] }} {...panResponder.current.panHandlers}>
      <Card style={styles.cardContainer}>
        <Card.Cover source={{ uri: props.imageUrl }} />
        <Card.Content style={styles.cardContent}>
          <Text variant='titleLarge' style={styles.cardTitle}>{props.name}</Text>
          <Text variant='bodyMedium'>{props.description}</Text>
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
})

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

export default SwipeableCard;
