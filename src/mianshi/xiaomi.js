import {insertStrAt, replaceStrAt} from 'root/utils/util.js'

function traverseNode(node){
  const res = [];
  const processing = [node];
  let processed = node;
  while(processed && processing.length){
    processed = processing.shift()
    processing.push(...processed.children)
    if(processed.nodeType === 1){
      res.push(processed)
    }
  }
  return res
}

function genParen(n){
  const BRACKET = '()'
  if(n <= 1){
    return [BRACKET]
  } 
  let lastPairs = genParen(n - 1);
  let currPairs = new Set();
  for(const pair of lastPairs){
    currPairs.add(BRACKET + pair)
    for(const idx in pair){
      if(pair[idx] === BRACKET[0]){
        currPairs.add(insertStrAt(pair, parseInt(idx) + 1, BRACKET))
      }
    }
  }
  return Array.from(currPairs);
}

function innerGenParen(list, leftRem, rightRem, str, index){
  if(leftRem < 0 || leftRem > rightRem) return
  if(leftRem === 0 && rightRem === 0){
    list.push(str)
    str = ''
    return 
  }
  str = replaceStrAt(str, index, '(')
  innerGenParen(list, leftRem - 1, rightRem, str, index + 1)
  str = replaceStrAt(str, index, ')')
  innerGenParen(list, leftRem, rightRem - 1, str, index + 1)
}

function genParenNoRepeat(n){
  const list = [];
  innerGenParen(list, n, n, '', 0)
  return list;
}

export {
  traverseNode,
  genParen,
  genParenNoRepeat,
}
