import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon } from "./icons";
import { useListStore } from "../store";

export const Card = ({
  card,
  isExpanded,
  onToggleExpand,
}: {
  card: ListItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) => {
  const { deleteCard } = useListStore();

  return (
    <div className="border border-gray-300 rounded-lg shadow-md px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-semibold text-lg text-gray-800">{card.title}</h1>
        <div className="flex items-center gap-2">
          <ExpandButton onClick={onToggleExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(card)} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-600">{card.description}</p>
      </div>
    </div>
  );
};

export const DeletedCard = ({ card }: { card: ListItem }) => (
  <div className="border border-gray-300 rounded-lg shadow-md px-4 py-3 flex justify-between items-center">
    <h1 className="font-semibold text-gray-800">{card.title}</h1>
  </div>
);
