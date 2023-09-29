$(() => {
  $("#menu-permohonan").addClass("active");
});

$(document).ready(function () {
  var seleprov = $("#id_nama_provinsi").select2({
    dropdownParent: $("#modal-pemilik"),
    theme: "bootstrap-5",
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
    placeholder: $(this).data("placeholder"),
  });
  var selekab = $("#id_nama_kabkota").select2({
    dropdownParent: $("#modal-pemilik"),
    theme: "bootstrap-5",
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
    placeholder: $(this).data("placeholder"),
  });
  var selekec = $("#id_nama_kecamatan").select2({
    dropdownParent: $("#modal-pemilik"),
    theme: "bootstrap-5",
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
    placeholder: $(this).data("placeholder"),
  });
  var selekel = $("#id_nama_kelurahan").select2({
    dropdownParent: $("#modal-pemilik"),
    theme: "bootstrap-5",
    width: $(this).data("width")
      ? $(this).data("width")
      : $(this).hasClass("w-100")
      ? "100%"
      : "style",
    placeholder: $(this).data("placeholder"),
  });
  // var table = $('#example2').DataTable( {
  //   lengthChange: false,
  //   buttons: ['excel', 'pdf']
  // } );

  // table.buttons().container()
  //   .appendTo( '#example2_wrapper .col-md-6:eq(0)' );
  loadpermohonan();
  // $('#is_id').val(563816)
  // nextdokumen()
  // getDataJnsKonsultasi(563806)
  if (data_profile) {
    if (data_profile["id_provinsi"]) {
      $("#id_nama_provinsi")
        .val(data_profile["id_provinsi"])
        .trigger("change.select2");
    }
  }

  $("#jns_pemilik").on("change", function () {
    $(".jns").hide();
    if (this.value == "1") {
      $(".is-pemerintah").show();
    } else if (this.value == "3") {
      $(".is-perorangan").show();
    }
  });

  $("#jenis_id").on("change", function () {
    if (this.value == 1) {
      $("#is-ktp").show();
      $("#is-kitas").hide();
    } else {
      $("#is-ktp").hide();
      $("#is-kitas").show();
    }
  });
});

stepper1 = new Stepper(document.querySelector("#stepper1"));

function loadpermohonan() {
  $("#all-permohonan").DataTable({
    processing: true,
    serverSide: true,
    dom:
      "<'row'" +
      "<'col-sm-6 d-flex align-items-center justify-conten-start'l>" +
      "<'col-sm-6 d-flex align-items-center justify-content-end'f>" +
      ">" +
      "<'table-responsive'tr>" +
      "<'row'" +
      "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i>" +
      "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
      ">",
    ajax: {
      url: "getallpermohonan",
      type: "POST",
    },
    order: [[0, "ASC"]],
    columns: [
      { data: "id" },
      { data: "nm_konsultasi" },
      { data: "nm_pemilik" },
      { data: "no_konsultasi" },
      { data: "almt_bgn" },
      { data: "status_pemohon" },
      { data: "id" },
    ],
    aoColumnDefs: [
      {
        mRender: function (data, type, row) {
          var elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">${data}</span>`;

          return elem;
        },
        aTargets: [5],
      },
      {
        mRender: function (data, type, row) {
          if (row.status == 1) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
                          <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="actionlanjutkan(${row.id})"><i class="bx bx-file me-0 fs-6"></i></button>
                          <button type="button" class="btn btn-primary btn-sm btn-icon"><i class="bx bx-edit me-0 fs-6"></i></button>
                          <button type="button" class="btn btn-danger btn-sm btn-icon" onclick="action('delete', ${row.id_permohonan_slf})"><i class="bx bx-trash me-0 fs-6"></i></button>
                        </div>`;
          } else if (row.status == 3) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
                          <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                          
                        </div>`;
          } else if (row.status == 4) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
                          <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                          
                        </div>`;
          } else {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
                          <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="actionlanjutkan('${row.id}')"><i class="bx bx-file me-0 fs-6"></i></button>
                          <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
                        </div>`;
          }
          return elem;
        },
        aTargets: [6],
      },
      {
        render: function (data, type, full, meta) {
          return "<div class='text-wrap width-200'>" + data + "</div>";
        },
        targets: [1, 4],
      },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var index = iDisplayIndexFull + 1;
      $("td:eq(0)", nRow).html("#" + index);
      return index;
    },
    lengthChange: false,
  });
  // $.ajax({
  //   type: "post",
  //   dataType: "json",
  //   url: "/getallpermohonan",
  //   success: function (result) {
  //     let data = result.data;
  //     let code = result.code;
  //     var dt = $("#example2").DataTable({
  //         dom: "<'row'" +
  //                 "<'col-sm-6 d-flex align-items-center justify-conten-start'l>" +
  //                 "<'col-sm-6 d-flex align-items-center justify-content-end'f>" +
  //                 ">" +

  //                 "<'table-responsive'tr>" +

  //                 "<'row'" +
  //                 "<'col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'i>" +
  //                 "<'col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'p>" +
  //                 ">",
  //         destroy: true,
  //         paging: true,
  //         lengthChange: false,
  //         searching: true,
  //         ordering: true,
  //         info: true,
  //         autoWidth: false,
  //         responsive: false,
  //         pageLength: 10,
  //         aaData: result.data,
  //         aoColumns: [
  //           { mDataProp: "id", class: 'text-center', width: "2%" },
  //           { mDataProp: "nm_jns_permohonan",class: 'text-center' },
  //           { mDataProp: "nama_pemilik" },
  //           { mDataProp: "no_registrasi",class: 'text-center' },
  //           { mDataProp: "address", width: "3%" },
  //           { mDataProp: "status", width: "2%", class: 'text-center' },
  //           { mDataProp: "id", width: "10%", class: 'text-center' },
  //         ],
  //         order: [[0, "ASC"]],
  //         fixedColumns: true,
  //         aoColumnDefs: [
  //             {
  //             mRender: function (data, type, row) {
  //               var elem = ''
  //               if(data == 1){
  //                 elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Input Permohonan</span>`
  //               }else if (data == 3){
  //                 elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`
  //               }else if (data == 4){
  //                 elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Ditolak</span>`
  //               }else{
  //                 elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Diproses</span>`
  //               }
  //               return elem ;
  //             },
  //             aTargets: [5],
  //           },
  //             {
  //             mRender: function (data, type, row) {
  //               if(row.status == 1){
  //               var elem = `<div class="btn-group" role="group" aria-label="First group">
  //                             <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
  //                             <button type="button" class="btn btn-danger btn-sm btn-icon" onclick="action('delete', ${row.id_permohonan_slf})"><i class="bx bx-trash me-0 fs-6"></i></button>
  //                           </div>`
  //               }else if (row.status == 3){
  //                 var elem = `<div class="btn-group" role="group" aria-label="First group">
  //                             <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>

  //                           </div>`
  //               }else if (row.status == 4){
  //                 var elem = `<div class="btn-group" role="group" aria-label="First group">
  //                             <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>

  //                           </div>`
  //               }else{
  //                 var elem = `<div class="btn-group" role="group" aria-label="First group">
  //                             <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
  //                             <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
  //                           </div>`
  //               }
  //               return elem ;
  //             },
  //             aTargets: [6],
  //           }
  //         ],
  //         fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
  //           var index = iDisplayIndexFull + 1;
  //           $("td:eq(0)", nRow).html("#" + index);
  //           return index;
  //         },
  //         fnDrawCallback: function () {
  //           $(".update_status").change(function () {
  //             action("update", this.value, this.checked);
  //           });
  //         },
  //         fnInitComplete: function () {
  //           var that = this;
  //           var td;
  //           var tr;
  //           this.$("td").click(function () {
  //             td = this;
  //           });
  //           this.$("tr").click(function () {
  //             tr = this;
  //           });
  //         },
  //     });
  //   },
  // });
}

