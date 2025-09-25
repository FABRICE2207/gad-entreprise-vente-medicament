import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'KOALIN DE GOUMIN',
    description: 'Remède traditionnel à base de plantes pour les troubles digestifs et la purification du corps.',
    price: 5000,
    image: '/kaolin.jpg',
    category: 'Digestion',
    stock: 50,
    benefits: ['Améliore la digestion', 'Purifie le corps', 'Réduit les ballonnements']
  },
  {
    id: '2',
    name: 'HOMME FORT',
    description: 'Formule traditionnelle pour renforcer la vitalité masculine et améliorer la performance.',
    price: 10000,
    image: '/homme-fort.jpg',
    category: 'Vitalité',
    stock: 30,
    benefits: ['Améliore la vitalité', 'Renforce la performance', 'Boost l\'énergie']
  },
  {
    id: '3',
    name: 'KIT JOIE ENFANTEMENT',
    description: 'Kit complet de plantes médicinales pour accompagner la grossesse et faciliter l\'accouchement.',
    price: 15000,
    image: '/kit-enfantement.jpg',
    category: 'Maternité',
    stock: 25,
    benefits: ['Accompagne la grossesse', 'Facilite l\'accouchement', 'Réduit les douleurs']
  },
  {
    id: '4',
    name: 'SECRET D\'ADELE',
    description: 'Remède féminin traditionnel pour l\'équilibre hormonal et le bien-être intime.',
    price: 5000,
    image: '/secret-adele.jpg',
    category: 'Santé féminine',
    stock: 40,
    benefits: ['Équilibre hormonal', 'Bien-être intime', 'Régularise le cycle']
  },
  {
    id: '5',
    name: 'TRAITEMENT SIDA',
    description: 'Complément naturel pour renforcer le système immunitaire et améliorer la qualité de vie.',
    price: 15000,
    image: 'sida.jpg',
    category: 'Immunité',
    stock: 20,
    benefits: ['Renforce l\'immunité', 'Améliore la qualité de vie', 'Antioxydant naturel']
  },
  {
    id: '6',
    name: 'STOP CANCER',
    description: 'Formule préventive à base de plantes pour soutenir la lutte contre les cellules cancéreuses.',
    price: 10000,
    image: '/stop-cancer.jpg',
    category: 'Prévention',
    stock: 15,
    benefits: ['Action préventive', 'Propriétés antioxydantes', 'Renforce les défenses']
  },
  {
    id: '7',
    name: 'HEPATITE A,B,C,D,E',
    description: 'Traitement traditionnel complet pour toutes les formes d\'hépatites virales.',
    price: 10000,
    image: 'hepatite.jpg',
    category: 'Hépatique',
    stock: 25,
    benefits: ['Protège le foie', 'Action antivirale', 'Régénère les cellules hépatiques']
  }
];

export const categories = [
  'Tous',
  'Digestion',
  'Vitalité',
  'Maternité',
  'Santé féminine',
  'Immunité',
  'Prévention',
  'Hépatique'
];