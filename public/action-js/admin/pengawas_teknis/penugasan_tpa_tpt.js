$(() => {
  $("#menu-pengawas_teknis").addClass("active");
  $("#submenu-pengawas_pupr").addClass("active");
  $("#isubmenu-penugasan_tpa_tpt").addClass("active");
});

$(document).ready(function() {
  var table = $('#example2').DataTable( {
    lengthChange: false,
    buttons: ['excel', 'pdf']
  } );
  
  table.buttons().container()
    .appendTo( '#example2_wrapper .col-md-6:eq(0)' );
} );