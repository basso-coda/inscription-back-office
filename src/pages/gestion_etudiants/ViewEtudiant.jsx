import fetchApi from "@/helpers/fetchApi";
import { useEffect, useState } from "react";
import { useApp } from "@/hooks/useApp";
import {  useLocation, useParams } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { TabPanel, TabView } from "primereact/tabview";
import { Skeleton } from "primereact/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Tag } from "primereact/tag";
import { Badge } from "primereact/badge";
import ChoixAcademiqueDetails from "./details/ChoixAcademiqueDetails";
import InformationsPersonnellesDetails from "./details/InformationsPersonnellesDetails";
import EtudesAnterieuresDetails from "./details/EtudesAnterieuresDetails";
import DocumentsExigesDetails from "./details/DocumentsExigesDetails";
import PersonnesContactDetails from "./details/PersonnesContactDetails";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { etudiants_routes_items } from "@/routes/gestion_etudiants/etudiants_routes";

export default function ViewEtudiant() {
    const [loading, setLoading] = useState(true);
    const { setBreadCrumbAction, setToastAction } = useApp()
    const { state } = useLocation()
    const params = state?.ID_ETUDIANT ? state : useParams();
    const { user } = useAuth()

    const initialValues = {
        ANNEE_ACADEMIQUE: "",
        CLASSE_ID: "",
        NOM: "",
        PRENOM: "",
        DATE_NAISSANCE: "",
        NATIONALITE_ID: "",
        NUM_CARTE_IDENTITE: "",
        COMMUNE_DELIVRANCE: "",
        DATE_DELIVRANCE: "",
        SEXE_ID: "",
        ETAT_CIVIL_ID: "",
        EMAIL_PRIVE: "",
        NUMERO_TELEPHONE_PRIVE: "",
        ADRESSE_RESIDENCE: "",
        NOM_DERNIERE_ECOLE_FREQUENTEE: "",
        NOTE_DERNIERE_ECOLE_SECONDAIRE_FREQUENTEE: "",
        NOTE_EXAMEN_D_ETAT: "",
        STATUT_CANDIDATURE: "",
        SECRETAIRE_ID: "",
        // DOCUMENTS: {},
        // PERSONNES_CONTACT: [],
    }

    const [data, setData] = useState(initialValues)

    const fetchEtudiant = async () => {
        try {
            setLoading(true)
            const res = await fetchApi(`/etudiants/${params.ID_ETUDIANT}`);
            // console.log(res);
            
            setData({ ...res.data })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.title = etudiants_routes_items.voir_etudiant.name;

        setBreadCrumbAction(state ? [{
            path: "voir-etudiant",
            name: "Details",
            component: ViewEtudiant,
        }] : [etudiants_routes_items.etudiants, etudiants_routes_items.voir_etudiant])

        fetchEtudiant();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [state])
    

    return (
        <>

            <div className="px-4 py-3 main_content">
                {loading ? <div
                    className="shadows p-4 "
                    style={{ border: "solid 1px white" }}
                >
                    <div className="flex mb-3">
                        <Skeleton
                            shape="circle"
                            size="4rem"
                            className="mr-2"
                        ></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="100px"></Skeleton>
                </div> : 
                    <>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card" style={{ borderRadius: "0px" }}>
                                    <TabView>
                                        <TabPanel
                                            header={`Choix académique`}
                                            rightIcon="pi pi-align-left ml-2 mr-2"
                                        >
                                            <ChoixAcademiqueDetails data={data?.candidature} />

                                        </TabPanel>
                                        <TabPanel
                                            header={`Informations personnelles`}
                                            rightIcon="pi pi-align-left ml-2 mr-2"
                                        >
                                            <InformationsPersonnellesDetails data={data?.candidature} />

                                        </TabPanel>
                                        <TabPanel
                                            header={`Etudes antérieures`}
                                            rightIcon="pi pi-align-left ml-2 mr-2"
                                        >
                                            <EtudesAnterieuresDetails data={data?.candidature} />

                                        </TabPanel>
                                        <TabPanel
                                            header={`Documents`}
                                            rightIcon="pi pi-file ml-2"
                                        >
                                            <DocumentsExigesDetails documents={data?.candidature?.documents || []} />

                                        </TabPanel>
                                        <TabPanel
                                            header={`Personnes de contact`}
                                            rightIcon="pi pi-align-left ml-2 mr-2"
                                        >
                                            <PersonnesContactDetails personnes={data?.candidature?.personnes_contact || []} />

                                        </TabPanel>
                                    </TabView>
                                    
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <ConfirmDialog/>
        </>
    )
}