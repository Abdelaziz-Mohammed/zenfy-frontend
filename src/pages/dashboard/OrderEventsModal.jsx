import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function OrderEventsModal({ isOpen, onClose, events, onSaveOrder }) {
  const [orderedEvents, setOrderedEvents] = useState([]);

  useEffect(() => {
    if (isOpen) setOrderedEvents(events);
  }, [isOpen, events]);

  if (!isOpen) return null;

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(orderedEvents);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setOrderedEvents(reordered);
  };

  const handleSave = () => {
    onSaveOrder(orderedEvents);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-2xl rounded-lg shadow-lg p-6 max-h-[95vh] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>
        <h4 className="text-center text-lg font-semibold mb-6">
          Reorder Events
        </h4>
        <div className="overflow-y-auto overflow-x-hidden border border-neutral-200 rounded-lg mb-8">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="events">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col gap-2 p-2"
                >
                  {orderedEvents.map((event, index) => (
                    <Draggable
                      key={event._id}
                      draggableId={event._id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="p-3 border border-neutral-300 bg-white rounded-lg shadow-sm cursor-grab flex justify-between items-center"
                        >
                          <span className="font-medium text-[#676625] text-sm truncate">
                            {event.title}
                          </span>
                          <span className="text-neutral-400 text-xs">
                            #{index + 1}
                          </span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-[#8B9D83] hover:bg-[#676625df] text-white"
          >
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderEventsModal;
