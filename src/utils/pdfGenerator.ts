import jsPDF from 'jspdf';
import { FormState } from '../types/form';

export const generatePDF = async (formData: FormState): Promise<string> => {
  try {
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
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number) => {
      pdf.setFontSize(fontSize);
      const lines = pdf.splitTextToSize(text || '', maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * (fontSize * 1.5));
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

    // Cover Page
    // Add subtle background
    pdf.setFillColor(250, 250, 250); // Very light gray for base
    pdf.rect(0, 0, 1920, 1080, 'F');
    pdf.setFillColor(240, 240, 240); // Slightly darker for top section
    pdf.rect(0, 0, 1920, 400, 'F');

    // Title
    pdf.setFontSize(64);
    pdf.setTextColor(50, 50, 50); // Dark gray for text
    const title = formData.companyProfile.reportTitle;
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (1920 - titleWidth) / 2, 300);

    // Company name
    pdf.setFontSize(40);
    pdf.setTextColor(80, 80, 80);
    const companyName = formData.companyProfile.companyName;
    const companyNameWidth = pdf.getTextWidth(companyName);
    pdf.text(companyName, (1920 - companyNameWidth) / 2, 400);

    // Date
    pdf.setFontSize(32);
    const date = formData.companyProfile.reportDate;
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
        if (formData.companyProfile.companyLogo) {
          reader.readAsDataURL(formData.companyProfile.companyLogo);
        }
      });
    }

    // Table of Contents
    pdf.addPage();
    addSlideHeader('Table of Contents');

    const sections = [
      { title: 'Introduction', content: formData.sustainabilityData.introduction },
      { title: 'Management Role', content: formData.sustainabilityData.managementRole },
      { title: 'Organizational Structure', content: formData.sustainabilityData.organizationalStructure },
      { title: 'Sustainability Targets', content: formData.sustainabilityData.sustainabilityTargets },
      { title: 'Strategic Initiatives', content: formData.sustainabilityData.strategicInitiatives },
      { title: 'Performance Trends', content: formData.sustainabilityData.performanceTrends },
      { title: 'Summary', content: formData.sustainabilityData.summary }
    ];

    // Add TOC entries
    let tocY = 200;
    sections.forEach((section, index) => {
      const pageNum = index + 3;
      
      // Add dot leaders between title and page number
      pdf.setFontSize(32);
      pdf.setTextColor(80, 80, 80);
      const title = section.title;
      const pageNumText = pageNum.toString();
      const titleWidth = pdf.getTextWidth(title);
      const pageNumWidth = pdf.getTextWidth(pageNumText);
      const dotsWidth = 1600 - titleWidth - pageNumWidth - 160;
      const dots = '.'.repeat(Math.floor(dotsWidth / pdf.getTextWidth('.')));
      
      pdf.text(title, 80, tocY);
      pdf.text(dots, 80 + titleWidth + 20, tocY);
      pdf.text(pageNumText, 1840 - pageNumWidth, tocY);
      
      tocY += 60;
    });

    // Content pages
    sections.forEach((section) => {
      pdf.addPage();
      addSlideHeader(section.title);
      
      // Section content
      let yPosition = 180;
      const paragraphs = section.content.split('\n').filter(p => p.trim());
      
      paragraphs.forEach(paragraph => {
        if (yPosition > 900) {
          pdf.addPage();
          addSlideHeader(section.title + ' (continued)');
          yPosition = 180;
        }

        // Check if paragraph is a bullet point
        if (paragraph.trim().startsWith('•')) {
          // Indent bullet points
          yPosition = addWrappedText(paragraph, 120, yPosition, 1680, 28);
        } else if (paragraph.match(/^\d+\./)) {
          // Numbered points (slightly larger)
          yPosition = addWrappedText(paragraph, 80, yPosition, 1720, 32);
        } else {
          // Regular paragraphs
          yPosition = addWrappedText(paragraph, 80, yPosition, 1720, 32);
        }
        
        yPosition += 40; // Space between paragraphs
      });
    });

    // Generate blob URL
    const pdfBlob = pdf.output('blob');
    return URL.createObjectURL(pdfBlob);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF: ' + (error as Error).message);
  }
}; 