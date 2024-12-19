import { Location } from '@/core/types/weather';

export const BENIN_LOCATIONS: Location[] = [
  {
    id: 'cotonou',
    name: 'Cotonou',
    local_names: {
      fon: 'Kutonu',
      fr: 'Cotonou'
    },
    latitude: 6.3654,
    longitude: 2.4183,
    region: 'sud',
    department: 'Littoral',
    country: 'Bénin',
    timezone: 'Africa/Porto-Novo'
  },
  {
    id: 'porto-novo',
    name: 'Porto-Novo',
    local_names: {
      fon: 'Xǒgbónú',
      yoruba: 'Ajashe',
      fr: 'Porto-Novo'
    },
    latitude: 6.4969,
    longitude: 2.6283,
    region: 'sud',
    department: 'Ouémé',
    country: 'Bénin',
    timezone: 'Africa/Porto-Novo'
  },
  {
    id: 'parakou',
    name: 'Parakou',
    local_names: {
      dendi: 'Parakuu',
      fr: 'Parakou'
    },
    latitude: 9.3371,
    longitude: 2.6284,
    region: 'nord',
    department: 'Borgou',
    country: 'Bénin',
    timezone: 'Africa/Porto-Novo'
  },
  {
    id: 'natitingou',
    name: 'Natitingou',
    local_names: {
      ditammari: 'Nantibatingou',
      fr: 'Natitingou'
    },
    latitude: 10.3042,
    longitude: 1.3793,
    region: 'nord',
    department: 'Atakora',
    country: 'Bénin',
    timezone: 'Africa/Porto-Novo'
  },
  {
    id: 'kandi',
    name: 'Kandi',
    local_names: {
      dendi: 'Kandi',
      fr: 'Kandi'
    },
    latitude: 11.1342,
    longitude: 2.9385,
    region: 'nord',
    department: 'Alibori',
    country: 'Bénin',
    timezone: 'Africa/Porto-Novo'
  }
];