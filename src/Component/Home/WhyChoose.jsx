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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat .
                </p>
            </div>
            
            <div className='max-w-[90%] mx-auto flex flex-col lg:flex-row items-center justify-between mt-14 gap-10'>
               {/* Image Section */}
               <div 
                    className='flex-1'
                    data-aos="fade-up"
                    data-aos-delay="200"
               >
                 <img 
                    className='h-[440px] w-full rounded-lg' 
                    src={img} 
                    alt="Why Choose PreLeaseGrid" 
                 />
               </div>
              
              {/* Features Section */}
              <div className='flex-1 space-y-4'>
                 {/* 1 */}
                 <div 
                    className='flex items-center gap-5 border-b-2 pb-3'
                    data-aos="fade-up"
                    data-aos-delay="300"
                 >
                    <div>
                        <img className='w-52 md:w-40 h-16' src={one} alt="" />
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg'>Platform Verified Every property authenticated</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 2 */}
                 <div 
                    className='flex items-center gap-5 border-b-2 pb-3'
                    data-aos="fade-up"
                    data-aos-delay="400"
                 >
                    <div>
                        <img className='w-52 md:w-40 h-16' src={two} alt="" />
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg'>12-18% Returns Guaranteed rental income</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 3 */}
                 <div 
                    className='flex items-center gap-5 border-b-2 pb-3'
                    data-aos="fade-up"
                    data-aos-delay="500"
                 >
                    <div>
                        <img className='w-52 md:w-40 h-16' src={three} alt="" />
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg'>Pre-Leased Only Immediate cash flow</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 {/* 4 */}
                 <div 
                    className='flex items-center gap-5'
                    data-aos="fade-up"
                    data-aos-delay="600"
                 >
                    <div>
                        <img className='w-52 md:w-40 h-16' src={four} alt="" />
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg'>Premium Tenants Corporate & MNC leases</h2>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae ert .</p>
                    </div>
                 </div>
                 
                 <div 
                    className='flex justify-center mx-auto mt-8'
                    data-aos="fade-up"
                    data-aos-delay="700"
                 >
                    <button className="border rounded-md text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#EE2529] to-[#C73834] text-xs md:text-sm hover:opacity-90 transition-opacity">
                        Explore More
                    </button>
                 </div>
              </div>
            </div>
        </div>
    );
};

export default WhyChoose;