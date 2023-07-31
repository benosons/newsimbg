console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $("#menu-user").addClass("active");
    loadTokenData()
    $('#modal_add_tokenData').on('show.bs.modal', function() {
        $("form").trigger("reset")
        $('wrd').html('Tambah')
    })
});

function loadTokenData() {
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/getallTokenData",
      success: function (result) {
        let data = result.data;
        let code = result.code;
        var dt = $("#all-tokens").DataTable({
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
              { mDataProp: "id_token", class: 'text-center', width: "2%" },
              { mDataProp: "token",class: 'text-center' },
              { mDataProp: "id_biller", width: "15%", class: 'text-center' },
              { mDataProp: "nm_biller", width: "15%", class: 'text-center' },
              { mDataProp: "kd_status",class: 'text-center' },
              { mDataProp: "valid_until",class: 'text-center' },
            //   { mDataProp: "status", width: "2%", class: 'text-center' },
              { mDataProp: "id", width: "10%", class: 'text-center' }
            ],
            order: [[0, "ASC"]],
            fixedColumns: true,
            aoColumnDefs: [
                {
                mRender: function (data, type, row) {
                  var elem = ''
                  if(data == 10){
                    elem = '<div class="badge badge-primary">Open</div>'
                  }
                  else if(data == 20){
                    elem = '<div class="badge badge-success">Claimed</div>'
                  }else{
                    elem = '<div class="badge badge-secondary">Expired</div>'

                  }
                        return elem ;
                },
                aTargets: [4],
              },
                {
                mRender: function (data, type, row) {
                    var elem = '<div class="btn-group" role="group" aria-label="Basic example">'
                        elem += `<button class="btn btn-icon btn-info btn-sm" onclick="action('update', ${row.id_token})"><i class="la la-edit"></i></button>`
                        elem += `<button class="btn btn-icon btn-danger btn-sm" onclick="action('delete', ${row.id_token}, '${row.id_biller}')"><i class="la la-trash"></i></button>`
                        elem += '</div>'
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

function action(mode, id_token, id_biller) {
    if(mode == 'delete'){
        Swal.fire({
            html: `Apakah anda yakin menghapus pembayaran ini?`,
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
                        id_token: id_token,
                        id_biller: id_biller
                    },
                    url: "/deleteTokenData",
                    success: function (result) {
                        loadTokenData()
                    }
                })
            }
        })
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/getallTokenData",
            data: $('#modal_add_dealerData').serialize(),
            dataType: 'json',
            success: function (result) {
                var data = result.data 
                $('#modal_add_tokenData').modal('show')
                $('#id_token').val(id.id_token)
                $('#id_biller').val(data.id_biller)
                $('#kd_status').val(data.kd_status)
                $('#valid_until').val(data.valid_until)
                $('wrd').html('Ubah')
            }
        })
    }
}
