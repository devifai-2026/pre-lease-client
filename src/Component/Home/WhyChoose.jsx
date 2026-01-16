import React from 'react';
import img from "../../assets/WhyChoose/img.png"
import one from "../../assets/WhyChoose/one.png"
import two from "../../assets/WhyChoose/two.png"
import three from "../../assets/WhyChoose/three.png"
import four from "../../assets/WhyChoose/four.png"

const WhyChoose = () => {
    return (
        <div className='mt-16'>
            <div className='max-w-[80%] mx-auto'>
                <h2 
                    className='text-[#262626] text-center text-2xl md:text-3xl lg:text-4xl'
                    data-aos="fade-up"
                >
                    Why choose PreLeaseGrid
                </h2>
                <p 
                    className='text-center text-[#262626] mt-3'
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    The most trusted platform for premium real estate Property
                </p>
            </div>
            
            <div className='max-w-[90%] mx-auto flex flex-col md:flex-row items-stretch justify-between mt-5 md:mt-7 lg:mt-14 gap-10'>
               {/* Image Section */}
               <div 
                    className='flex-1'
                    data-aos="fade-up"
                    data-aos-delay="200"
               >
                 <img 
                    className='w-full h-full  ' 
                    src={img} 
                    alt="Why Choose PreLeaseGrid" 
                 />
               </div>
              
              {/* Features Section */}
              <div className='flex-1 space-y-4'>
                 {/* 1 */}
                 <div 
                    className='flex items-start gap-5 lg:border-b-2 pb-3 lg:min-h-[120px]'
                    data-aos="fade-up"
                    data-aos-delay="300"
                 >
                    <div className='flex-shrink-0'>
                        <img className='w-12 h-12 md:h-16 md:w-16  lg:w-40  object-contain' src={one} alt="" />
                    </div>
                    <div>
                        <h2 className='font-normal lg:font-semibold text-lg'>Platform Verified Every property authenticated</h2>
                        <p className='text-sm hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 2 */}
                 <div 
                    className='flex items-start gap-5 lg:border-b-2 pb-3 lg:min-h-[120px]'
                    data-aos="fade-up"
                    data-aos-delay="400"
                 >
                    <div className='flex-shrink-0'>
                        <img className='w-12 h-12 md:h-16 md:w-16  lg:w-40  object-contain' src={two} alt="" />
                    </div>
                    <div>
                        <h2 className='font-normal lg:font-semibold text-lg'>12-18% Returns Guaranteed rental income</h2>
                        <p className='text-sm hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 3 */}
                 <div 
                    className='flex items-start gap-5 lg:border-b-2 pb-3 lg:min-h-[120px]'
                    data-aos="fade-up"
                    data-aos-delay="500"
                 >
                    <div className='flex-shrink-0'>
                        <img className='w-12 h-12 md:h-16 md:w-16  lg:w-40  object-contain' src={three} alt="" />
                    </div>
                    <div>
                        <h2 className='font-normal lg:font-semibold text-lg'>Pre-Leased Only Immediate cash flow</h2>
                        <p className='text-sm hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 4 */}
                 <div 
                    className='flex items-start gap-5 lg:min-h-[120px]'
                    data-aos="fade-up"
                    data-aos-delay="600"
                 >
                    <div className='flex-shrink-0'>
                        <img className='w-12 h-12 md:h-16 md:w-16  lg:w-40  object-contain' src={four} alt="" />
                    </div>
                    <div>
                        <h2 className='font-normal lg:font-semibold text-lg'>Premium Tenants Corporate & MNC leases</h2>
                        <p className='text-sm hidden lg:block'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 <div 
                    className='flex justify-center mx-auto mt-8'
                    data-aos="fade-up"
                    data-aos-delay="700"
                 >
                    <button className="border rounded-md text-white px-5 py-2 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity font-semibold">
                        Explore More
                    </button>
                 </div>
              </div>
            </div>
        </div>
    );
};

export default WhyChoose;