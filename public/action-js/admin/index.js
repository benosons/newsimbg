$(() => {
  $("#menu-dashboard").addClass("active");

  cekprofile();

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
});

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
