const select = document.getElementById('filter');

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
