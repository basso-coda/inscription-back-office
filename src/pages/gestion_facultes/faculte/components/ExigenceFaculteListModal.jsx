import { Link, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import fetchApi from "@/helpers/fetchApi";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Loading from "@/components/app/Loading";

export default function ExigenceFaculteListModal({ idFaculte }) {
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(1);
    const [exigenceFacultes, setExigenceFacultes] = useState([])
    const [globalLoading, setGloabalLoading] = useState(false)


    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
    });

    const fetchExigenceFacultes = useCallback(async () => {
        try {
            setLoading(true)
            const baseurl = `/exigences-facultes?faculte=${idFaculte}`
            
            var url = baseurl
            for (let key in lazyState) {
                const value = lazyState[key]
                if (value) {
                    if (typeof (value) == 'object') {
                        url += `${key}=${JSON.stringify(value)}&`
                    } else {
                        url += `${key}=${value}&`
                    }
                }
            }
            const res = await fetchApi(url)
            // console.log(res)
            setExigenceFacultes(res.exigence_facultes.rows)
            setTotalRecords(res.exigence_facultes.count)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [lazyState])

    useEffect(() => {
        fetchExigenceFacultes()
    }, [lazyState]);
    return (
        <>
            <ConfirmDialog closable dismissableMask={true} />
            {globalLoading && <Loading />}
            <div className="">
                
                {/* <div className="content">
                    <div className="shadow rounded mt-3 pr-1 bg-white"> */}
                        <DataTable
                           lazy
                           value={exigenceFacultes}
                           tableStyle={{ minWidth: "50rem" }}
                        //    paginator
                           rowsPerPageOptions={[5, 10, 25, 50]}
                           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                           currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
                           emptyMessage="Aucune exigence de faculté trouvé"
                           first={lazyState.first}
                           rows={lazyState.rows}
                           totalRecords={totalRecords}
                           onPage={(e) => {
                             console.log(e);
                             setLazyState(e);
                           }}
                           onSort={setLazyState}
                           sortField={lazyState.sortField}
                           sortOrder={lazyState.sortOrder}
                        //    onFilter={onFilter}
                           loading={loading}
                           reorderableColumns
                           resizableColumns
                           columnResizeMode="expand"
                           paginatorClassName="rounded"
                           scrollable
                        // size="normal"
                        >

                            <Column field="EXIGENCE_ID" frozen header="Exigence" body={item => {
                                return (
                                    <span>{item?.exigence?.DESCRIPTION}</span>
                                )
                            }} /> 
                            
                            
                        </DataTable>
                    {/* </div>
                </div> */}
            </div>
            <Outlet />
        </>
    )
}