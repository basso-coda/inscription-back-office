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
import { candidatures_routes_items } from "@/routes/gestion_candidatures/candidatures_routes";

export default function CandidaturesListPage() {

  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1);
  const [candidatures, setCandidatures] = useState([]);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [visible, setVisible] = useState(false)

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

  const handleActiverUtilisateur = (e, item) => {
    if (!inViewMenuItem) {
      setInViewMenuItem(item)
    }

    setVisible(true)
  };

  const fetchCandidatures = useCallback(async () => {
    try {
      setLoading(true)
      const baseurl = `/candidatures?`
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

      setCandidatures(list);
      setTotalRecords(list.length);
    } catch (response) {
      // console.log(response)

    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {

    document.title = candidatures_routes_items.candidatures.name;

    setBreadCrumbAction([candidatures_routes_items.candidatures])

    return () => {
      setBreadCrumbAction([]);
    };
  }, []);

  useEffect(() => {
    fetchCandidatures();
  }, [lazyState]);

  return (
    <>
      <ConfirmDialog closable dismissableMask={true} />

      {/* {visible && <UtilisateurActivationDialog
        visible={visible}
        data={inViewMenuItem}
        onHide={() => { setVisible(false); setInViewMenuItem(null) }}
        fetchUtilisateurs={fetchUtilisateurs}
      />} */}

      {loading && <Loading />}

      <div className="px-4 py-3 main_content">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="mb-3">Candidatures</h2>
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
              value={candidatures}
              tableStyle={{ minWidth: "50rem" }}
              className=""
              paginator
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate={`Affichage de {first} à {last} dans ${totalRecords} éléments`}
              emptyMessage="Aucune candidature trouvée"
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
                    // selectionMode="multiple"
                    frozen
                    headerStyle={{ width: "3rem" }}
                />
                <Column
                
                    frozen
                   header="Statut"
                    body={(item) => {
                      return (
                          <span>
                            {item.STATUT_CANDIDATURE=='1'?(<Badge value="Demande reçue" severity="secondary"></Badge>):null} 
                            {item.STATUT_CANDIDATURE=='2'?(<Badge value="Demande en cours de traitement" severity="info"></Badge>):null} 
                            {item.STATUT_CANDIDATURE=='3'?(<Badge value="Demande en attente de paiement" severity="warning"></Badge>):null}
                            {item.STATUT_CANDIDATURE=='4'?(<Badge value="Demande approuvée" severity="success"></Badge>):null}
                            {item.STATUT_CANDIDATURE=='5'?(<Badge value="Demande refusée" severity="danger"></Badge>):null} 
                          </span>
                      );
                      }}
                />
                <Column
                    field="NOM"
                    frozen
                    header="Nom et prenom"
                    sortable
                    body={(item) => {
                    return (
                        <span>
                        {item.NOM} {item.PRENOM}
                        </span>
                    );
                    }}
                />
                <Column
                    field="EMAIL_PRIVE"
                    header="Email privé"
                    sortable
                />
                <Column
                    field="ANNEE_ACADEMIQUE"
                    header="Année académique"
                    sortable
                />
                <Column
                    field="CLASSE_ID"
                    header="Classe demandée"
                    sortable
                    body={(item) => {
                        return (
                            <span>
                                {item?.classe?.DESCRIPTION}
                            </span>
                        )
                    }}
                />
                <Column
                    field="DATE_INSERTION"
                    header="Date de soumission"
                    sortable
                    body={(item) => {
                      return (
                          <span>
                            {item?.DATE_INSERTION ? (
                                new Intl.DateTimeFormat("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit"
                                }).format(new Date(item.DATE_INSERTION))
                            ) : (
                                "Date non disponible"  // Afficher un message alternatif si la date est invalide
                            )}
                          </span>
                      );
                    }}
                />
                
                <Column
                    field=""
                    header="Actions"
                    alignFrozen="right"
                    frozen
                    body={(item) => {
                    let items = [
                        {
                        label: 'Plus de details',
                        items: [
                        {
                            label: 'Détail',
                            icon: 'pi pi-eye',
                            template: item => (
                            <div className='p-menuitem-content px-3'>
                                <Link to={`/view-demande/${inViewMenuItem?.ID_CANDIDATURE}`} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
                                <span className={item.icon} />
                                <span className="mx-2">{item.label}</span>
                                </Link>
                            </div>
                            )
                        },
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
              />
            </DataTable>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
