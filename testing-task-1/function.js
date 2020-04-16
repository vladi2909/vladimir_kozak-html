function sum(a, b) {

    if (isNaN(a) || isNaN(b)) {
      return 'NaN';
    }

    return Number(a) + Number(b);

  }