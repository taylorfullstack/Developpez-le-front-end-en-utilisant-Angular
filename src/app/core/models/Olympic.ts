import { Participation } from "./Participation";

/**
 * @interface Olympic
 *
 * @description
 * An Olympic is a country that has participated in the Olympic Games
 *
 * This interface should be used in the olympic.service.ts
 *
 * @example
 * const olympicCountry: Olympic = {
 *  id: 1,
 *  country: "Italy",
 *  participations: [],
 * }
 */
export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
