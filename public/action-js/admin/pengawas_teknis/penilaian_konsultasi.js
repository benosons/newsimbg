$(() => {
  // $("#menu-pengawas_teknis").addClass("active");
  $("#menu-hasil_konsultasi").addClass("active");
  $('[data-bs-toggle="popover"]').popover();
  $(".datepicker").flatpickr();
  loadpermohonanpenugasan();
  loadpermohonanretribusi();
  loadcount();
  loadcount2();

  $("#info-resiko").click(function () {
    showinfo("resiko");
  });
  $("#info-lokasi").click(function () {
    showinfo("lokasi");
  });
  $("#info-klas").click(function () {
    showinfo("klas");
  });

  $("#submitform").click(function () {
    updatepermohonan(9, 1);
  });

  $("#btn-manual").click(function () {
    manual();
  });

  $("#formretribusi").submit(function (e) {
    e.preventDefault();
    updatepermohonan(10, 2);
  });
});

function loadcount() {
  $.ajax({
    type: "post",
    data: { param: "hasil" },
    dataType: "json",
    url: "getcountallpermohonanadmglob",
    success: function (response) {
      $("#belumhasil").html(response.all);
      $("#sudahhasil").html(response.sudah);
    },
  });
}
function loadcount2() {
  $.ajax({
    type: "post",
    data: { param: "retribusi" },
    dataType: "json",
    url: "getcountallpermohonanadmglob",
    success: function (response) {
      $("#belumretribusi").html(response.all);
      $("#sudahretribusi").html(response.sudah);
    },
  });
}

function loadpermohonanpenugasan() {
  $("#permohonan-konsultasi").DataTable({
    processing: true,
    serverSide: true,
    destroy: true,
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
      url: "getallpermohonanpenilaian",
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
          var elem = `<span class="badge bg-main text-white shadow-sm w-100">${data}</span>`;

          return elem;
        },
        aTargets: [6],
      },
      {
        mRender: function (data, type, row) {
          if (row.status == 1) {
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('verifikasi',${row.id})"><i class="bx bx-file me-0 fs-6"></i></button>
            //             </div>`;
            var elem = "";
          } else if (row.status == 3) {
            var elem = "";
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
            //             </div>`;
          } else if (row.status == 6) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
            <button type="button" class="btn btn-second btn-sm btn-icon" onclick="action('penjadwalan', ${row.id}, '${row.no_konsultasi}')"><i class="bx bxs-pencil me-0 fs-6" title="Penilaian Konsultasi"></i></button>
                        </div>`;
            // var elem = "";
          } else {
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="actionlanjutkan('${row.id}')"><i class="bx bx-file me-0 fs-6"></i></button>
            //               <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
            //             </div>`;
            var elem = "";
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
}

function loadpermohonanretribusi() {
  $("#permohonan-retribusi").DataTable({
    processing: true,
    serverSide: true,
    destroy: true,
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
      url: "getallpermohonanretribusi",
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
          var elem = `<span class="badge bg-main text-white shadow-sm w-100">Menunggu Perhitungan Retribusi</span>`;

          return elem;
        },
        aTargets: [6],
      },
      {
        mRender: function (data, type, row) {
          if (row.status == 1) {
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('verifikasi',${row.id})"><i class="bx bx-file me-0 fs-6"></i></button>
            //             </div>`;
            var elem = "";
          } else if (row.status == 3) {
            var elem = "";
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
            //             </div>`;
          } else if (row.status == 9) {
            var elem = `<div class="btn-group" role="group" aria-label="First group">
            <button type="button" class="btn btn-second btn-sm btn-icon" onclick="action('retribusi', ${row.id}, '${row.no_konsultasi}')"><i class="bx bxs-pencil me-0 fs-6" title="Perhitungan Retribusi"></i></button></div>`;
            // var elem = "";
          } else {
            // var elem = `<div class="btn-group" role="group" aria-label="First group">
            //               <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="actionlanjutkan('${row.id}')"><i class="bx bx-file me-0 fs-6"></i></button>
            //               <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
            //             </div>`;
            var elem = "";
          }
          return elem;
        },
        aTargets: [7],
      },
      {
        render: function (data, type, full, meta) {
          return "<div class='text-wrap w-100'>" + data + "</div>";
        },
        targets: [1, 4],
      },
    ],
    fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      var index = iDisplayIndexFull + 1;
      $("td:eq(0)", nRow).html("#" + index);
      return index;
    },
  });
}

