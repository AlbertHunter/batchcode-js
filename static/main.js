$(document).ready(function(){
	$("#ftppwd").val(generate());
	$("#mysqlpwd").val(generate());
	$("#submit").click(function(){
		//check form
		var form = new Array('ftpuser','mysqlrootuser','mysqlrootpwd','mysqluser');
		if(checkForm(form) == false) return false;
		var code = $("#code").val();
		//replace
		var reparr = new Array('ftpuser','ftppwd','mysqlrootuser','mysqlrootpwd','mysqluser','mysqlpwd');
		var res = replaceCode(code,reparr);
		$("#output").val(res);
	});
});
//check the form
function checkForm(arr){
	for(i in arr){	
		$field = $("#"+arr[i]);
		var res = $field.val();
		res = $.trim(res);
		if(res.replace(/(^\s+)|(\s+$)/g, "").length ==0){
			var info = $field.attr('placeholder') + "is empty";
			$('.error-info').html(info);	
			$('.error-info').addClass('bg-danger');
			return false;
		}else{
			$('.error-info').html('');
		}
	}
}
//replace code
function replaceCode(code,arr){
	var res = code;
	for(i in arr){
		$field = $("#"+arr[i]);
		var fieldval = $field.val();
		var reg = new RegExp("\\[" + arr[i] + "\\]","g");
		res = res.replace(reg,fieldval);
	}
	return res;
}
//create password
function getpw(pwdlength, upper, lower, numbers, symbols) {
	var chars = '';
	if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
	if (numbers) chars += '0123456789';
	if (symbols) chars += '!#$%&*+-=?@^_~';
	var pw = '';
	chars = chars.split('');
	for (var i = 0; i < pwdlength; i++) pw += chars[Math.floor(Math.random() * chars.length)];
	return pw;
}
function generate() {
	var pwdlength = document.getElementById('pwdlength').value;
	var upper = lower = numbers = symbols = false;
	if (document.getElementById('upper').checked) upper = true;
	if (document.getElementById('lower').checked) lower = true;
	if (document.getElementById('numbers').checked) numbers = true;
	if (document.getElementById('symbols').checked) symbols = true;
	var Password = '';
	if (pwdlength <= 0 || pwdlength > 50) alert('Random password length is wrong, please reset!');
	else if (!upper && !lower && !numbers && !symbols) alert('Please select character!');
	else Password += getpw(pwdlength, upper, lower, numbers, symbols) + '\r\n';
	var res = Password.substring(0, Password.length - 2);
	return res;
}