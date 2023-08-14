$(() => {
  $("#menu-validasi_rekom").addClass("active");
});

$(document).ready(function() {
  var table = $('#table-penugasan_inspeksi').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-penugasan_inspeksi_wrapper .col-md-6:eq(0)' );
} );

$(document).ready(function() {
  var table = $('#table-input_hasil_inspeksi').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-input_hasil_inspeksi_wrapper .col-md-6:eq(0)' );
} );