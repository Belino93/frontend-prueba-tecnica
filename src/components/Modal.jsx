import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getLocalidad, createContract } from "../services/apiCalls";

function ModalCustom({
  functionShow,
  isUpdate,
  setIsUpdate,
  show,
  contractId,
  isNew,
  setIsNew,
}) {
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
  const inpHandler = (e) => {
    setContractData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
    console.log(contractData);
    createContract(contractData)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {isUpdate && !isNew && (
        <Modal show={show} onHide={functionShow} backdrop="static">
          <Modal.Header>
            <Modal.Title>Actualizar contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="apellido1">Apellido 1: </label>
            <input
              type="text"
              name="apellido1"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="apellido2">Apellido 2: </label>
            <input
              type="text"
              name="apellido2"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="documento">Documento: </label>
            <input
              type="text"
              name="documento"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="cp">CP: </label>
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
              disabled
              value={contractData?.localidad}
            ></input>

            <label htmlFor="direccion">Dirección: </label>
            <input
              type="text"
              name="direccion"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="telefono">Telefono: </label>
            <input
              type="text"
              name="telefono"
              onChange={(e) => inpHandler(e)}
            ></input>
          </Modal.Body>
          <Modal.Footer className=" justify-content-between">
            <button
              className="bg-danger"
              onClick={() => {
                functionShow(false);
                setIsUpdate(false);
              }}
            >
              Cerrar
            </button>
            <button
              className="bg-warning"
              variant="primary"
              onClick={() => functionShow(false)}
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
            <label htmlFor="nombre">Nombre: </label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="apellido1">Apellido 1: </label>
            <input
              type="text"
              name="apellido1"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="apellido2">Apellido 2: </label>
            <input
              type="text"
              name="apellido2"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="documento">Documento: </label>
            <input
              type="text"
              name="documento"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="cp">CP: </label>
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
              disabled
              value={contractData?.localidad}
            ></input>

            <label htmlFor="direccion">Dirección: </label>
            <input
              type="text"
              name="direccion"
              onChange={(e) => inpHandler(e)}
            ></input>

            <label htmlFor="telefono">Telefono: </label>
            <input
              type="text"
              name="telefono"
              onChange={(e) => inpHandler(e)}
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                functionShow(false);
                setIsNew(false);
              }}
            >
              Cerrar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createHandler();
                functionShow(false);
                setIsNew(false);
              }}
            >
              Crear
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default ModalCustom;
