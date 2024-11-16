/**
 * Maps a number from one range to another.
 *
 * @param value - The input value to map.
 * @param start1 - The lower bound of the input range.
 * @param stop1 - The upper bound of the input range.
 * @param start2 - The lower bound of the output range.
 * @param stop2 - The upper bound of the output range.
 * @param withinBounds - Whether to constrain the result within the output range. Defaults to `false`.
 * @returns The mapped value.
 */
export function map(value: number, start1: number, stop1: number, start2: number, stop2: number, withinBounds = false) {
  const mappedValue = start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1);
  
  if (withinBounds) {
    if (start2 < stop2) {
      return Math.min(Math.max(mappedValue, start2), stop2);
    } else {
      return Math.min(Math.max(mappedValue, stop2), start2);
    }
  }
  
  return mappedValue;
}