$("#id_fungsi_bg").on("change", function () {
  // alert( this.value );

  var id = this.value;

  $("#id_jns_bg option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonjbg",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#id_jns_bg").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id"] +
          `">` +
          data[x]["nm_jenis_bg"] +
          `</option>`;
        $("#id_jns_bg").append(valx);
      }
    },
  });
});

$("#tmb-prov").on("change", function () {
  // alert( this.value );

  var id = this.value;

  $("#tmb-kabkot option").remove();
  $("#tmb-kecamatan option").remove();
  $("#tmb-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkabkot",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-kabkot").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kabkot"] +
          `">` +
          data[x]["nama_kabkota"] +
          `</option>`;
        $("#tmb-kabkot").append(valx);
      }
    },
  });
});

$("#tmb-kabkot").on("change", function () {
  // alert( this.value );

  var id = this.value;

  // $('#tmb-kabkot option').remove();
  $("#tmb-kecamatan option").remove();
  $("#tmb-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkec",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-kecamatan").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kecamatan"] +
          `">` +
          data[x]["nama_kecamatan"] +
          `</option>`;
        $("#tmb-kecamatan").append(valx);
      }
    },
  });
});

$("#tmb-kecamatan").on("change", function () {
  // alert( this.value );

  var id = this.value;

  // $('#tmb-kabkot option').remove();
  // $('#tmb-kecamatan option').remove();
  $("#tmb-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkel",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-kelurahan").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kelurahan"] +
          `">` +
          data[x]["nama_kelurahan"] +
          `</option>`;
        $("#tmb-kelurahan").append(valx);
      }
    },
  });
});

$("#tmb-dapem-prov").on("change", function () {
  // alert( this.value );

  var id = this.value;

  $("#tmb-dapem-kabkot option").remove();
  $("#tmb-dapem-kecamatan option").remove();
  $("#tmb-dapem-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkabkot",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-dapem-kabkot").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kabkot"] +
          `">` +
          data[x]["nama_kabkota"] +
          `</option>`;
        $("#tmb-dapem-kabkot").append(valx);
      }
    },
  });
});

$("#tmb-dapem-kabkot").on("change", function () {
  // alert( this.value );

  var id = this.value;

  // $('#tmb-dapem-kabkot option').remove();
  $("#tmb-dapem-kecamatan option").remove();
  $("#tmb-dapem-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkec",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-dapem-kecamatan").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kecamatan"] +
          `">` +
          data[x]["nama_kecamatan"] +
          `</option>`;
        $("#tmb-dapem-kecamatan").append(valx);
      }
    },
  });
});

$("#tmb-dapem-kecamatan").on("change", function () {
  // alert( this.value );

  var id = this.value;

  // $('#tmb-dapem-kabkot option').remove();
  // $('#tmb-dapem-kecamatan option').remove();
  $("#tmb-dapem-kelurahan option").remove();

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsonkel",
    data: {
      id: id,
    },
    success: function (result) {
      var data = result.data;
      // console.log(data)
      var val0 = '<option value="0" selected="">Pilih...</option>';
      $("#tmb-dapem-kelurahan").append(val0);
      for (x in data) {
        // console.log(data[x])
        var valx =
          `<option value="` +
          data[x]["id_kelurahan"] +
          `">` +
          data[x]["nama_kelurahan"] +
          `</option>`;
        $("#tmb-dapem-kelurahan").append(valx);
      }
    },
  });
});

$("#form_permohonan").on(
  "keyup change paste",
  "input, select, textarea",
  function () {
    if (
      $("#tmb-jenis_permohonan :selected").val() != 0 &&
      $("#tmb-fungsi_bangunan :selected").val() != 0 &&
      $("#tmb-jenis_bangunan :selected").val() != undefined &&
      $("#tmb-nama_bangunan").val() != "" &&
      $("#tmb-luas_bangunan").val() != "" &&
      $("#tmb-jumlah_lantai").val() != "" &&
      $("#tmb-tinggi_bangunan").val() != "" &&
      $("#tmb-prov :selected").val() != 0 &&
      $("#tmb-kabkot :selected").val() != undefined &&
      $("#tmb-kecamatan :selected").val() != undefined &&
      $("#tmb-kelurahan :selected").val() != undefined &&
      $("#tmb-alamat").val() != ""
    ) {
      $("#btn-perm_val_1").prop("disabled", false);
    } else {
      $("#btn-perm_val_1").prop("disabled", true);
    }

    if (
      $("#tmb-dapem-status_kepemilikan :selected").val() != 0 &&
      $("#tmb-dapem-jenis_tanda_pengenal :selected").val() != 0 &&
      $("#tmb-dapem-nama_pemilik").val() != "" &&
      $("#tmb-dapem-no_ktp").val() != "" &&
      $("#tmb-dapem-prov :selected").val() != 0 &&
      $("#tmb-dapem-kabkot :selected").val() != undefined &&
      $("#tmb-dapem-kecamatan :selected").val() != undefined &&
      $("#tmb-dapem-kelurahan :selected").val() != undefined &&
      $("#tmb-dapem-alamat").val() != "" &&
      $("#tmb-dapem-telp").val() != "" &&
      $("#tmb-dapem-email").val() != ""
    ) {
      $("#btn-perm_val_2").prop("disabled", false);
    } else {
      $("#btn-perm_val_2").prop("disabled", true);
    }

    if (
      $("#tmb-danah-dok_kepemilikan").val() != 0 &&
      $("#tmb-danah-hak_kepemilikan").val() != 0 &&
      $("#tmb-danah-no_dokumen").val() != "" &&
      $("#tmb-danah-luas_tanah").val() != "" &&
      $("#tmb-danah-nama_pemilik").val() != "" &&
      $("#tmb-danah-alamat").val() != "" &&
      $("#tmb-danah-tgl_terbit_dok").val() != ""
    ) {
      $("#btn-perm_val_3").prop("disabled", false);
    } else {
      $("#btn-perm_val_3").prop("disabled", true);
    }

    // $('#btn-perm_val_1').prop('disabled', false);
    // $('#btn-perm_val_2').prop('disabled', false);
    // $('#btn-perm_val_3').prop('disabled', false);
  }
);

$("#btn-sub_add_perm").click(function () {
  // console.log('wajiwajiawjiwjia')
  var alamat_pemilik =
    $("#tmb-dapem-alamat").val() +
    ", " +
    $("#tmb-dapem-kelurahan :selected").text() +
    ", " +
    $("#tmb-dapem-kecamatan :selected").text() +
    ", " +
    $("#tmb-dapem-kabkot :selected").text();
  var lokasi_bg =
    $("#tmb-alamat").val() +
    ", " +
    $("#tmb-kelurahan :selected").text() +
    ", " +
    $("#tmb-kecamatan :selected").text() +
    ", " +
    $("#tmb-kabkot :selected").text();

  $("#pernyataan-jenis_konsul").html(
    $("#tmb-jenis_permohonan :selected").text()
  );
  $("#pernyataan-nama_pemilik").html($("#tmb-dapem-nama_pemilik").val());
  $("#pernyataan-alamat_pemilik").html(alamat_pemilik);
  $("#pernyataan-lokasi_bangunan").html(lokasi_bg);

  $("#pernyataan-data_luas").html($("#tmb-luas_bangunan").val());
  $("#pernyataan-data_tinggi").html($("#tmb-tinggi_bangunan").val());
  $("#pernyataan-data_lantai").html($("#tmb-jumlah_lantai").val());
});

// if($('#check-semua_persyaratan').prop('checked', true)){
//     $('#submit-add-permohonan').prop('disabled', false);
// } else{
//     $('#submit-add-permohonan').prop('disabled', true);
// }

