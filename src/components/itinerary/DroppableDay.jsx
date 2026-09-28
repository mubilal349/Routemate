import { useDroppable } from "@dnd-kit/core";

function DroppableDay({ dayId, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: dayId,
    data: {
      type: "day",
      dayId,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[80px] rounded-2xl transition-all duration-200 ${
        isOver ? "bg-sky-50/70 ring-2 ring-sky-400/40 dark:bg-sky-500/5" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default DroppableDay;
