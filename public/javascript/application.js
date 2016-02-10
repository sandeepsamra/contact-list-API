// This is an object literal which is going to hold all of my contact data,
// event handlers and callback functions.
var Contacts = {

  names: [],

  emails: [],

  getContacts: function() {
    //Performing a GET request and expecting JSON data
    $.getJSON('/contacts', Contacts.processContacts);
  },


  processContacts: function(data) {
    //The data param in this function is the JSON data
    //returned from the server
    var table = $("#contacts").find('tbody').empty();
    //Calling .empty() allows us to 'reset' the table each time
    $.each(data, function(index, contact) {
      var tr = $("<tr>").appendTo(table);
      $("<td>").text(contact.name).appendTo(tr);
      $("<td>").text(contact.email).appendTo(tr);
      //add delete button
    });
    //Shows the results once it has all been assembled
    $("#results").removeClass('hide');
  },


  deleteContacts: function() {
    var deleteContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    $.getJSON('/contacts/:id/delete', deleteContact);
  },

  searchContacts: function() {
    var findContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    $.getJSON('/contacts/:id', findContact, Contacts.processContacts);
  },


  addContact: function() {
    //Callback function for the Add Contact button
    var newContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    //Fourth parameter here is the expected data type from the server.
    $.post('/contacts/create', newContact, Contacts.addedContact, 'json');
  },


  addedContact: function(data) {
    //The 'data' param is the JSON data from the server
    if (data.result) {
      Contacts.getContacts();
    }
    else {
      alert("You screwed something up.");
    }
  }
};


$(function() {
  $("#getContacts").on('click', Contacts.getContacts);
  $("#makeContacts").on('click', Contacts.addContact);
  $("#searchContacts").on('click', Contacts.searchContacts);
  $("#deleteContacts").on('click', Contacts.deleteContacts);
});
