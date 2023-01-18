export const contractDataValidator = (eventTargetName, eventTargetValue) => {
  const stringRegex =
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/i;
  const dniRegex = /^(\d{8})([A-Z])$/;
  const cifRegex = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
  const nieRegex = /^[XYZ]\d{7,8}[A-Z]$/;
  const phoneRegex = /^(?:(?:\+?[0-9]{2,4})?[ ]?[6789][0-9 ]{8,13})$/;

  switch (eventTargetName) {
    case "nombre":
      if (eventTargetValue.match(stringRegex)) {
        return true;
      }
      break;
    case "apellido1":
      if (eventTargetValue.match(stringRegex)) {
        return true;
      }
      break;
    case "documento":
      let documentType = "";
      if (eventTargetValue.match(dniRegex)) {
        documentType = "dni";
        return documentValidator(eventTargetValue, documentType);
      }
      if (eventTargetValue.match(cifRegex)) {
        documentType = "cif";
        return documentValidator(eventTargetValue, documentType);
      }
      if (eventTargetValue.match(nieRegex)) {
        documentType = "nie";
        return documentValidator(eventTargetValue, documentType);
      }
      break;

    case "telefono":
      if (eventTargetValue.match(phoneRegex)) {
        return true;
      }
      break;
  }
};

const validateDni = (dni) => {
  let dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  let letter = dni_letters.charAt(parseInt(dni, 10) % 23);

  return letter == dni.charAt(8);
};
const validateNie = (nie) => {
  let nie_prefix = nie.charAt(0);

  switch (nie_prefix) {
    case "X":
      nie_prefix = 0;
      break;
    case "Y":
      nie_prefix = 1;
      break;
    case "Z":
      nie_prefix = 2;
      break;
  }

  return validateDni(nie_prefix + nie.substr(1));
};

const validateCif = (cif) => {
  if (!cif || cif.length !== 9) {
    return undefined;
  }

  let letters = ["J", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
  let digits = cif.substr(1, cif.length - 2);
  let letter = cif.substr(0, 1);
  let control = cif.substr(cif.length - 1);
  let sum = 0;
  let i;
  let digit;

  if (!letter.match(/[A-Z]/)) {
    return undefined;
  }

  for (i = 0; i < digits.length; ++i) {
    digit = parseInt(digits[i]);

    if (isNaN(digit)) {
      return undefined;
    }

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = parseInt(digit / 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  if (sum !== 0) {
    digit = 10 - sum;
  } else {
    digit = sum;
  }

  if (letter.match(/[ABEH]/)) {
    return String(digit) === control;
  }
  if (letter.match(/[NPQRSW]/)) {
    return letters[digit] === control;
  }

  return String(digit) === control || letters[digit] === control;
};

const documentValidator = (document, documentType) => {
  switch (documentType) {
    case "dni":
      return validateDni(document);
      break;
    case "cif":
      return validateCif(document);
      break;
    case "nie":
      return validateNie(document);
      break;

    default:
      break;
  }
};


export const validateBeforeSend = (contractData, contractDataErrors) => {
  let isValid = true;
    Object.values(contractDataErrors).forEach((element) => {
      if (element !== "") {
        return isValid = false;
      }
    });

    if (contractData.localidad === "CP no valido" || contractData.nombre === '' || contractData.apellido1 === '' || contractData.telefono === '') {
      return isValid = false;
    }

    return isValid
}