import { Category } from 'src/catalogue/types';

export interface TDate {
  formatted: string;
  normalised: number;
}

export interface ReviewNormalised {
  id: string;
  device: Category;
  author: string;
  rating: number;
  message: string;
  date: TDate;
  pros: string[];
  cons: string[];
}
