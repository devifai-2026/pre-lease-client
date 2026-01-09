import React, { useState } from 'react';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Can we schedule a virtual tour of the property?",
      answer: "Yes, we offer virtual tours for all our listed properties. You can schedule a virtual tour by contacting our support team or through the 'Schedule Tour' button on the property page.",
      category: "General"
    },
    {
      id: 2,
      question: "What are the property tax rates in this area?",
      answer: "Property tax rates vary by location and property type. For this specific property in Pune, the current property tax rate is approximately 0.3% to 0.5% of the property's market value annually.",
      category: "Tax & Legal"
    },
    {
      id: 3,
      question: "Do you offer staging services for the homes?",
      answer: "Yes, we provide professional staging services to showcase your property in the best light. Our staging packages include furniture rental, decor, and professional photography.",
      category: "Services"
    },
    {
      id: 4,
      question: "What school district is the property located in?",
      answer: "The property is located in the Pune Municipal Corporation area, which includes access to several reputed CBSE and ICSE schools. Specific school district information is available upon request.",
      category: "Location"
    },
    {
      id: 5,
      question: "Are there any association fees for the properties?",
      answer: "Yes, most properties in this area have monthly maintenance or association fees. For this specific property, the monthly maintenance fee is ₹15,000 which covers security, common area maintenance, and basic amenities.",
      category: "Financial"
    },
    {
      id: 6,
      question: "What is the average time on market for your properties?",
      answer: "The average time on market for premium residential properties in this area is approximately 45-60 days. However, well-priced and well-maintained properties often sell within 30 days.",
      category: "Market"
    }
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <>
      {/* FAQ Questions Grid */}
      <div className="space-y-4 rounded-lg shadow-lg p-4">
        {faqData.map((faq) => (
          <div 
            key={faq.id} 
            className={`border rounded-lg overflow-hidden transition-all duration-200 bg-[#F2F2F2] ${
              activeQuestion === faq.id ? 'border-[#EE2529] bg-red-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <button
              className="w-full text-left p-4 flex items-center justify-between focus:outline-none"
              onClick={() => toggleQuestion(faq.id)}
            >
              <div className="flex items-center gap-3">
                <span className={`font-medium ${activeQuestion === faq.id ? 'text-[#EE2529]' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  activeQuestion === faq.id ? 'rotate-180 text-[#EE2529]' : 'text-[#EE2529]'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {activeQuestion === faq.id && (
              <div className="p-4 pt-0">
                <div className="pl-6 border-l-2 border-[#EE2529]">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

     
    </>
  );
};

export default FAQ;