var checkBox1 = document.getElementById("check-krk_kkpr");
var checkBox2 = document.getElementById("check-pelaksana_konstruksi");
var checkBox3 = document.getElementById("check-pengawas_berserti");
var checkBox4 = document.getElementById("check-tidak_sengketa");
var checkBox5 = document.getElementById("check-tahan_gempa");
var checkBoxdone = document.getElementById("check-semua_persyaratan");

$(".checkval").change(function () {
  // console.log('aijwijawijwaij')
  if (
    checkBoxdone.checked == true &&
    checkBox1.checked == true &&
    checkBox2.checked == true &&
    checkBox3.checked == true &&
    checkBox4.checked == true &&
    checkBox5.checked == true
  ) {
    // console.log('123141')
    $("#submit-add-permohonan").prop("disabled", false);
  } else {
    $("#submit-add-permohonan").prop("disabled", true);
  }
});

$("#submit-add-permohonan").click(function () {
  // let isObject         = {};

  // isObject.id_jenis_permohonan            = $('#tmb-jenis_permohonan :selected').val()
  // isObject.id_fungsi_bg                   = $('#tmb-fungsi_bangunan :selected').val()
  // isObject.id_jenis_bg                    = $('#tmb-jenis_bangunan :selected').val()
  // isObject.nama_bg                        = $('#tmb-nama_bangunan').val()
  // isObject.luas_bg                        = $('#tmb-luas_bangunan').val()
  // isObject.jml_lantai_bg                  = $('#tmb-jumlah_lantai').val()
  // isObject.tinggi_bg                      = $('#tmb-tinggi_bangunan').val()
  // isObject.luas_basement_bg               = $('#tmb-luas_basement').val()
  // isObject.jml_lantai_basement_bg         = $('#tmb-jml_lantai_basement').val()
  // isObject.perencana_dok_teknis           = $('#tmb-perancangan_dok_teknis').text()
  // isObject.id_prov_bg                     = $('#tmb-prov :selected').val()
  // isObject.id_kabkot_bg                   = $('#tmb-kabkot :selected').val()
  // isObject.id_kec_bg                      = $('#tmb-kecamatan :selected').val()
  // isObject.id_kel_bg                      = $('#tmb-kelurahan :selected').val()
  // isObject.alamat_bg                      = $('#tmb-alamat').val()
  // isObject.id_stat_kepemilikan            = $('#tmb-dapem-status_kepemilikan :selected').val()
  // isObject.id_jenis_tanda_pengenal        = $('#tmb-dapem-jenis_tanda_pengenal :selected').val()
  // isObject.nama_pemilik                   = $('#tmb-dapem-nama_pemilik').val()
  // isObject.no_tanda_pengenal              = $('#tmb-dapem-no_ktp').val()
  // isObject.id_prov_pemilik                = $('#tmb-dapem-prov :selected').val()
  // isObject.id_kabkot_pemilik              = $('#tmb-dapem-kabkot :selected').val()
  // isObject.id_kec_pemilik                 = $('#tmb-dapem-kecamatan :selected').val()
  // isObject.id_kel_pemilik                 = $('#tmb-dapem-kelurahan :selected').val()
  // isObject.alamat_pemilik                 = $('#tmb-dapem-alamat').val()
  // isObject.no_telp_pemilik                = $('#tmb-dapem-telp').val()
  // isObject.email_pemilik                  = $('#tmb-dapem-email').val()
  // isObject.id_jenis_dok_tanah             = $('#tmb-danah-dok_kepemilikan :selected').val()
  // isObject.no_dok_tanah                   = $('#tmb-danah-no_dokumen').val()
  // isObject.tgl_terbit_dok_tanah           = $('#tmb-danah-tgl_terbit_dok').val()
  // isObject.luas_tanah                     = $('#tmb-danah-luas_tanah').val()
  // isObject.id_hak_tanah                   = $('#tmb-danah-hak_kepemilikan :selected').val()
  // isObject.nama_hak_tanah                 = $('#tmb-danah-nama_pemilik').val()
  // isObject.alamat_tanah                   = $('#tmb-danah-alamat').val()
  // isObject.perjanjian_pemanfaatan_tanah   = $('#tmb-danah-ptpt :selected').val()
  // isObject.file_kepemilikan_tanah         =
  // isObject.file_teknis_tanah              =
  // isObject.file_ktp_kitas                 =
  // isObject.file_krk_kkpr                  =
  // isObject.file_penyedia_jasa             =
  // isObject.gmb_situasi                    =
  // isObject.gmb_rencana_tapak              =
  // isObject.gmb_denah                      =
  // isObject.gmb_potongan                   =
  // isObject.gmb_tampak                     =
  // isObject.gmb_det_arsitek                =
  // isObject.gmb_fondasi                    =
  // isObject.gmb_kolom                      =
  // isObject.gmb_balok                      =
  // isObject.gmb_rangka_atap                =
  // isObject.gmb_det_struk                  =
  // isObject.gmb_jaringan_listrik           =
  // isObject.gmb_sistem_sanitasi            =
  // isObject.status                         =
  // isObject.is_deleted                     =
  // isObject.created_date                   =
  // isObject.created_by                     =

  // console.log(isObject)

  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsoncount",
    success: function (result) {
      var data = result.data;
      console.log(data[0]["count(*)"]);
      var parnumber = parseInt(parseInt(data[0]["count(*)"]) + 1);

      var date = new Date();

      var datex =
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear();
      var noreg =
        "PBG-997101-" + datex + "-" + parnumber.toString().padStart(3, "0");

      var strDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      id_jenis_permohonan = $("#tmb-jenis_permohonan :selected").val();
      id_fungsi_bg = $("#tmb-fungsi_bangunan :selected").val();
      id_jenis_bg = $("#tmb-jenis_bangunan :selected").val();
      nama_bg = $("#tmb-nama_bangunan").val();
      luas_bg = $("#tmb-luas_bangunan").val();
      jml_lantai_bg = $("#tmb-jumlah_lantai").val();
      tinggi_bg = $("#tmb-tinggi_bangunan").val();
      luas_basement_bg = $("#tmb-luas_basement").val();
      jml_lantai_basement_bg = $("#tmb-jml_lantai_basement").val();
      perencana_dok_teknis = $("#tmb-perancangan_dok_teknis").val();
      id_prov_bg = $("#tmb-prov :selected").val();
      id_kabkot_bg = $("#tmb-kabkot :selected").val();
      id_kec_bg = $("#tmb-kecamatan :selected").val();
      id_kel_bg = $("#tmb-kelurahan :selected").val();
      alamat_bg = $("#tmb-alamat").val();
      id_stat_kepemilikan = $("#tmb-dapem-status_kepemilikan :selected").val();
      id_jenis_tanda_pengenal = $(
        "#tmb-dapem-jenis_tanda_pengenal :selected"
      ).val();
      nama_pemilik = $("#tmb-dapem-nama_pemilik").val();
      no_tanda_pengenal = $("#tmb-dapem-no_ktp").val();
      id_prov_pemilik = $("#tmb-dapem-prov :selected").val();
      id_kabkot_pemilik = $("#tmb-dapem-kabkot :selected").val();
      id_kec_pemilik = $("#tmb-dapem-kecamatan :selected").val();
      id_kel_pemilik = $("#tmb-dapem-kelurahan :selected").val();
      alamat_pemilik = $("#tmb-dapem-alamat").val();
      no_telp_pemilik = $("#tmb-dapem-telp").val();
      email_pemilik = $("#tmb-dapem-email").val();
      id_jenis_dok_tanah = $("#tmb-danah-dok_kepemilikan :selected").val();
      no_dok_tanah = $("#tmb-danah-no_dokumen").val();
      tgl_terbit_dok_tanah = $("#tmb-danah-tgl_terbit_dok").val();
      luas_tanah = $("#tmb-danah-luas_tanah").val();
      id_hak_tanah = $("#tmb-danah-hak_kepemilikan :selected").val();
      nama_hak_tanah = $("#tmb-danah-nama_pemilik").val();
      alamat_tanah = $("#tmb-danah-alamat").val();
      perjanjian_pemanfaatan_tanah = $("#tmb-danah-ptpt :selected").val();

      $.ajax({
        type: "post",
        dataType: "json",
        url: "/addpermohonan",
        data: {
          id_jenis_permohonan: id_jenis_permohonan,
          id_fungsi_bg: id_fungsi_bg,
          id_jenis_bg: id_jenis_bg,
          nama_bg: nama_bg,
          luas_bg: luas_bg,
          jml_lantai_bg: jml_lantai_bg,
          tinggi_bg: tinggi_bg,
          luas_basement_bg: luas_basement_bg,
          jml_lantai_basement_bg: jml_lantai_basement_bg,
          perencana_dok_teknis: perencana_dok_teknis,
          id_prov_bg: id_prov_bg,
          id_kabkot_bg: id_kabkot_bg,
          id_kec_bg: id_kec_bg,
          id_kel_bg: id_kel_bg,
          alamat_bg: alamat_bg,
          id_stat_kepemilikan: id_stat_kepemilikan,
          id_jenis_tanda_pengenal: id_jenis_tanda_pengenal,
          nama_pemilik: nama_pemilik,
          no_tanda_pengenal: no_tanda_pengenal,
          id_prov_pemilik: id_prov_pemilik,
          id_kabkot_pemilik: id_kabkot_pemilik,
          id_kec_pemilik: id_kec_pemilik,
          id_kel_pemilik: id_kel_pemilik,
          alamat_pemilik: alamat_pemilik,
          no_telp_pemilik: no_telp_pemilik,
          email_pemilik: email_pemilik,
          id_jenis_dok_tanah: id_jenis_dok_tanah,
          no_dok_tanah: no_dok_tanah,
          tgl_terbit_dok_tanah: tgl_terbit_dok_tanah,
          luas_tanah: luas_tanah,
          id_hak_tanah: id_hak_tanah,
          nama_hak_tanah: nama_hak_tanah,
          alamat_tanah: alamat_tanah,
          perjanjian_pemanfaatan_tanah: perjanjian_pemanfaatan_tanah,
          in_date: strDate,
          no_registrasi: noreg,
        },
        success: function (result) {
          // var data = result.data
          // console.log(data)

          Swal.fire({
            html: `Sukses Menambahkan Data`,
            icon: "success",
            buttonsStyling: true,
            cancelButtonText: "Close",
            customClass: {
              cancelButton: "btn btn-success btn-sm",
            },
          }).then((result) => {
            location.reload();
          });
        },
      });
    },
  });
});

