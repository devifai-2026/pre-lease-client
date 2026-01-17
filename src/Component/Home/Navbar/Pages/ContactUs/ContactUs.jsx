import img from "../../../../../assets/ContactUs/img.png";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import squarebg from "../../../../../assets/propertyDetails/squaresbg.png"

const ContactUs = () => {
  return (
    <div className="max-w-[90%] lg:max-w-[85%] mx-auto font-montserrat">
      {/* Header Section with squarebg background */}
      <div 
        className="flex flex-col lg:flex-row gap-8 lg:gap-0 rounded-t-lg"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full lg:w-1/2 mt-8 md:mt-12 lg:mt-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center lg:text-left sm:text-3xl ">
            We're Here to Help
          </h2>
          <p className="text-[#262626] text-base md:text-lg lg:text-xl mt-4 lg:text-nowrap font-semibold text-center lg:text-left whitespace-normal sm:whitespace-nowrap ">
            Questions about properties, investments, partnerships, or your account?
          </p>
          <p className="text-[#262626]  font-semibold text-center lg:text-left text-base md:text-lg lg:text-xl"> 
            Reach out and we'll get back to you promptly.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end -mt-12 ">
          <img className="max-w-full lg:h-[65vh] lg:max-w-[90%] sm:h-[45vh] md:h-[30vh] sm:max-w-[80%]" src={img} alt="Contact illustration" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white p-6 lg:p-8 rounded-b-lg shadow-md sm:p-4 md:p-5">
        <h2 className="text-[#EE2529] text-xl md:text-2xl lg:text-3xl text-center font-semibold sm:text-lg md:text-xl">
          Let's Start a Conversation
        </h2>
        
      </div>
        {/* Cards and Form Section */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 mt-10 sm:gap-6 md:gap-8 sm:mt-6 md:mt-8">
          <ContactCards />
          <ContactForm />
        </div>
    </div>
  );
};

export default ContactUs;