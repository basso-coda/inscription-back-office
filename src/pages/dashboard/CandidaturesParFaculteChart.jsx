import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import fetchApi from "@/helpers/fetchApi";

const CandidaturesParFaculteChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchApi('/dashboard-candidatures-par-faculte');
            
            if (Array.isArray(response)) {
                const formattedData = response.map(item => ({
                    name: item.faculte,
                    y: item.total
                }));
                setChartData(formattedData);
            } else {
                console.warn('Données inattendues :', response);
            }
            

        } catch (error) {
            console.error("Erreur de chargement des données: ", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nombre de candidatures par faculté'
        },
        xAxis: {
            type: 'category',
            title: {
                text: 'Faculté'
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Nombre de candidatures'
            }
        },
        tooltip: {
            pointFormat: 'Total: <b>{point.y}</b>'
        },
        series: [{
            name: 'Candidatures',
            colorByPoint: true,
            data: chartData
        }]
    };

    return (
        <div className='mt-4'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <HighchartsReact highcharts={Highcharts} options={options} />
            )}
        </div>
    );
};

export default CandidaturesParFaculteChart;
