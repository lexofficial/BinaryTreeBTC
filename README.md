# BinaryTreeBTC
Get live bitcoin prices into a binary tree structure using node

# How to use 

3. Install node-fetch

```npm install node-fetch```

4. Run code

```node binary_prices.js```

The code will check cryptonator's API every 5 seconds for a new bitcoin price, every new value gets added to a binary tree and the log file (bitcoin_binary_tree.txt) gets updated with the JSON of the tree
