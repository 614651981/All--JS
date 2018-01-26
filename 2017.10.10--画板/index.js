window.onload=function () {
    let color=document.querySelector('#colorSelect');
    let opacity=document.querySelector('.opacity');
    let eraserb=document.querySelector('#eraser');
    let canvas=document.querySelector('canvas');
    let ctx=canvas.getContext('2d');
    let pal=new Palette(opacity,canvas,ctx,eraserb);

    // pal.draw('line');   ////不点击直接默认直线
    //不点击直接默认直线
    // line.onclick();

    let tools=document.querySelectorAll('.tool');
    tools.forEach(element=>{
        element.onclick=function () {
            let num=0;
            document.querySelector('li[active=true]').setAttribute('active',false);
            this.setAttribute('active',true);
            if(this.id=='pencil'){
                pal.pencil();
                return;
            }
            if(this.id=='pen'){
                pal.pen();
                return;
            }
            if(this.id=='poly'|| this.id=="polyJ"){
                num=prompt('边数',5);
            }
            pal.draw(this.id,num);
        }
    });
    tools[0].onclick();


    //铅笔
    let pencil=document.querySelector('#pencil');
    pencil.onclick=function () {
        document.querySelector('li[active=true]').setAttribute('active',false);
        this.setAttribute('active',true);
        pal.pencil();
    };

    //填充
    let fill=document.querySelector('#fill');
    fill.onclick=function () {
        document.querySelector('li[active=true]').setAttribute('active',false);
        this.setAttribute('active',true);
        pal.fill();
    };

    //描边
    let stroke=document.querySelector('#stroke');
    stroke.onclick=function () {
        document.querySelector('li[active=true]').setAttribute('active',false);
        this.setAttribute('active',true);
        pal.stroke();
    };


    //撤销按钮
    let recall=document.querySelector('.recall');
    recall.onclick=function () {
        pal.recall();
    };

    // 橡皮擦
    let erasert=document.querySelector('.eraser');
    erasert.onclick=function () {
        pal.Eraser();
    };

    //裁剪
    let clip=document.querySelector('.clip');
    let clipObj=document.querySelector('#clipObj');
    clip.onclick=function () {
        pal.clip(clipObj);
    };


    //换色
    let fc=document.querySelector('#fc');
    let fcbtn=document.querySelector('#fcbtn');
    fc.onclick=function () {
        document.querySelector('li[active=true]').setAttribute('active',false);
        this.setAttribute('active',true);
       pal.fillc(fcbtn);
    };

    //描边色
    let sc=document.querySelector('#sc');
    let scbtn=document.querySelector('#scbtn');

    sc.onclick=function () {
        document.querySelector('li[active=true]').setAttribute('active',false);
        this.setAttribute('active',true);
        pal.strokec(scbtn);
    };

    //清空
    let empty=document.querySelector('.empty');
    empty.onclick=function () {
        pal.empty();
    };


    //保存
    let save=document.querySelector('.save');
    save.onclick=function () {
        let data=canvas.toDataURL('image/png');
        save.href=data;
        save.download='tu.png';

    };

    //新建
    let news=document.querySelector('.new');
    news.onclick=function () {
       let flag=confirm('是否保存？');
       // if(flag){
       //     save.onclick();
       // }
       // empty.onclick();
       //  location.href=

    };


    //反向
    let reverse=document.querySelector('.reverse');
    reverse.onclick=function () {
        pal.reverse();
    }




///////////////////////////////////////////////////////////////////////////
    // //直线
    // let line=document.querySelector('#line');
    // line.onclick=function () {
    //     pal.draw('line');
    // };
    //
    // //虚线
    // let dashed=document.querySelector('#dashed');
    // dashed.onclick=function () {
    //     pal.draw('dashed');
    // };
    //
    //
    // //圆
    // let circle=document.querySelector('#circle');
    // circle.onclick=function () {
    //     pal.draw('circle');
    // };
    //
    // //矩形
    // let rect=document.querySelector('#rect');
    // rect.onclick=function () {
    //     pal.draw('rect');
    // };
    //
    // //多边形
    // let poly=document.querySelector('#poly');
    // poly.onclick=function () {
    //     let n=prompt('请输入边数',5);
    //     pal.draw('poly',n);
    // };
    // //多角形
    // let polyJ=document.querySelector('#polyJ');
    // polyJ.onclick=function () {
    //     let n=prompt('请输入角数',5);
    //     pal.draw('polyJ',n);
    // };
//////////////////////////////////////////////////////////////////////////////

};