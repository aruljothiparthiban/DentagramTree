'use strict';

var _ = require('lodash');
var app = require('../config/express')();
/**
 * Json static data
 *
 */



var lastNodeParent = null;
var root = null;
var addDataToLastNode = function(data,content){
    var child =  null;
    if(data.children && data.children.length>0){
        child = data.children[data.children.length-1];
	    if(data.type==='page'){   
	        addDataToLastNode(child,content);
	    }
	    else if(data.type==='content'){
	    	child.parent.children.push(content);
	    } 
    }
};

function generateRandom(){
        var length=10;
        var mask = '';
        mask += 'abcdefghijklmnopqrstuvwxyz';
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        mask += '0123456789';
        mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
        return result;
};

/**
 * Action method for logged in user profile
 *
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	res.render('dendrogram/index',{
		title:'Dendrogram'
	});
};

/**
 * Returns json data
 *
 * @param req
 * @param res
 */
exports.get = function(req, res) {
	res.send(app.get('jsonData'));
};

/**
 * Post data
 *
 * @param req
 * @param res
 */
exports.post = function(req, res) {
	var node = req.body;
	var root = app.get('jsonData');
	if(node)
	{	
		root.children.push(node);
	}
	res.send(root);
};


