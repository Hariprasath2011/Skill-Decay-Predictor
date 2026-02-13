import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SkillHistoryChart = ({ history, skillName }) => {
    if (!history || history.length === 0) return <p>No history available.</p>;

    const data = {
        labels: history.map(h => h.date),
        datasets: [
            {
                label: 'Proficiency Level',
                data: history.map(h => h.proficiencyLevel),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Decay Score',
                data: history.map(h => h.decayScore),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: `${skillName} - History`,
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                min: 0,
                max: 5,
                title: { display: true, text: 'Proficiency' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                min: 0,
                max: 15, // Assuming decay score max is somewhat open, but 10 triggers revision
                title: { display: true, text: 'Decay Score' }
            },
        },
    };

    return <Line options={options} data={data} style={{ background: 'white', padding: '10px', borderRadius: '8px' }} />;
};

export default SkillHistoryChart;
