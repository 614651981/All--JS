// $(function(){
// 	let small=$('.small')[0];
// 	let smallimg=$('img' ,small)[0];
// 	let big=$('.big')[0];
// 	let bigimg=$('img',big)[1];
// 	console.log(bigimg)
// 	let bili=bigimg.offsetWidth / parseInt(getComputedStyle(small,null).width);
// 	console.log(bili)
// 	small.onmousemove=function(e){
// 		let ox=e.offsetX,oy=e.offsetY;
// 		bigimg.style.left=`${-ox*bili}px`;
// 		bigimg.style.top=`${-oy*bili}px`;
// 	};
// })
// 
// 
$(function(){
	let small=$('.small')[0];
 	let smallimg=$('img' ,small)[0];
 	let big=$('.big')[0];
 	let bigimg=$('img',big)[1];
 	let zhezhao1=$('.zhezhao1')[0];
 	let zhezhao2=$('.zhezhao2')[0];
 	let sw=small.offsetWidth;
 	let sh=small.offsetHeight;
 	let bw=big.offsetWidth;
 	let bh=big.offsetHeight;
 	let zw=zhezhao2.offsetWidth;
 	let zh=zhezhao2.offsetHeight;
zhezhao1.onmousemove=function(e){
	let ox=e.offsetX-zw/2,oy=e.offsetY-zh/2;
	if(ox>=sw-zw){
		ox=sw-zw;
	}
	if(ox<=0){
		ox=0;
	}
	if(oy>=sh-zh){
		oy=sh-zh;
	}
	if(oy<=0){
		oy=0;
	}
	zhezhao2.style.left=ox+'px';
	zhezhao2.style.top=oy+'px';

	bigimg.style.width=sw * bw / zw + 'px';
	bigimg.style.height=sh * bh/ zh + 'px';
	bigimg.style.left=-sw * ox / zw + "px";
	bigimg.style.top=-sh * oy / zh +"px";


}





})