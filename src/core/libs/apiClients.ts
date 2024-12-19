// import { useNotifications } from '@/components/ui/notifications';
import {env} from '@/core/config/env';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  //   cache?: RequestCache;
  //   next?: NextFetchRequestConfig;
};

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const {method = 'GET', headers = {}, body, cookie, params} = options;
  // Utilisation de API_URL et construction du chemin complet
  const baseUrl = env.API_URL;
  const apiPath = url.startsWith('/') ? url : `/${url}`;
  const fullUrl = buildUrlWithParams(`${baseUrl}${apiPath}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(cookie ? {Cookie: cookie} : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
  });

  if (!response.ok) {
    const message = (await response.json()).message || response.statusText;
    if (typeof window !== 'undefined') {
      //   useNotifications.getState().addNotification({
      //     type: 'error',
      //     title: 'Error',
      //     message,
      //   });
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {...options, method: 'GET'});
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {...options, method: 'POST', body});
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {...options, method: 'PUT', body});
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {...options, method: 'PATCH', body});
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {...options, method: 'DELETE'});
  },
};

// Exemple d'utilisation de l'API

// import { api } from './api'; // Assurez-vous que le chemin d'importation est correct

// // Exemple de type pour les données attendues
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// // Exemple de fonction asynchrone pour récupérer un utilisateur
// async function getUser(id: number): Promise<User> {
//   try {
//     const user = await api.get<User>(`/users/${id}`);
//     console.log('Utilisateur récupéré:', user);
//     return user;
//   } catch (error) {
//     console.error('Erreur lors de la récupération de l'utilisateur:', error);
//     throw error;
//   }
// }

// // Exemple de fonction pour créer un nouvel utilisateur
// async function createUser(userData: Omit<User, 'id'>): Promise<User> {
//   try {
//     const newUser = await api.post<User>('/users', userData);
//     console.log('Nouvel utilisateur créé:', newUser);
//     return newUser;
//   } catch (error) {
//     console.error('Erreur lors de la création de l'utilisateur:', error);
//     throw error;
//   }
// }

// // Exemple de fonction pour mettre à jour un utilisateur
// async function updateUser(id: number, userData: Partial<User>): Promise<User> {
//   try {
//     const updatedUser = await api.put<User>(`/users/${id}`, userData);
//     console.log('Utilisateur mis à jour:', updatedUser);
//     return updatedUser;
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour de l'utilisateur:', error);
//     throw error;
//   }
// }

// // Exemple de fonction pour supprimer un utilisateur
// async function deleteUser(id: number): Promise<void> {
//   try {
//     await api.delete(`/users/${id}`);
//     console.log('Utilisateur supprimé avec succès');
//   } catch (error) {
//     console.error('Erreur lors de la suppression de l'utilisateur:', error);
//     throw error;
//   }
// }

// // Exemple d'utilisation avec des paramètres de requête
// async function searchUsers(query: string, page: number = 1, limit: number = 10): Promise<User[]> {
//   try {
//     const users = await api.get<User[]>('/users', {
//       params: { query, page, limit }
//     });
//     console.log('Utilisateurs trouvés:', users);
//     return users;
//   } catch (error) {
//     console.error('Erreur lors de la recherche d'utilisateurs:', error);
//     throw error;
//   }
// }
