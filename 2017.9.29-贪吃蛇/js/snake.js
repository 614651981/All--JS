//属性
    // 速度、方向、选择
    // 蛇 arr   ['0_0']
// 方法
    // 画线 for循环     id${0}_{0}坐标
   //1.移动 move 加头去尾   新头（x+1，y）  旧头
// 1.先获取旧头  字符串 拆开 数组  7_0  "7" "0"

// this.block=document.createElement('div');
//方向 上下左右
// ${arr[0]*1+1}_${arr[1]}


//box.onclick=function(){
// console.log(this)
// }.bind(window);  指向window   .bind 指向任意地方


function Snake() {
    this.sence=document.querySelector('.sence');
    this.snake=['3_1','3_2','3_3'];
    this.flag={'3_0':true,'3_1':true,'3_2':true};
    this.food='';
    this.direction=40;
}
Snake.prototype={

    start:function () {
    this.drawLine();
    this.drawSnake();
    this.move();
    this.key();
    this.dropfood();
    },
    
    //  画线
    drawLine:function(){
        for(let i=0;i<20;i++){
            for(let j=0;j<20;j++){
                this.sence.innerHTML += `<div class="block" id="${i}_${j}"></div>`;
            }
        }
    },  
    //画蛇
    drawSnake:function () {
        this.snake.forEach(element=>{
            document.getElementById(element).classList.add('hot');
        })
    },

    //移动    加头、去尾
    move:function () {
        let that=this;
            that.t=setInterval(function () {
                let oldt =that.snake[that.snake.length-1];
                let arr=oldt.split('_');
                let newt='';
                //位置
                if(that.direction==37){
                    newt=`${arr[0]*1}_${arr[1]*1-1}`;
                }else if(that.direction==38){
                    newt=`${arr[0]*1-1}_${arr[1]*1}`;
                }else if(that.direction==39){
                    newt=`${arr[0]*1}_${arr[1]*1+1}`;
                }else if(that.direction==40){
                    newt=`${arr[0]*1+1}_${arr[1]*1}`;
                }

                //设置边界
                let newarr = newt.split('_');
                if(newarr[1]<0 || newarr[1]>19 || newarr[0]<0 || newarr[0]>19){
                    clearInterval(that.t);
                    alert("GAME OVER");
                    return;
                }

                //碰到自己身体 GAME OVER
                if(that.flag[newt]){
                    alert('GAME OVER');
                    return;
                }
                that.snake.push(newt);
                that.flag[newt]=true;
                if(newt==that.food){
                    document.getElementById(that.food).style.background='';
                    that.dropfood();
                }else{
                    let weiba=that.snake.shift(); //获取尾部  shift删除最后一个元素，返回删除的值
                    delete that.flag[weiba];
                    document.getElementById(weiba).classList.remove('hot');//移除尾部
                }
                that.drawSnake();
        },1000);


    },

    //键盘  上下左右
    key:function () {
        document.onkeydown=function(e){
         let keyCode = e.keyCode;
         if(Math.abs(keyCode-this.direction==2)){
            return;
         }
         this.direction=keyCode;
        }.bind(this);
    },

    //食物掉落
    dropfood:function(){
        let x=Math.floor(Math.random()*20);
        let y=Math.floor(Math.random()*20);
        do{
            x=Math.floor(Math.random()*20);
            y=Math.floor(Math.random()*20);
        }while(this.flag[`${x}_${y}`]);
        this.food=`${x}_${y}`;
        document.getElementById(this.food).style.background='pink';

    }

};