function action(mode, id, username) {
  if (mode == "delete") {
    Swal.fire({
      html: `Apakah anda yakin menghapus Data ini?`,
      icon: "warning",
      buttonsStyling: true,
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak",
      customClass: {
        confirmButton: "btn btn-danger btn-sm",
        cancelButton: "btn btn-success btn-sm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // $.ajax({
        //     type: "post",
        //     dataType: "json",
        //     data: {
        //         id: id,
        //         username: username
        //     },
        //     url: "/deleteuser",
        //     success: function (result) {
        //         loadusers()
        //     }
        // })
        location.reload();
      }
    });
  } else if (mode == "update") {
    $("#exampleExtraLargeModal").modal("toggle");
    $("#exampleExtraLargeModal").modal("show");
    // $.ajax({
    //     type: "post",
    //     dataType: "json",
    //     url: "/getuser",
    //     data: {
    //         id: id
    //     },
    //     success: function (result) {
    //         var data = result.data
    //         $('#modal_add_user').modal('show')
    //         $('[name="id"]').val(id)
    //         $('[name="name"]').val(data.name)
    //         $('[name="email"]').val(data.email)
    //         $('[name="username"]').val(data.username)
    //         $('[name="password"]').attr('placeholder', 'kosongkan jika tidak merubah password')
    //         $('#id_role').val(data.id_role)
    //         $('wrd').html('Ubah')
    //     }
    // })
  } else {
    $("#exampleExtraLargeModal2").modal("toggle");
    $("#exampleExtraLargeModal2").modal("show");
  }
}

$("#pilihanLantai").change(function (e) {
  e.preventDefault();
  if (this.checked) {
    $('input[name="lantai_bg"]').show();
    $('select[name="lantai_bg"]').hide();
  } else {
    $('input[name="lantai_bg"]').hide();
    $('select[name="lantai_bg"]').show();
  }
});

$("#pilihanBasement").change(function (e) {
  e.preventDefault();
  if (this.checked) {
    $('input[name="lapis_basement"]').show();
    $('select[name="lapis_basement"]').hide();
  } else {
    $('input[name="lapis_basement"]').hide();
    $('select[name="lapis_basement"]').show();
  }
});

$(".numb").keyup(function () {
  this.value = this.value.replace(/[^0-9\.]/g, "");
});

function cek() {
  var luas_bg = $("#luas_bg").val();
  var lantai_bg = $('[name="lantai_bg"]').val();
  if (luas_bg >= 50000 && lantai_bg >= 4) {
    // alert('Anda masuk ke klas 4 dan 5')
    $("#modal-bgh").modal({
      show: true,
      backdrop: "static",
    });
  } else if (luas_bg >= 5000 && lantai_bg >= 4) {
    $("#modal-bgh").modal({
      show: true,
      backdrop: "static",
    });
    // alert('Anda Masuk ke klas 6, 7 dan 8');
  } else if (luas_bg >= 20000) {
    $("#modal-bgh").modal({
      show: true,
      backdrop: "static",
    });
    // alert('Anda Masuk ke klas 9a');
  } else if (luas_bg >= 10000) {
    $("#modal-bgh").modal({
      show: true,
      backdrop: "static",
    });
    // alert('Anda Masuk ke klas 9b');
  }

  if ($("#id_izin").val() == 1) {
    if ($("#id_fungsi_bg").val() == 1) {
      if (luas_bg <= 100 && lantai_bg <= 2) {
        $("#per_doc_tek").show();
        $("#prototype").hide();

        var select_tek = "";
        var select_tek2 = "";
        var select_tek3 = "";
        var select_tek4 = "";

        var id_doc_tek =
          '<option value="1" ' +
          select_tek +
          ">Disediakan oleh Penyedia Jasa Konstruksi</option>";
        id_doc_tek +=
          '<option value="2" ' +
          select_tek2 +
          ">Menggunakan Desain Prototipe</option>";
        id_doc_tek +=
          '<option value="3" ' +
          select_tek3 +
          ">Mengembangan Desain Prototipe</option>";
        id_doc_tek +=
          '<option value="4" ' +
          select_tek4 +
          ">Desain Berdasarkan Ketetuan Pokok Tahan Gempa</option>";
      } else {
        $("#per_doc_tek").show();
        $("#prototype").hide();
        var id_doc_tek =
          '<option value="1" selected>Disediakan oleh Penyedia Jasa Konstruksi</option>';
      }
    } else {
      $("#per_doc_tek").show();
      $("#prototype").hide();
      var id_doc_tek =
        '<option value="1" selected>Disediakan oleh Penyedia Jasa Konstruksi</option>';
    }

    $("#id_doc_tek").html(id_doc_tek);
  }
}

