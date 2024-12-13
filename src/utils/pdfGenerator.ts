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
    const addSlideHeader = (title: string) => {
      // Add header background
      pdf.setFillColor(70, 70, 70); // Neutral dark gray
      pdf.rect(0, 0, 1920, 120, 'F');
      
      // Add title
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(44);
      pdf.text(title, 80, 80);
      
      // Reset text color
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
          addSlideHeader(title + ' (continued)');
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
          addSlideHeader(title + ' (continued)');
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
    // Add subtle background
    pdf.setFillColor(250, 250, 250); // Very light gray for base
    pdf.rect(0, 0, 1920, 1080, 'F');
    pdf.setFillColor(240, 240, 240); // Slightly darker for top section
    pdf.rect(0, 0, 1920, 400, 'F');

    // Title
    pdf.setFontSize(64);
    pdf.setTextColor(50, 50, 50); // Dark gray for text
    const title = formData.companyProfile.reportTitle || 'Sustainability Report';
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (1920 - titleWidth) / 2, 300);

    // Company name
    pdf.setFontSize(40);
    pdf.setTextColor(80, 80, 80);
    const companyName = formData.companyProfile.companyName || 'Company Name';
    const companyNameWidth = pdf.getTextWidth(companyName);
    pdf.text(companyName, (1920 - companyNameWidth) / 2, 400);

    // Date
    pdf.setFontSize(32);
    const date = formData.companyProfile.reportDate || new Date().toISOString().split('T')[0];
    const dateWidth = pdf.getTextWidth(date);
    pdf.text(date, (1920 - dateWidth) / 2, 480);

    // Add logo if available
    if (formData.companyProfile.companyLogo) {
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = () => {
          const logoData = reader.result as string;
          pdf.addImage(logoData, 'JPEG', (1920 - 300) / 2, 580, 300, 300);
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

    // Table of Contents
    pdf.addPage();
    addSlideHeader('Table of Contents');

    const sections = [
      { title: 'Introduction', content: formData.sustainabilityData.introduction, layout: 'single-column' },
      { title: 'Management Role', content: formData.sustainabilityData.managementRole, layout: 'single-column' },
      { title: 'Organizational Structure', content: formData.sustainabilityData.organizationalStructure, layout: 'single-column' },
      { title: 'Sustainability Targets', content: formData.sustainabilityData.sustainabilityTargets, layout: 'two-column' },
      { title: 'Strategic Initiatives', content: formData.sustainabilityData.strategicInitiatives, layout: 'two-column' },
      { title: 'Performance Trends', content: formData.sustainabilityData.performanceTrends, layout: 'two-column' },
      { title: 'Summary', content: formData.sustainabilityData.summary, layout: 'single-column' }
    ];

    // Add TOC entries with internal links
    let tocY = 200;
    sections.forEach((section, index) => {
      const pageNum = index + 3; // Starting from page 3 (after cover and TOC)
      
      pdf.setFontSize(32);
      pdf.setTextColor(80, 80, 80);
      const sectionTitle = section.title;
      const pageNumText = pageNum.toString();
      const titleWidth = pdf.getTextWidth(sectionTitle);
      const pageNumWidth = pdf.getTextWidth(pageNumText);
      const dotsWidth = 1600 - titleWidth - pageNumWidth - 160;
      const dots = '.'.repeat(Math.floor(dotsWidth / pdf.getTextWidth('.')));
      
      // Create clickable link for the title and page number
      pdf.link(80, tocY - 20, 1760, 30, { pageNumber: pageNum });
      pdf.text(sectionTitle, 80, tocY);
      pdf.text(dots, 80 + titleWidth + 20, tocY);
      pdf.text(pageNumText, 1840 - pageNumWidth, tocY);
      
      tocY += 60;
    });

    // Content pages
    sections.forEach((section) => {
      pdf.addPage();
      addSlideHeader(section.title);
      
      if (section.layout === 'two-column') {
        addTwoColumnContent(section.title, section.content, 180);
      } else {
        // Single column layout
        let yPosition = 180;
        const paragraphs = (section.content || '').split('\n').filter(p => p.trim());
        
        paragraphs.forEach(paragraph => {
          if (yPosition > 900) {
            pdf.addPage();
            addSlideHeader(section.title + ' (continued)');
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