// 产生poke
//color 4种花色
$(function () {
    let poke=[];
    let color=['c','d','s','h'];
    let flag={};
    let zhuozi=$('.zhuozi');

    while(poke.length<52){
        let hua=color[Math.floor(Math.random()*color.length)];
        let num=Math.floor(Math.random()*13+1);
        if(!flag[`${hua}_${num}`]){
            poke.push({hua,num});
            flag[`${hua}_${num}`]=true;
        }
    }
    console.log(poke);

    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let left=300-50*i+100*j;
            let top=50*i;
            $('<div>').addClass('box')
                .attr('id',`${i}_${j}`)
                .data('num',poke[index].num)
                .appendTo(zhuozi)
            // .html(`${poke[index]['hua']}---${poke[index]['num']}`)

                .css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
                .delay(20*i).animate({opacity:1,left,top})
            index++;
        }
    }

    //多余扑克牌
    for(;index<poke.length;index++){
        $('<div>').addClass('box zuo')
            .attr('id',`${index}_${index}`)
            .data('num',poke[index].num)
            .appendTo(zhuozi)
        // .html(`${poke[index]['hua']}---${poke[index]['num']}`)
            .css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
            .delay(10*index).animate({opacity:1,left:0,top:460});
        index++;
    }

    let first=null;
    $('.zhuozi').on('click','.box',function (e) {
        let element=$(e.target);
        // $(element).css('box-shadow','0 0 0 3px rgba(23,31,50,0.6)').animate({top:'-=10'});

        //被覆盖的图片不可移动
        let ids=element.attr('id').split('_');
        let ele1=`#${ids[0]*1+1}_${ids[1]}`;
        let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
        if($(ele1).length || $(ele2).length){
            return;
        }

        element.toggleClass('active');
        if(element.hasClass('active')){
            element.animate({top:'-=10'})
        }else {
            element.animate({top:'+=10'})
        }


        if(!first){
           first=element;
        }else{
            if(first.data('num')+element.data('num')===14){
                $('.active').animate({top:0,left:600,opacity:0},function(){
                    $(this).remove();
                })
            }else{
                $('.active').animate({top:'+=10'},function () {
                    $(this).removeClass('active')
                })
            }
            first=null;
        }
    });

    let zindex=0;
    $('.btnR').on('click',(function () {
        if(!$('.zuo').length){
            return;
        }
        $('.zuo').css('zIndex',zindex++).last().animate({left:600,top:460}).removeClass('zuo').addClass('you');
    }));
    $('.btnL').on('click',(function () {
        if(!$('.you').length){
            return;
        }
        // $('.you').css('zIndex',zindex++).first().animate({left:0,top:460}).removeClass('you').addClass('zuo');
        $('.you').each(function (index) {
            $(this). css('zIndex',zindex++).delay(index*100)
                .animate({left:0}).addClass('zuo').removeClass('you');
        });
        $(document).mousedown(false);
    }))




});