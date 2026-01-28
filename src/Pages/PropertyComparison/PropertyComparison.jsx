import React, { useRef } from 'react';
import { FaDownload, FaShareAlt } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropertyCards from './Components/PropertyCards';
import OverView from './Components/OverView';
import Productivity from './Components/Productivity';
import LeaseTerms from './Components/LeaseTerms';
import Facilities from './Components/Facilities';
import Document from './Components/Document';
import logo from "../../assets/Navbar/Preleasegrid logo 1.png"
import squarebg from "../../assets/propertyDetails/squaresbg.png"
import share from "../../assets/propertyDetails/share.svg"

const PropertyComparison = () => {
    const reportRef = useRef(null);

    const handleDownload = async () => {
        if (!reportRef.current) return;

        try {
            console.log('Generating PDF...');

            // Create a temporary div that includes the PDF header + content
            const tempDiv = document.createElement('div');
            tempDiv.style.width = '100%';
            tempDiv.style.padding = '20px';
            tempDiv.style.backgroundColor = '#FFFFFF';
            
            // Create PDF header HTML
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-GB');
            const formattedTime = currentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            }).toUpperCase();
            const generatedOn = `October 30, 2025 | ${formattedTime}`;
            
            tempDiv.innerHTML = `
                <div style="width: 100%; margin-bottom: 20px;">
                    <!-- Top heading centered -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #EE2529; font-weight: bold; font-size: 24px; margin: 0;">
                            Property Comparison Report
                        </h1>
                    </div>
                    
                    <!-- Second row: Logo on left, Date info on right -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%;">
                        <!-- Left: Logo -->
                        <div style="width: 160px;">
                            <img src="${logo}" alt="Company Logo" style="height: 48px; width: auto; object-fit: contain;" />
                        </div>
                        
                        <!-- Right: Date and Generated on -->
                        <div style="text-align: right;">
                            <div style="font-size: 12px; color: #767676; margin-bottom: 4px;">
                                Date: ${formattedDate}
                            </div>
                            <div style="font-size: 12px; color: #767676;">
                                Generated on: ${generatedOn}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Horizontal line -->
                    <hr style="border: none; height: 1px; background-color: #ddd; margin: 15px 0 20px 0;" />
                </div>
            `;
            
            // Clone the report content
            const contentClone = reportRef.current.cloneNode(true);
            tempDiv.appendChild(contentClone);
            
            // Append to body temporarily
            document.body.appendChild(tempDiv);
            
            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#FFFFFF',
                logging: false,
            });

            // Remove temp div
            document.body.removeChild(tempDiv);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight;
            
            let finalImgHeight = pdfHeight;
            let finalImgWidth = finalImgHeight * ratio;
            
            if (finalImgWidth > pdfWidth) {
                finalImgWidth = pdfWidth;
                finalImgHeight = finalImgWidth / ratio;
            }
            
            // Add the complete image (header + content) to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, finalImgWidth, finalImgHeight);
            
            pdf.save(`Property_Comparison_Report_${new Date().getTime()}.pdf`);
            
            console.log('PDF downloaded successfully');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    const handleShare = () => {
        console.log('Share report');
        // Add your share logic here
    };

    return (
        <div className='max-w-[95%] mx-auto mt-6'>
            {/* Header section with squarebg background */}
            <div 
                className='flex flex-col md:flex-row items-center justify-between rounded-t-lg p-4 space-y-2'
                style={{
                    backgroundImage: `url(${squarebg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Original UI header */}
                <h2 className='text-[#EE2529] font-bold text-sm'>
                    Property Comparison Dashboard 
                    <span className='text-[#767676] font-normal'> (3 properties selected)</span>
                </h2>
                
              
            </div>
            
            {/* Report content for PDF - This is what appears in UI */}
            <div ref={reportRef} className=' p-4 bg-white'>
                <PropertyCards />
                <OverView />
                <Productivity />
                <LeaseTerms />
                <Facilities />
                <Document />
            </div>
              {/* Buttons */}
                <div className="flex justify-center gap-4 ">
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-2 border border-[#767676] text-[#767676] rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors bg-white"
                    >
                        <FaDownload />
                        Download Report
                    </button>
                    <button 
                        onClick={handleShare}
                        className="flex items-center gap-2 border border-[#767676] text-[#767676] rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors bg-white"
                    >
                        <img src={share} alt="" />
                        Share Report
                    </button>
                </div>
        </div>
    );
};

export default PropertyComparison;