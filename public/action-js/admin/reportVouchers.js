console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $("#menu-user").addClass("active");
    loadVoucherData()
    action()
    $('#modal_add_VoucherData').on('show.bs.modal', function() {
        $("form").trigger("reset")
        $('wrd').html('Tambah')
    })
});

function loadVoucherData() {
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/getallVoucherData",
      success: function (result) {
        let data = result.data;
        let code = result.code;
        var dt = $("#all-vouchers").DataTable({
            dom: 'Bfrtip',
            buttons: [
              {
                  extend: 'excel',
                  text: 'Download Excel',
                  className: 'btn btn-success btn-min-width mr-1 mb-1',
                  exportOptions: {
                    columns:[0,1,2,3,4,5,6,7]
                  }
              }
            ],
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
              { mDataProp: "id_voucher", class: 'text-center', width: "2%" },
              { mDataProp: "kd_voucher",class: 'text-center' },
              { mDataProp: "nm_voucher", width: "15%", class: 'text-center' },
              { mDataProp: "min_pembelian",class: 'text-center' },
              { mDataProp: "jml_potongan",class: 'text-center' },
              { mDataProp: "stock",class: 'text-center' },
              { mDataProp: "expired_by",class: 'text-center' },
              { mDataProp: "jns_potongan",class: 'text-center' },
              { mDataProp: "status", width: "2%", class: 'text-center' },
              { mDataProp: "id", width: "10%", class: 'text-center' }
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
                aTargets: [8],
              },
                {
                mRender: function (data, type, row) {
                    var elem = '<div class="btn-group" role="group" aria-label="Basic example">'
                        elem += `<button class="btn btn-icon btn-info btn-sm" onclick="action('update', ${row.id_voucher})"><i class="la la-edit"></i></button>`
                        elem += `<button class="btn btn-icon btn-danger btn-sm" onclick="action('delete', ${row.id_voucher}, '${row.kd_voucher}')"><i class="la la-trash"></i></button>`
                        elem += '</div>'
                        return elem ;
                },
                aTargets: [9],
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

function action(mode, id_voucher, kd_voucher) {
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
                        id_voucher: id_voucher,
                        kd_voucher: kd_voucher
                    },
                    url: "/deleteVoucher",
                    success: function (result) {
                        loadVoucherData()
                    }
                })
            }
        })
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/getallVoucherData",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                $('#modal_add_VoucherData').modal('show')
                $('#id_voucher').val(id_voucher)
                $('#kd_voucher').val(data.kd_voucher)
                $('#nm_voucher').val(data.nm_voucher)
                $('#min_pembelian').val(data.min_pembelian)
                $('#jml_potongan').val(data.jml_potongan)
                $('#stock').val(data.stock)
                $('#expired_by').val(data.expired_by)
                $('wrd').html('Ubah')
            }
        })
    }
}
