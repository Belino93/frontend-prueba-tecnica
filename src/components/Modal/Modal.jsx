import { useState } from "react";
import "./Modal.css";
import Modal from "react-bootstrap/Modal";
import {
  getLocalidad,
  createContract,
  modifyContract,
} from "../../services/apiCalls";
import { contractDataValidator, validateBeforeSend } from "./contractDataCheck";

function ModalCustom({
  functionShow,
  isUpdate,
  setIsUpdate,
  show,
  contractId,
  isNew,
  setIsNew,
  setRefresh,
  refresh,
}) {
  const [localidadError, setLocalidadError] = useState("");
  const [uuIdClicked, setUuIdClicked] = useState(contractId);
  const [contractData, setContractData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    documento: "",
    cp: "",
    localidad: "",
    direccion: "",
    telefono: "",
  });
  const [contractDataErrors, setContractDataErrors] = useState({
    nombreError: "",
    apellido1Error: "",
    documentoError: "",
    telefonoError: "",
  });
  const inpHandler = (e) => {
    setContractData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorHandler = (e) => {
    let error = "";
    error = contractDataValidator(e.target.name, e.target.value);
    if (error === false) {
      error = undefined;
    }
    if (error === true) {
      return setContractDataErrors((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: "",
      }));
    }
    setContractDataErrors((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: e.target.name + " no valido",
    }));
  };

  const blurHandler = async (e) => {
    let localidadCp = await getLocalidad(e.target.value);
    setContractData((prevState) => ({
      ...prevState,
      localidad: localidadCp,
    }));
  };

  const createHandler = () => {
    const isValid = validateBeforeSend(contractData,contractDataErrors)
    if (isValid) {
      createContract(contractData)
        .then((res) => {
          setRefresh(!refresh);
        })
        .catch((error) => {
          return
        });
      functionShow(false);
      setIsNew(false);
    }
    return;
  };
  const updateHandler = () => {
    const isValid = validateBeforeSend(contractData,contractDataErrors)
    if (isValid) {
      modifyContract(contractData, uuIdClicked)
        .then((res) => {
          setRefresh(!refresh);
        })
        .catch((error) => {return});
      functionShow(false);
      setIsUpdate(false);
    }
    return;
  };
  return (
    <>
      {isUpdate && !isNew && (
        <Modal show={show} onHide={functionShow} backdrop="static">
          <Modal.Header>
            <Modal.Title>Actualizar contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="nombre">*Nombre: </label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.nombreError}</div>

            <label htmlFor="apellido1">Apellido 1: </label>
            <input
              type="text"
              name="apellido1"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.apellido1Error}</div>

            <label htmlFor="apellido2">Apellido 2: </label>
            <input
              type="text"
              name="apellido2"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="documento">*Documento: </label>
            <input
              type="text"
              name="documento"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.documentoError}</div>

            <label htmlFor="cp">*CP: </label>
            <input
              type="text"
              name="cp"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => {
                blurHandler(e);
              }}
            ></input>

            <label htmlFor="localidad">Localidad: </label>
            <input
              type="text"
              name="localidad"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
              disabled
              value={contractData?.localidad}
            ></input>

            <label htmlFor="direccion">Dirección: </label>
            <input
              type="text"
              name="direccion"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="telefono">*Telefono: </label>
            <input
              type="text"
              name="telefono"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.telefonoError}</div>
          </Modal.Body>
          <Modal.Footer className=" justify-content-between">
            <button
              className="bg-danger buttons"
              onClick={() => {
                functionShow(false);
                setIsUpdate(false);
              }}
            >
              Cerrar
            </button>
            <button
              className="bg-warning buttons"
              variant="primary"
              onClick={() => {
                updateHandler();
              }}
            >
              Actualizar
            </button>
          </Modal.Footer>
        </Modal>
      )}
      {isNew && !isUpdate && (
        <Modal show={show} onHide={functionShow} backdrop="static">
          <Modal.Header>
            <Modal.Title>Crear contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="nombre">*Nombre: </label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.nombreError}</div>

            <label htmlFor="apellido1">Apellido 1: </label>
            <input
              type="text"
              name="apellido1"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.apellido1Error}</div>

            <label htmlFor="apellido2">Apellido 2: </label>
            <input
              type="text"
              name="apellido2"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="documento">*Documento: </label>
            <input
              type="text"
              name="documento"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.documentoError}</div>

            <label htmlFor="cp">*CP: </label>
            <input
              type="text"
              name="cp"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => {
                blurHandler(e);
              }}
            ></input>

            <label htmlFor="localidad">Localidad: </label>
            <input
              type="text"
              name="localidad"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
              disabled
              value={contractData?.localidad}
            ></input>

            <label htmlFor="direccion">Dirección: </label>
            <input
              type="text"
              name="direccion"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="telefono">*Telefono: </label>
            <input
              type="text"
              name="telefono"
              onChange={(e) => inpHandler(e)}
              onBlur={(e) => errorHandler(e)}
            ></input>
            <div className="error">{contractDataErrors?.telefonoError}</div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="buttons"
              onClick={() => {
                functionShow(false);
                setIsNew(false);
              }}
            >
              Cerrar
            </button>
            <button
              className="buttons  bg-primary bg-opacity-50"
              onClick={() => {
                createHandler();
              }}
            >
              Crear
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalCustom;
