import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useApp } from "@/hooks/useApp";
import fetchApi from "@/helpers/fetchApi";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export default function NewDepartementModal(props) {
    const { setToastAction } = useApp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [facultes, setFacultes] = useState([])

    const initialValues = {
        ID_DEPARTEMENT: props.data?.ID_DEPARTEMENT,
        DESCRIPTION: props.data?.DESCRIPTION ?? "",
        FACULTE: ""
    };

    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState(null);

    const fetchFacultes = async () => {
        try {
            const res = await fetchApi('/facultes');
            const faculteList = res.data.rows.map((faculte) => ({
                code: faculte?.ID_FACULTE,
                name: faculte?.DESCRIPTION
            }));

            setFacultes(faculteList);

            // Si on est en modification, selectionner la faculte correspondante 
            if (props.data?.FACULTE_ID) {
                const selectedFaculte = faculteList.find(f => f.code === props.data.FACULTE_ID);
                setData(prevData => ({
                    ...prevData,
                    FACULTE: selectedFaculte || ""
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
            FACULTE_ID: data?.FACULTE?.code || props.data?.FACULTE_ID
        }

        const url = `/departements${newData.ID_DEPARTEMENT ? `/${newData.ID_DEPARTEMENT}` : ''}`

        const response = await fetchApi(url, {
            method: newData.ID_DEPARTEMENT ? 'PUT' : 'POST',
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

        props.fetchDepartements();

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
        fetchFacultes();
    }, []);

    return (
        <Dialog
        header={props.data ? `Modifier le département` : `Nouveau département`}
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
                    <label htmlFor="FACULTE" className="label mb-1">Faculte
                        <span style={{ color: 'red', fontSize: 18 }}>*</span>
                    </label>
                    <div className="col-sm">
                        <Dropdown
                            value={data.FACULTE}
                            options={facultes}
                            onChange={e => setData(d => ({ ...d, FACULTE: e.value }))}
                            optionLabel="name"
                            id="FACULTE"
                            filter
                            filterBy="name"
                            placeholder="Sélectionnez la faculté"
                            emptyFilterMessage="Aucun élément trouvé"
                            emptyMessage="Aucun élément trouvé"
                            name="FACULTE"
                            className={`w-100 is-invalid ${errors?.FACULTE ? 'p-invalid' : ''}`}
                            showClear
                        />
                        {errors?.FACULTE && <div
                            className="invalid-feedback"
                            style={{ minHeight: 0, display: "block" }}
                        >
                            {errors?.FACULTE}
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
                className="bitwi-button rounded-button"
                size="small"
                disabled={isSubmitting}
            />
            </div>
        </form>
        </Dialog>
    );
}