let full_list = [1,2,3]
let empty = ""

full_list = full_list.filter(item => item === 3);
console.log(full_list);
console.log(full_list ? "data available" : "not available");
console.log(empty ? "data available" : "not available");
