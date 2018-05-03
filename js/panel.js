
        var panelsize=30; //panel棋盘边长可调节

        var hang=16,lie=24;  //棋盘行列数 可调节

        var color_ground;

        var color_black='#000000';

        var color_green="#4caf50";

        var color_blue="#008cba";

        var color_red="#b80af4";

        var color_unknown="#7c7c7c";

        var color_gray ='rgba(55,55,55,0.5)';


        var canvasname="FAM";


        var huidu=[];
        var temp=[];
        for (var i=0;i<=hang;i++)
        {

            for (var j = 0; j <= lie; j++)
                temp.push(Math.floor(255*Math.random()));

            huidu.push(temp);
            temp=[];
        }


        // var hahaha=[
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
        //
        // ];//panel被选中数组
        var hahaha=[];
        var temp=[];
        for (var i=0;i<=hang;i++)
        {

            for (var j = 0; j <= lie; j++)
                temp.push(0);

            hahaha.push(temp);
            temp=[];
        }



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

        var nonono=[];
        temp=[];
        for (var i=0;i<=hang;i++)
        {

            for (var j = 0; j <= lie; j++)
                temp.push(0);

            nonono.push(temp);
            temp=[];
        }







        // var cococo=[
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9],
        //     [9,9,9,9,9,9,9,9,9,9,9,9,9]
        //
        // ];//面板标记颜色
        var cococo=[];
        temp=[];
        for (var i=0;i<=hang;i++)
        {

            for (var j = 0; j <= lie; j++)
                temp.push(9);


            cococo.push(temp);
            temp=[];
        }
        // cococo[1][1]=3;
        // cococo[3][5]=3;
        // cococo[3][8]=4;
        // cococo[3][2]=2;


        var selected=[]; //返回被选择的数组

        // var name=[
        //     smeple1-sample96
        // ];

        var samplename=[];
        temp=[];
        var samplenum=1;
        for (var i=1;i<=hang;i++)
        {

            for (var j = 1; j <= lie; j++)
            {
                // temp.push("Sample" + samplenum.toString());
                temp.push("");
                samplenum++;
            }

            samplename.push(temp);
            temp=[];
        }







        function selectpaneltoscatter() {


        //先要清空sctter选区 ！！！！！

            selected=[];


            for (var i = 0; i < hang; i++)
            {
                for (var j = 0; j < lie; j++)
                {
                    if(hahaha[i+1][j+1]==1)
                    {


                        selected.push([data[lie * i + j][0],data[lie * i + j][1],lie * i + j]);
                        console.log(lie * i + j);

                    }
                }

            }

            // refreshscatter();

        }





        function refreshpanel()   //obj是文档元素canvas传递过来 增加效率
        {  //画圈圈和框框

            var oncanvas = document.getElementById(canvasname);
            var ctx = oncanvas.getContext('2d');


            ctx.clearRect(0,0,1000,800);   //这里应该是获取画布的长和宽



            ctx.translate(60,2);








            ctx.fillStyle =ctx.strokeStyle= '#000000';
        //----------------------------画边框

            for (var i = 1; i <= hang; i++)
            {
                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeRect(0, (i-1) * panelsize+0.4*panelsize, 0.4*panelsize, panelsize);


                ctx.font =(0.3* panelsize).toString()+'px 微软雅黑 bold';
                ctx.fillStyle = '#000000';
                var Ax=String.fromCharCode(64+i);

                ctx.textAlign="center";

                ctx.fillText(Ax ,0.2*panelsize, i * panelsize);



                if (hahaha[i][0]>0 || nonono[i][0]>0)  //如果整个行被选中
                {


                   // console.log(i);
                    ctx.fillStyle  = 'rgba(55,55,55,0.5)';

                    ctx.fillRect(0, (i-1) * panelsize+0.4*panelsize, 0.4*panelsize, panelsize); //表头

                }

                ctx.closePath();

            }


            for (var j = 1; j <= lie; j++)
            {


                ctx.beginPath();
                ctx.lineWidth=2;
                ctx.strokeRect((j-1) * panelsize+0.4*panelsize, 0, panelsize, 0.4*panelsize);

                ctx.font =(0.3* panelsize).toString()+'px 微软雅黑 bold';
                ctx.fillStyle = '#000000';
                var Ax=j.toString();

                ctx.textAlign="center";

                ctx.fillText(Ax ,(j-0.1)*panelsize, 0.3*panelsize);



                if (hahaha[0][j]>0 || nonono[0][j]>0)  //如果整个被选中s
                {
                   // console.log(i);
                    ctx.fillStyle  = 'rgba(55,55,55,0.5)';

                    ctx.fillRect((j-1) * panelsize+0.4*panelsize,0,panelsize, 0.4*panelsize);
                    
                }
                ctx.closePath();

            }




            //-----------------------画盘面缺口------------------
            {


                ctx.beginPath();
                ctx.lineWidth = 2;

                ctx.moveTo(panelsize*0.4,0);
                ctx.lineTo(0,0.4* panelsize);
                ctx.stroke();

                ctx.closePath();
                // ctx.clearRect(0,0,0.4*panelsize,0.4*panelsize);


            }




            //---------------------------画面板 加颜色
            ctx.save();
            ctx.translate(panelsize*0.4,panelsize*0.4);
            for (var i = 0; i < hang; i++)
            {
                for (var j = 0; j < lie; j++)
                {




                    //ctx.fillStyle =ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 255/lie * j) + ',' + Math.floor(255 - 255/hang * i) + ')';
                    ctx.fillStyle = "black";
                    ctx.strokeStyle="#a6a6a6";
                    ctx.beginPath();
                     ctx.lineWidth=1;
                     ctx.fillRect(j * panelsize, i * panelsize, panelsize, panelsize);  //画框框
                    ctx.strokeRect(j * panelsize, i * panelsize, panelsize, panelsize);
                    ctx.closePath();


                    // ctx.strokeStyle ="white";
                    // ctx.beginPath();
                    // ctx.lineWidth=2;
                    // ctx.strokeStyle(j * panelsize, i * panelsize, panelsize, panelsize);  //画框框
                    // ctx.closePath();




                    //--------------------画亮点圆环---------------
                    ctx.fillStyle =ctx.strokeStyle ="#ed4442";

                    ctx.fillStyle = 'rgba('+huidu[i+1][j+1]+','+huidu[i+1][j+1]+','+huidu[i+1][j+1]+',1)';

                    ctx.beginPath();
                    // ctx.lineWidth=2;
                    ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.42, 0, Math.PI * 2, true); //画圈圈
                    ctx.fill();
                    ctx.closePath();





                    // if (hahaha[i][j] != 0)
                    //     //ctx.fillRect(i * panelsize, j * panelsize, panelsize, panelsize);
                    //     ctx.fill();
                    // else


                    ctx.beginPath();
                    ctx.fillStyle =ctx.strokeStyle = 'rgba(0,' + Math.floor(255 - 255/lie * j) + ',' +
                        Math.floor(255 - 255/hang * i) + ',0.5)';
                    if(nonono[i+1][j+1]>0)  //选择过程中的标识
                        ctx.fillRect(j * panelsize, i * panelsize, panelsize, panelsize);
                    if(hahaha[i+1][j+1]>0)  //被选中
                        ctx.fillRect(j * panelsize, i * panelsize, panelsize, panelsize);




                    // {
                    //     ctx.fillStyle = 'rgba(100,100,100,0.5)';
                    //     ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                    //     ctx.fill();
                    //
                    // }









                    if(cococo[i+1][j+1]==0) {


                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();

                        ctx.fillStyle = color_black;
                        ctx.fillRect(j * panelsize, i * panelsize, 0.3 *panelsize, 0.3*panelsize);


                        ctx.fillStyle ="#ffffff";
                        ctx.font =(0.25* panelsize).toString()+'px 微软雅黑 bold';
                        ctx.textAlign="end";
                        ctx.fillText("N" , (j+1) *panelsize-0.75* panelsize, (i+1)*panelsize-0.75* panelsize);
                        // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();
                    }
                    if(cococo[i+1][j+1]==1) {

                        // ctx.fillStyle = color_green;
                        // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();

                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();

                        ctx.fillStyle = color_green;
                        ctx.fillRect(j * panelsize, i * panelsize, 0.3 *panelsize, 0.3*panelsize);


                        ctx.fillStyle ="#ffffff";
                        ctx.font =(0.25* panelsize).toString()+'px 微软雅黑 bold';
                        ctx.textAlign="end";
                        ctx.fillText("P" , (j+1) *panelsize-0.75* panelsize, (i+1)*panelsize-0.75* panelsize);





                    }
                    if(cococo[i+1][j+1]==2) {

                        // ctx.fillStyle = color_blue;
                        // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();


                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();

                        ctx.fillStyle = color_blue;
                        ctx.fillRect(j * panelsize, i * panelsize, 0.3 *panelsize, 0.3*panelsize);


                        ctx.fillStyle ="#ffffff";
                        ctx.font =(0.25* panelsize).toString()+'px 微软雅黑 bold';
                        ctx.textAlign="end";
                        ctx.fillText("P" , (j+1) *panelsize-0.75* panelsize, (i+1)*panelsize-0.75* panelsize);




                    }
                    if(cococo[i+1][j+1]==3) {

                        // ctx.fillStyle = color_red;
                        // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();

                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();

                        ctx.fillStyle = color_red;
                        ctx.fillRect(j * panelsize, i * panelsize, 0.3 *panelsize, 0.3*panelsize);


                        ctx.fillStyle ="#ffffff";
                        ctx.font =(0.25* panelsize).toString()+'px 微软雅黑 bold';
                        ctx.textAlign="end";
                        ctx.fillText("P" , (j+1) *panelsize-0.75* panelsize, (i+1)*panelsize-0.75* panelsize);




                    }
                    if(cococo[i+1][j+1]==4) {

                       //  ctx.strokeStyle = color_cross;
                       //  ctx.moveTo(j * panelsize,i * panelsize);
                       //  ctx.lineTo(j * panelsize+ panelsize,i* panelsize+panelsize);
                       //  ctx.moveTo(j * panelsize,i* panelsize+panelsize);
                       //  ctx.lineTo(j * panelsize+panelsize,i* panelsize);
                       //  ctx.stroke();
                       //
                       // // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                       //
                       //
                       //  //ctx.fill();



                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();

                        ctx.fillStyle = color_unknown;
                        ctx.fillRect(j * panelsize, i * panelsize, 0.3 *panelsize, 0.3*panelsize);


                        ctx.fillStyle ="#ffffff";
                        ctx.font =(0.25* panelsize).toString()+'px 微软雅黑 bold';
                        ctx.textAlign="end";
                        ctx.fillText("U" , (j+1) *panelsize-0.75* panelsize, (i+1)*panelsize-0.75* panelsize);





                    }
                    if(cococo[i+1][j+1]==6) {

                        ctx.fillStyle = color_gray;

                        ctx.fillRect(j * panelsize, i * panelsize, panelsize, panelsize);

                        // ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        // ctx.fill();
                    }


                    if(cococo[i+1][j+1]==7) {

                        ctx.fillStyle = 'rgba(100,100,100,0.5)';
                        ctx.arc(panelsize / 2 + j * panelsize, panelsize / 2 + i * panelsize, panelsize * 0.38, 0, Math.PI * 2, true); //画圈圈
                        ctx.fill();
                    }













                    //-------------------------------------下面显示名字samplename---------------------
                    //---------------------------只显示前6位 后面打点点。。。。。。。-----------------------


                    ctx.fillStyle = "#000000";
                    ctx.font =(0.15* panelsize).toString()+'px 仿宋 bold';
                    ctx.textAlign="center";



                    if (samplename[i][j].length>6)
                    {
                        ctx.fillText(samplename[i][j].slice(0, 6)+"..." , (j + 0.5) * panelsize, (i + 0.5) * panelsize);
                        // ctx.fillText("...", (j + 0.5) * panelsize, (i + 0.6) * panelsize);
                    }
                    else
                        ctx.fillText(samplename[i][j] ,(j+0.5)*panelsize, (i+0.5)*panelsize);







                    ctx.closePath();


                }


                ctx.closePath();

            }

            ctx.restore();

        }


        function setname(n,sampleone)
        {
            samplename[Math.floor(n/lie)][n%lie]=sampleone;
            cococo[Math.floor(n/lie)+1][n%lie+1]=7;
            refreshpanel();

        }

        //   setname(12,"xxx");
        //  setname(0,"xxx");
        // setname(18,"杨博士的口水");

        function setNTC(n) {

            cococo[Math.floor(n/lie)+1][n%lie+1]=0;
            refreshpanel();

        }




