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
  $("#permohonan-verifikasi").DataTable({
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
      url: "getallpermohonanverifikasi",
      type: "POST",
    },
    order: [[0, "ASC"]],
    columns: [
      { data: "id" },
      { data: "nm_konsultasi" },
      { data: "nm_pemilik" },
      { data: "no_konsultasi" },
      { data: "almt_bgn" },
      // { data: "almt_bgn" },
      { data: "post_date" },
      { data: "status_pemohon" },
      { data: "id" },
    ],
    aoColumnDefs: [
      {
        mRender: function (data, type, row) {
          var elem = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">${data}</span>`;

          return elem;
        },
        aTargets: [6],
      },
      {
        mRender: function (data, type, row) {
          if (row.status == 1) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
                          <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('verifikasi',${row.id})"><i class="bx bx-file me-0 fs-6"></i></button>
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
        aTargets: [7],
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
    data: { param: id },
    url: "/getverifikasipermohonan",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data;
        var verifikator = data.verifikator;
        $("#sum-data_pbg").html(verifikator.no_konsultasi);
        $("#sum-nama_pemilik").html(verifikator.nm_pemilik);
        $("#sum-identitas_pemilik").html(verifikator.no_ktp);
        $("#sum-alamat_pemilik").html(verifikator.alamat);
        $("#sum-kontak_pemilik").html(verifikator.no_hp);
        $("#sum-email_pemilik").html(verifikator.email);
        $("#sum-lokasi_bangunan").html(verifikator.almt_bgn);

        var statuskepemilikan = "";
        if (verifikator.jns_pemilik == 1) {
          statuskepemilikan = "Pemerintahan";
        } else if (verifikator.jns_pemilik == 2) {
          statuskepemilikan = "Badan Usaha";
        } else if (verifikator.jns_pemilik == 3) {
          statuskepemilikan = "Perorangan";
        }

        var htmldatapemilik = `
        <tr>
          <td>Nama Pemilik</td>
          <td class="fw-bold">${verifikator.nm_pemilik}</td>
        </tr>
        <tr>
          <td>Alamat Pemilik Bangunan</td>
          <td class="fw-bold">
            ${verifikator.alamat}
          </td>
        </tr>
        <tr>
          <td>Nomor Telepon / HP</td>
          <td class="fw-bold">${verifikator.no_hp}</td>
        </tr>
        <tr>
          <td>Alamat Email</td>
          <td class="fw-bold">${verifikator.email}</td>
        </tr>
        <tr>
          <td>Nomor Identitas</td>
          <td class="fw-bold">${verifikator.no_ktp}</td>
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
            Bangunan Gedung Baru
          </td>
        </tr>
        <tr>
          <td>Nama Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.nm_bgn}</td>
        </tr>
        <tr>
          <td>Lokasi Bangunan Gedung</td>
          <td class="fw-bold">
            ${verifikator.almt_bgn}
          </td>
        </tr>
        <tr>
          <td>Klasifikasi Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.nm_konsultasi}</td>
        </tr>
        <tr>
          <td>Fungsi Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.fungsi_bangunan}</td>
        </tr>
        <tr>
          <td>Luas Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.luas_bgn} m<sup>2</sup></td>
        </tr>
        <tr>
          <td>Ketinggian Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.tinggi_bgn} meter</td>
        </tr>
        <tr>
          <td>Jumlah Lantai Bangunan Gedung</td>
          <td class="fw-bold">${verifikator.jml_lantai} Lantai</td>
        </tr>
        <tr>
          <td>Jumlah Lantai Basemen</td>
          <td class="fw-bold">${verifikator.lapis_basement}</td>
        </tr>
        `;

        $("#data_umum_bg").html(htmldataumum);

        if (data.doktanah.length > 0) {
          var doktanah = data.doktanah[0];
          var jenisdok = "";
          if (doktanah.id_dokumen == "1") {
            jenisdok = "Sertifikat";
          } else if (doktanah.id_dokumen == "2") {
            jenisdok = "Akte Jual Beli";
          } else if (doktanah.id_dokumen == "3") {
            jenisdok = "Girik";
          } else if (doktanah.id_dokumen == "4") {
            jenisdok = "Petuk";
          } else {
            jenisdok = "Bukti Lain - Lain";
          }

          var htmldoktanah = `
          <tr>
            <td>1</td>
            <td>${jenisdok}</td>
            <td>${doktanah.no_dok}, ${doktanah.tanggal_dok}</td>
            <td>${doktanah.luas_tanah}</td>
            <td>${doktanah.atas_nama_dok}</td>
            `;

          if (doktanah.dir_file != null || doktanah.dir_file != "") {
            htmldoktanah += `
            <td><button type="button" class="btn btn-primary btn-sm lihatberkas" data-kategori="doktanah" data-file="${doktanah.dir_file}">Lihat</button></td>
            `;
          }
          if (doktanah.dir_file_phat != null || doktanah.dir_file_phat != "") {
            htmldoktanah += `
            <td><button type="button" class="btn btn-primary btn-sm lihatberkas" data-kategori="doktanah" data-file="${doktanah.dir_file_phat}">Lihat</button></td>
            `;
          }
          htmldoktanah += `
            <td><input type="checkbox" class="form-check" id="doktanah_${doktanah.id_detail}" onchange="check_tanah(${doktanah.id_detail},'#doktanah_${doktanah.id_detail}', ${id})"></td>
          </tr>
        `;
          $("#doktanah").html(htmldoktanah);
        } else {
          var htmldoktanah =
            "<tr><td colspan='8' class='text-center'>Data Tidak Tersedia</td></tr>";
        }

        var listtanah = "";
        data.tanah.forEach((item, index) => {
          listtanah += `<tr>
            <td>${index + 1}</td>
            <td>${item.nm_dokumen}</td>
            <td>${item.keterangan}</td>
          `;
          if (item.syarat != null) {
            listtanah += `<td><button class="btn btn-primary btn-sm lihatberkas" type="button" data-kategori="tanah" data-file="${item.syarat.dir_file}">Lihat</button></td>`;
          } else {
            listtanah += "<td></td>";
          }
          listtanah += `<td><input type="checkbox" class="form-check"></td>`;
          listtanah += "</tr>";
        });

        $("#listtanah").html(listtanah);

        var listumum = "";
        data.umum.forEach((item, index) => {
          listumum += `<tr>
            <td>${index + 1}</td>
            <td>${item.nm_dokumen}</td>
            <td>${item.keterangan}</td>
          `;
          if (item.syarat != null) {
            listumum += `<td><button class="btn btn-primary btn-sm lihatberkas" type="button" data-kategori="tanah" data-file="${item.syarat.dir_file}">Lihat</button></td>`;
          } else {
            listumum += "<td></td>";
          }
          listumum += `<td><input type="checkbox" class="form-check"></td>`;
          listumum += "</tr>";
        });

        $("#listumum").html(listumum);

        var listars = "";
        data.ars.forEach((item, index) => {
          listars += `<tr>
            <td>${index + 1}</td>
            <td>${item.nm_dokumen}</td>
            <td>${item.keterangan}</td>
          `;
          if (item.syarat != null) {
            listars += `<td><button class="btn btn-primary btn-sm lihatberkas" type="button" data-kategori="tanah" data-file="${item.syarat.dir_file}">Lihat</button></td>`;
          } else {
            listars += "<td></td>";
          }
          listars += `<td><input type="checkbox" class="form-check"></td>`;
          listars += "</tr>";
        });

        $("#listars").html(listars);

        var liststruk = "";
        data.struk.forEach((item, index) => {
          liststruk += `<tr>
            <td>${index + 1}</td>
            <td>${item.nm_dokumen}</td>
            <td>${item.keterangan}</td>
          `;
          if (item.syarat != null) {
            liststruk += `<td><button class="btn btn-primary btn-sm lihatberkas" type="button" data-kategori="tanah" data-file="${item.syarat.dir_file}">Lihat</button></td>`;
          } else {
            liststruk += "<td></td>";
          }
          liststruk += `<td><input type="checkbox" class="form-check"></td>`;
          liststruk += "</tr>";
        });

        $("#liststruk").html(liststruk);

        var listmep = "";
        data.mep.forEach((item, index) => {
          listmep += `<tr>
            <td>${index + 1}</td>
            <td>${item.nm_dokumen}</td>
            <td>${item.keterangan}</td>
          `;
          if (item.syarat != null) {
            listmep += `<td><button class="btn btn-primary btn-sm lihatberkas" type="button" data-kategori="tanah" data-file="${item.syarat.dir_file}">Lihat</button></td>`;
          } else {
            listmep += "<td></td>";
          }
          listmep += `<td><input type="checkbox" class="form-check"></td>`;
          listmep += "</tr>";
        });

        $("#listmep").html(listmep);
      }
    },
  });
}

function check_tanah(id, idel, id_pemilik) {
  Swal.fire({
    icon: "question",
    title: "Verifikasi Dokumen ini ?",
    showCancelButton: true,
    cancelButtonText: "Tidak",
    confirmButtonText: "Ya",
  }).then((res) => {
    if (res.isConfirmed) {
      var status = 0;
      if ($(idel).checked) {
        status = 1;
      }
      $.ajax({
        type: "post",
        dataType: "json",
        data: { id_detail: id, status: status },
        url: "updateVerifikasiTanah",
        success: function (response) {
          if (response.code == 200) {
            Swal.fire({
              icon: "success",
              html: response.msg,
            }).then((result) => {
              if (result.isConfirmed) {
                getdatapermohonan(id_pemilik);
              }
            });
          }
        },
      });
    }
  });
}
