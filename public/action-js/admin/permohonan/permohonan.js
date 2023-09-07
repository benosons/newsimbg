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
  loadpermohonan()
} );

stepper1 = new Stepper(document.querySelector('#stepper1'))

function loadpermohonan() {
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
            { mDataProp: "id", class: 'text-center', width: "2%" },
            { mDataProp: "nm_jns_permohonan",class: 'text-center' },
            { mDataProp: "nama_pemilik" },
            { mDataProp: "no_registrasi",class: 'text-center' },
            { mDataProp: "address", width: "3%" },
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
                  elem =  `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">Input Permohonan</span>`
                }else if (data == 3){
                  elem =  `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">Terbit</span>`
                }else if (data == 4){
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
                }else if (row.status == 3){
                  var elem = `<div class="btn-group" role="group" aria-label="First group">
                              <button type="button" class="btn btn-warning btn-sm btn-icon" onclick="action('detail', ${row.id_permohonan_slf})"><i class="bx bx-file me-0 fs-6"></i></button>
                              
                            </div>`
                }else if (row.status == 4){
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

$('#tmb-fungsi_bangunan').on('change', function() {
  // alert( this.value );

  var id = this.value

  $('#tmb-jenis_bangunan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonjbg",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-jenis_bangunan').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id']+`">`+data[x]['nm_jenis_bg']+`</option>`
                  $('#tmb-jenis_bangunan').append(valx)
                }
            }
        })

});

$('#tmb-prov').on('change', function() {
  // alert( this.value );

  var id = this.value

  $('#tmb-kabkot option').remove();
  $('#tmb-kecamatan option').remove();
  $('#tmb-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkabkot",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-kabkot').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kabkot']+`">`+data[x]['nama_kabkota']+`</option>`
                  $('#tmb-kabkot').append(valx)
                }
            }
        })

});

$('#tmb-kabkot').on('change', function() {
  // alert( this.value );

  var id = this.value

  // $('#tmb-kabkot option').remove();
  $('#tmb-kecamatan option').remove();
  $('#tmb-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkec",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-kecamatan').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kecamatan']+`">`+data[x]['nama_kecamatan']+`</option>`
                  $('#tmb-kecamatan').append(valx)
                }
            }
        })

});

$('#tmb-kecamatan').on('change', function() {
  // alert( this.value );

  var id = this.value

  // $('#tmb-kabkot option').remove();
  // $('#tmb-kecamatan option').remove();
  $('#tmb-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkel",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-kelurahan').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kelurahan']+`">`+data[x]['nama_kelurahan']+`</option>`
                  $('#tmb-kelurahan').append(valx)
                }
            }
        })

});

$('#tmb-dapem-prov').on('change', function() {
  // alert( this.value );

  var id = this.value

  $('#tmb-dapem-kabkot option').remove();
  $('#tmb-dapem-kecamatan option').remove();
  $('#tmb-dapem-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkabkot",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-dapem-kabkot').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kabkot']+`">`+data[x]['nama_kabkota']+`</option>`
                  $('#tmb-dapem-kabkot').append(valx)
                }
            }
        })

});

$('#tmb-dapem-kabkot').on('change', function() {
  // alert( this.value );

  var id = this.value

  // $('#tmb-dapem-kabkot option').remove();
  $('#tmb-dapem-kecamatan option').remove();
  $('#tmb-dapem-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkec",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-dapem-kecamatan').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kecamatan']+`">`+data[x]['nama_kecamatan']+`</option>`
                  $('#tmb-dapem-kecamatan').append(valx)
                }
            }
        })

});

$('#tmb-dapem-kecamatan').on('change', function() {
  // alert( this.value );

  var id = this.value

  // $('#tmb-dapem-kabkot option').remove();
  // $('#tmb-dapem-kecamatan option').remove();
  $('#tmb-dapem-kelurahan option').remove();

  $.ajax({
            type: "post",
            dataType: "json",
            url: "/getjsonkel",
            data: {
                id: id
            },
            success: function (result) {
                var data = result.data 
                // console.log(data)
                var val0 = '<option value="0" selected="">Pilih...</option>'
                $('#tmb-dapem-kelurahan').append(val0)
                for (x in data){
                  // console.log(data[x])
                  var valx = `<option value="`+data[x]['id_kelurahan']+`">`+data[x]['nama_kelurahan']+`</option>`
                  $('#tmb-dapem-kelurahan').append(valx)
                }
            }
        })

});

$('#form_permohonan').on('keyup change paste', 'input, select, textarea', function(){

  if(($('#tmb-jenis_permohonan :selected').val() != 0) && ($('#tmb-fungsi_bangunan :selected').val() != 0) && ($('#tmb-jenis_bangunan :selected').val() != undefined) && 
  ($('#tmb-nama_bangunan').val() != '') && ($('#tmb-luas_bangunan').val() != '') && ($('#tmb-jumlah_lantai').val() != '') && 
  ($('#tmb-tinggi_bangunan').val() != '') && ($('#tmb-prov :selected').val() != 0) && ($('#tmb-kabkot :selected').val() != undefined) && 
  ($('#tmb-kecamatan :selected').val() != undefined) && ($('#tmb-kelurahan :selected').val() != undefined) && 
  ($('#tmb-alamat').val() != '')){
    $('#btn-perm_val_1').prop('disabled', false);
  } else {
    $('#btn-perm_val_1').prop('disabled', true);
  }

  if(($('#tmb-dapem-status_kepemilikan :selected').val() != 0) && ($('#tmb-dapem-jenis_tanda_pengenal :selected').val() != 0) && 
  ($('#tmb-dapem-nama_pemilik').val() != '') && ($('#tmb-dapem-no_ktp').val() != '') && ($('#tmb-dapem-prov :selected').val() != 0) && 
  ($('#tmb-dapem-kabkot :selected').val() != undefined) && ($('#tmb-dapem-kecamatan :selected').val() != undefined) && 
  ($('#tmb-dapem-kelurahan :selected').val() != undefined) && ($('#tmb-dapem-alamat').val() != '') && ($('#tmb-dapem-telp').val() != '') && 
  ($('#tmb-dapem-email').val() != '')){
    $('#btn-perm_val_2').prop('disabled', false);
  } else {
    $('#btn-perm_val_2').prop('disabled', true);
  }

  if (($('#tmb-danah-dok_kepemilikan').val() != 0) && ($('#tmb-danah-hak_kepemilikan').val() != 0) && 
  ($('#tmb-danah-no_dokumen').val() != '') && ($('#tmb-danah-luas_tanah').val() != '') && ($('#tmb-danah-nama_pemilik').val() != '') && 
  ($('#tmb-danah-alamat').val() != '') && ($('#tmb-danah-tgl_terbit_dok').val() != '')){
    $('#btn-perm_val_3').prop('disabled', false);
  } else {
    $('#btn-perm_val_3').prop('disabled', true);
  }

  // $('#btn-perm_val_1').prop('disabled', false);
  // $('#btn-perm_val_2').prop('disabled', false);
  // $('#btn-perm_val_3').prop('disabled', false);

});

$('#btn-sub_add_perm').click(function(){
  // console.log('wajiwajiawjiwjia')
  var alamat_pemilik = $('#tmb-dapem-alamat').val() + ', ' + $('#tmb-dapem-kelurahan :selected').text() + ', ' + $('#tmb-dapem-kecamatan :selected').text() + ', ' + $('#tmb-dapem-kabkot :selected').text()
  var lokasi_bg = $('#tmb-alamat').val() + ', ' + $('#tmb-kelurahan :selected').text() + ', ' + $('#tmb-kecamatan :selected').text() + ', ' + $('#tmb-kabkot :selected').text()

  $('#pernyataan-jenis_konsul').html($('#tmb-jenis_permohonan :selected').text())
  $('#pernyataan-nama_pemilik').html($('#tmb-dapem-nama_pemilik').val())
  $('#pernyataan-alamat_pemilik').html(alamat_pemilik)
  $('#pernyataan-lokasi_bangunan').html(lokasi_bg)

  $('#pernyataan-data_luas').html($('#tmb-luas_bangunan').val())
  $('#pernyataan-data_tinggi').html($('#tmb-tinggi_bangunan').val())
  $('#pernyataan-data_lantai').html($('#tmb-jumlah_lantai').val())

})

