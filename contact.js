class Contact{
        static url = 'contacts';
        #contacts = [];
        #http = null;

    #current = {
        contact: null,
        el: null,
    };
    #edit = {
        el: null,
        name: null,
        lastName: null,
        phone: null,       
    };
    #contactListE = null;
    #CLASSES = {
        active_element: "active_element",
        show_edit: "show_edit",         
        delete: "delete",
        edit: "edit",
        name: "first_name",
        lastName: "last_name",
        phone: "phone"
    }
    constructor(el, editEl) {       
        this.#contactListE = el;
        this.#edit.el = editEl;               
        this.initContact()          
    }
    initContact() {
        this.#http = new Http(Contact.url);  
        this.#edit.name = this.#edit.el.querySelector(".edit_first_name");
        this.#edit.lastName = this.#edit.el.querySelector(".edit_last_name"); 
        this.#edit.phone = this.#edit.el.querySelector(".edit_phone"); 
        this.setEventListener();
        this.getContact();  
                
    }
    setEventListener() {
        this.#contactListE.addEventListener("click", this.onClick);
        this.#edit.el.querySelector(".save").addEventListener("click", this.onSaveContact);   
    } 
    getContact() {
        this.#http.getAllElements().then((data) => {
            this.#contacts = data;
            this.renderContacts(this.#contacts);            
        });
    }

    renderContacts(contacts) {
        const content = contacts.map((c) => this.createContactElement(c)).join("");
        this.#contactListE.innerHTML = content; 
                       
    }

    createContactElement(contact) {        
        return      `<div class="contact_box" id="${contact.id}">
                        <div class="BTN_container">
                            <div id="BTN_edit" class="edit"></div>
                            <div id="BTN_delete" class="delete"></div>
                        </div>
                        <div class="icon"><img src="./icons/avatar.svg" alt=""></div>
                        <div class="Names">
                            <p class="first_name">${contact.name}</p>
                            <p class="last_name">${contact.lastName}</p>
                        </div>
                        <p class="phone">${contact.phone}</p>                                     
                    </div>`
    }     

    onClick = (e) => {
        const target = e.target;
        if (this.#current.el) {
            this.#current.el.classList.remove(this.#CLASSES.active_element)            
        }
        this.#current.el = e.target.closest(".contact_box");
        if (this.#current.el) {
            this.#current.contact = this.#contacts.find(
                (e) => e.id === this.#current.el.id
            );
        }             
        if(e.target.classList.contains(this.#CLASSES.delete)){
            this.removeContact(this.#current.contact.id)       
            return;
        }        
        if(e.target.classList.contains(this.#CLASSES.edit)){           
            this.editContact(this.#edit.el)           
            return;
        } 
    };
    createContact(name, lastName, phone,){
        const contact = {
            name,
            lastName,
            phone,            
        };
        this.#http.create(contact).then((r) => {
            if(r && r.id) {
                this.#contacts.unshift(r);
                const content = this.createContactElement(r);
                this.#contactListE.insertAdjacentHTML("afterbegin", content);                                          
            }
            console.log(this.createContactElement(r))
        })          
    }

    editContact() {
        this.#edit.el.classList.add(this.#CLASSES.show_edit);  
        this.#current.el.classList.add(this.#CLASSES.active_element)           
        this.#edit.name.value = this.#current.contact.name;
        this.#edit.lastName.value = this.#current.contact.lastName;     
        this.#edit.phone.value = this.#current.contact.phone;              
    }
    onSaveContact = () => {
        this.#current.contact.name = this.#edit.name.value;
        this.#current.contact.lastName = this.#edit.lastName.value;
        this.#current.contact.phone = this.#edit.phone.value;
        this.#http.update(this.#current.contact.id, this.#current.contact).then((r) => {
            if(r && r.id){
                this.#current.el.querySelector(".first_name").innerHTML = r.name;
                this.#current.el.querySelector(".last_name").innerHTML = r.lastName;
                this.#current.el.querySelector(".phone").innerHTML = r.phone;

                this.#edit.el.classList.remove(this.#CLASSES.show_edit);   
                this.#current.el.classList.remove(this.#CLASSES.active_element);
                this.clearDate();                 
            }
        })
    }
    removeContact(id) {
       this.#http.delete(id).then((r) => {
            if(r.deletedCount >= 1) {
                this.#contacts = this.#contacts.filter((c) => c.id !== id);
                this.#current.el.remove();
                this.clearDate();
            }
        });
    }
    clearDate() {     
        this.#current.el = null;  
        this.#current.contact = null;          
    }
    

}



