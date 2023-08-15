$(() => {
  $("#menu-penyerahan_dokumen").addClass("active");
});

// b_gedung_baru
$(document).ready(function() {
  var table = $('#table-pbg').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-pbg_wrapper .col-md-6:eq(0)' );
} );

// b_eksisting
$(document).ready(function() {
  var table = $('#table-slf_b_gedung_baru').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-slf_b_gedung_baru_wrapper .col-md-6:eq(0)' );
} );

// b_prasarana_baru
$(document).ready(function() {
  var table = $('#table-b_eksisting').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-b_eksisting_wrapper .col-md-6:eq(0)' );
} );
