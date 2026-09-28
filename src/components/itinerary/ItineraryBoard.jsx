import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import DayColumn from "./DayColumn";

function ItineraryBoard({
  days,
  onMoveActivity,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activityId = active.id;

    const sourceDayId = active.data.current?.dayId;

    if (!sourceDayId) {
      return;
    }

    let destinationDayId = over.data.current?.dayId;

    if (!destinationDayId) {
      destinationDayId = over.id;
    }

    const sourceDay = days.find((day) => day.id === sourceDayId);

    const destinationDay = days.find((day) => day.id === destinationDayId);

    if (!sourceDay || !destinationDay) {
      return;
    }

    const destinationActivityIndex = destinationDay.activities.findIndex(
      (activity) => activity.id === over.id,
    );

    let destinationIndex = destinationActivityIndex;

    if (destinationIndex === -1) {
      destinationIndex = destinationDay.activities.length;
    }

    const sourceActivityIndex = sourceDay.activities.findIndex(
      (activity) => activity.id === activityId,
    );

    if (sourceActivityIndex === -1) {
      return;
    }

    // When moving inside the same day,
    // account for the activity being removed first.
    if (
      sourceDayId === destinationDayId &&
      sourceActivityIndex < destinationIndex
    ) {
      destinationIndex -= 1;
    }

    // Nothing changed.
    if (
      sourceDayId === destinationDayId &&
      sourceActivityIndex === destinationIndex
    ) {
      return;
    }

    onMoveActivity(activityId, sourceDayId, destinationDayId, destinationIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {days.map((day) => (
          <DayColumn
            key={day.id}
            day={day}
            onAddActivity={onAddActivity}
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default ItineraryBoard;
