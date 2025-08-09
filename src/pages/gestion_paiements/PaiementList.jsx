import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Image } from "primereact/image";
import { useApp } from "@/hooks/useApp";
import fetchApi from "@/helpers/fetchApi";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { InputSwitch } from "primereact/inputswitch";
import Loading from "@/components/app/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "primereact/badge";
import { paiements_routes_items } from "@/routes/gestion_paiements/paiements_routes";

export default function PaiementList() {

    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(1);
    const [paiements, setPaiements] = useState([]);
    const [inViewMenuItem, setInViewMenuItem] = useState(null);

    // utilisateur connecté
    const { user } = useAuth()

    const menu = useRef(null);

    const { setBreadCrumbAction } = useApp()

    const navigate = useNavigate();

    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        search: "",
    });

    const onPage = (event) => {
        setlazyState(event);
    };

    const onSort = (event) => {
        setlazyState(event);
    };

    const onFilter = (event) => {
        event["first"] = 0;
        setlazyState(event);
    };

    const fetchPaiements = useCallback(async () => {
        try {
        setLoading(true)
        const baseurl = `/paiements?`
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

        const { data } = await fetchApi(url);
        const list = data.rows;

        setPaiements(list);
        setTotalRecords(list.length);
        } catch (response) {
        // console.log(response)

        } finally {
        setLoading(false);
        }
    }, [lazyState]);

    useEffect(() => {

        document.title = paiements_routes_items.paiements.name;

        setBreadCrumbAction([paiements_routes_items.paiements])

        return () => {
        setBreadCrumbAction([]);
        };
    }, []);

    useEffect(() => {
        fetchPaiements();
    }, [lazyState]);

    return (
        <>
        <ConfirmDialog closable dismissableMask={true} />

        {loading && <Loading />}

        <div className="px-4 py-3 main_content">
            <div className="d-flex align-items-center justify-content-between">
            <h2 className="mb-3">Paiements</h2>
            </div>

            <div className="shadow my-2 bg-white p-3 rounded d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <div className="p-input-icon-left">

                <i className="pi pi-search ml-2" />

                <InputText
                    type="search"
                    placeholder="Recherche"
                    className="p-inputtext-sm"
                    style={{ minWidth: 250, textIndent: '20px' }}
                    onInput={(e) =>
                    setlazyState((s) => ({ ...s, search: e.target.value }))
                    }
                />
                </div>
            </div>
            </div>

            <div className="content">
            <div className="shadow rounded mt-3 pr-1 bg-white">
                <DataTable
                lazy
                value={paiements}
                tableStyle={{ minWidth: "50rem" }}
                className=""
                paginator
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
                emptyMessage="Aucun etudiant trouvée"
                first={lazyState.first}
                rows={lazyState.rows}
                totalRecords={totalRecords}
                onPage={onPage}
                onSort={onSort}
                sortField={lazyState.sortField}
                sortOrder={lazyState.sortOrder}
                onFilter={onFilter}
                filters={lazyState.filters}
                loading={loading}
                reorderableColumns
                resizableColumns
                columnResizeMode="expand"
                paginatorClassName="rounded"
                scrollable
                >
                    <Column
                        selectionMode="multiple"
                        frozen
                        headerStyle={{ width: "3rem" }}
                    />
                    <Column
                        field="NOM"
                        frozen
                        header="Nom et prenom"
                        sortable
                        body={(item) => {
                        return (
                            <span>
                                {item?.candidature?.NOM} {item?.candidature?.PRENOM}
                            </span>
                        );
                        }}
                    />
                    <Column
                        field="TYPE_PAIEMENT"
                        frozen
                        header="Description"
                        sortable
                        body={(item) => {
                        return (
                            <span>
                                {item?.type_paiement?.DESCRIPTION}
                            </span>
                        );
                        }}
                    />
                    <Column
                        field="MONTANT"
                        frozen
                        header="Montant"
                        sortable
                        body={(item) => {
                        return (
                            <span>
                                {item?.MONTANT} Fbu
                            </span>
                        );
                        }}
                    />
                    <Column
                        field="CLASSE_ID"
                        header="Classe"
                        sortable
                        body={(item) => {
                            return (
                                <span>
                                    {item?.candidature?.classe?.DESCRIPTION}
                                </span>
                            )
                        }}
                    />
                    <Column
                        field="FACULTE_ID"
                        header="Faculté"
                        sortable
                        body={(item) => {
                            return (
                                <span>
                                    {item?.candidature?.classe?.departement?.DESCRIPTION}
                                </span>
                            )
                        }}
                    />
                    
                    {/* <Column
                        field=""
                        header="Actions"
                        alignFrozen="right"
                        frozen
                        body={(item) => {
                        let items = [
                            {
                            label: 'Plus de details',
                            items: [

                            ]
                            },
                        ];
                        return (
                            <>
                                <Menu model={items} onHide={() => setInViewMenuItem(null)} popup ref={menu} id="popup_menu_right" popupAlignment="right" />

                                <Button
                                    aria-label="Menu"
                                    size="small"
                                    label="Options"
                                    icon="pi pi-angle-down"
                                    iconPos="right"
                                    className="mx-1 p-1 bitwi-button rounded-button"
                                    onClick={(event) => {
                                    setInViewMenuItem(item);
                                    menu.current.toggle(event);
                                    }}
                                />
                            </>
                        );
                        }}
                    /> */}
                </DataTable>
            </div>
            </div>
        </div>
        <Outlet />
        </>
    );
}
