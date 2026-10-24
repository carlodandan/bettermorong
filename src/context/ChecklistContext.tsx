/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

export interface ChecklistContextType {
  slug: string;
  isServiceGuide: boolean;
  checkedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  totalCount: number;
  completedCount: number;
  resetChecklist: () => void;
}

const ChecklistContext = createContext<ChecklistContextType | null>(null);

export function ChecklistProvider({
  slug,
  isServiceGuide,
  children,
}: {
  slug: string;
  isServiceGuide: boolean;
  children: ReactNode;
}) {
  const storageKey = `bettermorong:checklist:${slug}`;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    () => {
      if (typeof window === 'undefined') return {};
      try {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
  );

  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  // When slug changes, synchronize with the active slug's localStorage
  useEffect(() => {
    setRegisteredIds([]);
    try {
      const saved = localStorage.getItem(`bettermorong:checklist:${slug}`);
      setCheckedItems(saved ? JSON.parse(saved) : {});
    } catch {
      setCheckedItems({});
    }
  }, [slug]);

  const registerItem = useCallback((id: string) => {
    setRegisteredIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterItem = useCallback((id: string) => {
    setRegisteredIds(prev => prev.filter(x => x !== id));
  }, []);

  const toggleItem = useCallback(
    (id: string) => {
      setCheckedItems(prev => {
        const next = { ...prev, [id]: !prev[id] };
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (e) {
          console.error('Failed to save checklist state', e);
        }
        return next;
      });
    },
    [storageKey]
  );

  const resetChecklist = useCallback(() => {
    setCheckedItems({});
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error('Failed to clear checklist state', e);
    }
  }, [storageKey]);

  const totalCount = registeredIds.length;
  const completedCount = registeredIds.filter(id => !!checkedItems[id]).length;

  const value = useMemo(
    () => ({
      slug,
      isServiceGuide,
      checkedItems,
      toggleItem,
      registerItem,
      unregisterItem,
      totalCount,
      completedCount,
      resetChecklist,
    }),
    [
      slug,
      isServiceGuide,
      checkedItems,
      toggleItem,
      registerItem,
      unregisterItem,
      totalCount,
      completedCount,
      resetChecklist,
    ]
  );

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklist(): ChecklistContextType {
  const context = useContext(ChecklistContext);
  if (!context) {
    return {
      slug: '',
      isServiceGuide: false,
      checkedItems: {},
      toggleItem: () => {},
      registerItem: () => {},
      unregisterItem: () => {},
      totalCount: 0,
      completedCount: 0,
      resetChecklist: () => {},
    };
  }
  return context;
}