// setNTC(25);


        // for (var i=0;1<96;i++)
        // {
        //     setNTC(i);
        // }

        function setP1(n) {

            cococo[Math.floor(n/lie)+1][n%lie+1]=1;
            refreshpanel();

        }

        // setP1(10);

        function setP2(n) {

            cococo[Math.floor(n/lie)+1][n%lie+1]=2;
            refreshpanel();

        }

        // setP2(88);

        function setP3(n) {

            cococo[Math.floor(n/lie)+1][n%lie+1]=3;
            refreshpanel();

        }
        // setP3(40);
        // setP3(17);


        function setunknown(n) {

            cococo[Math.floor(n/lie)+1][n%lie+1]=4;
            refreshpanel();

        }
        // setunknown(15);
        // setunknown(16);





        //--------------------这个函数在于不去绘制任何图形只是操作数据结构而已
        function initcanvaspanel()
        {  //画圈圈和框框

            var oncanvas = document.getElementById(canvasname);
            var ctx = oncanvas.getContext('2d');

            ctx.clearRect(0,0,800,600);

            oncanvas.onmouseover = function (ev)
            {  //鼠标进入区域
                console.log("onmouseoverbbb");
            };

            oncanvas.onmouseout =function ()
            {//鼠标移动出区域
                console.log("onmouseoutbbb");
                oncanvas.onmousemove=null;
                // document.onmouseup =null;
            };

            oncanvas.onclick=function (ev)  //鼠标点击
            {
                console.log("onmousedown");

                var oldX = ev.offsetX-0.4*panelsize;
                var oldY = ev.offsetY-0.4*panelsize;
                var balldownX1 = Math.floor(oldX / panelsize);
                var balldownY1 = Math.floor(oldY / panelsize);

                console.log(balldownX1);
                console.log(balldownY1);


                nonono[balldownY1+1][balldownX1+1]=1;



                refreshpanel();

            }
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

            refreshpanel();

        }

