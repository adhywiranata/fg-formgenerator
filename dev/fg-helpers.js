/* Helper Functions */
function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function callAjax(selector,url){

  var res = null;
  $.ajax({
    url: url,
    success:function(data)
    {
      objJSON = JSON.parse(data);

      var data_string = '';

      for (var i = 0, len = objJSON.length; i < len; ++i) {
         var elem = objJSON[i];
         data_string += elem.skill_name + ',';
      }

      selector.attr('data-items',data_string);
    }
  });

  return res;
}

function pushAutoComplete(selector,curr_val,data_string,ul){

  var limit     = 500;
  var offset    = 0;

  if(ul == '')
  {
    var ul = selector.parent().find('.fg-autocomplete-list');
  }

  if(data_string == '')
  {
    var data_list = selector.attr('data-items');
    data_arr = data_list.split(',');
  }
  else
  {
    data_arr = data_string.split(',');
  }

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

  selector.parent().find('.fg-autocomplete-list').find('li:first-child').addClass('autocomplete-highlight').attr('data-current-row','1').attr('data-position','top');
  selector.parent().find('.fg-autocomplete-list').find('li:last-child').attr('data-position','bottom');

}
