console.log('fg is running....');

/*
=======================================
BOOTSTRAP V3 Integrated Form Generator
Author: Adhy Wiranata
=======================================
usage:

<form class="fg-form">
  <div class="fg-input" [FG ELEMENTS] ></div>
</form>

FG ELEMENTS
===========
- data-type = text|textarea|radio|checkbox|select-option|combobox|date
- data-label = label of the form input
- data-name = input name
- data-validation = required|email|numeric|alpha|alphanumeric
- data-placeholder = placeholder of/piubthe input. Works on inputs with placeholders
- data-current = current value of the input. Will select the [value] of options/radio/checkbox
- data-item-value = string which contain items values for options/radio/checkbox. Use comma separators
- data-item-label = string which contain items labels for options/radio/checkbox. Use comma separators
- data-ajax = COMING SOON !
- data-multiple = give multiplicity fields. any value is okay.

WIP:
data-validation-> matches|regex|
data-type -> autocomplete
data-class -> TO INJECT A CLASS!
===========

WORKING EXAMPLES
================
<div class="col-xs-12 fg-input" data-type="text" data-label="Training title" data-name="title" data-validation="required" data-placeholder="insert training title" data-current=""></div>
<div class="col-xs-12 fg-input" data-type="text" data-label="Training Provider" data-name="title" data-validation="alpha" data-placeholder="insert training provider name" data-current=""></div>
<div class="col-xs-12 fg-input" data-type="textarea" data-label="Training Participant" data-name="title" data-validation="required" data-placeholder="insert training participants" data-current=""></div>
<div class="col-xs-12 fg-input" data-type="text" data-label="Training title" data-name="title" data-validation="required" data-placeholder="insert training title" data-current=""></div>
<div class="col-xs-12 fg-input" data-type="date" data-label="Start Date" data-name="start_date" data-validation="required" data-current=""></div>
<div class="col-xs-12 fg-input" data-type="radio" data-label="Start Date" data-name="gender" data-validation="required" data-item-label="Male,Female" data-item-value="M,F" data-current="F"></div>
<div class="col-xs-12 fg-input" data-type="checkbox" data-label="Start Date" data-name="gender" data-validation="required" data-item-label="Male,Female" data-item-value="M,F" data-current="M,F"></div>
<div class="col-xs-12 fg-input" data-type="combobox" data-label="Start Date" data-name="gender" data-validation="required" data-item-label="Male,Female" data-item-value="M,F" data-current="F"></div>
==================

*/




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

  //ALPHA
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

//HELPER FUNCTIONS

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//GENERATORS

function generateMonthOptions(){
  var months = [
    '01','02','03','04',
    '05','06','07','08',
    '09','10','11','12'];
  var monthsLabel = [
    'January','February','March',
    'April','May','June','July',
    'August','September','October',
    'November','December'];
  option = '';
  for(var i=0;i<12;i++)
  {
    option += '<option value="' + months[i] + '">' + monthsLabel[i] + '</option>';
  }
  return option;
}

function generateInput(type,name,placeholder,labelList,valList,currentVal,items){
  if(type == 'text')
  {
    return generateText(name,placeholder,currentVal);
  }
  if(type == 'password')
  {
    return generatePassword(name,placeholder,currentVal);
  }
  if(type == 'text-autocomplete')
  {
    return generateAutocompleteText(name,placeholder,currentVal,items);
  }
  if(type == 'textarea')
  {
    return generateTextarea(name,placeholder,currentVal);
  }
  if(type == 'radio')
  {
    return generateRadio(name,labelList,valList,currentVal);
  }
  if(type == 'checkbox')
  {
    return generateCheckbox(name,labelList,valList,currentVal);
  }
  if(type == 'select-option' || type == 'combobox')
  {
    return generateSelectOption(name,labelList,valList,currentVal);
  }
  if(type == 'date')
  {
    return generateDate(name,currentVal);
  }
}

function generateText(name,placeholder,currentVal){
  input = '';
  input += '<input type="text" name="';
  input += name;
  input += '" class="form-control" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"/>';
  return input;
}

function generatePassword(name,placeholder,currentVal){
  input = '';
  input += '<input type="password" name="';
  input += name;
  input += '" class="form-control" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"/>';
  return input;
}

function generateAutocompleteText(name,placeholder,currentVal,items){
  input = '';
  input += '<input type="text" name="';
  input += name;
  input += '" class="form-control fg-autocomplete" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '" autocomplete="off" data-items="';
  input += items;
  input += '"/>';

  input += '<ul class="fg-autocomplete-list">';
  input += '</ul>';
  return input;
}

