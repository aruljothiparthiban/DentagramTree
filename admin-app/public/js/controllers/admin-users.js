'use strict';

angular.module('fotag').controller('AdminUserCntrl',['$scope','$http',function($scope,$http,toaster){

	$scope.grid = {
		dataSource:[],
		items:[],
		pageIndex : 1,
		pageSize : 10,
		count : 0,
		selectedAll :false,
		selectedItems:[],
		searchText : null,
		init : function(){
			this.selectedAll = false;			
		},
		selectAllRows : function(){
			var _this = this;
			_.forEach(this.items,function(x){
				x.selected = _this.selectedAll;
			});
			this.selectedItems = _.filter(this.items,function(x){
				return x.selected;
			});
		},
		selectedRow : function(p){
			this.selectedItems = _.filter(this.items,function(x){
				return x.selected;
			});
		},
		getStartIndex:function(){
			return ((this.pageIndex-1)*this.pageSize)+1;
		},
		getEndIndex:function(){
			var index =(this.pageIndex*this.pageSize);
			if(index<this.count){
				return index;
			}
			return this.count;
		},
		moveNext : function(){
			this.pageIndex++;
			this.paginate();
		},
		movePrev : function(){
			this.pageIndex--;
			this.paginate();
		},
		load : function(){
			var _this = this;			
			$http.get('api/users').success(function(data, status, headers, config) {
				_.forEach(data,function(x){
					x.selected = false;
				});
				_this.init();
				_this.dataSource = data;				
				_this.count = data.length;
				_this.paginate();
		  	}).
		  	error(function(data, status, headers, config) {
		  		_this.init();
		  	});
		},
		paginate :function(){
			var _this = this;
			if(this.dataSource.length>0){
				var data = this.dataSource;
				if(this.searchText){
					data = _.filter(data,function(x){
						return _.startsWith(x.firstname,_this.searchText) 
							|| _.startsWith(x.lastname,_this.searchText)
							|| _.startsWith(x.email,_this.searchText);
					});
				}
				var currentItems =[];
				if(this.pageIndex===1){
					currentItems = _.take(data,this.pageSize);
				}
				else {
					currentItems = _.slice(data, (this.pageIndex - 1) * this.pageSize);
					currentItems = _.take(currentItems,this.pageSize);
				}
				this.items = currentItems;
			}
		},
		action : 'none',
		applyAction:function(){
			var _this = this;
			var postData = 
			{
				action:_this.action,
				users:_.map(_this.selectedItems,function(x){
					return x.userid;
				})
			};
			$http.post('api/users/actions', postData).
			success(function(data, status, headers, config) {
				_this.load();
				_this.action ='none';
				_this.selectedItems =[];
				//toaster.success('success', "title", "text");
			}).
			error(function(data, status, headers, config) {
				
			});
		}
	};

	$scope.user = {};
	$scope.focus = true;
	$scope.clear = function(){
		$scope.user = null;
		$scope.focus = true;
	};
}]);
