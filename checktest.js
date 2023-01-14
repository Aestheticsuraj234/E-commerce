/* import checksum generation utility */
var checksum_lib = require("./PaytmChecksum");
var paytmChecksum = "";


var paytmParams = {}
const received_data = JSON.parse(`{}`);
for(var key in received_data){
    if(key=='CHECKSUMHASH'){
        paytmChecksum = received_data[key];

    }
    else{
        paytmParams = received_data[key];
    }
}


var isValidChecksum = checksum_lib.verifySignature(paytmParams, config.PAYTM_MERCHANT_KEY, paytmChecksum); //add paytm merchhant key later
if (isValidChecksum) {
	console.log("Checksum Matched");
} else {
	console.log("Checksum Mismatched");
}