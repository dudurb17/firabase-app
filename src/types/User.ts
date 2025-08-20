import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  age: string;
  position?: string;
  createdAt?: Timestamp;
}
