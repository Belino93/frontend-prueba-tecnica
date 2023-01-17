import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { getContracts } from "../../services/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalCustom from "../../components/Modal";

function List() {
  const [contracts, setContracts] = useState([]);
  const [show, setShow] = useState(false);
  const [contractId, setContractId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const showModal = () => setShow(true);

  useEffect(() => {
    getContracts()
      .then((res) => {
        setContracts(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Container className="text-center">
        <h1 className="mt-2">Tabla de contratos</h1>
        {contracts.length > 0 && (
          <Row>
            <Col className="col-3 mb-1">
              <button
                onClick={() => {
                  setIsUpdate(false)
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
                            className=" bg-warning"
                            onClick={() => {
                              setIsUpdate(true);
                              setIsNew(false)
                              setContractId(contract._id);
                              showModal();
                            }}
                          >
                            <FontAwesomeIcon icon={faPencil} />
                            <span className="mx-1">Editar</span>
                          </button>
                          <button className=" bg-danger">
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

          />
        )}
      </Container>
    </>
  );
}

export default List;