function set_prototype(v) {
  if (v == 2 || v == 3) {
    document.getElementById("prototype").style.display = "block";
    var select_1 = "";
    var select_2 = "";
    var select_3 = "";

    var id_type = '<option value="1" ' + select_1 + ">Type 36</option>";
    id_type += '<option value="2" ' + select_2 + ">Type 54</option>";
    id_type += '<option value="3" ' + select_3 + ">Type 72</option>";
  } else {
    document.getElementById("prototype").style.display = "none";
  }
  $("#id_prototype").html(id_type);
}

function savepermohonan() {
  var form_data = new FormData();

  form_data.append("id_izin", $("#id_izin").val());
  form_data.append("id_fungsi_bg", $("#id_fungsi_bg").val());
  form_data.append("id_jns_bg", $("#id_jns_bg").val());
  form_data.append("nama_bangunan_prasaran", null);
  form_data.append("id_prasarana_b", null);
  form_data.append("luas_bg", null);
  form_data.append("tinggi_bg", null);
  form_data.append("nama_bangunan =", $("#nama_bangunan").val());
  form_data.append("luas_bg", $("#luas_bg").val());
  form_data.append("lantai_bg", $('[name="lantai_bg"]').val());
  form_data.append("tinggi_bg", $("#tinggi_bg").val());
  form_data.append("luas_basement", $("#luas_basement").val());
  form_data.append("lapis_basement", $('[name="lapis_basement"]').val());
  form_data.append("id_doc_tek", $("#id_doc_tek").val());
  form_data.append("id_prototype", $("#id_prototype").val());

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/savepermohonan",
    data: form_data,
    success: function (result) {
      $("#modal-daftar-pengajuan").modal("hide");
      $("#modal-pemilik").modal("show");

      $("#is_id").val(result.data.id_pemilik);
      $("#id_bgn").val(result.data.id_bangunan);
      // Swal.fire({
      //   html: `Sukses Menambahkan Data`,
      //   icon: "success",
      //   buttonsStyling: true,
      //   cancelButtonText: 'Close',
      //   customClass: {
      //       cancelButton: 'btn btn-success btn-sm'
      //   }
      // }).then((result) => {
      //   // location.reload()
      // })
    },
  });
}

function getwil(param, isThis) {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getwil",
    data: {
      id: isThis.value,
      param: param,
    },
    success: function (result) {
      var data = result.data;
      var valp = '<option value="0" selected="">Pilih...</option>';
      if (param == "kabupaten") {
        $("#id_nama_kecamatan").html(valp);
        $("#id_nama_kelurahan").html(valp);
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kabkot"] +
            `" ${
              data_profile["id_kabkota"] == data[i]["id_kabkot"]
                ? "selected"
                : ""
            }>` +
            data[i]["nama_kabkota"] +
            `</option>`;
        }
        let kabkot = $("#id_nama_kabkota").html(valp);
        if (data_profile["id_kabkota"]) {
          kabkot.trigger("change.select2");
        }
      } else if (param == "kecamatan") {
        $("#id_nama_kelurahan").html(valp);
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kecamatan"] +
            `" ${
              data_profile["id_kecamatan"] == data[i]["id_kecamatan"]
                ? "selected"
                : ""
            } >` +
            data[i]["nama_kecamatan"] +
            `</option>`;
        }
        let kec = $("#id_nama_kecamatan").html(valp);
        if (data_profile["id_kecamatan"]) {
          kec.trigger("change.select2");
        }
      } else if (param == "kelurahan") {
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kelurahan"] +
            `" ${
              data_profile["id_kelurahan"] == data[i]["id_kelurahan"]
                ? "selected"
                : ""
            }>` +
            data[i]["nama_kelurahan"] +
            `</option>`;
        }
        let kel = $("#id_nama_kelurahan").html(valp);
        if (data_profile["id_kelurahan"]) {
          kel.trigger("change.select2");
        }
      }
    },
  });
}

function getwilbangunan(param, isThis) {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getwil",
    data: {
      id: isThis.value,
      param: param,
    },
    success: function (result) {
      var data = result.data;

      var valp = '<option value="0" selected="">Pilih...</option>';
      if (param == "kabupaten") {
        $("#id_nama_kecamatan_bangunan").html(valp);
        $("#id_nama_kelurahan_bangunan").html(valp);
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kabkot"] +
            `" ${
              data_profile["id_kabkota"] == data[i]["id_kabkot"]
                ? "selected"
                : ""
            }>` +
            data[i]["nama_kabkota"] +
            `</option>`;
        }
        let kabkot = $("#id_nama_kabkota_bangunan").html(valp);
      } else if (param == "kecamatan") {
        $("#id_nama_kelurahan_bangunan").html(valp);
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kecamatan"] +
            `" ${
              data_profile["id_kecamatan"] == data[i]["id_kecamatan"]
                ? "selected"
                : ""
            } >` +
            data[i]["nama_kecamatan"] +
            `</option>`;
        }
        let kec = $("#id_nama_kecamatan_bangunan").html(valp);
      } else if (param == "kelurahan") {
        for (let i = 0; i < data.length; i++) {
          valp +=
            `<option value="` +
            data[i]["id_kelurahan"] +
            `" ${
              data_profile["id_kelurahan"] == data[i]["id_kelurahan"]
                ? "selected"
                : ""
            }>` +
            data[i]["nama_kelurahan"] +
            `</option>`;
        }
        let kel = $("#id_nama_kelurahan_bangunan").html(valp);
      }
    },
  });
}

function getpemilik(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getpemilik",
    data: {
      id: id,
    },
    success: function (result) {},
  });
}

function savepemilik() {
  var form_data = new FormData();

  form_data.append("id", $("#is_id").val());
  form_data.append("user_id", $("#user_id").val());
  form_data.append("nm_pemilik", $("#nama_pemilik").val());
  form_data.append("jns_pemilik", $("#jns_pemilik").val());
  form_data.append("glr_depan", $("#glr_depan").val());
  form_data.append("glr_belakang", $("#glr_belakang").val());
  form_data.append("alamat", $("#alamat").val());
  form_data.append("id_provinsi", $("#id_provinsi").val());
  form_data.append("id_kabkota", $("#id_kabkota").val());
  form_data.append("id_kecamatan", $("#id_kecamatan").val());
  form_data.append("id_kelurahan", $("#id_kelurahan").val());
  form_data.append("jenis_id", $("#jenis_id").val());
  form_data.append("no_ktp", $("#no_ktp").val());
  form_data.append("no_kitas", $("#no_kitas").val());
  form_data.append("no_hp", $("#no_hp").val());
  form_data.append("email", $("#email").val());
  form_data.append("unit_organisasi", $("#unit_organisasi").val());

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/savedata",
    data: form_data,
    success: function (result) {
      $("#modal-pemilik").modal("hide");
      $("#modal-alamat").modal("show");
    },
  });
}

function savealamat() {
  var form_data = new FormData();

  form_data.append("id", $("#is_id").val());
  form_data.append("id_prov_bgn", $("#id_nama_provinsi_bangunan").val());
  form_data.append("id_kabkot_bgn", $("#id_nama_kabkota_bangunan").val());
  form_data.append("id_kec_bgn", $("#id_nama_kecamatan_bangunan").val());
  form_data.append("id_kel_bgn", $("#id_nama_kelurahan_bangunan").val());
  form_data.append("almt_bgn", $("#almt_bgn").val());

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/savealamatbangunan",
    data: form_data,
    success: function (result) {
      getDataJnsKonsultasi(result.data);
      // Swal.fire({
      //   html: `Sukses Menambahkan Data`,
      //   icon: "success",
      //   buttonsStyling: true,
      //   cancelButtonText: 'Close',
      //   customClass: {
      //       cancelButton: 'btn btn-success btn-sm'
      //   }
      // }).then((result) => {
      //   // location.reload()
      // })
    },
  });
}

