$(function(){
	let textarea1=$('textarea')[0];
	let group2=$('.group2')[0];
	let button=$('button')[0];
	let write=$('.write')[0];
	let span=$('span')[0];
	let input=$('input')[0];
	console.log(input)
	let p=$('p')[1];

	let Max=textarea1.maxLength;
	console.log(p);
	let ul=document.querySelector('ul');
	console.log(ul)
	textarea1.onkeyup=function(){
		let neirong=textarea1.value;
		span.innerText=`${Max-neirong.length}`;
	}
	
	textarea1.onkeydown=function(e){
		
		if(e.keyCode==13 && e.shiftKey){
				let lis=document.createElement('li');
				let first=ul.firstElementChild;
				lis.innerHTML=`
		
					<div class="group1">
						<img src="img/6.jpg" alt="">
						<p>${input.value}</p>
					</div>
					<textarea class="group2" name="" id="" cols="30" rows="10">${textarea1.value}</textarea>
			
				`;
				if(first){
					ul.insertBefore(lis,first);
				}else{
					ul.appendChild(lis);
			}
			span.innerText=150;
			input.value=null;	
			textarea1.value=null;
			
		} 

	}
	
	button.onclick=function(){
		let lis=document.createElement('li');
		let first=ul.firstElementChild;
		lis.innerHTML=`
				<div class="group1">
					<img src="img/6.jpg" alt="">
					<p>${input.value}</p>
				</div>
				<textarea class="group2" name="" id="" cols="30" rows="10">${textarea1.value}</textarea>
			`
		if(first){
			ul.insertBefore(lis,first);
		}else{
			ul.appendChild(lis);
		}
		input.value=null;	
		textarea1.value=null;
		span.innerText=150; 	
	}
 
})