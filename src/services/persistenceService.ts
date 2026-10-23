// Data Persistence Service
// Provides abstraction over localStorage with optional cloud sync

import { NotepadFile } from '../apps/notepad/types';

export interface PersistenceConfig {
  backendUrl?: string;
  authToken?: string;
  enableCloudSync?: boolean;
}

export interface SyncStatus {
  lastSync: number | null;
  pendingChanges: number;
  isSyncing: boolean;
  error: string | null;
}

const STORAGE_KEY = 'nexusai_files';
const SYNC_STATUS_KEY = 'nexusai_sync_status';

let config: PersistenceConfig = {
  enableCloudSync: false,
};

let syncStatus: SyncStatus = {
  lastSync: null,
  pendingChanges: 0,
  isSyncing: false,
  error: null,
};

// Initialize persistence service
export function initPersistence(cfg: PersistenceConfig): void {
  config = { ...config, ...cfg };
  
  // Load sync status
  try {
    const stored = localStorage.getItem(SYNC_STATUS_KEY);
    if (stored) {
      syncStatus = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load sync status:', error);
  }
}

// Get sync status
export function getSyncStatus(): SyncStatus {
  return { ...syncStatus };
}

// Save files to local storage
export function saveFilesLocally(files: NotepadFile[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    syncStatus.pendingChanges++;
    saveSyncStatus();
  } catch (error) {
    console.error('Failed to save files locally:', error);
    syncStatus.error = 'Failed to save locally';
    saveSyncStatus();
  }
}

// Load files from local storage
export function loadFilesLocally(): NotepadFile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load files:', error);
  }
  return [];
}

// Sync to cloud (if enabled)
export async function syncToCloud(files: NotepadFile[]): Promise<boolean> {
  if (!config.enableCloudSync || !config.backendUrl || !config.authToken) {
    return false;
  }

  syncStatus.isSyncing = true;
  saveSyncStatus();

  try {
    const response = await fetch(`${config.backendUrl}/api/files/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.authToken}`,
      },
      body: JSON.stringify({ files }),
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.statusText}`);
    }

    syncStatus.lastSync = Date.now();
    syncStatus.pendingChanges = 0;
    syncStatus.error = null;
    return true;
  } catch (error) {
    console.error('Cloud sync failed:', error);
    syncStatus.error = error instanceof Error ? error.message : 'Sync failed';
    return false;
  } finally {
    syncStatus.isSyncing = false;
    saveSyncStatus();
  }
}

// Load from cloud
export async function loadFromCloud(): Promise<NotepadFile[] | null> {
  if (!config.enableCloudSync || !config.backendUrl || !config.authToken) {
    return null;
  }

  try {
    const response = await fetch(`${config.backendUrl}/api/files`, {
      headers: {
        'Authorization': `Bearer ${config.authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Load failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Cloud load failed:', error);
    return null;
  }
}

// Auto-sync with debounce
let syncTimeout: ReturnType<typeof setTimeout> | null = null;

export function scheduleSync(files: NotepadFile[]): void {
  if (!config.enableCloudSync) return;

  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }

  syncTimeout = setTimeout(() => {
    syncToCloud(files);
  }, 5000); // 5 second debounce
}

// Save sync status to localStorage
function saveSyncStatus(): void {
  try {
    localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(syncStatus));
  } catch (error) {
    console.error('Failed to save sync status:', error);
  }
}

// Clear all data
export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SYNC_STATUS_KEY);
  syncStatus = {
    lastSync: null,
    pendingChanges: 0,
    isSyncing: false,
    error: null,
  };
}

// Export data as JSON
export function exportData(): string {
  const files = loadFilesLocally();
  return JSON.stringify({
    version: '1.0',
    exportedAt: Date.now(),
    files,
  }, null, 2);
}

// Import data from JSON
export function importData(json: string): boolean {
  try {
    const data = JSON.parse(json);
    if (data.files && Array.isArray(data.files)) {
      saveFilesLocally(data.files);
      return true;
    }
  } catch (error) {
    console.error('Failed to import data:', error);
  }
  return false;
}
