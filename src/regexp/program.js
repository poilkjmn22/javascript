//用正则表达式编程
fetch('./regexp/resources/table-data.txt')
  .then((res) => res.text())
  .then((data) => {
    //console.log(data.match(/\n/g));
    let dataTable = importTable(data);
    console.dir(dataTable);
  })
  .catch((e) => console.log(e));

function importTable(fileContent) {
  var table = null;
  var row = null;
  var cell = null;
  var groupKeyword = 1;
  var groupString = 2;
  var groupError = 3;
  var regexpTableData = /\b(table|row|cell)\b|%([^%]*(?:%%[^%]*)*)%|(\S+)/gi;
  var match;
  var keyword;
  var content;
  do {
    match = regexpTableData.exec(fileContent);
    if (!match) {
      break;
    }
    if (match[groupKeyword] !== void 0) {
      keyword = match[groupKeyword].toLowerCase();
      if (keyword === 'table') {
        table = Object.create(Table);
        table.rows = [];
        table.caption = '';
        row = null;
        cell = null;
      } else if (keyword === 'row') {
        if (!table) {
          throw new Error('表格式错误：缺少Table');
        }
        row = table.addRow();
        cell = null;
      } else if (keyword === 'cell') {
        if (!row) {
          throw new Error('格式错误：缺少Row');
        }
        cell = row.addCell();
      } else {
        throw new Error('解析错误：未知的关键词');
      }
    } else if (match[groupString] !== void 0) {
      content = match[groupString].replace(/%%/g, '%');
      if (cell) {
        cell.addContent(content);
      } else if (row) {
        throw new Error('格式错误：Row后不应该出现字符串');
      } else if (table) {
        table.addCaption(content);
      } else {
        throw new Error('格式错误：Table前不应该出现字符串');
      }
    } else if (match[groupError]) {
      throw new Error(`格式错误：${match[groupError]}`);
    } else {
      throw new Error('解析错误：未捕获到匹配项');
    }
  } while (match);

  if (!table) {
    throw new Error('格式错误：缺少关键字Table');
  }
  return table;
}

const Table = {
  caption: 'table caption',
  rows: [],
  addRow() {
    let row = Object.create(TableRow);
    row.cells = [];
    if (!this.rows) {
      throw new Error('Table缺少rows字段');
    }
    this.rows.push(row);
    return row;
  },
  addCaption(content) {
    this.caption = content;
  },
};

const TableRow = {
  cells: [],
  addCell() {
    let cell = Object.create(TableCell);
    cell.content = '';
    if (!this.cells) {
      throw new Error('Row缺少cells字段');
    }
    this.cells.push(cell);
    return cell;
  },
};

const TableCell = {
  content: '',
  addContent(content) {
    this.content += content;
  },
};
