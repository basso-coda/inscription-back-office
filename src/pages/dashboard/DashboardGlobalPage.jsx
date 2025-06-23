import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import fetchApi from '../../helpers/fetchApi';
import DashboardSkeletons from '@/components/skeletons/DashboardSkeletons';
import StatutsCandidaturesPieChart from './StatutsCandidaturesPieChart';
import CandidaturesParFaculteChart from './CandidaturesParFaculteChart';

const DashboardGlobalPage = () => {
    const cardStyle = {
        marginBottom: '15px',
        textAlign: 'center',
        width: '100%',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
        try {
            const res = await fetchApi('/dashboard-inscription');
            setStats(res);
        } catch (error) {
            console.error("Erreur lors du chargement des stats :", error);
        } finally {
            setLoading(false);
        }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        document.title = "Dashboard - Vue d'ensemble"
    }, [])

    return (
        <div className="px-4 py-3 main_content">
            {loading
                ? <DashboardSkeletons />
                : <>
                    <div className="row">
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Total des candidatures</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{stats?.total_candidatures}</p> */}
                                <p className="text-xl font-bold text-blue-600">{stats.total_candidatures}</p>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Etudiants inscrits</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{stats?.nombre_etudiants}</p> */}
                                <p className="text-xl font-bold text-green-600">{stats.nombre_etudiants}</p>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Paiements effectués</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{stats?.total_ayant_paye} paiements</p> */}
                                <p className="text-xl font-bold text-yellow-600">{stats.total_ayant_paye}</p>
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Montant total collecté</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{stats.montant_total_paye.toLocaleString() || 0} FBu</p> */}
                                <p className="text-lg font-semibold text-gray-700 mt-1">{stats.montant_total_paye.toLocaleString()} FBu</p>
                            </Card>
                        </div>
                    </div>


                    <StatutsCandidaturesPieChart />
                    <CandidaturesParFaculteChart />
                </>}
        </div>
    );
}

export default DashboardGlobalPage;