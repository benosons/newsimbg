console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
  $("#menu-user").addClass("active");
    loadPaymentData()
    action()
    $('#modal_add_paymentData').on('show.bs.modal', function() {
        $("form").trigger("reset")
        $('wrd').html('Tambah')
    })
});

function loadPaymentData() {
    $.ajax({
      type: "post",
      dataType: "json",
      url: "/getallPaymentData",
      success: function (result) {
        let data = result.data;
        let code = result.code;
        var dt = $("#all-payment").DataTable({
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
              { mDataProp: "invoice",class: 'text-center' },
              { mDataProp: "customer_id", width: "15%", class: 'text-center' },
              { mDataProp: "grand_total",class: 'text-center' },
              { mDataProp: "create_at",class: 'text-center' },
              { mDataProp: "id", width: "10%", class: 'text-center' },
            ],
            order: [[0, "ASC"]],
            fixedColumns: true,
            aoColumnDefs: [
              //   {
              //   mRender: function (data, type, row) {
              //     var elem = ''
              //     if(data == 1){
              //       elem = '<div class="badge badge-success">Aktif</div>'
              //     }else{
              //       elem = '<div class="badge badge-danger">Tidak Aktif</div>'

              //     }
              //           return elem ;
              //   },
              //   aTargets: [4],
              // },
                {
                mRender: function (data, type, row) {
                    var elem = '<div class="btn-group" role="group" aria-label="Basic example">'
                        elem += `<button class="btn btn-icon btn-info btn-sm" onclick="action('update', ${row.id})"><i class="la la-edit"></i></button>`
                        elem += `<button class="btn btn-icon btn-danger btn-sm" onclick="action('delete', ${row.id}, '${row.invoice}')"><i class="la la-trash"></i></button>`
                        elem += '</div>'
                        return elem ;
                },
                aTargets: [5],
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

function action(mode, id, invoice) {
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
                        id: id,
                        invoice: invoice
                    },
                    url: "/deletePaymentData",
                    success: function (result) {
                      loadPaymentData()
                    }
                })
            }
        })
    }else {
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/getallPaymentData",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                $('#modal_add_paymentData').modal('show')
                $('#id').val(id)
                $('#invoice').val(data.invoice)
                $('#customer_id').val(data.customer_id)
                $('#grand_total').val(data.grand_total)
                $('#create_at').val(data.create_at)
                $('wrd').html('Ubah')
            }
        })
    }
}
