//TEST
var Contacts = {

  getContacts: function() {
    $.getJSON('/contacts', Contacts.processContacts);
  },


  processContacts: function(data) {
    console.log(data);
    var table = $("#contacts").find('tbody').empty();
    $.each(data, function(index, contact) {
      var tr = $("<tr>").appendTo(table);
      $("<td>").text(contact.name).appendTo(tr);
      $("<td>").text(contact.email).appendTo(tr);
    });
    $("#results").removeClass('hide');
  },


  deleteContacts: function() {
    var deleteContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    $.post('/contacts/:id/delete', deleteContact, Contacts.getContacts);
  },

  searchContacts: function() {
    var findContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    $.getJSON('/contacts/:id', findContact, Contacts.processContacts);
  },


  addContact: function() {
    var newContact = {
      name: $("input[name=name]").val(),
      email: $("input[name=email]").val()
    };

    $.post('/contacts/create', newContact, Contacts.addedContact, 'json');
  },


  addedContact: function(data) {
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