// if($('#check-semua_persyaratan').prop('checked', true)){
//     $('#submit-add-permohonan').prop('disabled', false);
// } else{
//     $('#submit-add-permohonan').prop('disabled', true);
// }

var checkBox1 = document.getElementById("check-krk_kkpr");
var checkBox2 = document.getElementById("check-pelaksana_konstruksi");
var checkBox3 = document.getElementById("check-pengawas_berserti");
var checkBox4 = document.getElementById("check-tidak_sengketa");
var checkBox5 = document.getElementById("check-tahan_gempa");
var checkBoxdone = document.getElementById("check-semua_persyaratan");

$(".checkval").change(function() {
  // console.log('aijwijawijwaij')
  if((checkBoxdone.checked == true) && (checkBox1.checked == true) && (checkBox2.checked == true) && (checkBox3.checked == true) && (checkBox4.checked == true) && (checkBox5.checked == true)) {
    // console.log('123141')
    $('#submit-add-permohonan').prop('disabled', false);
  } else {
    $('#submit-add-permohonan').prop('disabled', true);
  }
});
    

$('#submit-add-permohonan').click(function(){

  // let isObject         = {};

  // isObject.id_jenis_permohonan            = $('#tmb-jenis_permohonan :selected').val()
  // isObject.id_fungsi_bg                   = $('#tmb-fungsi_bangunan :selected').val()
  // isObject.id_jenis_bg                    = $('#tmb-jenis_bangunan :selected').val()
  // isObject.nama_bg                        = $('#tmb-nama_bangunan').val()
  // isObject.luas_bg                        = $('#tmb-luas_bangunan').val()
  // isObject.jml_lantai_bg                  = $('#tmb-jumlah_lantai').val()
  // isObject.tinggi_bg                      = $('#tmb-tinggi_bangunan').val()
  // isObject.luas_basement_bg               = $('#tmb-luas_basement').val()
  // isObject.jml_lantai_basement_bg         = $('#tmb-jml_lantai_basement').val()
  // isObject.perencana_dok_teknis           = $('#tmb-perancangan_dok_teknis').text()
  // isObject.id_prov_bg                     = $('#tmb-prov :selected').val()
  // isObject.id_kabkot_bg                   = $('#tmb-kabkot :selected').val()
  // isObject.id_kec_bg                      = $('#tmb-kecamatan :selected').val()
  // isObject.id_kel_bg                      = $('#tmb-kelurahan :selected').val()
  // isObject.alamat_bg                      = $('#tmb-alamat').val()
  // isObject.id_stat_kepemilikan            = $('#tmb-dapem-status_kepemilikan :selected').val()
  // isObject.id_jenis_tanda_pengenal        = $('#tmb-dapem-jenis_tanda_pengenal :selected').val()
  // isObject.nama_pemilik                   = $('#tmb-dapem-nama_pemilik').val()
  // isObject.no_tanda_pengenal              = $('#tmb-dapem-no_ktp').val()
  // isObject.id_prov_pemilik                = $('#tmb-dapem-prov :selected').val()
  // isObject.id_kabkot_pemilik              = $('#tmb-dapem-kabkot :selected').val()
  // isObject.id_kec_pemilik                 = $('#tmb-dapem-kecamatan :selected').val()
  // isObject.id_kel_pemilik                 = $('#tmb-dapem-kelurahan :selected').val()
  // isObject.alamat_pemilik                 = $('#tmb-dapem-alamat').val()
  // isObject.no_telp_pemilik                = $('#tmb-dapem-telp').val()
  // isObject.email_pemilik                  = $('#tmb-dapem-email').val()
  // isObject.id_jenis_dok_tanah             = $('#tmb-danah-dok_kepemilikan :selected').val()
  // isObject.no_dok_tanah                   = $('#tmb-danah-no_dokumen').val()
  // isObject.tgl_terbit_dok_tanah           = $('#tmb-danah-tgl_terbit_dok').val()
  // isObject.luas_tanah                     = $('#tmb-danah-luas_tanah').val()
  // isObject.id_hak_tanah                   = $('#tmb-danah-hak_kepemilikan :selected').val()
  // isObject.nama_hak_tanah                 = $('#tmb-danah-nama_pemilik').val()
  // isObject.alamat_tanah                   = $('#tmb-danah-alamat').val()
  // isObject.perjanjian_pemanfaatan_tanah   = $('#tmb-danah-ptpt :selected').val()
  // isObject.file_kepemilikan_tanah         = 
  // isObject.file_teknis_tanah              = 
  // isObject.file_ktp_kitas                 = 
  // isObject.file_krk_kkpr                  = 
  // isObject.file_penyedia_jasa             = 
  // isObject.gmb_situasi                    = 
  // isObject.gmb_rencana_tapak              = 
  // isObject.gmb_denah                      = 
  // isObject.gmb_potongan                   = 
  // isObject.gmb_tampak                     = 
  // isObject.gmb_det_arsitek                = 
  // isObject.gmb_fondasi                    = 
  // isObject.gmb_kolom                      = 
  // isObject.gmb_balok                      = 
  // isObject.gmb_rangka_atap                = 
  // isObject.gmb_det_struk                  = 
  // isObject.gmb_jaringan_listrik           = 
  // isObject.gmb_sistem_sanitasi            = 
  // isObject.status                         = 
  // isObject.is_deleted                     = 
  // isObject.created_date                   = 
  // isObject.created_by                     = 
   
  // console.log(isObject)



  $.ajax({
    type: "post",
    dataType: "json",
    url: "/getjsoncount",
    success: function (result) {
        var data = result.data 
        console.log(data[0]['count(*)'])
        var parnumber = parseInt(parseInt(data[0]['count(*)'])+1)

        var date = new Date();

        var datex =  ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
        var noreg = 'PBG-997101-'+datex+'-'+parnumber.toString().padStart(3, '0');

        var strDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

        id_jenis_permohonan            = $('#tmb-jenis_permohonan :selected').val()
        id_fungsi_bg                   = $('#tmb-fungsi_bangunan :selected').val()
        id_jenis_bg                    = $('#tmb-jenis_bangunan :selected').val()
        nama_bg                        = $('#tmb-nama_bangunan').val()
        luas_bg                        = $('#tmb-luas_bangunan').val()
        jml_lantai_bg                  = $('#tmb-jumlah_lantai').val()
        tinggi_bg                      = $('#tmb-tinggi_bangunan').val()
        luas_basement_bg               = $('#tmb-luas_basement').val()
        jml_lantai_basement_bg         = $('#tmb-jml_lantai_basement').val()
        perencana_dok_teknis           = $('#tmb-perancangan_dok_teknis').val()
        id_prov_bg                     = $('#tmb-prov :selected').val()
        id_kabkot_bg                   = $('#tmb-kabkot :selected').val()
        id_kec_bg                      = $('#tmb-kecamatan :selected').val()
        id_kel_bg                      = $('#tmb-kelurahan :selected').val()
        alamat_bg                      = $('#tmb-alamat').val()
        id_stat_kepemilikan            = $('#tmb-dapem-status_kepemilikan :selected').val()
        id_jenis_tanda_pengenal        = $('#tmb-dapem-jenis_tanda_pengenal :selected').val()
        nama_pemilik                   = $('#tmb-dapem-nama_pemilik').val()
        no_tanda_pengenal              = $('#tmb-dapem-no_ktp').val()
        id_prov_pemilik                = $('#tmb-dapem-prov :selected').val()
        id_kabkot_pemilik              = $('#tmb-dapem-kabkot :selected').val()
        id_kec_pemilik                 = $('#tmb-dapem-kecamatan :selected').val()
        id_kel_pemilik                 = $('#tmb-dapem-kelurahan :selected').val()
        alamat_pemilik                 = $('#tmb-dapem-alamat').val()
        no_telp_pemilik                = $('#tmb-dapem-telp').val()
        email_pemilik                  = $('#tmb-dapem-email').val()
        id_jenis_dok_tanah             = $('#tmb-danah-dok_kepemilikan :selected').val()
        no_dok_tanah                   = $('#tmb-danah-no_dokumen').val()
        tgl_terbit_dok_tanah           = $('#tmb-danah-tgl_terbit_dok').val()
        luas_tanah                     = $('#tmb-danah-luas_tanah').val()
        id_hak_tanah                   = $('#tmb-danah-hak_kepemilikan :selected').val()
        nama_hak_tanah                 = $('#tmb-danah-nama_pemilik').val()
        alamat_tanah                   = $('#tmb-danah-alamat').val()
        perjanjian_pemanfaatan_tanah   = $('#tmb-danah-ptpt :selected').val()

        $.ajax({
            type: "post",
            dataType: "json",
            url: "/addpermohonan",
            data: {
              id_jenis_permohonan            : id_jenis_permohonan,         
              id_fungsi_bg                   : id_fungsi_bg,                
              id_jenis_bg                    : id_jenis_bg,                 
              nama_bg                        : nama_bg,                     
              luas_bg                        : luas_bg,                     
              jml_lantai_bg                  : jml_lantai_bg,               
              tinggi_bg                      : tinggi_bg,                   
              luas_basement_bg               : luas_basement_bg,            
              jml_lantai_basement_bg         : jml_lantai_basement_bg,      
              perencana_dok_teknis           : perencana_dok_teknis,        
              id_prov_bg                     : id_prov_bg,                  
              id_kabkot_bg                   : id_kabkot_bg,                
              id_kec_bg                      : id_kec_bg,                   
              id_kel_bg                      : id_kel_bg,                   
              alamat_bg                      : alamat_bg,                   
              id_stat_kepemilikan            : id_stat_kepemilikan,         
              id_jenis_tanda_pengenal        : id_jenis_tanda_pengenal,     
              nama_pemilik                   : nama_pemilik,                
              no_tanda_pengenal              : no_tanda_pengenal,           
              id_prov_pemilik                : id_prov_pemilik,             
              id_kabkot_pemilik              : id_kabkot_pemilik,           
              id_kec_pemilik                 : id_kec_pemilik,              
              id_kel_pemilik                 : id_kel_pemilik,              
              alamat_pemilik                 : alamat_pemilik,              
              no_telp_pemilik                : no_telp_pemilik,             
              email_pemilik                  : email_pemilik,               
              id_jenis_dok_tanah             : id_jenis_dok_tanah,          
              no_dok_tanah                   : no_dok_tanah,                
              tgl_terbit_dok_tanah           : tgl_terbit_dok_tanah,        
              luas_tanah                     : luas_tanah,                  
              id_hak_tanah                   : id_hak_tanah,                
              nama_hak_tanah                 : nama_hak_tanah,              
              alamat_tanah                   : alamat_tanah,                
              perjanjian_pemanfaatan_tanah   : perjanjian_pemanfaatan_tanah,
              in_date                        : strDate,
              no_registrasi                  : noreg

            },
            success: function (result) {
                // var data = result.data 
                // console.log(data)

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
                
            }
        })

    }
  })
  
}); 



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
    $('#exampleExtraLargeModal2').modal('toggle');
    $('#exampleExtraLargeModal2').modal('show');
  }
}