function action(mode, id, no_konsultasi) {
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
  } else if (mode == "retribusi") {
    // getdatapermohonan(id);
    // gettpttpapenugasan(id);
    // $("#id_permohonan_penugasan").val(id);
    // $("#no_konsultasi_penugasan").val(no_konsultasi);
    $("#idGlobal").val(id);
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
  } else if (mode == "penjadwalan") {
    // getdatapermohonanpenjadwalan(id);
    // gettpatpt(id, no_konsultasi);
    // $("#id_permohonan_penjadwalan").val(id);
    getdatapermohonan(id);
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

function getdatapermohonan(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { param: id },
    url: "/getverifikasipermohonan",
    success: function (response) {
      if (response.code == 200) {
        var data = response.data;
        var listars = "";
        data.ars.forEach((item, index) => {
          listars += `<tr>
            <td width="5%">${index + 1}</td>
            <td width="30%">${item.nm_dokumen}</td>
            <td width="20%">
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch${
                  item.id_detail
                }" tabindex="0">
                <label class="onoffswitch-label" for="myonoffswitch${
                  item.id_detail
                }">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
            </td>
          `;
          listars += `<td width="20%">
              <textarea class="form-control" row="10" col="2" placeholder="Masukan Catatan"></textarea>
            </td>`;
          listars += `<td width="25%">`;
          if (item.syarat == null) {
            listars += "Tidak ada Dokumen";
          } else {
            listars += `
              <table class="table table-borderless">
              <tr>
              <td>`;

            listars += `
            <a href="object-storage/dekill/Requirement/${item.syarat.dir_file}" target="_blank" class="btn btn-main btn-sm">Lihat Dokumen</a>
            </td>
            </tr>
            </table>
        `;
          }
          listars += "</td></tr>";
        });

        $("#listars").html(listars);

        var liststruk = "";
        data.struk.forEach((item, index) => {
          liststruk += `<tr>
            <td width="5%">${index + 1}</td>
            <td width="30%">${item.nm_dokumen}</td>
            <td width="20%">
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch${
                  item.id_detail
                }" tabindex="0">
                <label class="onoffswitch-label" for="myonoffswitch${
                  item.id_detail
                }">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
            </td>
          `;
          liststruk += `<td width="20%">
              <textarea class="form-control" row="10" col="2" placeholder="Masukan Catatan"></textarea>
            </td>`;
          liststruk += `<td width="25%">`;
          if (item.syarat == null) {
            liststruk += "Tidak ada Dokumen";
          } else {
            liststruk += `
              <table class="table table-borderless">
              <tr>
              <td>`;

            liststruk += `
            <a href="object-storage/dekill/Requirement/${item.syarat.dir_file}" target="_blank" class="btn btn-main btn-sm">Lihat Dokumen</a>
            </td>
            </tr>
            </table>
        `;
          }
          liststruk += "</td></tr>";
        });

        $("#liststruk").html(liststruk);

        var listmep = "";
        data.mep.forEach((item, index) => {
          listmep += `<tr>
            <td width="5%">${index + 1}</td>
            <td width="30%">${item.nm_dokumen}</td>
            <td width="20%">
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch${
                  item.id_detail
                }" tabindex="0">
                <label class="onoffswitch-label" for="myonoffswitch${
                  item.id_detail
                }">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
            </td>
          `;
          listmep += `<td width="20%">
              <textarea class="form-control" row="10" col="2" placeholder="Masukan Catatan"></textarea>
            </td>`;
          listmep += `<td width="25%">`;
          if (item.syarat == null) {
            listmep += "Tidak ada Dokumen";
          } else {
            listmep += `
              <table class="table table-borderless">
              <tr>
              <td>`;

            listmep += `
            <a href="object-storage/dekill/Requirement/${item.syarat.dir_file}" target="_blank" class="btn btn-main btn-sm">Lihat Dokumen</a>
            </td>
            </tr>
            </table>
        `;
          }
          listmep += "</td></tr>";
        });

        $("#listmep").html(listmep);

        let ver = data.verifikator;

        $("#jns_pemilik").val(ver.jns_pemilik);
        $("#nm_pemilik").val(ver.nm_pemilik);
        $("#no_ktp").val(ver.no_ktp);
        $("#alamat").val(ver.alamat);
        $("#id_provinsi").val(ver.id_prov_bgn);
        getkabkot(ver.id_prov_bgn, ver.id_kabkot_bgn);
        getkecamatan(ver.id_kabkot_bgn, ver.id_kec_bgn);
        getkelurahan(ver.id_kec_bgn, ver.id_kel_bgn);

        $("#prov_bgn").val(ver.nm_prov_bgn);
        $("#kabkot_bgn").val(ver.nm_kabkot_bgn);
        getkecbgn(ver.id_kabkot_bgn, ver.id_kec_bgn);
        getkelbgn(ver.id_kec_bgn, ver.id_kel_bgn);
        $("#alamat_bgn").val(ver.almt_bgn);
        $("#jenis_permohonan").val(ver.id_jns_bg);
        $("#fungsi_bg").val(ver.id_fungsi_bg);
        $("#luas_bgn").val(ver.luas_bgn);
        $("#lantai_bg").val(ver.jml_lantai);
        $("#luas_basement").val(ver.luas_basement);
        $("#lantai_basemen").val(ver.lapis_basement);

        $("#idGlobal").val(ver.id);
      }
    },
  });
}

