/*
======================================
          FG FIELD GENERATORS
======================================
*/

function Generator(data){
  this.ids            = data['ids'];
  this.classes        = data['classes'];
  this.inputIndex     = data['inputIndex'];
  this.label          = data['label'];
  this.type           = data['type'];
  this.name           = data['name'];
  this.placeholder    = data['placeholder'];
  this.labelList      = data['labelList'];
  this.valList        = data['valList'];
  this.currentVal     = data['currentVal'];
  this.items          = data['items'];
  this.multiple       = data['multiple'];
  this.multipleChip   = data['multipleChip'];
  this.getAjax        = data['getAjax'];
  this.getAjaxColumn  = data['getAjaxColumn'];
  this.input          = '';
  this.multipleImage  = false;
  this.input += generateLabel(this.label,this.inputIndex);

  var multi_class = ''; //for multiplicity purpose

  if(typeof this.multiple !== 'undefined' && this.multiple != '')
  {
    if(this.type == 'file' || this.type == 'image')
    {
      this.multipleImage  = true;
    }
    else
    {
      this.input += '<div class="fg-input-container-hidden">';
      this.input += '<input type="hidden" class="fg-input-multipler-hidden" name="' + this.name + '">';
      this.input += '</div>';
      multi_class = 'fg-input-multipler';
    }
  }

  //Check if multiple chip is used
  if(typeof this.multipleChip !== 'undefined' && this.multipleChip != '')
  {
    if(this.type == 'file' || this.type == 'image')
    {
      this.multipleImage  = true;
    }
    else
    {
      this.input += '<div class="fg-input-container-hidden">';
      this.input += '<input type="hidden" class="fg-input-multipler-hidden" name="' + this.name + '">';
      this.input += '</div>';
    }
  }

  this.input += '<div class="fg-input-container ' + multi_class + '">';

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
    case "file":
      this.input += generateFile(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.multipleImage);
      break;
    case "image":
      this.input += generateImage(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.multipleImage);
      break;
    case "text-autocomplete":
      this.input += generateAutocompleteText(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.items, this.getAjax, this.getAjaxColumn);
      break;
    case "text-autocomplete-long":
      this.input += generateAutocompleteLongText(this.ids,this.classes,this.name,this.placeholder,this.currentVal,this.items, this.getAjax, this.getAjaxColumn);
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

  if(typeof this.multiple !== 'undefined' && this.multiple != '' && this.type != 'file' && this.type != 'image')
  {
    this.input += '<a class="fg-more-field"> ' + this.multiple + '</a>';
  }

  if(typeof this.multipleChip !== 'undefined' && this.multipleChip != '' && this.type != 'file' && this.type != 'image')
  {
    this.input += '<div class="fg-row fg-chip-list"></div>';
    this.input += '<a class="fg-more-chip"> ' + this.multipleChip + '</a>';
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

function generateMonthOptions(m){

  var selected = 13;
  selected = parseInt(m);

  var months = [
    '00','01','02','03','04',
    '05','06','07','08',
    '09','10','11','12'];
  var monthsLabel = [
    '-- Input Month --','January','February','March',
    'April','May','June','July',
    'August','September','October',
    'November','December'];
  option = '';
  for(var i=0;i<13;i++)
  {
    option += '<option value="' + months[i] + '" ';
    if(i == selected)
    {
      option += 'selected="selected"';
    }
    option += '>';
    option += monthsLabel[i] + '</option>';
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

function generateFile(ids,classes,name,placeholder,currentVal,multipleImage){
  input = '';
  input += '<input type="file" name="';
  input += name;
  input += '" class="';
  input += classes;
  input += '" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"';
  if(multipleImage)
  {
    input += ' multiple=multiple ';
  }
  input += '/>';
  return input;
}

function generateImage(ids,classes,name,placeholder,currentVal,multipleImage){
  input = '';
  input += '<input type="file" name="';
  input += name;
  input += '" class="';
  input += classes;
  input += ' fg-input-image';
  input += '" ';
  input += 'placeholder="';
  input += placeholder;
  input += '" value="';
  input += currentVal;
  input += '"';
  if(multipleImage)
  {
    input += ' multiple=multiple ';
  }
  input += '/>';
  input += '<br/>';
  input += '<div class="fg-image-previews">';
  input += '</div>';
  return input;
}

function generateAutocompleteText(ids,classes,name,placeholder,currentVal,items,getAjax, getAjaxColumn){
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
  input += '" data-get-ajax="';
  input += getAjax;
  input += '" data-get-ajax-column="';
  input += getAjaxColumn;
  input += '" data-json="';
  input += '"/>';

  input += '<ul class="fg-autocomplete-list">';
  input += '</ul>';
  return input;
}

function generateAutocompleteLongText(ids,classes,name,placeholder,currentVal,items, getAjax, getAjaxColumn){
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
  input += '" data-get-ajax="';
  input += getAjax;
  input += '" data-get-ajax-column="';
  input += getAjaxColumn;
  input += '" data-json="';
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

  input = '<div class="fg-row"><div class="col-xs-12">';

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

  input = '<div class="fg-row">';

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

  var y = currentVal.substring(0,4);
  var m = currentVal.substring(5,7);
  var d = currentVal.substring(8,10);
  input = '';
  //Day Input
  input += '<div class="fg-row">';
  input += '<input type="hidden" name="';
  input += name;
  input += '" class="fg-date-hidden" value="';
  input += '"/>';
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_day';
  input += '" class="';
  input += classes;
  input += ' fg-date-d" placeholder="Day" maxlength="2" value="';
  input += y;
  input += '" />';
  input += '</div>';

  //Month Input
  input += '<div class="six-twelfth">';
  input += '<select name="';
  input += name + '_month';
  input += '" class="';
  input += classes;
  input += ' fg-date-m">';
  input += generateMonthOptions(m);
  input += '</select>';
  input += '</div>';

  //Year Input
  input += '<div class="three-twelfth">';
  input += '<input type="text" name="';
  input += name + '_year';
  input += '" class="';
  input += classes;
  input += ' fg-date-y" placeholder="Year" maxlength="4" value="';
  input += d;
  input += '"/>';
  input += '</div>';

  return input;
}
