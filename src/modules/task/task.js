(function() {
    "use strict";

    var app = angular.module("TendrlModule");

    app.controller("taskController", taskController);

    /*@ngInject*/
    function taskController($rootScope, $scope, $interval, utils, config) {

        var vm = this;
        vm.status = "In Progress";
        vm.init = init;
        $rootScope.isNavigationShow = true;

        function init() {
            utils.getObjectList("Cluster")
                .then(function(data) {
                    $rootScope.clusterData = data;
                    if($rootScope.clusterData !== null && $rootScope.clusterData.clusters.length !== 0){
                        vm.status = "Done";
                        /*Cancelling interval when scope is destroy*/
                        $scope.$on('$destroy', function() {
                            $interval.cancel(timer);
                        });
                    }
                });
        }

        /*Refreshing list after each 2 mins interval*/
        var timer = $interval(function () {
            vm.init();
        }, 1000 * config.refreshIntervalTime );   

        /* temporary data for bar chart*/
        vm.horizontalBarChartData = [
            {
                "title" : "h1",
                "data": 400
            },
            {
                "title" : "h2",
                "data": 360
            },
            {
                "title" : "h3",
                "data": 320
            },
            {
                "title" : "h4",
                "data": 175
            },
            {
                "title" : "h5",
                "data": 390
            }
        ]
        vm.chartTitleData = {
            "title": "Pools",
            "data": {
                "total" : 21,
                "error" : 3,
                "warning" : 2,
                "down": 1
            }
        }

        vm.chartData = [
                {
                    "title" : "Ceph-Cluster1: Pool1",
                    "data" : {
                        "used": '43318391580',
                        "total": '72197319301'
                    }

                },
                {
                    "title" : "Ceph-Cluster1: Pool2",
                    "data" : {
                        "used": '21659195790',
                        "total": '72197319301'
                    }

                },
                {
                    "title" : "Ceph-Cluster1: Pool3",
                    "data" : {
                        "used": '57757855440',
                        "total": '72197319301'
                    }

                },
                {
                    "title" : "Ceph-Cluster1: Pool4",
                    "data" : {
                        "used": '36098659650',
                        "total": '72197319301'
                    }

                },
                {
                    "title" : "Ceph-Cluster1: Pool5",
                    "data" : {
                        "used": '64977587370',
                        "total": '72197319301'
                    }

                }
            ]
        

        
    }

})();
