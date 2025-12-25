
export enum Category {
  GROUND_NUTS = 'Ground Nuts',
  VEGETABLES = 'Vegetables',
  CROPS = 'Crops',
  RTE = 'Ready to Eat (RTE)'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  unit: string;
}

export interface FPOInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string[];
  email: string[];
  address: string;
}
