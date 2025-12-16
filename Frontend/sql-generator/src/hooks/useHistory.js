import { useState,useEffect } from "react";

export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sql_genius_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveToStorage = (items) => {
    localStorage.setItem('sql_genius_history', JSON.stringify(items));
  };

  const addToHistory = (
    naturalQuery,
    generatedSql,
    dialect,
    schemaSnapshot,
    explanation
  ) => {
    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dialect,
      naturalQuery,
      generatedSql,
      explanation,
      isSaved: false,
      schemaSnapshot
    };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  const toggleSaved = (id) => {
    const newHistory = history.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    );
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  const deleteItem = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    saveToStorage(newHistory);
  };

  return { history, isLoaded, addToHistory, toggleSaved, deleteItem };
};