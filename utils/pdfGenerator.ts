import jsPDF from 'jspdf';

interface ConversationReport {
  id: number;
  uuid: string;
  mainInterest: string;
  livableCity: string;
  notes: string;
  topicDetails: any;
  districts: string[];
  selectedInitiatives: string[];
  interestAreas: string[];
  observerReflection: string;
  surprise: string;
  numPeople: number;
  duration: number;
  location: string;
  isAnonymous: boolean;
  shareContact: boolean;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  contactInfo?: string;
  phone?: string;
}

export const generateConversationReport = (conversation: ConversationReport): void => {
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('KLIMANEUSTART BCC', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(16);
  doc.text('Dialogue Report', 20, yPosition);
  yPosition += 20;
  
  // Basic Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const addField = (label: string, value: string | number | boolean) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 20, yPosition);
    doc.setFont('helvetica', 'normal');
    const text = String(value || 'Not provided');
    const lines = doc.splitTextToSize(text, 150);
    doc.text(lines, 70, yPosition);
    yPosition += lines.length * 5 + 3;
  };
  
  addField('Report ID', conversation.uuid);
  addField('Created', new Date(conversation.createdAt).toLocaleString('de-DE'));
  addField('Anonymous', conversation.isAnonymous ? 'Yes' : 'No');
  
  if (!conversation.isAnonymous) {
    addField('Name', `${conversation.firstName || ''} ${conversation.lastName || ''}`.trim());
    addField('Contact', conversation.contactInfo || '');
    addField('Phone', conversation.phone || '');
  }
  
  yPosition += 5;
  
  // Dialogue Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Dialogue Details', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  addField('Main Interest', conversation.mainInterest);
  addField('Livable City Vision', conversation.livableCity);
  addField('Notes', conversation.notes);
  addField('Districts', conversation.districts.join(', '));
  addField('Selected Initiatives', conversation.selectedInitiatives.join(', '));
  addField('Interest Areas', conversation.interestAreas.join(', '));
  
  // Topic Details
  if (conversation.topicDetails && Object.keys(conversation.topicDetails).length > 0) {
    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Topic Details', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    Object.entries(conversation.topicDetails).forEach(([topic, details]: [string, any]) => {
      addField('Topic', topic);
      if (details.customNote) {
        addField('Note', details.customNote);
      }
      Object.entries(details).forEach(([key, value]: [string, any]) => {
        if (key !== 'customNote' && value.selectedOptions) {
          addField(`${key} - Selected`, value.selectedOptions.join(', '));
          if (value.customNote) {
            addField(`${key} - Note`, value.customNote);
          }
        }
      });
    });
  }
  
  // Reflection
  yPosition += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Reflection', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  addField('Observer Reflection', conversation.observerReflection);
  addField('Surprise/Insight', conversation.surprise);
  addField('Number of People', conversation.numPeople);
  addField('Duration (minutes)', conversation.duration);
  addField('Location', conversation.location);
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${i} of ${pageCount}`, 20, 290);
    doc.text(`Generated: ${new Date().toLocaleString('de-DE')}`, 150, 290);
  }
  
  // Save the PDF
  const fileName = `klimaneustart-report-${conversation.uuid.slice(0, 8)}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};

export const generateAnalyticsReport = (analyticsData: any): void => {
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('KLIMANEUSTART BCC', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(16);
  doc.text('Analytics Report', 20, yPosition);
  yPosition += 20;
  
  // Summary Stats
  doc.setFontSize(14);
  doc.text('Summary Statistics', 20, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  const addStat = (label: string, value: string | number) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), 80, yPosition);
    yPosition += 8;
  };
  
  addStat('Total Dialogues', analyticsData.totalDialogues);
  addStat('Total Participants', analyticsData.totalParticipants);
  addStat('Average Duration', `${analyticsData.avgDuration} minutes`);
  
  yPosition += 10;
  
  // Charts data as tables
  const addTable = (title: string, data: Array<{name: string, value: number}>) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(title, 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.text('Item', 20, yPosition);
    doc.text('Count', 150, yPosition);
    yPosition += 5;
    
    doc.setFont('helvetica', 'normal');
    data.forEach(item => {
      doc.text(item.name, 20, yPosition);
      doc.text(String(item.value), 150, yPosition);
      yPosition += 5;
    });
    yPosition += 10;
  };
  
  if (analyticsData.dialoguesByDistrict?.length > 0) {
    addTable('Dialogues by District', analyticsData.dialoguesByDistrict);
  }
  
  if (analyticsData.topTopics?.length > 0) {
    addTable('Top Topics', analyticsData.topTopics);
  }
  
  if (analyticsData.topInterestAreas?.length > 0) {
    addTable('Top Interest Areas', analyticsData.topInterestAreas);
  }
  
  // Footer
  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleString('de-DE')}`, 20, 290);
  
  const fileName = `klimaneustart-analytics-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};