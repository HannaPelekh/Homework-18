const editFirstNameE = document.getElementById("edit_first_name");
const editLastNameE = document.getElementById("edit_last_name");
const editPhoneE = document.getElementById("edit_phone");

const editButtonE = document.querySelector(".save");

const ErrMsgEditFNE = document.getElementById("err_edit_MSG_FN");
const ErrMsgEditLNE = document.getElementById("err_edit_MSG_LN");
const ErrMsgEditPNE = document.getElementById("err_edit_MSG_PN");
const editInputBox = document.querySelector(".input_edit_box");

editFirstNameE.addEventListener("keyup", validateEditFName);
editLastNameE.addEventListener("keyup", validateEditLName);
editPhoneE.addEventListener("keyup", validateEditPhone);
editInputBox.addEventListener("keyup", validateEditData);

editButtonE.disabled = true;
  
function validateEditFName(e) {   
  if (!e.target.value.trim()) {
    ErrMsgEditFNE.innerText = "";
    editButtonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;    
    return;
  }
  if (e.target.value.trim().length <= 3) {
    ErrMsgEditFNE.innerText = "Name should be more then 3 symbols";
    editButtonE.disabled = true;
    IS_DATA_VALID[e.target.id] = false;   
    return;
  }
  IS_DATA_VALID[e.target.id] = true;
  ErrMsgEditFNE.innerText = "";
  
}
function  validateEditLName(e) {
    if (!e.target.value.trim()) {
        ErrMsgEditLNE.innerText = "";
      editButtonE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (e.target.value.trim().length <= 3) {
        ErrMsgEditLNE.innerText = "Last Name should be more then 3 symbols";
        editButtonE.disabled = true;
        IS_DATA_VALID[e.target.id] = false;
        return;
    }    
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgEditLNE.innerText = "";
}
function validateEditPhone(e) {
    const PHONE_REGEXP = /^((\+?3)?8)?0\d{9}$/;
    if (!e.target.value.trim()) {
      ErrMsgEditPNE.innerText = "";
      editButtonE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    if (!e.target.value.match(PHONE_REGEXP)) {
      ErrMsgEditPNE.innerText = "Error, Phone should be like +380997777777";
      editButtonE.disabled = true;
      IS_DATA_VALID[e.target.id] = false;
      return;
    }
    IS_DATA_VALID[e.target.id] = true;
    ErrMsgEditPNE.innerText = ""; 
}
function validateEditData(e) {
    const target = e.target;
    if (target.id === "edit_first_name") {
        validateEditFName(e);
    }
    if (target.id === "edit_last_name") {
        validateEditLName(e);
    }
    if (target.id === "edit_phone") {
        validateEditPhone(e);
    }
    editButtonE.disabled = !(
      IS_DATA_VALID["edit_first_name"] &&
      IS_DATA_VALID["edit_last_name"] &&
      IS_DATA_VALID["edit_phone"]
    );    
} 