function getDataJnsKonsultasi(ids) {
  var form_data = new FormData();
  form_data.append("id", ids);

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/getdatajnskonsultasi",
    data: form_data,
    success: function (result) {
      let data = result.data;
      let DataBangunan = data.DataBangunan;
      let DataPemilik = data.DataPemilik;
      let DataTanah = data.DataTanah;
      let DataTeknisTanah = data.DataTeknisTanah;
      let DataTkTanah = data.DataTkTanah;

      $("#modal-alamat").modal("hide");
      $("#modal-data-tanah").modal("show");
      $("#nm_konsultasi").html("");
      $("#nm_pemilik").html(result.data.DataPemilik.nm_pemilik);
      $("#alamat_pemilik").html(
        `${DataPemilik["alamat"]}, Kec. ${DataPemilik.nama_kecamatan}, ${DataPemilik.nama_kabkota}, Prov. ${DataPemilik.nama_provinsi}`
      );
      $("#lokasi_gedung").html(
        `${DataBangunan.almt_bgn}, Kel/Desa. ${DataBangunan.nama_kelurahan}, Kec. ${DataBangunan.nama_kecamatan}, ${DataBangunan.nama_kabkota}, Prov. ${DataBangunan.nama_provinsi}`
      );

      $("#lokasi_tanah").val(
        data.alamat_bg
          ? data.alamat_bg
          : DataBangunan.almt_bgn +
              " Kec. " +
              DataBangunan.nama_kecamatan +
              ", " +
              DataBangunan.nama_kabkota +
              ", Prov. " +
              DataBangunan.nama_provinsi
      );
      if (
        DataBangunan.id_jenis_permohonan == "23" ||
        DataBangunan.id_jenis_permohonan == "24" ||
        DataBangunan.id_jenis_permohonan == "26" ||
        DataBangunan.id_jenis_permohonan == "29" ||
        DataBangunan.id_jenis_permohonan == "35" ||
        DataBangunan.id_jenis_permohonan == "36" ||
        DataBangunan.id_jenis_permohonan == "14"
      ) {
        $("#jenis-permohonannya").hide();
      } else {
        $("#jenis-permohonannya").show();
      }
      let no = 1;
      let bodytnh = "";
      let bdy = "";

      DataTkTanah.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let btn = "";
        let idutama = "";
        let id_detail_persyaratan = "";
        DataTeknisTanah.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;
          if (ele.id_persyaratan == 1) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
              id_teknis = element.id_detail;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                  <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          }, 1)"><i class="bx bx-trash"></i></button>
                </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '1', '${element.id_detail}', '${id_teknis}', '${
            element.nm_dokumen
          }')">`;
        }
        bdy += `<tr class="">
                <td align="center">${no++}</td>
                <td align="left">${element.nm_dokumen}</td>
                <td align="left">${element.keterangan}</td>
                <td align="center" id="upload_${element.id_detail}">
                ${btn}
                </td>
              </tr>`;
      });

      $("#tk-bdy").html(bdy);

      DataTanah.forEach((element) => {
        $bodytnh += `<tr class="">
                      <td align="center">${no++}</td>
                      <td align="left">${element.id_dokumen}</td>
                      <td align="left">${element.no_dok}${
          element.tanggal_dok
        }</td>
                      <td align="left">${element.luas_tanah}</td>
                      <td align="left">${element.atas_nama_dok}</td>
                      <td align="left"><a href="javascript:void(0);" onclick="javascript:popWin('./object-storage/dekill/Earth/${
                        element.dir_file
                      }')" class="btn default btn-xs blue-stripe">Lihat</a></td>
                      <td align="left"><a href="javascript:void(0);" onclick="javascript:popWin('./object-storage/dekill/Earth/${
                        element.dir_file_phat
                      }')" class="btn default btn-xs blue-stripe">Lihat</a></td>
                      <td align="center">
                      <a href="./Konsultasi/removeDataTanah/element.id_detail/element.id" class="btn btn-danger btn-sm" onclick="return confirm('Yakin Hapus Data ini?')" title="Hapus Data"><span class="glyphicon glyphicon-trash"></span></a>
                      </td>
                    </tr>`;
      });

      $("#dt-tanah-bdy").html(bodytnh);
    },
  });
}
$(".izinjing").hide();
function set_status_izin_pemanfaatan(v) {
  if (v == "1") {
    $(".izinjing").show();
  } else {
    $(".izinjing").hide();
  }
}

function tambahdatatanah() {
  let visible = $("#data-tanah").is(":visible");
  $("#form-tambah-tanah")[0].reset();
  if (visible == true) {
    $("#data-tanah").hide();
  } else {
    $("#data-tanah").show();
  }
}

function savedatatanah() {
  var form_data = new FormData();

  form_data.append("id", $("#is_id").val());
  // form_data.append('nama_provinsi', $('#nama_provinsi').val())
  // form_data.append('nama_kecamatan', $('#nama_kecamatan').val())
  // form_data.append('nama_kabkota', $('#nama_kabkota').val())
  form_data.append("id_dokumen", $("#id_dokumen").val());
  form_data.append("nomor_dokumen", $("#nomor_dokumen").val());
  form_data.append("tgl_terbit_dokumen", $("#tgl_terbit_dokumen").val());
  form_data.append("luas_tanah", $("#luas_tanah").val());
  form_data.append("hat", $("#hat").val());
  form_data.append("atas_nama", $("#atas_nama").val());
  form_data.append("lokasi_tanah", $("#lokasi_tanah").val());
  form_data.append("hat2", $("#hat2").val());
  form_data.append(
    "no_dok_izin_pemanfaatan",
    $("#no_dok_izin_pemanfaatan").val()
  );
  form_data.append("tgl_terbit_phat", $("#tgl_terbit_phat").val());
  form_data.append("nama_penerima_kuasa", $("#nama_penerima_kuasa").val());
  form_data.append("dir_file_tan", $("#d_file_tan")[0].files[0]);
  form_data.append("dir_file_phat", $("#d_file_phat")[0].files[0]);

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/saveTanah",
    data: form_data,
    success: function (result) {
      $("#form-tambah-tanah")[0].reset();
      let data = result.data;
      let bodytnh = "";
      let no = 1;
      let dok = [
        "-",
        "Sertifikat",
        "Akte Jual Beli",
        "Girik",
        "Petuk",
        "Bukti Lain - Lain",
      ];
      data.forEach((element) => {
        bodytnh += `<tr class="">
                          <td align="center">${no++}</td>
                          <td align="left">${dok[element.id_dokumen]}</td>
                          <td align="left">${element.no_dok} || ${
          element.tanggal_dok
        }</td>
                          <td align="left">${element.luas_tanah}</td>
                          <td align="left">${element.atas_nama_dok}</td>
                          <td align="left"><a href="./object-storage/dekill/Earth/${
                            element.dir_file
                          }" target="_blank" class="btn btn-default btn-sm blue-stripe">Lihat</a></td>
                          <td align="left"><a href="./object-storage/dekill/Earth/${
                            element.dir_file_phat
                          }" target="_blank" class="btn btn-default btn-sm blue-stripe">Lihat</a></td>
                          <td align="center">
                          <a href="./Konsultasi/removeDataTanah/element.id_detail/element.id" class="btn btn-danger btn-sm" onclick="return confirm('Yakin Hapus Data ini?')" title="Hapus Data"><span class="bx bx-trash"></span></a>
                          </td>
                        </tr>`;
      });

      $("#dt-tanah-bdy").html(bodytnh);
    },
  });
}

