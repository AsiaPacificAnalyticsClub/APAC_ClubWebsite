import { Year } from "@/app/DSW/page";

export enum EventType {
  GAME = "game",
  EVENTS = "event",
}

export interface DswDetails {
  /**
   * Date range of the event period
   * @remarks Displayed in the page header
   * @example "24 June - 26 June"
   * @example "TBD"
   */
  date: string;

  /**
   * Link to photo gallery (e.g. OneDrive)
   * @remarks Can be null if photos are not available yet
   * @example "https://example.com/photos"
   * @example null
   */
  photoLink: string | null;
}

export interface DswItem {
  /**
   * MongoDB ObjectId as string
   * @example "661f3a8c9d1234567890abcd"
   */
  _id: string;

  /**
   * Event or game title
   * @example "Find the Key"
   */
  title: string;

  /**
   * Full description shown on hover
   * @example "We set up the Find The Key Competition just for you..."
   */
  detailedDescription: string;

  /**
   * Main image path (served from /public)
   * @example "/dsw_FindKey.png"
   */
  image: string;

  /**
   * Optional gallery images
   * @remarks Used for additional images in carousel view
   * @example ["/dsw_DataHack.png", "/dsw_DataHack_Rules.png"]
   */
  images?: string[];

  /**
   * External registration or info link
   * @example "https://app.youths.asia/event/xyz"
   */
  link: string;

  /**
   * Date in ISO format (YYYY-MM-DD)
   * @example "2025-06-24, Tues"
   */
  date: string;

  /**
   * Display time range
   * @example "9:30 AM - 11:30 AM"
   */
  time: string;

  /**
   * Event location or platform
   * @example "APU Campus Block A, Auditorium 3"
   */
  venue: string;

  /**
   * Status label used for UI badges
   * @remarks Controls badge color in UI
   * @example "Past"
   */
  tags: "Past" | "Ongoing" | "Upcoming";

  /**
   * Registration status
   * @remarks Determines registration button state
   * @example "Open"
   */
  regStatus: "Open" | "Closed" | "Full";

  /**
   * Event year
   * @remarks Used for filtering and url parameters ONLY
   * @example 2025
   */
  year: Year;

  /**
   * Item category
   * @remarks Used for filtering and url parameters ONLY
   * @example "games"
   */
  type: EventType;
}