function generateTextarea(name,placeholder,currentVal){
  input = '';
  input += '<textarea name="';
  input += name;
  input += '" class="form-control" ';
  input += 'placeholder="';
  input += placeholder;
  input += '">';
  input += currentVal;
  input += '</textarea>';
  return input;
}

function generateRadio(name,labelList,valList,currentVal){
  labelList   = labelList.split(",");
  valList     = valList.split(",");
  //currentVal  = currentVal.split(",");

  input = '<div class="row"><div class="col-xs-12">';

  for(var i=0;i<valList.length;i++)
  {
    input += '<label><input type="radio" name="';
    input += name;
    input += '"value="';
    input += valList[i];
    input += '" ';
    if(valList[i] == currentVal)
    {
      input += ' checked="checked"';
    }
    input += '/> <span> ';
    input += labelList[i];
    input += '<span></label>';
  }

  input += '</div></div>';
  return input;
}

function generateCheckbox(name,labelList,valList,currentVal){
  labelList = labelList.split(",");
  valList   = valList.split(",");

  input = '<div class="row">';

  for(var i=0;i<valList.length;i++)
  {
    input += '<label><input type="checkbox" name="';
    input += name;
    input += '"value="';
    input += valList[i];
    input += '"';
    //if some currentVal contains a valList
    if(currentVal.indexOf(valList) > -1)
    {
      input += 'checked="checked"';
    }
    input += '/> <span> ';
    input += labelList[i];
    input += '<span></label>';
  }

  input += '</div>';
  return input;
}

function generateSelectOption(name,labelList,valList,currentVal){
  labelList = labelList.split(",");
  valList   = valList.split(",");

  input = '<select name="';
  input += name;
  input += '" class="form-control">';

  for(var i=0;i<valList.length;i++)
  {
    input += '<option value="';
    input += valList[i];
    input += '" ';
    if(valList[i] == currentVal)
    {
      input += ' selected="selected"';
    }
    input += '>';
    input += labelList[i];
    input += '</option>';
  }

  input += '</select>';
  return input;
}

function generateDate(name,currentVal){
  input = '';
  //Day Input
  input += '<div class="row">';
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_day';
  input += '" class="form-control" placeholder="Day" maxlength="2"/>';
  input += '</div>';

  //Month Input
  input += '<div class="six-twelfth">';
  input += '<select name="';
  input += name + '_month';
  input += '" class="form-control">';
  input += generateMonthOptions();
  input += '</select>';
  input += '</div>';

  //Year Input
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_year';
  input += '" class="form-control" placeholder="Year" maxlength="4"/>';
  input += '</div>';

  return input;
}

//Blurring Input Trigger

$(document).on('blur','.fg-validated',function(){
  //RULES: required,numeric,alpha,email,
  validationRules = $(this).data('validation');
  inputVal        = $(this).val();
  input           = $(this);

  validateForm(validationRules,inputVal,input);
});


//Submitting Form

$(document).on('submit','.fg-form',function(e){
  var form        = '#' + $(this).attr('id');
  var countError  = 0;
  $('.fg-form > .fg-input > .fg-validated').each(function(index,value){
    validationRules = $(this).data('validation');
    inputVal        = $(this).val();
    input           = $(this);

    var boolValidation = validateForm(validationRules,inputVal,input);
    if(boolValidation == false)
    {
      countError++;
    }
  });

  if(countError > 0)
  {
    return false;
  }
});

