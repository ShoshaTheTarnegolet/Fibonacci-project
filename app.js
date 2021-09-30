const btn = document.getElementById('button');
const input = document.getElementById('input');
const block = document.getElementById('input-wrapper');
const spinner = document.querySelector('.spinner-border');
const spinnerTwo = document.querySelector('.second');
const results = document.querySelector('.results');
const errorMessage = document.querySelectorAll('.invalid-tooltip');
const save = document.getElementById('saving');
const select = document.getElementById('filter');
spinner.hidden = true;
spinnerTwo.hidden = false;

fetchRes();

/* button event */
btn.addEventListener('click', () => {
  if (spinner.hidden) {
    spinner.hidden = false;
  } else {
    spinner.hidden = true;
  }

  setTimeout(() => {
    if (input.value > 50) {
      errorMsg('fifty');
    } else if (input.value == 42) {
      errorMsg('mLife');
    } else if (input.value == '') {
      errorMsg('empty');
    } else {
      checkbtn(save);
    }
    spinner.hidden = true;
  }, 2000);

  refresh();
  errorReload(errorMessage);
});

/* invalid feedback */
function errorMsg(id) {
  const msg = document.getElementById(id);
  msg.style.display = 'block';

  input.style.color = '#D9534F';
  input.style.borderColor = '#D9534F';
}

/* fetch */
/* const fetchNum = async function callserver() {
  try {
    const url = `http://localhost:5050/fibonacci/${input.value}`;
    const res = await fetch(url);
    const data = await res.json();
    addRes(data.result);
    fetchRes();
  } catch (error) {
    error.message;
    console.log(error.message);
  }
}; */
const fetchNum = async () => {
  try {
    const url = `http://localhost:5050/fibonacci/${input.value}`;
    const res = await axios.get(url);
    addRes(res.data.result);
    fetchRes();
  } catch (error) {
    console.log(error);
    alert(`${error.message}. Please look in a console`);
  }
};

/* refresh page */
const refresh = () => {
  const par = document.getElementById('answer');
  //   if there's no par, do nothing
  if (!par);
  else par.remove();
};

/* remove error msg */
const errorReload = (x) => {
  input.style.color = '#000';
  input.style.borderColor = '#ced4da';

  if (!x);
  else {
    x.forEach((msg) => {
      if (msg.style.display == 'block') {
        msg.style.display = 'none';
      }
    });
  }
};

/* refresh result block */
const resultReload = () => {
  document.querySelectorAll('.line').forEach((e) => e.remove());
};

/* make result paragraph */
const addRes = (f) => {
  const resP = document.createElement('p');
  resP.id = 'answer';
  resP.innerText = f;
  block.append(resP);
};

/* second fetch */
/* async function fetchRes() {
  try {
    const url = `http://localhost:5050/getFibonacciResults`;
    const res = await fetch(url);
    const data = await res.json();
    setTimeout(() => {
      resBlock(data);
      spinnerTwo.hidden = true;
    }, 300);
  } catch (error) {
    error.message;
    console.log(error.message);
  }
}
 */
async function fetchRes() {
  try {
    const url = `http://localhost:5050/getFibonacciResults`;
    const res = await axios.get(url);
    resBlock(res.data);
    spinnerTwo.hidden = true;
  } catch (error) {
    console.log(error);
    alert(`${error.message}. Please look in a console`);
  }
}

/* prev. results block*/
function resBlock(data) {
  const prevRes = data.results;
  let arr = prevRes.sort(function (a, b) {
    return b.createdDate - a.createdDate;
  });

  for (let i = 0; i <= 10; i++) {
    makeLineRes(arr[i], prevRes[i]);
  }
}

/* make result divs for result block */
function makeLineRes(datearr, res) {
  const line = document.createElement('div');
  let date = datearr.createdDate;
  let newDate = new Date(date);
  line.innerText = `The Fibonnaci Of ${res.number} is ${res.result}. Calculated at: ${newDate}`;
  line.className = 'line';
  line.setAttribute('data-filter', res.number);
  line.setAttribute('data-date', date);
  results.append(line);
}

/* select filter*/
select.addEventListener('click', () => {
  let lines = document.querySelectorAll('.line');
  // console.dir(lines);
  switch (select.value) {
    case 'nASC':
      /*       my way:
  let arrnASC = [...lines].sort(function (a, b) {
          return a.dataset.filter - b.dataset.filter;
        });
        resultReload();
        console.log(arrnASC, arrnASC[10].innerText);
    for (let i = 0; i < 11; i++) {
          results.append(arrnASC[i]);
          console.log(arrnASC[i]);
        } */

      /*easier way, I've found */
      resultReload();
      Array.from(lines)
        .sort((a, b) => {
          return a.dataset.filter - b.dataset.filter;
        })
        .forEach((el) => {
          results.append(el);
        });

      break;
    case 'nDSC':
      resultReload();
      Array.from(lines)
        .sort((a, b) => {
          return b.dataset.filter - a.dataset.filter;
        })
        .forEach((el) => {
          results.append(el);
        });
      break;
    case 'dASC':
      resultReload();
      Array.from(lines)
        .sort((a, b) => {
          return a.dataset.date - b.dataset.date;
        })
        .forEach((el) => {
          results.append(el);
        });
      break;
    case 'dDSC':
      resultReload();
      Array.from(lines)
        .sort((a, b) => {
          return b.dataset.date - a.dataset.date;
        })
        .forEach((el) => {
          results.append(el);
        });
      break;
  }
});

/* radio check */
function checkbtn(btn) {
  if (btn.checked) {
    resultReload();
    fetchNum();
    spinnerTwo.hidden = false;
  } else {
    const val = input.value;
    let res = fibN(val);
    addRes(res);
  }
}

/* my Fibonacci function */
const fib = (n) => {
  if (n <= 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};
/* const fibNegat = (n) => {
  if (n == -1){
    return 1;
}else {
  return fibNegat(n + 2) - fibNegat(n + 1);
}
}; */
const memo = (x) => {
  const cache = {};
  return (arg) => cache[arg] || (cache[arg] = x(arg));
};
const fibN = memo(fib);
