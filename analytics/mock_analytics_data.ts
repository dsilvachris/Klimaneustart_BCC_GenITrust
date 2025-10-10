
export interface AnalyticsData {
    totalDialogues: number;
    totalParticipants: number;
    avgDuration: number;
    dialoguesByDistrict: { name: string; value: number }[];
    topTopics: { name: string; value: number }[];
    topInterestAreas: { name: string; value: number }[];
    initiativeEngagement: {
        recommended: number;
        selected: number;
    };
}

// Fetch data from PostgreSQL API
export const getAnalyticsData = async (): Promise<AnalyticsData> => {
    try {
        const response = await fetch('http://localhost:3001/api/v1/analytics');
        if (!response.ok) {
            throw new Error('Failed to fetch analytics data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to mock data if API fails
        return {
            totalDialogues: 0,
            totalParticipants: 0,
            avgDuration: 0,
            dialoguesByDistrict: [],
            topTopics: [],
            topInterestAreas: [],
            initiativeEngagement: {
                recommended: 0,
                selected: 0,
            }
        };
    }
};