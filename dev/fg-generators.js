/*
======================================
          FG FIELD GENERATORS
======================================
*/

function Generator(data){
  this.ids          = data['ids'];
  this.classes      = data['classes'];
  this.inputIndex   = data['inputIndex'];
  this.label        = data['label'];
  this.type         = data['type'];
  this.name         = data['name'];
  this.placeholder  = data['placeholder'];
  this.labelList    = data['labelList'];
  this.valList      = data['valList'];
  this.currentVal   = data['currentVal'];
  this.items        = data['items'];
  this.multiple     = data['multiple'];
  this.input        = '';
  this.input += generateLabel(this.label,this.inputIndex);
  this.input += '<div class="fg-input-container">';

  if(typeof this.ids === 'undefined' || this.ids == '')
  {
    this.ids = '';
  }

  if(typeof this.classes === 'undefined' || this.classes == '')
  {
    this.classes = '';
  }

  switch(this.type)
  {
    case "text":
      this.input += generateText(this.ids,this.classes,this.name,this.placeholder,this.currentVal);
      break;
    case "password":
      this.input += generatePassword(this.ids,this.classes,this.name,this.placeholder,this.currentVal);
      break;
    case "text-autocomplete":
      this.input += generateAutocompleteText(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.items);
      break;
    case "text-autocomplete":
      this.input += generateAutocompleteText(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.items);
      break;
    case "textarea":
      this.input += generateTextarea(this.ids,this.classes,this.name,this.placeholder,this.currentVal);
      break;
    case "radio":
      this.input += generateRadio(this.ids,this.classes,this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "checkbox":
      this.input += generateCheckbox(this.ids,this.classes,this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "select-option":
      this.input += generateSelectOption(this.ids,this.classes,this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "combobox":
      this.input += generateSelectOption(this.ids,this.classes,this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "date":
      this.input += generateDate(this.ids,this.classes,this.name,this.currentVal);
      break;
  }

  this.input += '<span class="fg-error"></span>';
  this.input += '</div>';
  this.input += '';

  if(typeof this.multiple !== 'undefined' && this.multiple != '')
  {
    this.input += '<a class="fg-more-field"> ' + this.multiple + '</a>';
  }

}

function generateLabel(label,inputIndex){
  template = '';
  if(typeof label !== 'undefined' && label != '')
  {
    template += '<label for="';
    template += inputIndex;
    template += '"><span class="uppercase form-label">';
    template += label;
    template += '</span></label>';
  }

  return template;
}

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

function generateText(ids,classes,name,placeholder,currentVal){
  input = '';
  input += '<input type="text" name="';
  input += name;
  input += '" class="';
  input += classes;
  input += '" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"/>';
  return input;
}

function generatePassword(ids,classes,name,placeholder,currentVal){
  input = '';
  input += '<input type="password" name="';
  input += name;
  input += '" class="';
  input += classes;
  input += '" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"/>';
  return input;
}

function generateAutocompleteText(ids,classes,name,placeholder,currentVal,items){
  input = '';
  input += '<input type="text" name="';
  input += name;
  input += '" class="';
  input += classes;
  input += ' fg-autocomplete" ';
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

function generateTextarea(ids,classes,name,placeholder,currentVal){
  input = '';
  input += '<textarea name="';
  input += name;
  input += '" class="';
  input += classes;
  input += '" ';
  input += 'placeholder="';
  input += placeholder;
  input += '">';
  input += currentVal;
  input += '</textarea>';
  return input;
}

function generateRadio(ids,classes,name,labelList,valList,currentVal){
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

function generateCheckbox(ids,classes,name,labelList,valList,currentVal){
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

function generateSelectOption(ids,classes,name,labelList,valList,currentVal){
  labelList = labelList.split(",");
  valList   = valList.split(",");

  input = '<select name="';
  input += name;
  input += '" class="';
  input += classes;
  input += '">';

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

function generateDate(ids,classes,name,currentVal){
  input = '';
  //Day Input
  input += '<div class="row">';
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_day';
  input += '" class="';
  input += classes;
  input += '" placeholder="Day" maxlength="2"/>';
  input += '</div>';

  //Month Input
  input += '<div class="six-twelfth">';
  input += '<select name="';
  input += name + '_month';
  input += '" class="';
  input += classes;
  input += '">';
  input += generateMonthOptions();
  input += '</select>';
  input += '</div>';

  //Year Input
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_year';
  input += '" class="';
  input += classes;
  input += '" placeholder="Year" maxlength="4"/>';
  input += '</div>';

  return input;
}

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