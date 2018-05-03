function canvasplate (num,obj){

        this.panelsize=45; //panel棋盘边长可调节

        this.hang=16;
        this.lie=24;  //棋盘行列数 可调节


        var names=["FAM","HEX","ROX","FAM1","HEX1","ROX1"];
        this.canvasname=names[num];

        this.erweima=obj.data.Data.ID.toString()+'-'+obj.data.Data.No.toString();

        this.maxhuidu=-1000;
        this.minhuidu=1000;

// 这个灰度是最终显示内容,值0-255

    this.huidudata=[];
    var temp=[];
    var count=0;
    for (i=0;i<=this.hang;i++)
    {

        for (j = 0; j <= this.lie; j++) {
            // temp.push(Math.random()*3);
            if(i==0||j==0)
                temp.push(0);
            else {
                temp.push(obj.data.Data.Well[count].Signal[num%3]);//mmp 这个%3把老子找惨了 mmp
                count++;
            }

        }
        this.huidudata.push(temp);
        temp=[];
    }

    // this.huidudata[1][1]=9;
    // this.huidudata[1][2]=9;
    // this.huidudata[1][3]=9;
    // this.huidudata[1][3]=9;

    this.huidu=[];
        var temp=[];
        for (i=0;i<=this.hang;i++)
        {

            for (j = 0; j <= this.lie; j++)
                temp.push(this.huidudata[i][j]);

            this.huidu.push(temp);
            temp=[];
        };




//------------------------------是否点选 只有这个点了的就打叉叉
        // var nonono=[
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
        //     [0,0,0,0,0,0,0,0,0,0,0,0,0]
        //
        // ];//鼠标移动时候被选中临时数组 加一个头标记整个行列选中

        this.nonono=[];
            temp=[];
            for (i=0;i<=this.hang;i++)
            {
                for (j = 0; j <= this.lie; j++)
                    temp.push(false);
                this.nonono.push(temp);
                temp=[];
            }


        this.hahaha=[];
        temp=[];
        for (i=0;i<=this.hang;i++)
        {
            for (j = 0; j <= this.lie; j++)
                temp.push(false);
            this.hahaha.push(temp);
            temp=[];
        }



    //这个抓cavans内容
        this.oncanvas=null;

        let _this=this;
        this.refreshpanel=function ()   //
        {  //画圈圈和框框

            _this.oncanvas = document.getElementById(_this.canvasname);
            var ctx = _this.oncanvas.getContext('2d');


            ctx.clearRect(0,0,1000,800);   //这里应该是获取画布的长和宽



          //  ctx.translate(60,2);








            ctx.fillStyle =ctx.strokeStyle= '#000000';
        //----------------------------画边框

            for (var i = 1; i <= _this.hang; i++)
            {
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeRect(0, (i-1) * _this.panelsize+0.4*_this.panelsize, 0.4*_this.panelsize, _this.panelsize);


                ctx.font =(0.3* _this.panelsize).toString()+'px 微软雅黑 bold';
                ctx.fillStyle = '#000000';
                var Ax=String.fromCharCode(64+i);

                ctx.textAlign="center";

                ctx.fillText(Ax ,0.2*_this.panelsize, i * _this.panelsize);




                ctx.closePath();

            }


            for (var j = 1; j <= _this.lie; j++)
            {


                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeRect((j-1) * _this.panelsize+0.4*_this.panelsize, 0, _this.panelsize, 0.4*_this.panelsize);

                ctx.font =(0.3* _this.panelsize).toString()+'px 微软雅黑 bold';
                ctx.fillStyle = '#000000';
                var Ax=j.toString();

                ctx.textAlign="center";

                ctx.fillText(Ax ,(j-0.1)*_this.panelsize, 0.3*_this.panelsize);



                ctx.closePath();

            }




            //-----------------------画盘面缺口------------------
            {


                ctx.beginPath();
                ctx.lineWidth = 2;

                ctx.moveTo(_this.panelsize*0.4,0);
                ctx.lineTo(0,0.4* _this.panelsize);
                ctx.stroke();

                ctx.closePath();
                // ctx.clearRect(0,0,0.4*panelsize,0.4*panelsize);


            }




            //---------------------------画面板 加颜色
            ctx.save();
            ctx.translate(_this.panelsize*0.4,_this.panelsize*0.4);
            for (var i = 0; i < _this.hang; i++)
            {
                for (var j = 0; j < _this.lie; j++)
                {

                    ctx.fillStyle = "black";
                    ctx.strokeStyle="#a6a6a6";
                    ctx.beginPath();
                     ctx.lineWidth=1;
                     ctx.fillRect(j * _this.panelsize, i * _this.panelsize, _this.panelsize, _this.panelsize);  //画框框
                    ctx.strokeRect(j * _this.panelsize, i * _this.panelsize, _this.panelsize, _this.panelsize);
                    ctx.closePath();



                    //--------------------画亮点圆环---------------
                    ctx.fillStyle =ctx.strokeStyle ="#ed4442";


                    if(!_this.hahaha[i+1][j+1]) {
                        ctx.fillStyle = 'rgba(' + _this.huidu[i + 1][j + 1] + ',' + _this.huidu[i + 1][j + 1] + ',' + _this.huidu[i + 1][j + 1] + ',1)';

                        ctx.beginPath();
                        // ctx.lineWidth=2;
                        ctx.arc(_this.panelsize / 2 + j * _this.panelsize, _this.panelsize / 2 + i * _this.panelsize, _this.panelsize * 0.42, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();
                        ctx.closePath();
                    }
                    else{
                        // ctx.fillStyle ='rgba(230,30,30,1)';
                        ctx.lineWidth=4;
                        ctx.strokeStyle = "#ff1d2d";
                        ctx.beginPath();

                        // ctx.arc(_this.panelsize / 2 + j * _this.panelsize, _this.panelsize / 2 + i * _this.panelsize, _this.panelsize * 0.42, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();




                        ctx.moveTo(j * _this.panelsize,i * _this.panelsize);
                        ctx.lineTo(j * _this.panelsize+ _this.panelsize,i* _this.panelsize+_this.panelsize);
                        ctx.moveTo(j * _this.panelsize,i* _this.panelsize+_this.panelsize);
                        ctx.lineTo(j * _this.panelsize+_this.panelsize,i* _this.panelsize);
                        ctx.stroke();




                        ctx.closePath();


                    }






                    //---------------------标记nonono


                    ctx.beginPath();
                    ctx.fillStyle =ctx.strokeStyle = 'rgba(0,250,250,0.7)';
                    if(_this.nonono[i+1][j+1]>0)  //选择过程中的标识
                        ctx.fillRect(j * _this.panelsize, i * _this.panelsize, _this.panelsize, _this.panelsize);

                    ctx.closePath();


                }


                ctx.closePath();

            }

            ctx.restore();

        };





        //--------------------这个函数在于不去绘制任何图形只是操作数据结构而已
        this.initcanvaspanel=function()
        {  //
             _this.guolv();
            _this.oncanvas = document.getElementById(_this.canvasname);
            var ctx = _this.oncanvas.getContext('2d');

            ctx.clearRect(0,0,800,600);

            // _this.oncanvas.onmouseover = function (ev)
            // {  //鼠标进入区域
            //     console.log("onmouseoverbbb");
            // };
            //
            // _this.oncanvas.onmouseout =function ()
            // {//鼠标移动出区域
            //     console.log("onmouseoutbbb");
            //     _this.oncanvas.onmousemove=null;
            //     // document.onmouseup =null;
            // };

            _this.oncanvas.onclick=function (ev)  //鼠标点击
            {
                console.log("onmousedown");

                var oldX = (ev.offsetX-0.4*_this.panelsize);
                var oldY = (ev.offsetY-0.4*_this.panelsize);
                var balldownX1 = Math.floor(oldX / _this.panelsize);
                var balldownY1 = Math.floor(oldY / _this.panelsize);

                // console.log(balldownX1);
                // console.log(balldownY1);


                _this.nonono[balldownY1+1][balldownX1+1]=!_this.nonono[balldownY1+1][balldownX1+1];



                _this.refreshpanel();

            };
//             oncanvas.onmousedown=function (ev)  //鼠标按下去
//             {
//                 // console.log("onmousedown");
//                 //鼠标点下去
//                 //鼠标所在的位置
//                 //ev.offsetX
//                 //ev.offsetY
//                 var oldX = ev.offsetX-0.4*panelsize;
//                 var oldY = ev.offsetY-0.4*panelsize;
//                 var balldownX1 = Math.floor(oldX / panelsize);
//                 var balldownY1 = Math.floor(oldY / panelsize);
//
//                 console.log(balldownX1);
//                 console.log(balldownY1);
//
//
//                 nonono[balldownY1+1][balldownX1+1]=1;
//
//                 // hahaha=[
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                 //     [0,0,0,0,0,0,0,0,0,0,0,0,0]
//                 //
//                 //
//                 // ];//panel被选中数组;
//
//                 // for (var i=0;i<=hang;i++)
//                 // {
//                 //
//                 //     for (var j = 0; j <= lie; j++)
//                 //         hahaha[i][j]=0;
//                 //
//                 // }
//
//
//                 for (var a = 1; a <= hang; a++)
//                 {
//                     if (nonono[a][0]>0)  //如果整个行被选中
//                     {
//                         //console.log("test");
//                         for(var b=1;b<=lie;b++)
//                         {
//                             nonono[a][b]=1;
//                         }
//                     }
//
//                 }
//                 for (var b = 1; b <= lie; b++)
//                 {
//                     if (nonono[0][b]>0)  //如果整个行被选中
//                     {
//                         //console.log("test");
//                         for(var a=1;a<=hang;a++)
//                         {
//                             nonono[a][b]=1;
//                         }
//                     }
//
//                 }
//
//
//                 oncanvas.onmousemove=function (ev)   //鼠标按下去后框选
//                 {
//                     console.log("onmousemove");
//                     var oldX = ev.offsetX-0.4*panelsize;
//                     var oldY = ev.offsetY-0.4*panelsize;
//
//
//                     //----------------------------------------------矩形框选 任意方向矩形
//                     var ballmoveX2 = Math.floor(oldX / panelsize);
//                     var ballmoveY2 = Math.floor(oldY / panelsize);
//
//
//
//                     nonono[ballmoveY2+1][ballmoveX2+1]=1;
//                    // console.log(ballmoveY2);
//                    // console.log(ballmoveX2);
//
//
//
//                     var x1=Math.min(balldownX1,ballmoveX2);
//                     var x2=Math.max(balldownX1,ballmoveX2);
//                     var y1=Math.min(balldownY1,ballmoveY2);
//                     var y2=Math.max(balldownY1,ballmoveY2);
//
//
//                     //-------------------标记数组清空-----------------
//                     // nonono=[
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0],
//                     //     [0,0,0,0,0,0,0,0,0,0,0,0,0]
//                     // ];
//
//
//                     for (var i=0;i<=hang;i++)
//                     {
//
//                         for (var j = 0; j <= lie; j++)
//
//
//                         nonono[i][j]=0;
//
//                     }
//
//
//
//
//                     //把选中的格子标记在nonono里面
//
//                     for (i = x1; i <= x2; i++)
//                         for (j = y1; j <= y2; j++)
//                             nonono[j+1][i+1] = 1;
//
//
//                     for (var a = 1; a <= hang; a++)
//                     {
//                         if (nonono[a][0]>0)  //如果整个行被选中
//                         {
//                             console.log("test");
//                             for(var b=1;b<=lie;b++)
//                             {
//                                 nonono[a][b]=1;
//                             }
//                         }
//
//                     }
//                     for (var b = 1; b <= lie; b++)
//                     {
//                         if (nonono[0][b]>0)  //如果整个行被选中
//                         {
//                             //console.log("test");
//                             for(var a=1;a<=hang;a++)
//                             {
//                                 nonono[a][b]=1;
//                             }
//                         }
//
//                     }
//
//                     refreshpanel();
//
//
//                 };
//
//
//                 oncanvas.onmouseup=function (ev) //松开 有点好玩
//                 {
//                     console.log("onmouseup");
//                     oncanvas.onmousemove=null;
//                     oncanvas.onmouseup =null;
//
//
//
//                     var oldX = ev.offsetX-0.4*panelsize;
//                     var oldY = ev.offsetY-0.4*panelsize;
//
//
//                     //----------------------------------------------矩形框选 任意方向矩形
//
//                     var ballupX2 = Math.floor(oldX / panelsize);
//                     var ballupY2 = Math.floor(oldY / panelsize);
//
//                     console.log(ballupX2);
//                     console.log(ballupY2);
//
//                     //如果点击同一个格子，则取消选择
//
//
//                     // ----判断 如果点击和松开在同一个格子，则取消
//
//                     // if (balldownX1==ballupX2 && balldownY1==ballupY2)
//                     //
//                     //     if(hahaha[balldownX1][balldownY1]==1)
//                     //
//                     //         nonono[balldownX1][balldownY1]=hahaha[balldownX1][balldownY1]=0;
//
//                     //放开把nonono放入到hahaha中，并清空nonono
//                     //如果按了control就添加 否则就以选中为准
//                     if(ev.ctrlKey)
//                     {
//
// //----------------------------点下去和放开是同一个框框 则反选
//                         if(balldownX1==ballupX2 && balldownY1==ballupY2)
//                         {
//                             console.log("sameone");
//
//                             if(hahaha[balldownY1+1][balldownX1+1]==1)
//                             {
//                                 nonono[balldownY1+1][balldownX1+1] = hahaha[balldownY1+1][balldownX1+1] = 0;
//                                 //console.log("sameone");
//                             }
//
//                             else
//
//                             {
//                                 nonono[balldownY1+1][balldownX1+1] = hahaha[balldownY1+1][balldownX1+1] = 1;
//
//                             }
//
//                         }
//
//                      //   else
//
//
//
//
//                         {
//                             for (var i = 0; i < hang + 1; i++) {
//                                 for (var j = 0; j < lie + 1; j++) {
//                                     if (hahaha[i][j] + nonono[i][j] >= 1)
//                                         hahaha[i][j] = 1;
//                                     else
//                                         hahaha[i][j] = 0;
//                                     nonono[i][j] = 0;
//                                 }
//                             }
//
//                         }
//
//
//
//
//
//
//
//
//
//                     }
//                     else
//                     {
//                         for (var i = 0; i < hang+1; i++) {
//                             for (var j = 0; j < lie+1; j++) {
//                                 //if(hahaha[i][j]+nonono[i][j]>=1)
//                                 hahaha[i][j] = nonono[i][j];
//                                 // else
//                                 //     hahaha[i][j]=0;
//                                 nonono[i][j] = 0;
//                             }
//                         }
//                     }
//
//                    // paneltoscatter();
//                     //selectpaneltoscatter();
//                     //   refreshscatter();
//                     refreshpanel();//改变hahaha[]后 重绘
//
//                 };
//
//                 refreshpanel();  //down函数按下去后重绘
//
//             };

            _this.refreshpanel();

        };

        this.dacha=function() {
            // alert('ssss');
            for (var i = 1; i <= _this.hang; i++)
            {
                for (var j = 1; j <= _this.lie; j++)
                {
                    if(_this.nonono[i][j]&&!_this.hahaha[i][j])
                    {
                        _this.hahaha[i][j]=true;

                    }
                    _this.nonono[i][j]=false;


                }

            }

            _this.guolv();

            _this.refreshpanel();

        };

        this.quxiao=function() {
            // alert('ssss');
            for (var i = 1; i <= _this.hang; i++)
            {
                for (var j = 1; j <= _this.lie; j++)
                {
                    if(_this.nonono[i][j]&&_this.hahaha[i][j])
                    {
                        _this.hahaha[i][j]=false;

                    }
                    _this.nonono[i][j]=false;


                }

            }

            _this.guolv();

            _this.refreshpanel();

        };





        this.guolv=function(){
            var maxone=-10000;  //这个初始值设置太尼玛坑了 不然有bug 请仔细想
            var minone=10000;
            var shifou=false;  //是否找到第一个未被hahaha标记的值


            for (var i = 1; i <= _this.hang; i++) {
                for (var j = 1; j <= _this.lie; j++) {
                    if(!_this.hahaha[i][j]) {
                        //--------------找第一个有效值
                        if(!shifou){
                            maxone=minone=_this.huidudata[i][j];
                            shifou=true;

                        }
                        else {

                            if (_this.huidudata[i][j] > maxone)
                                maxone = _this.huidudata[i][j];
                            else if (_this.huidudata[i][j] < minone)
                                minone = _this.huidudata[i][j];
                        }

                    }

                }
            }


           _this.maxhuidu=maxone;
           _this.minhuidu=minone;
         //   console.log(_this.maxhuidu,_this.minhuidu,num);

            // if(num==0)
            // {
            //     vm.maxfam=maxone;
            //     vm.minfam=minone;
            //
            // }
            // if(num==1)
            // {
            //     vm.maxhex=maxone;
            //     vm.minhex=minone;
            //
            // }
            // if(num==2)
            // {
            //     vm.maxrox=maxone;
            //     vm.minrox=minone;
            //
            // }



            if(shifou) {
                for (var i = 1; i <= _this.hang; i++) {
                    for (var j = 1; j <= _this.lie; j++) {
                        //这里有个除零错误
                        if (!_this.hahaha[i][j])
                        {
                            if(maxone!=minone)
                                _this.huidu[i][j] = Math.floor((_this.huidudata[i][j] - minone) / (maxone - minone) * 255);
                            else
                                ;
                        }

                        else
                            _this.huidu[i][j] = 0;

                    }
                }

            }

        }


}