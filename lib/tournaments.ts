export interface Tournament {
  id: string;
  name: string;
  date: string;
  city: string;
  country: string;
  zalamo_link: string;
  upcoming: boolean;
}

export const tournaments: Tournament[] = [
  {
    id: "1",
    name: "Mistrzostwa Polski w Tańcu Standardowym",
    date: "2026-11-15",
    city: "Warszawa",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: true,
  },
  {
    id: "2",
    name: "Grand Prix Krakowa",
    date: "2026-09-28",
    city: "Kraków",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "3",
    name: "Copernicus Cup",
    date: "2026-06-14",
    city: "Toruń",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "4",
    name: "Wrocław Dance Festival",
    date: "2026-04-05",
    city: "Wrocław",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "5",
    name: "Baltic Dance Cup",
    date: "2025-10-18",
    city: "Gdańsk",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "6",
    name: "Silesia Open",
    date: "2025-03-22",
    city: "Katowice",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "7",
    name: "Lublin Dance Trophy",
    date: "2024-11-09",
    city: "Lublin",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
  {
    id: "8",
    name: "Poznań International",
    date: "2024-05-25",
    city: "Poznań",
    country: "PL",
    zalamo_link: "#zalamo-link",
    upcoming: false,
  },
];
