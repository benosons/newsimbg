$(() => {
  $("#menu-data_slider").addClass("active");
  $('#all_slider').DataTable()

 
  $('#modal_add_slider').on('show.bs.modal', function() {
    $("form").trigger("reset")
    $('.file').empty()
    $('.file').imageUploader();
  })

  load('slider')
});

function load(table) {
  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getdata",
    data: {
      table: table
    },
    success: function (result) {
      let data = result.data;
      let code = result.code;
      if(code != '0'){
        var dt = $("#all_slider").DataTable({
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
              { mDataProp: "title",class: 'text-center' },
              { mDataProp: "status",class: 'text-center' },
              { mDataProp: "create_date",class: 'text-center' },
              { mDataProp: "path", class: 'text-center', width: "10%" },
              { mDataProp: "id", class: 'text-center' },
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
                aTargets: [2],
              },
                {
                mRender: function (data, type, row) {
                    var elem = `<figure class="col-lg-6" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                                  <a href="#!" onclick="viewimage('${data}')" itemprop="contentUrl" >
                                      <img class="img-thumbnail img-fluid" src="${data}" itemprop="thumbnail" alt="Image description" />
                                  </a>
                                </figure>`
                        return elem ;
                },
                aTargets: [4],
              },
              {
              mRender: function (data, type, row) {
                  var elem = '<div class="btn-group" role="group" aria-label="Basic example">'
                      elem += `<button class="btn btn-icon btn-info btn-sm" onclick="action('update', ${row.id})"><i class="la la-edit"></i></button>`
                      elem += `<button class="btn btn-icon btn-danger btn-sm" onclick="action('delete', ${row.id}, '${row.path}')"><i class="la la-trash"></i></button>`
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
      }else{
        var table = $("#all_slider").DataTable()
        table.clear().draw();
      }
    },
  });
}

function viewimage(url) {
  $('#modal_image').modal('show')
  $('#url-image').attr('src', url)
}

function action(mode, id, path) {
  if(mode == 'delete'){
      Swal.fire({
          html: `Apakah anda yakin data ini?`,
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
                      path: path,
                      table: 'slider'
                  },
                  url: "/deletedata",
                  success: function (result) {
                      load('slider')
                  }
              })
          }
      })
  }else {
      $.ajax({
          type: "post",
          dataType: "json",
          url: "/getdata",
          data: {
              id: id,
              table: 'slider'
          },
          success: function (result) {
              var data = result.data 
              $('#modal_add_slider').modal('show')
              $('#id').val(id)
              $('#title').val(data.title)
              $('wrd').html('Update')

              let preloaded = [
                {id: 1, src: data.path},
              ];
            $('.file').empty()
            $('.file').imageUploader({
              preloaded: preloaded
            });
          }
      })
  }
}
