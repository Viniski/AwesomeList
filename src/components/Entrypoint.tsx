import { useReducer } from "react";
import { useListStore } from "../store";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { Card, DeletedCard } from "./Cards";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const listQuery = useGetListData();
  const { deletedCards, expandedCards, toggleExpandCard } = useListStore();
  const [isRevealed, setIsRevealed] = useReducer((value) => !value, false);

  if (listQuery.isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const visibleCards = (listQuery.data || []).filter(
    (card) => card.isVisible && deletedCards.every(({ id }) => id !== card.id)
  );

  return (
    <main className="flex justify-center py-32 gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isExpanded={expandedCards[card.id]}
              onToggleExpand={() => toggleExpandCard(card.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h1 className="font-medium text-lg">
              Deleted Cards ({deletedCards.length})
            </h1>
            <ToggleButton
              disabled={!deletedCards.length}
              onToggle={() => setIsRevealed()}
            >
              {isRevealed ? "Hide" : "Reveal"}
            </ToggleButton>
          </div>
          <button
            disabled={listQuery.isRefetching}
            onClick={() => listQuery.refetch()}
            className="text-white text-sm transition-colors hover:bg-gray-600 bg-black rounded px-3 py-1 disabled:bg-black/50"
          >
            Refresh
          </button>
        </div>
        <div
          className={`flex flex-col gap-3 overflow-hidden transition-all duration-500 ${
            isRevealed ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {deletedCards.map((deletedCard) => (
            <DeletedCard key={deletedCard.id} card={deletedCard} />
          ))}
        </div>
      </div>
    </main>
  );
};
