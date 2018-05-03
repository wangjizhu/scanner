vm = new Vue({
    el: '#app3',


    data: function () {
        return {

            state: {
                home: true,
                data: false,
                setting: false,
                engnieer: false,
                snapready: false,
                snaping: false
            },               //状态机


            snapingstate: {
                scanning: false,
                snaping: false,
                computing: false,
                snapok: false,
                canvasok: false,


            },
            // stateinengineer:
            //     {
            //
            //
            //
            //     }

            ip:'192.168.88.1',



            aa:{},
            bb:{},
            cc:{},
            dd:{},
            ee:{},
            ff:{},

            // maxfam:"00000000",
            // minfam:"00000000",
            // maxhex:"00000000",
            // minhex:"00000000",
            // maxrox:"00000000",
            // minrox:"00000000",



            dialogVisible: false,
            snapresult: null,

            radio7: '1',
            activeName1: 'first',
            activeName2: 'first',
            snapnext: true,

            fullscreenLoading: false,
            loading2: true,

            loadingtext: "aaa",

            platename0: '000',
            platenum: '',

            currentPage:1,
            totalpage:'1',


            dataadjust: [],

            dataget:[],

            tableData: [{
                time: '2016-05-03',
                id: '00000',
                no: '00000',
            }
            ],


        }
    },
    mounted(){
        document.getElementsByTagName('body')[0].style.display="block"
    },

    methods: {

        handleCurrentChange(val) {
            console.log(val);


            let _this = this;
            axios.get('http://'+this.ip+':8081/v1/data/?page='+(val-1)+'&cap=10',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response);

                    _this.totalpage=response.data.Data.Length;
                    _this.dataget=[];

                    for (var i=0;i<response.data.Data.Data.length;i++)
                    {
                        _this.dataget.push({
                            time:response.data.Data.Data[i].ScanTime,
                            id:response.data.Data.Data[i].ID,
                            no: response.data.Data.Data[i].No,
                        });

                    }

                })
                .catch(function (response) {
                    console.log(response);
                    alert("Extract data failed!");


                });




        },

        refreshdata() {



            let _this = this;
            axios.get('http://'+this.ip+':8081/v1/data/?page='+(_this.currentPage-1)+'&cap=10',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response);

                    _this.totalpage=response.data.Data.Length;
                    _this.dataget=[];

                    for (var i=0;i<response.data.Data.Data.length;i++)
                    {
                        _this.dataget.push({
                            time:response.data.Data.Data[i].ScanTime,
                            id:response.data.Data.Data[i].ID,
                            no: response.data.Data.Data[i].No,
                        });

                    }

                })
                .catch(function (response) {
                    console.log(response);
                    alert("Extract data failed!");


                });




        },


        openFullScreen() {


            this.fullscreenLoading = true;
            this.loadingtext = "CAUTION! The holder is opening...";

            //----------------------------------------------------------
            //          setTimeout(() => {
            //              this.fullscreenLoading = false;
            //              this.state.home=false;
            //              this.state.snapready=true;
            //
            //      }, 1000);



//-----------------------------------------------------------------

            let _this = this;
            axios.put('http://'+this.ip+':8081/v1/lite/holder', 'out', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                _this.fullscreenLoading = false;
                _this.state.home = false;
                _this.state.snapready = true;
                _this.platenum='';

            })
                .catch(function (response) {
                    console.log(response);
                    alert("吐出失败");
                    _this.fullscreenLoading = false;
                });
