import * as XLSX from 'xlsx';

interface ConversationData {
  id: number;
  uuid: string;
  main_interest: string;
  livable_city: string;
  notes: string;
  topic_details: any;
  districts: string[];
  selected_initiatives: string[];
  interest_areas: string[];
  observer_reflection: string;
  surprise: string;
  num_people: number;
  duration: number;
  location: string;
  is_anonymous: boolean;
  share_contact: boolean;
  created_at: string;
}

export const exportConversationsToExcel = (conversations: ConversationData[]): void => {
  const workbook = XLSX.utils.book_new();
  
  // Main conversations sheet
  const conversationsData = conversations.map(conv => ({
    'ID': conv.id,
    'UUID': conv.uuid,
    'Created At': new Date(conv.created_at).toLocaleString('de-DE'),
    'Anonymous': conv.is_anonymous ? 'Yes' : 'No',
    'Share Contact': conv.share_contact ? 'Yes' : 'No',
    'Main Interest': conv.main_interest || '',
    'Livable City': conv.livable_city || '',
    'Notes': conv.notes || '',
    'Districts': Array.isArray(conv.districts) ? conv.districts.join(', ') : '',
    'Selected Initiatives': Array.isArray(conv.selected_initiatives) ? conv.selected_initiatives.join(', ') : '',
    'Interest Areas': Array.isArray(conv.interest_areas) ? conv.interest_areas.join(', ') : '',
    'Observer Reflection': conv.observer_reflection || '',
    'Surprise': conv.surprise || '',
    'Number of People': conv.num_people || 0,
    'Duration (minutes)': conv.duration || 0,
    'Location': conv.location || '',
    'Topic Details': JSON.stringify(conv.topic_details || {})
  }));
  
  const conversationsSheet = XLSX.utils.json_to_sheet(conversationsData);
  XLSX.utils.book_append_sheet(workbook, conversationsSheet, 'Conversations');
  
  // Summary statistics sheet
  const totalConversations = conversations.length;
  const totalParticipants = conversations.reduce((sum, conv) => sum + (conv.num_people || 0), 0);
  const avgDuration = conversations.length > 0 
    ? Math.round(conversations.reduce((sum, conv) => sum + (conv.duration || 0), 0) / conversations.length)
    : 0;
  
  const summaryData = [
    { 'Metric': 'Total Conversations', 'Value': totalConversations },
    { 'Metric': 'Total Participants', 'Value': totalParticipants },
    { 'Metric': 'Average Duration (minutes)', 'Value': avgDuration },
    { 'Metric': 'Anonymous Conversations', 'Value': conversations.filter(c => c.is_anonymous).length },
    { 'Metric': 'Contact Shared', 'Value': conversations.filter(c => c.share_contact).length }
  ];
  
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  
  // Districts analysis sheet
  const districtsMap = new Map<string, number>();
  conversations.forEach(conv => {
    if (Array.isArray(conv.districts)) {
      conv.districts.forEach(district => {
        districtsMap.set(district, (districtsMap.get(district) || 0) + 1);
      });
    }
  });
  
  const districtsData = Array.from(districtsMap.entries()).map(([district, count]) => ({
    'District': district,
    'Count': count
  })).sort((a, b) => b.Count - a.Count);
  
  if (districtsData.length > 0) {
    const districtsSheet = XLSX.utils.json_to_sheet(districtsData);
    XLSX.utils.book_append_sheet(workbook, districtsSheet, 'Districts');
  }
  
  // Interest areas analysis sheet
  const interestMap = new Map<string, number>();
  conversations.forEach(conv => {
    if (Array.isArray(conv.interest_areas)) {
      conv.interest_areas.forEach(area => {
        interestMap.set(area, (interestMap.get(area) || 0) + 1);
      });
    }
  });
  
  const interestData = Array.from(interestMap.entries()).map(([area, count]) => ({
    'Interest Area': area,
    'Count': count
  })).sort((a, b) => b.Count - a.Count);
  
  if (interestData.length > 0) {
    const interestSheet = XLSX.utils.json_to_sheet(interestData);
    XLSX.utils.book_append_sheet(workbook, interestSheet, 'Interest Areas');
  }
  
  // Generate filename and save
  const fileName = `klimaneustart-conversations-${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportAnalyticsToExcel = (analyticsData: any): void => {
  const workbook = XLSX.utils.book_new();
  
  // Summary sheet
  const summaryData = [
    { 'Metric': 'Total Dialogues', 'Value': analyticsData.totalDialogues },
    { 'Metric': 'Total Participants', 'Value': analyticsData.totalParticipants },
    { 'Metric': 'Average Duration (minutes)', 'Value': analyticsData.avgDuration },
    { 'Metric': 'Initiatives Recommended', 'Value': analyticsData.initiativeEngagement?.recommended || 0 },
    { 'Metric': 'Initiatives Selected', 'Value': analyticsData.initiativeEngagement?.selected || 0 }
  ];
  
  const summarySheet = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
  
  // Districts sheet
  if (analyticsData.dialoguesByDistrict?.length > 0) {
    const districtsSheet = XLSX.utils.json_to_sheet(analyticsData.dialoguesByDistrict.map((item: any) => ({
      'District': item.name,
      'Count': item.value
    })));
    XLSX.utils.book_append_sheet(workbook, districtsSheet, 'Districts');
  }
  
  // Topics sheet
  if (analyticsData.topTopics?.length > 0) {
    const topicsSheet = XLSX.utils.json_to_sheet(analyticsData.topTopics.map((item: any) => ({
      'Topic': item.name,
      'Count': item.value
    })));
    XLSX.utils.book_append_sheet(workbook, topicsSheet, 'Topics');
  }
  
  // Interest Areas sheet
  if (analyticsData.topInterestAreas?.length > 0) {
    const interestSheet = XLSX.utils.json_to_sheet(analyticsData.topInterestAreas.map((item: any) => ({
      'Interest Area': item.name,
      'Count': item.value
    })));
    XLSX.utils.book_append_sheet(workbook, interestSheet, 'Interest Areas');
  }
  
  const fileName = `klimaneustart-analytics-${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};