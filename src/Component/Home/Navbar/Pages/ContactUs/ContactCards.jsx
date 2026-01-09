// components/ContactCards.jsx
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoMdOpen } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const ContactCards = () => {
  const cards = [
    {
      id: 1,
      icon: <FaLocationDot className="text-[#F7C952] text-lg md:text-xl" />,
      title: "Office Address",
      content: "123 Business Street, Floor 15 Mumbai, Maharashtra, 10001",
      buttonText: "View On Maps",
      buttonIcon: <IoMdOpen className="w-4 h-4 md:w-5 md:h-5" />
    },
    {
      id: 2,
      icon: <IoIosCall className="text-[#F7C952] text-lg md:text-xl" />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      buttonText: "Call Now",
      buttonIcon: <IoMdOpen className="w-4 h-4 md:w-5 md:h-5" />
    },
    {
      id: 3,
      icon: <MdOutlineMailOutline className="text-[#F7C952] text-lg md:text-xl" />,
      title: "Email",
      content: "contact@platform.com",
      buttonText: "Send Email",
      buttonIcon: <IoMdOpen className="w-4 h-4 md:w-5 md:h-5" />
    },
    {
      id: 4,
      icon: <FaWhatsapp className="text-[#F7C952] text-lg md:text-xl" />,
      title: "WhatsApp",
      content: "Quick support chat",
      buttonText: "Start Chat",
      buttonIcon: <IoMdOpen className="w-4 h-4 md:w-5 md:h-5" />
    }
  ];

  return (
    <div className="w-full lg:w-1/2 lg:h-full">
      <p className="mb-6 md:mb-8">
        Whether you're an investor looking for opportunities, a property
        owner wanting to list, or a developer seeking partnerships, we're
        here to help you succeed.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 h-full">
        {cards.map((card) => (
          <div key={card.id} className="shadow-md rounded-md p-4 md:p-5 flex flex-col h-full">
            <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
              {card.icon}
              <p className="font-bold text-base md:text-lg">{card.title}</p>
            </div>
            <p className="text-[#767676] text-sm md:text-base flex-grow">
              {card.content}
            </p>
            <button
              className="px-3 py-2 md:py-3 text-white font-semibold rounded-lg transition 
                bg-gradient-to-r from-[#EE2529] to-[#C73834]
                hover:opacity-90 text-xs md:text-sm w-full flex items-center justify-center gap-2 mt-3 md:mt-4"
            >
              {card.buttonText} {card.buttonIcon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCards;