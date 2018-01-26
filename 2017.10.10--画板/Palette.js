// 方法:
//     画线、虚线、矩形、多边形、多角形、圆（填充、描边）、铅笔
//
//     橡皮擦
//     撤销
//     裁切
//     新建
//     保存
//
// 属性:
//     线宽、线端点样式、填充、描边、样式、边数



class Palette{
    constructor(opacity,canvas,ctx,eraserb){
        this.opacity=opacity;
        this.canvas=canvas;
        this.ctx=ctx;
        this.eraser = eraserb;
        this.history=[];
        this.temp=null;

        this.cw=this.canvas.width;
        // console.log(this.cw);
        this.ch=this.canvas.height;

        //样式
        this.lineCap='butt';
        this.style='stroke';
        this.fillStyle='#000';
        this.strokeStyle='#000';
    }


    // init 初始化
    // init(){
    //     this.ctx.lineWidth=this.lineWidth;
    // }
    // 
    
    draw(type,n){
        this.opacity.onmousedown=function (e) {
            let cx=e.offsetX, cy=e.offsetY;
            this.opacity.onmousemove=function (e) {
                let ox=e.offsetX, oy=e.offsetY;
                this.ctx.clearRect(0,0,this.cw,this.ch);
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this[type](cx,cy,ox,oy,n);
            }.bind(this);
            this.opacity.onmouseup=function () {
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.ctx.setLineDash([3,0]);
                this.opacity.onmousemove=null;
                this.opacity.onmouseup=null;
            }.bind(this);

        }.bind(this);
    }
//////////////////////////draw 结束



    //直线
    line(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(ox,oy);
        this.ctx.stroke();
    }
    //虚线
    dashed(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.setLineDash([3,5]);
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(ox,oy);
        this.ctx.stroke();
    }


    //圆
    circle(cx,cy,ox,oy){
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.beginPath();
        this.ctx.arc(cx,cy,r,0,Math.PI*2);
        // this.ctx.stroke();
        this.ctx[this.style]();
    }

    //矩形
    rect(cx,cy,ox,oy){
        for(let i=0;i<4;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(cx,cy);
            let w=Math.abs(cx-ox);
            let h=Math.abs(cy-oy);
            this.ctx.rect(cx,cy,w,h);
            // this.ctx.stroke();
            this.ctx[this.style]();
        }
    }

    //多边形
    poly(cx,cy,ox,oy,n){
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let rad= Math.PI*2/n;
        this.ctx.beginPath();
        this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<n;i++){
            let x=cx+r*Math.cos(rad*i);
            let y=cy+r*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        // this.ctx.stroke();
        this.ctx[this.style]();
    }
    //多角形
    polyJ(cx,cy,ox,oy,n){
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let rad= Math.PI / n;
        this.ctx.beginPath();
        this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<2*n;i++){
            let r1;
            r1=i%2==0 ? r:r/2;
            let x=cx+r1*Math.cos(rad*i);
            let y=cy+r1*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
    }


    pencil(){           //铅笔
        this.opacity.onmousedown=function (e) {
            let cx=e.offsetX, cy=e.offsetY;
            this.ctx.beginPath();
            this.ctx.moveTo(cx,cy);
            this.opacity.onmousemove=function (e) {
                let ox=e.offsetX, oy=e.offsetY;

                this.ctx.clearRect(0,0,this.cw,this.ch);
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }

                this.ctx.lineTo(ox,oy);
                this.ctx.stroke();

            }.bind(this);

            this.opacity.onmouseup=function () {
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.opacity.onmousemove=null;
                this.opacity.onmouseup=null;
            }.bind(this);

        }.bind(this);
    }

    //撤销
    recall() {
        if(!this.history.length){
            alert('已经撤销完了')
        }
        this.history.pop();
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.ctx.putImageData(this.history[this.history.length-1],0,0);
    };


    //fill填充
    fill(){
        this.style='fill';
    }

    //描边
    stroke(){
        this.style='stroke';
    }


    // 橡皮擦
    Eraser() {
        this.opacity.onmousemove = function (e) {
            this.eraser.style.display='block';
            let ox=e.offsetX-25, oy=e.offsetY-25;

            let sw=this.eraser.offsetWidth;
            let sh=this.eraser.offsetHeight;
            let zw=this.opacity.offsetWidth;
            let zh=this.opacity.offsetHeight;
            if(ox>=zw-sw){
                ox=zw-sw;
            }
            if(ox<=0){
                ox=0;
            }
            if(oy>=zh-sh){
                oy=zh-sh;
            }
            if(oy<=0){
                oy=0;
            }
            this.eraser.style.left=`${ox}px`;
            this.eraser.style.top=`${oy}px`;
            this.ctx.clearRect(ox,oy,50,50);
        }.bind(this);

        this.eraser.onmouseup=function (){
            this.eraser.style.display='none';
            this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
            this.opacity.onmousemove=null;
            this.opacity.onmouseup=null;
        }.bind(this);
    };

    //可编辑文字
    pen() {
        let that=this;
        let lefts = 0, tops = 0;
        this.opacity.onmousedown = function (e) {
            that.opacity.onmousedown=null;
            let cx = e.offsetX, cy = e.offsetY;
            let divs = document.createElement('div');
            divs.contentEditable = "true";
            divs.style.cssText = `
                width:100px;
                height:30px;
                position:absolute;
                top:${cy}px;
                left:${cx}px;
                line-height:30px;
                cursor:move;
            `;
            this.appendChild(divs);

            divs.onmousedown=function (e) {
                let cx = e.clientX, cy = e.clientY;
                let left = divs.offsetLeft, top = divs.offsetTop;
                that.opacity.onmousemove = function (e) {
                    let ox = e.clientX, oy = e.clientY;
                    lefts = left + ox - cx;
                    tops = top + oy - cy;
                    if(lefts<=0){
                        lefts=0;
                    }

                    divs.style.left = `${lefts}px`;
                    divs.style.top = `${tops}px`;
                };
                that.opacity.onmouseup=function () {
                    divs.onmouseup=null;
                    that.opacity.onmousemove=null;
                }
            };

            divs.onblur=function () {
                let value=this.innerText;
                that.opacity.removeChild(divs);

                // divs=null;
                that.ctx.font='normal 24px sans-serif';
                that.ctx.fillText(value,lefts,tops);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
            };
        }
    }


    //裁剪
    clip(obj){
        let that=this;
        let minx,miny ,w,h;

        this.opacity.onmousedown=function(e) {
            obj.style.display='block';
            obj.style.width=0;
            obj.style.height=0;
            let cx=e.offsetX , cy=e.offsetY;

            that.opacity.onmousemove=function (e) {
                let ox=e.offsetX , oy=e.offsetY;
                 w=Math.abs(ox-cx);
                 h=Math.abs(oy-cy);
                 minx= ox <= cx ? ox :cx;
                 miny= oy <= cy ? oy :cy;
                obj.style.left=`${minx}px`;
                obj.style.top=`${miny}px`;
                obj.style.width=`${w}px`;
                obj.style.height=`${h}px`;

            };
            that.opacity.onmouseup=function () {
                that.temp =that.ctx.getImageData(minx,miny,w,h);
                that.ctx.clearRect(minx,miny,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.putImageData(that.temp,minx,miny);
                // obj.style.display='none';
                that.opacity.onmousemove=null;
                that.opacity.onmouseup=null;
                that.drag(minx,miny,obj);
            }

            }
        }

        drag(x,y,obj){
            let that=this;
             this.opacity.onmousedown=function (e) {
                 let cx=e.offsetX, cy=e.offsetY;
                 e.preventDefault();
                 that.opacity.onmousemove=function (e) {
                     e.preventDefault();
                     let ox=e.offsetX, oy=e.offsetY;
                     let lefts= x + ox - cx,
                         tops = y + oy - cy;
                     obj.style.left=`${lefts}px`;
                     obj.style.top= `${tops}px`;
                     that.ctx.clearRect(0,0,that.cw,that.ch);
                     if(that.history.length){
                         that.ctx.putImageData(that.history[that.history.length-1],0,0);
                     }
                     that.ctx.putImageData(that.temp,lefts,tops);

                 };
                 that.opacity.onmouseup=function () {
                     that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                     that.temp=null;
                     obj.style.display='none';
                     that.opacity.onmousemove=null;
                     that.opacity.onmouseup=null;
                 }
             }
        }


    //换色
    fillc(fcbtn){
        fcbtn.onblur=function () {
            this.ctx.fillStyle=fcbtn.value;
        }.bind(this)
    }
    strokec(scbtn){
        scbtn.onblur=function () {
            this.ctx.strokeStyle=scbtn.value;
        }.bind(this)
    }


    //清空
    empty(){
        this.ctx.clearRect(0,0,this.cw,this.ch);
        this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch))
    }

    //新建

    //反向
    reverse() {
        let imagedata = this.ctx.getImageData(0, 0, this.cw, this.ch);
        for (let i = 0; i < imagedata.data.length; i += 4) {
            // imagedata.data[i]=255-imagedata.data[i];
            // imagedata.data[i+1]=255-imagedata.data[i+1];
            // imagedata.data[i+2]=255-imagedata.data[i+2];

            //灰色
            imagedata.data[i] =imagedata.data[i+1]= imagedata.data[i+2] = (imagedata.data[i] + imagedata.data[i + 1] + imagedata.data[i + 2]) / 3;
        }
        this.ctx.putImageData(imagedata, 0, 0);

    }

}