import { heroBgImg, titleImg } from "./../../assets/index.js";

function Hero() {
  return (
    <div
      className="mt-16 bg-cover bg-center h-[calc(100vh-64px)]"
      style={{ backgroundImage: `url(${heroBgImg})` }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full lg:w-1/2">
          <div
            data-aos="fade-up"
            className="flex flex-col lg:flex-row items-start gap-6"
          >
            <img src={titleImg} alt="Title image" className="w-10 pt-3" />
            <div className="flex flex-col gap-6">
              <h1
                className="text-xl sm:text-3xl md:text-4xl xl:text-5xl text-[#403905] font-bold
                font-['Plus Jakarta Sans',sans-serif] leading-8 sm:leading-14"
              >
                Entdecke deine innere <br />
                und äußere Schönheit <br />
                mit Face Yoga
              </h1>
              <p className="text-base text-[#403905] font-['Barlow',sans-serif] max-w-[380px]">
                Erleben Sie die transformative Kraft des Swiss Face Yoga für
                innere und äußere Schönheit.
              </p>
              <button
                className="outline-0 border-0 h-12 flex items-center justify-center px-6 rounded-4xl text-white bg-[#8B9D83]
                text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit"
              >
                Beginnen Sie Ihre Reise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
