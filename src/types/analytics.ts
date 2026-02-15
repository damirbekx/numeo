export interface AnalyticsData {
  total_users: number;
  active_users: number;
  top_countries: {
    country: string;
    count: number;
  }[];
  top_occupations: {
    occupation: string;
    count: number;
  }[];
  average_age: number;
}
