export interface PostApiResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CommentApiResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UserApiResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressApiResponse;
  phone: string;
  website: string;
  company: CompanyApiResponse;
}

export interface AddressApiResponse {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoApiResponse;
}

export interface GeoApiResponse {
  lat: string;
  lng: string;
}

export interface CompanyApiResponse {
  name: string;
  catchPhrase: string;
  bs: string;
}
