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
