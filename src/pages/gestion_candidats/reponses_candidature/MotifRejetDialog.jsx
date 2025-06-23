import fetchApi from "@/helpers/fetchApi";
import { useApp } from "@/hooks/useApp";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

yup.setLocale({
    mixed: {
        required: 'Ce champ est obligatoire'
    }
})

const schema = yup.object().shape({
    MOTIF_ID: yup.array().of(yup.number().required()).min(1, "Sélectionnez au moins un motif"),
    CANDIDATURE_ID: yup.number().required(),
});

const MotifRejetDialog = ({onSuccess, candidatureId}) => {
    const { setToastAction } = useApp()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [motifs, setMotifs] = useState([])
    const { user } = useAuth()
    const navigate = useNavigate()

    const initialForm = {
        MOTIF_ID: "",
        CANDIDATURE_ID: candidatureId,
        SECRETAIRE_ID: ""
    }

    const [data, setData] = useState(initialForm)
    const [errors, setErrors] = useState({})

    const fetchMotifs = async () => {
        try {
            const res = await fetchApi('/motifs');
            const motifList = res.data.rows.map((motif) => ({
                code: motif?.ID_MOTIF,
                name: motif?.DESCRIPTION
            }));

            setMotifs(motifList);

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {

        try {

            e.preventDefault()

            setIsSubmitting(true)
            
            data.SECRETAIRE_ID = user.data.ID_UTILISATEUR;
            
            if (Array.isArray(data.MOTIF_ID)) {
                data.MOTIF_ID = data.MOTIF_ID.map(m => Number(m.code));
            } else {
                data.MOTIF_ID = [];
            }

            await schema.validate(data, { abortEarly: false })
            
            const res = await fetchApi(`/refuser-demande/${data.CANDIDATURE_ID}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })

            setToastAction({
                severity: 'success',
                summary: 'Succès',
                detail: res.message,
                life: 3000
            })

            onSuccess();

        } catch (error) {
            console.log(error)
            if (error.name === "ValidationError") {
                setErrors(error.inner.reduce((acc, curr) => {
                    if (curr.path) {
                        acc[curr.path] = curr.message;
                    }
                    return acc;
                }, {}));

                setToastAction({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur de validation des données',
                    life: 3000
                });
            } else if (error.httpStatus === 422) {
                setErrors(error.errors)
                setToastAction({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: error.message,
                    life: 3000
                });
            } else {
                setToastAction({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: error.message || "Une erreur s'est produite",
                    life: 3000
                });
            }
            
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        fetchMotifs();
    }, []);

    return (
            <div className="">
               <form onSubmit={handleSubmit} className="flex flex-column gap-2">
                    <div className="row">

                        <div className="mb-2">
                            <div key="motif" className="col-md-12">
                                <label htmlFor="motif" className="label mb-3">
                                    Motif de rejet
                                </label>
                                <span style={{ color: 'red', fontSize: 18 }}>*</span>
                            </div>

                            <MultiSelect
                                id="MOTIF_ID"
                                name="MOTIF_ID"
                                value={data.MOTIF_ID}
                                onChange={(e) => setData({ ...data, MOTIF_ID: e.value })}
                                options={motifs}
                                optionLabel="name"
                                placeholder="Selectionner le ou les motifs"
                                filter
                                style={{ borderRadius: 0 }}
                                className="w-full" 
                                display="chip"
                            />

                            {errors?.MOTIF_ID && <div className="invalid-feedback" style={{ minHeight: 21, display: 'block' }}>
                                {errors.MOTIF_ID}
                            </div>}
                        </div>

                    </div>

                    <div className="w-100 d-flex justify-content-end pb-1 pr-1 bg-white">
                        <Button
                            icon={isSubmitting ? `pi pi-spin pi-spinner` : `pi pi-check-circle`}
                            label={'Envoyer'}
                            style={{ borderRadius: "0px" }}
                            type="submit"
                            disabled={isSubmitting}
                            className="ml-33 bitwi-button"
                            size="small"
                        />
                    </div>
                </form> 
            </div>
    );
};

export default MotifRejetDialog;