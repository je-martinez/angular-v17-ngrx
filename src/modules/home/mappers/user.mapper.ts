import { PojosMetadataMap } from '@automapper/pojos';
import {
  AddressApiResponse,
  CompanyApiResponse,
  GeoApiResponse,
  UserApiResponse
} from '../types/content-wall.api.types';
import { Address, Company, Geo, User } from '../types/content-wall.types';
import { MapperKeys } from './mappers.keys';

export function createUserMetadata() {
  PojosMetadataMap.create<GeoApiResponse>(MapperKeys.GeoApiResponse, {
    lat: String,
    lng: String
  });

  PojosMetadataMap.create<Geo>(MapperKeys.Geo, {
    lat: String,
    lng: String
  });

  PojosMetadataMap.create<CompanyApiResponse>(MapperKeys.CompanyApiResponse, {
    name: String,
    catchPhrase: String,
    bs: String
  });

  PojosMetadataMap.create<Company>(MapperKeys.Company, {
    name: String,
    catchPhrase: String,
    bs: String
  });

  PojosMetadataMap.create<AddressApiResponse>(MapperKeys.AddressApiResponse, {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: MapperKeys.GeoApiResponse
  });

  PojosMetadataMap.create<Address>(MapperKeys.Address, {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: MapperKeys.Geo
  });

  PojosMetadataMap.create<UserApiResponse>(MapperKeys.UserApiResponse, {
    id: Number,
    name: String,
    username: String,
    email: String,
    address: MapperKeys.AddressApiResponse,
    phone: String,
    website: String,
    company: MapperKeys.CompanyApiResponse
  });

  PojosMetadataMap.create<User>(MapperKeys.User, {
    id: Number,
    name: String,
    username: String,
    email: String,
    address: MapperKeys.Address,
    phone: String,
    website: String,
    company: MapperKeys.Company
  });
}
