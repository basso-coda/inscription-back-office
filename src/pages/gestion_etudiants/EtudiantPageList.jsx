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
import { etudiants_routes_items } from "@/routes/gestion_etudiants/etudiants_routes";
import VoirCarteEtudiant from "./VoirCarteEtudiant";

export default function EtudiantPageList() {

  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(1);
  const [etudiants, setEtudiants] = useState([]);
  const [inViewMenuItem, setInViewMenuItem] = useState(null);
  const [visible, setVisible] = useState(false)
  const [dataEtudiant, setDataEtudiant] = useState()
  const [etudiantVisible, setEtudiantVisible] = useState(false)

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

  const VoirCard = (event) => {
    setDataEtudiant(event)
    setVisible(true)
  }

  const fetchEtudiants = useCallback(async () => {
    try {
      setLoading(true)
      const baseurl = `/etudiants?`
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

      setEtudiants(list);
      setTotalRecords(list.length);
    } catch (response) {
      // console.log(response)

    } finally {
      setLoading(false);
    }
  }, [lazyState]);

  useEffect(() => {

    document.title = etudiants_routes_items.etudiants.name;

    setBreadCrumbAction([etudiants_routes_items.etudiants])

    return () => {
      setBreadCrumbAction([]);
    };
  }, []);

  useEffect(() => {
    fetchEtudiants();
  }, [lazyState]);

  return (
    <>
      <ConfirmDialog closable dismissableMask={true} />

      <VoirCarteEtudiant visible={visible} setVisible={setVisible} event={dataEtudiant} />

      {/* {visible && <UtilisateurActivationDialog
        visible={visible}
        data={inViewMenuItem}
        onHide={() => { setVisible(false); setInViewMenuItem(null) }}
        fetchUtilisateurs={fetchUtilisateurs}
      />} */}

      {loading && <Loading />}

      <div className="px-4 py-3 main_content">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="mb-3">Etudiants</h2>
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
              value={etudiants}
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
                    field="EMAIL_PRIVE"
                    header="Email privé"
                    sortable
                    body={(item) => {
                    return (
                        <span>
                        {item?.candidature?.EMAIL_PRIVE}
                        </span>
                    );
                    }}
                />
                <Column
                    field="NUMERO_MATRICULE"
                    header="Numéro matricule"
                    sortable
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
                            label: 'Voir Carte Etudiant',
                            icon: 'pi pi-eye',
                            template: item => (
                            <div className='p-menuitem-content px-3'>
                                <Link onClick={() => VoirCard(inViewMenuItem) } className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
                                <span className={item.icon} />
                                <span className="mx-2">{item.label}</span>
                                </Link>
                            </div>
                            )
                        },
                        {
                            label: 'Détails',
                            icon: 'pi-address-book',
                            template: item => (
                            <div className='p-menuitem-content px-3'>
                                <Link to={`/voir-etudiant/${inViewMenuItem?.ID_ETUDIANT}`} className="flex align-items-center p-2" style={{ textDecoration: "none", color: '#3d3d3d' }}>
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
                            className="mx-1 p-1 bg-yellow-400 rounded-button"
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