//------------------------------------------------------------------------------------


        },

        openFullScreen2() {


            this.fullscreenLoading = true;
            this.loadingtext = "CAUTION! The holder is closing! Please wait a few minutes for scanning...";


            //     setTimeout(() => {
            //         this.fullscreenLoading = false;
            //     this.state.snapready=false;
            //     this.state.snaping=true;
            //     this.snaping();
            // }, 1000);

// //------------------------------------------------------------------------------------
// //             let _this = this;
// //             axios.put('http://10.1.1.107:8081/v1/lite/holder', 'in',{
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 }
// //             })
// //                 .then(function (response) {
// //                     console.log(response);
// //                     _this.fullscreenLoading = false;
// //                     _this.state.snapready = false;
// //                     _this.state.snaping = true;
// //                     _this.snaping();
// //
// //                 })
// //                 .catch(function (response) {
// //                     console.log(response);
// //                     alert("吞入失败");
// //                     _this.fullscreenLoading = false;
// //
// //                 });
// //------------------------------------------------------------------------------------
//
            let _this = this;
            axios.get('http://'+this.ip+':8081/v1//lite/scan_result?id=' + _this.platenum.toString())
                .then(function (response) {
                    console.log(response);
                    _this.snapresult=response;
                    _this.fullscreenLoading = false;
                    _this.state.snapready = false;
                    _this.state.snaping = true;

                    setTimeout(() => {
                        _this.snaping1();
                    },100);


//

                })
                .catch(function (response) {
                    console.log(response);
                    alert("Scan failed! Please check!");
                    _this.fullscreenLoading = false;
                    // _this.state.snapready = false;
                    // _this.state.snaping = true;
                    // _this.snaping();
                });




        },

        openFullScreen3() {


            this.fullscreenLoading = true;
            this.loadingtext = "CAUTION! The holder is closing!";

            // setTimeout(() => {
            //     this.fullscreenLoading = false;
            // this.state.snapready=false;
            // this.state.home=true;
            // }, 1000);

//------------------------------------------------------------------------------------
            let _this = this;
            axios.put('http://'+this.ip+':8081/v1/lite/holder', 'in',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response);
                    _this.fullscreenLoading = false;
                    _this.state.snapready = false;
                    _this.state.home = true;

                })
                .catch(function (response) {
                    console.log(response);
                    alert("吞入失败");
                    _this.fullscreenLoading = false;

                });
