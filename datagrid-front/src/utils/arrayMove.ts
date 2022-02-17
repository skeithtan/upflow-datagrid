/**
 * Moves an array item from a given index to a destination index.
 * @param array
 * @param fromIndex
 * @param toIndex
 */
export default function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const newArray = [...array];
  const element = newArray[fromIndex];
  newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, element);
  return newArray;
}