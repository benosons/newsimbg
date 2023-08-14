$(() => {
  $("#menu-pengawas_teknis").addClass("active");
  $("#submenu-pengawas_pupr").addClass("active");
  $("#isubmenu-penugasan_tpa_tpt").addClass("active");
});

$(document).ready(function() {
  var table = $('#table-tpa_tpt').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-tpa_tpt_wrapper .col-md-6:eq(0)' );
} );

$(document).ready(function() {
  var table = $('#table-penjadwalan_konsultasi').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#table-penjadwalan_konsultasi_wrapper .col-md-6:eq(0)' );
} );