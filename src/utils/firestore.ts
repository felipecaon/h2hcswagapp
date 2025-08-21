// Firestore Helper Functions for Firebase Integration
// This file contains utility functions for Firestore operations

import { Camiseta, Swag, Distribuicao } from '../types';

// Firestore Collection Names
export const COLLECTIONS = {
  CAMISETAS: 'camisetas',
  SWAGS: 'swags',
  DISTRIBUICOES: 'distribuicoes',
  SPONSORS: 'sponsors',
  USERS: 'users',
  EVENTS: 'events'
} as const;

// Firestore Document Types
export interface FirestoreCamiseta extends Camiseta {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface FirestoreSwag extends Swag {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface FirestoreDistribuicao extends Distribuicao {
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Helper Functions for Future Firestore Integration

/**
 * Convert a regular object to Firestore document data
 */
export const toFirestore = <T extends Record<string, any>>(data: T): T & { createdAt: Date; updatedAt: Date; createdBy: string } => {
  const firestoreData = { ...data } as T & { createdAt: Date; updatedAt: Date; createdBy: string };
  
  // Add timestamps
  firestoreData.createdAt = new Date();
  firestoreData.updatedAt = new Date();
  
  // Add user ID (will be implemented when auth is added)
  firestoreData.createdBy = 'system'; // Placeholder
  
  return firestoreData;
};

/**
 * Convert Firestore document to regular object
 */
export const fromFirestore = <T extends Record<string, any>>(doc: any): T => {
  const data = doc.data();
  
  // Convert Firestore timestamps to Date objects
  if (data.createdAt) {
    data.createdAt = data.createdAt.toDate();
  }
  if (data.updatedAt) {
    data.updatedAt = data.updatedAt.toDate();
  }
  
  return data as T;
};

/**
 * Generate a unique ID for Firestore documents
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Batch operations helper for multiple writes
 */
export const createBatchOperations = async () => {
  const { writeBatch, doc } = await import('firebase/firestore');
  const { getFirebaseDb } = await import('../config/firebase');
  
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase not initialized. Call initializeFirebase() first.');
  }
  
  const batch = writeBatch(db);
  
  return {
    set: (ref: any, data: any) => {
      batch.set(ref, data);
    },
    update: (ref: any, data: any) => {
      batch.update(ref, data);
    },
    delete: (ref: any) => {
      batch.delete(ref);
    },
    commit: async () => {
      await batch.commit();
    }
  };
};

/**
 * Error handling for Firestore operations
 */
export const handleFirestoreError = (error: any, operation: string): void => {
  console.error(`Firestore ${operation} error:`, error);
  
  // You can add custom error handling here
  // For example, showing user-friendly error messages
  if (error.code === 'permission-denied') {
    console.error('Permission denied. User may not have access to this resource.');
  } else if (error.code === 'not-found') {
    console.error('Document not found.');
  } else if (error.code === 'already-exists') {
    console.error('Document already exists.');
  }
};

/**
 * Data validation before sending to Firestore
 */
export const validateCamiseta = (camiseta: Partial<Camiseta>): boolean => {
  if (!camiseta.tamanho || !camiseta.sponsor || !camiseta.sexo) {
    return false;
  }
  
  if (typeof camiseta.quantidadeAtual !== 'number' || camiseta.quantidadeAtual < 0) {
    return false;
  }
  
  return true;
};

export const validateSwag = (swag: Partial<Swag>): boolean => {
  if (!swag.nome || !swag.tipo) {
    return false;
  }
  
  if (typeof swag.quantidadeAtual !== 'number' || swag.quantidadeAtual < 0) {
    return false;
  }
  
  return true;
};

export const validateDistribuicao = (distribuicao: Partial<Distribuicao>): boolean => {
  if (!distribuicao.swagId || !distribuicao.swagNome || !distribuicao.swagTipo) {
    return false;
  }
  
  if (typeof distribuicao.quantidade !== 'number' || distribuicao.quantidade <= 0) {
    return false;
  }
  
  return true;
};

/**
 * Pagination helper for large collections
 */
export const createPaginationQuery = (limit: number = 20, startAfter?: any) => {
  return {
    limit,
    startAfter,
    // Additional pagination options will be added when Firestore is integrated
  };
};

/**
 * Search and filtering helpers
 */
export const createSearchQuery = (searchTerm: string, fields: string[]) => {
  // This will be implemented with Firestore's array-contains or text search
  return {
    searchTerm,
    fields,
    // Search logic will be implemented when Firestore is integrated
  };
};

/**
 * Real-time subscription helpers
 */
export const createRealtimeSubscription = (collection: string, callback: (data: any) => void) => {
  // This will be implemented with Firestore's onSnapshot
  console.log(`Creating real-time subscription for ${collection}`);
  
  // Placeholder for future implementation
  return () => {
    console.log(`Unsubscribing from ${collection}`);
    // Unsubscribe logic will be implemented
  };
};

/**
 * Offline persistence helpers
 */
export const enableOfflinePersistence = () => {
  // This will be implemented with Firestore's enableNetwork/enableOffline
  console.log('Enabling offline persistence');
  // Implementation will be added when Firestore is integrated
};

/**
 * Cache management helpers
 */
export const clearCache = () => {
  // This will be implemented with Firestore's clearPersistence
  console.log('Clearing Firestore cache');
  // Implementation will be added when Firestore is integrated
};

// Export all helper functions
export default {
  COLLECTIONS,
  toFirestore,
  fromFirestore,
  generateId,
  createBatchOperations,
  handleFirestoreError,
  validateCamiseta,
  validateSwag,
  validateDistribuicao,
  createPaginationQuery,
  createSearchQuery,
  createRealtimeSubscription,
  enableOfflinePersistence,
  clearCache
};
