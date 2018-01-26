//属性
    //存储
//方法
   //增、删、改、查
//   _init()  只供内部调用，不对外开放
class storage{
    constructor(){
        this.data=[];
    }

    _init(){        //初始化
        let students=[
            {xuehao:'aaa',name:'一',sex:'girl',classes:'wuif',iphoe:'12345678910'},
            {xuehao:'bbb',name:'二',sex:'girl',classes:'wuif',iphoe:'12345678910'},
            {xuehao:'ccc',name:'三',sex:'girl',classes:'wuif',iphoe:'12345678910'},
            {xuehao:'ddd',name:'四',sex:'girl',classes:'wuif',iphoe:'12345678910'},
            {xuehao:'eee',name:'五',sex:'girl',classes:'wuif',iphoe:'12345678910'}
        ]
        localStorage.setItem('students',JSON.stringify('students'));
    }

    getData(){      //获取数据
        let data=localStorage.getItem('students');
        console.log(data)
        if(!data){
            this._init();
        }
        return  this.data=JSON.parse(localStorage.getItem('students'));
    }

    updata(index,key,value){    //更新数据、需要三个参数  修改的是第几行，
        this.data=[index][key]=value;
        this.save();
    }

    del(index){
       this.data.splice(index,1);
       this.save();
    }

    push(obj){
        this.data.push(obj);
        this.save();
    }

    save(){     //保存
        localStorage.setItem('students',JSON.stringify(this.data));
    }
}