const ref = firebase.database().ref('num');

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
spinnerTwo.hidden = true;

/* get data when loading pagw*/
getData(ref);

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
    } else if (input.value < 0) {
      errorMsg('negative');
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

/* make result divs for result block */
function makeLineRes(data) {
  const line = document.createElement('div');
  let date = data.date;
  let newDate = new Date(date).toUTCString();
  line.innerText = `The Fibonnaci Of ${data.value} is ${data.result}. Calculated at: ${newDate}`;
  line.className = 'line';
  line.setAttribute('data-filter', data.value);
  line.setAttribute('data-date', date);
  results.append(line);
}

/* select filter*/
select.addEventListener('click', () => {
  let lines = document.querySelectorAll('.line');

  switch (select.value) {
    case 'nASC':
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

/* save button check */
function checkbtn(btn) {
  const val = input.value;
  let res = fibN(val);
  addRes(res);
  if (btn.checked) {
    spinnerTwo.hidden = false;
    /* send data to database*/
    const data = {
      value: input.value,
      result: res,
      date: Date.now(),
    };
    ref
      .push(data)
      .then(function () {
        console.log('Message sent');
      })
      .catch(function (error) {
        console.log('Message could not be sent: ', error);
      });

    resultReload();
    setTimeout(() => {
      getData(ref);
      spinnerTwo.hidden = true;
    }, [1000]);
  }
}
/* get data from firebase */
function getData(database) {
  database.limitToLast(10).on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let data = childSnapshot.val();
      makeLineRes(data);
      resBlock();
    });
  });
}
/* function for desc sorting */
function resBlock() {
  let lines = document.querySelectorAll('.line');
  let arr = Array.from(lines).sort((a, b) => {
    return b.dataset.date - a.dataset.date;
  });
  arr.forEach((el) => {
    results.append(el);
  });
}

/* my Fibonacci function */
const fib = (n) => {
  if (n <= 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};

const memo = (x) => {
  const cache = {};
  return (arg) => cache[arg] || (cache[arg] = x(arg));
};
const fibN = memo(fib);
