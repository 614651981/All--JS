$(function(){
	let qipan=$('.qipan');
	let hei={};
	let bai={};
	let kongbai={};  //0_0{x:0,y:0}
	let isAI=true;
	// for(let i=0;i<5;i++){
	// 	$('<i>').appendTo(qipan);
	// }
	// for(let i=0;i<15;i++){
	// 	$('<div>').addClass('shu').appendTo(qipan);
	// 	$('<span>').addClass('hang').appendTo(qipan);	
	
	// 	for(let j=0;j<15;j++){
	// 		$('<li>').addClass('qizi').appendTo(qipan);
	// 	}
	// }
	// qipan.on('click',function(e){
	// 	let element=$(e.target);
		
	// 	element.addClass('hei').css({opacity:'1'});
	// 	element.next().addClass('bai').css({opacity:'1'});

	// })

	for(let i=0;i<15;i++){
		$('<div>').addClass('shu').appendTo(qipan);
		$('<span>').addClass('hang').appendTo(qipan);
		for(let j=0;j<15;j++){
			kongbai[i+'_'+j]={x:i,y:j};
			$('<li>').addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j}).appendTo(qipan);
		}
	}

	let flag=true;
	$('.qizi').on('click',function(){
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return;
		}
		let data=$(this).data('pos');

		if(flag){
			$(this).addClass('hei');
			hei[data.x+'_'+data.y]=true;

			delete kongbai[data.x+'_'+data.y];

			if(panduan(data,hei)>=5){
				$('.qizi').off();
				alert('黑棋获胜！');
				
			}

//人机
			if(isAI){
				let pos=ai();
				$(`#${pos.x}_${pos.y}`).addClass('bai');
				
				bai[pos.x+'_'+pos.y]=true;
				delete kongbai[pos.x+'_'+pos.y];
				if(panduan(pos,bai)>=5){
					$('.qizi').off();
					alert('白棋获胜！');
				}
				return;
			}


		}else{
			$(this).addClass('bai');
			bai[data.x+'_'+data.y]=true;

			delete kongbai[data.x+'_'+data.y];
			
			if(panduan(data,bai)>=5){
				$('.qizi').off();
				alert('白棋获胜！');
			}
		}
		flag=!flag;

	})


	function ai(){
		let max = -Infinity,max1 = -Infinity;
		let zb=null,zb1=null;
		for(let i in kongbai){
			let score=panduan(kongbai[i],bai);
			if(score>max){
				max=score;
				zb=kongbai[i];
			}
		}

		for(let i in kongbai){
			let score=panduan(kongbai[i],hei);
			if(score>max1){
				max1=score;
				zb1=kongbai[i];
			}
		}

		return (max>=max1)?zb:zb1;
	}




	//判断  传参（位置、颜色）
		function panduan(pos,obj){
			let rows=1,cols=1,zx=1,yx=1;
			let i=pos.x, j=pos.y+1;
			
			while(obj[i+"_"+j]){
				rows++;
				j++;
			}
			j=pos.y-1;
			while(obj[i+"_"+j]){
				rows++;
				j--;
			}
			
			i=pos.x+1,j=pos.y;
			while(obj[i+"_"+j]){
				cols++;
				i++;
			}
			i=pos.x-1,j=pos.y;
			while(obj[i+"_"+j]){
				cols++;
				i--;
			}
			
			i=pos.x-1,j=pos.y-1;


			while(obj[i+"_"+j]){
				zx++;
				i--;
				j--;
			}
			i=pos.x+1,j=pos.y+1;
			while(obj[i+"_"+j]){
				zx++;
				i++;
				j++;
			}
			

			i=pos.x-1,j=pos.y+1;


			while(obj[i+"_"+j]){
				yx++;
				i--;
				j++;
			}
			i=pos.x+1,j=pos.y-1;
			while(obj[i+"_"+j]){
				zx++;
				i++;
				j--;
			}
			return Math.max(rows,cols,zx,yx);
		}


	let news =$('.new');
	news.on('click',function(){
		$('.qizi .hei').remove();
	})

})