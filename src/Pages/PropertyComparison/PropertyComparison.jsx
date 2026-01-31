import React, { useRef } from "react";
import { FaDownload, FaShareAlt } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropertyCards from "./Components/PropertyCards";
import OverView from "./Components/OverView";
import Productivity from "./Components/Productivity";
import LeaseTerms from "./Components/LeaseTerms";
import Facilities from "./Components/Facilities";
import Document from "./Components/Document";
import logo from "../../assets/Navbar/Preleasegrid logo 1.png";
import squarebg from "../../assets/propertyDetails/squaresbg.png";
import share from "../../assets/propertyDetails/share.svg";
import cardImg from "../../assets/FeaturedProperties/cardImg.png";

const PropertyComparison = () => {
  const reportRef = useRef(null);

const handleDownload = async () => {
  if (!reportRef.current) return;

  try {
    console.log('Generating PDF...');
    
    // Create a temporary container outside the DOM
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '1200px';
    tempContainer.style.height = 'auto';
    tempContainer.style.backgroundColor = '#FFFFFF';
    tempContainer.style.padding = '40px';
    tempContainer.style.boxSizing = 'border-box';
    tempContainer.style.overflow = 'hidden';
    
    // Create PDF header HTML
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    const formattedTime = currentDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    }).toUpperCase();
    const generatedOn = `October 30, 2025 | ${formattedTime}`;
    
    // Create header div
    const headerDiv = document.createElement('div');
    headerDiv.style.width = '100%';
    headerDiv.style.marginBottom = '30px';
    
    headerDiv.innerHTML = `
        <!-- Top heading centered -->
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #EE2529; font-weight: bold; font-size: 28px; margin: 0; font-family: Montserrat, sans-serif;">
                Property Comparison Report
            </h1>
        </div>
         <!-- Horizontal line -->
        <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0 30px 0;" />
        <!-- Second row: Logo on left, Date info on right -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 20px;">
            <!-- Left: Logo -->
            <div style="width: 160px;">
                <!-- Logo will be handled separately -->
            </div>
            
            <!-- Right: Date and Generated on -->
            <div style="text-align: right;">
                <div style="font-size: 13px; color: #767676; margin-bottom: 5px; font-family: Montserrat, sans-serif;">
                    Date: ${formattedDate}
                </div>
                <div style="font-size: 13px; color: #767676; font-family: Montserrat, sans-serif;">
                    Generated on: ${generatedOn}
                </div>
            </div>
        </div>
        
        <!-- Horizontal line -->
        <hr style="border: none; height: 1px; background-color: #ddd; margin: 20px 0 30px 0;" />
    `;
    
    // Create logo image
    const logoContainer = headerDiv.querySelector('div[style*="width: 160px"]');
    const logoImg = document.createElement('img');
    logoImg.src = logo;
    logoImg.alt = "Company Logo";
    logoImg.style.height = '50px';
    logoImg.style.width = 'auto';
    logoImg.style.objectFit = 'contain';
    logoContainer.appendChild(logoImg);
    
    tempContainer.appendChild(headerDiv);
    
    // Create PropertyCards section in HTML (hardcoded for PDF)
    const propertyCardsSection = document.createElement('div');
    propertyCardsSection.className = 'property-cards-section';
    propertyCardsSection.style.fontFamily = 'Montserrat, sans-serif';
    propertyCardsSection.style.marginBottom = '30px';
    
    // Header - responsive
    const headerGrid = document.createElement('div');
    headerGrid.style.display = 'grid';
    headerGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    headerGrid.style.borderBottom = '2px solid #767676';
    headerGrid.style.paddingBottom = '16px';
    headerGrid.style.marginBottom = '30px';
    
    // Header items
    const headerItems = [
        { title: 'Property Comparison', subtitle: 'Compare key metrics of properties' },
        { title: 'Residential Space', subtitle: 'Residency' },
        { title: 'Bank Space Gurgaon', subtitle: 'Banking' },
        { title: 'Retail Hub Bangalore', subtitle: 'Retail Chain' }
    ];
    
    headerItems.forEach((item, index) => {
        const headerItem = document.createElement('div');
        headerItem.style.textAlign = 'center';
        headerItem.style.padding = '16px';
        headerItem.style.borderRight = index < 3 ? '2px solid #EDECEC' : 'none';
        
        const title = document.createElement('p');
        title.textContent = item.title;
        title.style.fontSize = '14px';
        title.style.fontWeight = '600';
        title.style.margin = '0';
        title.style.color = '#262626';
        
        const subtitle = document.createElement('p');
        subtitle.textContent = item.subtitle;
        subtitle.style.fontSize = '12px';
        subtitle.style.color = '#767676';
        subtitle.style.marginTop = '4px';
        subtitle.style.margin = '0';
        
        headerItem.appendChild(title);
        headerItem.appendChild(subtitle);
        headerGrid.appendChild(headerItem);
    });
    
    propertyCardsSection.appendChild(headerGrid);
    
    // Create heading and cards container (flex layout like in UI)
    const headingCardsContainer = document.createElement('div');
    headingCardsContainer.style.display = 'flex';
    headingCardsContainer.style.alignItems = 'center';
    headingCardsContainer.style.justifyContent = 'space-between';
    headingCardsContainer.style.marginBottom = '40px';
    
    // Property heading on left
    const propertyHeading = document.createElement('h2');
    propertyHeading.textContent = 'Property';
    propertyHeading.style.color = '#767676';
    propertyHeading.style.fontWeight = '600';
    propertyHeading.style.fontSize = '18px';
    propertyHeading.style.margin = '0';
    propertyHeading.style.marginRight = '64px';
    
    // Create property cards container
    const propertyCardsContainer = document.createElement('div');
    propertyCardsContainer.style.display = 'grid';
    propertyCardsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    propertyCardsContainer.style.gap = '20px';
    propertyCardsContainer.style.width = '100%';
    
    // Property cards data (same as in PropertyCards component)
    const propertyCardsData = [
        {
            id: 1,
            title: "Residential Space",
            location: "Pune, Mundhva",
            clientType: "MNC Client",
            cost: "₹36.8 Crore",
            annualRent: "₹22.87 Lakhs",
            tenureLeft: "10 Yrs",
            roi: "90.21%",
            images: [cardImg, cardImg, cardImg, cardImg],
            propertyType: "Residency",
        },
        {
            id: 2,
            title: "Bank Space",
            location: "Gurgaon",
            clientType: "MNC Client",
            cost: "₹36.8 Crore",
            annualRent: "₹22.87 Lakhs",
            tenureLeft: "10 Yrs",
            roi: "90.21%",
            images: [cardImg, cardImg, cardImg, cardImg],
            propertyType: "Banking",
        },
        {
            id: 3,
            title: "Retail Space",
            location: "Bangalore",
            clientType: "MNC Client",
            cost: "₹36.8 Crore",
            annualRent: "₹22.87 Lakhs",
            tenureLeft: "10 Yrs",
            roi: "90.21%",
            images: [cardImg, cardImg, cardImg, cardImg],
            propertyType: "Retail Chain",
        }
    ];
    
    // Create each property card with enhanced shadow
    propertyCardsData.forEach(property => {
        const card = document.createElement('div');
        card.style.backgroundColor = '#FFFFFF';
        card.style.borderRadius = '12px';
        card.style.overflow = 'hidden';
        card.style.position = 'relative';
        // Enhanced shadow for better visibility in PDF
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)';
        card.style.border = '1px solid #f0f0f0';
        
        // Card content
        card.innerHTML = `
            <div style="position: relative; padding: 16px;">
                <p style="font-size: 18px; font-weight: 400; margin: 0 0 8px 0; color: #262626;">
                    ${property.title}
                </p>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <svg style="color: #EE2529; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span style="font-size: 14px; color: #262626; vertical-align: middle;padding-bottom: 16px;">
                            ${property.location}
                        </span>
                    </div>
                </div>
                
                <!-- Cross button -->
                <div style="position: absolute; top: 16px; right: 16px;">
                    <div style="background-color: transparent; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                        <svg style="height: 16px; width: 16px;" viewBox="0 0 24 24" fill="#767676">
                            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            <!-- Property Image -->
            <div style="position: relative;">
                <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: 288px; object-fit: cover;" />
                
                <!-- Gradient overlay -->
                <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 25%; background: linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 100%); backdrop-filter: blur(2px); border-top: 1px solid white;"></div>
                
                <!-- Slider Dots -->
                <div style="position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; z-index: 10;">
                    ${property.images.map((_, index) => `
                        <div style="width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); ${index === 0 ? 'background-color: #EE2529; border-color: #EE2529;' : 'background-color: white;'} cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"></div>
                    `).join('')}
                </div>
                
                <!-- Client Type Badge -->
                <div style="position: absolute; bottom: 12px; left: 16px; z-index: 10;">
                    <div style="background-color: #FFF3CA; padding: 4px 12px; border-radius: 16px; font-size: 12px; color: #767676; display: inline-flex; align-items: center; height: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);padding-bottom: 16px;">
                        ${property.clientType}
                    </div>
                </div>
                
                <!-- Share and Heart Icons -->
                <div style="position: absolute; top: 12px; right: 12px; display: flex; flex-direction: column; gap: 8px; z-index: 10;">
                    <div style="background-color: rgba(38, 38, 38, 0.54); border-radius: '50%'; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        <svg style="height: 16px; width: 16px; color: white;" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                        </svg>
                    </div>
                    <div style="background-color: rgba(38, 38, 38, 0.54); border-radius: '50%'; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        <svg style="height: 16px; width: 16px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            <!-- Property Details -->
            <div style="display: flex; align-items: center; justify-content: space-around; margin-top: 16px; padding: 8px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <p style="margin: 0; font-size: 14px; color: #767676;">
                        Cost: <span style="font-weight: 600; color: #262626;">${property.cost}</span>
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #767676;">
                        Annual Rent: <span style="font-weight: 600; color: #262626;">${property.annualRent}</span>
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #767676;">
                        Tenure Left: <span style="font-weight: 600; color: #262626;">${property.tenureLeft}</span>
                    </p>
                </div>
                <div style="background: linear-gradient(to right, #F2F2F2, #FFFFFF); width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-left: 8px;">
                    <p style="font-size: 16px; font-weight: 600; margin: 0;">ROI</p>
                    <p style="color: #EE2529; font-weight: 700; font-size: 18px; margin: 0;">${property.roi}</p>
                </div>
            </div>
            
            <!-- Action Buttons -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px 0; padding: 0 16px;">
                <button style="border: 1px solid #767676; color: #767676; border-radius: 6px; padding: 8px 12px; font-size: 12px; font-weight: 600; background: white; cursor: pointer; transition: background-color 0.3s; box-shadow: 0 1px 2px rgba(0,0,0,0.1); padding-bottom: 16px;">
                    View
                </button>
                <button style="border-radius: 6px; padding: 8px 12px; font-size: 12px; font-weight: 700; background: linear-gradient(to right, #EE2529, #C73834); color: white; border: none; cursor: pointer; transition: opacity 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);padding-bottom: 16px;">
                    Enquire
                </button>
            </div>
        `;
        
        propertyCardsContainer.appendChild(card);
    });
    
    // Create a wrapper for the cards to align with heading
    const cardsWrapper = document.createElement('div');
    cardsWrapper.style.flex = '1';
    cardsWrapper.appendChild(propertyCardsContainer);
    
    // Add heading and cards to container
    headingCardsContainer.appendChild(propertyHeading);
    headingCardsContainer.appendChild(cardsWrapper);
    
    // Add everything to propertyCardsSection
    propertyCardsSection.appendChild(headingCardsContainer);
    
    // Add PropertyCards section to temp container
    tempContainer.appendChild(propertyCardsSection);
    
    // Clone the entire report content
    const contentClone = reportRef.current.cloneNode(true);
    
    // Find and remove ONLY the PropertyCards component
    // Look for the header section first
    const headerSections = contentClone.querySelectorAll('div');
    let propertyCardsComponent = null;
    
    headerSections.forEach(div => {
        const textContent = div.textContent || '';
        if (textContent.includes('Property Comparison') && 
            textContent.includes('Residential Space') &&
            textContent.includes('Bank Space Gurgaon')) {
            // Found the PropertyCards header, get the parent component
            propertyCardsComponent = div.closest('div[class*="font-montserrat"], div[class*="PropertyCards"], div:has(> div.grid-cols-2)');
            if (!propertyCardsComponent) {
                // If we can't find a specific parent, use this div's parent
                propertyCardsComponent = div.parentElement;
            }
        }
    });
    
    // If we found the PropertyCards component, remove it
    if (propertyCardsComponent) {
        propertyCardsComponent.remove();
    }
    
    // Now we need to extract all the other components properly
    // The contentClone should now only contain the other components
    // Let's find the top-level sections (direct children of contentClone)
    const otherComponents = [];
    const directChildren = contentClone.children;
    
    for (let i = 0; i < directChildren.length; i++) {
        const child = directChildren[i];
        // Skip empty text nodes
        if (child.nodeType === 1) { // Element node
            otherComponents.push(child.cloneNode(true));
        }
    }
    
    // Clear tempContainer and rebuild with proper structure
    tempContainer.innerHTML = '';
    tempContainer.appendChild(headerDiv);
    
    // Add the hardcoded PropertyCards section
    tempContainer.appendChild(propertyCardsSection);
    
    // Add all other components
    otherComponents.forEach(component => {
        tempContainer.appendChild(component);
    });
    
    // Remove borders from ALL tables in the tempContainer
    const allTables = tempContainer.querySelectorAll('table');
    allTables.forEach(table => {
        table.style.border = 'none';
        table.style.borderCollapse = 'collapse';
        
        // Remove borders from all table cells
        const allCells = table.querySelectorAll('td, th');
        allCells.forEach(cell => {
            cell.style.border = 'none';
            cell.style.borderWidth = '0';
            cell.style.borderStyle = 'none';
        });
        
        // Remove borders from all table rows
        const allRows = table.querySelectorAll('tr');
        allRows.forEach(row => {
            row.style.border = 'none';
            row.style.borderWidth = '0';
            row.style.borderStyle = 'none';
        });
    });
    
    // Now we need to process the Productivity table specifically to prevent page breaks
    const productivityTables = tempContainer.querySelectorAll('table');
    
    // Find the Productivity table (look for table with specific content)
    let productivityTable = null;
    productivityTables.forEach(table => {
        const textContent = table.textContent || '';
        if (textContent.includes('Property Value') && 
            textContent.includes('Rent per sq ft') &&
            textContent.includes('Monthly Rent')) {
            productivityTable = table;
        }
    });
    
    // If we found the Productivity table, apply special styling
    if (productivityTable) {
        // Wrap the table in a container that will handle page breaks better
        const tableWrapper = document.createElement('div');
        tableWrapper.style.pageBreakInside = 'avoid';
        tableWrapper.style.breakInside = 'avoid';
        tableWrapper.style.overflow = 'visible';
        tableWrapper.style.width = '100%';
        
        // Apply table styling to keep it together
        productivityTable.style.pageBreakInside = 'avoid';
        productivityTable.style.breakInside = 'avoid';
        productivityTable.style.width = '100%';
        productivityTable.style.tableLayout = 'fixed';
        productivityTable.style.borderCollapse = 'collapse';
        productivityTable.style.border = 'none';
        
        // Ensure all rows have the same styling
        const allRows = productivityTable.querySelectorAll('tr');
        allRows.forEach((row, index) => {
            row.style.pageBreakInside = 'avoid';
            row.style.breakInside = 'avoid';
            row.style.border = 'none';
            
            // Make sure rows stay together on the same page
            const cells = row.querySelectorAll('td, th');
            cells.forEach(cell => {
                cell.style.pageBreakInside = 'avoid';
                cell.style.breakInside = 'avoid';
                cell.style.padding = '12px';
                cell.style.fontSize = '14px'; // Slightly smaller for PDF
                cell.style.lineHeight = '1.4';
                cell.style.border = 'none'; // REMOVED BORDER
                cell.style.verticalAlign = 'middle';
            });
        });
        
        // Move the table into the wrapper
        const parent = productivityTable.parentElement;
        if (parent) {
            parent.insertBefore(tableWrapper, productivityTable);
            tableWrapper.appendChild(productivityTable);
        }
    }
    
    // Append to body at a position that's not visible
    document.body.appendChild(tempContainer);
    
    // Calculate content height and determine if we need special handling
    const contentHeight = tempContainer.scrollHeight;
    
    // Use a smaller scale for better table rendering
    const canvas = await html2canvas(tempContainer, {
        scale: 1.5, // Reduced scale for better table rendering
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        windowWidth: 1200,
        windowHeight: contentHeight,
        allowTaint: true,
        onclone: function(clonedDoc) {
            // Apply additional styling to cloned document
            const tables = clonedDoc.querySelectorAll('table');
            tables.forEach(table => {
                table.style.pageBreakInside = 'avoid';
                table.style.breakInside = 'avoid';
                table.style.width = '100%';
                table.style.border = 'none'; // REMOVED BORDER
                
                // Style all cells
                const cells = table.querySelectorAll('td, th');
                cells.forEach(cell => {
                    cell.style.padding = '10px';
                    cell.style.fontSize = '13px';
                    cell.style.lineHeight = '1.3';
                    cell.style.border = 'none'; // REMOVED BORDER
                });
            });
        }
    });

    // Remove temp container
    document.body.removeChild(tempContainer);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pdfWidth / imgWidth;
    
    let finalImgWidth = pdfWidth;
    let finalImgHeight = imgHeight * ratio;
    
    // Improved multi-page handling
    if (finalImgHeight > pdfHeight) {
        let remainingHeight = imgHeight;
        let currentYPosition = 0;
        let pageCount = 0;
        const pageHeightInPixels = (pdfHeight / ratio) * 0.95; // 95% of page height for safety margin
        
        while (remainingHeight > 0) {
            // Calculate how much we can fit on this page
            const pageCanvasHeight = Math.min(remainingHeight, pageHeightInPixels);
            
            // Check if we're cutting through a table
            if (productivityTable && currentYPosition > 0) {
                // Get the table's position relative to the current page
                const tableRect = productivityTable.getBoundingClientRect();
                const tableTop = tableRect.top;
                const tableBottom = tableRect.bottom;
                const pageCutPosition = currentYPosition + pageCanvasHeight;
                
                // If we're cutting through the middle of the table, adjust
                if (pageCutPosition > tableTop && pageCutPosition < tableBottom) {
                    // Move to next page and start with the entire table
                    currentYPosition = tableTop;
                    remainingHeight = imgHeight - currentYPosition;
                    continue;
                }
            }
            
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = pageCanvasHeight;
            
            const ctx = pageCanvas.getContext('2d');
            // Fill with white background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            
            // Draw the portion of the original canvas
            ctx.drawImage(
                canvas,
                0,
                currentYPosition,
                canvas.width,
                pageCanvasHeight,
                0,
                0,
                pageCanvas.width,
                pageCanvasHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png');
            
            if (pageCount > 0) {
                pdf.addPage();
            }
            
            // Add some margin at the top for better readability
            const topMargin = pageCount === 0 ? 0 : 5;
            pdf.addImage(pageImgData, 'PNG', 0, topMargin, finalImgWidth, pdfHeight - topMargin);
            
            remainingHeight -= pageCanvasHeight;
            currentYPosition += pageCanvasHeight;
            pageCount++;
        }
    } else {
        // Single page
        pdf.addImage(imgData, 'PNG', 0, 0, finalImgWidth, finalImgHeight);
    }
    
    pdf.save(`Property_Comparison_Report_${new Date().getTime()}.pdf`);
    
    console.log('PDF downloaded successfully');
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
  const handleShare = () => {
    console.log("Share report");
    // Add your share logic here
  };

  return (
    <div className="max-w-[95%] mx-auto mt-6">
      {/* Header section with squarebg background */}
      <div
        className="flex flex-col md:flex-row items-center justify-between rounded-t-lg p-4 space-y-2"
        style={{
          backgroundImage: `url(${squarebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Original UI header */}
        <h2 className="text-[#EE2529] font-bold text-sm">
          Property Comparison Dashboard
          <span className="text-[#767676] font-normal">
            {" "}
            (3 properties selected)
          </span>
        </h2>
      </div>

      {/* Report content for PDF - This is what appears in UI */}
      <div ref={reportRef} className="p-4 bg-white">
        <PropertyCards />
        <OverView />
        <Productivity />
        <LeaseTerms />
        <Facilities />
        <Document />
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
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
