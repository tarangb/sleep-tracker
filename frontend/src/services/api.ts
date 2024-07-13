import axios from 'axios';
import { SleepData, Stats, BarChartData } from '../interfaces';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const submitSleepData = (data: SleepData) =>
    api.post('/sleep', data);

export const getSleepStats = async (): Promise<Stats[]> => {
    const response = await api.get('/sleep/stats');
    return response.data;
};

export const getSleepDataLast7Days = async (name: string, gender: string): Promise<BarChartData[]> => {
    const response = await api.get(`/sleep/${name}/${gender}/last`);
    return response.data;
};
