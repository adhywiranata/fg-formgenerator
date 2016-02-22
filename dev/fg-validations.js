//VALIDATION ACTIONS

function validateRequired(value)
{
  if(value == '')
  {
    return false;
  }
  else
  {
    return true;
  }
}

function validateEmail(value)
{
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}

function validateNumeric(value)
{
  if (value.match(/^[0-9]+$/))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function validateAlpha(value)
{
  if (value.match(/^[a-zA-Z]*$/))
  {
    return true;
  }
  else
  {
    return false;
  }
}

//FORM VALIDATIONS

function validateForm(validationRules,inputVal,input)
{
  var errorFlag = 0;
  //REQUIRED (must be filled)
  if(validationRules.indexOf('required') > -1)
  {
    if(validateRequired(inputVal))
    {
      input.parent().find('.fg-error').html('');
    }
    else
    {
      input.parent().find('.fg-error').html('Must be filled');
      errorFlag++;
    }
  }

  //NUMERIC
  if(validationRules.indexOf('numeric') > -1)
  {
    if(validateNumeric(inputVal))
    {
      input.parent().find('.fg-error').html('');
    }
    else
    {
      input.parent().find('.fg-error').html('Must be numeric');
      errorFlag++;
    }
  }

  //ALPHA
  if(validationRules.indexOf('alpha') > -1)
  {
    if(validateAlpha(inputVal))
    {
      input.parent().find('.fg-error').html('');
    }
    else
    {
      input.parent().find('.fg-error').html('Must be Alphabetic');
      errorFlag++;
    }
  }

  //EMAIL
  if(validationRules.indexOf('email') > -1)
  {
    if(validateEmail(inputVal))
    {
      input.parent().find('.fg-error').html('');
    }
    else
    {
      input.parent().find('.fg-error').html('Must be Email');
      errorFlag++;
    }
  }

  if(errorFlag == 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}