function nextdokumen() {
  $("#modal-data-tanah").modal("hide");
  $("#modal-data-kelengkapan").modal("show");
  var form_data = new FormData();
  form_data.append("id", $("#is_id").val());
  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/getdatadokumen",
    data: form_data,
    success: function (result) {
      let data = result.data;
      let DataFile = data.DataFile;
      let DataTkTanah = data.DataTkTanah;
      let DokumenUmum = data.DokumenUmum;
      let DataArsitektur = data.DataArsitektur;
      let DataStruktur = data.DataStruktur;
      let DataMPE = data.DataMPE;
      let no = 1;
      let no1 = 1;
      let no2 = 1;
      let no3 = 1;
      let no4 = 1;

      let opt_tanah = "";
      let opt_umum = "";
      let opt_arsi = "";
      let opt_struk = "";
      let opt_mep = "";

      DataTkTanah.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let btn = "";
        let idutama = "";
        let id_detail_persyaratan = "";
        DataFile.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;
          if (ele.id_persyaratan == 1) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
              id_teknis = element.id_detail;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                      <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                      <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          })"><i class="bx bx-trash"></i></button>
                    </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '1', '${element.id_detail}', '${id_teknis}', '${
            element.nm_dokumen
          }')">`;
        }
        opt_tanah += `<tr class="<?= $clss ?>">
                      <td align="center">${no++}</td>
                      <td align="left">${element.nm_dokumen}</td>
                      <td align="left">${
                        element.keterangan ? element.keterangan : ""
                      }</td>
                      <td align="center" id="upload_${element.id_detail}">
                        ${btn}
                      </td>
                    </tr>`;
      });

      DokumenUmum.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let btn = "";
        let idutama = "";
        let id_detail_persyaratan = "";
        DataFile.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;
          if (ele.id_persyaratan == 5) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
              id_teknis = element.id_detail;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                      <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                      <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          })"><i class="bx bx-trash"></i></button>
                    </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '5', '${element.id_detail}', '${id_teknis}', '${
            element.nm_dokumen
          }')">`;
        }
        opt_umum += `<tr class="<?= $clss ?>">
                      <td align="center">${no1++}</td>
                      <td align="left">${element.nm_dokumen}</td>
                      <td align="left">${
                        element.keterangan ? element.keterangan : ""
                      }</td>
                      <td align="center" id="upload_${element.id_detail}">
                        ${btn}
                      </td>
                    </tr>`;
      });

      DataArsitektur.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let idutama = "";
        let id_detail_persyaratan = "";

        DataFile.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;

          if (ele.id_persyaratan == 2) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });

        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                      <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                      <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          })"><i class="bx bx-trash"></i></button>
                    </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '2', '${element.id_detail}', '${id_teknis}')">`;
        }

        opt_arsi += `<tr class="<?= $clss ?>">
                      <td align="center">${no2++}</td>
                      <td align="left">${element.nm_dokumen}</td>
                      <td align="left">${
                        element.keterangan ? element.keterangan : ""
                      }</td>
                      <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                      </td>
                    </tr>`;
      });

      DataStruktur.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let idutama = "";
        let id_detail_persyaratan = "";

        DataFile.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;

          if (ele.id_persyaratan == 3) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                      <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                      <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          })"><i class="bx bx-trash"></i></button>
                    </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '3', '${element.id_detail}', '${id_teknis}')">`;
        }
        opt_struk += `<tr class="<?= $clss ?>">
                      <td align="center">${no3++}</td>
                      <td align="left">${element.nm_dokumen}</td>
                      <td align="left">${
                        element.keterangan ? element.keterangan : ""
                      }</td>
                      <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                      </td>
                    </tr>`;
      });

      DataMPE.forEach((element) => {
        let id_teknis = "";
        let dir_file = "";
        let idutama = "";
        let id_detail_persyaratan = "";

        DataFile.forEach((ele) => {
          idutama = ele.id;
          id_detail_persyaratan = ele.id_detail;

          if (ele.id_persyaratan == 4) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                      <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                      <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${dir_file}', '${$(
            "#is_id"
          ).val()}', '${element.id_detail}', ${id_detail_persyaratan} , ${
            element.id_detail
          })"><i class="bx bx-trash"></i></button>
                    </div>`;
        } else {
          btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, '${$(
            "#is_id"
          ).val()}', '4', '${element.id_detail}', '${id_teknis}')">`;
        }
        opt_mep += `<tr class="<?= $clss ?>">
                      <td align="center">${no4++}</td>
                      <td align="left">${element.nm_dokumen}</td>
                      <td align="left">${
                        element.keterangan ? element.keterangan : ""
                      }</td>
                      <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                      </td>
                    </tr>`;
      });

      $("#body-tanah").html(opt_tanah);
      $("#body-umum").html(opt_umum);
      $("#body-arsitek").html(opt_arsi);
      $("#body-struktur").html(opt_struk);
      $("#body-mep").html(opt_mep);
    },
  });
}

function savedok(isthis, idutama, kategori, id_detail, teknis, nm) {
  var form_data = new FormData();
  form_data.append("id", idutama);
  form_data.append("id_syarat", id_detail);

  form_data.append("kode_jenis_syarat", kategori);
  form_data.append("d_file", $(isthis)[0].files[0]);
  form_data.append("nm_data", nm);
  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/SaveDokumen",
    data: form_data,
    success: function (result) {
      let data = result.data;
      data.forEach((element) => {
        // let btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, ${$("#is_id").val()}, ${element.id_persyaratan}, '${element.id_persyaratan_detail}', '')">`
        let btn = `<div class="btn-group" role="group" aria-label="Basic example">
                         <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${
                           element.dir_file
                         }" target="_blank"><i class="bx bx-show"></i></a>
                         <button type="button" class="btn btn-icon btn-danger btn-sm" onclick="deletedoc('object-storage/dekill/Requirement/${
                           element.dir_file
                         }', ${$("#is_id").val()}, '${
          element.id_persyaratan
        }', '${element.id_detail}', '${
          element.id_persyaratan_detail
        }')"><i class="bx bx-trash"></i></button>
                       </div>`;
        $(`#upload_${element.id_persyaratan_detail}`).html(btn);
      });
    },
  });
}

function deletedoc(
  path,
  idutama,
  id_persyaratan,
  id_detail,
  syarat_detail,
  type
) {
  var form_data = new FormData();
  form_data.append("id_detail", id_detail);
  form_data.append("path", path);

  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/deleteDokumen",
    data: form_data,
    success: function (result) {
      let btn = `<input type="file" class="form-control" name="d_file" placeholder="Unggah Berkas Disini" accept="application/pdf" onchange="savedok(this, ${$(
        "#is_id"
      ).val()}, ${type ? type : id_persyaratan}, '${syarat_detail}', '')">`;
      $(`#upload_${syarat_detail}`).html(btn);
    },
  });
}

function modalkonfirmasi(params) {
  $("#modal-data-kelengkapan").modal("hide");
  $("#modal-konfirmasi").modal("show");
}

function saveDataPernyataan() {
  var form_data = new FormData();
  form_data.append("id", $("#is_id").val());
  form_data.append("pernyataan", $("#pernyataan").val());
  for (let i = 1; i <= 5; i++) {
    form_data.append("dir_" + i, $("#dir_" + i).val());
  }
  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/saveDataPernyataan",
    data: form_data,
    success: function (result) {
      window.location.reload();
    },
  });
}

