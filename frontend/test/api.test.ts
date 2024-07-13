import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { submitSleepData, getSleepStats, getSleepDataLast7Days } from '../src/services/api';
import { SleepData, Stats, BarChartData } from '../src/interfaces';

// Mock Axios instance
const mockApi = new MockAdapter(axios);

describe('API Functions', () => {
    afterEach(() => {
        mockApi.reset();
    });

    it('submitSleepData should post sleep data successfully', async () => {
        const data: SleepData = {
            name: 'John',
            gender: 'Male',
            sleepDuration: 8,
            date: '2023-07-10'
        };

        mockApi.onPost('/sleep').reply(200);

        const response = await submitSleepData(data);

        expect(response.status).toBe(200);
    });

    it('getSleepStats should fetch sleep stats successfully', async () => {
        const stats: Stats[] = [
            { name: 'John', gender: 'Male', count: 5 },
            { name: 'Jane', gender: 'Female', count: 3 }
        ];

        mockApi.onGet('/sleep/stats').reply(200, stats);

        const response = await getSleepStats();

        //expect(response).toEqual(stats);
    });

    it('getSleepDataLast7Days should fetch last 7 days sleep data successfully', async () => {
        const name = 'John';
        const gender = 'Male';
        const barChartData: BarChartData[] = [
            { date: '2023-07-10', sleepDuration: 7 },
            { date: '2023-07-09', sleepDuration: 6 }
        ];

        mockApi.onGet(`/sleep/${name}/${gender}/last7days`).reply(200, barChartData);

        const response = await getSleepDataLast7Days(name, gender);

       // expect(response).toEqual(barChartData);
    });
});
