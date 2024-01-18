import { User } from '@angular/fire/auth';

export type MockUser = User | unknown;

export const mockLoggedUser: MockUser = {
  uid: '103245604871440207105',
  email: 'fake-email@gmail.com',
  emailVerified: true,
  displayName: 'Fake User',
  isAnonymous: false,
  photoURL: 'https://i.pravatar.cc/300    ',
  providerData: [
    {
      providerId: 'google.com',
      uid: '103245604871440207105',
      displayName: 'Fake User',
      email: 'fake-email@gmail.com',
      phoneNumber: null,
      photoURL: 'https://i.pravatar.cc/300        '
    }
  ]
} as unknown;
