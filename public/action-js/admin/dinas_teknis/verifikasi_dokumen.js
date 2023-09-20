$(() => {
  $("#menu-dinas_teknis").addClass("active");
  $("#submenu-verifikasi_dokumen").addClass("active");
});

$(document).ready(function () {
  var table = $("#example2").DataTable({
    lengthChange: false,
    buttons: ["excel", "pdf"],
  });

  table.buttons().container().appendTo("#example2_wrapper .col-md-6:eq(0)");

  loadpermohonan();

  $("#btntest").click(function () {
    $("#29").trigger("click");
  });

  $("#formverifikasi").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      dataType: "json",
      data: new FormData(this),
      processData: false,
      contentType: false,
      url: "/status_dt_teknis",
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
            location.reload();
          });
        }
      },
    });
  });
});

function loadpermohonan() {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { param: { "data_permohonan.status": 1 } },
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
          { mDataProp: "status", width: "2%", class: "text-center" },
          { mDataProp: "id", width: "10%", class: "text-center" },
        ],
        order: [[0, "ASC"]],
        fixedColumns: true,
        aoColumnDefs: [
          {
            mRender: function (data, type, row) {
              var elem = "";
              if (data == 1) {
                elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Menunggu Verifikasi Dokumen</span>`;
              } else if (data == 3) {
                elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`;
              } else if (data == 4) {
                elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Ditolak</span>`;
              } else {
                elem = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Diproses</span>`;
              }
              return elem;
            },
            aTargets: [7],
          },
          {
            mRender: function (data, type, row) {
              if (row.status == 1) {
                var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-primary btn-sm btn-icon" id="${row.id}" onclick="action('verifikasi', ${row.id})" title="Verifikasi Dokumen"><i class="bx bx-highlight me-0 fs-6"></i></button>
                              </div>`;
                // <button type="button" class="btn btn-danger btn-sm btn-icon" onclick="action('delete', ${row.id_permohonan_slf})"><i class="bx bx-trash me-0 fs-6"></i></button>
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
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                              <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
                            </div>`;
              }
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
  console.log("pecet");
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
  } else if (mode == "verifikasi") {
    getdatapermohonan(id);
    $("#id_permohonan").val(id);
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
