function InfoCard({ image, title, desc }) {
  return (
    <div
      className="flex flex-col gap-4 border border-neutral-100 rounded-lg shadow-md
      py-6 px-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
    >
      <img src={image} alt={title} width={30} />
      <h4 className="text-[#8B9D83] text-base font-semibold">{title}</h4>
      <p className="text-[#374151cf] font-medium text-sm leading-7">{desc}</p>
    </div>
  );
}

export default InfoCard;
