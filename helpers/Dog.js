import { faker } from '@faker-js/faker'
import uuid from 'react-native-uuid'

class Dog {
  constructor(id, name, description, imageUrl) {
    this.id = uuid.v4();
    this.name = faker.person.firstName();
    this.description = faker.person.bio();
    this.imageUrl = imageUrl;
  }
}

export async function createDog(id, name, description) {
  // Add a small delay (else we get the same image back);
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Fetch a random dog image from the API
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();

  // Create and return our new dog.
  const dog = new Dog(id, name, description, data.message);
  return dog;
}
