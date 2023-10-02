import { faker } from '@faker-js/faker'

class Dog {
  constructor(name, description, imageUrl) {
    this.name = faker.person.firstName();
    this.description = faker.person.bio();
    this.imageUrl = imageUrl;
  }
}

export async function createDog(name, description) {
  // Fetch a random dog image from the API
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await response.json();

  // Create and return our new dog.
  const dog = new Dog(name, description, data.message);
  return dog;
}
