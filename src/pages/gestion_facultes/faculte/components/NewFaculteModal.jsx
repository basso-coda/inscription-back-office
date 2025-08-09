import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useApp } from "@/hooks/useApp";
import fetchApi from "@/helpers/fetchApi";
import { Dialog } from "primereact/dialog";

export default function NewFaculteModal(props) {
  const { setToastAction } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    ID_FACULTE: props.data?.ID_FACULTE,
    DESCRIPTION: props.data?.DESCRIPTION ?? "",
  };

  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setIsSubmitting(true);

      const url = `/facultes${data.ID_FACULTE ? `/${data.ID_FACULTE}` : ''}`

      const response = await fetchApi(url, {
        method: data.ID_FACULTE ? 'PUT' : 'POST',
        body: JSON.stringify(data),
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

      props.fetchFacultes();

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
    <Dialog
      header={props.data ? `Modifier la faculté` : `Nouvelle faculté`}
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