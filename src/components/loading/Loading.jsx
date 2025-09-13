function Loading({ fullscreen = true }) {
  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0 z-50" : "min-h-96"
      } flex items-center justify-center bg-white`}
    >
      <div className="w-12 h-12 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
