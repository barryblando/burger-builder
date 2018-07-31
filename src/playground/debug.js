const disabledInfo = {
  salad: 2,
  bacon: 3,
  cheese: 4,
  meat: 2,
};

console.log(Object.keys(disabledInfo).map(igKey => {
  return disabledInfo[igKey];
}));

for (let key in disabledInfo) {
  // check if true then disable the specific ingredient button, i.e { salad: true, meat: false, etc. }
  disabledInfo[key] = disabledInfo[key] <= 0;
  console.log(disabledInfo[key]);
}

