$(() => {
  $("#menu-dashboard").addClass("active");

  cekprofile();
  loadcount();

  $("#id_provinsi").change(function () {
    let prov = $(this).val();
    getkabkot(prov);
  });
  $("#id_kabkot").change(function () {
    let kabkot = $(this).val();
    getkecamatan(kabkot);
  });
  $("#id_kecamatan").change(function () {
    let kecamatan = $(this).val();
    getkelurahan(kecamatan);
  });

  $("#formDatadiri").submit(function (e) {
    e.preventDefault();

    let fd = new FormData(this);
    savedatadiri(fd);
  });
});

function loadcount() {
  $.ajax({
    type: "get",
    dataType: "json",
    url: "getcountallpermohonan",
    success: function (response) {
      $("#countall").html(response.all);
      $("#countpbg").html(response.pbgterbit);
      $("#countslf").html(response.slfterbit);
    },
  });
}

function cekprofile() {
  $.ajax({
    type: "get",
    dataType: "json",
    url: "getprofile",
    success: function (response) {
      if (response.code == 0) {
        $("#exampleExtraLargeModal2").modal("toggle");
        $("#exampleExtraLargeModal2").modal("show");
      }
    },
  });
}

function getkabkot(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkabkot2",
    success: function (response) {
      if (response.code == 200) {
        let html = "<option value=''>PILIH</option>";
        response.data.forEach((item) => {
          html += `
              <option value="${item.id_kabkot}">${item.nama_kabkota}</option>
            `;
        });
        $("#id_kabkot").html(html);
      }
    },
  });
}

function getkecamatan(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkec2",
    success: function (response) {
      if (response.code == 200) {
        let html = "<option value=''>PILIH</option>";
        response.data.forEach((item) => {
          html += `
              <option value="${item.id_kecamatan}">${item.nama_kecamatan}</option>
            `;
        });
        $("#id_kecamatan").html(html);
      }
    },
  });
}

function getkelurahan(id) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: { id: id },
    url: "getjsonkel2",
    success: function (response) {
      if (response.code == 200) {
        let html = "<option value=''>PILIH</option>";
        response.data.forEach((item) => {
          html += `
              <option value="${item.id_kelurahan}">${item.nama_kelurahan}</option>
            `;
        });
        $("#id_kelurahan").html(html);
      }
    },
  });
}

function savedatadiri(fd) {
  $.ajax({
    type: "post",
    dataType: "json",
    data: fd,
    processData: false,
    contentType: false,
    url: "savedatadiri",
    success: function (response) {
      if (response.code == 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Diri Berhasil Simpan",
        }).then((res) => {
          if (res.isConfirmed) {
            $("#exampleExtraLargeModal2").modal("toggle");
            $("#exampleExtraLargeModal2").modal("hide");

            cekprofile();
          }
        });
      }
    },
  });
}
