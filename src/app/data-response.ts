export interface UserData {
  data: UserDetails;
  support: Support;
}

interface Support {
  url: string;
  text: string;
}

export interface DataResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
  support: Support;
}

export interface UserDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