$(document).on('keyup','.fg-autocomplete',function(e){
  $(this).parent().find('.fg-autocomplete-list').show();
  var curr_val  = $(this).val();
  var ul        = $(this).parent().find('.fg-autocomplete-list');
  var limit     = 5;
  var offset    = 0;

  if(e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 9 && e.keyCode != 13)
  {
    ul.html('');
    var data_list = $(this).data('items');
    data_arr = data_list.split(',');
    if(curr_val != '')
    {
      for(var i = 0; i < data_arr.length; i++)
      {
        var lowerCase = data_arr[i].toLowerCase();
        var lowerVal  = curr_val.toLowerCase();

        if(lowerCase.indexOf(lowerVal) > -1)
        {
          var highlight     = '<span class="highlight">' + lowerVal + '</span>';
          var li            = lowerCase.replace(lowerVal,highlight);
          ul.append('<li data-current-row="0" data-position="middle">' + li + '</li>');

          offset++;
        }
        if(offset == limit) break;
      }

      $(this).parent().find('.fg-autocomplete-list').find('li:first-child').addClass('autocomplete-highlight').attr('data-current-row','1').attr('data-position','top');
      $(this).parent().find('.fg-autocomplete-list').find('li:last-child').attr('data-position','bottom');
    }
  }

  switch(e.keyCode){
    case 38: //UP
      //swap position of current row
      if($(this).parent().find('[data-current-row="1"]').attr('data-position') != "top")
      {
        $(this).parent().find('[data-current-row="1"]').prev().attr('data-current-row','TEMP');
        $(this).parent().find('[data-current-row="1"]').attr('data-current-row','0');
        $(this).parent().find('[data-current-row="TEMP"]').attr('data-current-row','1');
      }
      $(this).parent().find('li').removeClass('autocomplete-highlight');
      $(this).parent().find('[data-current-row="1"]').addClass('autocomplete-highlight');
      break;
    case 40: //DOWN
      //swap position of current row
      if($(this).parent().find('[data-current-row="1"]').attr('data-position') != "bottom")
      {
        $(this).parent().find('[data-current-row="1"]').next().attr('data-current-row','TEMP');
        $(this).parent().find('[data-current-row="1"]').attr('data-current-row','0');
        $(this).parent().find('[data-current-row="TEMP"]').attr('data-current-row','1');
      }

      $(this).parent().find('li').removeClass('autocomplete-highlight');
      $(this).parent().find('[data-current-row="1"]').addClass('autocomplete-highlight');
      break;
    case 9: //TAB KEY
      var content = $(this).parent().find('[data-current-row="1"]').html;
      content = content.replace('<span class="highlight">','');
      content = content.replace('</span>','');
      content = _.unescape(content);
      $(this).val(capitalizeEachWord(content));
      $('.fg-autocomplete-list').hide();
      break;
    case 13: //ENTER KEY
      var content = $(this).parent().find('[data-current-row="1"]').html();
      content = content.replace('<span class="highlight">','');
      content = content.replace('</span>','');
      content = _.unescape(content);
      $(this).val(capitalizeEachWord(content));
      $('.fg-autocomplete-list').hide();
      break;
  }

});

$(document).on('click','.fg-autocomplete-list > li',function(){
  var content = $(this).html();
  content = content.replace('<span class="highlight">','');
  content = content.replace('</span>','');
  content = _.unescape(content);
  $(this).parent().parent().find('input').val(capitalizeEachWord(content));
  $('.fg-autocomplete-list').hide();
});

//remove elements on click outside
$(document).on('click', function(event) {
  if (!$(event.target).closest('input').length) {
    if (!$(event.target).closest('.fg-autocomplete-list').length) {
      $('.fg-autocomplete-list').hide();
    }
  }
});

//add field elements on click
$(document).on('click','.fg-more-field', function(event) {
  var new_field = $(this).parent().find('.fg-input-container').html();
  $(this).before(new_field);
});

//iterate each input

$('.fg-form  > .fg-input').each(function(index,value){
  var inputIndex    = 'fg-input-' + index;
  var template      = '';
  var label         = $(this).data('label');
  var name          = $(this).data('name');
  var validation    = $(this).data('validation');
  var type          = $(this).data('type');
  var placeholder   = $(this).data('placeholder');
  var labelList     = $(this).data('item-label');
  var valList       = $(this).data('item-value');
  var items         = $(this).data('items');
  var currentVal    = $(this).data('current');
  var multiple    = $(this).data('multiple');

  if(typeof label !== 'undefined' && label != '')
  {
    template += '<label for="';
    template += inputIndex;
    template += '"><span class="uppercase form-label">';
    template += label;
    template += '</span></label>';
  }

  template += '<div class="fg-input-container">';
  template += generateInput(type,name,placeholder,labelList,valList,currentVal,items);
  template += '<span class="fg-error fg-error"></span>';
  template += '</div>';
  template += '';

  if(typeof multiple !== 'undefined' && multiple != '')
  {
    template += '<a class="fg-more-field"> ' + multiple + '</a>';
  }

  $(this).html(template);

  if(validation.indexOf('required') > -1)
  {
    $(this).find('.form-label').append('<span class="fg-asterisk"> *</span>');
  }

  var inputSelector = 'input';
  if(type == 'textarea')
  {
    inputSelector = 'textarea';
  }
  $(this).find(inputSelector).attr('id',inputIndex).addClass('fg-validated').attr('data-validation',validation);
});

$('.fg-form  > .fg-submit').each(function(index,value){

  var value = $(this).data('value');

  template = '';
  template += '<input type="submit" class="btn bold" value="';
  template += value;
  template += '" />';

  $(this).html(template);
});