function getkabkot(id, id_kabkot) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkabkot2",
    success: function (response) {
      if (response.code == 200) {
        let html = "";
        response.data.forEach((item) => {
          html += `
            <option value="${item.id_kabkot}">${item.nama_kabkota}</option>
          `;
        });

        $("#id_kabkot").html(html);

        $("#id_kabkot").val(id_kabkot);
      }
    },
  });
}
function getkecamatan(id, id_kecamatan) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkec2",
    success: function (response) {
      if (response.code == 200) {
        let html = "";
        response.data.forEach((item) => {
          html += `
            <option value="${item.id_kecamatan}">${item.nama_kecamatan}</option>
          `;
        });

        $("#id_kecamatan").html(html);

        $("#id_kecamatan").val(id_kecamatan);
      }
    },
  });
}
function getkelurahan(id, id_kelurahan) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkel2",
    success: function (response) {
      if (response.code == 200) {
        let html = "";
        response.data.forEach((item) => {
          html += `
            <option value="${item.id_kelurahan}">${item.nama_kelurahan}</option>
          `;
        });

        $("#id_kelurahan").html(html);

        $("#id_kelurahan").val(id_kelurahan);
      }
    },
  });
}
function getkecbgn(id, id_kecamatan) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkec2",
    success: function (response) {
      if (response.code == 200) {
        let html = "";
        response.data.forEach((item) => {
          html += `
            <option value="${item.id_kecamatan}">${item.nama_kecamatan}</option>
          `;
        });

        $("#id_kecamatan_bgn").html(html);

        $("#id_kecamatan_bgn").val(id_kecamatan);
      }
    },
  });
}
function getkelbgn(id, id_kelurahan) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkel2",
    success: function (response) {
      if (response.code == 200) {
        let html = "";
        response.data.forEach((item) => {
          html += `
            <option value="${item.id_kelurahan}">${item.nama_kelurahan}</option>
          `;
        });

        $("#id_kelurahan_bgn").html(html);

        $("#id_kelurahan_bgn").val(id_kelurahan);
      }
    },
  });
}

