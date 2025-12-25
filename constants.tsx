
import { Category, Product, FPOInfo } from './types';

export const FPO_DATA: FPOInfo = {
  name: 'AKKIDI',
  tagline: 'Led by women Self-Help Groups. Promoting Healthy Eating Habits with Goodness of Millets.',
  description: 'Akkidi is a vibrant Farmer Producer Organization (FPO) dedicated to bridging the gap between rural farmers and conscious consumers. We empower local women self-help groups to process and market nutrient-rich millets and organic produce, ensuring fair prices for farmers and healthy food for our community.',
  phone: ['+91 8247859632', '+91 9010151602'],
  email: ['Janjeevanamacs.12@gmail.com', 'gowthamgandhi@wassan.org'],
  address: 'Rythu Angadi, Near K.K.Hospital, Madanapalli Main Road, Kadiri, Sri Sathya Sai District-515591, Andhra Pradesh'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Ground Nuts',
    category: Category.GROUND_NUTS,
    price: 120,
    description: 'Freshly harvested, protein-rich ground nuts from Kadiri farms.',
    image: 'https://picsum.photos/seed/groundnuts/600/400',
    unit: 'kg'
  },
  {
    id: '2',
    name: 'Millet Ladoo',
    category: Category.RTE,
    price: 250,
    description: 'Traditional sweet made with foxtail millet and organic jaggery.',
    image: 'https://picsum.photos/seed/ladoo/600/400',
    unit: 'box'
  },
  {
    id: '3',
    name: 'Fresh Spinach',
    category: Category.VEGETABLES,
    price: 30,
    description: 'Locally grown pesticide-free fresh green spinach.',
    image: 'https://picsum.photos/seed/spinach/600/400',
    unit: 'bundle'
  },
  {
    id: '4',
    name: 'Ragi Malt Powder',
    category: Category.RTE,
    price: 180,
    description: 'Nutritious finger millet drink mix for a healthy start.',
    image: 'https://picsum.photos/seed/ragi/600/400',
    unit: 'pack'
  }
];
