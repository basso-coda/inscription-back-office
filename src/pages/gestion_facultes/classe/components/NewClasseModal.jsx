import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useApp } from "@/hooks/useApp";
import fetchApi from "@/helpers/fetchApi";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export default function NewClasseModal(props) {
    const { setToastAction } = useApp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departements, setDepartements] = useState([])

    const initialValues = {
        ID_CLASSE: props.data?.ID_CLASSE,
        DESCRIPTION: props.data?.DESCRIPTION ?? "",
        DEPARTEMENT: ""
    };

    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState(null);

    const fetchDepartements = async () => {
        try {
            const res = await fetchApi('/departements');
            const departementList = res.data.rows.map((departement) => ({
                code: departement?.ID_DEPARTEMENT,
                name: departement?.DESCRIPTION
            }));

            setDepartements(departementList);

            // Si on est en modification, selectionner la faculte correspondante 
            if (props.data?.DEPARTEMENT_ID) {
                const selectedDepartement = departementList.find(f => f.code === props.data.DEPARTEMENT_ID);
                setData(prevData => ({
                    ...prevData,
                    DEPARTEMENT: selectedDepartement || ""
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

        setIsSubmitting(true);
        
        const newData = {
            ...data,
            DEPARTEMENT_ID: data?.DEPARTEMENT?.code || props.data?.DEPARTEMENT_ID
        }

        const url = `/classes${newData.ID_CLASSE ? `/${newData.ID_CLASSE}` : ''}`

        const response = await fetchApi(url, {
            method: newData.ID_CLASSE ? 'PUT' : 'POST',
            body: JSON.stringify(newData),
            headers: {
            "Content-Type": "application/json"
            }
        });

        setToastAction({
            severity: "success",
            summary: "Success",
            detail: response.message,
            life: 3000,
        })

        props.setVisible(false);

        setErrors(null);

        props.fetchClasses();

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

    useEffect(() => {
        fetchDepartements();
    }, []);

    return (
        <Dialog
        header={props.data ? `Modifier la classe` : `Nouvelle classe`}
        visible={props.visible}
        position="center"
        style={{ width: "50vw" }}
        onHide={() => {
            props.setVisible(!props.visible);
        }}
        >
        <form onSubmit={handleSubmit} className="flex flex-column gap-2">
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="DEPARTEMENT" className="label mb-1">Département
                        <span style={{ color: 'red', fontSize: 18 }}>*</span>
                    </label>
                    <div className="col-sm">
                        <Dropdown
                            value={data.DEPARTEMENT}
                            options={departements}
                            onChange={e => setData(d => ({ ...d, DEPARTEMENT: e.value }))}
                            optionLabel="name"
                            id="DEPARTEMENT"
                            filter
                            filterBy="name"
                            placeholder="Sélectionnez le département"
                            emptyFilterMessage="Aucun élément trouvé"
                            emptyMessage="Aucun élément trouvé"
                            name="DEPARTEMENT"
                            className={`w-100 is-invalid ${errors?.DEPARTEMENT ? 'p-invalid' : ''}`}
                            showClear
                        />
                        {errors?.DEPARTEMENT && <div
                            className="invalid-feedback"
                            style={{ minHeight: 0, display: "block" }}
                        >
                            {errors?.DEPARTEMENT}
                        </div>}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="price" className="label mb-1">
                    Description
                    </label>
                    <InputText
                    type="text"
                    id="DESCRIPTION"
                    name="DESCRIPTION"
                    style={{ borderRadius: "0px" }}
                    value={data.DESCRIPTION}
                    placeholder=""
                    className={`w-100 is-invalid ${errors?.DESCRIPTION
                        ? "p-invalid"
                        : ""
                        }`}
                    onChange={(e) => setData(d => ({ ...d, DESCRIPTION: e.target.value }))}
                    />
                    <div
                    className="invalid-feedback"
                    style={{ minHeight: 10, display: "block" }}
                    >
                    </div>
                </div>
            </div>

            <div className="w-100 d-flex justify-content-end  pb-1 bg-white">

            <Button
                label={'Enregistrer'}
                type="submit"
                icon={isSubmitting ? `pi pi-spin pi-spinner` : `pi pi-save`}
                className="bg-yellow-400 rounded-button"
                size="small"
                disabled={isSubmitting}
            />
            </div>
        </form>
        </Dialog>
    );
}