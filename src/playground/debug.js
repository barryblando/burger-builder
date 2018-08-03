const disabledInfo = {
  salad: 0,
  bacon: 0,
  cheese: 4,
  meat: 2,
};

console.log(Object.keys(disabledInfo).map(igKey => {
  return disabledInfo[igKey];
}));

for (let key in disabledInfo) {
  // check if true then disable the specific ingredient button, i.e { salad: true, meat: false, etc. }
  disabledInfo[key] = disabledInfo[key] <= 0;
  key // ?
  disabledInfo // ?
  console.log(disabledInfo[key]);
}

const enoughDragonSpawned = Math.random() > 0.75; // ?

!enoughDragonSpawned // ?

if (!enoughDragonSpawned) {
  console.log('+1')
} else  {
  console.log('done');
}





