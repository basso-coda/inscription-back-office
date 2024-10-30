import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import fetchApi from "@/helpers/fetchApi";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { utilisateurs_routes_items } from "@/routes/administrations/utilisateurs_routes";
import { useApp } from "@/hooks/useApp";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Panel } from "primereact/panel";

export default function NewUtilisateurPage() {
    const navigate = useNavigate();
    const { setBreadCrumbAction, setToastAction } = useApp()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [visiblePassowrd, setVisiblePassowrd] = useState(false);
    const [visibleConfirmPassowrd, setVisibleConfirmPassowrd] = useState(false);

    const [profils, setProfils] = useState([])

    const [sexes, setSexes] = useState([
        { SEXE_ID: 1, SEXE_DESCRIPTION: 'Féminin' },
        { SEXE_ID: 2, SEXE_DESCRIPTION: 'Masculin' },
    ]);

    const [etatCivils, setEtatCivils] = useState([
        { ID_ETAT_CIVIL: 1, DESCRIPTION: 'CELIBATAIRE' },
        { ID_ETAT_CIVIL: 2, DESCRIPTION: 'MARIÉ(E)' },
        { ID_ETAT_CIVIL: 3, DESCRIPTION: 'DIVORCÉ(E)' },
    ])

    const [nationalites, setNatianalites] = useState([
        { NATIONALITE_ID: 1, NOM_NATIONALITE: 'Burundi' },
    ])

    const [banques, setBanques] = useState([
        { ID_BANQUE: 1, NOM_BANQUE: 'BHB' },
        { ID_BANQUE: 2, NOM_BANQUE: 'BANCOBU' },
    ])

    const initialValues = {
        NOM: "",
        PRENOM: "",
        USERNAME: "",
        EMAIL: "",
        MOT_DE_PASSE: "",
        CONFIRM_MOT_DE_PASSE: "",
        NUMERO_TELEPHONE: "",
        ADRESSE_COMPLET: "",
        LIEU_NAISSANCE: "",
        DATE_NAISSANCE: "",
        DUREE_PERIODE: "",
        NUMERO_COMPTE: "",
        DATE_ENTREE: null,
        DATE_SORTIE: null,
        NUMERO_INSS: "",

        PROFIL_ID: null,
        SEXE_ID: null,
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

    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);

            const formData = new FormData();

            for (let key in data) {
                if (data[key]) {

                    switch (key) {
                        case 'PROFIL_ID': {
                            formData.append(key, data[key]?.ID_PROFIL);
                            break;
                        }

                        case 'SEXE_ID': {
                            formData.append(key, data[key]?.SEXE_ID)
                            break;
                        }

                        case 'ETAT_CIVIL_ID': {
                            formData.append(key, data[key]?.ID_ETAT_CIVIL);
                            break;
                        }

                        case 'NATIONALITE_ID': {
                            formData.append(key, data[key]?.NATIONALITE_ID);
                            break;
                        }

                        case 'ID_BANQUE': {
                            formData.append(key, data[key]?.ID_BANQUE);
                            break
                        }

                        default:
                            formData.append(key, data[key]);
                    }
                }

            }

            const response = await fetchApi('/utilisateurs', {
                method: 'POST',
                body: formData,
            });

            setToastAction({
                severity: "success",
                summary: "Success",
                detail: response.message,
                life: 3000,
            })

            setErrors(null);

            navigate('/utilisateurs');

        } catch (response) {
            if (response.httpStatus === 422) {
                setErrors(response.errors);
            }

            setToastAction({
                severity: "error",
                summary: "Erreur",
                detail: response.message,
                life: 3000,
            })
        } finally {
            setIsSubmitting(false);

        }
    };

    const fetchProfils = async () => {
        try {
            const res = await fetchApi('/profils');
            setProfils(res.data.rows)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = utilisateurs_routes_items.new_utilisateur.name;

        setBreadCrumbAction([utilisateurs_routes_items.utilisateurs, utilisateurs_routes_items.new_utilisateur])

        fetchProfils();

        return () => {
            setBreadCrumbAction([]);
        };

    }, [])

    return (
        <>
            <div className="px-4 py-3 main_content bg-white has_footer">

                <div className="">
                    <h1 className="mb-3">Nouvel employé(e)</h1>
                    <hr className="w-100" />
                </div>

                <form className="form w-full mt-5" onSubmit={handleSubmit}>
                    <Panel header="Identification" toggleable>
                        <div className="form-group col-sm">
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="NOM" className="label mb-1">Nom
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText autoFocus type="text" placeholder="Ecrire votre nom" id="NOM" name="NOM" value={data.NOM} onChange={e => setData(d => ({ ...d, NOM: e.target.value }))} className={`w-100 is-invalid ${errors?.NOM ? 'p-invalid' : ''}`} />

                                    {errors?.NOM && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.NOM}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="PRENOM" className="label mb-1">Prénom
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre prenom" id="PRENOM" name="PRENOM" value={data.PRENOM} onChange={e => setData(d => ({ ...d, PRENOM: e.target.value }))} className={`w-100 is-invalid ${errors?.PRENOM ? 'p-invalid' : ''}`} />

                                    {errors?.PRENOM && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PRENOM}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="USERNAME" className="label mb-1">Nom d'utilisateur
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre nom d'utilisateur" id="USERNAME" name="USERNAME" value={data.USERNAME} onChange={e => setData(d => ({ ...d, USERNAME: e.target.value }))} className={`w-100 is-invalid ${errors?.USERNAME ? 'p-invalid' : ''}`} />

                                    {errors?.USERNAME && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.USERNAME}
                                    </div>}
                                </div>
                            </div>

                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="EMAIL" className="label mb-1">Email
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre email" id="EMAIL" name="EMAIL" value={data.EMAIL} onChange={e => setData(d => ({ ...d, EMAIL: e.target.value }))} className={`w-100 is-invalid ${errors?.EMAIL ? 'p-invalid' : ''}`} />

                                    {errors?.EMAIL && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.EMAIL}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="MOT_DE_PASSE" className="label mb-1">Ecrire le mot de passe
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <InputText
                                            placeholder="Entrer le mot de passe"
                                            type={visiblePassowrd ? "text" : "password"}
                                            id="MOT_DE_PASSE"
                                            name="MOT_DE_PASSE"
                                            value={data.MOT_DE_PASSE}
                                            onChange={e => setData(data => ({ ...data, MOT_DE_PASSE: e.target.value }))}
                                            className={`w-100 is-invalid ${errors?.MOT_DE_PASSE ? "p-invalid" : ""}`}

                                        />

                                        <span
                                            className="p-input-icon-right absolute"
                                            style={{ top: "25px", right: "20px" }}
                                        >
                                            {!visiblePassowrd ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-eye cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                    onClick={() => setVisiblePassowrd((b) => !b)}
                                                >
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-eye-slash cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                    onClick={() => setVisiblePassowrd((b) => !b)}
                                                >
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>

                                    {errors?.MOT_DE_PASSE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.MOT_DE_PASSE}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="CONFIRM_MOT_DE_PASSE" className="label mb-1">Confirmer le mot de passe
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <InputText
                                            placeholder="Confirmer le mot de passe"
                                            type={visibleConfirmPassowrd ? "text" : "password"}
                                            id="CONFIRM_MOT_DE_PASSE"
                                            name="CONFIRM_MOT_DE_PASSE"
                                            value={data.CONFIRM_MOT_DE_PASSE}
                                            onChange={e => setData(data => ({ ...data, CONFIRM_MOT_DE_PASSE: e.target.value }))}
                                            className={`w-100 is-invalid ${errors?.CONFIRM_MOT_DE_PASSE ? "p-invalid" : ""}`}

                                        />

                                        <span
                                            className="p-input-icon-right absolute"
                                            style={{ top: "25px", right: "20px" }}
                                        >
                                            {!visibleConfirmPassowrd ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-eye cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                    onClick={() => setVisibleConfirmPassowrd((b) => !b)}
                                                >
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-eye-slash cursor-pointer"
                                                    viewBox="0 0 16 16"
                                                    onClick={() => setVisibleConfirmPassowrd((b) => !b)}
                                                >
                                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                </svg>
                                            )}
                                        </span>
                                    </div>

                                    {errors?.CONFIRM_MOT_DE_PASSE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.CONFIRM_MOT_DE_PASSE}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="NUMERO_TELEPHONE" className="label mb-1">Numére téléphone
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre numéro tél" id="NUMERO_TELEPHONE" name="NUMERO_TELEPHONE" value={data.NUMERO_TELEPHONE} onChange={e => setData(d => ({ ...d, NUMERO_TELEPHONE: e.target.value }))} className={`w-100 is-invalid ${errors?.NUMERO_TELEPHONE ? 'p-invalid' : ''}`} />
                                    {errors?.NUMERO_TELEPHONE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.NUMERO_TELEPHONE}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="ADRESSE_COMPLET" className="label mb-1">Adresse complète
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre Adresse complète" id="ADRESSE_COMPLET" name="ADRESSE_COMPLET" value={data.ADRESSE_COMPLET} onChange={e => setData(d => ({ ...d, ADRESSE_COMPLET: e.target.value }))} className={`w-100 is-invalid ${errors?.ADRESSE_COMPLET ? 'p-invalid' : ''}`} />

                                    {errors?.ADRESSE_COMPLET && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.ADRESSE_COMPLET}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="LIEU_NAISSANCE" className="label mb-1">Lieu de naissance
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre lieu de naissance" id="LIEU_NAISSANCE" name="LIEU_NAISSANCE" value={data.LIEU_NAISSANCE} onChange={e => setData(d => ({ ...d, LIEU_NAISSANCE: e.target.value }))} className={`w-100 is-invalid ${errors?.LIEU_NAISSANCE ? 'p-invalid' : ''}`} />
                                    {errors?.LIEU_NAISSANCE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.LIEU_NAISSANCE}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-4">
                                    <div>
                                        <label htmlFor="DATE_NAISSANCE" className="label mb-1">Date de naissance
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <Calendar
                                        id="DATE_NAISSANCE"
                                        name="DATE_NAISSANCE"
                                        value={data.DATE_NAISSANCE}
                                        onChange={e => setData(d => ({ ...d, DATE_NAISSANCE: e.value }))}
                                        dateFormat="dd/mm/yy"
                                        style={{ width: "100%", borderRadius: "0px" }}
                                        placeholder="Entrer votre date de naissance"
                                        showButtonBar
                                        showIcon
                                        className={`w-100 is-invalid ${errors?.DATE_NAISSANCE ? 'p-invalid' : ''}`}
                                    />

                                    {errors?.DATE_NAISSANCE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.DATE_NAISSANCE}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="DUREE_PERIODE" className="label mb-1">Durée période
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre lieu de naissance" id="DUREE_PERIODE" name="DUREE_PERIODE" value={data.DUREE_PERIODE} onChange={e => setData(d => ({ ...d, DUREE_PERIODE: e.target.value }))} className={`w-100 is-invalid ${errors?.DUREE_PERIODE ? 'p-invalid' : ''}`} />
                                    {errors?.DUREE_PERIODE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.DUREE_PERIODE}
                                    </div>}
                                </div>

                                <div className="col-4">
                                    <div>
                                        <label htmlFor="NUMERO_INSS" className="label mb-1">Numéro INSS</label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre numéro INSS" id="NUMERO_INSS" name="NUMERO_INSS" value={data.NUMERO_INSS} onChange={e => setData(d => ({ ...d, NUMERO_INSS: e.target.value }))} className={`w-100 is-invalid ${errors?.NUMERO_INSS ? 'p-invalid' : ''}`} />

                                    {errors?.NUMERO_INSS && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.NUMERO_INSS}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="DATE_ENTREE" className="label mb-1">Date d'entrée<span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <Calendar
                                        id="DATE_ENTREE"
                                        name="DATE_ENTREE"
                                        value={data.DATE_ENTREE}
                                        onChange={e => setData(d => ({ ...d, DATE_ENTREE: e.value }))}
                                        dateFormat="dd/mm/yy"
                                        style={{ width: "100%", borderRadius: "0px" }}
                                        placeholder="Entrer votre date d'entrée"
                                        showButtonBar
                                        showIcon
                                        className={`w-100 is-invalid ${errors?.DATE_ENTREE ? 'p-invalid' : ''}`}
                                    />

                                    {errors?.DATE_ENTREE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.DATE_ENTREE}
                                    </div>}
                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="DATE_SORTIE" className="label mb-1">
                                            Date de sortie
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <Calendar
                                        id="DATE_SORTIE"
                                        name="DATE_SORTIE"
                                        value={data.DATE_SORTIE}
                                        onChange={e => setData(d => ({ ...d, DATE_SORTIE: e.value }))}
                                        dateFormat="dd/mm/yy"
                                        style={{ width: "100%", borderRadius: "0px" }}
                                        placeholder="Entrer votre date de sortie"
                                        showButtonBar
                                        showIcon
                                        className={`w-100 is-invalid ${errors?.DATE_SORTIE ? 'p-invalid' : ''}`}
                                    />

                                    {errors?.DATE_SORTIE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.DATE_SORTIE}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </Panel>

                    {/* Banque */}
                    <Panel header="Finance" toggleable className="mt-5">
                        <div className="form-group col-sm">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="banque" className="label mb-1">Banque
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div>
                                        <Dropdown
                                            id="banque"
                                            name="banque"
                                            value={data.ID_BANQUE}
                                            onChange={(e) => setData(d => ({ ...d, ID_BANQUE: e.value }))}
                                            options={banques}
                                            optionLabel="NOM_BANQUE"
                                            placeholder="Selecionner le profil"
                                            filter
                                            style={{ borderRadius: 0 }}
                                            className="w-full" />
                                    </div>

                                    {errors?.ID_BANQUE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.ID_BANQUE}
                                    </div>}
                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="NUMERO_COMPTE" className="label mb-1">Numéro du compte bancaire
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <InputText type="text" placeholder="Ecrire votre lieu de naissance" id="NUMERO_COMPTE" name="NUMERO_COMPTE" value={data.NUMERO_COMPTE} onChange={e => setData(d => ({ ...d, NUMERO_COMPTE: e.target.value }))} className={`w-100 is-invalid ${errors?.NUMERO_COMPTE ? 'p-invalid' : ''}`} />

                                    {errors?.NUMERO_COMPTE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.NUMERO_COMPTE}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </Panel>

                    {/* Identité */}
                    <Panel header="Profil" toggleable className="mt-5" collapsed={true}>
                        <div className="form-group col-sm">
                            <div className="row">

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="sexe" className="label mb-1">Sexe
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div>
                                        <Dropdown
                                            id="sexe"
                                            name="sexe"
                                            value={data.SEXE_ID}
                                            onChange={(e) => setData(d => ({ ...d, SEXE_ID: e.value }))}
                                            options={sexes}
                                            optionLabel="SEXE_DESCRIPTION"
                                            placeholder="Selecionner le profil"
                                            filter
                                            style={{ borderRadius: 0 }}
                                            className="w-full" />
                                    </div>

                                    {errors?.SEXE_ID && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.SEXE_ID}
                                    </div>}
                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="profil" className="label mb-1">Profil
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div>
                                        <Dropdown
                                            id="profil"
                                            name="profil"
                                            value={data.PROFIL_ID}
                                            onChange={(e) => setData(d => ({ ...d, PROFIL_ID: e.value }))}
                                            options={profils}
                                            optionLabel="DESCRIPTION"
                                            placeholder="Selecionner le profil"
                                            filter
                                            style={{ borderRadius: 0 }}
                                            className="w-full" />
                                    </div>

                                    {errors?.PROFIL_ID && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PROFIL_ID}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="etat_civil" className="label mb-1">Etat Civil
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div>
                                        <Dropdown
                                            id="etat_civil"
                                            name="etat_civil"
                                            value={data.ETAT_CIVIL_ID}
                                            onChange={(e) => setData(d => ({ ...d, ETAT_CIVIL_ID: e.value }))}
                                            options={etatCivils}
                                            optionLabel="DESCRIPTION"
                                            placeholder="Selecionner l'Etat Civil"
                                            filter
                                            style={{ borderRadius: 0 }}
                                            className="w-full" />
                                    </div>

                                    {errors?.ETAT_CIVIL_ID && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.ETAT_CIVIL_ID}
                                    </div>}
                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="natinalite" className="label mb-1">Nationalité
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <div>
                                        <Dropdown
                                            id="natinalite"
                                            name="natinalite"
                                            value={data.NATIONALITE_ID}
                                            onChange={(e) => setData(d => ({ ...d, NATIONALITE_ID: e.value }))}
                                            options={nationalites}
                                            optionLabel="NOM_NATIONALITE"
                                            placeholder="Selecionner le profil"
                                            filter
                                            style={{ borderRadius: 0 }}
                                            className="w-full" />
                                    </div>

                                    {errors?.NATIONALITE_ID && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.NATIONALITE_ID}
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </Panel>

                    <Panel header="Documents" toggleable className="my-5" collapsed={true}>
                        <div className="form-group col-sm">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="IMAGE" className="label mb-1">Profile photo</label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir l'image`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="image/*"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`L'image est volumineuse`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "IMAGE": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "IMAGE": null }))
                                        }}
                                    />

                                    {errors?.IMAGE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.IMAGE}
                                    </div>}

                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_PHOTO_PASSEPORT" className="label mb-1">Photo passport</label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir l'image`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="image/*"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`L'image est volumineuse`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_PHOTO_PASSEPORT": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_PHOTO_PASSEPORT": null }))
                                        }}
                                    />

                                    {errors?.PATH_PHOTO_PASSEPORT && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_PHOTO_PASSEPORT}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_CV" className="label mb-1">CV
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_CV": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_CV": null }))
                                        }}
                                    />

                                    {errors?.PATH_CV && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_CV}
                                    </div>}

                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_DIPLOME" className="label mb-1">Diplome <span style={{ color: 'red', fontSize: 18 }}>*</span></label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir l'image`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`L'image est volumineuse`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_DIPLOME": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_DIPLOME": null }))
                                        }}
                                    />

                                    {errors?.PATH_DIPLOME && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_DIPLOME}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_ATTESTATION_IDENTITE_COMPLETE" className="label mb-1">Attestation d'identité complète</label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_ATTESTATION_IDENTITE_COMPLETE": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_ATTESTATION_IDENTITE_COMPLETE": null }))
                                        }}
                                    />

                                    {errors?.PATH_ATTESTATION_IDENTITE_COMPLETE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_ATTESTATION_IDENTITE_COMPLETE}
                                    </div>}

                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_ACTE_NAISSANCE_ENFANT" className="label mb-1">Extrait d'acte de naissance</label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_ACTE_NAISSANCE_ENFANT": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_ACTE_NAISSANCE_ENFANT": null }))
                                        }}
                                    />

                                    {errors?.PATH_ACTE_NAISSANCE_ENFANT && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_ACTE_NAISSANCE_ENFANT}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_ETAT_CIVIL" className="label mb-1">Certificat d'état civil</label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_ETAT_CIVIL": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_ETAT_CIVIL": null }))
                                        }}
                                    />

                                    {errors?.PATH_ETAT_CIVIL && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_ETAT_CIVIL}
                                    </div>}

                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_EXTRAIT_CASIER_JUDICIARE" className="label mb-1">
                                            Casier judiciaire
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_EXTRAIT_CASIER_JUDICIARE": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_EXTRAIT_CASIER_JUDICIARE": null }))
                                        }}
                                    />

                                    {errors?.PATH_EXTRAIT_CASIER_JUDICIARE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_EXTRAIT_CASIER_JUDICIARE}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_LETTE_NOTIFICATION" className="label mb-1">
                                            Lettre de notification
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_LETTE_NOTIFICATION": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_LETTE_NOTIFICATION": null }))
                                        }}
                                    />

                                    {errors?.PATH_LETTE_NOTIFICATION && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_LETTE_NOTIFICATION}
                                    </div>}

                                </div>

                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_LETTRE_DEMANDE" className="label mb-1">
                                            Lettre de demande
                                            <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir le document`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="application/pdf"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`Le document est volumineux`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_LETTRE_DEMANDE": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_LETTRE_DEMANDE": null }))
                                        }}
                                    />

                                    {errors?.PATH_LETTRE_DEMANDE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_LETTRE_DEMANDE}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-sm mt-5">
                            <div className="row">
                                <div className="col-6">
                                    <div>
                                        <label htmlFor="PATH_SIGNATURE" className="label mb-1">
                                            Signature <span style={{ color: 'red', fontSize: 18 }}>*</span>
                                        </label>
                                    </div>

                                    <FileUpload
                                        style={{ borderRadius: 0 }}
                                        chooseLabel={`choisir l'image`}
                                        cancelLabel={`Enlever`}
                                        name="signature"
                                        uploadOptions={{
                                            style: { display: "none" },
                                        }}
                                        className="p-invalid"
                                        accept="image/*"
                                        maxFileSize={200000}
                                        invalidFileSizeMessageDetail={`L'image est volumineuse`}
                                        emptyTemplate={
                                            <p className="m-0">{`Glisser-déposer`}</p>
                                        }
                                        onSelect={async (e) => {
                                            const file = e.files[0];
                                            setData(d => ({ ...d, "PATH_SIGNATURE": file }))
                                        }}
                                        onClear={() => {
                                            setData(d => ({ ...d, "PATH_SIGNATURE": null }))
                                        }}
                                    />

                                    {errors?.PATH_SIGNATURE && <div
                                        className="invalid-feedback"
                                        style={{ minHeight: 0, display: "block" }}
                                    >
                                        {errors?.PATH_SIGNATURE}
                                    </div>}

                                </div>
                            </div>
                        </div>
                    </Panel>

                    <div style={{ position: 'absolute', bottom: 0, right: 0 }} className="w-100 d-flex justify-content-end shadow-4 pb-3 pr-5 bg-white">
                        {/* <Button label="Reinitialiser" type="reset" outlined className="mt-3" size="small" onClick={e => {
                            e.preventDefault()
                            setData(initialValues)
                            setErrors(null)
                        }} /> */}

                        <Button label="Envoyer" type="submit" className="bitwi-button" size="small" disabled={isSubmitting} loading={isSubmitting} />
                        <Button label="Envoyer" type="submit" className="mt-3 ml-3 bitwi-button" size="small" disabled={isSubmitting} loading={isSubmitting} />
                    </div>
                </form >
            </div >
        </>
    )
}