import img from "../../../../../assets/ContactUs/img.png";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import squarebg from "../../../../../assets/propertyDetails/squaresbg.png"

const ContactUs = () => {
  return (
    <div className="max-w-[85%] mx-auto font-montserrat">
      {/* Header Section with squarebg background */}
      <div 
        className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0  rounded-t-lg"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
            We're Here to Help
          </h2>
          <p className="text-[#262626] text-lg mt-4">
            Questions about properties, investments, partnerships, or your
            account? Reach out and we'll get back to you promptly.
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img className="max-w-full h-auto lg:max-w-[90%]" src={img} alt="Contact illustration" />
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white p-6 lg:p-8 rounded-b-lg shadow-md">
        <h2 className="text-[#EE2529] text-xl md:text-2xl lg:text-3xl text-center font-semibold">
          Let's Start a Conversation
        </h2>
        
        {/* Cards and Form Section */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 mt-10">
          <ContactCards />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;