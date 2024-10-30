import fetchApi from "@/helpers/fetchApi";
import { useEffect, useState } from "react";
import { utilisateurs_routes_items } from "@/routes/administrations/utilisateurs_routes";
import { useApp } from "@/hooks/useApp";
import { useLocation, useParams } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import { formatDate } from "@/helpers/formatter";

export default function ViewUtilisateurPage() {
    const [loading, setLoading] = useState(false);
    const { setBreadCrumbAction } = useApp()
    const { state } = useLocation()
    const params = state?.ID_utilisateur ? state : useParams();

    const initialValues = {
        NOM: "",
        PRENOM: "",
        USERNAME: "",
        EMAIL: "",
        NUMERO_TELEPHONE: "",
        ADRESSE_COMPLET: "",
        LIEU_NAISSANCE: "",
        DATE_NAISSANCE: "",
        DUREE_PERIODE: "",
        NUMERO_COMPTE: "",
        DATE_ENTREE: null,
        DATE_SORTIE: null,
        NUMERO_INSS: "",

        SEXE_ID: null,
        PROFIL_ID: null,
        ETAT_CIVIL_ID: null,
        NATIONALITE_ID: null,
        ID_BANQUE: null,

        IMAGE: null,
        PATH_PHOTO_PASSEPORT: null,
        PATH_CV: null,
        PATH_DIPLOME: null,
        PATH_ATTESTATION_IDENTITE_COMPLETE: null,
        PATH_ACTE_NAISSANCE_ENFANT: null,
        PATH_ETAT_CIVIL: null,
        PATH_EXTRAIT_CASIER_JUDICIARE: null,
        PATH_LETTE_NOTIFICATION: null,
        PATH_LETTRE_DEMANDE: null,
        PATH_SIGNATURE: null,
    }

    const [data, setData] = useState(initialValues)

    const fetchCurrentUtilisateur = async () => {
        try {
            setLoading(true)
            const res = await fetchApi(`/utilisateurs/${params.ID_utilisateur}`);
            setData(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.title = utilisateurs_routes_items.voir_utilisateur.name;

        setBreadCrumbAction(state ? [{
            path: "auth/view-profil",
            name: "Voir le profil",
            component: ViewUtilisateurPage,
        }] : [utilisateurs_routes_items.utilisateurs, utilisateurs_routes_items.voir_utilisateur])

        fetchCurrentUtilisateur();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [state])

    return (
        <>
            <div className="px-4 py-3 main_content bg-white">
                <div className="w-full flex gap-6">
                    <Panel header="Profil">
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                {data?.IMAGE ? <Image
                                    src={`${data?.IMAGE}`}
                                    alt="Image"
                                    className="rounded-5"
                                    imageClassName="rounded-5 object-fit-cover"
                                    imageStyle={{ width: "128px", height: "128px" }}
                                    preview
                                />

                                    : <Avatar icon="pi pi-user" size="xlarge" style={{ width: "128px", height: "128px" }} />
                                }
                            </div>
                        </div>
                    </Panel>

                    <Panel header="Identification">
                        <div className="grid gap-6 flex-wrap">
                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div>
                                    <div className="label mb-1">Nom</div>
                                </div>
                                <div className="font-bold">{data.NOM}</div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Prénom</div>
                                <div className="font-bold">{data.PRENOM}</div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Nom d'utilisateur</div>
                                <div className="font-bold">{data.USERNAME}</div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Email</div>
                                <div className="font-bold">
                                    {data?.EMAIL}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Numére téléphone</div>
                                <div className="font-bold">
                                    {data?.NUMERO_TELEPHONE}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Adresse complète
                                </div>

                                <div className="font-bold">
                                    {data?.ADRESSE_COMPLET}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Lieu de naissance
                                </div>
                                <div className="font-bold">
                                    {data?.LIEU_NAISSANCE}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Date de naissance
                                </div>
                                <div className="font-bold">
                                    {data?.DATE_NAISSANCE ? formatDate(new Date(data?.DATE_NAISSANCE)) : '-'}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Durée période</div>
                                <div className="font-bold">
                                    {data?.DUREE_PERIODE}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Numéro INSS</div>
                                <div className="font-bold">
                                    {data?.NUMERO_INSS}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">Date d'entrée
                                </div>
                                <div className="font-bold">
                                    {formatDate(new Date(data?.DATE_ENTREE))}
                                </div>
                            </div>

                            <div style={{ flex: '1 1 0' }} className="col-4">
                                <div className="label mb-1">
                                    Date de sortie</div>
                                <div className="font-bold">
                                    {formatDate(new Date(data?.DATE_SORTIE))}
                                </div>
                            </div>
                        </div>
                    </Panel>
                </div>

                {/* <Panel header="Documents" className="mt-4">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            {data?.IMAGE ? <Image
                                src={`${data?.IMAGE}`}
                                alt="Image"
                                className="rounded-5"
                                imageClassName="rounded-5 object-fit-cover"
                                imageStyle={{ width: "128px", height: "128px" }}
                                preview
                            />

                                : <Avatar icon="pi pi-user" size="xlarge" style={{ width: "128px", height: "128px" }} />
                            }
                        </div>
                    </div>
                </Panel> */}
            </div>
        </>
    )
}