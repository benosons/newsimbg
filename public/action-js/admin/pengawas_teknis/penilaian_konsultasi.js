$(() => {
  // $("#menu-pengawas_teknis").addClass("active");
  $("#menu-hasil_konsultasi").addClass("active");
});

$(document).ready(function () {
  var table = $("#table-hasil_konsultasi").DataTable({
    lengthChange: false,
    buttons: ["excel", "pdf"],
  });

  table
    .buttons()
    .container()
    .appendTo("#table-hasil_konsultasi_wrapper .col-md-6:eq(0)");
});

$(document).ready(function () {
  var table = $("#table-perhitungan_retribusi").DataTable({
    lengthChange: false,
    buttons: ["excel", "pdf"],
  });

  table
    .buttons()
    .container()
    .appendTo("#table-perhitungan_retribusi_wrapper .col-md-6:eq(0)");
});
