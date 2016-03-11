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

/* IMAGE UPLOAD PREVIEWS */
function readURL(file,curr_image) {

    var reader = new FileReader();
    reader.onload = function (e, loop) {
      $(curr_image).attr('src', e.target.result);
    }
    reader.readAsDataURL(file);
}

$(document).on('change','.fg-input-image',function () {
    var current_elem = $(this);
    current_elem.parent().find('.fg-image-previews').html('');
    var image_count = this.files.length;
    var image_elem = '';
    var loop = 0;
    for(loop=0;loop<image_count;loop++)
    {
      //data-image="key-index" key:which input, index:image index
      image_elem = '<img data-image="99-'+loop+'" class="fg-image-upload-preview" src="" alt=""/>';
      current_elem.parent().find('.fg-image-previews').append(image_elem);
      var curr_image = current_elem.parent().find('[data-image="'+ 99 +'-'+ loop +'"]');
      readURL(this.files[loop],curr_image);
    }
});
