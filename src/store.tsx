import { create } from "zustand";
import { ListItem } from "./api/getListData";
import { persist } from "zustand/middleware";

type Store = {
  deletedCards: ListItem[];
  expandedCards: Record<number, boolean>;
  deleteCard: (id: ListItem) => void;
  toggleExpandCard: (id: number) => void;
};

export const useListStore = create<Store>()(
  persist(
    (set) => ({
      deletedCards: [],
      deleteCard: (deletedCard) =>
        set((state) => ({
          deletedCards: [...state.deletedCards, deletedCard],
        })),
      expandedCards: {},
      toggleExpandCard: (id) =>
        set((state) => ({
            expandedCards: {
              ...state.expandedCards,
              [id]: !state.expandedCards[id], 
            },
          })),
        }),
    {
      name: "app-storage",
    }
  )
);
