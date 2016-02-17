#FG FormGenerator

FG FormGenerator is a simple, yet powerful HTML Form Generator.
This plugin requires Jquery.js and Underscore.js.

##Installation

via Bower
```bash
bower install https://github.com/adhywiranata/fg-formgenerator.git
```

or download the Js and CSS files manually and use these script to use them
```bash
<script src="dist/fg-formgenerator.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/fg-formgenerator.css">
```
**Note:** this plugin relies on Jquery.js and Underscore.js. Don't forget to use them
before the fg-formgenerator js script.

##Usage

Define the container form:

```bash
<form class="fg-form">
  ...
</form>
```

Create the most basic form field inside the form tag:

```bash
<div class="fg-input"
  data-type="text"
  data-label="Text Field"
  data-name="txt_1"
  data-placeholder="insert the text field">
</div>
```

###Field Types

data-type = text|combobox|select-option|radio|checkbox|date|autocomplete-text



text: a normal text input


combobox (alias: select-option): a normal select-option input


radio: normal radio button input


checkbox: normal checkbox input


date: three fields of Day, Months, and Year. Month field configuration is highly customizable


autocomplete-text: text input with autocomplete on keyup feature

##Contributing to the Project

yep, this plugin is far from good, so any contribution would be appreciated!
Simply fork this repo, then create a pull request. Lets save our coffee-to-code-converter
brothers from writing the same form input over and over again.
