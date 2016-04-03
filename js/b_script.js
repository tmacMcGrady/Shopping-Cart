window.onload = function(){
//判断document.getElementsByClassName 是否兼容IE浏览器
	if(!document.getElementsByClassName){
		document.getElementsByClassName = function(cls){
			var ret = [];
			var els = document.getElementsByTagName("*");
			for(var i=0; i<els.length; i++){
				if(els[i].className === cls 
					|| els[i].className.indexOf(cls + ' ')>=0
					|| els[i].className.indexOf(' ' +cls)>=0
					|| els[i].className.indexOf(' ' +cls + ' ')>=0
					){
				ret.push(els[i]);
			 }
			}
			return ret;
		}
	}
	var cartTable = document.getElementById("cartTable");
	var tr = cartTable.children[1].rows;
	var checkInputs = document.getElementsByClassName("check");
	var checkAllInputs = document.getElementsByClassName("check-all");
	var selectedTotal = document.getElementById("selectedTotal");
	var priceTotal = document.getElementById("priceTotal");
	var selected = document.getElementById("selected");
	var foot = document.getElementById("foot");
	var selectedViewList = document.getElementById("selectedViewList");
	var deleteAll = document.getElementById("deleteAll");
	

// 计算总的函数
    function getTotal(){
    	var seleted = 0;
        var price = 0;
        var HTMLstr = '';
    	for(var i=0; i<tr.length; i++){
    		if(tr[i].getElementsByTagName("input")[0].checked){
    			tr[i].className = "on";
    			seleted += parseInt(tr[i].getElementsByTagName("input")[1].value);
    			price += parseFloat(tr[i].cells[4].innerHTML);
    			HTMLstr += '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">取消选择</span></div>'
    		}else{
    			tr[i].className = "";
    		}

    	}
    	selectedTotal.innerHTML = seleted;
    	priceTotal.innerHTML = price.toFixed(2);
    	selectedViewList.innerHTML =HTMLstr;
    	if(seleted == 0){
    		foot.className = "foot";
    	}
    }
// 计算但行函数
    function getSubTotal(tr){
    	var tds = tr.cells;
    	var count = tr.getElementsByTagName('input')[1].value;
    	var price = parseFloat(tds[2].innerHTML);
    	var subtotal = parseFloat(count*price);
    	tds[4].innerHTML = subtotal.toFixed(2);
    }


	for(var i=0; i<checkInputs.length; i++){
		checkInputs[i].onclick = function(){
			
			if(this.className === "check-all check"){
				for(var j=0;j<checkInputs.length;j++){
					checkInputs[j].checked = this.checked;
				}
			}
			if(this.checked == false){
				for(var k=0;k<checkAllInputs.length;k++){
					checkAllInputs[k].checked = false
				}
			}
			getTotal();
		}
	}
//点击显示悬浮层
   selected.onclick = function(){
   	if(foot.className == "foot"){
   		foot.className = "foot show";
   	}else{
   		foot.className = "foot";
   	}
   	if(selectedTotal.innerHTML == 0){
   		foot.className = "foot";
   	}
   }
//事件代理和项目名称
   selectedViewList.onclick = function(e){
   	var e = e || window.event;  //同样是判断IE的兼容性
   	var el = e.srcElement;
   	if(el.className =="del"){
   		var index = el.getAttribute("index");
   		var input =tr[index].getElementsByTagName("input")[0];
   		input.checked = false;
   		input.onclick();
   	}
   }

//全部删除功能
   deleteAll.onclick = function(){
   	if(selectedTotal.innerHTML !=0){
   		var conf = confirm("确定要全部删除吗?");
   		if(conf){
   			for(var i=0; i<tr.length; i++){
   				var input = tr[i].getElementsByTagName('input')[0]
   				if(input.checked){
   					tr[i].parentNode.removeChild(tr[i]);
   					i--;
   				}
   				
   			}
   		}
   	}
    getTotal();
   }
 //加减商品数量
 for(var i=0; i<tr.length; i++){
 	tr[i].onclick = function(e){
 		var e = e || window.event;  //同样是判断IE的兼容性
   		var el = e.srcElement;
   		var cls = el.className;
   		var input = this.getElementsByTagName('input')[1];
   		var val = parseInt(input.value);
   		var reduce = this.getElementsByTagName('span')[1];
   		switch(cls){
   			case 'add':
	   			input.value = val +1;
	   			getSubTotal(this);
	   			if(input.value > 1){
	   				reduce.innerHTML = "-";
	   			}else{
	   				reduce.innerHTML = "";
	   			}
	   			break;
   			case 'reduce':
	   			input.value = val -1;
	   			getSubTotal(this);
	   			if(input.value <= 1){
	   				reduce.innerHTML = "";
	   			}else{
	   				reduce.innerHTML = "-";
	   			};
	   			break;
	   		case 'delete':
	   			var cof = confirm("确定要删除吗？")
	   			if(cof){
	   				this.parentNode.removeChild(this)
	   			}
	   			break;
   			default :
   				break;
   		}
   		getTotal();
 	}
 	tr[i].getElementsByTagName("input")[1].onkeyup = function(){		
 		var tr = this.parentNode.parentNode;
 		var reduce = tr.getElementsByTagName("span")[1];
 		var val =parseInt(this.value);
 		var tds = tr.cells;
 		var subtotal = tds[4];
 		if(isNaN(val) || val <1){
 			val =1;
 			
 		}
 		this.value = val;
 		if(val <=1){
 			// val =1;
 			// subtotal.innerHTML = tr.cells[2]
 			reduce.innerHTML = ""
 		}else{
 			reduce.innerHTML = "-"
 		}
 		
 		getSubTotal(tr);
 		getTotal()
 	}

 }
 checkAllInputs[0].checked = true;
 checkAllInputs[0].onclick();
}