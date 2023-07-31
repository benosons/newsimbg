console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $("#menu-user").addClass("active");
    loadDealerData()
    action()
    $('#modal_add_dealerData').on('show.bs.modal', function() {
        $("form").trigger("reset")
        $('wrd').html('Tambah')
    })
});

function loadDealerData() {
    $.ajax({
    type: "post",
    dataType: "json",
    url: "/getallDealerData",
    success: function (result) {
      let data = result.data;
      let code = result.code;
      var dt = $("#all-dealer").DataTable({
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
            { mDataProp: "id_biller", class: 'text-center', width: "2%" },
            { mDataProp: "nm_biller",class: 'text-center' },
            { mDataProp: "alamat",class: 'text-center' },
            { mDataProp: "kontak",class: 'text-center' },
            { mDataProp: "create_dtm",class: 'text-center' },
            { mDataProp: "status", width: "2%", class: 'text-center' },
            { mDataProp: "id", width: "10%", class: 'text-center' },
          ],
          order: [[0, "ASC"]],
          fixedColumns: true,
          aoColumnDefs: [
              {
              mRender: function (data, type, row) {
                var elem = ''
                if(data == 1){
                  elem = '<div class="badge badge-success">Aktif</div>'
                }else{
                  elem = '<div class="badge badge-danger">Tidak Aktif</div>'

                }
                      return elem ;
              },
              aTargets: [5],
            },
              {
              mRender: function (data, type, row) {
                  var elem = '<div class="btn-group" role="group" aria-label="Basic example">'
                      elem += `<button class="btn btn-icon btn-info btn-sm" onclick="action('update', ${row.id_biller})"><i class="la la-edit"></i></button>`
                      elem += `<button class="btn btn-icon btn-danger btn-sm" onclick="action('delete', ${row.id_biller}, '${row.nm_biller}')"><i class="la la-trash"></i></button>`
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

function action(mode, id_biller, nm_biller) {
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
                        id_biller: id_biller,
                        nm_biller: nm_biller
                    },
                    url: "/deleteDealerData",
                    success: function (result) {
                        loadDealerData()
                    }
                })
            }
        })
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/getallDealerData",
            data: {
                id_biller: id_biller
            },
            success: function (result) {
                var data = result.data 
                $('#modal_add_dealerData').modal('show')
                $('#id_biller').val(id_biller)
                $('#nm_biller').val(data.nm_biller)
                $('#alamat').val(data.alamat)
                $('#kontak').val(data.kontak)
                $('#tanggal').val(data.tanggal)
                $('#status').val(data.status)
                $('wrd').html('Ubah')
            }
        })
    }
}