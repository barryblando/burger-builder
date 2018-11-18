function gatherArgs(fn) {
  // using rest operator to gathers a set of values together from assignment context into an array
  return function gather(...args) {
    return fn(args);
  };
}

function fGather(args) {
  return args.reduce((prev, sum) => prev + sum, 0);
}

var g = gatherArgs(fGather);

g(1, 2, 3, 4);  // ?

function spreadArgs(fn) {
  return function spread(args) {
    // using spread operator to spread all those in value context out into its individual values
    return fn(...args);
  };
}

function fSpread(x, y, z, w) {
  return x + y + z + w;
}

var s = spreadArgs(fSpread);

s([1, 2, 3, 4]);  // ?

