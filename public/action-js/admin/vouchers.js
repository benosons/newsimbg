console.log('You are running jQuery version: ' + $.fn.jquery);
$(document).ready(function(){
loadVoucher();
});

function loadVoucher(){
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/getallVoucherData",
        success: function(result){
            let list = result.data;
            var grid = '';
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                
                grid += `<div class="col-sm-4">
                <div class="card-v" >
                  <div class="ticket">

                    <div class="illustration">
                      <div class="spikes">
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                        <div class="spike"></div>
                      </div>
                      <div class="row">
                        <div class="co-img" style="position: relative;top: 1rem;text-align: center;">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="" />
                        </div>
                        <div class="text-center" style="position: relative;top: 1rem;">
                          <button class="btn btn-xxs btn-warning" class="copybtn">Claim Voucher</button>
                        </div>
                      </div>
                      
                    </div>
                  
                    <div class="ornament">
                      <div class="ornament__sharp"></div>
                      <div class="ornament__cut ornament__cut--1"></div>
                      <div class="ornament__cut ornament__cut--2"></div>
                      <div class="ornament__tail"></div>
                      <div class="content">
                        <div class="content-v">
                          <h2><b>${element.nm_voucher}</b></h2>
                          <h1>${element.jml_potongan} <span>Coupon</span></h1>
                          <p>${element.val}</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>`
            }

            $('#grid').html(grid);
        }
    })
}
