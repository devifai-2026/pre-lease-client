import React from 'react';
import { CiMail } from 'react-icons/ci';
import { IoCallOutline } from 'react-icons/io5';

const CallEmail = () => {
    return (
        <div className="max-w-2xl mt-10 mx-auto">
            <div className='flex items-start justify-center mx-auto gap-3'>
                {/* call */}
                <div className='flex items-start justify-center gap-3 shadow-md rounded-md p-5'>
                    <div className='flex items-start'>
                        <IoCallOutline className='bg-[#FDEDEE] rounded-md p-1 text-[#EE2529] w-7 h-7 mt-1' />
                    </div>
                    <div className='space-y-5'>
                        <div className='space-y-1'>
                            <h2 className='text-[#EE2529] text-sm font-semibold'>Quick Call</h2>
                            <p className='text-[#262626] text-xs text-nowrap'>Need immediate assistance?</p>
                        </div>
                        <div>
                            <button className='bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white py-2 px-4 text-xs text-nowrap rounded-md'>
                                Call +91 1800-XXX-XXXX
                            </button>
                        </div>
                    </div>
                </div>
                {/* email */}
                <div className='flex items-start justify-center gap-3 shadow-md rounded-md p-5'>
                    <div className='flex items-start'>
                        <CiMail className='bg-[#FDEDEE] rounded-md p-1 text-[#EE2529] w-7 h-7 mt-1' />
                    </div>
                    <div className='space-y-5'>
                        <div className='space-y-1'>
                            <h2 className='text-[#EE2529] text-sm font-semibold'>Email Us</h2>
                            <p className='text-[#262626] text-xs text-nowrap'>Prefer email communication?</p>
                        </div>
                        <div>
                            <button className='bg-gradient-to-r from-[#EE2529] to-[#C73834] text-white py-2 px-4 text-xs text-nowrap rounded-md'>
                                Send an Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallEmail;