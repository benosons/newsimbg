$(() => {
  $("#menu-pengawas_pupr").addClass("active");
  // $("#submenu-pengawas_pupr").addClass("active");
  // $("#isubmenu-penugasan_tpa_tpt").addClass("active");

  loadpermohonanpenugasan();
  loadpermohonanpenjadwalan();

  $("#savepenugasan").click(function () {
    var val = [];
    $("input[name='terpilih']:checked").each(function (i) {
      val[i] = $(this).val();
    });
    var id_permohonan = $("#id_permohonan_penugasan").val();
    var urlpenugasan = "/savePenugasanTpt";
    savepenugasan(val, id_permohonan, urlpenugasan);
  });

  // Penjadwalan
  $("#tipe_konsultasi").change(function () {
    let tipe = $(this).val();
    if (tipe == 1) {
      $("#field-tempat").removeClass("d-none");
      $("#field-link").addClass("d-none");
      $("#field-pass-daring").addClass("d-none");
    } else if (tipe == 2) {
      $("#field-tempat").addClass("d-none");
      $("#field-link").removeClass("d-none");
      $("#field-pass-daring").removeClass("d-none");
    }
  });

  $("#simpanpenjadwalan").click(function () {
    let tanggal_konsultasi = $("#tanggal_konsultasi").val();
    let jam_konsultasi = $("#jam_konsultasi").val();
    let tipe_konsultasi = $("#tipe_konsultasi").val();
    let file = $("#file");

    if (tanggal_konsultasi == "") {
      Swal.fire({
        html: "Tanggal Konsultasi Perlu Diisi",
        icon: "error",
        buttonsStyling: true,
      });
    } else if (jam_konsultasi == "") {
      Swal.fire({
        html: "Jam Konsultasi Perlu Diisi",
        icon: "error",
        buttonsStyling: true,
      });
    } else if (tipe_konsultasi == "") {
      Swal.fire({
        html: "Tipe Konsultasi Perlu Diisi",
        icon: "error",
        buttonsStyling: true,
      });
    } else if (file.val() == "") {
      Swal.fire({
        html: "Undangan Konsultasi Perlu Diupload",
        icon: "error",
        buttonsStyling: true,
      });
    }

    savepenjadwalan(tanggal_konsultasi, jam_konsultasi, tipe_konsultasi, file);
  });
});

$(document).ready(function () {
  var table = $("#table-tpa_tpt").DataTable({
    lengthChange: false,
    buttons: ["excel", "pdf"],
  });

  table
    .buttons()
    .container()
    .appendTo("#table-tpa_tpt_wrapper .col-md-6:eq(0)");
});

$(document).ready(function () {
  var table = $("#table-penjadwalan_konsultasi").DataTable({
    lengthChange: false,
    buttons: ["excel", "pdf"],
  });

  table
    .buttons()
    .container()
    .appendTo("#table-penjadwalan_konsultasi_wrapper .col-md-6:eq(0)");
});

function loadpermohonanpenugasan() {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { param: { "data_permohonan.status": 4 } },
    url: "/getallpermohonan",
    success: function (result) {
      let data = result.data;
      let code = result.code;
      var dt = $("#example2").DataTable({
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
        destroy: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: false,
        pageLength: 10,
        aaData: result.data,
        aoColumns: [
          { mDataProp: "id", class: "text-center", width: "2%" },
          { mDataProp: "nm_jns_permohonan", class: "text-center" },
          { mDataProp: "no_registrasi", class: "text-center" },
          { mDataProp: "nama_pemilik" },
          { mDataProp: "address", width: "3%" },
          { mDataProp: "fungsi_bg", width: "3%" },
          { mDataProp: "in_date", width: "3%" },
          { mDataProp: "status_dinas", width: "2%", class: "text-center" },
          { mDataProp: "id", width: "10%", class: "text-center" },
        ],
        order: [[0, "ASC"]],
        fixedColumns: true,
        aoColumnDefs: [
          {
            mRender: function (data, type, row) {
              var elem = "";
              // if (data == 1) {
              //   elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Menunggu Verifikasi Dokumen</span>`;
              // } else if (data == 3) {
              //   elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`;
              // } else if (data == 4) {
              //   elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Ditolak</span>`;
              // } else {
              // }
              elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">${row.status_dinas}</span>`;
              return elem;
            },
            aTargets: [7],
          },
          {
            mRender: function (data, type, row) {
              var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('penugasan', ${row.id})"><i class="bx bxs-user-detail me-0 fs-6" title="Penugasan TPA/TPT"></i></button>
                              <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id})"><i class="bx bx-edit me-0 fs-6"></i></button>
                            </div>`;

              return elem;
            },
            aTargets: [8],
          },
        ],
        fnRowCallback: function (
          nRow,
          aData,
          iDisplayIndex,
          iDisplayIndexFull
        ) {
          var index = iDisplayIndexFull + 1;
          $("td:eq(0)", nRow).html("#" + index);
          return index;
        },
        fnDrawCallback: function () {
          $(".update_status").change(function () {
            action("update", this.value, this.checked);
          });
        },
        fnInitComplete: function () {
          var that = this;
          var td;
          var tr;
          this.$("td").click(function () {
            td = this;
          });
          this.$("tr").click(function () {
            tr = this;
          });
        },
      });
    },
  });
}
function loadpermohonanpenjadwalan() {
  $.ajax({
    type: "post",
    dataType: "json",
    // data: { param: { "data_permohonan.status": 5 } },
    data: {
      param:
        "data_permohonan.status = 5 OR data_permohonan.status = 6 OR data_permohonan.status = 7 OR data_permohonan.status = 8",
    },
    url: "/getallpermohonan",
    success: function (result) {
      let data = result.data;
      let code = result.code;
      var dt = $("#tablepenjadwalan").DataTable({
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
        destroy: true,
        paging: true,
        lengthChange: false,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: false,
        pageLength: 10,
        aaData: result.data,
        aoColumns: [
          { mDataProp: "id", class: "text-center", width: "2%" },
          { mDataProp: "nm_jns_permohonan", class: "text-center" },
          { mDataProp: "no_registrasi", class: "text-center" },
          { mDataProp: "nama_pemilik" },
          { mDataProp: "address", width: "3%" },
          { mDataProp: "fungsi_bg", width: "3%" },
          { mDataProp: "in_date", width: "3%" },
          { mDataProp: "status_dinas", width: "2%", class: "text-center" },
          { mDataProp: "id", width: "10%", class: "text-center" },
        ],
        order: [[0, "ASC"]],
        fixedColumns: true,
        aoColumnDefs: [
          {
            mRender: function (data, type, row) {
              var elem = "";
              // if (data == 1) {
              //   elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Menunggu Verifikasi Dokumen</span>`;
              // } else if (data == 3) {
              //   elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`;
              // } else if (data == 4) {
              //   elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Ditolak</span>`;
              // } else {
              // }
              elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">${row.status_dinas}</span>`;
              return elem;
            },
            aTargets: [7],
          },
          {
            mRender: function (data, type, row) {
              var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('penjadwalan', ${row.id})"><i class="bx bxs-user-detail me-0 fs-6" title="Jadwalkan Konsultasi"></i></button>
                              <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id})"><i class="bx bx-edit me-0 fs-6"></i></button>
                            </div>`;

              return elem;
            },
            aTargets: [8],
          },
        ],
        fnRowCallback: function (
          nRow,
          aData,
          iDisplayIndex,
          iDisplayIndexFull
        ) {
          var index = iDisplayIndexFull + 1;
          $("td:eq(0)", nRow).html("#" + index);
          return index;
        },
        fnDrawCallback: function () {
          $(".update_status").change(function () {
            action("update", this.value, this.checked);
          });
        },
        fnInitComplete: function () {
          var that = this;
          var td;
          var tr;
          this.$("td").click(function () {
            td = this;
          });
          this.$("tr").click(function () {
            tr = this;
          });
        },
      });
    },
  });
}

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
  } else if (mode == "penugasan") {
    getdatapermohonan(id);
    gettpt(id);
    $("#id_permohonan_penugasan").val(id);
    $("#exampleExtraLargeModal2").modal("toggle");
    $("#exampleExtraLargeModal2").modal("show");
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
  } else if (mode == "penjadwalan") {
    getdatapermohonanpenjadwalan(id);
    gettpatpt(id);
    $("#id_permohonan_penjadwalan").val(id);
    $("#exampleExtraLargeModal3").modal("toggle");
    $("#exampleExtraLargeModal3").modal("show");
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

function getdatapermohonan(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { param: { "data_permohonan.id": id } },
    url: "/getpermohonan",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data[0];
        $("#id_permohonan_penugasan").val(data.id);
        $("#sum-data_pbg").html(data.no_registrasi);
        $("#sum-nama_pemilik").html(data.nama_pemilik);
        $("#sum-identitas_pemilik").html(data.no_tanda_pengenal);
        $("#sum-alamat_pemilik").html(data.address);
        $("#sum-kontak_pemilik").html(data.no_telp_pemilik);
        $("#sum-email_pemilik").html(data.email_pemilik);
        $("#sum-lokasi_bangunan").html(data.alamat_bg);

        var statuskepemilikan = "";
        if (data.id_stat_kepemilikan == 1) {
          statuskepemilikan = "Pemerintahan";
        } else if (data.id_stat_kepemilikan == 2) {
          statuskepemilikan = "Badan Usaha";
        } else if (data.id_stat_kepemilikan == 3) {
          statuskepemilikan = "Perorangan";
        }

        var htmldatapemilik = `
        <tr>
          <td>Nama Pemilik</td>
          <td class="fw-bold">${data.nama_pemilik}</td>
        </tr>
        <tr>
          <td>Alamat Pemilik Bangunan</td>
          <td class="fw-bold">
            ${data.address}
          </td>
        </tr>
        <tr>
          <td>Nomor Telepon / HP</td>
          <td class="fw-bold">${data.no_telp_pemilik}</td>
        </tr>
        <tr>
          <td>Alamat Email</td>
          <td class="fw-bold">${data.email_pemilik}</td>
        </tr>
        <tr>
          <td>Nomor Identitas</td>
          <td class="fw-bold">${data.no_tanda_pengenal}</td>
        </tr>
        <tr>
          <td>Bentuk Kepemilikan</td>
          <td class="fw-bold">${statuskepemilikan}</td>
        </tr>
        `;

        $("#data_lengkap_pemilik").html(htmldatapemilik);

        var htmldataumum = `
        <tr>
          <td>Jenis Permohonan Konsultasi</td>
          <td class="fw-bold">
            ${data.nm_jns_permohonan}
          </td>
        </tr>
        <tr>
          <td>Nama Bangunan Gedung</td>
          <td class="fw-bold">${data.nama_bg}</td>
        </tr>
        <tr>
          <td>Lokasi Bangunan Gedung</td>
          <td class="fw-bold">
            ${data.alamat_bg}
          </td>
        </tr>
        <tr>
          <td>Klasifikasi Bangunan Gedung</td>
          <td class="fw-bold">?</td>
        </tr>
        <tr>
          <td>Fungsi Bangunan Gedung</td>
          <td class="fw-bold">${data.fungsi_bg}</td>
        </tr>
        <tr>
          <td>Luas Bangunan Gedung</td>
          <td class="fw-bold">${data.luas_bg} m<sup>2</sup></td>
        </tr>
        <tr>
          <td>Ketinggian Bangunan Gedung</td>
          <td class="fw-bold">${data.tinggi_bg} meter</td>
        </tr>
        <tr>
          <td>Jumlah Lantai Bangunan Gedung</td>
          <td class="fw-bold">${data.jml_lantai_bg} Lantai</td>
        </tr>
        <tr>
          <td>Jumlah Lantai Basemen</td>
          <td class="fw-bold">${data.jml_lantai_basement_bg}</td>
        </tr>
        `;

        $("#data_umum_bg").html(htmldataumum);
      }
    },
  });
}

function getdatapermohonanpenjadwalan(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { param: { "data_permohonan.id": id } },
    url: "/getpermohonan",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data[0];
        $("#id_permohonan_penjadwalan").val(data.id);
        $("#sum-data_pbg-penjadwalan").html(data.no_registrasi);
        $("#sum-nama_pemilik-penjadwalan").html(data.nama_pemilik);
        $("#sum-identitas_pemilik-penjadwalan").html(data.no_tanda_pengenal);
        $("#sum-alamat_pemilik-penjadwalan").html(data.address);
        $("#sum-kontak_pemilik-penjadwalan").html(data.no_telp_pemilik);
        $("#sum-email_pemilik-penjadwalan").html(data.email_pemilik);
        $("#sum-lokasi_bangunan-penjadwalan").html(data.alamat_bg);

        var statuskepemilikan = "";
        if (data.id_stat_kepemilikan == 1) {
          statuskepemilikan = "Pemerintahan";
        } else if (data.id_stat_kepemilikan == 2) {
          statuskepemilikan = "Badan Usaha";
        } else if (data.id_stat_kepemilikan == 3) {
          statuskepemilikan = "Perorangan";
        }
      }
    },
  });
}

function gettpt(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/listDataPersonilAsn",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data;
        var html = ``;
        var nomor = 1;
        data.forEach((item) => {
          html += `
            <tr>
              <td> ${nomor} </td>
              <td> ${item.glr_depan} ${item.nama_personal} ${item.glr_belakang} </td>
              <td> <input type="checkbox" class="form-check" name="terpilih" id="${item.id_personal}" value="${item.id_personal}"> </td>
            </tr>
          `;
          nomor += 1;
        });
        $("#listtpatpt").html(html);
      }
    },
  });
}

function gettpatpt(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id_permohonan: id },
    url: "/getTpaTptPenugasan",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data;
        var html = ``;
        var nomor = 1;
        $("#thead-penjadwalan").html(response.thead);
        data.forEach((item) => {
          html += `
            <tr>
              <td> ${nomor} </td>
              <td> ${item.nama_petugas} </td>
              <td> - </td>
              <td> - </td>
            </tr>
          `;
          nomor += 1;
        });
        $("#listpenugasantpatpt").html(html);
      }
    },
  });
}

function savepenugasan(val, id_permohonan, urlpenugasan) {
  var fd = new FormData();
  fd.append("val", val);
  fd.append("id_permohonan", id_permohonan);
  fd.append("status", 5);
  $.ajax({
    type: "post",
    dataType: "json",
    data: fd,
    processData: false,
    contentType: false,
    url: urlpenugasan,
    success: function (response) {
      if (response.code == 200) {
        Swal.fire({
          html: response.msg,
          icon: "success",
          buttonsStyling: true,
          cancelButtonText: "Close",
          customClass: {
            cancelButton: "btn btn-success btn-sm",
          },
        }).then((result) => {
          loadpermohonanpenugasan();
          loadpermohonanpenjadwalan();
        });
      }
    },
  });
}

function savepenjadwalan(
  tanggal_konsultasi,
  jam_konsultasi,
  tipe_konsultasi,
  file
) {
  let fd = new FormData();
  fd.append("tanggal_konsultasi", tanggal_konsultasi);
  fd.append("jam_konsultasi", jam_konsultasi);
  fd.append("tipe_konsultasi", tipe_konsultasi);
  fd.append("file", file.prop("files")[0]);
  fd.append("id_permohonan", $("#id_permohonan_penjadwalan").val());

  if (tipe_konsultasi == 1) {
    fd.append("tempat", $("#tempat").val());
  } else if (tipe_konsultasi == 2) {
    fd.append("link", $("#link").val());
    fd.append("passdaring", $("#passdaring").val());
  }

  $.ajax({
    type: "post",
    dataType: "json",
    data: fd,
    processData: false,
    contentType: false,
    url: "/savepenjadwalan",
    success: function (response) {
      if (response.code == 200) {
        Swal.fire({
          html: response.msg,
          icon: "success",
          buttonsStyling: true,
          cancelButtonText: "Close",
          customClass: {
            cancelButton: "btn btn-success btn-sm",
          },
        }).then((result) => {
          $("#exampleExtraLargeModal3").modal("toggle");
          $("#exampleExtraLargeModal3").modal("hide");
          loadpermohonanpenjadwalan();
        });
      }
    },
  });
}
