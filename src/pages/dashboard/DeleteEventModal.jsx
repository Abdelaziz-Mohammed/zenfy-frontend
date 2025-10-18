function DeleteEventModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg py-12 px-6 w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-10 text-center">
          Are you sure you want to delete this event?
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteEventModal;
