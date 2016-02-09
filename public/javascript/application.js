// This is an object literal which is going to hold all of my clown data,
// event handlers and callback functions.
var Contacts = {

  names: ['Name1', 'Name2'],

  emails: ['orange', 'green'],

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
      $("<td>").text(contact.hair).appendTo(tr);
      $("<td>").text(contact.gimmick).appendTo(tr);
    });
    //Shows the results once it has all been assembled
    $("#results").removeClass('hide');
  },


  addContact: function() {
    //Callback function for the Add Clown button
    var newContact = {
      name: Contacts.names.sample(),
      email: Contacts.emails.sample()
    };

    //Fourth parameter here is the expected data type from the server.
    $.post('/contactss/create', newContact, Contacts.addedContact, 'json');
  },


  addedContact: function(data) {
    //Again, the 'data' param is the JSON data from the server
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
  $("#makeContact").on('click', Contacts.addContact);
});
