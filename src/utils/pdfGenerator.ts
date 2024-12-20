import jsPDF from 'jspdf';
import { FormState } from '../types/form';

export const generatePDF = async (formData: FormState): Promise<string> => {
  try {
    console.log('Starting PDF generation with data:', formData);

    // Initialize PDF with 16:9 dimensions (PowerPoint slide ratio)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [1920, 1080],
      compress: true
    });

    // Set default font
    pdf.setFont("helvetica");

    // Helper function to add wrapped text with proper line height
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, isBulletPoint: boolean = false) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text || '', maxWidth);
      pdf.text(lines, x, y);
      // Use smaller line height for bullet points
      const lineHeight = isBulletPoint ? fontSize * 1.2 : fontSize * 1.5;
      return y + (lines.length * lineHeight);
    };

    // Helper function to add a slide header
    const addSlideHeader = (title: string, sections: Array<{ title: string; pageNumber: number }>) => {
      // Add header background
      pdf.setFillColor(70, 70, 70); // Neutral dark gray
      pdf.rect(0, 0, 1920, 120, 'F');
      
      // Add title on the left
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(32); // Smaller title for better balance
      pdf.text(title, 80, 70); // Centered vertically in the header

      // Add navigation menu
      pdf.setFontSize(18); // Small font size for menu
      const spacing = 80; // Space between menu items
      const firstLineY = 45; // Adjusted Y position for first line
      const secondLineY = 85; // Adjusted Y position for second line

      // Split sections into two arrays for two lines
      const midPoint = Math.ceil(sections.length / 2);
      const firstLineItems = sections.slice(0, midPoint);
      const secondLineItems = sections.slice(midPoint);

      // Calculate total width for each line to right-align
      const calculateLineWidth = (items: typeof sections) => {
        return items.reduce((total, section, index) => {
          const textWidth = pdf.getTextWidth(section.title);
          // Add separator width if not last item
          return total + textWidth + (index < items.length - 1 ? spacing : 0);
        }, 0);
      };

      const firstLineWidth = calculateLineWidth(firstLineItems);
      const secondLineWidth = calculateLineWidth(secondLineItems);

      // First line of menu - align right
      let menuX = 1920 - 80 - firstLineWidth; // Right margin of 80
      firstLineItems.forEach((section, index) => {
        const text = section.title;
        const textWidth = pdf.getTextWidth(text);
        
        // Create clickable link
        pdf.setTextColor(200, 200, 200);
        pdf.text(text, menuX, firstLineY);
        pdf.link(menuX, firstLineY - 20, textWidth, 30, { pageNumber: section.pageNumber + 3 });

        menuX += textWidth + spacing;
        
        // Add separator if not last item in first line
        if (index < firstLineItems.length - 1) {
          pdf.setTextColor(150, 150, 150);
          pdf.text('|', menuX - spacing/2 + 5, firstLineY);
        }
      });

      // Second line of menu - align right
      menuX = 1920 - 80 - secondLineWidth; // Right margin of 80
      secondLineItems.forEach((section, index) => {
        const text = section.title;
        const textWidth = pdf.getTextWidth(text);
        
        // Create clickable link
        pdf.setTextColor(200, 200, 200);
        pdf.text(text, menuX, secondLineY);
        pdf.link(menuX, secondLineY - 20, textWidth, 30, { pageNumber: section.pageNumber + 3 });

        menuX += textWidth + spacing;
        
        // Add separator if not last item in second line
        if (index < secondLineItems.length - 1) {
          pdf.setTextColor(150, 150, 150);
          pdf.text('|', menuX - spacing/2 + 5, secondLineY);
        }
      });
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);
    };

    // Helper function to add page number
    const addPageNumber = (pageNumber: number) => {
      pdf.setFontSize(24);
      pdf.setTextColor(100, 100, 100);
      const text = `${pageNumber}`;
      const textWidth = pdf.getTextWidth(text);
      pdf.text(text, 1920 - 80 - textWidth, 1040);
      pdf.setTextColor(0, 0, 0);
    };

    // Helper function to handle two-column layout
    const addTwoColumnContent = (title: string, content: string, startY: number) => {
      const columnWidth = 800; // Width for each column
      const columnGap = 80; // Gap between columns
      const leftColumnX = 80;
      const rightColumnX = leftColumnX + columnWidth + columnGap;
      
      let leftY = startY;
      let rightY = startY;
      let isLeftColumn = true;
      
      const paragraphs = (content || '').split('\n').filter(p => p.trim());
      
      paragraphs.forEach(paragraph => {
        const currentX = isLeftColumn ? leftColumnX : rightColumnX;
        const currentY = isLeftColumn ? leftY : rightY;
        
        // Check if we need a new page
        if (currentY > 900) {
          pdf.addPage();
          addSlideHeader(title + ' (continued)', sections);
          leftY = 180;
          rightY = 180;
          isLeftColumn = true;
          return;
        }
        
        // Add text and update position
        if (paragraph.trim().startsWith('•')) {
          const newY = addWrappedText(paragraph, currentX + 40, currentY, columnWidth - 40, 28, true);
          if (isLeftColumn) {
            leftY = newY + 20;
          } else {
            rightY = newY + 20;
          }
        } else if (paragraph.match(/^\d+\./)) {
          const newY = addWrappedText(paragraph, currentX, currentY, columnWidth, 32, true);
          if (isLeftColumn) {
            leftY = newY + 20;
          } else {
            rightY = newY + 20;
          }
        } else {
          const newY = addWrappedText(paragraph, currentX, currentY, columnWidth, 32);
          if (isLeftColumn) {
            leftY = newY + 40;
          } else {
            rightY = newY + 40;
          }
        }
        
        // Switch columns if left column gets too long
        if (isLeftColumn && leftY > rightY + 200) {
          isLeftColumn = false;
        } else if (!isLeftColumn && rightY > 900) {
          // If right column is full, start new page
          pdf.addPage();
          addSlideHeader(title + ' (continued)', sections);
          leftY = 180;
          rightY = 180;
          isLeftColumn = true;
        } else {
          // Alternate between columns
          isLeftColumn = !isLeftColumn;
        }
      });
      
      return Math.max(leftY, rightY);
    };

    console.log('Starting cover page generation');

    // Cover Page
    // Clean white background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 1920, 1080, 'F');

    // Center point for vertical positioning
    const centerY = 1080 / 2;
    const spacing = 80; // Spacing between elements

    // Company name (smaller and above title)
    pdf.setFontSize(36);
    pdf.setTextColor(100, 100, 100); // Subtle gray
    const companyName = formData.companyProfile.companyName || 'Company Name';
    const companyNameWidth = pdf.getTextWidth(companyName);
    pdf.text(companyName, (1920 - companyNameWidth) / 2, centerY - spacing * 2);

    // Title (large and bold)
    pdf.setFontSize(72);
    pdf.setTextColor(40, 40, 40); // Dark gray for contrast
    const title = formData.companyProfile.reportTitle || 'Sustainability Report';
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (1920 - titleWidth) / 2, centerY);

    // Add subtle decorative line
    const lineWidth = Math.min(600, titleWidth + 200); // Line slightly wider than title
    pdf.setDrawColor(200, 200, 200); // Light gray
    pdf.setLineWidth(2);
    const lineY = centerY + spacing / 2;
    pdf.line((1920 - lineWidth) / 2, lineY, (1920 + lineWidth) / 2, lineY);

    // Date (below the line)
    pdf.setFontSize(28);
    pdf.setTextColor(120, 120, 120); // Medium gray
    const date = formData.companyProfile.reportDate || new Date().toISOString().split('T')[0];
    const dateWidth = pdf.getTextWidth(date);
    pdf.text(date, (1920 - dateWidth) / 2, centerY + spacing * 1.5);

    // Add logo if available
    if (formData.companyProfile.companyLogo) {
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = () => {
          const logoData = reader.result as string;
          // Position logo above company name
          const logoSize = 200;
          const logoX = (1920 - logoSize) / 2;
          const logoY = centerY - spacing * 5;
          pdf.addImage(logoData, 'JPEG', logoX, logoY, logoSize, logoSize);
          resolve(undefined);
        };
        reader.onerror = (error) => {
          console.error('Error reading logo:', error);
          resolve(undefined);
        };
        if (formData.companyProfile.companyLogo) {
          reader.readAsDataURL(formData.companyProfile.companyLogo);
        }
      });
    }

    // Add subtle footer text
    pdf.setFontSize(16);
    pdf.setTextColor(150, 150, 150); // Very light gray
    const footerText = 'CONFIDENTIAL';
    const footerWidth = pdf.getTextWidth(footerText);
    pdf.text(footerText, (1920 - footerWidth) / 2, 1000);

    // Table of Contents
    pdf.addPage();

    const sections = [
      { title: 'Introduction', content: formData.sustainabilityData.introduction, layout: 'single-column', pageNumber: 0 },
      { title: 'Management Role', content: formData.sustainabilityData.managementRole, layout: 'single-column', pageNumber: 1 },
      { title: 'Organizational Structure', content: formData.sustainabilityData.organizationalStructure, layout: 'single-column', pageNumber: 2 },
      { title: 'Sustainability Targets', content: formData.sustainabilityData.sustainabilityTargets, layout: 'two-column', pageNumber: 3 },
      { title: 'Strategic Initiatives', content: formData.sustainabilityData.strategicInitiatives, layout: 'two-column', pageNumber: 4 },
      { title: 'Performance Trends', content: formData.sustainabilityData.performanceTrends, layout: 'two-column', pageNumber: 5 },
      { title: 'Summary', content: formData.sustainabilityData.summary, layout: 'single-column', pageNumber: 6 }
    ];

    addSlideHeader('Table of Contents', sections);

    // Add TOC entries with internal links
    let tocY = 200;
    
    // First pass: find the longest title + dots combination to align page numbers
    const pageNumX = 1800; // Fixed position for all page numbers
    
    sections.forEach((section, index) => {
      const pageNum = index + 1;
      
      pdf.setFontSize(32);
      pdf.setTextColor(80, 80, 80);
      const sectionTitle = section.title;
      const pageNumText = pageNum.toString();
      const titleWidth = pdf.getTextWidth(sectionTitle);
      const pageNumWidth = pdf.getTextWidth(pageNumText);
      
      // Calculate dots with much denser spacing
      const dotsWidth = pageNumX - (80 + titleWidth + 20) - pageNumWidth - 10; // Space from title end to page number
      const singleDotWidth = pdf.getTextWidth('.');
      const numberOfDots = Math.floor(dotsWidth / (singleDotWidth + 0.1)); // Very tight spacing
      
      // Create dots with minimal spacing
      const dots = Array(numberOfDots).fill('.').join('');
      
      // Position elements with precise spacing
      const titleX = 80;
      const dotsX = titleX + titleWidth + 10;
      
      // Create clickable link for the entire line
      pdf.link(titleX, tocY - 20, 1720, 30, { pageNumber: pageNum + 2 });
      
      // Render the elements
      pdf.text(sectionTitle, titleX, tocY);
      pdf.text(dots, dotsX, tocY);
      pdf.text(pageNumText, pageNumX, tocY);
      
      tocY += 60;
    });

    // Content pages
    sections.forEach((section, index) => {
      pdf.addPage();
      addSlideHeader(section.title, sections);
      addPageNumber(index + 1);
      
      if (section.layout === "two-column") {
        addTwoColumnContent(section.title, section.content, 180);
      } else {
        // Single column layout
        let yPosition = 180;
        const paragraphs = (section.content || '').split('\n').filter(p => p.trim());
        let continuedPages = 0;
        
        paragraphs.forEach(paragraph => {
          if (yPosition > 900) {
            pdf.addPage();
            addSlideHeader(section.title + ' (continued)', sections);
            addPageNumber(index + 1 + ++continuedPages);
            yPosition = 180;
          }

          if (paragraph.trim().startsWith('•')) {
            yPosition = addWrappedText(paragraph, 120, yPosition, 1680, 28, true);
            yPosition += 20;
          } else if (paragraph.match(/^\d+\./)) {
            yPosition = addWrappedText(paragraph, 80, yPosition, 1720, 32, true);
            yPosition += 20;
          } else {
            yPosition = addWrappedText(paragraph, 80, yPosition, 1720, 32);
            yPosition += 40;
          }
        });
      }
    });

    // Generate blob URL
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    console.log('PDF generation completed, URL created:', url);
    return url;
  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error details:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack
    });
    throw new Error('Failed to generate PDF: ' + (error as Error).message);
  }
}; 