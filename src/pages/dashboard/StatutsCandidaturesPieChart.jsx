import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import fetchApi from "@/helpers/fetchApi";

const StatutsCandidaturesPieChart = () => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetchApi('/dashboard-statuts-candidatures');
            if (response) {
                const formattedData = [
                    { name: 'Reçue', y: response.recues },
                    { name: 'En cours', y: response.en_cours },
                    { name: 'Approuvée', y: response.approuvees },
                    { name: 'Payée', y: response.payees },
                    { name: 'Refusée', y: response.refusees }
                ];
                setChartData(formattedData);
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
            type: 'pie'
        },
        title: {
            text: 'Répartition des candidatures par statut'
        },
        series: [{
            name: 'Nombre',
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

export default StatutsCandidaturesPieChart;
