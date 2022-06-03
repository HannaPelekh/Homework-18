const firstNameE = document.getElementById("create_first_name");
const lastNameE = document.getElementById("create_last_name");
const phoneE = document.getElementById("create_phone");
const buttonAddE = document.getElementById("button_create");

const ErrMsgNameE = document.getElementById("err_cr_MSG_FN");
const ErrMsgLastNameE = document.getElementById("err_cr_MSG_LN");
const ErrMsgPhoneE = document.getElementById("err_cr_MSG_PN");
const inputBox = document.querySelector(".create_container");

firstNameE.addEventListener("keyup", validatefirstName);
lastNameE.addEventListener("keyup", validatelastName);
phoneE.addEventListener("keyup", validatePhone);

buttonAddE.addEventListener("click", onAddContactList);
inputBox.addEventListener("keyup", validateData);

buttonAddE.disabled = true;


phoneE.value = '+380997777777';


function onAddContactList() {   
    contact.createContact(firstNameE.value, lastNameE.value, phoneE.value)      
    buttonAddE.disabled = true;   
    firstNameE.value = "";
    lastNameE.value = "";   
    phoneE.value = "";          
}   
function validatefirstName(e) {   
  if (!e.target.value.trim()) {
    ErrMsgNameE.innerText = "";
    buttonAddE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;    
    return;
  }
  if (e.target.value.trim().length <= 3) {
    ErrMsgNameE.innerText = "Name should be more then 3 symbols";
    buttonAddE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;   
    return;
  }
  IS_DATA_VALID[e.target.id] = true;
  ErrMsgNameE.innerText = "";
  
}
function validatelastName(e) {
    if (!e.target.value.trim()) {
      ErrMsgLastNameE.innerText = "";
      buttonAddE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (e.target.value.trim().length <= 3) {
        ErrMsgLastNameE.innerText = "Last Name should be more then 3 symbols";
        buttonAddE.disabled = true;
        IS_DATA_VALID[e.target.id] = false;
        return;
    }    
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgLastNameE.innerText = "";
}

function validatePhone(e) {
    const PHONE_REGEXP = /^((\+?3)?8)?0\d{9}$/;
    if (!e.target.value.trim()) {
      ErrMsgPhoneE.innerText = "";
      buttonAddE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (!e.target.value.match(PHONE_REGEXP)) {
      ErrMsgPhoneE.innerText = "Error, Phone should be like +380997777777";
      buttonAddE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgPhoneE.innerText = "";

    
}

function validateData(e) {
    const target = e.target;
    if (target.id === "create_first_name") {
        validatefirstName(e);
    }
    if (target.id === "create_last_name") {
        validatelastName(e);
    }
    if (target.id === "create_phone") {
        validatePhone(e);
    }
    buttonAddE.disabled = !(
      IS_DATA_VALID["create_first_name"] &&
      IS_DATA_VALID["create_last_name"] &&
      IS_DATA_VALID["create_phone"]
    );    
} 


  
