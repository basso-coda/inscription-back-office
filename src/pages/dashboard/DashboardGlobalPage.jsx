import React, { useCallback, useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import fetchApi from '../../helpers/fetchApi';
import DashboardSkeletons from '@/components/skeletons/DashboardSkeletons';

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
    const [allCount, setAllCount] = useState(null);

    // const getAllCounts = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const { data } = await fetchApi('/dashboard_count')
    //         setAllCount(data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // })

    useEffect(() => {
        document.title = "Dashboard - Vue d'ensemble"
    }, [])

    // useEffect(() => {
    //     getAllCounts()
    // }, [])

    return (
        <div className="px-4 py-3 main_content">
            {loading
                ? <DashboardSkeletons />
                : <>
                    <div className="row">
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Total des lapins</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{allCount?.totalLapins}</p> */}
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Total des partenaires</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{allCount?.totalPartenaire}</p> */}
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Total des articles</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{allCount?.totalArticle}</p> */}
                            </Card>
                        </div>
                        <div className="col-md-3">
                            <Card style={cardStyle}>
                                <h3 style={{ fontSize: '16px', margin: '8px 0' }}>Total des employés</h3>
                                {/* <p style={{ fontSize: '12px', margin: '0' }}>{allCount?.totalEmployees}</p> */}
                            </Card>
                        </div>
                    </div>

                    {/* <StatusEmployees /> */}
                    {/* <StatusLapin/> */}
                </>}
        </div>
    );
}

export default DashboardGlobalPage;