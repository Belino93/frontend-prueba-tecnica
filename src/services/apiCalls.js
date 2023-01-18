import axios from "axios";
const baseUrl = "https://backend-prueba-tecnica-production.up.railway.app/";

export const getContracts = async () => {
  try {
    const contractsData = await axios.get(baseUrl + "listcontracts");
    return contractsData;
  } catch (error) {
    return error;
  }
};

export const getLocalidad = async (codigoP) => {
  try {
    if (codigoP === "") {
      return;
    }
    const body = { cp: codigoP };
    const localidad = await axios.post(baseUrl + "getlocalidad", body);

    if (localidad?.data?.message) {
      return localidad.data.message;
    }

    return localidad.data;
  } catch (error) {
    return error;
  }
};

export const createContract = async (contractData) => {
  try {
    const newContract = await axios.post(baseUrl + "addcontract", contractData);

    return newContract;
  } catch (error) {
    return error;
  }
};
export const modifyContract = async (contractData, uuId) => {
  try {
    const body = {
      uuid: uuId,
      contrato: contractData,
    };
    const updatedContract = await axios.patch(baseUrl + "modifycontract", body);

    return updatedContract;
  } catch (error) {
    return error;
  }
};
export const checkForDeleteContract = async (uuId) => {
  try {
    const body = {
      uuid: uuId,
    };
    const contractForDelete = await axios.patch(baseUrl + "deletecontract", body);

    return contractForDelete;
  } catch (error) {
    return error;
  }
};
