$(() => {
  // $("#menu-pengawas_teknis").addClass("active");
  $("#menu-hasil_konsultasi").addClass("active");

  loadpermohonanpenugasan();
});

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
      url: "getallpermohonanpenugasan",
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
    infoCallback: function (settings, start, end, max, total, pre) {
      console.log(settings);
      console.log(start + ":" + end + ":" + max + ":" + total);
      return !isNaN(total)
        ? "Showing " +
            start +
            " to " +
            end +
            " of " +
            total +
            " entries" +
            (total !== max ? " (filtered from " + max + " total entries)" : "")
        : "Showing " +
            start +
            " to " +
            (start + this.api().data().length - 1) +
            " entries";
    },
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
  } else if (mode == "penugasan") {
    // getdatapermohonan(id);
    // gettpttpapenugasan(id);
    // $("#id_permohonan_penugasan").val(id);
    // $("#no_konsultasi_penugasan").val(no_konsultasi);
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
    // getdatapermohonanpenjadwalan(id);
    // gettpatpt(id, no_konsultasi);
    // $("#id_permohonan_penjadwalan").val(id);
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
