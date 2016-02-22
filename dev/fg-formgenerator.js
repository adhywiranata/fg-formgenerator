/*
=======================================
FG Form Generator
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

//iterate each input

$('.fg-form  > .fg-input').each(function(index,value){
  var inputIndex    = 'fg-input-' + index;
  var template      = '';
  var ids           = $(this).data('ids');
  var classes       = $(this).data('classes');
  var label         = $(this).data('label');
  var name          = $(this).data('name');
  var validation    = $(this).data('validation');
  var type          = $(this).data('type');
  var placeholder   = $(this).data('placeholder');
  var labelList     = $(this).data('item-label');
  var valList       = $(this).data('item-value');
  var items         = $(this).data('items');
  var currentVal    = $(this).data('current');
  var multiple      = $(this).data('multiple');

  var data = Array();
  data['inputIndex']  = inputIndex;
  data['ids']         = ids;
  data['classes']     = classes;
  data['label']       = label;
  data['type']        = type;
  data['name']        = name;
  data['placeholder'] = placeholder;
  data['validation']  = validation;
  data['labelList']   = labelList;
  data['valList']     =  valList;
  data['items']       = items;
  data['currentVal']  = currentVal;
  data['multiple']    =  multiple;

  var generator = new Generator(data);
  $(this).html(generator.input);

  if(validation.indexOf('required') > -1)
  {
    $(this).find('.form-label').append('<span class="fg-asterisk"> *</span>');
  }

  var inputSelector = 'input';
  if(type == 'textarea')
  {
    inputSelector = 'textarea';
  }

  if(typeof ids === 'undefined' || ids == '')
  {
    ids = '';
  }

  ids = inputIndex;
  $(this).find(inputSelector).attr('id',ids).addClass('fg-validated').attr('data-validation',validation);

});

$('.fg-form  > .fg-submit').each(function(index,value){

  var value = $(this).data('value');

  template = '';
  template += '<input type="submit" class="btn bold" value="';
  template += value;
  template += '" />';

  $(this).html(template);
});
