//属性
//      哪些字母、个数、速度、位置、生命、分数
//方法
//      产生字符、下落、消除、重新开始、下一关

//构造函数
// arr字母
// current[]  页面中的元素
// number  页面中产生多少个字符
// keyCode  返回大写
//
// 产生若干个
//  num下标
// cssText
// classList.add();        //添加类名
// classList.remove();
// classList.toggle();        //切换 有删掉，没有添加
// top值
// lef值==(innerWidth-400)*Math.random()+200;

//drop()
//star()
//e.key     divs.innertText .charCodeAt()
//e.keyCode  比较
// String.fromCharCode()


//水平方向不重叠
//得分  //key
//下一关  clearInterval停止动画，current移除， length为0；position的长度也为0 ；
//number++;
//1.不改关卡，分数归零
// 2.gk+=10；
//confirm()
let defen=document.querySelectorAll('span')[0];
let HP=document.querySelectorAll('span')[1];
let guan=document.querySelectorAll('span')[2];
let success=document.querySelector('.success');
console.log(success)

console.log(guan);
function Game() {
    this.charArr = [
        ['Q','img/Q.png'],
        ['W','img/W.png'],
        ['E','img/E.png'],
        ['R','img/R.png'],
        ['T','img/T.png'],
        ['Y','img/Y.png'],
        ['U','img/U.png'],
        ['I','img/I.png'],
        ['O','img/O.png'],
        ['P','img/P.png'],
        ['A','img/A.png'],
        ['S','img/S.png'],
        ['D','img/D.png'],
        ['F','img/F.png'],
        ['G','img/G.png'],
        ['H','img/H.png'],
        ['J','img/J.png'],
        ['K','img/K.png'],
        ['L','img/L.png'],
        ['Z','img/Z.png'],
        ['X','img/X.png'],
        ['C','img/C.png'],
        ['V','img/V.png'],
        ['B','img/B.png'],
        ['N','img/N.png'],
        ['M','img/M.png']
    ];
    this.number=5;
    this.current=[];
    this.speed=10;
    this.position=[];
    this.score=0;
    this.alone=[];
}
Game.prototype={
    start:function () {
        this.getchars();
        this.drop();
        this.key();
        this.checkPosition();
        // this.stop();
    },

    getchars:function(){
        for(let i=0;i<this.number;i++){
            this.getchar();
        }
    },

    //去重复
    checkRepeat:function(char){
        return this.current.some(element=>{
            return element.innerText==char;
        })


    },
    checkPosition:function(lefts){
        let flag=this.position.some(function(value){
            return  Math.abs(value-lefts)<60;
        });
        return  flag;

    },
    getchar:function () {
        let divs = document.createElement('div');
        let num = Math.floor(Math.random() * this.charArr.length);//获取下标
        //字母去重    this.charArr[num];this.current[i].innerText
         while(this.checkRepeat(this.charArr[num])){
             num = Math.floor(Math.random() * this.charArr.length);
         }

        divs.classList.add('box');
        divs.innerText=this.charArr[num];

//this.charArr[num]与页面中存在的元素进行比较 this.current[i].innerText
//页面中元素不重复

        let tops = Math.random()*100;
        let lefts=(innerWidth-400)*Math.random()+200;

 //页面中元素位置不重叠
        while(this.checkPosition(lefts)){
             lefts=(innerWidth-400)*Math.random()+200;
        }
        divs.style.cssText=`
            top:${tops}px;left:${lefts}px;
            background-position:center;
            background-image:url(${this.charArr[num][1]});
            background-size:cover;
        `;
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    },

    drop:function () {
        let that=this;
        this.t=setInterval(function () {
            for(let i=0;i<that.current.length;i++){
                let tops=that.current[i].offsetTop + that.speed;
                that.current[i].style.top=`${tops}px`;
                if(tops>=600){
                    document.body.removeChild(that.current[i]);
                    that.position.splice(i,1);
                    that.current.splice(i,1);
                    that.alone.splice(i,1);
                    HP.innerText--;
                    that.getchar();
                    if(HP.innerText==0){
                        let flag=confirm("游戏结束，是否重新开始？");
                        if(flag){
                            that.restart();
                        }else{
                            close();
                        }
                    }
                }
            }
        },200)
    },
    stop:function () {
        clearInterval(this.t);
    },
    //键盘按下消字母
    key:function () {
        let that=this;
        document.onkeydown=function (e) {
            for(let i=0;i<that.current.length;i++){
                if(that.current[i].innerText.includes(String.fromCharCode(e.keyCode))){
                    document.body.removeChild(that.current[i]);
                    that.score += 2;
                    defen.innerText=that.score;
                    that.position.splice(i,1);
                    that.current.splice(i,1);
                    that.getchar();
                    if(defen.innerText% 10 == 0){
                        that.stop();
                        success.style.opacity=1;
                        // that.next();
                    }
                }
            }
        }
    },

    //下一关
    next:function () {
        clearInterval(this.t);
        for(let i=0;i<this.current.length;i++){
            document.body.removeChild(this.current[i]);
        }
        this.current.length=0;
        this.position.length=0;
        this.alone.length=0;
        HP.innerText=10;
        guan.innerText++;
        this.number++;

        if(guan.innerText>8){
            this.number=10;
            this.speed+=5;
        }

        this.start();

    },


    //重新开始
    restart:function () {
        clearInterval(this.t);
        for(let i=0;i<this.current.length;i++){
            document.body.removeChild(this.current[i]);
        }
        this.current.length=0;
        this.position.length=0;
        HP.innerText=10;
        defen.innerText=0;
        guan.innerText=1;
        this.number=5;
        this.start();
       
    },



};









//字母去重复第二种方法
// let numb;
// do{
//     let num = Math.floor(Math.random() * this.charArr.length);
//     numb=this.charArr[num];
// }while(this.checkRepeat(numb));
// divs.innerText=numb;

//方法
//checkRepeat:function(numb){
// let flag=this.alone.some(function (value) {
//     return  numb == value;
// });
// return flag;
// },

// this.alone.push(num);
//this.alone.length=0;
//that.alone.splice(i,1);

//top${tops}px;left
//background-img:url(this.)