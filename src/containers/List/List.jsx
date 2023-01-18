import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { getContracts, checkForDeleteContract } from "../../services/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalCustom from "../../components/Modal";
import Modal from "react-bootstrap/Modal";
import './List.css'

function List() {
  const [contracts, setContracts] = useState([]);
  const [show, setShow] = useState(false);
  const [contractId, setContractId] = useState("");
  const [contractClicked, setContractClicked] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const showModal = () => setShow(true);
  const [refresh, setRefresh] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getContracts()
      .then((res) => {
        const filteredContracts = res.data.filter(
          (contract) => contract.borrar === false
        );
        setContracts(filteredContracts);
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  const deleteHandler = () => {
    checkForDeleteContract(contractClicked?._id)
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container className="text-center">
        <h1 className="mt-2">Tabla de contratos</h1>
        {contracts.length > 0 && (
          <Row>
            <Col className="col-3 mb-1">
              <button
                className="buttons bg-primary bg-opacity-50 "
                onClick={() => {
                  setIsUpdate(false);
                  setIsNew(true);
                  showModal();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span className="mx-1">Nuevo</span>
              </button>
            </Col>
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
                            className="buttons bg-warning"
                            onClick={() => {
                              setIsUpdate(true);
                              setIsNew(false);
                              setContractId(contract._id);
                              showModal();
                            }}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                            <span className="mx-1">Editar</span>
                          </button>
                          <button
                            className="bg-danger buttons"
                            onClick={() => {
                              setDeleteModal(true);
                              setContractClicked(contract);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                            <span className="mx-1">Borrar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        )}
        {(isUpdate || isNew) && (
          <ModalCustom
            functionShow={setShow}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            show={show}
            contractId={contractId}
            isNew={isNew}
            setIsNew={setIsNew}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        )}
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Borrar contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" text-center">
            ¿Estas seguro que quieres marcar como borrado el contrato con el
            documento{" "}
            <span className="fw-bold">{contractClicked?.documento}?</span>
          </Modal.Body>
          <Modal.Footer>
            <button className="buttons" onClick={() => setDeleteModal(false)}>
              Cerrar
            </button>
            <button
              className="bg-danger buttons"
              onClick={() => {
                deleteHandler();
                setDeleteModal(false);
              }}
            >
              Borrar
            </button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default List;
