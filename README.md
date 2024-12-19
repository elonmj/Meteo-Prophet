
## 📚 Architecture du Projet

### 🧩 Components

La structure des composants est divisée en trois parties principales :

1. **`/components/errors`**
   ```typescript
   // errors/main.tsx - Pour gérer les erreurs globales
   export const ErrorDisplay = ({ 
     error, 
     reset 
   }: { 
     error: Error; 
     reset: () => void 
   }) => {
     return (
       <div>
         <h2>Une erreur est survenue</h2>
         <button onClick={reset}>Réessayer</button>
       </div>
     );
   };
   ```

2. **`/components/features`**
   - Contient les composants spécifiques à chaque fonctionnalité
   ```
   features/
   ├─ weather/
   │  ├─ WeatherMap.tsx
   │  ├─ WeatherDisplay.tsx
   │  ├─ WeatherChart.tsx
   │  └─ WeatherStats.tsx
   ├─ locations/
   │  ├─ LocationList.tsx
   │  └─ LocationSelector.tsx
   └─ statistics/
      └─ StatisticsDisplay.tsx
   ```

3. **`/components/ui`**
   - Composants UI réutilisables
   ```
   ui/
   ├─ Button.tsx
   ├─ Card.tsx
   ├─ Input.tsx
   ├─ Select.tsx
   ├─ Spinner.tsx
   ├─ layout/
   │  ├─ Header.tsx
   │  ├─ Footer.tsx
   │  └─ MobileNav.tsx
   └─ notifications/
      └─ Toast.tsx
   ```

### 📁 Core

Le dossier core contient la logique fondamentale de l'application :

1. **`/core/config`**
   ```typescript
   // env.ts
   export const env = {
     API_URL: process.env.NEXT_PUBLIC_API_URL,
     API_KEY: process.env.NEXT_PUBLIC_API_KEY,
     // ...
   };

   // theme/ThemeProvider.tsx
   // Configuration du thème avec support clair/sombre
   ```

2. **`/core/constants`**
   ```typescript
   // apiRoutes.ts
   export const API_ROUTES = {
     weather: {
       forecast: '/api/weather/forecast',
       historical: '/api/weather/historical'
     }
   };

   // locations.ts
   export const LOCATIONS = [
     { id: 'cotonou', name: 'Cotonou', lat: 6.3654, lon: 2.4183 }
     // ...
   ];
   ```

3. **`/core/hooks`**
   ```typescript
   // api/useFetch.ts
   export const useFetch = <T>(url: string, options?: RequestOptions) => {
     // Logique de fetch avec gestion d'état
   };

   // api/useMutation.ts
   export const useMutation = <T>(url: string) => {
     // Logique de mutation (POST, PUT, DELETE)
   };
   ```

4. **`/core/libs`**
   ```typescript
   // apiClient.ts
   export const api = {
     get: async <T>(url: string) => {
       // Logique de requête GET
     },
     post: async <T>(url: string, data: any) => {
       // Logique de requête POST
     }
   };
   ```

### 📂 App (Pages)

Structure des pages avec Next.js App Router :

```
app/
├─ page.tsx              # Page d'accueil
├─ layout.tsx            # Layout principal
├─ loading.tsx           # État de chargement global
├─ error.tsx            # Gestion d'erreur globale
├─ not-found.tsx        # Page 404
├─ weather/
│  └─ [location]/
│     └─ page.tsx       # Page détaillée par location
└─ statistics/
   └─ page.tsx          # Page des statistiques
```

### 🛠️ Utils et Helpers

```typescript
// utils/logger.ts
export const logger = {
  info: (message: string) => console.log(message),
  error: (error: Error) => console.error(error)
};

// utils/weatherUtils.ts
export const formatTemperature = (temp: number) => `${temp}°C`;
export const calculateWindDirection = (degrees: number) => {
  // Logique de conversion des degrés en direction
};
```

### 🎣 Hooks Personnalisés

```typescript
// hooks/useWeather.ts
export const useWeather = (location: string) => {
  const { data, error } = useFetch(`/api/weather/${location}`);
  return {
    weatherData: data,
    isLoading: !data && !error,
    error
  };
};

// hooks/useLocalStorage.ts
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Logique de gestion du localStorage
};
```

### 🔍 Bonnes Pratiques

1. **Organisation des imports** :
   ```typescript
   // Imports externes
   import React from 'react';
   import { useQuery } from '@tanstack/react-query';

   // Imports internes
   import { useWeather } from '@/hooks/useWeather';
   import { WeatherDisplay } from '@/components/features/weather';

   // Imports de types
   import type { WeatherData } from '@/types';
   ```

2. **Gestion des erreurs** :
   ```typescript
   // middleware/error.ts
   export const errorMiddleware = (handler: NextApiHandler) => {
     return async (req: NextApiRequest, res: NextApiResponse) => {
       try {
         return await handler(req, res);
       } catch (error) {
         // Logique de gestion d'erreur
       }
     };
   };
   ```

3. **Types** :
   ```typescript
   // types/weather.ts
   export interface WeatherData {
     temperature: number;
     humidity: number;
     windSpeed: number;
     // ...
   }

   export type LocationId = string;
   export type Region = 'north' | 'south' | 'center';
   ```

### 📝 Notes Importantes

1. **Gestion d'État** :
   - Utilisez React Query pour les requêtes API
   - Préférez les hooks personnalisés pour la logique réutilisable
   - Évitez les états globaux inutiles

2. **Performance** :
   - Implémentez le chargement progressif avec Suspense
   - Utilisez les images optimisées de Next.js
   - Mettez en cache les données météo appropriées

3. **Sécurité** :
   - Validez toutes les entrées utilisateur
   - Utilisez les variables d'environnement pour les secrets
   - Implémentez le rate limiting pour l'API

