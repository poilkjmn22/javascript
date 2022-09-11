/*
 * @Author: fangqi
 * @Date: 2022-03-11 16:03:26
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-11 16:18:28
 * @Description: git 分支命令
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function noteBranch(elContainer) {
  elContainer.innerHTML = `<pre>
    git remote add origin ...<br />
    git branch --set-upstream-to=origin/branchName branchName
    git checkout -b xxx origin/xxx <br />
    </pre>
  `;
}

export { noteBranch };
