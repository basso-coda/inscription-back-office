import { Button } from "primereact/button"
import { useCallback, useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import fetchApi from "@/helpers/fetchApi"
import { useApp } from "@/hooks/useApp"
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";


export default function NewExigenceFaculteModal({ id, fetchFacultes, setIsVisible }) {
    // console.log(id);
    
    const initialValues = {
        EXIGENCE_ID: '',
    }

    const { setBreadCrumbAction, setToastAction } = useApp()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const user = useAuth()
    // console.log('uwuri connecté', user.user.data?.ID_UTILISATEUR)
    const [data, setData] = useState(initialValues)
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsSubmitting(true);

            const formData = new FormData();
            data.FACULTE_ID = id.ID_FACULTE

            // return console.log('ivyo ngira ndungike', data)
            for (const key in data) {
                formData.append(key, data[key])
            }

            // return console.log('ivyo kurungika', data)
            const response = await fetchApi(`/exigences`, {
                method: 'POST',
                body: formData,
            });

            fetchFacultes()
            setIsVisible(false)
            setToastAction({
                severity: "success",
                summary: "Success",
                detail: response.message,
                life: 3000,
            })

            setErrors(null);

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


    return (
        <>
            <div className="">
                <form className="form w-75 mt-5" onSubmit={handleSubmit}>
                    <div className="form-group col-sm mt-5">
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="DESCRIPTION" className="label mb-1">Description</label>
                            </div>
                            <div className="col-sm">
                                <InputTextarea autoFocus rows={5} placeholder="Description" id="DESCRIPTION" name="DESCRIPTION" value={data.DESCRIPTION} onChange={e => setData(d => ({ ...d, DESCRIPTION: e.target.value }))} className={`w-100 ${errors?.DESCRIPTION ? 'p-invalid' : ''}`} />
                                {errors?.DESCRIPTION && <div
                                    className="invalid-feedback"
                                    style={{ minHeight: 0, display: "block" }}
                                >
                                    {errors?.DESCRIPTION}
                                </div>}
                            </div>
                        </div>
                    </div>    

                    <div style={{  bottom: 0, right: 0 }} className="w-100 d-flex justify-content-end  pb-3 pr-5 bg-white">
                    
                        <Button label="Envoyer" type="submit" className="mt-3 ml-3 bitwi-button rounded-button" size="small" disabled={isSubmitting} />
                    </div>
                </form>
            </div>
        </>
    )

}