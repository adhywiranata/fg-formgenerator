#FG FormGenerator

FG FormGenerator is a simple, yet powerful HTML Form Generator.
Easier to build than your HTML form boilerplates, and more flexible than pure JS plugins. This plugin requires Jquery.js and Underscore.js.

##Installation

via Bower
```bash
bower install https://github.com/adhywiranata/fg-formgenerator.git
```

via NPM
```bash
npm install https://github.com/adhywiranata/fg-formgenerator.git
```


or download the JS and CSS files manually and use these script to use them
```bash
<script src="dist/fg-formgenerator.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/fg-formgenerator.min.css">
```
**Note:** this plugin relies on Jquery.js and Underscore.js. Don't forget to use them before the fg-formgenerator js script.

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
##Data-Attributes

This plugin make use of HTML5 Data-attributes.
Each attribute contributed to the input element or functionality.



data-text: define the input types. Further explanation is on the Field Types section.

```bash
  data-type="text|combobox|select-option|radio|checkbox|date|autocomplete-text"
```


data-label: define the label text of the input. Empty label is okay.

```bash
  data-label="this is a label"
```


data-placeholder: define the input placeholder. Cannot be used for combobox,
radio buttons, and checkboxes

```bash
  data-placeholder="Please input your first name"
```


data-name: define the input name. For radio/checkbox inputs, a same name will
be applied.

```bash
  data-name="first_name"
```


data-item-label: input label for comboboxes, radios, and checkboxes. Uses
comma separator for each labels.

```bash
  data-item-label="male,female,others"
```


data-item-value: input value for comboboxes, radios, and checkboxes. Uses
comma separator for each values. The number of elements in these values
must be the same number as the labels.

```bash
  data-item-label="M,F,O"
```


data-current: default value of the input. On comboboxes/radios/checkboxes,
it will automatically select the one(s) with the same data-item-value as
the value of data-current, NOT the data-item-label.

```bash
  data-current="Prakoso, Muljono, Amidjojo"
```

data-classes: define the HTML classes applied the input. Each classes is separated by spaces.

```bash
  data-classes="input-form input-select"
```

data-items: ONLY for Autocomplete-text. List out all items where the
autocomplete take values from. Uses comma separator for each values.

```bash
  data-items="Keraton, Keris, Blankon, Kaos, Andong"
```


data-validation: types of input validations. Validation types are listed on
the Validation section. Uses comma separator. Validation error will be  
prompted on input blur or form submit.

```bash
  data-validation="required,alpha"
```


data-multiple: generate a link for a field which can be inputted multiple times.
Value of this attribute refers to the link value.

```bash
  data-multiple="+ Add New Field"
```


###Field Types

data-type = text|combobox|select-option|radio|checkbox|date|autocomplete-text



text: a normal text input


combobox (alias: select-option): a normal select-option input


radio: normal radio button input


checkbox: normal checkbox input


date: three fields of Day, Months, and Year. Month field configuration is highly customizable


autocomplete-text: text input with autocomplete on keyup feature


###Validations

required: the input must be filled.

alpha: the input must be alphabet.

numeric: the input must be a numberic.

email: the input must be in a valid email format.

##To-Dos

There are several features planned on the next release, such as:

1. data-func to call user-defined javascript functions.
2. data-ajax for ajax call during the input blur or keyups.
3. More input validations.
4. Customizable error messages.
5. Travis CI integration.
6. Test cases using PhantomJs.
7. rewrite these into ES6!

##Contributing to the Project

Since the test cases haven't been written yet, I might overlooked some bugs,
so if by any chance you got one, please add a new issue. I'll be working on it ASAP.


yep, this plugin is far from good, so any contribution would be appreciated!
Simply fork this repo, then create a pull request. Lets save our coffee-to-code-converter
brothers from writing the same form input over and over again.
