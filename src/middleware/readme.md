### 🛡️ Middleware

## 📚 Table des matières

### File : error.ts

- [Structure des erreurs](#structure-des-erreurs)
- [Codes d'erreur disponibles](#codes-derreur-disponibles)
- [Types d'erreurs disponibles](#types-derreurs-disponibles)
  - [ValidationError (400)](#1-validationerror-400)
  - [UnauthorizedError (401)](#2-unauthorizederror-401)
  - [ForbiddenError (403)](#3-forbiddenerror-403)
  - [NotFoundError (404)](#4-notfounderror-404)
  - [ConflictError (409)](#5-conflicterror-409)
- [Utilisation](#utilisation)
  - [Configuration de base](#configuration-de-base)
  - [Avec validation de méthode HTTP](#avec-validation-de-méthode-http)

Le middleware d'erreur fournit une gestion robuste et typée des erreurs pour les API Next.js, avec support pour :

- Erreurs synchrones et asynchrones
- Codes d'état HTTP personnalisés
- Messages d'erreur structurés
- Mode production/développement
- Validation des méthodes HTTP.

### Structure des erreurs

#### Format de réponse standard

```typescript
{
  code: string;          // Code d'erreur normalisé
  message: string;       // Message d'erreur
  errors?: {            // Détails optionnels des erreurs
    [field: string]: string[];
  }
}
```

### Codes d'erreur disponibles

```typescript
enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
```

### Types d'erreurs disponibles

#### 1. ValidationError (400)

```typescript
throw new ValidationError('Données invalides', {
  email: ['Format email invalide'],
  password: ['Minimum 8 caractères'],
});
```

#### 2. UnauthorizedError (401)

```typescript
throw new UnauthorizedError('Token invalide');
```

#### 3. ForbiddenError (403)

```typescript
throw new ForbiddenError('Accès non autorisé');
```

#### 4. NotFoundError (404)

```typescript
throw new NotFoundError('Utilisateur non trouvé');
```

#### 5. ConflictError (409)

```typescript
throw new ConflictError('Email déjà utilisé');
```

### Utilisation

#### Configuration de base

Vous n'aurez plus besoin d'implémenter les catchs(error)

```typescript
import {errorMiddleware, NotFoundError} from '@/middleware/error';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await findUser(req.query.id);

  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }

  res.status(200).json(user);
}

export default errorMiddleware(handler);
```

#### Avec validation de méthode HTTP

```typescript
import {errorMiddleware, allowedMethods} from '@/middleware/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Logique du handler
};

export default errorMiddleware(allowedMethods(['GET', 'POST'])(handler));
```

### Fonctionnalités avancées

#### 1. Mode Production

```typescript
// En production
{
  "code": "INTERNAL_ERROR",
  "message": "Une erreur interne est survenue"
}

// En développement
{
  "code": "INTERNAL_ERROR",
  "message": "Error: Database connection failed: ..."
}
```
