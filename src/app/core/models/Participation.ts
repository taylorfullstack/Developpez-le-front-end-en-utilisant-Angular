/**
 * @interface Participation
 *
 * @description
 * A Participation is a single participation of a country in the Olympic Games in a specific year
 *
 * @example
 * const myOlympicParticipation: Participation = {
 *  id: 1,
 *  year: 2012,
 *  city: "Londres",
 *  medalsCount: 28,
 *  athleteCount: 372
 * }
 */
export interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
