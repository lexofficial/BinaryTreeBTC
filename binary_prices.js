const util = require('util')
const fetch = require('node-fetch')
fs = require('fs');

class Node {
	constructor(data) {
		this.data = data;
		this.right = null;
		this.left = null;
  	}
}

class Tree {
	constructor(){
		this.root = null;
	}

	addNode(data) {
		let newNode = new Node(data);
		if(this.root === null) {
			this.root = newNode;
		}
		else {
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node, newNode) {
		if (newNode.data < node.data) {
			if(node.left === null) {
				node.left = newNode;
			}
			else {
				this.insertNode(node.left, newNode)
			}
		}
		else {
			if(node.right === null) {
				node.right = newNode;
			}
			else {
				this.insertNode(node.right, newNode)
			}
		}
	}

	maxValues(node, max) {
		if(node.right != null){
			if(node.right.data > max) {
				this.maxValues(node.right, node.right.data)
			}
		}
		else {
			console.log(`Max value of tree : ${max}`)
		}
	}
}

let tree = new Tree()
let globalPrice = 0;

function updateTree(tempPrice){
	tempPrice = parseFloat(tempPrice)
	if (tempPrice != globalPrice) {
		globalPrice = tempPrice;
		tree.addNode(globalPrice);
		fs.writeFile('bitcoin_binary_tree.txt', JSON.stringify(tree, null, 4), function(err) {
			console.log(`New global price ==> ${globalPrice}`)
		})
	}
}

setInterval( async (globalPrice) => {
	let tempPrice = await fetch("https://api.cryptonator.com/api/ticker/btc-usd")
		.then(res => res.text())
		.then((text) => {
			response = JSON.parse(text)
			return response["ticker"]["price"]
		})
	updateTree(tempPrice);
}, 5000);