function showinfo(tipe) {
  $("#exampleExtraLargeModal2").modal("toggle");
  $("#exampleExtraLargeModal2").modal("show");
  let html = "";
  if (tipe == "resiko") {
    $("#title-info").html("Informasi Tingkat Resiko Bahaya");
    html += `
    <h5>Panduan Untuk Mengisi Tingkat Resiko Bahaya : </h5>
    <ol>
    <li>Tingkat Risiko Bahaya Kebakaran Tinggi </br>
      Klasifikasi bangunan tingkat risiko kebakaran tinggi adalah bangunan gedung yang karena fungsinya, desain penggunaan bahan dan komponen unsur pembentukannya, serta kuantitas dan kualitas bahan yang ada di dalamnya tingkat mudah terbakarnya sangat tinggi.Termasuk klasifikasi bangunan dengan tingkat risiko bahaya kebakaran tinggi adalah:
      <ol type="a">
        <li> bangunan fungsi khusus </li>
        <li> bangunan dengan ketinggian melebihi 8 (delapan) lantai </li>
        <li> bangunan umum dengan luas lebih dari 5000 m2 </li>
        <li> bangunan umum dengan jumlah pengguna di atas 500 orang </li>
      </ol>
    </li>
    <li> Tingkat Risiko Bahaya Kebakaran Sedang </br>
      Klasifikasi bangunan tingkat risiko kebakaran sedang adalah bangunan gedung yang karena fungsinya, desain penggunaan bahan dan komponen unsur pembentukannya, serta kuantitas dan kualitas bahan yang ada di dalamnya tingkat mudah terbakarnya sedang. Termasuk klasifikasi bangunan dengan tingkat risiko bahaya kebakaran sedang adalah:
      <ol type="a">
        <li> hunian tunggal dengan luas melebihi 250 m2, hunian tunggal bertingkat dan hunian deret dengan panjang lebih dari 45 m </li>
        <li> bangunan dengan ketinggian 4-8 lantai </li>
        <li> bangunan umum dengan luas antara 500 m2 hingga 5000 m2, atau</li>
        <li> bangunan umum dengan jumlah pengguna kurang dari 500 orang </li>
      </ol>
    </li>
    <li> Tingkat Risiko Bahaya Kebakaran Rendah </br>
    Klasifikasi bangunan tingkat risiko kebakaran rendah adalah bangunan gedung yang karena fungsinya, desain penggunaan bahan dan komponen unsur pembentukannya, serta kuantitas dan kualitas bahan yang ada di dalamnya tingkat mudah terbakarnya rendah.Termasuk klasifikasi bangunan dengan tingkat risiko bahaya kebakaran rendah adalah:
      <ol type="a">
        <li> hunian tunggal tidak bertingkat dengan luas maksimal 250 m2 dan hunian deret tidak bertingkat dengan panjang tidak lebih dari 45 m </li>
        <li> bangunan dengan ketinggian di bawah 4 (empat) lantai, atau </li>
        <li> bangunan umum dengan luas maksimal 500 m2 </li>
      </ol>
    </li>
    `;
  } else if (tipe == "lokasi") {
    $("#title-info").html("Informasi Lokasi");
    html += `
    <h5> Panduan Untuk Mengisi Lokasi : </h5>
    <ol>
      <li> Lokasi Padat </br>
            Lokasi padat pada umumnya lokasi yang terletak di daerah perdagangan/pusat kota dan/atau kawasan dengan Koefisien Dasar Bangunan (KDB) lebih dari 60%.
      </li>
      <li> Lokasi Sedang </br>
            Lokasi sedang pada umumnya lokasi yang terletak di daerah permukiman dan/atau kawasan dengan KDB antara 40% hingga 60%.
      </li>
      <li> Lokasi Renggang </br>
            Lokasi renggang pada umumnya lokasi yang terletak di daerah pinggiran/luar kota atau daerah yang berfungsi sebagai resapan dan/atau kawasan dengan KDB 40% atau di bawahnya.
      </li>
    </ol>
    `;
  } else if (tipe == "klas") {
    $("#title-info").html("Informasi Klas Bangunan");
    html += `
    <h5> Panduan Untuk Mengisi Klas Bangunan : </h5>
    <ol>
      <li>Agar mengacu ke Lampiran PP Nomor 16 Tahun 2021 Halaman 28 Tabel I.5. Tabel Klas Bangunan Gedung</li>
    </ol>
    `;
  }

  $("#body-info").html(html);
}

function updatepermohonan(stat, tipe) {
  let id = $("#idGlobal").val();
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id, status: stat },
    url: "updatepermohonan",
    success: function (res) {
      if (res.code == 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Proses penilaian konsultasi selesai",
        }).then((response) => {
          if (response.isConfirmed) {
            if (tipe == 1) {
              $("#exampleExtraLargeModal").modal("toggle");
              $("#exampleExtraLargeModal").modal("show");
              loadpermohonanpenugasan();
              loadcount();
              loadcount2();
            } else if (tipe == 2) {
              $("#exampleExtraLargeModal4").modal("toggle");
              $("#exampleExtraLargeModal4").modal("show");
              loadpermohonanretribusi();
              loadcount();
              loadcount2();
            }
          }
        });
      }
    },
  });
}

function manual() {
  $("#exampleExtraLargeModal3").modal("toggle");
  $("#exampleExtraLargeModal3").modal("hide");
  $("#exampleExtraLargeModal4").modal("toggle");
  $("#exampleExtraLargeModal4").modal("show");
}

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}
