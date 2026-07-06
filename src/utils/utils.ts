function rdSelect<T>(arr: T[]) : T | undefined {
    if (arr.length == 0) return undefined;
    let rdIdx = Math.floor(Math.random() * arr.length);
    return arr[rdIdx];
}

function P(x: number) : boolean {
    return Math.random() < x;
}

class SortedList {
    list: number[];
    constructor(compareFunction: Function) {
      this.list = [];
    }
  
    add(element: number) {
      this.list.push(element);
      this.list.sort();
    }
  
    getList() {
      return this.list;
    }
}

function htmlEscape(s: string) {
  let lookup: {[key: string] : string} = {
      '&': "&amp;",
      '"': "&quot;",
      '\'': "&apos;",
      '<': "&lt;",
      '>': "&gt;"
  };
  return s.replace( /[&"'<>]/g, c => lookup[c] );
}

export { rdSelect, P, htmlEscape };