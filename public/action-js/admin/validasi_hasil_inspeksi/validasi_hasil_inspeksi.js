$(() => {
  $("#menu-validasi").addClass("active");
  $("#submenu-validasi_inspek").addClass("active");
});

// b_gedung_baru
$(document).ready(function() {
  var table = $('#table-b_gedung_baru').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-b_gedung_baru_wrapper .col-md-6:eq(0)' );
} );

// b_prasarana_baru
$(document).ready(function() {
  var table = $('#table-b_prasarana_baru').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-b_prasarana_baru_wrapper .col-md-6:eq(0)' );
} );