function actionlanjutkan(id) {
  var form_data = new FormData();
  form_data.append("id", id);
  $.ajax({
    type: "post",
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    url: "/getdatajnskonsultasiall",
    data: form_data,
    success: function (result) {
      let data = result.data;
      let no_konsultasi = data.no_konsultasi;
      let DataTanah = data.DataTanah;
      let DataFile = data.DataFile;
      let DataTkTanah = data.DataTkTanah;
      let DokumenUmum = data.DokumenUmum;
      let DataArsitektur = data.DataArsitektur;
      let DataStruktur = data.DataStruktur;
      let DataMPE = data.DataMPE;

      let DataBangunan = data.DataBangunan;

      let nm_pemilik = data.DataPemilik.nm_pemilik;
      let alamat = data.DataPemilik.alamat;
      let no_ktp = data.DataPemilik.no_ktp;
      let no_hp = data.DataPemilik.no_hp;
      let email = data.DataPemilik.email;
      let nm_konsultasi = data.DataBangunan.nm_konsultasi;
      let id_izin = data.id_izin;
      let list_izin = [
        "",
        "Persetujuan Bangunan Gedung",
        "Bangunan Gedung Existing Belum Memiliki Izin",
        "Bangunan Gedung Perubahan",
        "Bangunan Gedung Kolektif",
        "Bangunan Gedung Prasarana",
        "Bangunan Gudang 1300 Meter Persegi",
        "Desain Prototipe/Purwarupa SPBU Mikro 3 (TIGA) Kiloliter",
      ];

      $("#sum-no_konsultasi").html(no_konsultasi);
      $("#sum-nm_pemilik").html(nm_pemilik);
      $("#sum-alamat").html(alamat);
      $("#sum-no_ktp").html(no_ktp);
      $("#sum-no_hp").html(no_hp);
      $("#sum-email").html(email);
      $("#sum-nm_konsultasi").html(nm_konsultasi);
      $("#sum-jenis_permohonan").html(list_izin[id_izin]);

      let luastinggi = `${
        DataBangunan.luas_bgn ? DataBangunan.luas_bgn : ""
      } m<sup>2</sup>, dengan tinggi ${
        DataBangunan.tinggi_bgn ? DataBangunan.tinggi_bgn : ""
      } meter dan berjumlah ${
        DataBangunan.jml_lantai ? DataBangunan.jml_lanta : ""
      } lantai.`;
      let luaslapis = `${
        DataBangunan.luas_basement ? DataBangunan.luas_basement : ""
      } m<sup>2</sup> dan berjumlah ${
        DataBangunan.lapis_basement ? DataBangunan.lapis_basement : ""
      } lapis`;

      $("#sum-luas_tinggi").html(luastinggi);
      $("#sum-luas_lapis").html(luaslapis);
      $("#sum-fungsi_bg").html(DataBangunan.fungsi_bg);
      let alamat_bgn = `${
        DataBangunan.almt_bgn ? DataBangunan.almt_bgn : ""
      }, Kel. ${
        DataBangunan.nm_kelurahan ? DataBangunan.nm_kelurahan : ""
      }, Kec. ${DataBangunan.nama_kec_bg ? DataBangunan.nama_kec_bg : ""}, ${
        DataBangunan.nama_kabkota_bg ? DataBangunan.nama_kabkota_bg : ""
      }, ${DataBangunan.nama_provinsi_bg ? DataBangunan.nama_provinsi_bg : ""}`;

      $("#sum-lokasi_bangunan").html(alamat_bgn);

      let eltanah = "";
      let noeltanah = 1;
      DataTanah.forEach((element) => {
        eltanah += `<tr>
                            <td align="center"> ${noeltanah++} </td>
                            <td align="center"> ${element.Jns_dok}</td>
                            <td align="center"> ${element.no_dok} | ${
          element.tanggal_dok
        }</td>
                            <td align="center"> ${element.luas_tanah}</td>
                            <td align="center"> ${element.atas_nama_dok}d>
                            <td align="center">
                              <a type="button" class="btn btn-icon btn-info btn-sm" target="_blank" href="./object-storage/dekill/Earth/${
                                element.dir_file
                              }" class="btn default btn-xs blue-stripe"><i class="bx bx-show"></i></a>
                            </td>
                            <td align="center">
                              <a type="button" class="btn btn-icon btn-info btn-sm" target="_blank" href="./object-storage/dekill/Earth/${
                                element.dir_file_phat
                              }" class="btn default btn-xs blue-stripe"><i class="bx bx-show"></i></a>
                            </td>
                        </tr>`;
      });

      $("#body-eltanah").html(eltanah);

      let notanah = 1;
      let opt_tanah = "";
      DataTkTanah.forEach((element) => {
        let dir_file = "";
        let btn = "";
        DataFile.forEach((ele) => {
          if (ele.id_persyaratan == 1) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                    <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  </div>`;
        } else {
          btn = `Tidak Ada Dokumen`;
        }
        opt_tanah += `<tr>
                    <td align="center">${notanah++}</td>
                    <td align="left">${element.nm_dokumen}</td>
                    <td align="left">${
                      element.keterangan ? element.keterangan : ""
                    }</td>
                    <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                    </td>
                  </tr>`;
      });

      $("#data-teknis-tanah").html(opt_tanah);

      let noumum = 1;
      let opt_umum = "";
      DokumenUmum.forEach((element) => {
        let dir_file = "";
        let btn = "";
        DataFile.forEach((ele) => {
          if (ele.id_persyaratan == 5) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                    <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  </div>`;
        } else {
          btn = `Tidak Ada Dokumen`;
        }
        opt_umum += `<tr>
                    <td align="center">${noumum++}</td>
                    <td align="left">${element.nm_dokumen}</td>
                    <td align="left">${
                      element.keterangan ? element.keterangan : ""
                    }</td>
                    <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                    </td>
                  </tr>`;
      });

      $("#data-umum").html(opt_umum);

      let noarsitek = 1;
      let opt_arsitek = "";
      DataArsitektur.forEach((element) => {
        let dir_file = "";
        let btn = "";
        DataFile.forEach((ele) => {
          if (ele.id_persyaratan == 2) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                    <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  </div>`;
        } else {
          btn = `Tidak Ada Dokumen`;
        }
        opt_arsitek += `<tr>
                    <td align="center">${noarsitek++}</td>
                    <td align="left">${element.nm_dokumen}</td>
                    <td align="left">${
                      element.keterangan ? element.keterangan : ""
                    }</td>
                    <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                    </td>
                  </tr>`;
      });

      $("#data-arsitektur").html(opt_arsitek);

      let nostruktur = 1;
      let opt_struktur = "";
      DataStruktur.forEach((element) => {
        let dir_file = "";
        let btn = "";
        DataFile.forEach((ele) => {
          if (ele.id_persyaratan == 3) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                    <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  </div>`;
        } else {
          btn = `Tidak Ada Dokumen`;
        }
        opt_struktur += `<tr>
                    <td align="center">${nostruktur++}</td>
                    <td align="left">${element.nm_dokumen}</td>
                    <td align="left">${
                      element.keterangan ? element.keterangan : ""
                    }</td>
                    <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                    </td>
                  </tr>`;
      });

      $("#data-struktur").html(opt_struktur);

      let nomep = 1;
      let opt_mep = "";
      DataMPE.forEach((element) => {
        let dir_file = "";
        let btn = "";
        DataFile.forEach((ele) => {
          if (ele.id_persyaratan == 4) {
            if (element.id_detail == ele.id_persyaratan_detail) {
              dir_file = ele.dir_file;
            }
          }
        });
        if (dir_file) {
          btn = `<div class="btn-group" role="group" aria-label="Basic example">
                    <a type="button" class="btn btn-icon btn-info btn-sm" href="object-storage/dekill/Requirement/${dir_file}" target="_blank"><i class="bx bx-show"></i></a>
                  </div>`;
        } else {
          btn = `Tidak Ada Dokumen`;
        }
        opt_mep += `<tr>
                    <td align="center">${nomep++}</td>
                    <td align="left">${element.nm_dokumen}</td>
                    <td align="left">${
                      element.keterangan ? element.keterangan : ""
                    }</td>
                    <td align="center" id="upload_${element.id_detail}">
                      ${btn}
                    </td>
                  </tr>`;
      });

      $("#data-mep").html(opt_mep);

      $("#exampleExtraLargeModal2").modal("show");
    },
  });
}
