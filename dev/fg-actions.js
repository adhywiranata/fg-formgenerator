//Blurring Input Trigger

$(document).on('blur','.fg-validated',function(){
  //RULES: required,numeric,alpha,email,
  validationRules = $(this).data('validation');
  inputVal        = $(this).val();
  input           = $(this);

  validateForm(validationRules,inputVal,input);
});

/*
ACTION: AUTOCOMPLETE FIELD
*/

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

/*
ACTION: MULTIPLE FIELDS
*/
//add field elements on click
$(document).on('click','.fg-more-field', function(event) {
  var new_field = '';
  new_field += '<div class="fg-input-container fg-input-multipler">';
  new_field += '<div class="one-twelfth">&nbsp;';

  new_field += '<div class="fg-remove-field"><span>x</span></div>';
  new_field += '</div>';
  new_field += '<div class="eleven-twelfth">';
  new_field += $(this).parent().find('.fg-input-container').html();
  new_field += '</div>';
  new_field += '</div>';
  $(this).before(new_field);
});

function eachMultipler(multipler, remove){
  var data = '';
  is_repetition = multipler.parent().parent().find('.fg-input-multipler-hidden').val();

  //IF is_repetition FOUND, then it is NOT a repetition. if it is undefined, it is the repetition.
  var mult_parent = multipler.parent().parent();
  if(typeof is_repetition == 'undefined')
  {
    mult_parent = multipler.parent().parent().parent();
  }
  if(remove == 1)
  {
    mult_hidden = mult_parent.find('.fg-input-container-hidden');
    multipler.parent().parent().remove();
    mult_parent = mult_hidden.parent();
  }

  mult_parent.find('.fg-input-multipler input').each(function(index,elem){
    data += $(elem).val() + '||';
  });

  mult_parent.find('.fg-input-multipler-hidden').val(data);
  return data;
}

$(document).on('blur','.fg-input-multipler input',function(){

  //re select each multipler fields inputs
  var data = eachMultipler( $(this) );

  curr_val = $(this).parent().parent().find('.fg-input-multipler-hidden').val();

  if(typeof curr_val == 'undefined')
  {
    curr_val = $(this).parent().parent().parent().find('.fg-input-multipler-hidden').val();
    $(this).parent().parent().parent().find('.fg-input-multipler-hidden').val(data);
  }
  else{
    $(this).parent().parent().find('.fg-input-multipler-hidden').val(data);
  }
});

$(document).on('click','.fg-remove-field',function(){
  var selector = $(this).parent().parent().find('input');
  var data = eachMultipler( selector,1 ) //selector, remove TRUE
});

/*
ACTION: MULTIPLE CHIP FIELDS
*/
//add field elements on click
$(document).on('click','.fg-more-chip', function(event) {
  var fg_input = $(this).parent().find('.fg-input-container').find('input');
  var chip = fg_input.val();

  var fg_hidden = $(this).parent().parent().find('.fg-input-container-hidden').find('input');
  var currVal = fg_hidden.val();
  fg_hidden.val(currVal + chip + '|||');
  fg_input.val('');
  chip = '<div class="fg-chip" data-value="' + chip + '">' + chip + '<span class="fg-remove-chip">X</span><div>';
  $(this).parent().find('.fg-chip-list').append(chip);

});

$(document).on('click','.fg-remove-chip',function(){
  var chip = $(this).parent();
  var erased = chip.data('value') + '|||';

  var fg_hidden = chip.parent().parent().find('.fg-input-container-hidden').find('input');
  var current = fg_hidden.val();
  fg_hidden.val(current.replace(erased,''));
  chip.remove();
});

/*
ACTION: DATE FIELD
*/
function eachDate(selector)
{
  var dateParent = selector.parent().parent();
  var hiddenDate = selector.parent().parent().find('.fg-date-hidden');
  var d  = dateParent.find('.fg-date-d').val();
  var mo = dateParent.find('.fg-date-m').find('option:selected').val();
  var yr = dateParent.find('.fg-date-y').val();
  var err = '';
  if( d == '' && mo == '00' && yr == ''){
    //SKIP INVALID DATE FORMAT
    err = '';
  }else{
    if(d == '' || parseInt(d) < 1 || parseInt(d) > 31){
      err = 'invalid date';
    }
    else if(mo == '00'){
      err = 'invalid date';
    }
    else if(yr == '' || yr.length != 4){
      err = 'invalid date';
    }
    else{
      err = '';
    }
  }
  dateParent.find('.fg-error').html(err);
  if(err == '' && mo != '00')
  {
    hiddenDate.val(yr + '-' + mo + '-' + d);
  }
  else
  {
    hiddenDate.val('');
  }
}

$(document).on('blur','.fg-date-d',function(){
  eachDate( $(this) );
});

$(document).on('blur','.fg-date-m',function(){
  eachDate( $(this) );
});

$(document).on('blur','.fg-date-y',function(){
  eachDate( $(this) );
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

  if(e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 9 && e.keyCode != 13)
  {
    ul.html('');

    if(curr_val != '')
    {
      var data_arr = new Array();

      var get_ajax = $(this).data('get-ajax');

      if(get_ajax != 'undefined' && get_ajax != '')
      {

        $.ajax({
          url: get_ajax + curr_val,
          success:function(data)
          {
            objJSON = JSON.parse(data);

            var data_string = '';

            for (var i = 0, len = objJSON.length; i < len; ++i) {
               var elem = objJSON[i];
               data_string += elem.skill_name + ',';
            }

            pushAutoComplete($(this),curr_val, data_string,ul);
          }
        });

        //callAjax($(this),"http://localhost/cektraining/public/getautocompletedata/skills/skill_name/" + curr_val)
      }
      else
      {
        pushAutoComplete($(this),curr_val,'',ul);
      }
    }
    else
    {

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

$('.fg-form .fg-input').each(function(index,value){
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
  var multipleChip  = $(this).data('multiple-chip');
  var getAjax       = $(this).data('get-ajax');

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
  data['multipleChip']=  multipleChip;
  data['getAjax']     =  getAjax;

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
