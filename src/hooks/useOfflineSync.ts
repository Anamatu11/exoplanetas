import { useState, useEffect } from 'react';

interface OfflineData {
  beaconLogs: any[];
  marketplaceInteractions: any[];
  profileUpdates: any[];
  protocolProgress: any[];
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
  const [offlineData, setOfflineData] = useState<OfflineData>({
    beaconLogs: [],
    marketplaceInteractions: [],
    profileUpdates: [],
    protocolProgress: []
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineData();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from localStorage
    loadOfflineData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineData = () => {
    try {
      const savedData = localStorage.getItem('offlineData');
      if (savedData) {
        setOfflineData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const saveOfflineData = (data: OfflineData) => {
    try {
      localStorage.setItem('offlineData', JSON.stringify(data));
      setOfflineData(data);
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  };

  const addOfflineLog = (type: keyof OfflineData, data: any) => {
    const newOfflineData = {
      ...offlineData,
      [type]: [...offlineData[type], { ...data, timestamp: Date.now(), synced: false }]
    };
    saveOfflineData(newOfflineData);
  };

  const syncOfflineData = async () => {
    if (!isOnline || syncStatus === 'syncing') return;

    setSyncStatus('syncing');

    try {
      // Simulate API sync - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mark all data as synced
      const syncedData: OfflineData = {
        beaconLogs: offlineData.beaconLogs.map(item => ({ ...item, synced: true })),
        marketplaceInteractions: offlineData.marketplaceInteractions.map(item => ({ ...item, synced: true })),
        profileUpdates: offlineData.profileUpdates.map(item => ({ ...item, synced: true })),
        protocolProgress: offlineData.protocolProgress.map(item => ({ ...item, synced: true }))
      };

      saveOfflineData(syncedData);
      setSyncStatus('idle');
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const clearSyncedData = () => {
    const clearedData: OfflineData = {
      beaconLogs: offlineData.beaconLogs.filter(item => !item.synced),
      marketplaceInteractions: offlineData.marketplaceInteractions.filter(item => !item.synced),
      profileUpdates: offlineData.profileUpdates.filter(item => !item.synced),
      protocolProgress: offlineData.protocolProgress.filter(item => !item.synced)
    };
    saveOfflineData(clearedData);
  };

  return {
    isOnline,
    syncStatus,
    offlineData,
    addOfflineLog,
    syncOfflineData,
    clearSyncedData
  };
};