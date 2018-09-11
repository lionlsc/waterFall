window.onload=function () {
    let contenBox=document.getElementById('content');                     //获取大盒子
    let  boxes=document.getElementsByClassName('box');                    //获取图片盒子，这里得到的是HTMLCollection，是只读的。
    let totalWidth=contenBox.offsetWidth;                                //获取大盒子宽度
    let boxWidth=boxes.item(0).offsetWidth;                              //获取图片盒子高度
    let count=parseInt(totalWidth/boxWidth);                              //求出一行摆放的个数
    let boxHeight=[];                                                     //定义数组记录高度
    let minHeight;                                                        //定义最小高度，后面比较需要用到
    const  item=20;                                                       //每次克隆的图片盒子个数
    let scrollHeight,pageHeight;
    window.onscroll=function () {
        scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;                 //页面侧边滚轮高度
        pageHeight=document.documentElement.clientHeight||document.body.clientHeight;             //浏览器窗口高度
        let minHeight=Math.min.apply(null,boxHeight);   //获取离页面最顶部最近的底层盒子离页面顶部的高度，let变量暂时性死区，不会与外面定义相互冲突
        if(scrollHeight+pageHeight>minHeight){
            appendNode();                                //这里其实可以用ajax动态获取图片，由于只是展示，所以克隆节点来模拟
        }
    }
    for (let i=0;i<count;i++){                                            //暂时先得到第一行摆放的盒子高度
        boxHeight.push(boxes.item(i).offsetHeight);
    }
    add();                                                                //先增加一些元素
    function add() {
        for (let i=count;i<contenBox.childElementCount;i++){
            minHeight=Math.min.apply(null,boxHeight);                 //求出最小值
            let  index=getIndex(boxHeight,minHeight);                 //返回下标
            boxes.item(i).style.position='absolute';                 //设置定位
            boxes.item(i).style.left=index*boxWidth+'px';
            boxes.item(i).style.top=minHeight+'px';
            boxHeight[index]+=boxes.item(i).offsetHeight;             //将此下标对应的高度增加，因为此时添加了一个盒子在高度最低的盒子下面
        }
    }
    function getIndex(boxHeight,minHeight) {                           //进行比较，返回下标
        for (let i=0;i<count;i++){
            if (boxHeight[i]==minHeight){
                return i;
            }
        }
    }
    appendNode();
    function appendNode() {                                         //下滑时增加节点
        let  tempNodes=[];                                          //定义一个节点数组
        for (let j=0;j<item;j++){
            tempNodes[j]=boxes.item(j).cloneNode(true);            //深拷贝，把里面的内容也进行拷贝
        }
        for (let i=0;i<item;i++){
            minHeight=Math.min.apply(null,boxHeight);               //同add函数
            let  index=getIndex(boxHeight,minHeight);
            tempNodes[i].style.position='absolute';
            tempNodes[i].style.left=index*boxWidth+'px';
            tempNodes[i].style.top=minHeight+'px';
            boxHeight[index]+= boxes.item(i).offsetHeight;          //这里增加高度时如果用tempNodes[i].offsetHeight无效
            contenBox.appendChild(tempNodes[i]);

        }
    }
}