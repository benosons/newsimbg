$(() => {
  $("#menu-permohonan").addClass("active");
});

$(document).ready(function() {
  // var table = $('#example2').DataTable( {
  //   lengthChange: false,
  //   buttons: ['excel', 'pdf']
  // } );
  
  // table.buttons().container()
  //   .appendTo( '#example2_wrapper .col-md-6:eq(0)' );
  loadusers()
} );

stepper1 = new Stepper(document.querySelector('#stepper1'))

function loadusers() {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getallpermohonan",
    success: function (result) {
      let data = result.data;
      let code = result.code;
      var dt = $("#example2").DataTable({
          dom: "<'row'" +
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
            { mDataProp: "id_permohonan_slf", class: 'text-center', width: "2%" },
            { mDataProp: "nm_jns_permohonan",class: 'text-center' },
            { mDataProp: "nama_pemilik" },
            { mDataProp: "no_registrasi_slf",class: 'text-center' },
            { mDataProp: "address", width: "3%" },
            { mDataProp: "status", width: "2%", class: 'text-center' },
            { mDataProp: "id_permohonan_slf", width: "10%", class: 'text-center' },
          ],
          order: [[0, "ASC"]],
          fixedColumns: true,
          aoColumnDefs: [
              {
              mRender: function (data, type, row) {
                var elem = ''
                if(data == 1){
                  elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Input Permohonan</span>`
                }else if (data == 7){
                  elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`
                }else if (data == 3){
                  elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Ditolak</span>`
                }else{
                  elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Diproses</span>`
                }
                return elem ;
              },
              aTargets: [5],
            },
              {
              mRender: function (data, type, row) {
                if(row.status == 1){
                var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
                              <button type="button" class="btn btn-danger btn-sm btn-icon" onclick="action('delete', ${row.id_permohonan_slf})"><i class="bx bx-trash me-0 fs-6"></i></button>
                            </div>`
                }else if (row.status == 7){
                  var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                              
                            </div>`
                }else if (row.status == 3){
                  var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                              
                            </div>`
                }else{
                  var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                              <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id_permohonan_slf})"><i class="bx bx-edit me-0 fs-6"></i></button>
                            </div>`
                }
                return elem ;
              },
              aTargets: [6],
            }
          ],
          fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
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
  if(mode == 'delete'){
      Swal.fire({
          html: `Apakah anda yakin menghapus Data ini?`,
          icon: "warning",
          buttonsStyling: true,
          showCancelButton: true,
          confirmButtonText: "Ya, Hapus!",
          cancelButtonText: 'Tidak',
          customClass: {
              confirmButton: "btn btn-danger btn-sm",
              cancelButton: 'btn btn-success btn-sm'
          }
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
              location.reload()
          }
      })
  }else if (mode == 'update'){
    $('#exampleExtraLargeModal').modal('toggle');
    $('#exampleExtraLargeModal').modal('show');
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
  } else{
    $('#exampleExtraLargeModal').modal('toggle');
    $('#exampleExtraLargeModal').modal('show');
  }
}

$('#submit-add-permohonan').click(function(){
  Swal.fire({
    html: `Sukses Menambahkan Data`,
    icon: "success",
    buttonsStyling: true,
    cancelButtonText: 'Close',
    customClass: {
        cancelButton: 'btn btn-success btn-sm'
    }
  }).then((result) => {
    location.reload()
  })
}); 


$('#tmb-jenis_permohonan').on('change', function() {
  // alert( this.value );

  // $.ajax({
  //           type: "post",
  //           dataType: "json",
  //           url: "/getuser",
  //           data: {
  //               id: id
  //           },
  //           success: function (result) {
  //               var data = result.data 
  //               $('#modal_add_user').modal('show')
  //               $('[name="id"]').val(id)
  //               $('[name="name"]').val(data.name)
  //               $('[name="email"]').val(data.email)
  //               $('[name="username"]').val(data.username)
  //               $('[name="password"]').attr('placeholder', 'kosongkan jika tidak merubah password')
  //               $('#id_role').val(data.id_role)
  //               $('wrd').html('Ubah')
  //           }
  //       })

});



