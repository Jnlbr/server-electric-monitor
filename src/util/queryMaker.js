const toCamelCase = (word) => {
  const REG_EXP = /_/;
  if (!REG_EXP.test(word))
    return word;

  let w = '';
  for (let i = 0; i < word.length; i++) {
    let s;
    if (word[i] === '_') {
      s = word[i + 1].toUpperCase();
      i++;
    } else {
      s = word[i];
    }
    w += s;
  }

  return w;
}

class QueryMaker {
  constructor() {
    this.query = '';
    this.table = '';
    this.where = 0;
  }
  select(table,columns) {
    this.table = table;
    const alias = columns.map(col => `${table}.${col} AS ${toCamelCase(col)}`);
    const _columns = alias.join(', ');

    this.query = `SELECT ${_columns} FROM ${table}`;
    return this;
  }
  inner(table,col1,col2) {
    this.query += ` INNER JOIN ${table} ON ${this.table}.${col1} = ${table}.${col2}`
  }
  equal(index, value, table = null) {
    const where = this.where === 0 ? 'WHERE' : 'AND';
    const _table = table? table : this.table; 

    if (isNaN(value)) {
      this.query += ` ${where} ${_table}.${index} = '${value}'`;
    } else {
      this.query += ` ${where} ${_table}.${index} = ${value}`;
    }
    this.where++;
    return this;
  }
  isNull(index) {
    let where = this.where === 0 ? 'WHERE' : 'AND';
    this.query += `${where} ${this.table}.${index} IS NULL`;

    this.where++;
    return this;
  }
  order(by) {
    this.query += 'ORDER BY' + by;
    return this;
  }
  desc() {
    this.query += 'DESC';
    return this;
  }
  asc() {
    this.query += 'ASC';
    return this;
  }
  limit(limit) {
    this.query += 'LIMIT' + limit;
    return this;
  }
  make() {
    return this.query;
  }
}

export default QueryMaker;