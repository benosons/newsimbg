console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $("#menu-user").addClass("active");
    loadusers()
    $('#modal_add_user').on('show.bs.modal', function() {
        $("form").trigger("reset")
        $('[name="password"]').attr('placeholder', 'Password')
        $('#id_role').val(0)
        $('wrd').html('Tambah')
    })
});

function loadusers() {
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/getalluser",
      success: function (result) {
        let data = result.data;
        let code = result.code;
        var dt = $("#all-user").DataTable({
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
              { mDataProp: "id", class: 'text-center', width: "2%" },
              { mDataProp: "name",class: 'text-center' },
              { mDataProp: "email",class: 'text-center' },
              { mDataProp: "username",class: 'text-center' },
              { mDataProp: "role", class: 'text-center' },
              { mDataProp: "status", width: "2%", class: 'text-center' },
              { mDataProp: "create_date", width: "15%", class: 'text-center' },
              { mDataProp: "id", width: "10%", class: 'text-center' },
            ],
            order: [[0, "ASC"]],
            fixedColumns: true,
            aoColumnDefs: [
                {
                mRender: function (data, type, row) {
                  var elem = ''
                  if(data == 1){
                    elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Aktif</span>`
                  }else{
                    elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Tidak Aktif</span>`

                  }
                  return elem ;
                },
                aTargets: [5],
              },
                {
                mRender: function (data, type, row) {
                  var elem = `<div class="btn-group" role="group" aria-label="First group">
                                <button type="button" class="btn btn-primary btn-sm btn-icon" onclick="action('update', ${row.id})"><i class="bx bx-edit me-0 fs-6"></i></button>
                                <button type="button" class="btn btn-danger btn-sm btn-icon" onclick="action('delete', ${row.id}, '${row.username}')"><i class="bx bx-trash me-0 fs-6"></i></button>
                              </div>`
                        return elem ;
                },
                aTargets: [7],
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
            html: `Apakah anda yakin menghapus user ini?`,
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
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {
                        id: id,
                        username: username
                    },
                    url: "/deleteuser",
                    success: function (result) {
                        loadusers()
                    }
                })
            }
        })
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/getuser",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                $('#modal_add_user').modal('show')
                $('[name="id"]').val(id)
                $('[name="name"]').val(data.name)
                $('[name="email"]').val(data.email)
                $('[name="username"]').val(data.username)
                $('[name="password"]').attr('placeholder', 'kosongkan jika tidak merubah password')
                $('#id_role').val(data.id_role)
                $('wrd').html('Ubah')
            }
        })
    }
}