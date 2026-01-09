import { GoArrowUpRight } from "react-icons/go";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import squarebg from "../../assets/propertyDetails/squaresbg.png";

const Banner = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
      offset: 100, // Offset (in px) from the original trigger point
      delay: 200, // Delay animations (in milliseconds)
    });
    
    // Refresh AOS when component mounts
    AOS.refresh();
  }, []);

  return (
    <div className="relative -mt-8 mt:mt-8 lg:mt-16 flex justify-center">
      {/* Background image container - 85% width */}
      <div 
        className="absolute inset-x-0 -z-10 rounded-lg overflow-hidden w-[100%] mx-auto"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '400px'
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/60"></div>
      </div>
      
      {/* Content container - centered within the 85% width background */}
      <div 
        className="max-w-xl px-4 sm:px-6 lg:px-0 min-h-[400px] flex flex-col justify-center w-full"
        data-aos="fade-up"
      >
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight lg:leading-tight"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Earn effortlessly with <br />
          <span 
            className="text-[#EE2529] font-semibold"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            PreleaseGrid
          </span>
        </h2>
        <p 
          className="mt-4 text-center text-[#262626] text-sm sm:text-base md:text-lg lg:text-lg font-montserrat"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          PreleaseGrid offers carefully curated pre-leased properties designed to
          deliver steady, reliable income — with verified assets, trusted tenants,
          and zero management hassle.
        </p>
        <button 
          className="mt-6 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center justify-center mx-auto gap-1.5 sm:gap-2 lg:gap-2 font-montserrat text-sm sm:text-base lg:text-base"
          data-aos="zoom-in"
          data-aos-delay="800"
        >
          Get Started
          <GoArrowUpRight className="h-5 w-5 sm:h-5 sm:w-5 lg:h-6 lg:w-6 bg-white rounded-full p-0.5 sm:p-1 lg:p-1 text-[#EE2529]" />
        </button>
      </div>
    </div>
  );
};

export default Banner;