// Mock data for AgroSense application

export interface Disease {
  id: string;
  name: string;
  probability: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
}

export interface Treatment {
  id: string;
  name: string;
  type: 'Natural' | 'Chemical' | 'Cultural';
  description: string;
  dosage: string;
  frequency: string;
  imageUrl: string;
  ecoFriendly: boolean;
}

export interface DiagnosisHistory {
  id: string;
  plantName: string;
  location: string;
  disease: string;
  severity: 'Low' | 'Medium' | 'High';
  date: string;
  status: 'Treated' | 'In Progress' | 'Pending';
  beforeImage: string;
  afterImage?: string;
}

export interface WeatherData {
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    wind: number;
    icon: string;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    icon: string;
  }>;
  daily: Array<{
    day: string;
    icon: string;
    high: number;
    low: number;
  }>;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger';
  title: string;
  description: string;
  icon: string;
  action: string;
}

export const mockDiseases: Disease[] = [
  {
    id: '1',
    name: 'Tomato Late Blight',
    probability: 95,
    severity: 'High',
    description: 'A serious fungal disease that affects tomato plants, causing dark lesions on leaves and fruit.',
  },
  {
    id: '2',
    name: 'Septoria Leaf Spot',
    probability: 3,
    severity: 'Medium',
    description: 'A fungal disease characterized by small, circular spots with gray centers.',
  },
  {
    id: '3',
    name: 'Early Blight',
    probability: 2,
    severity: 'Medium',
    description: 'Causes dark spots with concentric rings on older leaves.',
  },
];

export const mockTreatments: Treatment[] = [
  {
    id: '1',
    name: 'Neem Oil Spray',
    type: 'Natural',
    description: 'A natural pesticide and fungicide.',
    dosage: '10ml per liter of water',
    frequency: 'Apply every 7-14 days',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    ecoFriendly: true,
  },
  {
    id: '2',
    name: 'Fungicide X',
    type: 'Chemical',
    description: 'A chemical fungicide for broad-spectrum disease control.',
    dosage: '5ml per liter of water',
    frequency: 'Apply every 14 days',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    ecoFriendly: false,
  },
  {
    id: '3',
    name: 'Crop Rotation',
    type: 'Cultural',
    description: 'A cultural practice to disrupt disease cycles.',
    dosage: 'N/A',
    frequency: 'Rotate with non-susceptible crops every 2-3 years',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    ecoFriendly: true,
  },
  {
    id: '4',
    name: 'Copper Fungicide',
    type: 'Chemical',
    description: 'Effective against bacterial and fungal diseases.',
    dosage: '3ml per liter of water',
    frequency: 'Apply every 10 days',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    ecoFriendly: false,
  },
];

export const mockDiagnosisHistory: DiagnosisHistory[] = [
  {
    id: '1',
    plantName: 'Tomato Plant',
    location: 'Row 5',
    disease: 'Early Blight',
    severity: 'High',
    date: 'Oct 26, 2023',
    status: 'Treated',
    beforeImage: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400',
    afterImage: 'https://images.unsplash.com/photo-1606588285270-8e82d78465c6?w=400',
  },
  {
    id: '2',
    plantName: 'Corn Plant',
    location: 'Plot B',
    disease: 'Northern Leaf Blight',
    severity: 'Medium',
    date: 'Nov 02, 2023',
    status: 'In Progress',
    beforeImage: 'https://images.unsplash.com/photo-1551893478-d726a8a6b0d8?w=400',
  },
  {
    id: '3',
    plantName: 'Potato Plant',
    location: 'Field A',
    disease: 'Late Blight',
    severity: 'High',
    date: 'Oct 20, 2023',
    status: 'Treated',
    beforeImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    afterImage: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=400',
  },
];

export const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: 'Sunny',
    humidity: 55,
    wind: 8,
    icon: 'sunny',
  },
  hourly: [
    { time: 'Now', temperature: 28, icon: 'sunny' },
    { time: '3 PM', temperature: 27, icon: 'sunny' },
    { time: '6 PM', temperature: 25, icon: 'partly-cloudy' },
    { time: '9 PM', temperature: 22, icon: 'cloudy' },
    { time: '12 AM', temperature: 20, icon: 'rainy' },
  ],
  daily: [
    { day: 'Today', icon: 'sunny', high: 28, low: 18 },
    { day: 'Mon', icon: 'cloudy', high: 26, low: 17 },
    { day: 'Tue', icon: 'rainy', high: 24, low: 16 },
    { day: 'Wed', icon: 'sunny', high: 27, low: 19 },
    { day: 'Thu', icon: 'partly-cloudy', high: 25, low: 18 },
  ],
};

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High Risk of Fungal Infection',
    description:
      'High humidity and warm temperatures increase the risk of powdery mildew. Monitor your crops closely.',
    icon: 'warning',
    action: 'View Treatment',
  },
  {
    id: '2',
    type: 'danger',
    title: 'Pest Alert: Aphids',
    description:
      'Conditions are favorable for aphid populations to increase. Check the undersides of leaves.',
    icon: 'bug',
    action: 'Learn More',
  },
];

export const mockStats = {
  totalDiagnoses: 24,
  healthyPlants: 18,
  diseasedPlants: 6,
  healthPercentage: 75,
  healthTrend: '+3%',
};
