window.addEventListener('load',function (){
    let dl=document.querySelector('dl');
    let info=[
        {name:'陈旭',tell:'18735359383',py:'chenxu'},
        {name:'高敏',tell:'18735359382',py:'gaomin'},
        {name:'李淑娴',tell:'18735359381',py:'lishuxian'},
        {name:'吴瑞霞',tell:'18735359380',py:'wuruixia'},
        {name:'何瑶瑶',tell:'18735359379',py:'heyaoyao'},
        {name:'关敏',tell:'18735359378',py:'guanmin'},
        {name:'高铭霞',tell:'18735359377',py:'gaomingxia'},
        {name:'马学仕',tell:'18735359376',py:'maxueshi'},
        {name:'李晨辉',tell:'18735359375',py:'lichenhui'},
        {name:'大白',tell:'18735359375',py:'dabai'},
        {name:'吕增生',tell:'18735359374',py:'lvzengsheng'},
        {name:'小白',tell:'12234568825',py:'xiaobai'},
        {name:'高杰梅',tell:'18735359374',py:'gaojiemei'},
        {name:'吕布',tell:'1873535962',py:'lvbu'},
        {name:'曾小贤',tell:'18735359374',py:'zengxiaoxian'}
    ];


    //查询联系人
    let search=document.querySelector('input');
    search.onkeyup=function () {
        let value=this.value.trim();
        let filter=info.filter(element=>element.py.includes(value)||element.tell.includes(value));
            dl.innerHTML='';
            render(filter);
    };


    //联系人排序
    render(info);
    function render(data){
        let obj=[];
        data.forEach(function (element){
            let first=element.py.charAt(0).toUpperCase();
            if(!obj[first]){
                obj[first]=[];
            }
            obj[first].push(element);
            console.log(obj)
        });

        let char = Object.keys(obj).sort();  //返回值为数组
        console.log(char);
        char.forEach(element=>{
            dl.innerHTML+=`<dt>${element}</dt>`;
            obj[element].forEach(value=>{
                dl.innerHTML += `
                     <dd><a href="tel:${value.tell}">${value.name}</a></dd> 
                 `
                 });
            console.log(obj)
        })
    }

    //向上滑动变box2中的字母
    let dts = document.querySelectorAll('dt');
    let box2 = document.querySelectorAll('div')[1];
    console.log(box2.offsetHeight);
    let arr=[];
    let heights=document.querySelector('header').offsetHeight + box2.offsetHeight;
    console.log(heights);
    dts.forEach(element=>arr.push(element.offsetTop));
    console.log(arr);
    window.onscroll=function () {
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrolltop);
        arr.forEach((value,index) => {
            if (scrolltop + heights >= value){
                 box2.innerText = dts[index].innerText;

            }
        })
    }




 })






