import { perfumes as initialPerfumes } from '../data/perfumes.js';

const PERFUMES_STORAGE_KEY = 'kushal_perfumes_vault_v17';
const FAVORITES_STORAGE_KEY = 'kushal_perfumes_favorites';
const SOTD_STORAGE_KEY = 'kushal_perfumes_sotd_logs';
const BOTTLE_LEVELS_KEY = 'kushal_perfumes_bottle_levels';

export const getStoredPerfumes = () => {
  try {
    const raw = localStorage.getItem(PERFUMES_STORAGE_KEY);
    if (!raw) return initialPerfumes;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialPerfumes;
  } catch (err) {
    console.error('Error reading perfumes from localStorage:', err);
    return initialPerfumes;
  }
};

export const savePerfumes = (perfumes) => {
  try {
    localStorage.setItem(PERFUMES_STORAGE_KEY, JSON.stringify(perfumes));
  } catch (err) {
    console.error('Error saving perfumes to localStorage:', err);
  }
};

export const getFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['14', '6', '21', '41', '27']; // default favorites
  } catch (err) {
    console.error('Error reading favorites:', err);
    return ['14', '6', '21', '41', '27'];
  }
};

export const toggleFavorite = (perfumeId) => {
  const favs = getFavorites();
  const index = favs.indexOf(perfumeId);
  let updated;
  if (index >= 0) {
    updated = favs.filter(id => id !== perfumeId);
  } else {
    updated = [...favs, perfumeId];
  }
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const getSOTDLogs = () => {
  try {
    const raw = localStorage.getItem(SOTD_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    // Starter SOTD entry for demonstration
    const today = new Date().toISOString().split('T')[0];
    const starterLogs = [
      {
        id: 'sotd-1',
        perfumeId: '27', // French Avenue Liquid Brun
        date: today,
        sprays: 5,
        occasion: 'Date Night / Evening',
        weather: 'Pleasant 24°C',
        rating: 5,
        note: 'Crazy compliment from friends! The vanilla and cinnamon projected heavily.'
      }
    ];
    localStorage.setItem(SOTD_STORAGE_KEY, JSON.stringify(starterLogs));
    return starterLogs;
  } catch (err) {
    console.error('Error reading SOTD logs:', err);
    return [];
  }
};

export const logSOTD = (entry) => {
  try {
    const existing = getSOTDLogs();
    const newEntry = {
      id: 'sotd-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...entry
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(SOTD_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving SOTD:', err);
    return getSOTDLogs();
  }
};

export const getBottleLevels = () => {
  try {
    const raw = localStorage.getItem(BOTTLE_LEVELS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
};

export const setBottleLevel = (perfumeId, percentage) => {
  try {
    const current = getBottleLevels();
    current[perfumeId] = percentage;
    localStorage.setItem(BOTTLE_LEVELS_KEY, JSON.stringify(current));
    return current;
  } catch (err) {
    return {};
  }
};