//------------------------------------------------------------------------------------


        },




        begindata(){

            let _this = this;
            axios.get('http://'+this.ip+':8081/v1/data/?page='+(_this.currentPage-1)+'&cap=10',{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    console.log(response);
                    _this.state.home=false;
                    _this.state.data=true;

                    _this.totalpage=response.data.Data.Length;
                    _this.dataget=[];

                    for (var i=0;i<response.data.Data.Data.length;i++)
                    {
                        _this.dataget.push({
                            time:response.data.Data.Data[i].ScanTime,
                            id:response.data.Data.Data[i].ID,
                            no: response.data.Data.Data[i].No,
                        });


                    }


                })
                .catch(function (response) {
                    console.log(response);
                    alert("Extract data failed!");


                });






        },




        openFullScreen4() {


            this.fullscreenLoading = true;
            this.loading2 = true;
            this.snapnext = true;
            this.loadingtext = "CAUTION! The holder is opening...";


            this.fullscreenLoading = false;
            this.state.snaping = false;
            this.state.snapready = true;
            // setTimeout(() => {
            //     this.fullscreenLoading = false;
            // this.state.snaping=false;
            // this.state.snapready=true;
            //
            // }, 1000);

//------------------------------------------------------------------------------------
//             let _this = this;
//             axios.put('http://10.1.1.107:8081/v1/lite/holder', 'out',{
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(function (response) {
//                     console.log(response);
//                     _this.fullscreenLoading = false;
//                     _this.state.snaping = false;
//                     _this.state.snapready = true;
//
//                 })
//                 .catch(function (response) {
//                     console.log(response);
//                     alert("吐出失败");
//                     _this.fullscreenLoading = false;
//
//                 });
//---------------------------------------------------------------------------------------


        },


        snaping() {




                this.loadingtext = "Initializing";


                this.aa=new canvasplate(0,this.snapresult);
                this.aa.initcanvaspanel();
                this.platename0=this.aa.erweima;




                this.bb=new canvasplate(1,this.snapresult);
                this.bb.initcanvaspanel();



                this.cc=new canvasplate(2,this.snapresult);
                this.cc.initcanvaspanel();



                // canvasname = "FAM";
                // initcanvaspanel();
                // canvasname = "HEX";
                // initcanvaspanel();
                // canvasname = "ROX";
                // initcanvaspanel();


//------------------------------------------------------------------------------------
//             setTimeout(() => {
//                 this.loadingtext = "scanning...";
//             }, 1000);
//             setTimeout(() => {
//                 this.loadingtext = "snaping...";
//             }, 2000);
//             setTimeout(() => {
//                 this.loadingtext = "computing...";
//             }, 3000);
//             setTimeout(() => {
//                 this.loading2 = false;
//                 this.snapnext = false;
//             }, 4000);
//------------------------------------------------------------------------------------

            // let _this = this;
            // axios.get('http://10.1.1.107:8081/v1//lite/scan_result?id=' + platenum.toString())
            //     .then(function (response) {
            //         console.log(response);
            //         _this.fullscreenLoading = false;
            //         _this.state.snaping = false;
            //         _this.state.snapready = true;
            //
            //     })
            //     .catch(function (response) {
            //         console.log(response);
            //         alert("吐出失败");
            //         _this.fullscreenLoading = false;
            //
            //     });


//------------------------------------------------------------------------------------


        },


        snaping1() {


            // this.loadingtext = "initing...";


            this.dd=new canvasplate(3,this.snapresult);
            this.dd.initcanvaspanel();
            this.platename0=this.dd.erweima;


            this.ee=new canvasplate(4,this.snapresult);
            this.ee.initcanvaspanel();


            this.ff=new canvasplate(5,this.snapresult);
            this.ff.initcanvaspanel();

        },






        handleClick(tab, event) {
            console.log(tab, event);
            // canvasname=this.activeName2;
            // initcanvaspanel();
        },

        handleClick1(row) {
            console.log(row);

            this.dialogVisible = true;

            let _this = this;
            axios.get('http://'+_this.ip+':8081/v1/data/'+row.id+'/no/'+row.no)
                .then(function (response) {
                    console.log(response);
                    _this.snapresult=response;

                    setTimeout(() => {
                        _this.snaping();
                    });

                })
                .catch(function (response) {
                    console.log(response);
                    alert("Failed! Please check!");

                });



        },

        handleClick2(row) {
            console.log(row);

            let _this = this;
                this.$confirm('Will permanently delete the data, Y/N?', 'Notice', {
                    confirmButtonText: 'YES',
                    cancelButtonText: 'NO',

                    type: 'warning'
                }).then(() => {
                    console.log("aaa");


                    axios.delete('http://'+_this.ip+':8081/v1/data/'+row.id+'?no='+row.no)
                        .then(function (response) {
                            console.log(response);
                            _this.$message({
                                type: 'success',
                                message: 'Deleted'
                            });
//
                            _this.refreshdata()
                            // this.handleCurrentChange(val);



                        })
                        .catch(function (response) {
                            console.log(response);
                            alert("Deletion failed! Please check!");

                        });







//


                }).catch(() => {
                    console.log("bbb");

                    this.$message({
                        type: 'info',
                        message: 'Canceled'
                    });
                });



        },

        calibration1() {



            this.fullscreenLoading = true;
            this.loadingtext = "CAUTION! The holder is opening...";


            let _this = this;
            axios.put('http://'+this.ip+':8081/v1/lite/holder', 'out', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                _this.fullscreenLoading = false;
                window.location.href = "./calibration1.html";

            })
                .catch(function (response) {
                    console.log(response);
                    alert("吐出失败");
                    _this.fullscreenLoading = false;
                });




        },
        calibration2() {



            this.fullscreenLoading = true;
            this.loadingtext = "CAUTION! The holder is opening...";


            let _this = this;
            axios.put('http://'+this.ip+':8081/v1/lite/holder', 'out', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                _this.fullscreenLoading = false;
                window.location.href = "./calibration2.html";

            })
                .catch(function (response) {
                    console.log(response);
                    alert("吐出失败");
                    _this.fullscreenLoading = false;
                });





        },

    }


});


vm.dataadjust.push("hello0",
    "hello1",
    "hello2",
    "hello3",
    "hello4",
    "hello5",
    "hello6",
    "hello7",
    "hello8",
    "hello9",
    "hello10");

















