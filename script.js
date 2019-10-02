function sumHours(hr1, hr2) {
  var prodhrd = hr1; //"40:50:40";
  var conprodArr = hr2; //"04:12:30";
  prodhrdArr = prodhrd
    .split(':')
    .map(item => item.trim())
    .filter(item => !isNaN(item));
  conprodArr = conprodArr
    .split(':')
    .map(item => item.trim())
    .filter(item => !isNaN(item));
  var hh1 = parseInt(prodhrdArr[0] || 0) + parseInt(conprodArr[0] || 0);
  var mm1 = parseInt(prodhrdArr[1] || 0) + parseInt(conprodArr[1] || 0);
  var ss1 = parseInt(prodhrdArr[2] || 0) + parseInt(conprodArr[2] || 0);

  if (ss1 > 59) {
    var ss2 = ss1 % 60;
    var ssx = ss1 / 60;
    var ss3 = parseInt(ssx); //add into min
    var mm1 = parseInt(mm1) + parseInt(ss3);
    var ss1 = ss2;
  }
  if (mm1 > 59) {
    var mm2 = mm1 % 60;
    var mmx = mm1 / 60;
    var mm3 = parseInt(mmx); //add into hour
    var hh1 = parseInt(hh1) + parseInt(mm3);
    var mm1 = mm2;
  }
  var finaladd = hh1 + ':' + mm1;
  return finaladd;
}

function calculateArr(hours) {
  var arr = hours;
  var sum = '00:00';
  arr.map(item => {
    sum = sumHours(sum, item);
  });
  return sum;
}

$('.area').on('change keyup paste', function(evt) {
  let value = evt.target.value;
  var total = calculateArr(value.split('\n'));
  var rate = $('.rate').val();
  var a = total.split(':'); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60;
  $('.total-hrs').val(total);
  $('.total').val(((seconds / 3600) * rate).toFixed(1));
});
