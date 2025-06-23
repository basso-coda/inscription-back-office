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
import { candidatures_routes_items } from "@/routes/gestion_candidatures/candidatures_routes";
import { Button } from "primereact/button";
import MotifRejetDialog from "./reponses_candidature/MotifRejetDialog";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function ViewDemande() {
    const [loading, setLoading] = useState(true);
    const { setBreadCrumbAction, setToastAction } = useApp()
    const { state } = useLocation()
    const params = state?.ID_CANDIDATURE ? state : useParams();
    const [visible, setVisible] = useState(false)
    const [candidatId, setCandidatId] = useState()
    const [showMotif, setShowMotif] = useState(false)
    const { user } = useAuth()
    const [loadingApprouver, setLoadingApprouver] = useState(false)

    const showModal = (id) => {
        setVisible(true)
        setCandidatId(id)
    }

    const hideModal = () => {
        setVisible(false)
    }

    const getStatutText = (statut) => {
        switch (statut) {
            case 1: return 'Demande reçue';
            case 2: return 'En cours de traitement';
            case 3: return 'Acceptée';
            case 4: return 'Rejetée';
            default: return 'Inconnu';
        }
    };

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

    const fetchMesDemandes = async () => {
        try {
            setLoading(true)
            const res = await fetchApi(`/candidatures/${params.ID_CANDIDATURE}`);
            // console.log(res);
            
            setData({ ...res.data })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprouverClick = () => {
        confirmDialog({
            message: 'Voulez-vous vraiment approuver cette demande ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => handleApprouver(),
        })
    }

    const handleApprouver = async () => {

        setLoadingApprouver(true);

        try {
            const body = {
                SECRETAIRE_ID: user.data.ID_UTILISATEUR
            };

            const res = await fetchApi(`/approuver-demande/${data.ID_CANDIDATURE}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });

            setToastAction({
                severity: 'success',
                summary: 'Succès',
                detail: res.message,
                life: 3000
            });

            fetchMesDemandes(); // Recharger les données pour voir les nouveaux statuts

        } catch (error) {
            console.log(error);
            setToastAction({
                severity: 'error',
                summary: 'Erreur',
                detail: error.message,
                life: 3000
            });
        } finally {
            setLoadingApprouver(false)
        }
    };

    const handleCommencerTraitement = async () => {
        try {
            const res = await fetchApi(`/change-statut/${data.ID_CANDIDATURE}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            setToastAction({
                severity: 'success',
                summary: 'Succès',
                detail: res.message,
                life: 3000
            });

            fetchMesDemandes(); // Recharger pour mettre à jour le badge de statut

        } catch (error) {
            console.log(error);
            setToastAction({
                severity: 'error',
                summary: 'Erreur',
                detail: error.message || "Erreur lors du changement de statut",
                life: 3000
            });
        }
    }



    useEffect(() => {
        document.title = candidatures_routes_items.voir_candidature.name;

        setBreadCrumbAction(state ? [{
            path: "view-demande",
            name: "Voir mon Dossier",
            component: ViewDemande,
        }] : [candidatures_routes_items.candidatures, candidatures_routes_items.voir_candidature])

        fetchMesDemandes();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [state])
    

    return (
        <>

            {visible && (
                <Dialog
                    header={`Refus de la demande`}
                    visible={visible}
                    style={{ width: "35vw" }}
                    onHide={hideModal}
                    headerStyle={{ backgroundColor: "#eb7d07" }}
                    headerClassName="text-white text-center"
                >
                    <MotifRejetDialog 
                        onSuccess={() => {
                            setVisible(false);
                            fetchMesDemandes();
                        }}
                        // setVisible={setVisible}
                        candidatureId={candidatId}
                    />
                </Dialog>
            )}

            <Dialog
                header="Motifs du rejet"
                visible={showMotif}
                style={{ width: '40vw' }}
                onHide={() => setShowMotif(false)}
            >
                <p>
                    {data?.motif_rejets?.length > 0 ? (
                        <ul>
                            {data.motif_rejets.map((item, index) => (
                                <li key={index}>
                                    {item.motif?.DESCRIPTION || "Motif non trouvé."}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun motif enregistré.</p>
                    )}
                </p>
            </Dialog>

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
                </div> : <>
                    <center>
                        <h4>
                            <span className="mx-2 mb-2">
                                {data.STATUT_CANDIDATURE=='1'?(<Badge value="Demande reçue" severity="secondary"></Badge>):null} 
                                {data.STATUT_CANDIDATURE=='2'?(<Badge value="Demande en cours de traitement" severity="info"></Badge>):null} 
                                {data.STATUT_CANDIDATURE=='3'?(<Badge value="Demande en attente de paiement" severity="warning"></Badge>):null}
                                {data.STATUT_CANDIDATURE=='4'?(<Badge value="Demande approuvée" severity="success"></Badge>):null}
                                {data.STATUT_CANDIDATURE=='5'?(<Badge value="Demande refusée" severity="danger"></Badge>):null} 
                            </span>
                        </h4>
                        {data?.STATUT_CANDIDATURE === 1 && (
                            <Button
                                label="Commencer le traitement"
                                icon="pi pi-play"
                                className="p-button-warning mx-2 mb-2"
                                onClick={handleCommencerTraitement}
                            />
                        )}
                    </center>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" style={{ borderRadius: "0px" }}>
                                <TabView>
                                    <TabPanel
                                        header={`Choix académique`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <ChoixAcademiqueDetails data={data} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Informations personnelles`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <InformationsPersonnellesDetails data={data} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Etudes antérieures`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <EtudesAnterieuresDetails data={data} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Documents`}
                                        rightIcon="pi pi-file ml-2"
                                    >
                                        <DocumentsExigesDetails documents={data?.documents || []} />

                                    </TabPanel>
                                    <TabPanel
                                        header={`Personnes de contact`}
                                        rightIcon="pi pi-align-left ml-2 mr-2"
                                    >
                                        <PersonnesContactDetails personnes={data?.personnes_contact || []} />

                                    </TabPanel>
                                </TabView>
                                
                            </div>
                            <div className="flex justify-between mt-4">
                                {(data?.STATUT_CANDIDATURE !== 3 && data?.STATUT_CANDIDATURE !== 4 && data?.STATUT_CANDIDATURE !==5) && (
                                    <>
                                        <Button label="Refuser la demande" onClick={e => showModal(data?.ID_CANDIDATURE)} className="p-button-secondary mx-2 mb-2" />
                                        <Button
                                            label="Approuver la demande"
                                            icon={loadingApprouver ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                                            iconPos="right"
                                            className="p-button-success mx-2 mb-2"
                                            onClick={handleApprouverClick}
                                            disabled={loadingApprouver}
                                        />
                                    </>
                                    
                                )}

                                {[3, 4, 5].includes(data.STATUT_CANDIDATURE) && (
                                <>
                                    {data.STATUT_CANDIDATURE === 3 && (
                                        <Message severity="info" text="Cette demande a été approuvée. En attente du paiement du candidat." />
                                    )}

                                    {data.STATUT_CANDIDATURE === 4 && (
                                        <Message severity="success" text="Le candidat a payé. Demande validée." />
                                    )}

                                    {data.STATUT_CANDIDATURE === 5 && (
                                    <>
                                        <Message severity="error" text="Cette demande a été refusée." />
                                        <Button label="Voir les motifs du refus" icon="pi pi-eye" onClick={() => setShowMotif(true)} className="p-button-warning mt-2" />
                                    </>
                                    )}
                                </>
                                )}
                                
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