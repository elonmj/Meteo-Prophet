# 📁 Core

## 📚 Table des matières

- [🔧 Config (`/core/config`)](#🔧-config-coreconfig)
- [🎯 Constants (`/core/constants`)](#🎯-constants-coreconstants)
- [📚 Libs (`/core/libs`)](#📚-libs-corelibs)
  - [Clients API (`apiClients.ts`)](#clients-api-apiclientsts)
  - [Fonctionnalités intégrées](#⚙️-fonctionnalités-intégrées)
- [🎣 Hooks (`/core/hooks`)](#🎣-hooks-corehooks)
  - [API Hooks (`useFetch`, `useMutation`)](#api-hooks-usefetch-usemutation)
  - [Error Hooks (`useError`)](#error-hooks-useerror)
  - [Storage Hooks (`useCookie`, `useLocalStorage`)](#storage-hooks-usecookie-uselocalstorage)
- [📊 Models (`/core/models`)](#📊-models-coremodels)
- [🛠 Utils (`/core/utils`)](#🛠-utils-coreutils)

Le dossier `core` contient les éléments fondamentaux de l'application. Toute modification/apport concernant les fondamentaux de l'app devront être ajoutées à ce dossier.

### 🔧 Config (`/core/config`)

- `env.ts` : Gestion des variables d'environnement et configuration globale de l'application

### 🎯 Constants (`/core/constants`)

- `apiRoutes.ts` : Définit les routes API utilisées pour communiquer avec le backend. Centraliser ces routes ici permet de les modifier facilement sans parcourir tout le code.

  ```typescript
  // Exemple d'utilisation
  import {API_ROUTES} from '@/lib/apiRoutes';

  fetch(API_ROUTES.users.base);
  fetch(API_ROUTES.users.byId('123'));
  ```

- `index.ts :` Définit toutes les constantes utilisées dans le projet

### 📚 Libs (`/core/libs`)

- **Database** :

  - `ensure.connection.ts` : Gestion de la connexion à la base de données
  - `sequelize.ts` : Configuration de Sequelize (ORM)

- **apiClients.ts** : Configuration des clients API

  Ce module fournit un client d'API générique pour effectuer des requêtes HTTP vers une API. Il gère les opérations de récupération (GET), de création (POST), de mise à jour (PUT, PATCH) et de suppression (DELETE), tout en facilitant la gestion des paramètres, des en-têtes, et des cookies.

  #### Structure des options de requête

  Les options de requête (`RequestOptions`) permettent de personnaliser chaque appel d'API :

  - `method` : Méthode HTTP (GET, POST, PUT, PATCH, DELETE).
  - `headers` : En-têtes supplémentaires pour la requête.
  - `body` : Données à envoyer (pour POST, PUT, PATCH).
  - `cookie` : Cookie spécifique à envoyer avec la requête.
  - `params` : Paramètres de requête sous forme d'objet (`key: value`).

  ***

  ### Comment utiliser ce client d'API ?

  #### Exemple d'importation :

  ```typescript
  import {api} from '@/core/libs/apiClients';
  ```

  #### Exemple d'utilisation : `GET`

  ```typescript
  const articles = await api.get<Article>(API_ROUTES.articles.base, {
    params: {limit: 10, offset: 0},
  });

  const user = await api.get<User>(API_ROUTES.users.byId(id));
  ```

  #### GET avec paramètres d'URL

  ```typescript
  // Recherche d'utilisateurs avec filtres
  const searchUsers = async () => {
    const response = await api.get<User[]>('/users', {
      params: {
        role: 'admin',
        active: true,
        search: 'john',
      },
    });
    return response;
  };
  ```

  #### Exemple d'utilisation : `POST`

  ```typescript
  const response = await api.post<Article>('/articles', articleData);
  ```

  #### Requête avec headers personnalisés

  ```typescript
  // Ajout d'un token d'autorisation
  const getProtectedData = async () => {
    const response = await api.get('/protected-route', {
      headers: {
        Authorization: 'Bearer your-token-here',
      },
    });
    return response;
  };
  ```

  ### ⚙️ Fonctionnalités intégrées

  1. **Gestion automatique du Content-Type** :

  - `Content-Type: application/json` par défaut
  - `Accept: application/json` pour toutes les requêtes

  2. **Gestion des cookies** :

  - Support des cookies via l'option `credentials: 'include'`
  - Possibilité d'ajouter des cookies personnalisés

  3. **Transformation des paramètres d'URL** :

  - Conversion automatique des paramètres en query string
  - Filtrage des paramètres undefined/null

  4. **Gestion des erreurs** :

  - Vérification automatique du statut de la réponse
  - Le client gère automatiquement les erreurs :
    ```typescript
    try {
      await api.get('/non-existent');
    } catch (error) {
      console.error(error.message); // Message d'erreur du serveur
    }
    ```

### 🎣Hooks (`/core/hooks`)

#### 🔄 API Hooks (`/hooks/api`)

##### `useFetch`

Hook personnalisé pour effectuer des requêtes GET.

```typescript
import { useFetch } from '@/core/hooks/';

// Exemple d'utilisation
const MyComponent = () => {
  const { data, loading, error } = useFetch<User[]>('/api/users');

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

##### `useMutation`

Hook pour gérer les opérations de modification (POST, PUT, DELETE).

```typescript
import { useMutation } from '@/core/hooks/';

// Exemple d'utilisation
const MyForm = () => {
  const { mutate, loading, error } = useMutation<User>('/api/users');

  const handleSubmit = async (data: UserData) => {
    try {
      const result = await mutate(data);
      console.log('Utilisateur créé:', result);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  return (
    // Votre formulaire ici
  );
};
```

#### ⚠️ Error Hooks (`/hooks/error`)

##### `useError`

Hook pour la gestion centralisée des erreurs.

```typescript
import {useError} from '@/core/hooks';

// Exemple d'utilisation
const {handleError, clearError, error} = useError();

try {
  // Votre code qui peut générer une erreur
} catch (err) {
  handleError(err);
}
```

#### 💾 Storage Hooks (`/hooks/storage`)

##### `useCookie`

Hook pour la gestion des cookies.

```typescript
import {useCookie} from '@/core/hooks';

// Exemple d'utilisation
const [token, setToken, removeToken] = useCookie('auth-token');

// Définir un cookie
setToken('votre-token-jwt');

// Lire un cookie
console.log(token);

// Supprimer un cookie
removeToken();
```

##### `useLocalStorage`

Hook pour interagir avec localStorage.

```typescript
import {useLocalStorage} from '@/core/hooks';

// Exemple d'utilisation
const [theme, setTheme] = useLocalStorage('theme', 'light');

// Changer le thème
setTheme('dark');
```

#### 🔍 Bonnes pratiques

1. **Typage strict**

   ```typescript
   // Toujours utiliser des types génériques
   const {data} = useFetch<UserType>('/api/users');
   ```

2. **Gestion des erreurs**

   ```typescript
   // Toujours gérer les cas d'erreur
   if (error) {
     handleError(error);
     return <ErrorComponent message={error.message} />;

   }
   ```

3. **Loading states**
   ```typescript
   // Montrer un état de chargement
   if (loading) {
     return <Spinner />;
   }
   ```

### 📊 Models (`/core/models`)

Définition des modèles de données avec Sequelize :

- `article.model.ts` : Gestion des articles
- `comment.model.ts` : Gestion des commentaires
- `member.model.ts` : Gestion des membres
- `project.model.ts` : Gestion des projets
- `statistic.model.ts` : Gestion des statistiques
- `user.model.ts` : Gestion des utilisateurs

### 🛠 Utils (`/core/utils`)

Utilitaires généraux :

- `cn.ts` : Gestion des classes conditionnelles pour simplifier l'écriture de styles dynamiques :

  ⛔ partout où vous importer classNames du module classNames, remplacer le par `cn`

- `contentLayer.ts` : Gestion du contenu statique
- `kebabCase.ts` : Formatage des chaînes de caractères
- `logger.ts` : Service de logging personnalisé : au lieu d'utiliser des console.log, vous pourrez utiliser le logger

  ```typescript
  import logger, {logError} from './core/utils/logger';

  logger.info(`Tentative de connexion pour l'utilisateur: ${username}`); // exemple : pour un log classique

  logger.warn(`Échec de connexion pour l'utilisateur: ${username}`); // exemple : pour signaler un warning

  logError('Erreur lors de la tentative de connexion', error, {username}); // exemple : pour déclencher une erreur
  ```
