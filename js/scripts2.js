// Business Logic

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}


AddressBook.prototype.addContact = function(contact) {
contact.id = this.assignId();
this.contacts.push(contact);
}

AddressBook.prototype.addContact = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (let i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (let i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface
 let addressBook = new AddressBook();

 function displayContactDetails(addressBookToDisplay) {
   let contactsList = $("ul#contacts");
   let htmlForContactInfo = "";
   addressBookToDisplay.contacts.forEach(function(contact) {
     htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";

   });
   contactsList.html(htmlForContactInfo);
 };

 function showContact(contactId) {
   let contact = addressBook.findContact(contactId);
   $("#show-contact").fadeIn();
   $(".first-name").html(contact.firstName);
   $(".last-name").html(contact.lastName);
   $(".phone-number").html(contact.phoneNumber);
   let buttons = $("#buttons");
   buttons.empty();
   buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
 }

 function attachContactListeners() {
   $("ul#contacts").on("click", "li", function() {
     showContact(this.id);
   });
   $("#buttons").on("click", ".deleteButton", function() {
     addressBook.deleteContact(this.id);
     $("#show-contact").fadeOut();
     displayContactDetails(addressBook);
   });
 };
$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {

  event.preventDefault();
  let inputtedFirstName = $("input#new-first-name").val();
  let inputtedLastName = $("input#new-last-name").val();
  let inputtedPhoneNumber = $("input#new-phoneNumber").val();
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  addressBook.addContact(newContact);
  displayContactDetails(addressBook);

  })
})
