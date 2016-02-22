/*
======================================
          FG FIELD GENERATORS
======================================
*/

function Generator(data){
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
  console.log(generateLabel(this.label,this.inputIndex));
  this.input += generateLabel(this.label,this.inputIndex);
  this.input += '<div class="fg-input-container">';

  switch(this.type)
  {
    case "text":
      this.input += generateText(this.name,this.placeholder,this.currentVal);
      break;
    case "password":
      this.input += generatePassword(this.name,this.placeholder,this.currentVal);
      break;
    case "text-autocomplete":
      this.input += generateAutocompleteText(this.name,this.placeholder,this.currentVal,this.items);
      break;
    case "text-autocomplete":
      this.input += generateAutocompleteText(this.name,this.placeholder,this.currentVal,this.items);
      break;
    case "textarea":
      this.input += generateTextarea(this.name,this.placeholder,this.currentVal);
      break;
    case "radio":
      this.input += generateRadio(this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "checkbox":
      this.input += generateCheckbox(this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "select-option":
      this.input += generateSelectOption(this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "combobox":
      this.input += generateSelectOption(this.name,this.labelList,this.valList,this.currentVal);
      break;
    case "date":
      this.input += generateDate(this.name,this.currentVal);
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

  /*
  if(this.type == 'text')
  {
    return generateText(name,placeholder,currentVal);
  }
  if(this.type == 'password')
  {
    return generatePassword(name,placeholder,currentVal);
  }
  if(this.type == 'text-autocomplete')
  {
    return generateAutocompleteText(name,placeholder,currentVal,items);
  }
  if(this.type == 'textarea')
  {
    return generateTextarea(name,placeholder,currentVal);
  }
  if(this.type == 'radio')
  {
    return generateRadio(name,labelList,valList,currentVal);
  }
  if(this.type == 'checkbox')
  {
    return generateCheckbox(name,labelList,valList,currentVal);
  }
  if(this.type == 'select-option' || this.type == 'combobox')
  {
    return generateSelectOption(name,labelList,valList,currentVal);
  }
  if(this.type == 'date')
  {
    return generateDate(name,currentVal);
  }*/

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

/*
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
*/

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
