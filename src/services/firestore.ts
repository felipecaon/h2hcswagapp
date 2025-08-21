// Firestore Service - Main operations for the app
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { getFirebaseDb } from '../config/firebase';
import { COLLECTIONS, toFirestore, fromFirestore, validateCamiseta, validateSwag, validateDistribuicao } from '../utils/firestore';
import { Camiseta, Swag, Distribuicao } from '../types';

// Sponsor interface for the sponsors collection
export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Firestore Service Class
class FirestoreService {
  private db: any;

  constructor() {
    // Don't initialize db in constructor - do it lazily
    this.db = null;
  }

  private getDb(): any {
    if (!this.db) {
      this.db = getFirebaseDb();
      if (!this.db) {
        throw new Error('Firebase not initialized. Call initializeFirebase() first.');
      }
      console.log('Firestore database connection established');
    }
    return this.db;
  }

  // ===== SPONSORS COLLECTION =====
  
  /**
   * Get all sponsors
   */
  async getSponsors(): Promise<Sponsor[]> {
    try {
      const sponsorsRef = collection(this.getDb(), COLLECTIONS.SPONSORS);
      const snapshot = await getDocs(sponsorsRef);
      
      return snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Sponsor;
      });
    } catch (error) {
      console.error('Error getting sponsors:', error);
      throw error;
    }
  }

  /**
   * Get sponsor by ID
   */
  async getSponsorById(id: string): Promise<Sponsor | null> {
    try {
      const sponsorRef = doc(this.getDb(), COLLECTIONS.SPONSORS, id);
      const snapshot = await getDoc(sponsorRef);
      
      if (snapshot.exists()) {
        const data = fromFirestore(snapshot);
        return {
          ...data,
          id: snapshot.id
        } as Sponsor;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting sponsor:', error);
      throw error;
    }
  }

  /**
   * Add new sponsor
   */
  async addSponsor(sponsor: Omit<Sponsor, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const sponsorData = {
        ...sponsor,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(this.getDb(), COLLECTIONS.SPONSORS), sponsorData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding sponsor:', error);
      throw error;
    }
  }

  /**
   * Update sponsor
   */
  async updateSponsor(id: string, updates: Partial<Omit<Sponsor, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const sponsorRef = doc(this.getDb(), COLLECTIONS.SPONSORS, id);
      await updateDoc(sponsorRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating sponsor:', error);
      throw error;
    }
  }

  /**
   * Delete sponsor
   */
  async deleteSponsor(id: string): Promise<void> {
    try {
      const sponsorRef = doc(this.getDb(), COLLECTIONS.SPONSORS, id);
      await deleteDoc(sponsorRef);
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      throw error;
    }
  }

  // ===== CAMISETAS COLLECTION =====

  /**
   * Get all camisetas
   */
  async getCamisetas(): Promise<Camiseta[]> {
    try {
      const camisetasRef = collection(this.getDb(), COLLECTIONS.CAMISETAS);
      const snapshot = await getDocs(camisetasRef);
      
      return snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Camiseta;
      });
    } catch (error) {
      console.error('Error getting camisetas:', error);
      throw error;
    }
  }

  /**
   * Get camiseta by ID
   */
  async getCamisetaById(id: string): Promise<Camiseta | null> {
    try {
      const camisetaRef = doc(this.getDb(), COLLECTIONS.CAMISETAS, id);
      const snapshot = await getDoc(camisetaRef);
      
      if (snapshot.exists()) {
        const data = fromFirestore(snapshot);
        return {
          ...data,
          id: snapshot.id
        } as Camiseta;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting camiseta:', error);
      throw error;
    }
  }

  /**
   * Get camisetas by sponsor
   */
  async getCamisetasBySponsor(sponsor: string): Promise<Camiseta[]> {
    try {
      const camisetasRef = collection(this.getDb(), COLLECTIONS.CAMISETAS);
      const q = query(camisetasRef, where('sponsor', '==', sponsor));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Camiseta;
      });
    } catch (error) {
      console.error('Error getting camisetas by sponsor:', error);
      throw error;
    }
  }

  /**
   * Add new camiseta
   */
  async addCamiseta(camiseta: Omit<Camiseta, 'id'>): Promise<string> {
    try {
      console.log('Adding camiseta:', camiseta);
      
      if (!validateCamiseta(camiseta)) {
        throw new Error('Invalid camiseta data');
      }

      const camisetaData = toFirestore(camiseta);
      console.log('Camiseta data for Firestore:', camisetaData);
      
      const docRef = await addDoc(collection(this.getDb(), COLLECTIONS.CAMISETAS), camisetaData);
      console.log('Camiseta added with ID:', docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding camiseta:', error);
      throw error;
    }
  }

  /**
   * Update camiseta
   */
  async updateCamiseta(id: string, updates: Partial<Omit<Camiseta, 'id'>>): Promise<void> {
    try {
      console.log('Updating camiseta:', id, updates);
      
      const camisetaRef = doc(this.getDb(), COLLECTIONS.CAMISETAS, id);
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      console.log('Update data for Firestore:', updateData);
      await updateDoc(camisetaRef, updateData);
      
      console.log('Camiseta updated successfully');
    } catch (error) {
      console.error('Error updating camiseta:', error);
      throw error;
    }
  }

  /**
   * Delete camiseta
   */
  async deleteCamiseta(id: string): Promise<void> {
    try {
      const camisetaRef = doc(this.getDb(), COLLECTIONS.CAMISETAS, id);
      await deleteDoc(camisetaRef);
    } catch (error) {
      console.error('Error deleting camiseta:', error);
      throw error;
    }
  }

  // ===== SWAGS COLLECTION =====

  /**
   * Get all swags
   */
  async getSwags(): Promise<Swag[]> {
    try {
      const swagsRef = collection(this.getDb(), COLLECTIONS.SWAGS);
      const snapshot = await getDocs(swagsRef);
      
      return snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Swag;
      });
    } catch (error) {
      console.error('Error getting swags:', error);
      throw error;
    }
  }

  /**
   * Get swag by ID
   */
  async getSwagById(id: string): Promise<Swag | null> {
    try {
      const swagRef = doc(this.getDb(), COLLECTIONS.SWAGS, id);
      const snapshot = await getDoc(swagRef);
      
      if (snapshot.exists()) {
        const data = fromFirestore(snapshot);
        return {
          ...data,
          id: snapshot.id
        } as Swag;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting swag:', error);
      throw error;
    }
  }

  /**
   * Add new swag
   */
  async addSwag(swag: Omit<Swag, 'id'>): Promise<string> {
    try {
      if (!validateSwag(swag)) {
        throw new Error('Invalid swag data');
      }

      const swagData = toFirestore(swag);
      const docRef = await addDoc(collection(this.getDb(), COLLECTIONS.SWAGS), swagData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding swag:', error);
      throw error;
    }
  }

  /**
   * Update swag
   */
  async updateSwag(id: string, updates: Partial<Omit<Swag, 'id'>>): Promise<void> {
    try {
      const swagRef = doc(this.getDb(), COLLECTIONS.SWAGS, id);
      await updateDoc(swagRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating swag:', error);
      throw error;
    }
  }

  /**
   * Delete swag
   */
  async deleteSwag(id: string): Promise<void> {
    try {
      const swagRef = doc(this.getDb(), COLLECTIONS.SWAGS, id);
      await deleteDoc(swagRef);
    } catch (error) {
      console.error('Error deleting swag:', error);
      throw error;
    }
  }

  // ===== DISTRIBUICOES COLLECTION =====

  /**
   * Get all distribuicoes
   */
  async getDistribuicoes(): Promise<Distribuicao[]> {
    try {
      const distribuicoesRef = collection(this.getDb(), COLLECTIONS.DISTRIBUICOES);
      const q = query(distribuicoesRef, orderBy('data', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Distribuicao;
      });
    } catch (error) {
      console.error('Error getting distribuicoes:', error);
      throw error;
    }
  }

  /**
   * Get distribuicao by ID
   */
  async getDistribuicaoById(id: string): Promise<Distribuicao | null> {
    try {
      const distribuicaoRef = doc(this.getDb(), COLLECTIONS.DISTRIBUICOES, id);
      const snapshot = await getDoc(distribuicaoRef);
      
      if (snapshot.exists()) {
        const data = fromFirestore(snapshot);
        return {
          ...data,
          id: snapshot.id
        } as Distribuicao;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting distribuicao:', error);
      throw error;
    }
  }

  /**
   * Add new distribuicao
   */
  async addDistribuicao(distribuicao: Omit<Distribuicao, 'id'>): Promise<string> {
    try {
      if (!validateDistribuicao(distribuicao)) {
        throw new Error('Invalid distribuicao data');
      }

      const distribuicaoData = toFirestore(distribuicao);
      const docRef = await addDoc(collection(this.getDb(), COLLECTIONS.DISTRIBUICOES), distribuicaoData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding distribuicao:', error);
      throw error;
    }
  }

  /**
   * Update distribuicao
   */
  async updateDistribuicao(id: string, updates: Partial<Omit<Distribuicao, 'id'>>): Promise<void> {
    try {
      const distribuicaoRef = doc(this.getDb(), COLLECTIONS.DISTRIBUICOES, id);
      await updateDoc(distribuicaoRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating distribuicao:', error);
      throw error;
    }
  }

  /**
   * Delete distribuicao
   */
  async deleteDistribuicao(id: string): Promise<void> {
    try {
      const distribuicaoRef = doc(this.getDb(), COLLECTIONS.DISTRIBUICOES, id);
      await deleteDoc(distribuicaoRef);
    } catch (error) {
      console.error('Error deleting distribuicao:', error);
      throw error;
    }
  }

  // ===== REAL-TIME SUBSCRIPTIONS =====

  /**
   * Subscribe to camisetas changes
   */
  subscribeToCamisetas(callback: (camisetas: Camiseta[]) => void) {
    const camisetasRef = collection(this.getDb(), COLLECTIONS.CAMISETAS);
    
    return onSnapshot(camisetasRef, (snapshot) => {
      const camisetas = snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Camiseta;
      });
      
      callback(camisetas);
    });
  }

  /**
   * Subscribe to swags changes
   */
  subscribeToSwags(callback: (swags: Swag[]) => void) {
    const swagsRef = collection(this.getDb(), COLLECTIONS.SWAGS);
    
    return onSnapshot(swagsRef, (snapshot) => {
      const swags = snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Swag;
      });
      
      callback(swags);
    });
  }

  /**
   * Subscribe to distribuicoes changes
   */
  subscribeToDistribuicoes(callback: (distribuicoes: Distribuicao[]) => void) {
    const distribuicoesRef = collection(this.getDb(), COLLECTIONS.DISTRIBUICOES);
    const q = query(distribuicoesRef, orderBy('data', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const distribuicoes = snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Distribuicao;
      });
      
      callback(distribuicoes);
    });
  }

  /**
   * Subscribe to sponsors collection changes
   */
  subscribeToSponsors(callback: (sponsors: Sponsor[]) => void) {
    const sponsorsRef = collection(this.getDb(), COLLECTIONS.SPONSORS);
    const q = query(sponsorsRef, orderBy('name'));
    
    return onSnapshot(q, (snapshot) => {
      const sponsors = snapshot.docs.map(doc => {
        const data = fromFirestore(doc);
        return {
          ...data,
          id: doc.id
        } as Sponsor;
      });
      
      callback(sponsors);
    });
  }

  // ===== BATCH OPERATIONS =====

  /**
   * Batch update multiple camisetas
   */
  async batchUpdateCamisetas(updates: Array<{ id: string; data: Partial<Omit<Camiseta, 'id'>> }>): Promise<void> {
    try {
      const batch = writeBatch(this.getDb());
      
      updates.forEach(({ id, data }) => {
        if (validateCamiseta(data)) {
          const camisetaRef = doc(this.getDb(), COLLECTIONS.CAMISETAS, id);
          batch.update(camisetaRef, {
            ...data,
            updatedAt: serverTimestamp()
          });
        }
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error in batch update:', error);
      throw error;
    }
  }

  /**
   * Test Firestore connection
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing Firestore connection...');
      
      // Try to read from a collection (this should work even if empty)
      const testRef = collection(this.getDb(), 'test');
      await getDocs(testRef);
      
      console.log('Firestore connection test successful');
      return true;
    } catch (error) {
      console.error('Firestore connection test failed:', error);
      return false;
    }
  }

  /**
   * Initialize default data
   */
  async initializeDefaultData(): Promise<void> {
    try {
      console.log('Initializing default data...');
      
      // Test connection first
      const connectionOk = await this.testConnection();
      if (!connectionOk) {
        throw new Error('Firestore connection failed. Check your configuration and database rules.');
      }
      
      // Add default sponsors
      const defaultSponsors = [
        { name: 'Bugcrowd', logo: 'https://www.bugcrowd.com/wp-content/uploads/2023/02/Press-Kit-Transparent-Hex-B.png', active: true },
        { name: 'HackerOne', logo: 'https://assets.streamlinehq.com/image/private/w_240,h_240,ar_1/f_auto/v1/icons/development/hackerone-cm4i0rtqkppti4oso76m1p.png/hackerone-7ocgai7dez46geovj3w7p4.png?_a=DATAg1AAZAA0', active: true },
        { name: 'Intigriti', logo: '', active: true },
        { name: 'BugHunt', logo: '', active: true },
        { name: 'PortSwigger', logo: '', active: true }
      ];

      for (const sponsor of defaultSponsors) {
        await this.addSponsor(sponsor);
      }

      console.log('Default data initialized successfully');
    } catch (error) {
      console.error('Error initializing default data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const firestoreService = new FirestoreService();
export default firestoreService;
