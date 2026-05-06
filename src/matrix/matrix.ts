export class Matrix {
  private _rows: number[][];

  constructor(matrix: string) {
    this._rows = matrix.split('\n').map(n => n.split(' ').map(Number));
  }

  get rows(): number[][] {
    return this._rows;
  }



  get columns(): number[][] {
    return this._rows[0].map((_, col) => this._rows.map(row => {
        // console.log('row', row);
        // console.log('col', col);
        return row[col];
    }));
  }
}

// const matrix = new Matrix('1 2\n3 4');
// console.log(matrix.rows);
// console.log(matrix.columns);