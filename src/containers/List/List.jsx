import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { getContracts, getLocalidad } from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function List() {
  const [contracts, setContracts] = useState([]);
  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [contractData, setContractData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    documento: "",
    cp: "",
    localidad: "",
    direccion: "",
    telefono: ""
  })

  const hideModal = () => setShow(false);
  const showModal = () => setShow(true);

  useEffect(() => {
    getContracts()
      .then((res) => {
        setContracts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const inpHandler = (e) => {
    setContractData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const blurHandler = (e) => {
    getLocalidad(e.target.value)
    console.log(e.target.value);
  };


  return (
    <>
      <Container className="text-center">
        <h1 className="mt-2">Tabla de contratos</h1>
        {contracts.length > 0 && (
          <Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contract?.nombre}</td>
                    <td>{contract?.documento}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <button
                          className=" bg-warning"
                          onClick={() => {
                            showModal();
                            setIsUpdate(true);
                          }}
                        >
                          Editar
                        </button>
                        <button className=" bg-danger">Borrar</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          </Row>
        )}
        {isUpdate && (
          <Modal show={show} onHide={hideModal} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Actualizar contrato</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center flex-column">
              <label htmlFor="nombre">Nombre: </label>
              <input type="text" name="nombre" onChange={(e) => inpHandler(e)}></input>

              <label htmlFor="apellido1">Apellido 1: </label>
              <input type="text" name="apellido1" onChange={(e) => inpHandler(e)}></input>

              <label htmlFor="apellido2">Apellido 2: </label>
              <input type="text" name="apellido2" onChange={(e) => inpHandler(e)}></input>

              <label htmlFor="Documento">Documento: </label>
              <input type="text" name="Documento" onChange={(e) => inpHandler(e)}></input>

              <label htmlFor="cp">CP: </label>
              <input type="text" name="cp" onChange={(e) => inpHandler(e)} onBlur={(e) => {blurHandler(e)}} ></input>

              <label htmlFor="localidad">Localidad: </label>
              <input type="text" name="localidad" onChange={(e) => inpHandler(e)} disabled></input>

              <label htmlFor="direccion">Dirección: </label>
              <input type="text" name="direccion" onChange={(e) => inpHandler(e)}></input>

              <label htmlFor="telefono">Telefono: </label>
              <input type="text" name="telefono" onChange={(e) => inpHandler(e)}></input>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  hideModal();
                  setIsUpdate(false);
                }}
              >
                Cerrar
              </Button>
              <Button variant="primary" onClick={hideModal}>
                Actualizar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default List;
