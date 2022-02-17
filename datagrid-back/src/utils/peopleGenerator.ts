export interface Person {
  id: number;
  name: string;
  age: number;
  favoriteFruit: string;
  continent: string;
  pet?: string;
}

const CONTINENTS = ["Asia", "Europe", "Africa", "Oceania", "North America", "South America", "Antarctica"];
const FRUITS = ["Apple", "Banana", "Orange", "Watermelon", "Tomato", "Strawberry"];
const PETS = ["Hamster", "Dog", "Cat", "Fish", "Parrot", undefined];

function randomString(length: number = 8): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}

function randomArrayEntry<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createRandomPerson(id: number = 0): Person {
  return {
    id,
    name: randomString(),
    age: Math.floor(Math.random() * 99) + 1,
    favoriteFruit: randomArrayEntry(FRUITS),
    continent: randomArrayEntry(CONTINENTS),
    pet: randomArrayEntry(PETS),
  };
}

export default function generatePeople(rowCount: number = 100_000): Person[] {
  const data = [];
  for (let i = 1; i <= rowCount; i++) {
    const person = createRandomPerson(i);
    data.push(person);
  }

  return data;
}