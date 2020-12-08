;/* js/util.js */
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*
* This Source Code Form is "Incompatible With Secondary Licenses", as
* defined by the Mozilla Public License, v. 2.0.
*/
/**
* Locate where an element is on the page, x-wise.
*
* @param  obj Element of which location to return.
* @return     Current position of the element relative to the left of the
*             page window. Measured in pixels.
*/
function bz_findPosX(obj)
{
var curleft = 0;
if (obj.offsetParent) {
while (obj) {
curleft += obj.offsetLeft;
obj = obj.offsetParent;
}
}
else if (obj.x) {
curleft += obj.x;
}
return curleft;
}
/**
* Locate where an element is on the page, y-wise.
*
* @param  obj Element of which location to return.
* @return     Current position of the element relative to the top of the
*             page window. Measured in pixels.
*/
function bz_findPosY(obj)
{
var curtop = 0;
if (obj.offsetParent) {
while (obj) {
curtop += obj.offsetTop;
obj = obj.offsetParent;
}
}
else if (obj.y) {
curtop += obj.y;
}
return curtop;
}
/**
* Get the full height of an element, even if it's larger than the browser
* window.
*
* @param  fromObj Element of which height to return.
* @return         Current height of the element. Measured in pixels.
*/
function bz_getFullHeight(fromObj)
{
var scrollY;
if (fromObj.scrollHeight > fromObj.offsetHeight) {
scrollY = fromObj.scrollHeight;
}  else {
scrollY = fromObj.offsetHeight;
}
return scrollY;
}
/**
* Get the full width of an element, even if it's larger than the browser
* window.
*
* @param  fromObj Element of which width to return.
* @return         Current width of the element. Measured in pixels.
*/
function bz_getFullWidth(fromObj)
{
var scrollX;
if (fromObj.scrollWidth > fromObj.offsetWidth) {
scrollX = fromObj.scrollWidth;
}  else {
scrollX = fromObj.offsetWidth;
}
return scrollX;
}
/**
* Causes a block to appear directly underneath another block,
* overlaying anything below it.
*
* @param item   The block that you want to move.
* @param parent The block that it goes on top of.
* @return nothing
*/
function bz_overlayBelow(item, parent) {
var elemY = bz_findPosY(parent);
var elemX = bz_findPosX(parent);
var elemH = parent.offsetHeight;
item.style.position = 'absolute';
item.style.left = elemX + "px";
item.style.top = elemY + elemH + 1 + "px";
}
/**
* Checks if a specified value is in the specified array.
*
* @param  aArray Array to search for the value.
* @param  aValue Value to search from the array.
* @return        Boolean; true if value is found in the array and false if not.
*/
function bz_isValueInArray(aArray, aValue)
{
for (var run = 0, len = aArray.length ; run < len; run++) {
if (aArray[run] == aValue) {
return true;
}
}
return false;
}
/**
* Checks if a specified value is in the specified array by performing a
* case-insensitive comparison.
*
* @param  aArray Array to search for the value.
* @param  aValue Value to search from the array.
* @return        Boolean; true if value is found in the array and false if not.
*/
function bz_isValueInArrayIgnoreCase(aArray, aValue)
{
var re = new RegExp(aValue.replace(/([^A-Za-z0-9])/g, "\\$1"), 'i');
for (var run = 0, len = aArray.length ; run < len; run++) {
if (aArray[run].match(re)) {
return true;
}
}
return false;
}
/**
* Create wanted options in a select form control.
*
* @param  aSelect        Select form control to manipulate.
* @param  aValue         Value attribute of the new option element.
* @param  aTextValue     Value of a text node appended to the new option
*                        element.
* @return                Created option element.
*/
function bz_createOptionInSelect(aSelect, aTextValue, aValue) {
var myOption = new Option(aTextValue, aValue);
aSelect.options[aSelect.length] = myOption;
return myOption;
}
/**
* Clears all options from a select form control.
*
* @param  aSelect    Select form control of which options to clear.
*/
function bz_clearOptions(aSelect) {
var length = aSelect.options.length;
for (var i = 0; i < length; i++) {
aSelect.removeChild(aSelect.options[0]);
}
}
/**
* Takes an array and moves all the values to an select.
*
* @param aSelect         Select form control to populate. Will be cleared
*                        before array values are created in it.
* @param aArray          Array with values to populate select with.
*/
function bz_populateSelectFromArray(aSelect, aArray) {
bz_clearOptions(aSelect);
for (var i = 0; i < aArray.length; i++) {
var item = aArray[i];
bz_createOptionInSelect(aSelect, item[1], item[0]);
}
}
/**
* Tells you whether or not a particular value is selected in a select,
* whether it's a multi-select or a single-select. The check is
* case-sensitive.
*
* @param aSelect        The select you're checking.
* @param aValue         The value that you want to know about.
*/
function bz_valueSelected(aSelect, aValue) {
var options = aSelect.options;
for (var i = 0; i < options.length; i++) {
if (options[i].selected && options[i].value == aValue) {
return true;
}
}
return false;
}
/**
* Returns all Option elements that are selected in a <select>,
* as an array. Returns an empty array if nothing is selected.
*
* @param aSelect The select you want the selected values of.
*/
function bz_selectedOptions(aSelect) {
if (aSelect.selectedOptions) {
return aSelect.selectedOptions;
}
var start_at = aSelect.selectedIndex;
if (start_at == -1) return [];
var first_selected =  aSelect.options[start_at];
if (!aSelect.multiple) return first_selected;
var selected = [first_selected];
var options_length = aSelect.options.length;
for (var i = start_at + 1; i < options_length; i++) {
var this_option = aSelect.options[i];
if (this_option.selected) selected.push(this_option);
}
return selected;
}
/**
* Returns all Option elements that have the "selected" attribute, as an array.
* Returns an empty array if nothing is selected.
*
* @param aSelect The select you want the pre-selected values of.
*/
function bz_preselectedOptions(aSelect) {
var options = aSelect.options;
var selected = new Array();
for (var i = 0, l = options.length; i < l; i++) {
var attributes = options[i].attributes;
for (var j = 0, m = attributes.length; j < m; j++) {
if (attributes[j].name == 'selected') {
if (!aSelect.multiple) return options[i];
selected.push(options[i]);
}
}
}
return selected;
}
/**
* Tells you where (what index) in a <select> a particular option is.
* Returns -1 if the value is not in the <select>
*
* @param aSelect       The select you're checking.
* @param aValue        The value you want to know the index of.
*/
function bz_optionIndex(aSelect, aValue) {
for (var i = 0; i < aSelect.options.length; i++) {
if (aSelect.options[i].value == aValue) {
return i;
}
}
return -1;
}
/**
* Used to fire an event programmatically.
*
* @param anElement      The element you want to fire the event of.
* @param anEvent        The name of the event you want to fire,
*                       without the word "on" in front of it.
*/
function bz_fireEvent(anElement, anEvent) {
if (document.createEvent) {
var evt = document.createEvent("HTMLEvents");
evt.initEvent(anEvent, true, true);
return !anElement.dispatchEvent(evt);
} else {
var evt = document.createEventObject();
return anElement.fireEvent('on' + anEvent, evt);
}
}
/**
* Adds a CSS class to an element if it doesn't have it. Removes the
* CSS class from the element if the element does have the class.
*
* Requires YUI's Dom library.
*
* @param anElement  The element to toggle the class on
* @param aClass     The name of the CSS class to toggle.
*/
function bz_toggleClass(anElement, aClass) {
if (YAHOO.util.Dom.hasClass(anElement, aClass)) {
YAHOO.util.Dom.removeClass(anElement, aClass);
}
else {
YAHOO.util.Dom.addClass(anElement, aClass);
}
}
;/* js/field.js */
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*
* This Source Code Form is "Incompatible With Secondary Licenses", as
* defined by the Mozilla Public License, v. 2.0.
*/
/* This library assumes that the needed YUI libraries have been loaded
already. */
var bz_no_validate_enter_bug = false;
function validateEnterBug(theform, always_private) {
if (bz_no_validate_enter_bug) {
bz_no_validate_enter_bug = false;
return true;
}
var component = theform.component;
var short_desc = theform.short_desc;
var version = theform.version;
var bug_status = theform.bug_status;
var description = theform.comment;
var attach_data = theform.data;
var attach_desc = theform.description;
var current_errors = YAHOO.util.Dom.getElementsByClassName(
'validation_error_text', null, theform);
for (var i = 0; i < current_errors.length; i++) {
current_errors[i].parentNode.removeChild(current_errors[i]);
}
var current_error_fields = YAHOO.util.Dom.getElementsByClassName(
'validation_error_field', null, theform);
for (var i = 0; i < current_error_fields.length; i++) {
var field = current_error_fields[i];
YAHOO.util.Dom.removeClass(field, 'validation_error_field');
}
var focus_me;
var focus = 1;
if (attach_data && attach_data.value && YAHOO.lang.trim(attach_desc.value) == '') {
_errorFor(attach_desc, 'attach_desc');
focus_me = attach_desc;
}
if (bug_status && typeof(status_comment_required) != 'undefined') {
var check_description = status_comment_required[bug_status.value];
if (check_description && YAHOO.lang.trim(description.value) == '') {
_errorFor(description, 'description');
focus_me = description;
}
}
if (YAHOO.lang.trim(short_desc.value) == '') {
_errorFor(short_desc);
focus_me = short_desc;
}
if (!$(version).selectize()[0].selectize.getValue()) {
_errorFor(version, 'version', 1);
focus_me = version;
focus = 0;
}
if (typeof(rh_check_sub_components) === 'function') {
var ret = rh_check_sub_components();
if (ret){
focus_me = ret;
focus = 0;
}
}
if (!$(component).selectize()[0].selectize.getValue()) {
_errorFor(component, 'component', 1);
focus_me = component;
focus = 0;
}
if(always_private && $('#groups').selectize()[0].selectize.getValue().length == 0) {
_errorFor(theform.groups, 'group', 1);
focus_me = $('#groups');
focus = 0;
}
if (focus_me) {
if(focus) focus_me.focus();
return false;
}
return true;
}
function _errorFor(field, name, scroll) {
if (!name) name = field.id;
var string_name = name + '_required';
var error_text = BUGZILLA.string[string_name];
var new_node = document.createElement('div');
YAHOO.util.Dom.addClass(new_node, 'validation_error_text');
new_node.innerHTML = error_text;
YAHOO.util.Dom.insertAfter(new_node, field);
YAHOO.util.Dom.addClass(field, 'validation_error_field');
if(scroll) new_node.scrollIntoView();
}
/* This function is never to be called directly, but only indirectly
* using template/en/default/global/calendar.js.tmpl, so that localization
* works. For the same reason, if you modify this function's parameter list,
* you need to modify the documentation in said template as well. */
function createCalendar(name, start_weekday, months_long, weekdays_short) {
var cal = new YAHOO.widget.Calendar('calendar_' + name,
'con_calendar_' + name,
{ START_WEEKDAY:  start_weekday,
MONTHS_LONG:    months_long,
WEEKDAYS_SHORT: weekdays_short
});
YAHOO.bugzilla['calendar_' + name] = cal;
var field = document.getElementById(name);
cal.selectEvent.subscribe(setFieldFromCalendar, field, false);
updateCalendarFromField(field);
cal.render();
}
/* The onclick handlers for the button that shows the calendar. */
function showCalendar(field_name) {
var calendar  = YAHOO.bugzilla["calendar_" + field_name];
var field     = document.getElementById(field_name);
var button    = document.getElementById('button_calendar_' + field_name);
bz_overlayBelow(calendar.oDomContainer, field);
calendar.show();
button.onclick = function() { hideCalendar(field_name); };
calendar.bz_myBodyCloser = function(event) {
var container = this.oDomContainer;
var target    = YAHOO.util.Event.getTarget(event);
if (target != container && target != button
&& !YAHOO.util.Dom.isAncestor(container, target))
{
hideCalendar(field_name);
}
};
YAHOO.util.Event.addListener(document.body, 'click',
calendar.bz_myBodyCloser, calendar, true);
calendar.bz_escCal = function (event) {
var key = YAHOO.util.Event.getCharCode(event);
if (key == 27) {
hideCalendar(field_name);
}
};
YAHOO.util.Event.addListener(document.body, 'keydown', calendar.bz_escCal);
}
function hideCalendar(field_name) {
var cal = YAHOO.bugzilla["calendar_" + field_name];
cal.hide();
var button = document.getElementById('button_calendar_' + field_name);
button.onclick = function() { showCalendar(field_name); };
YAHOO.util.Event.removeListener(document.body, 'click',
cal.bz_myBodyCloser);
YAHOO.util.Event.removeListener(document.body, 'keydown', cal.bz_escCal);
}
/* This is the selectEvent for our Calendar objects on our custom
* DateTime fields.
*/
function setFieldFromCalendar(type, args, date_field) {
var dates = args[0];
var setDate = dates[0];
var timeRe = /\b(\d{1,2}):(\d\d)(?::(\d\d))?/;
var currentTime = timeRe.exec(date_field.value);
var d = new Date(setDate[0], setDate[1] - 1, setDate[2]);
if (currentTime) {
d.setHours(currentTime[1], currentTime[2]);
if (currentTime[3]) {
d.setSeconds(currentTime[3]);
}
}
var year = d.getFullYear();
var month = d.getMonth() + 1;
if (month < 10) month = '0' + String(month);
var day = d.getDate();
if (day < 10) day = '0' + String(day);
var dateStr = year + '-' + month  + '-' + day;
if (currentTime) {
var minutes = d.getMinutes();
if (minutes < 10) minutes = '0' + String(minutes);
var seconds = d.getSeconds();
if (seconds > 0 && seconds < 10) {
seconds = '0' + String(seconds);
}
dateStr = dateStr + ' ' + d.getHours() + ':' + minutes;
if (seconds) dateStr = dateStr + ':' + seconds;
}
date_field.value = dateStr;
hideCalendar(date_field.id);
}
/* Sets the calendar based on the current field value.
*/
function updateCalendarFromField(date_field) {
var dateRe = /(\d\d\d\d)-(\d\d?)-(\d\d?)/;
var pieces = dateRe.exec(date_field.value);
if (pieces) {
var cal = YAHOO.bugzilla["calendar_" + date_field.id];
cal.select(new Date(pieces[1], pieces[2] - 1, pieces[3]));
var selectedArray = cal.getSelectedDates();
var selected = selectedArray[0];
cal.cfg.setProperty("pagedate", (selected.getMonth() + 1) + '/'
+ selected.getFullYear());
cal.render();
}
}
function setupEditLink(id) {
var link_container = 'container_showhide_' + id;
var input_container = 'container_' + id;
var link = 'showhide_' + id;
hideEditableField(link_container, input_container, link);
}
/* Hide input/select fields and show the text with (edit) next to it */
function hideEditableField( container, input, action, field_id, original_value, new_value, hide_input ) {
YAHOO.util.Dom.removeClass(container, 'bz_default_hidden');
YAHOO.util.Dom.addClass(input, 'bz_default_hidden');
YAHOO.util.Event.addListener(action, 'click', showEditableField,
new Array(container, input, field_id, new_value));
if(field_id != ""){
YAHOO.util.Event.addListener(window, 'load', checkForChangedFieldValues,
new Array(container, input, field_id, original_value, hide_input ));
}
}
/* showEditableField (e, ContainerInputArray)
* Function hides the (edit) link and the text and displays the input/select field
*
* var e: the event
* var ContainerInputArray: An array containing the (edit) and text area and the input being displayed
* var ContainerInputArray[0]: the container that will be hidden usually shows the (edit) or (take) text
* var ContainerInputArray[1]: the input area and label that will be displayed
* var ContainerInputArray[2]: the input/select field id for which the new value must be set
* var ContainerInputArray[3]: the new value to set the input/select field to when (take) is clicked
*/
function showEditableField (e, ContainerInputArray) {
var inputs = new Array();
var inputArea = YAHOO.util.Dom.get(ContainerInputArray[1]);
if ( ! inputArea ){
YAHOO.util.Event.preventDefault(e);
return;
}
YAHOO.util.Dom.addClass(ContainerInputArray[0], 'bz_default_hidden');
YAHOO.util.Dom.removeClass(inputArea, 'bz_default_hidden');
if ( inputArea.tagName.toLowerCase() == "input" ) {
inputs.push(inputArea);
} else if (ContainerInputArray[2]) {
inputs.push(document.getElementById(ContainerInputArray[2]));
} else {
inputs = inputArea.getElementsByTagName('input');
}
if ( inputs.length > 0 ) {
var type = inputs[0].tagName.toLowerCase();
if (ContainerInputArray[3]) {
if ( type == "input" ) {
inputs[0].value = ContainerInputArray[3];
} else {
for (var i = 0; inputs[0].length; i++) {
if ( inputs[0].options[i].value == ContainerInputArray[3] ) {
inputs[0].options[i].selected = true;
break;
}
}
}
}
inputs[0].focus();
if ( type == "input" || type == "textarea" ) {
inputs[0].select();
}
}
YAHOO.util.Event.preventDefault(e);
}
/* checkForChangedFieldValues(e, array )
* Function checks if after the autocomplete by the browser if the values match the originals.
*   If they don't match then hide the text and show the input so users don't get confused.
*
* var e: the event
* var ContainerInputArray: An array containing the (edit) and text area and the input being displayed
* var ContainerInputArray[0]: the conainer that will be hidden usually shows the (edit) text
* var ContainerInputArray[1]: the input area and label that will be displayed
* var ContainerInputArray[2]: the field that is on the page, might get changed by browser autocomplete
* var ContainerInputArray[3]: the original value from the page loading.
*
*/
function checkForChangedFieldValues(e, ContainerInputArray ) {
var el = document.getElementById(ContainerInputArray[2]);
var unhide = false;
if ( el ) {
if ( !ContainerInputArray[4]
&& (el.value != ContainerInputArray[3]
|| (el.value == "" && el.id != "qa_contact")) )
{
unhide = true;
}
else {
var set_default = document.getElementById("set_default_" +
ContainerInputArray[2]);
if ( set_default ) {
if(set_default.checked){
unhide = true;
}
}
}
}
if(unhide){
YAHOO.util.Dom.addClass(ContainerInputArray[0], 'bz_default_hidden');
YAHOO.util.Dom.removeClass(ContainerInputArray[1], 'bz_default_hidden');
}
}
function showPeopleOnChange( field_id_list ) {
for(var i = 0; i < field_id_list.length; i++) {
YAHOO.util.Event.addListener( field_id_list[i],'change', showEditableField,
new Array('bz_qa_contact_edit_container',
'bz_qa_contact_input'));
YAHOO.util.Event.addListener( field_id_list[i],'change',showEditableField,
new Array('bz_assignee_edit_container',
'bz_assignee_input'));
}
}
function assignToDefaultOnChange(field_id_list, default_assignee, default_qa_contact) {
showPeopleOnChange(field_id_list);
for(var i = 0, l = field_id_list.length; i < l; i++) {
YAHOO.util.Event.addListener(field_id_list[i], 'change', function(evt, defaults) {
if (document.getElementById('assigned_to').value == defaults[0]) {
setDefaultCheckbox(evt, 'set_default_assignee');
}
if (document.getElementById('qa_contact')
&& document.getElementById('qa_contact').value == defaults[1])
{
setDefaultCheckbox(evt, 'set_default_qa_contact');
}
}, [default_assignee, default_qa_contact]);
}
}
function initDefaultCheckbox(field_id){
YAHOO.util.Event.addListener( 'set_default_' + field_id,'change', boldOnChange,
'set_default_' + field_id);
YAHOO.util.Event.addListener( window,'load', checkForChangedFieldValues,
new Array( 'bz_' + field_id + '_edit_container',
'bz_' + field_id + '_input',
'set_default_' + field_id ,'1'));
YAHOO.util.Event.addListener( window, 'load', boldOnChange,
'set_default_' + field_id );
}
function showHideStatusItems(e, dupArrayInfo) {
var el = document.getElementById('bug_status');
if ( el ) {
showDuplicateItem(el);
var resolution = document.getElementById('resolution');
if (resolution && resolution.options[0].value != '') {
resolution.bz_lastSelected = resolution.selectedIndex;
var emptyOption = new Option('', '');
resolution.insertBefore(emptyOption, resolution.options[0]);
emptyOption.selected = true;
}
YAHOO.util.Dom.addClass('resolution_settings', 'bz_default_hidden');
if (document.getElementById('resolution_settings_warning')) {
YAHOO.util.Dom.addClass('resolution_settings_warning',
'bz_default_hidden');
}
YAHOO.util.Dom.addClass('duplicate_display', 'bz_default_hidden');
if ( (el.value == dupArrayInfo[1] && dupArrayInfo[0] == "is_duplicate")
|| bz_isValueInArray(close_status_array, el.value) )
{
YAHOO.util.Dom.removeClass('resolution_settings',
'bz_default_hidden');
YAHOO.util.Dom.removeClass('resolution_settings_warning',
'bz_default_hidden');
if (resolution && resolution.options[0].value == '') {
resolution.removeChild(resolution.options[0]);
resolution.selectedIndex = resolution.bz_lastSelected;
}
}
if (resolution) {
bz_fireEvent(resolution, 'change');
}
}
}
function showDuplicateItem(e) {
var resolution = document.getElementById('resolution');
var bug_status = document.getElementById('bug_status');
var dup_id = document.getElementById('dup_id');
if (resolution) {
if (resolution.value == 'DUPLICATE' && bz_isValueInArray( close_status_array, bug_status.value) ) {
YAHOO.util.Dom.removeClass('duplicate_settings',
'bz_default_hidden');
YAHOO.util.Dom.addClass('dup_id_discoverable', 'bz_default_hidden');
if( ! YAHOO.util.Dom.hasClass( dup_id, 'bz_default_hidden' ) ){
dup_id.focus();
dup_id.select();
}
}
else {
YAHOO.util.Dom.addClass('duplicate_settings', 'bz_default_hidden');
YAHOO.util.Dom.removeClass('dup_id_discoverable',
'bz_default_hidden');
dup_id.blur();
}
}
YAHOO.util.Event.preventDefault(e); //prevents the hyperlink from going to the url in the href.
}
function setResolutionToDuplicate(e, duplicate_or_move_bug_status) {
var status = document.getElementById('bug_status');
var resolution = document.getElementById('resolution');
YAHOO.util.Dom.addClass('dup_id_discoverable', 'bz_default_hidden');
status.value = duplicate_or_move_bug_status;
bz_fireEvent(status, 'change');
resolution.value = "DUPLICATE";
bz_fireEvent(resolution, 'change');
YAHOO.util.Event.preventDefault(e);
}
function setDefaultCheckbox(e, field_id) {
var el = document.getElementById(field_id);
var elLabel = document.getElementById(field_id + "_label");
if( el && elLabel ) {
el.checked = "true";
YAHOO.util.Dom.setStyle(elLabel, 'font-weight', 'bold');
}
}
function boldOnChange(e, field_id){
var el = document.getElementById(field_id);
var elLabel = document.getElementById(field_id + "_label");
if( el && elLabel ) {
if( el.checked ){
YAHOO.util.Dom.setStyle(elLabel, 'font-weight', 'bold');
}
else{
YAHOO.util.Dom.setStyle(elLabel, 'font-weight', 'normal');
}
}
}
function updateCommentTagControl(checkbox, field) {
if (checkbox.checked) {
YAHOO.util.Dom.addClass(field, 'bz_private');
if (!$('#bz_assignee_edit_container .vcard').hasClass('redhat_user') &&
!$('#assigned_to').hasClass('redhat_user')
) {
alertify.warning('The assignee for this bug cannot see private comments!');
}
if (
!$('#bz_qa_contact_edit_container .vcard').hasClass('redhat_user') &&
!$('#bz_qa_contact_edit_container .vcard a').attr('href') == 'mailto:' &&
!$('#qa_contact').hasClass('redhat_user')
) {
alertify.warning('The QA contact for this bug cannot see private comments!');
}
if ($('#extra_private_groups_new').size()) {
$('#extra_private_groups_new').selectize()[0].selectize.enable();
$('#bz_extra_private_groups_wrapper').addClass('bz_private');
if ($('#extra_private_groups_new').selectize()[0].selectize.items.length > 0) {
$('#comment').addClass('bz_shared_private');
}
}
} else {
YAHOO.util.Dom.removeClass(field, 'bz_private');
if ($('#extra_private_groups_new').size()) {
$('#extra_private_groups_new').selectize()[0].selectize.enable();
$('#bz_extra_private_groups_wrapper').removeClass('bz_private');
$('#comment').removeClass('bz_shared_private');
}
}
}
function updateCommentSharedPrivacy() {
if ($('#extra_private_groups_new').selectize()[0].selectize.items.length > 0) {
$('#comment').addClass('bz_shared_private');
} else {
$('#comment').removeClass('bz_shared_private');
}
}
/**
* Reset the value of the classification field and fire an event change
* on it.  Called when the product changes, in case the classification
* field (which is hidden) controls the visibility of any other fields.
*/
function setClassification() {
var classification = document.getElementById('classification');
var product = document.getElementById('product');
var selected_product = product.value;
var select_classification = all_classifications[selected_product];
classification.value = select_classification;
bz_fireEvent(classification, 'change');
}
/**
* Says that a field should only be displayed when another field has
* a certain value. May only be called after the controller has already
* been added to the DOM.
*/
function showFieldWhen(controlled_id, controller_id, values) {
var controller = document.getElementById(controller_id);
YAHOO.util.Event.addListener(controller, 'change',
handleVisControllerValueChange, [controlled_id, controller, values]);
}
/**
* Called by showFieldWhen when a field's visibility controller
* changes values.
*/
function handleVisControllerValueChange(e, args) {
var controlled_id = args[0];
var controller = args[1];
var values = args[2];
var field = document.getElementById(controlled_id);
var label_container =
document.getElementById('field_label_' + controlled_id);
var field_container =
document.getElementById('field_container_' + controlled_id);
var selected = false;
for (var i = 0; i < values.length; i++) {
if (bz_valueSelected(controller, values[i])) {
selected = true;
break;
}
}
if (selected) {
YAHOO.util.Dom.removeClass(label_container, 'bz_hidden_field');
YAHOO.util.Dom.removeClass(field_container, 'bz_hidden_field');
/* If a custom field such as a textarea field contains some text, then
* its content is visible by default as a readonly field (assuming that
* the field is displayed). But if such a custom field contains no text,
* then it's not displayed at all and an (edit) link is displayed instead.
* This is problematic if the custom field is mandatory, because at least
* Firefox complains that you must enter a value, but is unable to point
* to the custom field because this one is hidden, and so the user has
* to guess what the web browser is talking about, which is confusing.
* So in that case, we display the custom field automatically instead of
* the (edit) link, so that the user can enter some text in it.
*/
var field_readonly = document.getElementById(controlled_id + '_readonly');
if (!field_readonly) {
var field_input = document.getElementById(controlled_id + '_input');
var edit_container =
document.getElementById(controlled_id + '_edit_container');
if (field_input) {
YAHOO.util.Dom.removeClass(field_input, 'bz_default_hidden');
}
if (edit_container) {
YAHOO.util.Dom.addClass(edit_container, 'bz_hidden_field');
}
}
if (field.getAttribute('data-required') == "true") {
field.setAttribute('required', 'true');
field.setAttribute('aria-required', 'true');
}
}
else {
YAHOO.util.Dom.addClass(label_container, 'bz_hidden_field');
YAHOO.util.Dom.addClass(field_container, 'bz_hidden_field');
if (field.getAttribute('data-required') == "true") {
field.removeAttribute('required');
field.removeAttribute('aria-required');
}
}
}
/**
* This is a data structure representing the tree of controlled values.
* Let's call the "controller value" the "source" and the "controlled
* value" the "target". A target can have only one source, but a source
* can have an infinite number of targets.
*
* The data structure is a series of hash tables that go something
* like this:
*
* source_field -> target_field -> source_value_id -> target_value_ids
*
* We always know source_field when our event handler is called, since
* that's the field the event is being triggered on. We can then enumerate
* through every target field, check the status of each source field value,
* and act appropriately on each target value.
*/
var bz_value_controllers = {};
var bz_value_controller_has_handler = {};
function showValueWhen(target_field_id, target_value_ids,
source_field_id, source_value_id, empty_shows_all)
{
if (!bz_value_controllers[source_field_id]) {
bz_value_controllers[source_field_id] = {};
}
if (!bz_value_controllers[source_field_id][target_field_id]) {
bz_value_controllers[source_field_id][target_field_id] = {};
}
var source_values = bz_value_controllers[source_field_id][target_field_id];
source_values[source_value_id] = target_value_ids;
if (!bz_value_controller_has_handler[source_field_id]) {
var source_field = document.getElementById(source_field_id);
$('#' + source_field_id).on('change', function (e) {
$(this).update_displayed_values(target_field_id, bz_value_controllers[source_field_id][target_field_id]);
});
bz_value_controller_has_handler[source_field_id] = true;
}
}
function handleValControllerChange(e, args) {
var source = args[0];
var empty_shows_all = args[1];
for (var target_field_id in bz_value_controllers[source.id]) {
var target = document.getElementById(target_field_id);
if (!target) continue;
_update_displayed_values(source, target, empty_shows_all);
}
}
/* See the docs for bz_option_duplicate count lower down for an explanation
* of this data structure.
*/
var bz_option_hide_count = {};
function _update_displayed_values(source, target, empty_shows_all) {
var show_all = (empty_shows_all && source.selectedIndex == -1);
bz_option_hide_count[target.id] = {};
var source_values = bz_value_controllers[source.id][target.id];
for (source_value_id in source_values) {
var source_option = getPossiblyHiddenOption(source, source_value_id);
var target_values = source_values[source_value_id];
for (var i = 0; i < target_values.length; i++) {
var target_value_id = target_values[i];
_handle_source_target(source_option, target, target_value_id,
show_all);
}
}
bz_fireEvent(target, 'change');
}
function _handle_source_target(source_option, target, target_value_id,
show_all)
{
var target_option = getPossiblyHiddenOption(target, target_value_id);
if (source_option.selected || (show_all && !source_option.disabled)) {
_show_option(target_option, target);
}
else {
_hide_option(target_option, target);
}
}
/* When an option has duplicates (see the docs for bz_option_duplicates
* lower down in this file), we only want to hide it if *all* the duplicates
* would be hidden. So we keep a counter of how many duplicates each option
* has. Then, when we run through a "change" call for a source field,
* we count how many times each value gets hidden, and only actually
* hide it if the counter hits a number higher than the duplicate count.
*/
var bz_option_duplicate_count = {};
function _show_option(option, field) {
if (!option.disabled) return;
option = showOptionInIE(option, field);
YAHOO.util.Dom.removeClass(option, 'bz_hidden_option');
option.disabled = false;
}
function _hide_option(option, field) {
if (option.disabled) return;
var value_id = option.bz_value_id;
if (field.id in bz_option_duplicate_count
&& value_id in bz_option_duplicate_count[field.id])
{
if (!bz_option_hide_count[field.id][value_id]) {
bz_option_hide_count[field.id][value_id] = 0;
}
bz_option_hide_count[field.id][value_id]++;
var current = bz_option_hide_count[field.id][value_id];
var dups    = bz_option_duplicate_count[field.id][value_id];
if (current <= dups) return;
}
YAHOO.util.Dom.addClass(option, 'bz_hidden_option');
option.selected = false;
option.disabled = true;
hideOptionInIE(option, field);
}
function _value_id(field_name, id) {
return 'v' + id + '_' + field_name;
}
/*********************************/
/* Code for Hiding Options in IE */
/*********************************/
/* IE 7 and below (and some other browsers) don't respond to "display: none"
* on <option> tags. However, you *can* insert a Comment Node as a
* child of a <select> tag. So we just insert a Comment where the <option>
* used to be. */
var ie_hidden_options = {};
function hideOptionInIE(anOption, aSelect) {
if (browserCanHideOptions(aSelect)) return;
var commentNode = document.createComment(anOption.value);
commentNode.id = anOption.id;
commentNode.disabled = true;
if (anOption.replaceNode) {
anOption.replaceNode(commentNode);
}
else {
aSelect.replaceChild(commentNode, anOption);
}
if (!ie_hidden_options[aSelect.id]) {
ie_hidden_options[aSelect.id] = {};
}
ie_hidden_options[aSelect.id][anOption.id] = commentNode;
}
function showOptionInIE(aNode, aSelect) {
if (browserCanHideOptions(aSelect)) return aNode;
var optionNode = document.createElement('option');
optionNode.innerHTML = aNode.data;
optionNode.value = aNode.data;
optionNode.id = aNode.id;
if (aNode.replaceNode) {
aNode.replaceNode(optionNode);
}
else {
aSelect.replaceChild(optionNode, aNode);
}
delete ie_hidden_options[aSelect.id][optionNode.id];
return optionNode;
}
function initHidingOptionsForIE(select_name) {
var aSelect = document.getElementById(select_name);
if (browserCanHideOptions(aSelect)) return;
if (!aSelect) return;
for (var i = 0; ;i++) {
var item = aSelect.options[i];
if (!item) break;
if (item.disabled) {
hideOptionInIE(item, aSelect);
i--; // Hiding an option means that the options array has changed.
}
}
}
/* Certain fields, like the Component field, have duplicate values in
* them (the same name, but different ids). We don't display these
* duplicate values in the UI, but the option hiding/showing code still
* uses the ids of these unshown duplicates. So, whenever we get the
* id of an unshown duplicate in getPossiblyHiddenOption, we have to
* return the actually-used <option> instead.
*
* The structure of the data looks like:
*
*  field_name -> unshown_value_id -> shown_value_id_it_is_a_duplicate_of
*/
var bz_option_duplicates = {};
function getPossiblyHiddenOption(aSelect, optionId) {
if (bz_option_duplicates[aSelect.id]
&& bz_option_duplicates[aSelect.id][optionId])
{
optionId = bz_option_duplicates[aSelect.id][optionId];
}
var id = _value_id(aSelect.id, optionId);
var val = document.getElementById(id);
if (!val && ie_hidden_options[aSelect.id]) {
val = ie_hidden_options[aSelect.id][id];
}
val.bz_value_id = optionId;
return val;
}
var browser_can_hide_options;
function browserCanHideOptions(aSelect) {
/* As far as I can tell, browsers that don't hide <option> tags
* also never have a X position for <option> tags, even if
* they're visible. This is the only reliable way I found to
* differentiate browsers. So we create a visible option, see
* if it has a position, and then remove it. */
if (typeof(browser_can_hide_options) == "undefined") {
var new_opt = bz_createOptionInSelect(aSelect, '', '');
var opt_pos = YAHOO.util.Dom.getX(new_opt);
aSelect.removeChild(new_opt);
if (opt_pos) {
browser_can_hide_options = true;
}
else {
browser_can_hide_options = false;
}
}
return browser_can_hide_options;
}
/* (end) option hiding code */
/**
* The Autoselect
*/
YAHOO.bugzilla.userAutocomplete = {
counter : 0,
dataSource : null,
generateRequest : function ( enteredText ){
YAHOO.bugzilla.userAutocomplete.counter =
YAHOO.bugzilla.userAutocomplete.counter + 1;
YAHOO.util.Connect.setDefaultPostHeader('application/json', true);
YAHOO.util.Connect.initHeader('X-Bugzilla-Internal', 'yes');
var json_object = {
method : "User.get",
id : YAHOO.bugzilla.userAutocomplete.counter,
params : [ {
Bugzilla_api_token: BUGZILLA.api_token,
match : [ decodeURIComponent(enteredText) ],
include_fields : [ "name", "real_name" ]
} ]
};
var stringified =  YAHOO.lang.JSON.stringify(json_object);
var debug = { msg: "json-rpc obj debug info", "json obj": json_object,
"param" : stringified}
YAHOO.bugzilla.userAutocomplete.debug_helper( debug );
return stringified;
},
resultListFormat : function(oResultData, enteredText, sResultMatch) {
return ( YAHOO.lang.escapeHTML(oResultData.real_name) + " ("
+ YAHOO.lang.escapeHTML(oResultData.name) + ")");
},
debug_helper : function ( ){
/* used to help debug any errors that might happen */
if( typeof(console) !== 'undefined' && console != null && arguments.length > 0 ){
console.log("debug helper info:", arguments);
}
return true;
},
init_ds : function(){
this.dataSource = new YAHOO.util.XHRDataSource("jsonrpc.cgi");
this.dataSource.connTimeout = 30000;
this.dataSource.connMethodPost = true;
this.dataSource.connXhrMode = "cancelStaleRequests";
this.dataSource.maxCacheEntries = 5;
this.dataSource.responseSchema = {
resultsList : "result.users",
metaFields : { error: "error", jsonRpcId: "id"},
fields : [
{ key : "name" },
{ key : "real_name"}
]
};
},
init : function( field, container, multiple ) {
if( this.dataSource == null ){
this.init_ds();
}
var userAutoComp = new YAHOO.widget.AutoComplete( field, container,
this.dataSource );
userAutoComp.maxResultsDisplayed = BUGZILLA.param.maxusermatches;
userAutoComp.generateRequest = this.generateRequest;
userAutoComp.formatResult = this.resultListFormat;
userAutoComp.doBeforeLoadData = this.debug_helper;
userAutoComp.minQueryLength = 3;
userAutoComp.autoHighlight = false;
userAutoComp.queryDelay = 0.05;
userAutoComp.useIFrame = true;
userAutoComp.resultTypeList = false;
if( multiple == true ){
userAutoComp.delimChar = [","];
}
}
};
YAHOO.bugzilla.fieldAutocomplete = {
dataSource : [],
init_ds : function( field ) {
this.dataSource[field] =
new YAHOO.util.LocalDataSource( YAHOO.bugzilla.field_array[field] );
},
init : function( field, container ) {
if( this.dataSource[field] == null ) {
this.init_ds( field );
}
var fieldAutoComp =
new YAHOO.widget.AutoComplete(field, container, this.dataSource[field]);
fieldAutoComp.maxResultsDisplayed = YAHOO.bugzilla.field_array[field].length;
fieldAutoComp.formatResult = fieldAutoComp.formatEscapedResult;
fieldAutoComp.minQueryLength = 0;
fieldAutoComp.useIFrame = true;
fieldAutoComp.delimChar = [","," "];
fieldAutoComp.resultTypeList = false;
fieldAutoComp.queryDelay = 0;
/*  Causes all the possibilities in the field to appear when a user
*  focuses on the textbox
*/
fieldAutoComp.textboxFocusEvent.subscribe( function(){
var sInputValue = YAHOO.util.Dom.get(field).value;
if( sInputValue.length === 0
&& YAHOO.bugzilla.field_array[field].length > 0 ){
this.sendQuery(sInputValue);
this.collapseContainer();
this.expandContainer();
}
});
fieldAutoComp.dataRequestEvent.subscribe( function(type, args) {
args[0].autoHighlight = args[1] != '';
});
}
};
/**
* Set the disable email checkbox to true if the user has disabled text
*/
function userDisabledTextOnChange(disabledtext) {
var disable_mail = document.getElementById('disable_mail');
if (disabledtext.value === "" && !disable_mail_manually_set) {
disable_mail.checked = false;
}
if (disabledtext.value !== "" && !disable_mail_manually_set) {
disable_mail.checked = true;
}
}
/**
* Force the browser to honour the selected option when a page is refreshed,
* but only if the user hasn't explicitly selected a different option.
*/
function initDirtyFieldTracking() {
if (YAHOO.env.ua.ie > 0 && YAHOO.env.ua.ie <= 8) return;
var selects = document.getElementById('changeform').getElementsByTagName('select');
for (var i = 0, l = selects.length; i < l; i++) {
var el = selects[i];
var el_dirty = document.getElementById(el.name + '_dirty');
if (!el_dirty) continue;
if (!el_dirty.value) {
var preSelected = bz_preselectedOptions(el);
if (!el.multiple) {
preSelected.selected = true;
} else {
el.selectedIndex = -1;
for (var j = 0, m = preSelected.length; j < m; j++) {
preSelected[j].selected = true;
}
}
}
YAHOO.util.Event.on(el, "change", function(e) {
var el = e.target || e.srcElement;
var preSelected = bz_preselectedOptions(el);
var currentSelected = bz_selectedOptions(el);
var isDirty = false;
if (!el.multiple) {
isDirty = preSelected.index != currentSelected.index;
} else {
if (preSelected.length != currentSelected.length) {
isDirty = true;
} else {
for (var i = 0, l = preSelected.length; i < l; i++) {
if (currentSelected[i].index != preSelected[i].index) {
isDirty = true;
break;
}
}
}
}
document.getElementById(el.name + '_dirty').value = isDirty ? '1' : '';
});
}
}
/**
* Comment preview
*/
var last_comment_text = '';
function show_comment_preview(bug_id) {
var Dom = YAHOO.util.Dom;
var comment = document.getElementById('comment');
var preview = document.getElementById('comment_preview');
if (!comment || !preview) return;
if (Dom.hasClass('comment_preview_tab', 'active_comment_tab')) return;
preview.style.width = (comment.clientWidth - 4) + 'px';
preview.style.height = comment.offsetHeight + 'px';
var comment_tab = document.getElementById('comment_tab');
Dom.addClass(comment, 'bz_default_hidden');
Dom.removeClass(comment_tab, 'active_comment_tab');
comment_tab.setAttribute('aria-selected', 'false');
var preview_tab = document.getElementById('comment_preview_tab');
Dom.removeClass(preview, 'bz_default_hidden');
Dom.addClass(preview_tab, 'active_comment_tab');
preview_tab.setAttribute('aria-selected', 'true');
Dom.addClass('comment_preview_error', 'bz_default_hidden');
if (last_comment_text == comment.value)
return;
Dom.addClass('comment_preview_text', 'bz_default_hidden');
Dom.removeClass('comment_preview_loading', 'bz_default_hidden');
YAHOO.util.Connect.setDefaultPostHeader('application/json', true);
YAHOO.util.Connect.initHeader('X-Bugzilla-Internal', 'yes');
YAHOO.util.Connect.asyncRequest('POST', 'jsonrpc.cgi',
{
success: function(res) {
data = YAHOO.lang.JSON.parse(res.responseText);
if (data.error) {
Dom.addClass('comment_preview_loading', 'bz_default_hidden');
Dom.removeClass('comment_preview_error', 'bz_default_hidden');
Dom.get('comment_preview_error').innerHTML =
YAHOO.lang.escapeHTML(data.error.message);
} else {
document.getElementById('comment_preview_text').innerHTML = data.result.html;
Dom.addClass('comment_preview_loading', 'bz_default_hidden');
Dom.removeClass('comment_preview_text', 'bz_default_hidden');
last_comment_text = comment.value;
}
},
failure: function(res) {
Dom.addClass('comment_preview_loading', 'bz_default_hidden');
Dom.removeClass('comment_preview_error', 'bz_default_hidden');
Dom.get('comment_preview_error').innerHTML =
YAHOO.lang.escapeHTML(res.responseText);
}
},
YAHOO.lang.JSON.stringify({
version: "1.1",
method: 'Bug.render_comment',
params: {
Bugzilla_api_token: BUGZILLA.api_token,
id: bug_id,
text: comment.value
}
})
);
}
function show_comment_edit() {
var comment = document.getElementById('comment');
var preview = document.getElementById('comment_preview');
if (!comment || !preview) return;
if (YAHOO.util.Dom.hasClass(comment, 'active_comment_tab')) return;
var preview_tab = document.getElementById('comment_preview_tab');
YAHOO.util.Dom.addClass(preview, 'bz_default_hidden');
YAHOO.util.Dom.removeClass(preview_tab, 'active_comment_tab');
preview_tab.setAttribute('aria-selected', 'false');
var comment_tab = document.getElementById('comment_tab');
YAHOO.util.Dom.removeClass(comment, 'bz_default_hidden');
YAHOO.util.Dom.addClass(comment_tab, 'active_comment_tab');
comment_tab.setAttribute('aria-selected', 'true');
}
function adjustRemainingTime() {
var new_time = Math.max(bz_remaining_time - document.changeform.work_time.value, 0.0);
document.changeform.remaining_time.value = Math.round(new_time * 100)/100;
}
function updateRemainingTime() {
bz_remaining_time = document.changeform.remaining_time.value;
}
;/* extensions/ExternalBugs/web/js/external_bugs.js */
YAHOO.namespace('ExternalBugs');
YAHOO.ExternalBugs.extUpdateAllRPC = function () {
var extRefreshList = YAHOO.ExternalBugs.extRefreshList;
for (var i = 0; i < extRefreshList.length; i++) {
YAHOO.util.Dom.get('ext_waiting_' + extRefreshList[i]).style.visibility = 'visible';
var callback = {
success:function(o) {
try {
result = YAHOO.lang.JSON.parse(o.responseText);
}
catch(x) {
alert("JSON Parse failed! Please try again.");
return;
}
YAHOO.ExternalBugs.extUpdateRowData(result.result);
},
}
var json_object = {
method: "ExternalBugs.get_ext_data",
params: {
Bugzilla_api_token: BUGZILLA.api_token,
id : extRefreshList[i]
},
id: "1",
version: "1.1"
};
var postData = YAHOO.lang.JSON.stringify(json_object);
YAHOO.util.Connect.setDefaultPostHeader(false);
YAHOO.util.Connect.initHeader('Content-Type','application/json');
YAHOO.util.Connect.initHeader('X-Bugzilla-Internal', 'yes');
YAHOO.util.Connect.asyncRequest('POST','jsonrpc.cgi', callback, postData);
}
}
YAHOO.ExternalBugs.extUpdateRow = function (my_id) {
YAHOO.util.Dom.get('ext_waiting_' + my_id).style.visibility = 'visible';
var rpc;
var data = {};
data['Bugzilla_api_token'] = BUGZILLA.api_token;
data['id'] = my_id;
return rpc = new Rpc('ExternalBugs', 'get_ext_data', data)
.fail(function (error) {
YAHOO.util.Dom.get('ext_waiting_' + my_id).style.visibility = 'hidden';
alertify.error(error.message);
})
.done(function (res) {
YAHOO.ExternalBugs.extUpdateRowData(res);
alertify.success("ExternalBug " + res.ext_bz_bug_id + " updated!");
});
}
YAHOO.ExternalBugs.extUpdateRowData = function (data) {
YAHOO.util.Dom.get('ext_status_' + data.id).innerHTML = data.ext_status;
YAHOO.util.Dom.get('ext_description_' + data.id).innerHTML = data.ext_description;
YAHOO.util.Dom.get('ext_description_' + data.id).title = data.ext_description;
YAHOO.util.Dom.get('ext_priority_' + data.id).innerHTML = data.ext_priority;
YAHOO.util.Dom.get('ext_last_updated_' + data.id).innerHTML = data.ext_last_updated;
YAHOO.util.Dom.get('ext_waiting_' + data.id).style.visibility = 'hidden';
}
YAHOO.util.Event.onDOMReady(YAHOO.ExternalBugs.extUpdateAllRPC);
YAHOO.ExternalBugs.extRemoveRow = function (my_id) {
YAHOO.util.Dom.get('ext_waiting_' + my_id).style.visibility = 'visible';
var rpc;
var data = {};
data['Bugzilla_api_token'] = BUGZILLA.api_token;
data['ids'] = [my_id];
data['minor_update'] = 1;
return rpc = new Rpc('ExternalBugs', 'remove_external_bug', data)
.fail(function (error) {
YAHOO.util.Dom.get('ext_waiting_' + my_id).style.visibility = 'hidden';
alertify.error(error.message);
})
.done(function (res) {
alertify.success("ExternalBug removed!");
$('#ext_row_' + my_id).remove();
});
}
;/* extensions/RedHat/web/DataTables/datatables.min.js */
/*
* This combined file was created by the DataTables downloader builder:
*   https://datatables.net/download
*
* To rebuild or modify this file with the latest versions of the included
* software please visit:
*   https://datatables.net/download/#dt/dt-1.10.18/af-2.3.3/b-1.5.6/b-colvis-1.5.6/cr-1.5.0/fc-3.2.5/fh-3.1.4/kt-2.5.0/r-2.2.2/rg-1.1.0/rr-1.2.4/sc-2.0.0/sl-1.3.0
*
* Included libraries:
*   DataTables 1.10.18, AutoFill 2.3.3, Buttons 1.5.6, Column visibility 1.5.6, ColReorder 1.5.0, FixedColumns 3.2.5, FixedHeader 3.1.4, KeyTable 2.5.0, Responsive 2.2.2, RowGroup 1.1.0, RowReorder 1.2.4, Scroller 2.0.0, Select 1.3.0
*/
/*!
DataTables 1.10.18
©2008-2018 SpryMedia Ltd - datatables.net/license
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function Z(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&Z(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||Z(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Ca(a){var b=n.defaults.oLanguage,c=b.sDecimal;c&&Da(c);if(a){var d=a.sZeroRecords;!a.sEmptyTable&&(d&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(d&&"Loading..."===b.sLoadingRecords)&&F(a,
a,"sZeroRecords","sLoadingRecords");a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&c!==a&&Da(a)}}function eb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":
"");"boolean"===typeof a.scrollX&&(a.scrollX=a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(n.models.oSearch,a[b])}function fb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!h.isArray(b)&&(a.aDataSort=[b])}function gb(a){if(!n.__browser){var b={};n.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,width:1,
overflow:"hidden"}).append(h("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,n.__browser);a.oScroll.iBarWidth=n.__browser.barWidth}
function hb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ea(a,b){var c=n.defaults.column,d=a.aoColumns.length,c=h.extend({},n.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},n.models.oSearch,c[d]);ka(a,d,h(b).data())}function ka(a,b,c){var b=a.aoColumns[b],
d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(fb(c),J(n.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),c.sClass&&e.addClass(c.sClass),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=S(g),i=b.mRender?
S(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return N(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,
b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function $(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Fa(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&la(a);r(a,null,"column-sizing",[a])}function aa(a,b){var c=ma(a,"bVisible");return"number"===
typeof c[b]?c[b]:null}function ba(a,b){var c=ma(a,"bVisible"),c=h.inArray(b,c);return-1!==c?c:null}function V(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function ma(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ga(a){var b=a.aoColumns,c=a.aoData,d=n.ext.type.detect,e,f,g,j,i,h,l,q,t;e=0;for(f=b.length;e<f;e++)if(l=b[e],t=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<
j;g++){i=0;for(h=c.length;i<h;i++){t[i]===k&&(t[i]=B(a,i,e,"type"));q=d[g](t[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function ib(a,b,c,d){var e,f,g,j,i,m,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){m=b[e];var q=m.targets!==k?m.targets:m.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ea(a);d(q[f],m)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],m);else if("string"===
typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&d(j,m)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},n.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ha(a,e,c,d);return e}function na(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,
e){c=Ia(a,e);return O(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function jb(a,
b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}function Ja(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function S(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=S(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||
-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=Ja(f);for(var i=0,m=j.length;i<m;i++){f=j[i].match(ca);g=j[i].match(W);if(f){j[i]=j[i].replace(ca,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(m=a.length;i<m;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(W,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}
function N(a){if(h.isPlainObject(a))return N(a._);if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=Ja(e),f;f=e[e.length-1];for(var g,j,i=0,m=e.length-1;i<m;i++){g=e[i].match(ca);j=e[i].match(W);if(g){e[i]=e[i].replace(ca,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(m=d.length;j<m;j++)f={},b(f,d[j],g),
a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(W,""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(W))a[f.replace(W,"")](d);else a[f.replace(ca,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ka(a){return D(a.aoData,"_aData")}function oa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function pa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,
1)}function da(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ia(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;La(a,e)}}function Ia(a,b,c,d){var e=[],f=b.firstChild,g,
j,i=0,m,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],t=function(a,b){if("string"===typeof a){var c=a.indexOf("@");-1!==c&&(c=a.substring(c+1),N(a)(d,b.getAttribute(c)))}},G=function(a){if(c===k||c===i)j=l[i],m=h.trim(a.innerHTML),j&&j._bAttrSrc?(N(j.mData._)(d,m),t(j.mData.sort,a),t(j.mData.type,a),t(j.mData.filter,a)):q?(j._setter||(j._setter=N(j.mData)),j._setter(d,m)):d[i]=m;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)G(f),e.push(f);f=f.nextSibling}else{e=b.anCells;
f=0;for(g=e.length;f<g;f++)G(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&N(a.rowId)(d,b);return{data:d,cells:e}}function Ha(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,m,l,q;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;La(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){m=a.aoColumns[l];i=c?d[l]:H.createElement(m.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||m.mRender||m.mData!==l)&&(!h.isPlainObject(m.mData)||m.mData._!==l+".display"))i.innerHTML=
B(a,b,l,"display");m.sClass&&(i.className+=" "+m.sClass);m.bVisible&&!c?j.appendChild(i):!m.bVisible&&c&&i.parentNode.removeChild(i);m.fnCreatedCell&&m.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}r(a,"aoRowCreatedCallback",null,[j,f,b,g])}e.nTr.setAttribute("role","row")}function La(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?qa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));
d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function kb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===h("th, td",g).length,m=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Ma(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Na(a,"header")(a,d,
f,m);i&&ea(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(m.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(m.sFooterTH);if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function fa(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,m;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=
0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(m=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+m]!==k&&g[d][f].cell==g[d][f+m].cell;){for(c=0;c<i;c++)j[d+c][f+m]=1;m++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",m)}}}}function P(a){var b=r(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=
d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=-1);var g=a._iDisplayStart,m=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!lb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:m;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ha(a,l);var t=q.nTr;if(0!==e){var G=d[c%e];q._sRowStripe!=G&&(h(t).removeClass(q._sRowStripe).addClass(G),
q._sRowStripe=G)}r(a,"aoRowCallback",null,[t,q._aData,c,j,l]);b.push(t);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:V(a),"class":a.oClasses.sRowEmpty}).html(c))[0];r(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ka(a),g,m,i]);r(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ka(a),g,m,i]);d=h(a.nTBody);d.children().detach();
d.append(h(b));r(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;c.bSort&&mb(a);d?ga(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;P(a);a._drawHold=!1}function nb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=
a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,m,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];m=f[k+1];if("'"==m||'"'==m){l="";for(q=2;f[k+q]!=m;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(m=l.split("."),i.id=m[0].substr(1,m[0].length-1),i.className=m[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=ob(a);else if("f"==j&&
d.bFilter)g=pb(a);else if("r"==j&&d.bProcessing)g=qb(a);else if("t"==j)g=rb(a);else if("i"==j&&d.bInfo)g=sb(a);else if("p"==j&&d.bPaginate)g=tb(a);else if(0!==n.ext.feature.length){i=n.ext.feature;q=0;for(m=i.length;q<m;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function ea(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,m,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<
i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;m=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][m+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ra(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],ea(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||
!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function sa(a,b,c){r(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){r(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var m="function"===typeof f?f(b,a):f,b="function"===typeof f&&m?m:h.extend(!0,b,m);delete g.data}m={data:b,success:function(b){var c=
b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=r(a,null,"xhr",[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;r(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(m,{url:g||a.sAjaxSource})):
"function"===typeof g?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(m,g)),g.data=f)}function lb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,!0),sa(a,ub(a),function(b){vb(a,b)}),!1):!0}function ub(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,m,l,k=X(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var t=function(a,b){j.push({name:a,value:b})};t("sEcho",a.iDraw);t("iColumns",c);t("sColumns",D(b,"sName").join(","));t("iDisplayStart",g);t("iDisplayLength",
i);var G={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)m=b[g],l=f[g],i="function"==typeof m.mData?"function":m.mData,G.columns.push({data:i,name:m.sName,searchable:m.bSearchable,orderable:m.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),t("mDataProp_"+g,i),d.bFilter&&(t("sSearch_"+g,l.sSearch),t("bRegex_"+g,l.bRegex),t("bSearchable_"+g,m.bSearchable)),d.bSort&&t("bSortable_"+g,m.bSortable);d.bFilter&&(t("sSearch",e.sSearch),t("bRegex",
e.bRegex));d.bSort&&(h.each(k,function(a,b){G.order.push({column:b.col,dir:b.dir});t("iSortCol_"+a,b.col);t("sSortDir_"+a,b.dir)}),t("iSortingCols",k.length));b=n.ext.legacy.ajax;return null===b?a.sAjaxSource?j:G:b?j:G}function vb(a,b){var c=ta(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}oa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,
10);d=0;for(e=c.length;d<e;d++)O(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;P(a);a._bInitComplete||ua(a,b);a.bAjaxDataGet=!0;C(a,!1)}function ta(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?S(c)(b):b}function pb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",
g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?"":this.value;b!=e.sSearch&&(ga(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,P(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",g?Oa(f,g):f).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",
c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==H.activeElement&&i.val(e.sSearch)}catch(d){}});return b[0]}function ga(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ga(a);if("ssp"!=y(a)){wb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)xb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,
e[b].bSmart,e[b].bCaseInsensitive);yb(a)}else f(b);a.bFiltered=!0;r(a,null,"search",[a])}function yb(a){for(var b=n.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,m=c.length;i<m;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function xb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Pa(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function wb(a,b,c,d,e,f){var d=Pa(b,
d,e,f),f=a.oPreviousSearch.sSearch,g=a.aiDisplayMaster,j,e=[];0!==n.ext.search.length&&(c=!0);j=zb(a);if(0>=b.length)a.aiDisplay=g.slice();else{if(j||c||f.length>b.length||0!==b.indexOf(f)||a.bSorted)a.aiDisplay=g.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)d.test(a.aoData[b[c]]._sFilterRow)&&e.push(b[c]);a.aiDisplay=e}}function Pa(a,b,c,d){a=b?a:Qa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',
"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function zb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=n.ext.type.search;c=!1;d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(va.innerHTML=i,i=Wb?va.textContent:va.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);
h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Ab(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function Bb(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function sb(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Cb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",
b+"_info"));return d[0]}function Cb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Db(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Db(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,
c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ha(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){nb(a);kb(a);fa(a,a.aoHeader);fa(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Fa(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=v(f.sWidth));r(a,null,"preInit",[a]);T(a);e=
y(a);if("ssp"!=e||g)"ajax"==e?sa(a,[],function(c){var f=ta(a,c);for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;T(a);C(a,!1);ua(a,c)},a):(C(a,!1),ua(a))}else setTimeout(function(){ha(a)},200)}function ua(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&$(a);r(a,null,"plugin-init",[a,b]);r(a,"aoInitComplete","init",[a,b])}function Ra(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Sa(a);r(a,null,"length",[a,c])}function ob(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=
e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=new Option("number"===typeof d[g]?a.fnFormatNumber(d[g]):d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ra(a,h(this).val());P(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===
c&&h("select",i).val(d)});return i[0]}function tb(a){var b=a.sPaginationType,c=n.ext.pager[b],d="function"===typeof c,e=function(a){P(a)},b=h("<div/>").addClass(a.oClasses.sPaging+b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Na(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,
e)},sName:"pagination"}));return b}function Ta(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(r(a,null,"page",[a]),c&&P(a));return b}function qb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}
function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");r(a,null,"processing",[a,b])}function rb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),m=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",
position:"relative",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:v(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",
{"class":f.sScrollFootInner}).append(m.removeAttr("id").css("margin-left",0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],t=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(t.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=t;a.aoDrawCallback.push({fn:la,sName:"scrolling"});return i[0]}function la(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,
f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,m=j.children("table"),j=a.nScrollBody,l=h(j),q=j.style,t=h(a.nScrollFoot).children("div"),n=t.children("table"),o=h(a.nTHead),p=h(a.nTable),s=p[0],r=s.style,u=a.nTFoot?h(a.nTFoot):null,x=a.oBrowser,U=x.bScrollOversize,Xb=D(a.aoColumns,"nTh"),Q,L,R,w,Ua=[],y=[],z=[],A=[],B,C=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==
L&&a.scrollBarVis!==k)a.scrollBarVis=L,$(a);else{a.scrollBarVis=L;p.children("thead, tfoot").remove();u&&(R=u.clone().prependTo(p),Q=u.find("tr"),R=R.find("tr"));w=o.clone().prependTo(p);o=o.find("tr");L=w.find("tr");w.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(ra(a,w),function(b,c){B=aa(a,b);c.style.width=a.aoColumns[B].sWidth});u&&I(function(a){a.style.width=""},R);f=p.outerWidth();if(""===c){r.width="100%";if(U&&(p.find("tbody").height()>j.offsetHeight||
"scroll"==l.css("overflow-y")))r.width=v(p.outerWidth()-b);f=p.outerWidth()}else""!==d&&(r.width=v(d),f=p.outerWidth());I(C,L);I(function(a){z.push(a.innerHTML);Ua.push(v(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,Xb)!==-1)a.style.width=Ua[b]},o);h(L).height(0);u&&(I(C,R),I(function(a){A.push(a.innerHTML);y.push(v(h(a).css("width")))},R),I(function(a,b){a.style.width=y[b]},Q),h(R).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+z[b]+"</div>";a.childNodes[0].style.height=
"0";a.childNodes[0].style.overflow="hidden";a.style.width=Ua[b]},L);u&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing">'+A[b]+"</div>";a.childNodes[0].style.height="0";a.childNodes[0].style.overflow="hidden";a.style.width=y[b]},R);if(p.outerWidth()<f){Q=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(U&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))r.width=v(Q-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else Q="100%";q.width=v(Q);
g.width=v(Q);u&&(a.nScrollFoot.style.width=v(Q));!e&&U&&(q.height=v(s.offsetHeight+b));c=p.outerWidth();m[0].style.width=v(c);i.width=v(c);d=p.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+(x.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";u&&(n[0].style.width=v(c),t[0].style.width=v(c),t[0].style[e]=d?b+"px":"0px");p.children("colgroup").insertBefore(p.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,
f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Fa(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=ma(a,"bVisible"),m=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,t=!1,n,o,p=a.oBrowser,d=p.bScrollOversize;(n=b.style.width)&&-1!==n.indexOf("%")&&(l=n);for(n=0;n<i.length;n++)o=c[i[n]],null!==o.sWidth&&(o.sWidth=Eb(o.sWidthOrig,k),t=!0);if(d||
!t&&!f&&!e&&j==V(a)&&j==m.length)for(n=0;n<j;n++)i=aa(a,n),null!==i&&(c[i].sWidth=v(m.eq(n).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var s=h("<tr/>").appendTo(j.find("tbody"));j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");m=ra(a,j.find("thead")[0]);for(n=0;n<i.length;n++)o=c[i[n]],m[n].style.width=null!==o.sWidthOrig&&""!==o.sWidthOrig?v(o.sWidthOrig):
"",o.sWidthOrig&&f&&h(m[n]).append(h("<div/>").css({width:o.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(n=0;n<i.length;n++)t=i[n],o=c[t],h(Fb(a,t)).clone(!1).append(o.sContentPadding).appendTo(s);h("[name]",j).removeAttr("name");o=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):
l&&j.width(l);for(n=e=0;n<i.length;n++)k=h(m[n]),g=k.outerWidth()-k.width(),k=p.bBounding?Math.ceil(m[n].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[n]].sWidth=v(k-g);b.style.width=v(e);o.remove()}l&&(b.style.width=v(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Oa(function(){$(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Eb(a,b){if(!a)return 0;var c=h("<div/>").css("width",v(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Fb(a,
b){var c=Gb(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Gb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(Yb,""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function v(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function X(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var m=[];f=function(a){a.length&&
!h.isArray(a[0])?m.push(a):h.merge(m,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<m.length;a++){i=m[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||"string",m[a]._idx===k&&(m[a]._idx=h.inArray(m[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:m[a][1],index:m[a]._idx,type:j,formatter:n.ext.type.order[j+"-pre"]})}return d}function mb(a){var b,c,d=[],e=n.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ga(a);h=X(a);b=0;for(c=h.length;b<
c;b++)j=h[b],j.formatter&&g++,Hb(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,n=f[b]._aSortData;for(g=0;g<i;g++)if(j=h[g],c=k[j.col],e=n[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,n=f[a]._aSortData,o=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=n[i.col],g=o[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],
c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Ib(a){for(var b,c,d=a.aoColumns,e=X(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Va(a,
b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,D(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==
typeof d&&d(a)}function Ma(a,b,c,d){var e=a.aoColumns[c];Wa(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Va(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Va(a,c,b.shiftKey,d))})}function wa(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=X(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(D(a.aoData,"anCells",g)).addClass(c+
(2>e?e+1:3))}a.aLastSort=d}function Hb(a,b){var c=a.aoColumns[b],d=n.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,ba(a,b)));for(var f,g=n.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function xa(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Ab(a.oPreviousSearch),
columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Ab(a.aoPreSearchCols[d])}})};r(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Jb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=r(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&
(a._iDisplayStart=b.start,a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==k&&h.extend(a.oPreviousSearch,Bb(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Bb(g.search))}r(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=
a.fnStateLoadCallback.call(a.oInstance,a,b);g!==k&&b(g)}else c()}function ya(a){var b=n.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=n.ext,b=b.sErrMode||b.errMode,a&&r(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==
typeof b&&b(a,d,c)}}function F(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Xa(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Wa(a,b,c){h(a).on("click.DT",b,function(b){h(a).blur();c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",
function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function r(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Sa(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Na(a,b){var c=a.renderer,d=n.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===
typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ia(a,b){var c=[],c=Kb.numbers_length,d=Math.floor(c/2);b<=c?c=Y(0,b):a<=d?(c=Y(0,c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=Y(b-(c-2),b):(c=Y(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function Da(a){h.each({num:function(b){return za(b,a)},"num-fmt":function(b){return za(b,a,Ya)},"html-num":function(b){return za(b,
a,Aa)},"html-num-fmt":function(b){return za(b,a,Aa,Ya)}},function(b,c){x.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(x.type.search[b+a]=x.type.search.html)})}function Lb(a){return function(){var b=[ya(this[n.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return n.ext.internal[a].apply(this,b)}}var n=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new s(ya(this[x.iApiIndex])):new s(this)};
this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&la(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,
b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():
c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};
this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return ya(this[x.iApiIndex])};this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();
(d===k||d)&&h.draw();return 0};this.fnVersionCheck=x.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=x.internal;for(var e in n.ext.internal)e&&(this[e]=Lb(e));this.each(function(){var e={},g=1<d?Xa(e,a,!0):a,j=0,i,e=this.getAttribute("id"),m=!1,l=n.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{eb(l);fb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()));var t=n.settings,
j=0;for(i=t.length;j<i;j++){var o=t[j];if(o.nTable==this||o.nTHead&&o.nTHead.parentNode==this||o.nTFoot&&o.nTFoot.parentNode==this){var s=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||s)return o.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){o.oInstance.fnDestroy();break}else{K(o,0,"Cannot reinitialise DataTable",3);return}}if(o.sTableId==this.id){t.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+n.ext._unique++;var p=h.extend(!0,{},n.models.oSettings,{sDestroyWidth:q[0].style.width,
sInstance:e,sTableId:e});p.nTable=this;p.oApi=b.internal;p.oInit=g;t.push(p);p.oInstance=1===b.length?b:q.dataTable();eb(g);Ca(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);g=Xa(h.extend(!0,{},l),g);F(p.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(p,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod",
"aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]);F(p.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(p.oLanguage,g,"fnInfoCallback");
z(p,"aoDrawCallback",g.fnDrawCallback,"user");z(p,"aoServerParams",g.fnServerParams,"user");z(p,"aoStateSaveParams",g.fnStateSaveParams,"user");z(p,"aoStateLoadParams",g.fnStateLoadParams,"user");z(p,"aoStateLoaded",g.fnStateLoaded,"user");z(p,"aoRowCallback",g.fnRowCallback,"user");z(p,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(p,"aoHeaderCallback",g.fnHeaderCallback,"user");z(p,"aoFooterCallback",g.fnFooterCallback,"user");z(p,"aoInitComplete",g.fnInitComplete,"user");z(p,"aoPreDrawCallback",
g.fnPreDrawCallback,"user");p.rowIdFn=S(g.rowId);gb(p);var u=p.oClasses;h.extend(u,n.ext.classes,g.oClasses);q.addClass(u.sTable);p.iInitDisplayStart===k&&(p.iInitDisplayStart=g.iDisplayStart,p._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(p.bDeferLoading=!0,e=h.isArray(g.iDeferLoading),p._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,p._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var v=p.oLanguage;h.extend(!0,v,g.oLanguage);v.sUrl&&(h.ajax({dataType:"json",url:v.sUrl,success:function(a){Ca(a);
J(l.oLanguage,a);h.extend(true,v,a);ha(p)},error:function(){ha(p)}}),m=!0);null===g.asStripeClasses&&(p.asStripeClasses=[u.sStripeOdd,u.sStripeEven]);var e=p.asStripeClasses,x=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return x.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),p.asDestroyStripes=e.slice());e=[];t=this.getElementsByTagName("thead");0!==t.length&&(ea(p.aoHeader,t[0]),e=ra(p));if(null===g.aoColumns){t=[];j=0;for(i=e.length;j<i;j++)t.push(null)}else t=
g.aoColumns;j=0;for(i=t.length;j<i;j++)Ea(p,e?e[j]:null);ib(p,g.aoColumnDefs,t,function(a,b){ka(p,a,b)});if(x.length){var w=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(x[0]).children("th, td").each(function(a,b){var c=p.aoColumns[a];if(c.mData===a){var d=w(b,"sort")||w(b,"order"),e=w(b,"filter")||w(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};ka(p,a)}}})}var U=p.oFeatures,
e=function(){if(g.aaSorting===k){var a=p.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=p.aoColumns[j].asSorting[0]}wa(p);U.bSort&&z(p,"aoDrawCallback",function(){if(p.bSorted){var a=X(p),b={};h.each(a,function(a,c){b[c.src]=c.dir});r(p,null,"order",[p,a,b]);Ib(p)}});z(p,"aoDrawCallback",function(){(p.bSorted||y(p)==="ssp"||U.bDeferRender)&&wa(p)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));
p.nTHead=b[0];b=q.children("tbody");b.length===0&&(b=h("<tbody/>").appendTo(q));p.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(p.oScroll.sX!==""||p.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(u.sNoFooter);else if(b.length>0){p.nTFoot=b[0];ea(p.aoFooter,p.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)O(p,g.aaData[j]);else(p.bDeferLoading||y(p)=="dom")&&na(p,h(p.nTBody).children("tr"));p.aiDisplay=p.aiDisplayMaster.slice();
p.bInitialised=true;m===false&&ha(p)};g.bStateSave?(U.bStateSave=!0,z(p,"aoDrawCallback",xa,"state_save"),Jb(p,g,e)):e()}});b=null;return this},x,s,o,u,Za={},Mb=/[\r\n]/g,Aa=/<.*?>/g,Zb=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,$b=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Ya=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Nb=function(a){var b=parseInt(a,10);return!isNaN(b)&&
isFinite(a)?b:null},Ob=function(a,b){Za[b]||(Za[b]=RegExp(Qa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace(Za[b],"."):a},$a=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Ob(a,b));c&&d&&(a=a.replace(Ya,""));return!isNaN(parseFloat(a))&&isFinite(a)},Pb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:$a(a.replace(Aa,""),b,c)?!0:null},D=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<
f;e++)a[e]&&d.push(a[e][b]);return d},ja=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},Y=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Qb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},qa=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();
b=[];var e=a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};n.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,j=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=k;a.apply(b,j)},c)):(d=g,a.apply(b,j))}},escapeRegex:function(a){return a.replace($b,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ca=/\[.*?\]$/,W=/\(\)$/,Qa=n.util.escapeRegex,va=h("<div>")[0],Wb=va.textContent!==k,Yb=
/<.*?>/g,Oa=n.util.throttle,Rb=[],w=Array.prototype,ac=function(a){var b,c,d=n.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};s=function(a,b){if(!(this instanceof
s))return new s(a,b);var c=[],d=function(a){(a=ac(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=qa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};s.extend(this,this,Rb)};n.Api=s;h.extend(s.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new s(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new s(this.context,b)},flatten:function(){var a=[];return new s(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,j,h,m,l=this.context,
n,o,u=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(j=l.length;g<j;g++){var r=new s(l[g]);if("table"===b)f=c.call(r,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(r,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){o=this[g];"column-rows"===b&&(n=Ba(l[g],u.opts));h=0;for(m=o.length;h<m;h++)f=o[h],f="cell"===b?c.call(r,l[g],f.row,f.column,g,h):c.call(r,l[g],f,g,h,n),f!==k&&e.push(f)}}return e.length||d?(a=new s(l,a?
e.concat.apply([],e):e),b=a.selector,b.rows=u.rows,b.cols=u.cols,b.opts=u.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new s(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return hb(this,a,b,0,this.length,
1)},reduceRight:w.reduceRight||function(a,b){return hb(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,slice:function(){return new s(this.context,this)},sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new s(this.context,qa(this))},unshift:w.unshift});s.extend=function(a,b,c){if(c.length&&b&&(b instanceof s||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=
b.apply(a,arguments);s.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,s.extend(a,b[f.name],f.propExt)}};s.register=o=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)s.register(a[c],b);else for(var e=a.split("."),f=Rb,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var m=f.length;i<m;i++)if(f[i].name===g){i=
f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};s.registerPlural=u=function(a,b,c){s.register(a,c);s.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof s?a.length?h.isArray(a[0])?new s(a.context,a[0]):a[0]:k:a})};o("tables()",function(a){var b;if(a){b=s;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,
d);return c[a]}).toArray();b=new b(a)}else b=this;return b});o("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new s(b[0]):a});u("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});u("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});u("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});u("tables().footer()",
"table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});u("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});o("draw()",function(a){return this.iterator("table",function(b){"page"===a?P(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});o("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Ta(b,a)})});o("page.info()",function(){if(0===
this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:"ssp"===y(a)}});o("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ra(b,a)})});var Sb=function(a,b,c){if(c){var d=new s(a);
d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();sa(a,[],function(c){oa(a);for(var c=ta(a,c),d=0,e=c.length;d<e;d++)O(a,c[d]);T(a,b);C(a,!1)})}};o("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});o("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});o("ajax.reload()",function(a,b){return this.iterator("table",function(c){Sb(c,!1===b,a)})});o("ajax.url()",function(a){var b=
this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});o("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Sb(c,!1===b,a)})});var ab=function(a,b,c,d,e){var f=[],g,j,i,m,l,n;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(m=b.length;i<m;i++){j=b[i]&&b[i].split&&!b[i].match(/[\[\(:]/)?b[i].split(","):
[b[i]];l=0;for(n=j.length;l<n;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=x.selector[a];if(a.length){i=0;for(m=a.length;i<m;i++)f=a[i](d,e,f)}return qa(f)},bb=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},cb=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Ba=function(a,b){var c,
d,e,f=[],g=a.aiDisplay;e=a.aiDisplayMaster;var j=b.search;c=b.order;d=b.page;if("ssp"==y(a))return"removed"===j?[]:Y(0,e.length);if("current"==d){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==c||"applied"==c)if("none"==j)f=e.slice();else if("applied"==j)f=g.slice();else{if("removed"==j){var i={};c=0;for(d=g.length;c<d;c++)i[g[c]]=null;f=h.map(e,function(a){return!i.hasOwnProperty(a)?a:null})}}else if("index"==c||"original"==c){c=0;for(d=a.aoData.length;c<d;c++)"none"==
j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};o("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=b,f;return ab("row",a,function(a){var b=Nb(a),i=c.aoData;if(b!==null&&!e)return[b];f||(f=Ba(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var c=i[b];return a(b,c._aData,c.nTr)?b:null});if(a.nodeName){var b=
a._DT_RowIndex,m=a._DT_CellIndex;if(b!==k)return i[b]&&i[b].nTr===a?[b]:[];if(m)return i[m.row]&&i[m.row].nTr===a?[m.row]:[];b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){b=c.aIds[a.replace(/^#/,"")];if(b!==k)return[b.idx]}b=Qb(ja(c.aoData,f,"nTr"));return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});o("rows().nodes()",function(){return this.iterator("row",
function(a,b){return a.aoData[b].nTr||k},1)});o("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ja(a.aoData,b,"_aData")},1)});u("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});u("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){da(b,c,a)})});u("rows().indexes()","row().index()",function(){return this.iterator("row",
function(a,b){return b},1)});u("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new s(c,b)});u("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,m,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(m=
l.length;i<m;i++)l[i]._DT_CellIndex.row=g}pa(b.aiDisplayMaster,c);pa(b.aiDisplay,c);pa(a[d],c,!1);0<b._iRecordsDisplay&&b._iRecordsDisplay--;Sa(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});o("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(na(b,c)[0]):h.push(O(b,c));return h},
1),c=this.rows(-1);c.pop();h.merge(c,b);return c});o("row()",function(a,b){return cb(this.rows(a,b))});o("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:k;var c=b[0].aoData[this[0]];c._aData=a;h.isArray(a)&&c.nTr.id&&N(b[0].rowId)(a,c.nTr.id);da(b[0],this[0],"data");return this});o("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});o("row.add()",function(a){a instanceof h&&
a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?na(b,a)[0]:O(b,a)});return this.row(b[0])});var db=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=k,c._details=k},Tb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new s(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");
0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",function(a,b){if(e===b)for(var c,d=V(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&db(f,c)}))}}};o("row().child()",function(a,b){var c=
this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)db(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=V(d),e.push(c[0]))};f(a,b);c._details&&c._details.detach();c._details=h(e);
c._detailsShow&&c._details.insertAfter(c.nTr)}return this});o(["row().child.show()","row().child().show()"],function(){Tb(this,!0);return this});o(["row().child.hide()","row().child().hide()"],function(){Tb(this,!1);return this});o(["row().child.remove()","row().child().remove()"],function(){db(this);return this});o("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var bc=/^([^:]+):(name|visIdx|visible)$/,Ub=function(a,b,
c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};o("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=bb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,j=D(g,"sName"),i=D(g,"nTh");return ab("column",e,function(a){var b=Nb(a);if(a==="")return Y(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Ba(c,f);return h.map(g,function(b,f){return a(f,Ub(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(bc):
"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var n=h.map(g,function(a,b){return a.bVisible?b:null});return[n[n.length+b]]}return[aa(c,b)];case "name":return h.map(j,function(a,b){return a===k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},
1);c.selector.cols=a;c.selector.opts=b;return c});u("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});u("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});u("columns().data()","column().data()",function(){return this.iterator("column-rows",Ub,1)});u("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},
1)});u("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ja(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});u("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ja(a.aoData,e,"anCells",b)},1)});u("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,
i,m,l;if(a!==k&&g.bVisible!==a){if(a){var n=h.inArray(!0,D(f,"bVisible"),c+1);i=0;for(m=j.length;i<m;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[n]||null)}else h(D(b.aoData,"anCells",c)).detach();g.bVisible=a;fa(b,b.aoHeader);fa(b,b.aoFooter);b.aiDisplay.length||h(b.nTBody).find("td[colspan]").attr("colspan",V(b));xa(b)}});a!==k&&(this.iterator("column",function(c,e){r(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});u("columns().indexes()","column().index()",
function(a){return this.iterator("column",function(b,c){return"visible"===a?ba(b,c):c},1)});o("columns.adjust()",function(){return this.iterator("table",function(a){$(a)},1)});o("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return aa(c,b);if("fromData"===a||"toVisible"===a)return ba(c,b)}});o("column()",function(a,b){return cb(this.columns(a,b))});o("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));
h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=bb(c),f=b.aoData,g=Ba(b,e),j=Qb(ja(f,g,"anCells")),i=h([].concat.apply([],j)),l,m=b.aoColumns.length,n,o,u,s,r,v;return ab("cell",d,function(a){var c=typeof a==="function";if(a===null||a===k||c){n=[];o=0;for(u=g.length;o<u;o++){l=g[o];for(s=0;s<m;s++){r={row:l,column:s};if(c){v=f[l];a(r,B(b,l,s),v.anCells?v.anCells[s]:null)&&n.push(r)}else n.push(r)}}return n}if(h.isPlainObject(a))return a.column!==
k&&a.row!==k&&h.inArray(a.row,g)!==-1?[a]:[];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=this.columns(b),e=this.rows(a),f,g,j,i,m;this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(m=d[b].length;i<m;i++)f.push({row:e[b][g],column:d[b][i]})}},1);var l=this.cells(f,
c);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});u("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});o("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});u("cells().cache()","cell().cache()",function(a){a="search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});u("cells().render()","cell().render()",
function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});u("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:ba(a,c)}},1)});u("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){da(b,c,a,d)})});o("cell()",function(a,b,c){return cb(this.cells(a,b,c))});o("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],
c[0].row,c[0].column):k;jb(b[0],c[0].row,c[0].column,a);da(b[0],c[0].row,"data",c[0].column);return this});o("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});o("order.listener()",function(a,b,c){return this.iterator("table",function(d){Ma(d,a,b,c)})});o("order.fixed()",function(a){if(!a){var b=
this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});o(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});o("search()",function(a,b,c,d){var e=this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ga(e,
h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});u("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),ga(e,e.oPreviousSearch,1))})});o("state()",function(){return this.context.length?this.context[0].oSavedState:
null});o("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});o("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});o("state.save()",function(){return this.iterator("table",function(a){xa(a)})});n.versionCheck=n.fnVersionCheck=function(a){for(var b=n.version.split("."),a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};n.isDataTable=
n.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;if(a instanceof n.Api)return!0;h.each(n.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=!0});return c};n.tables=n.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(n.settings,function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new s(c):c};n.camelToHungarian=J;o("$()",function(a,b){var c=
this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){o(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});o("clear()",function(){return this.iterator("table",function(a){oa(a)})});o("settings()",function(){return new s(this.context,this.context)});o("init()",function(){var a=
this.context;return a.length?a[0].oInit:null});o("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});o("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),o;b.bDestroying=!0;r(b,"aoDestroyCallback","destroy",[b]);a||(new s(b)).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");
h(E).off(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];wa(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),
(o=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%o])}));c=h.inArray(b,n.settings);-1!==c&&n.settings.splice(c,1)})});h.each(["column","row","cell"],function(a,b){o(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,m)})})});o("i18n()",function(a,b,c){var d=this.context[0],a=S(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:
a._);return a.replace("%d",c)});n.version="1.10.18";n.settings=[];n.models={};n.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};n.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};n.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,
sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};n.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,
bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+
a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},
oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},
n.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};Z(n.defaults);n.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};
Z(n.defaults.column);n.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],
aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",
iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:
this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};n.ext=x={buttons:{},
classes:{},build:"dt/dt-1.10.18/af-2.3.3/b-1.5.6/b-colvis-1.5.6/cr-1.5.0/fc-3.2.5/fh-3.1.4/kt-2.5.0/r-2.2.2/rg-1.1.0/rr-1.2.4/sc-2.0.0/sl-1.3.0",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:n.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:n.version};h.extend(x,{afnFiltering:x.search,aTypes:x.type.detect,ofnSearch:x.type.search,oSort:x.type.order,afnSortData:x.order,aoFeatures:x.feature,oApi:x.internal,oStdClasses:x.classes,oPagination:x.pager});
h.extend(n.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",
sJUIHeader:"",sJUIFooter:""});var Kb=n.ext.pager;h.extend(Kb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ia(a,b)]},simple_numbers:function(a,b){return["previous",ia(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ia(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ia(a,b),"last"]},_numbers:ia,numbers_length:7});h.extend(!0,n.ext.renderer,{pageButton:{_:function(a,b,c,d,e,
f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,n=0,o=function(b,d){var k,s,u,r,v=function(b){Ta(a,b.data.action,true)};k=0;for(s=d.length;k<s;k++){r=d[k];if(h.isArray(r)){u=h("<"+(r.DT_el||"div")+"/>").appendTo(b);o(u,r)}else{m=null;l="";switch(r){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":m=j.sPrevious;l=r+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":m=
j.sNext;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":m=j.sLast;l=r+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:m=r+1;l=e===r?g.sPageButtonActive:""}if(m!==null){u=h("<a>",{"class":g.sPageButton+" "+l,"aria-controls":a.sTableId,"aria-label":i[r],"data-dt-idx":n,tabindex:a.iTabIndex,id:c===0&&typeof r==="string"?a.sTableId+"_"+r:null}).html(m).appendTo(b);Wa(u,{action:r},v);n++}}}},s;try{s=h(b).find(H.activeElement).data("dt-idx")}catch(u){}o(h(b).empty(),d);s!==k&&h(b).find("[data-dt-idx="+
s+"]").focus()}}});h.extend(n.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!Zb.test(a))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||M(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return $a(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Pb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Pb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||
"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(n.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Mb," ").replace(Aa,""):""},string:function(a){return M(a)?a:"string"===typeof a?a.replace(Mb," "):a}});var za=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Ob(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(x.type.order,{"date-pre":function(a){a=Date.parse(a);return isNaN(a)?-Infinity:a},"html-pre":function(a){return M(a)?
"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});Da("");h.extend(!0,n.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:
c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]==
"asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var Vb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):a};n.render={number:function(a,b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return Vb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
a)+f+(e||"")}}},text:function(){return{display:Vb}}};h.extend(n.ext.internal,{_fnExternApiFunc:Lb,_fnBuildAjax:sa,_fnAjaxUpdate:lb,_fnAjaxParameters:ub,_fnAjaxUpdateDraw:vb,_fnAjaxDataSrc:ta,_fnAddColumn:Ea,_fnColumnOptions:ka,_fnAdjustColumnSizing:$,_fnVisibleToColumnIndex:aa,_fnColumnIndexToVisible:ba,_fnVisbleColumns:V,_fnGetColumns:ma,_fnColumnTypes:Ga,_fnApplyColumnDefs:ib,_fnHungarianMap:Z,_fnCamelToHungarian:J,_fnLanguageCompat:Ca,_fnBrowserDetect:gb,_fnAddData:O,_fnAddTr:na,_fnNodeToDataIndex:function(a,
b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:jb,_fnSplitObjNotation:Ja,_fnGetObjectDataFn:S,_fnSetObjectDataFn:N,_fnGetDataMaster:Ka,_fnClearTable:oa,_fnDeleteIndex:pa,_fnInvalidate:da,_fnGetRowElements:Ia,_fnCreateTr:Ha,_fnBuildHead:kb,_fnDrawHead:fa,_fnDraw:P,_fnReDraw:T,_fnAddOptionsHtml:nb,_fnDetectHeader:ea,_fnGetUniqueThs:ra,_fnFeatureHtmlFilter:pb,_fnFilterComplete:ga,_fnFilterCustom:yb,
_fnFilterColumn:xb,_fnFilter:wb,_fnFilterCreateSearch:Pa,_fnEscapeRegex:Qa,_fnFilterData:zb,_fnFeatureHtmlInfo:sb,_fnUpdateInfo:Cb,_fnInfoMacros:Db,_fnInitialise:ha,_fnInitComplete:ua,_fnLengthChange:Ra,_fnFeatureHtmlLength:ob,_fnFeatureHtmlPaginate:tb,_fnPageChange:Ta,_fnFeatureHtmlProcessing:qb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:rb,_fnScrollDraw:la,_fnApplyToChildren:I,_fnCalculateColumnWidths:Fa,_fnThrottle:Oa,_fnConvertToWidth:Eb,_fnGetWidestNode:Fb,_fnGetMaxLenString:Gb,_fnStringToCss:v,
_fnSortFlatten:X,_fnSort:mb,_fnSortAria:Ib,_fnSortListener:Va,_fnSortAttachListener:Ma,_fnSortingClasses:wa,_fnSortData:Hb,_fnSaveState:xa,_fnLoadState:Jb,_fnSettingsFromNode:ya,_fnLog:K,_fnMap:F,_fnBindAction:Wa,_fnCallbackReg:z,_fnCallbackFire:r,_fnLengthOverflow:Sa,_fnRenderer:Na,_fnDataSource:y,_fnRowAttributes:La,_fnExtend:Xa,_fnCalculateEnd:function(){}});h.fn.dataTable=n;n.$=h;h.fn.dataTableSettings=n.settings;h.fn.dataTableExt=n.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};
h.each(n,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});
/*!
Copyright 2010-2018 SpryMedia Ltd.
This source file is free software, available under the following license:
MIT license - http://datatables.net/license/mit
This source file is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
For details please refer to: http://www.datatables.net
AutoFill 2.3.3
©2008-2018 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(b){var g=0;return function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,g,h){b!=Array.prototype&&b!=Object.prototype&&(b[g]=h.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};
$jscomp.Symbol=function(){var b=0;return function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+b++}}();$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};
$jscomp.iteratorFromArray=function(b,g){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var h=0,m={next:function(){if(h<b.length){var l=h++;return{value:g(l,b[l]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(b,g,h,m){if(g){h=$jscomp.global;b=b.split(".");for(m=0;m<b.length-1;m++){var l=b[m];l in h||(h[l]={});h=h[l]}b=b[b.length-1];m=h[b];g=g(m);g!=m&&null!=g&&$jscomp.defineProperty(h,b,{configurable:!0,writable:!0,value:g})}};$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return b(g,window,document)}):"object"===typeof exports?module.exports=function(g,h){g||(g=window);h&&h.fn.dataTable||(h=require("datatables.net")(g,h).$);return b(h,g,g.document)}:b(jQuery,window,document)})(function(b,g,h,m){var l=b.fn.dataTable,w=0,k=function(a,d){if(!l.versionCheck||!l.versionCheck("1.10.8"))throw"Warning: AutoFill requires DataTables 1.10.8 or greater";this.c=b.extend(!0,{},l.defaults.autoFill,
k.defaults,d);this.s={dt:new l.Api(a),namespace:".autoFill"+w++,scroll:{},scrollInterval:null,handle:{height:0,width:0},enabled:!1};this.dom={handle:b('<div class="dt-autofill-handle"/>'),select:{top:b('<div class="dt-autofill-select top"/>'),right:b('<div class="dt-autofill-select right"/>'),bottom:b('<div class="dt-autofill-select bottom"/>'),left:b('<div class="dt-autofill-select left"/>')},background:b('<div class="dt-autofill-background"/>'),list:b('<div class="dt-autofill-list">'+this.s.dt.i18n("autoFill.info",
"")+"<ul/></div>"),dtScroll:null,offsetParent:null};this._constructor()};b.extend(k.prototype,{enabled:function(){return this.s.enabled},enable:function(a){var d=this;if(!1===a)return this.disable();this.s.enabled=!0;this._focusListener();this.dom.handle.on("mousedown",function(a){d._mousedown(a);return!1});return this},disable:function(){this.s.enabled=!1;this._focusListenerRemove();return this},_constructor:function(){var a=this,d=this.s.dt,c=b("div.dataTables_scrollBody",this.s.dt.table().container());
d.settings()[0].autoFill=this;c.length&&(this.dom.dtScroll=c,"static"===c.css("position")&&c.css("position","relative"));!1!==this.c.enable&&this.enable();d.on("destroy.autoFill",function(){a._focusListenerRemove()})},_attach:function(a){var d=this.s.dt,c=d.cell(a).index(),f=this.dom.handle,e=this.s.handle;c&&-1!==d.columns(this.c.columns).indexes().indexOf(c.column)?(this.dom.offsetParent||(this.dom.offsetParent=b(d.table().node()).offsetParent()),e.height&&e.width||(f.appendTo("body"),e.height=
f.outerHeight(),e.width=f.outerWidth()),d=this._getPosition(a,this.dom.offsetParent),this.dom.attachedTo=a,f.css({top:d.top+a.offsetHeight-e.height,left:d.left+a.offsetWidth-e.width}).appendTo(this.dom.offsetParent)):this._detach()},_actionSelector:function(a){var d=this,c=this.s.dt,f=k.actions,e=[];b.each(f,function(d,b){b.available(c,a)&&e.push(d)});if(1===e.length&&!1===this.c.alwaysAsk){var p=f[e[0]].execute(c,a);this._update(p,a)}else{var n=this.dom.list.children("ul").empty();e.push("cancel");
b.each(e,function(e,p){n.append(b("<li/>").append('<div class="dt-autofill-question">'+f[p].option(c,a)+"<div>").append(b('<div class="dt-autofill-button">').append(b('<button class="'+k.classes.btn+'">'+c.i18n("autoFill.button","&gt;")+"</button>").on("click",function(){var e=f[p].execute(c,a,b(this).closest("li"));d._update(e,a);d.dom.background.remove();d.dom.list.remove()}))))});this.dom.background.appendTo("body");this.dom.list.appendTo("body");this.dom.list.css("margin-top",this.dom.list.outerHeight()/
2*-1)}},_detach:function(){this.dom.attachedTo=null;this.dom.handle.detach()},_drawSelection:function(a,d){var c=this.s.dt;d=this.s.start;var f=b(this.dom.start),e={row:this.c.vertical?c.rows({page:"current"}).nodes().indexOf(a.parentNode):d.row,column:this.c.horizontal?b(a).index():d.column};a=c.column.index("toData",e.column);var p=c.row(":eq("+e.row+")",{page:"current"});p=b(c.cell(p.index(),a).node());if(c.cell(p).any()&&-1!==c.columns(this.c.columns).indexes().indexOf(a)){this.s.end=e;c=d.row<
e.row?f:p;var n=d.row<e.row?p:f;a=d.column<e.column?f:p;f=d.column<e.column?p:f;c=this._getPosition(c.get(0)).top;a=this._getPosition(a.get(0)).left;d=this._getPosition(n.get(0)).top+n.outerHeight()-c;f=this._getPosition(f.get(0)).left+f.outerWidth()-a;e=this.dom.select;e.top.css({top:c,left:a,width:f});e.left.css({top:c,left:a,height:d});e.bottom.css({top:c+d,left:a,width:f});e.right.css({top:c,left:a+f,height:d})}},_editor:function(a){var d=this.s.dt,c=this.c.editor;if(c){for(var b={},e=[],p=c.fields(),
n=0,h=a.length;n<h;n++)for(var g=0,l=a[n].length;g<l;g++){var q=a[n][g],t=d.settings()[0].aoColumns[q.index.column],k=t.editField;if(k===m){t=t.mData;for(var u=0,r=p.length;u<r;u++){var v=c.field(p[u]);if(v.dataSrc()===t){k=v.name();break}}}if(!k)throw"Could not automatically determine field data. Please see https://datatables.net/tn/11";b[k]||(b[k]={});t=d.row(q.index.row).id();b[k][t]=q.set;e.push(q.index)}c.bubble(e,!1).multiSet(b).submit()}},_emitEvent:function(a,d){this.s.dt.iterator("table",
function(c,f){b(c.nTable).triggerHandler(a+".dt",d)})},_focusListener:function(){var a=this,d=this.s.dt,c=this.s.namespace,f=null!==this.c.focus?this.c.focus:d.init().keys||d.settings()[0].keytable?"focus":"hover";if("focus"===f)d.on("key-focus.autoFill",function(c,d,b){a._attach(b.node())}).on("key-blur.autoFill",function(c,d,b){a._detach()});else if("click"===f)b(d.table().body()).on("click"+c,"td, th",function(c){a._attach(this)}),b(h.body).on("click"+c,function(c){b(c.target).parents().filter(d.table().body()).length||
a._detach()});else b(d.table().body()).on("mouseenter"+c,"td, th",function(c){a._attach(this)}).on("mouseleave"+c,function(c){b(c.relatedTarget).hasClass("dt-autofill-handle")||a._detach()})},_focusListenerRemove:function(){var a=this.s.dt;a.off(".autoFill");b(a.table().body()).off(this.s.namespace);b(h.body).off(this.s.namespace)},_getPosition:function(a,d){var c=0,f=0;d||(d=b(b(this.s.dt.table().node())[0].offsetParent));do{var e=a.offsetTop,h=a.offsetLeft;var g=b(a.offsetParent);c+=e+g.scrollTop();
f+=h+g.scrollLeft();c+=1*parseInt(g.css("margin-top"));c+=1*parseInt(g.css("border-top-width"));if("body"===a.nodeName.toLowerCase())break;a=g.get(0)}while(g.get(0)!==d.get(0));return{top:c,left:f}},_mousedown:function(a){var d=this,c=this.s.dt;this.dom.start=this.dom.attachedTo;this.s.start={row:c.rows({page:"current"}).nodes().indexOf(b(this.dom.start).parent()[0]),column:b(this.dom.start).index()};b(h.body).on("mousemove.autoFill",function(a){d._mousemove(a)}).on("mouseup.autoFill",function(a){d._mouseup(a)});
var f=this.dom.select;c=b(c.table().node()).offsetParent();f.top.appendTo(c);f.left.appendTo(c);f.right.appendTo(c);f.bottom.appendTo(c);this._drawSelection(this.dom.start,a);this.dom.handle.css("display","none");a=this.dom.dtScroll;this.s.scroll={windowHeight:b(g).height(),windowWidth:b(g).width(),dtTop:a?a.offset().top:null,dtLeft:a?a.offset().left:null,dtHeight:a?a.outerHeight():null,dtWidth:a?a.outerWidth():null}},_mousemove:function(a){var d=a.target.nodeName.toLowerCase();if("td"===d||"th"===
d)this._drawSelection(a.target,a),this._shiftScroll(a)},_mouseup:function(a){b(h.body).off(".autoFill");var d=this,c=this.s.dt,f=this.dom.select;f.top.remove();f.left.remove();f.right.remove();f.bottom.remove();this.dom.handle.css("display","block");f=this.s.start;var e=this.s.end;if(f.row!==e.row||f.column!==e.column){var g=c.cell(":eq("+f.row+")",f.column+":visible",{page:"current"});if(b("div.DTE",g.node()).length){var n=c.editor();n.on("submitSuccess.dtaf close.dtaf",function(){n.off(".dtaf");
setTimeout(function(){d._mouseup(a)},100)}).on("submitComplete.dtaf preSubmitCancelled.dtaf close.dtaf",function(){n.off(".dtaf")});n.submit()}else{var k=this._range(f.row,e.row);f=this._range(f.column,e.column);e=[];for(var l=c.settings()[0],r=l.aoColumns,q=0;q<k.length;q++)e.push(b.map(f,function(a){var d=c.row(":eq("+k[q]+")",{page:"current"});a=c.cell(d.index(),a+":visible");d=a.data();var b=a.index(),f=r[b.column].editField;f!==m&&(d=l.oApi._fnGetObjectDataFn(f)(c.row(b.row).data()));return{cell:a,
data:d,label:a.data(),index:b}}));this._actionSelector(e);clearInterval(this.s.scrollInterval);this.s.scrollInterval=null}}},_range:function(a,d){var c=[];if(a<=d)for(;a<=d;a++)c.push(a);else for(;a>=d;a--)c.push(a);return c},_shiftScroll:function(a){var d=this,c=this.s.scroll,b=!1,e=a.pageY-h.body.scrollTop,g=a.pageX-h.body.scrollLeft,n,k,l,m;65>e?n=-5:e>c.windowHeight-65&&(n=5);65>g?k=-5:g>c.windowWidth-65&&(k=5);null!==c.dtTop&&a.pageY<c.dtTop+65?l=-5:null!==c.dtTop&&a.pageY>c.dtTop+c.dtHeight-
65&&(l=5);null!==c.dtLeft&&a.pageX<c.dtLeft+65?m=-5:null!==c.dtLeft&&a.pageX>c.dtLeft+c.dtWidth-65&&(m=5);n||k||l||m?(c.windowVert=n,c.windowHoriz=k,c.dtVert=l,c.dtHoriz=m,b=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null);!this.s.scrollInterval&&b&&(this.s.scrollInterval=setInterval(function(){c.windowVert&&(h.body.scrollTop+=c.windowVert);c.windowHoriz&&(h.body.scrollLeft+=c.windowHoriz);if(c.dtVert||c.dtHoriz){var a=d.dom.dtScroll[0];c.dtVert&&(a.scrollTop+=
c.dtVert);c.dtHoriz&&(a.scrollLeft+=c.dtHoriz)}},20))},_update:function(a,d){if(!1!==a){a=this.s.dt;var c=a.columns(this.c.columns).indexes();this._emitEvent("preAutoFill",[a,d]);this._editor(d);if(null!==this.c.update?this.c.update:!this.c.editor){for(var b=0,e=d.length;b<e;b++)for(var g=0,h=d[b].length;g<h;g++){var k=d[b][g];-1!==c.indexOf(k.index.column)&&k.cell.data(k.set)}a.draw(!1)}this._emitEvent("autoFill",[a,d])}}});k.actions={increment:{available:function(a,b){a=b[0][0].label;return!isNaN(a-
parseFloat(a))},option:function(a,b){return a.i18n("autoFill.increment",'Increment / decrement each cell by: <input type="number" value="1">')},execute:function(a,d,c){a=1*d[0][0].data;c=1*b("input",c).val();for(var f=0,e=d.length;f<e;f++)for(var g=0,h=d[f].length;g<h;g++)d[f][g].set=a,a+=c}},fill:{available:function(a,b){return!0},option:function(a,b){return a.i18n("autoFill.fill","Fill all cells with <i>"+b[0][0].label+"</i>")},execute:function(a,b,c){a=b[0][0].data;c=0;for(var d=b.length;c<d;c++)for(var e=
0,g=b[c].length;e<g;e++)b[c][e].set=a}},fillHorizontal:{available:function(a,b){return 1<b.length&&1<b[0].length},option:function(a,b){return a.i18n("autoFill.fillHorizontal","Fill cells horizontally")},execute:function(a,b,c){a=0;for(c=b.length;a<c;a++)for(var d=0,e=b[a].length;d<e;d++)b[a][d].set=b[a][0].data}},fillVertical:{available:function(a,b){return 1<b.length&&1<b[0].length},option:function(a,b){return a.i18n("autoFill.fillVertical","Fill cells vertically")},execute:function(a,b,c){a=0;for(c=
b.length;a<c;a++)for(var d=0,e=b[a].length;d<e;d++)b[a][d].set=b[0][d].data}},cancel:{available:function(){return!1},option:function(a){return a.i18n("autoFill.cancel","Cancel")},execute:function(){return!1}}};k.version="2.3.3";k.defaults={alwaysAsk:!1,focus:null,columns:"",enable:!0,update:null,editor:null,vertical:!0,horizontal:!0};k.classes={btn:"btn"};var r=b.fn.dataTable.Api;r.register("autoFill()",function(){return this});r.register("autoFill().enabled()",function(){var a=this.context[0];return a.autoFill?
a.autoFill.enabled():!1});r.register("autoFill().enable()",function(a){return this.iterator("table",function(b){b.autoFill&&b.autoFill.enable(a)})});r.register("autoFill().disable()",function(){return this.iterator("table",function(a){a.autoFill&&a.autoFill.disable()})});b(h).on("preInit.dt.autofill",function(a,d,c){"dt"===a.namespace&&(a=d.oInit.autoFill,c=l.defaults.autoFill,a||c)&&(c=b.extend({},a,c),!1!==a&&new k(d,c))});l.AutoFill=k;return l.AutoFill=k});
/*!
Buttons for DataTables 1.5.6
©2016-2019 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(d,q,n){d instanceof String&&(d=String(d));for(var l=d.length,u=0;u<l;u++){var p=d[u];if(q.call(n,p,u,d))return{i:u,v:p}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(d,q,n){d!=Array.prototype&&d!=Object.prototype&&(d[q]=n.value)};$jscomp.getGlobal=function(d){return"undefined"!=typeof window&&window===d?d:"undefined"!=typeof global&&null!=global?global:d};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(d,q,n,l){if(q){n=$jscomp.global;d=d.split(".");for(l=0;l<d.length-1;l++){var u=d[l];u in n||(n[u]={});n=n[u]}d=d[d.length-1];l=n[d];q=q(l);q!=l&&null!=q&&$jscomp.defineProperty(n,d,{configurable:!0,writable:!0,value:q})}};$jscomp.polyfill("Array.prototype.find",function(d){return d?d:function(d,n){return $jscomp.findInternal(this,d,n).v}},"es6","es3");
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(q){return d(q,window,document)}):"object"===typeof exports?module.exports=function(q,n){q||(q=window);n&&n.fn.dataTable||(n=require("datatables.net")(q,n).$);return d(n,q,q.document)}:d(jQuery,window,document)})(function(d,q,n,l){function u(a){a=new p.Api(a);var b=a.init().buttons||p.defaults.buttons;return(new t(a,b)).container()}var p=d.fn.dataTable,B=0,C=0,r=p.ext.buttons,t=function(a,b){if(!(this instanceof
t))return function(b){return(new t(b,a)).container()};"undefined"===typeof b&&(b={});!0===b&&(b={});d.isArray(b)&&(b={buttons:b});this.c=d.extend(!0,{},t.defaults,b);b.buttons&&(this.c.buttons=b.buttons);this.s={dt:new p.Api(a),buttons:[],listenKeys:"",namespace:"dtb"+B++};this.dom={container:d("<"+this.c.dom.container.tag+"/>").addClass(this.c.dom.container.className)};this._constructor()};d.extend(t.prototype,{action:function(a,b){a=this._nodeToButton(a);if(b===l)return a.conf.action;a.conf.action=
b;return this},active:function(a,b){var c=this._nodeToButton(a);a=this.c.dom.button.active;c=d(c.node);if(b===l)return c.hasClass(a);c.toggleClass(a,b===l?!0:b);return this},add:function(a,b){var c=this.s.buttons;if("string"===typeof b){b=b.split("-");c=this.s;for(var d=0,f=b.length-1;d<f;d++)c=c.buttons[1*b[d]];c=c.buttons;b=1*b[b.length-1]}this._expandButton(c,a,!1,b);this._draw();return this},container:function(){return this.dom.container},disable:function(a){a=this._nodeToButton(a);d(a.node).addClass(this.c.dom.button.disabled);
return this},destroy:function(){d("body").off("keyup."+this.s.namespace);var a=this.s.buttons.slice(),b;var c=0;for(b=a.length;c<b;c++)this.remove(a[c].node);this.dom.container.remove();a=this.s.dt.settings()[0];c=0;for(b=a.length;c<b;c++)if(a.inst===this){a.splice(c,1);break}return this},enable:function(a,b){if(!1===b)return this.disable(a);a=this._nodeToButton(a);d(a.node).removeClass(this.c.dom.button.disabled);return this},name:function(){return this.c.name},node:function(a){if(!a)return this.dom.container;
a=this._nodeToButton(a);return d(a.node)},processing:function(a,b){a=this._nodeToButton(a);if(b===l)return d(a.node).hasClass("processing");d(a.node).toggleClass("processing",b);return this},remove:function(a){var b=this._nodeToButton(a),c=this._nodeToHost(a),e=this.s.dt;if(b.buttons.length)for(var f=b.buttons.length-1;0<=f;f--)this.remove(b.buttons[f].node);b.conf.destroy&&b.conf.destroy.call(e.button(a),e,d(a),b.conf);this._removeKey(b.conf);d(b.node).remove();a=d.inArray(b,c);c.splice(a,1);return this},
text:function(a,b){var c=this._nodeToButton(a);a=this.c.dom.collection.buttonLiner;a=c.inCollection&&a&&a.tag?a.tag:this.c.dom.buttonLiner.tag;var e=this.s.dt,f=d(c.node),g=function(a){return"function"===typeof a?a(e,f,c.conf):a};if(b===l)return g(c.conf.text);c.conf.text=b;a?f.children(a).html(g(b)):f.html(g(b));return this},_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0],e=this.c.buttons;c._buttons||(c._buttons=[]);c._buttons.push({inst:this,name:this.c.name});for(var f=0,g=e.length;f<
g;f++)this.add(e[f]);b.on("destroy",function(b,d){d===c&&a.destroy()});d("body").on("keyup."+this.s.namespace,function(b){if(!n.activeElement||n.activeElement===n.body){var c=String.fromCharCode(b.keyCode).toLowerCase();-1!==a.s.listenKeys.toLowerCase().indexOf(c)&&a._keypress(c,b)}})},_addKey:function(a){a.key&&(this.s.listenKeys+=d.isPlainObject(a.key)?a.key.key:a.key)},_draw:function(a,b){a||(a=this.dom.container,b=this.s.buttons);a.children().detach();for(var c=0,d=b.length;c<d;c++)a.append(b[c].inserter),
a.append(" "),b[c].buttons&&b[c].buttons.length&&this._draw(b[c].collection,b[c].buttons)},_expandButton:function(a,b,c,e){var f=this.s.dt,g=0;b=d.isArray(b)?b:[b];for(var h=0,k=b.length;h<k;h++){var v=this._resolveExtends(b[h]);if(v)if(d.isArray(v))this._expandButton(a,v,c,e);else{var m=this._buildButton(v,c);if(m){e!==l?(a.splice(e,0,m),e++):a.push(m);if(m.conf.buttons){var y=this.c.dom.collection;m.collection=d("<"+y.tag+"/>").addClass(y.className).attr("role","menu");m.conf._collection=m.collection;
this._expandButton(m.buttons,m.conf.buttons,!0,e)}v.init&&v.init.call(f.button(m.node),f,d(m.node),v);g++}}}},_buildButton:function(a,b){var c=this.c.dom.button,e=this.c.dom.buttonLiner,f=this.c.dom.collection,g=this.s.dt,h=function(b){return"function"===typeof b?b(g,m,a):b};b&&f.button&&(c=f.button);b&&f.buttonLiner&&(e=f.buttonLiner);if(a.available&&!a.available(g,a))return!1;var k=function(a,b,c,e){e.action.call(b.button(c),a,b,c,e);d(b.table().node()).triggerHandler("buttons-action.dt",[b.button(c),
b,c,e])};f=a.tag||c.tag;var v=a.clickBlurs===l?!0:a.clickBlurs,m=d("<"+f+"/>").addClass(c.className).attr("tabindex",this.s.dt.settings()[0].iTabIndex).attr("aria-controls",this.s.dt.table().node().id).on("click.dtb",function(b){b.preventDefault();!m.hasClass(c.disabled)&&a.action&&k(b,g,m,a);v&&m.blur()}).on("keyup.dtb",function(b){13===b.keyCode&&!m.hasClass(c.disabled)&&a.action&&k(b,g,m,a)});"a"===f.toLowerCase()&&m.attr("href","#");"button"===f.toLowerCase()&&m.attr("type","button");e.tag?(f=
d("<"+e.tag+"/>").html(h(a.text)).addClass(e.className),"a"===e.tag.toLowerCase()&&f.attr("href","#"),m.append(f)):m.html(h(a.text));!1===a.enabled&&m.addClass(c.disabled);a.className&&m.addClass(a.className);a.titleAttr&&m.attr("title",h(a.titleAttr));a.attr&&m.attr(a.attr);a.namespace||(a.namespace=".dt-button-"+C++);e=(e=this.c.dom.buttonContainer)&&e.tag?d("<"+e.tag+"/>").addClass(e.className).append(m):m;this._addKey(a);this.c.buttonCreated&&(e=this.c.buttonCreated(a,e));return{conf:a,node:m.get(0),
inserter:e,buttons:[],inCollection:b,collection:null}},_nodeToButton:function(a,b){b||(b=this.s.buttons);for(var c=0,d=b.length;c<d;c++){if(b[c].node===a)return b[c];if(b[c].buttons.length){var f=this._nodeToButton(a,b[c].buttons);if(f)return f}}},_nodeToHost:function(a,b){b||(b=this.s.buttons);for(var c=0,d=b.length;c<d;c++){if(b[c].node===a)return b;if(b[c].buttons.length){var f=this._nodeToHost(a,b[c].buttons);if(f)return f}}},_keypress:function(a,b){if(!b._buttonsHandled){var c=function(e){for(var f=
0,g=e.length;f<g;f++){var h=e[f].conf,k=e[f].node;h.key&&(h.key===a?(b._buttonsHandled=!0,d(k).click()):!d.isPlainObject(h.key)||h.key.key!==a||h.key.shiftKey&&!b.shiftKey||h.key.altKey&&!b.altKey||h.key.ctrlKey&&!b.ctrlKey||h.key.metaKey&&!b.metaKey||(b._buttonsHandled=!0,d(k).click()));e[f].buttons.length&&c(e[f].buttons)}};c(this.s.buttons)}},_removeKey:function(a){if(a.key){var b=d.isPlainObject(a.key)?a.key.key:a.key;a=this.s.listenKeys.split("");b=d.inArray(b,a);a.splice(b,1);this.s.listenKeys=
a.join("")}},_resolveExtends:function(a){var b=this.s.dt,c,e=function(c){for(var e=0;!d.isPlainObject(c)&&!d.isArray(c);){if(c===l)return;if("function"===typeof c){if(c=c(b,a),!c)return!1}else if("string"===typeof c){if(!r[c])throw"Unknown button type: "+c;c=r[c]}e++;if(30<e)throw"Buttons: Too many iterations";}return d.isArray(c)?c:d.extend({},c)};for(a=e(a);a&&a.extend;){if(!r[a.extend])throw"Cannot extend unknown button type: "+a.extend;var f=e(r[a.extend]);if(d.isArray(f))return f;if(!f)return!1;
var g=f.className;a=d.extend({},f,a);g&&a.className!==g&&(a.className=g+" "+a.className);var h=a.postfixButtons;if(h){a.buttons||(a.buttons=[]);g=0;for(c=h.length;g<c;g++)a.buttons.push(h[g]);a.postfixButtons=null}if(h=a.prefixButtons){a.buttons||(a.buttons=[]);g=0;for(c=h.length;g<c;g++)a.buttons.splice(g,0,h[g]);a.prefixButtons=null}a.extend=f.extend}return a}});t.background=function(a,b,c,e){c===l&&(c=400);e||(e=n.body);a?d("<div/>").addClass(b).css("display","none").insertAfter(e).stop().fadeIn(c):
d("div."+b).stop().fadeOut(c,function(){d(this).removeClass(b).remove()})};t.instanceSelector=function(a,b){if(!a)return d.map(b,function(a){return a.inst});var c=[],e=d.map(b,function(a){return a.name}),f=function(a){if(d.isArray(a))for(var g=0,k=a.length;g<k;g++)f(a[g]);else"string"===typeof a?-1!==a.indexOf(",")?f(a.split(",")):(a=d.inArray(d.trim(a),e),-1!==a&&c.push(b[a].inst)):"number"===typeof a&&c.push(b[a].inst)};f(a);return c};t.buttonSelector=function(a,b){for(var c=[],e=function(a,b,c){for(var d,
f,g=0,k=b.length;g<k;g++)if(d=b[g])f=c!==l?c+g:g+"",a.push({node:d.node,name:d.conf.name,idx:f}),d.buttons&&e(a,d.buttons,f+"-")},f=function(a,b){var g,h=[];e(h,b.s.buttons);var k=d.map(h,function(a){return a.node});if(d.isArray(a)||a instanceof d)for(k=0,g=a.length;k<g;k++)f(a[k],b);else if(null===a||a===l||"*"===a)for(k=0,g=h.length;k<g;k++)c.push({inst:b,node:h[k].node});else if("number"===typeof a)c.push({inst:b,node:b.s.buttons[a].node});else if("string"===typeof a)if(-1!==a.indexOf(","))for(h=
a.split(","),k=0,g=h.length;k<g;k++)f(d.trim(h[k]),b);else if(a.match(/^\d+(\-\d+)*$/))k=d.map(h,function(a){return a.idx}),c.push({inst:b,node:h[d.inArray(a,k)].node});else if(-1!==a.indexOf(":name"))for(a=a.replace(":name",""),k=0,g=h.length;k<g;k++)h[k].name===a&&c.push({inst:b,node:h[k].node});else d(k).filter(a).each(function(){c.push({inst:b,node:this})});else"object"===typeof a&&a.nodeName&&(h=d.inArray(a,k),-1!==h&&c.push({inst:b,node:k[h]}))},g=0,h=a.length;g<h;g++)f(b,a[g]);return c};t.defaults=
{buttons:["copy","excel","csv","pdf","print"],name:"main",tabIndex:0,dom:{container:{tag:"div",className:"dt-buttons"},collection:{tag:"div",className:"dt-button-collection"},button:{tag:"ActiveXObject"in q?"a":"button",className:"dt-button",active:"active",disabled:"disabled"},buttonLiner:{tag:"span",className:""}}};t.version="1.5.6";d.extend(r,{collection:{text:function(a){return a.i18n("buttons.collection","Collection")},className:"buttons-collection",init:function(a,b,c){b.attr("aria-expanded",
!1)},action:function(a,b,c,e){var f=function(){b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes().each(function(){var a=d(this).siblings(".dt-button-collection");a.length&&a.stop().fadeOut(e.fade,function(){a.detach()});d(this).attr("aria-expanded","false")});d("div.dt-button-background").off("click.dtb-collection");t.background(!1,e.backgroundClassName,e.fade,l);d("body").off(".dtb-collection");b.off("buttons-action.b-internal")};a="true"===c.attr("aria-expanded");f();if(!a){var g=
d(c).parents("div.dt-button-collection");a=c.position();var h=d(b.table().container()),k=!1,l=c;c.attr("aria-expanded","true");g.length&&(k=d(".dt-button-collection").position(),l=g,d("body").trigger("click.dtb-collection"));l.parents("body")[0]!==n.body&&(l=n.body.lastChild);e._collection.find(".dt-button-collection-title").remove();e._collection.prepend('<div class="dt-button-collection-title">'+e.collectionTitle+"</div>");e._collection.addClass(e.collectionLayout).css("display","none").insertAfter(l).stop().fadeIn(e.fade);
g=e._collection.css("position");if(k&&"absolute"===g)e._collection.css({top:k.top,left:k.left});else if("absolute"===g){e._collection.css({top:a.top+c.outerHeight(),left:a.left});k=h.offset().top+h.height();k=a.top+c.outerHeight()+e._collection.outerHeight()-k;g=a.top-e._collection.outerHeight();var m=h.offset().top;(k>m-g||e.dropup)&&e._collection.css("top",a.top-e._collection.outerHeight()-5);e._collection.hasClass(e.rightAlignClassName)&&e._collection.css("left",a.left+c.outerWidth()-e._collection.outerWidth());
k=a.left+e._collection.outerWidth();h=h.offset().left+h.width();k>h&&e._collection.css("left",a.left-(k-h));c=c.offset().left+e._collection.outerWidth();c>d(q).width()&&e._collection.css("left",a.left-(c-d(q).width()))}else c=e._collection.height()/2,c>d(q).height()/2&&(c=d(q).height()/2),e._collection.css("marginTop",-1*c);e.background&&t.background(!0,e.backgroundClassName,e.fade,l);setTimeout(function(){d("div.dt-button-background").on("click.dtb-collection",function(){});d("body").on("click.dtb-collection",
function(a){var b=d.fn.addBack?"addBack":"andSelf";d(a.target).parents()[b]().filter(e._collection).length||f()}).on("keyup.dtb-collection",function(a){27===a.keyCode&&f()});if(e.autoClose)b.on("buttons-action.b-internal",function(){f()})},10)}},background:!0,collectionLayout:"",collectionTitle:"",backgroundClassName:"dt-button-background",rightAlignClassName:"dt-button-right",autoClose:!1,fade:400,attr:{"aria-haspopup":!0}},copy:function(a,b){if(r.copyHtml5)return"copyHtml5";if(r.copyFlash&&r.copyFlash.available(a,
b))return"copyFlash"},csv:function(a,b){if(r.csvHtml5&&r.csvHtml5.available(a,b))return"csvHtml5";if(r.csvFlash&&r.csvFlash.available(a,b))return"csvFlash"},excel:function(a,b){if(r.excelHtml5&&r.excelHtml5.available(a,b))return"excelHtml5";if(r.excelFlash&&r.excelFlash.available(a,b))return"excelFlash"},pdf:function(a,b){if(r.pdfHtml5&&r.pdfHtml5.available(a,b))return"pdfHtml5";if(r.pdfFlash&&r.pdfFlash.available(a,b))return"pdfFlash"},pageLength:function(a){a=a.settings()[0].aLengthMenu;var b=d.isArray(a[0])?
a[0]:a,c=d.isArray(a[0])?a[1]:a;return{extend:"collection",text:function(a){return a.i18n("buttons.pageLength",{"-1":"Show all rows",_:"Show %d rows"},a.page.len())},className:"buttons-page-length",autoClose:!0,buttons:d.map(b,function(a,b){return{text:c[b],className:"button-page-length",action:function(b,c){c.page.len(a).draw()},init:function(b,c,d){var e=this;c=function(){e.active(b.page.len()===a)};b.on("length.dt"+d.namespace,c);c()},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}),
init:function(a,b,c){var d=this;a.on("length.dt"+c.namespace,function(){d.text(c.text)})},destroy:function(a,b,c){a.off("length.dt"+c.namespace)}}}});p.Api.register("buttons()",function(a,b){b===l&&(b=a,a=l);this.selector.buttonGroup=a;var c=this.iterator(!0,"table",function(c){if(c._buttons)return t.buttonSelector(t.instanceSelector(a,c._buttons),b)},!0);c._groupSelector=a;return c});p.Api.register("button()",function(a,b){a=this.buttons(a,b);1<a.length&&a.splice(1,a.length);return a});p.Api.registerPlural("buttons().active()",
"button().active()",function(a){return a===l?this.map(function(a){return a.inst.active(a.node)}):this.each(function(b){b.inst.active(b.node,a)})});p.Api.registerPlural("buttons().action()","button().action()",function(a){return a===l?this.map(function(a){return a.inst.action(a.node)}):this.each(function(b){b.inst.action(b.node,a)})});p.Api.register(["buttons().enable()","button().enable()"],function(a){return this.each(function(b){b.inst.enable(b.node,a)})});p.Api.register(["buttons().disable()",
"button().disable()"],function(){return this.each(function(a){a.inst.disable(a.node)})});p.Api.registerPlural("buttons().nodes()","button().node()",function(){var a=d();d(this.each(function(b){a=a.add(b.inst.node(b.node))}));return a});p.Api.registerPlural("buttons().processing()","button().processing()",function(a){return a===l?this.map(function(a){return a.inst.processing(a.node)}):this.each(function(b){b.inst.processing(b.node,a)})});p.Api.registerPlural("buttons().text()","button().text()",function(a){return a===
l?this.map(function(a){return a.inst.text(a.node)}):this.each(function(b){b.inst.text(b.node,a)})});p.Api.registerPlural("buttons().trigger()","button().trigger()",function(){return this.each(function(a){a.inst.node(a.node).trigger("click")})});p.Api.registerPlural("buttons().containers()","buttons().container()",function(){var a=d(),b=this._groupSelector;this.iterator(!0,"table",function(c){if(c._buttons){c=t.instanceSelector(b,c._buttons);for(var d=0,f=c.length;d<f;d++)a=a.add(c[d].container())}});
return a});p.Api.register("button().add()",function(a,b){var c=this.context;c.length&&(c=t.instanceSelector(this._groupSelector,c[0]._buttons),c.length&&c[0].add(b,a));return this.button(this._groupSelector,a)});p.Api.register("buttons().destroy()",function(){this.pluck("inst").unique().each(function(a){a.destroy()});return this});p.Api.registerPlural("buttons().remove()","buttons().remove()",function(){this.each(function(a){a.inst.remove(a.node)});return this});var w;p.Api.register("buttons.info()",
function(a,b,c){var e=this;if(!1===a)return d("#datatables_buttons_info").fadeOut(function(){d(this).remove()}),clearTimeout(w),w=null,this;w&&clearTimeout(w);d("#datatables_buttons_info").length&&d("#datatables_buttons_info").remove();a=a?"<h2>"+a+"</h2>":"";d('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a).append(d("<div/>")["string"===typeof b?"html":"append"](b)).css("display","none").appendTo("body").fadeIn();c!==l&&0!==c&&(w=setTimeout(function(){e.buttons.info(!1)},c));
return this});p.Api.register("buttons.exportData()",function(a){if(this.context.length)return D(new p.Api(this.context[0]),a)});p.Api.register("buttons.exportInfo()",function(a){a||(a={});var b=a;var c="*"===b.filename&&"*"!==b.title&&b.title!==l&&null!==b.title&&""!==b.title?b.title:b.filename;"function"===typeof c&&(c=c());c===l||null===c?c=null:(-1!==c.indexOf("*")&&(c=d.trim(c.replace("*",d("head > title").text()))),c=c.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""),(b=x(b.extension))||
(b=""),c+=b);b=x(a.title);b=null===b?null:-1!==b.indexOf("*")?b.replace("*",d("head > title").text()||"Exported data"):b;return{filename:c,title:b,messageTop:z(this,a.message||a.messageTop,"top"),messageBottom:z(this,a.messageBottom,"bottom")}});var x=function(a){return null===a||a===l?null:"function"===typeof a?a():a},z=function(a,b,c){b=x(b);if(null===b)return null;a=d("caption",a.table().container()).eq(0);return"*"===b?a.css("caption-side")!==c?null:a.length?a.text():"":b},A=d("<textarea/>")[0],
D=function(a,b){var c=d.extend(!0,{},{rows:null,columns:"",modifier:{search:"applied",order:"applied"},orthogonal:"display",stripHtml:!0,stripNewlines:!0,decodeEntities:!0,trim:!0,format:{header:function(a){return e(a)},footer:function(a){return e(a)},body:function(a){return e(a)}},customizeData:null},b),e=function(a){if("string"!==typeof a)return a;a=a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"");a=a.replace(/<!\-\-.*?\-\->/g,"");c.stripHtml&&(a=a.replace(/<[^>]*>/g,""));c.trim&&
(a=a.replace(/^\s+|\s+$/g,""));c.stripNewlines&&(a=a.replace(/\n/g," "));c.decodeEntities&&(A.innerHTML=a,a=A.value);return a};b=a.columns(c.columns).indexes().map(function(b){var d=a.column(b).header();return c.format.header(d.innerHTML,b,d)}).toArray();var f=a.table().footer()?a.columns(c.columns).indexes().map(function(b){var d=a.column(b).footer();return c.format.footer(d?d.innerHTML:"",b,d)}).toArray():null,g=d.extend({},c.modifier);a.select&&"function"===typeof a.select.info&&g.selected===l&&
a.rows(c.rows,d.extend({selected:!0},g)).any()&&d.extend(g,{selected:!0});g=a.rows(c.rows,g).indexes().toArray();var h=a.cells(g,c.columns);g=h.render(c.orthogonal).toArray();h=h.nodes().toArray();for(var k=b.length,p=[],m=0,n=0,q=0<k?g.length/k:0;n<q;n++){for(var t=[k],r=0;r<k;r++)t[r]=c.format.body(g[m],n,r,h[m]),m++;p[n]=t}b={header:b,footer:f,body:p};c.customizeData&&c.customizeData(b);return b};d.fn.dataTable.Buttons=t;d.fn.DataTable.Buttons=t;d(n).on("init.dt plugin-init.dt",function(a,b){"dt"===
a.namespace&&(a=b.oInit.buttons||p.defaults.buttons)&&!b._buttons&&(new t(b,a)).container()});p.ext.feature.push({fnInit:u,cFeature:"B"});p.ext.features&&p.ext.features.register("buttons",u);return t});
/*!
Column visibility buttons for Buttons and DataTables.
2016 SpryMedia Ltd - datatables.net/license
*/
(function(f){"function"===typeof define&&define.amd?define(["jquery","datatables.net","datatables.net-buttons"],function(c){return f(c,window,document)}):"object"===typeof exports?module.exports=function(c,e){c||(c=window);e&&e.fn.dataTable||(e=require("datatables.net")(c,e).$);e.fn.dataTable.Buttons||require("datatables.net-buttons")(c,e);return f(e,c,c.document)}:f(jQuery,window,document)})(function(f,c,e,h){c=f.fn.dataTable;f.extend(c.ext.buttons,{colvis:function(b,a){return{extend:"collection",
text:function(a){return a.i18n("buttons.colvis","Column visibility")},className:"buttons-colvis",buttons:[{extend:"columnsToggle",columns:a.columns,columnText:a.columnText}]}},columnsToggle:function(b,a){return b.columns(a.columns).indexes().map(function(b){return{extend:"columnToggle",columns:b,columnText:a.columnText}}).toArray()},columnToggle:function(b,a){return{extend:"columnVisibility",columns:a.columns,columnText:a.columnText}},columnsVisibility:function(b,a){return b.columns(a.columns).indexes().map(function(b){return{extend:"columnVisibility",
columns:b,visibility:a.visibility,columnText:a.columnText}}).toArray()},columnVisibility:{columns:h,text:function(b,a,d){return d._columnText(b,d)},className:"buttons-columnVisibility",action:function(b,a,d,g){b=a.columns(g.columns);a=b.visible();b.visible(g.visibility!==h?g.visibility:!(a.length&&a[0]))},init:function(b,a,d){var g=this;a.attr("data-cv-idx",d.columns);b.on("column-visibility.dt"+d.namespace,function(a,c){c.bDestroying||c.nTable!=b.settings()[0].nTable||g.active(b.column(d.columns).visible())}).on("column-reorder.dt"+
d.namespace,function(c,g,e){1===b.columns(d.columns).count()&&(d.columns=f.inArray(d.columns,e.mapping),a.attr("data-cv-idx",d.columns),a.parent().children("[data-cv-idx]").sort(function(a,b){return 1*a.getAttribute("data-cv-idx")-1*b.getAttribute("data-cv-idx")}).appendTo(a.parent()))});this.active(b.column(d.columns).visible())},destroy:function(b,a,d){b.off("column-visibility.dt"+d.namespace).off("column-reorder.dt"+d.namespace)},_columnText:function(b,a){var d=b.column(a.columns).index(),c=b.settings()[0].aoColumns[d].sTitle.replace(/\n/g,
" ").replace(/<br\s*\/?>/gi," ").replace(/<select(.*?)<\/select>/g,"").replace(/<!\-\-.*?\-\->/g,"").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,"");return a.columnText?a.columnText(b,d,c):c}},colvisRestore:{className:"buttons-colvisRestore",text:function(b){return b.i18n("buttons.colvisRestore","Restore visibility")},init:function(b,a,d){d._visOriginal=b.columns().indexes().map(function(a){return b.column(a).visible()}).toArray()},action:function(b,a,d,c){a.columns().every(function(b){b=a.colReorder&&
a.colReorder.transpose?a.colReorder.transpose(b,"toOriginal"):b;this.visible(c._visOriginal[b])})}},colvisGroup:{className:"buttons-colvisGroup",action:function(b,a,d,c){a.columns(c.show).visible(!0,!1);a.columns(c.hide).visible(!1,!1);a.columns.adjust()},show:[],hide:[]}});return c.Buttons});
/*!
ColReorder 1.5.0
©2010-2018 SpryMedia Ltd - datatables.net/license
*/
(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(o){return e(o,window,document)}):"object"===typeof exports?module.exports=function(o,l){o||(o=window);if(!l||!l.fn.dataTable)l=require("datatables.net")(o,l).$;return e(l,o,o.document)}:e(jQuery,window,document)})(function(e,o,l,r){function q(a){for(var b=[],c=0,f=a.length;c<f;c++)b[a[c]]=c;return b}function p(a,b,c){b=a.splice(b,1)[0];a.splice(c,0,b)}function s(a,b,c){for(var f=[],e=0,d=a.childNodes.length;e<
d;e++)1==a.childNodes[e].nodeType&&f.push(a.childNodes[e]);b=f[b];null!==c?a.insertBefore(b,f[c]):a.appendChild(b)}var t=e.fn.dataTable;e.fn.dataTableExt.oApi.fnColReorder=function(a,b,c,f,g){var d,h,j,m,i,l=a.aoColumns.length,k;i=function(a,b,c){if(a[b]&&"function"!==typeof a[b]){var d=a[b].split("."),f=d.shift();isNaN(1*f)||(a[b]=c[1*f]+"."+d.join("."))}};if(b!=c)if(0>b||b>=l)this.oApi._fnLog(a,1,"ColReorder 'from' index is out of bounds: "+b);else if(0>c||c>=l)this.oApi._fnLog(a,1,"ColReorder 'to' index is out of bounds: "+
c);else{j=[];d=0;for(h=l;d<h;d++)j[d]=d;p(j,b,c);var n=q(j);d=0;for(h=a.aaSorting.length;d<h;d++)a.aaSorting[d][0]=n[a.aaSorting[d][0]];if(null!==a.aaSortingFixed){d=0;for(h=a.aaSortingFixed.length;d<h;d++)a.aaSortingFixed[d][0]=n[a.aaSortingFixed[d][0]]}d=0;for(h=l;d<h;d++){k=a.aoColumns[d];j=0;for(m=k.aDataSort.length;j<m;j++)k.aDataSort[j]=n[k.aDataSort[j]];k.idx=n[k.idx]}e.each(a.aLastSort,function(b,c){a.aLastSort[b].src=n[c.src]});d=0;for(h=l;d<h;d++)k=a.aoColumns[d],"number"==typeof k.mData?
k.mData=n[k.mData]:e.isPlainObject(k.mData)&&(i(k.mData,"_",n),i(k.mData,"filter",n),i(k.mData,"sort",n),i(k.mData,"type",n));if(a.aoColumns[b].bVisible){i=this.oApi._fnColumnIndexToVisible(a,b);m=null;for(d=c<b?c:c+1;null===m&&d<l;)m=this.oApi._fnColumnIndexToVisible(a,d),d++;j=a.nTHead.getElementsByTagName("tr");d=0;for(h=j.length;d<h;d++)s(j[d],i,m);if(null!==a.nTFoot){j=a.nTFoot.getElementsByTagName("tr");d=0;for(h=j.length;d<h;d++)s(j[d],i,m)}d=0;for(h=a.aoData.length;d<h;d++)null!==a.aoData[d].nTr&&
s(a.aoData[d].nTr,i,m)}p(a.aoColumns,b,c);d=0;for(h=l;d<h;d++)a.oApi._fnColumnOptions(a,d,{});p(a.aoPreSearchCols,b,c);d=0;for(h=a.aoData.length;d<h;d++){m=a.aoData[d];if(k=m.anCells){p(k,b,c);j=0;for(i=k.length;j<i;j++)k[j]&&k[j]._DT_CellIndex&&(k[j]._DT_CellIndex.column=j)}"dom"!==m.src&&e.isArray(m._aData)&&p(m._aData,b,c)}d=0;for(h=a.aoHeader.length;d<h;d++)p(a.aoHeader[d],b,c);if(null!==a.aoFooter){d=0;for(h=a.aoFooter.length;d<h;d++)p(a.aoFooter[d],b,c)}(g||g===r)&&e.fn.dataTable.Api(a).rows().invalidate();
d=0;for(h=l;d<h;d++)e(a.aoColumns[d].nTh).off(".DT"),this.oApi._fnSortAttachListener(a,a.aoColumns[d].nTh,d);e(a.oInstance).trigger("column-reorder.dt",[a,{from:b,to:c,mapping:n,drop:f,iFrom:b,iTo:c,aiInvertMapping:n}])}};var i=function(a,b){var c=(new e.fn.dataTable.Api(a)).settings()[0];if(c._colReorder)return c._colReorder;!0===b&&(b={});var f=e.fn.dataTable.camelToHungarian;f&&(f(i.defaults,i.defaults,!0),f(i.defaults,b||{}));this.s={dt:null,enable:null,init:e.extend(!0,{},i.defaults,b),fixed:0,
fixedRight:0,reorderCallback:null,mouse:{startX:-1,startY:-1,offsetX:-1,offsetY:-1,target:-1,targetIndex:-1,fromIndex:-1},aoTargets:[]};this.dom={drag:null,pointer:null};this.s.enable=this.s.init.bEnable;this.s.dt=c;this.s.dt._colReorder=this;this._fnConstruct();return this};e.extend(i.prototype,{fnEnable:function(a){if(!1===a)return fnDisable();this.s.enable=!0},fnDisable:function(){this.s.enable=!1},fnReset:function(){this._fnOrderColumns(this.fnOrder());return this},fnGetCurrentOrder:function(){return this.fnOrder()},
fnOrder:function(a,b){var c=[],f,g,d=this.s.dt.aoColumns;if(a===r){f=0;for(g=d.length;f<g;f++)c.push(d[f]._ColReorder_iOrigCol);return c}if(b){d=this.fnOrder();f=0;for(g=a.length;f<g;f++)c.push(e.inArray(a[f],d));a=c}this._fnOrderColumns(q(a));return this},fnTranspose:function(a,b){b||(b="toCurrent");var c=this.fnOrder(),f=this.s.dt.aoColumns;return"toCurrent"===b?!e.isArray(a)?e.inArray(a,c):e.map(a,function(a){return e.inArray(a,c)}):!e.isArray(a)?f[a]._ColReorder_iOrigCol:e.map(a,function(a){return f[a]._ColReorder_iOrigCol})},
_fnConstruct:function(){var a=this,b=this.s.dt.aoColumns.length,c=this.s.dt.nTable,f;this.s.init.iFixedColumns&&(this.s.fixed=this.s.init.iFixedColumns);this.s.init.iFixedColumnsLeft&&(this.s.fixed=this.s.init.iFixedColumnsLeft);this.s.fixedRight=this.s.init.iFixedColumnsRight?this.s.init.iFixedColumnsRight:0;this.s.init.fnReorderCallback&&(this.s.reorderCallback=this.s.init.fnReorderCallback);for(f=0;f<b;f++)f>this.s.fixed-1&&f<b-this.s.fixedRight&&this._fnMouseListener(f,this.s.dt.aoColumns[f].nTh),
this.s.dt.aoColumns[f]._ColReorder_iOrigCol=f;this.s.dt.oApi._fnCallbackReg(this.s.dt,"aoStateSaveParams",function(b,c){a._fnStateSave.call(a,c)},"ColReorder_State");var g=null;this.s.init.aiOrder&&(g=this.s.init.aiOrder.slice());this.s.dt.oLoadedState&&("undefined"!=typeof this.s.dt.oLoadedState.ColReorder&&this.s.dt.oLoadedState.ColReorder.length==this.s.dt.aoColumns.length)&&(g=this.s.dt.oLoadedState.ColReorder);if(g)if(a.s.dt._bInitComplete)b=q(g),a._fnOrderColumns.call(a,b);else{var d=!1;e(c).on("draw.dt.colReorder",
function(){if(!a.s.dt._bInitComplete&&!d){d=true;var b=q(g);a._fnOrderColumns.call(a,b)}})}else this._fnSetColumnIndexes();e(c).on("destroy.dt.colReorder",function(){e(c).off("destroy.dt.colReorder draw.dt.colReorder");e.each(a.s.dt.aoColumns,function(a,b){e(b.nTh).off(".ColReorder");e(b.nTh).removeAttr("data-column-index")});a.s.dt._colReorder=null;a.s=null})},_fnOrderColumns:function(a){var b=!1;if(a.length!=this.s.dt.aoColumns.length)this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"ColReorder - array reorder does not match known number of columns. Skipping.");
else{for(var c=0,f=a.length;c<f;c++){var g=e.inArray(c,a);c!=g&&(p(a,g,c),this.s.dt.oInstance.fnColReorder(g,c,!0,!1),b=!0)}this._fnSetColumnIndexes();b&&(e.fn.dataTable.Api(this.s.dt).rows().invalidate(),(""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY)&&this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))}},_fnStateSave:function(a){var b,c,f,g=this.s.dt.aoColumns;a.ColReorder=[];if(a.aaSorting){for(b=
0;b<a.aaSorting.length;b++)a.aaSorting[b][0]=g[a.aaSorting[b][0]]._ColReorder_iOrigCol;var d=e.extend(!0,[],a.aoSearchCols);b=0;for(c=g.length;b<c;b++)f=g[b]._ColReorder_iOrigCol,a.aoSearchCols[f]=d[b],a.abVisCols[f]=g[b].bVisible,a.ColReorder.push(f)}else if(a.order){for(b=0;b<a.order.length;b++)a.order[b][0]=g[a.order[b][0]]._ColReorder_iOrigCol;d=e.extend(!0,[],a.columns);b=0;for(c=g.length;b<c;b++)f=g[b]._ColReorder_iOrigCol,a.columns[f]=d[b],a.ColReorder.push(f)}},_fnMouseListener:function(a,
b){var c=this;e(b).on("mousedown.ColReorder",function(a){c.s.enable&&c._fnMouseDown.call(c,a,b)}).on("touchstart.ColReorder",function(a){c.s.enable&&c._fnMouseDown.call(c,a,b)})},_fnMouseDown:function(a,b){var c=this,f=e(a.target).closest("th, td").offset(),g=parseInt(e(b).attr("data-column-index"),10);g!==r&&(this.s.mouse.startX=this._fnCursorPosition(a,"pageX"),this.s.mouse.startY=this._fnCursorPosition(a,"pageY"),this.s.mouse.offsetX=this._fnCursorPosition(a,"pageX")-f.left,this.s.mouse.offsetY=
this._fnCursorPosition(a,"pageY")-f.top,this.s.mouse.target=this.s.dt.aoColumns[g].nTh,this.s.mouse.targetIndex=g,this.s.mouse.fromIndex=g,this._fnRegions(),e(l).on("mousemove.ColReorder touchmove.ColReorder",function(a){c._fnMouseMove.call(c,a)}).on("mouseup.ColReorder touchend.ColReorder",function(a){c._fnMouseUp.call(c,a)}))},_fnMouseMove:function(a){if(null===this.dom.drag){if(5>Math.pow(Math.pow(this._fnCursorPosition(a,"pageX")-this.s.mouse.startX,2)+Math.pow(this._fnCursorPosition(a,"pageY")-
this.s.mouse.startY,2),0.5))return;this._fnCreateDragNode()}this.dom.drag.css({left:this._fnCursorPosition(a,"pageX")-this.s.mouse.offsetX,top:this._fnCursorPosition(a,"pageY")-this.s.mouse.offsetY});for(var b=!1,c=this.s.mouse.toIndex,f=1,e=this.s.aoTargets.length;f<e;f++)if(this._fnCursorPosition(a,"pageX")<this.s.aoTargets[f-1].x+(this.s.aoTargets[f].x-this.s.aoTargets[f-1].x)/2){this.dom.pointer.css("left",this.s.aoTargets[f-1].x);this.s.mouse.toIndex=this.s.aoTargets[f-1].to;b=!0;break}b||(this.dom.pointer.css("left",
this.s.aoTargets[this.s.aoTargets.length-1].x),this.s.mouse.toIndex=this.s.aoTargets[this.s.aoTargets.length-1].to);this.s.init.bRealtime&&c!==this.s.mouse.toIndex&&(this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex),this.s.mouse.fromIndex=this.s.mouse.toIndex,(""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY)&&this.s.dt.oInstance.fnAdjustColumnSizing(!1),this._fnRegions())},_fnMouseUp:function(){e(l).off(".ColReorder");null!==this.dom.drag&&(this.dom.drag.remove(),
this.dom.pointer.remove(),this.dom.drag=null,this.dom.pointer=null,this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex,this.s.mouse.toIndex,!0),this._fnSetColumnIndexes(),(""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY)&&this.s.dt.oInstance.fnAdjustColumnSizing(!1),this.s.dt.oInstance.oApi._fnSaveState(this.s.dt),null!==this.s.reorderCallback&&this.s.reorderCallback.call(this))},_fnRegions:function(){var a=this.s.dt.aoColumns;this.s.aoTargets.splice(0,this.s.aoTargets.length);this.s.aoTargets.push({x:e(this.s.dt.nTable).offset().left,
to:0});for(var b=0,c=this.s.aoTargets[0].x,f=0,g=a.length;f<g;f++)f!=this.s.mouse.fromIndex&&b++,a[f].bVisible&&"none"!==a[f].nTh.style.display&&(c+=e(a[f].nTh).outerWidth(),this.s.aoTargets.push({x:c,to:b}));0!==this.s.fixedRight&&this.s.aoTargets.splice(this.s.aoTargets.length-this.s.fixedRight);0!==this.s.fixed&&this.s.aoTargets.splice(0,this.s.fixed)},_fnCreateDragNode:function(){var a=""!==this.s.dt.oScroll.sX||""!==this.s.dt.oScroll.sY,b=this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh,c=b.parentNode,
f=c.parentNode,g=f.parentNode,d=e(b).clone();this.dom.drag=e(g.cloneNode(!1)).addClass("DTCR_clonedTable").append(e(f.cloneNode(!1)).append(e(c.cloneNode(!1)).append(d[0]))).css({position:"absolute",top:0,left:0,width:e(b).outerWidth(),height:e(b).outerHeight()}).appendTo("body");this.dom.pointer=e("<div></div>").addClass("DTCR_pointer").css({position:"absolute",top:a?e("div.dataTables_scroll",this.s.dt.nTableWrapper).offset().top:e(this.s.dt.nTable).offset().top,height:a?e("div.dataTables_scroll",
this.s.dt.nTableWrapper).height():e(this.s.dt.nTable).height()}).appendTo("body")},_fnSetColumnIndexes:function(){e.each(this.s.dt.aoColumns,function(a,b){e(b.nTh).attr("data-column-index",a)})},_fnCursorPosition:function(a,b){return-1!==a.type.indexOf("touch")?a.originalEvent.touches[0][b]:a[b]}});i.defaults={aiOrder:null,bEnable:!0,bRealtime:!0,iFixedColumnsLeft:0,iFixedColumnsRight:0,fnReorderCallback:null};i.version="1.5.0";e.fn.dataTable.ColReorder=i;e.fn.DataTable.ColReorder=i;"function"==typeof e.fn.dataTable&&
"function"==typeof e.fn.dataTableExt.fnVersionCheck&&e.fn.dataTableExt.fnVersionCheck("1.10.8")?e.fn.dataTableExt.aoFeatures.push({fnInit:function(a){var b=a.oInstance;a._colReorder?b.oApi._fnLog(a,1,"ColReorder attempted to initialise twice. Ignoring second"):(b=a.oInit,new i(a,b.colReorder||b.oColReorder||{}));return null},cFeature:"R",sFeature:"ColReorder"}):alert("Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download");e(l).on("preInit.dt.colReorder",function(a,
b){if("dt"===a.namespace){var c=b.oInit.colReorder,f=t.defaults.colReorder;if(c||f)f=e.extend({},c,f),!1!==c&&new i(b,f)}});e.fn.dataTable.Api.register("colReorder.reset()",function(){return this.iterator("table",function(a){a._colReorder.fnReset()})});e.fn.dataTable.Api.register("colReorder.order()",function(a,b){return a?this.iterator("table",function(c){c._colReorder.fnOrder(a,b)}):this.context.length?this.context[0]._colReorder.fnOrder():null});e.fn.dataTable.Api.register("colReorder.transpose()",
function(a,b){return this.context.length&&this.context[0]._colReorder?this.context[0]._colReorder.fnTranspose(a,b):a});e.fn.dataTable.Api.register("colReorder.move()",function(a,b,c,e){this.context.length&&this.context[0]._colReorder.s.dt.oInstance.fnColReorder(a,b,c,e);return this});e.fn.dataTable.Api.register("colReorder.enable()",function(a){return this.iterator("table",function(b){b._colReorder&&b._colReorder.fnEnable(a)})});e.fn.dataTable.Api.register("colReorder.disable()",function(){return this.iterator("table",
function(a){a._colReorder&&a._colReorder.fnDisable()})});return i});
/*!
FixedColumns 3.2.5
©2010-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(p){return d(p,window,document)}):"object"===typeof exports?module.exports=function(p,r){p||(p=window);if(!r||!r.fn.dataTable)r=require("datatables.net")(p,r).$;return d(r,p,p.document)}:d(jQuery,window,document)})(function(d,p,r,t){var s=d.fn.dataTable,u,m=function(a,b){var c=this;if(this instanceof m){if(b===t||!0===b)b={};var e=d.fn.dataTable.camelToHungarian;e&&(e(m.defaults,m.defaults,!0),e(m.defaults,
b));e=(new d.fn.dataTable.Api(a)).settings()[0];this.s={dt:e,iTableColumns:e.aoColumns.length,aiOuterWidths:[],aiInnerWidths:[],rtl:"rtl"===d(e.nTable).css("direction")};this.dom={scroller:null,header:null,body:null,footer:null,grid:{wrapper:null,dt:null,left:{wrapper:null,head:null,body:null,foot:null},right:{wrapper:null,head:null,body:null,foot:null}},clone:{left:{header:null,body:null,footer:null},right:{header:null,body:null,footer:null}}};if(e._oFixedColumns)throw"FixedColumns already initialised on this table";
e._oFixedColumns=this;e._bInitComplete?this._fnConstruct(b):e.oApi._fnCallbackReg(e,"aoInitComplete",function(){c._fnConstruct(b)},"FixedColumns")}else alert("FixedColumns warning: FixedColumns must be initialised with the 'new' keyword.")};d.extend(m.prototype,{fnUpdate:function(){this._fnDraw(!0)},fnRedrawLayout:function(){this._fnColCalc();this._fnGridLayout();this.fnUpdate()},fnRecalculateHeight:function(a){delete a._DTTC_iHeight;a.style.height="auto"},fnSetRowHeight:function(a,b){a.style.height=
b+"px"},fnGetPosition:function(a){var b=this.s.dt.oInstance;if(d(a).parents(".DTFC_Cloned").length){if("tr"===a.nodeName.toLowerCase())return a=d(a).index(),b.fnGetPosition(d("tr",this.s.dt.nTBody)[a]);var c=d(a).index(),a=d(a.parentNode).index();return[b.fnGetPosition(d("tr",this.s.dt.nTBody)[a]),c,b.oApi._fnVisibleToColumnIndex(this.s.dt,c)]}return b.fnGetPosition(a)},_fnConstruct:function(a){var b=this;if("function"!=typeof this.s.dt.oInstance.fnVersionCheck||!0!==this.s.dt.oInstance.fnVersionCheck("1.8.0"))alert("FixedColumns "+
m.VERSION+" required DataTables 1.8.0 or later. Please upgrade your DataTables installation");else if(""===this.s.dt.oScroll.sX)this.s.dt.oInstance.oApi._fnLog(this.s.dt,1,"FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use 'FixedHeader' for column fixing when scrolling is not enabled");else{this.s=d.extend(!0,this.s,m.defaults,a);a=this.s.dt.oClasses;this.dom.grid.dt=d(this.s.dt.nTable).parents("div."+a.sScrollWrapper)[0];this.dom.scroller=d("div."+
a.sScrollBody,this.dom.grid.dt)[0];this._fnColCalc();this._fnGridSetup();var c,e=!1;d(this.s.dt.nTableWrapper).on("mousedown.DTFC",function(a){0===a.button&&(e=!0,d(r).one("mouseup",function(){e=!1}))});d(this.dom.scroller).on("mouseover.DTFC touchstart.DTFC",function(){e||(c="main")}).on("scroll.DTFC",function(a){!c&&a.originalEvent&&(c="main");if("main"===c&&(0<b.s.iLeftColumns&&(b.dom.grid.left.liner.scrollTop=b.dom.scroller.scrollTop),0<b.s.iRightColumns))b.dom.grid.right.liner.scrollTop=b.dom.scroller.scrollTop});
var f="onwheel"in r.createElement("div")?"wheel.DTFC":"mousewheel.DTFC";if(0<b.s.iLeftColumns)d(b.dom.grid.left.liner).on("mouseover.DTFC touchstart.DTFC",function(){e||(c="left")}).on("scroll.DTFC",function(a){!c&&a.originalEvent&&(c="left");"left"===c&&(b.dom.scroller.scrollTop=b.dom.grid.left.liner.scrollTop,0<b.s.iRightColumns&&(b.dom.grid.right.liner.scrollTop=b.dom.grid.left.liner.scrollTop))}).on(f,function(a){b.dom.scroller.scrollLeft-="wheel"===a.type?-a.originalEvent.deltaX:a.originalEvent.wheelDeltaX});
if(0<b.s.iRightColumns)d(b.dom.grid.right.liner).on("mouseover.DTFC touchstart.DTFC",function(){e||(c="right")}).on("scroll.DTFC",function(a){!c&&a.originalEvent&&(c="right");"right"===c&&(b.dom.scroller.scrollTop=b.dom.grid.right.liner.scrollTop,0<b.s.iLeftColumns&&(b.dom.grid.left.liner.scrollTop=b.dom.grid.right.liner.scrollTop))}).on(f,function(a){b.dom.scroller.scrollLeft-="wheel"===a.type?-a.originalEvent.deltaX:a.originalEvent.wheelDeltaX});d(p).on("resize.DTFC",function(){b._fnGridLayout.call(b)});
var g=!0,h=d(this.s.dt.nTable);h.on("draw.dt.DTFC",function(){b._fnColCalc();b._fnDraw.call(b,g);g=!1}).on("column-sizing.dt.DTFC",function(){b._fnColCalc();b._fnGridLayout(b)}).on("column-visibility.dt.DTFC",function(a,c,d,e,f){if(f===t||f)b._fnColCalc(),b._fnGridLayout(b),b._fnDraw(!0)}).on("select.dt.DTFC deselect.dt.DTFC",function(a){"dt"===a.namespace&&b._fnDraw(!1)}).on("destroy.dt.DTFC",function(){h.off(".DTFC");d(b.dom.scroller).off(".DTFC");d(p).off(".DTFC");d(b.s.dt.nTableWrapper).off(".DTFC");
d(b.dom.grid.left.liner).off(".DTFC "+f);d(b.dom.grid.left.wrapper).remove();d(b.dom.grid.right.liner).off(".DTFC "+f);d(b.dom.grid.right.wrapper).remove()});this._fnGridLayout();this.s.dt.oInstance.fnDraw(!1)}},_fnColCalc:function(){var a=this,b=0,c=0;this.s.aiInnerWidths=[];this.s.aiOuterWidths=[];d.each(this.s.dt.aoColumns,function(e,f){var g=d(f.nTh),h;if(g.filter(":visible").length){var i=g.outerWidth();0===a.s.aiOuterWidths.length&&(h=d(a.s.dt.nTable).css("border-left-width"),i+="string"===
typeof h&&-1===h.indexOf("px")?1:parseInt(h,10));a.s.aiOuterWidths.length===a.s.dt.aoColumns.length-1&&(h=d(a.s.dt.nTable).css("border-right-width"),i+="string"===typeof h&&-1===h.indexOf("px")?1:parseInt(h,10));a.s.aiOuterWidths.push(i);a.s.aiInnerWidths.push(g.width());e<a.s.iLeftColumns&&(b+=i);a.s.iTableColumns-a.s.iRightColumns<=e&&(c+=i)}else a.s.aiInnerWidths.push(0),a.s.aiOuterWidths.push(0)});this.s.iLeftWidth=b;this.s.iRightWidth=c},_fnGridSetup:function(){var a=this._fnDTOverflow(),b;this.dom.body=
this.s.dt.nTable;this.dom.header=this.s.dt.nTHead.parentNode;this.dom.header.parentNode.parentNode.style.position="relative";var c=d('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;" aria-hidden="true"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; right:0;" aria-hidden="true"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div></div></div>')[0],
e=c.childNodes[0],f=c.childNodes[1];this.dom.grid.dt.parentNode.insertBefore(c,this.dom.grid.dt);c.appendChild(this.dom.grid.dt);this.dom.grid.wrapper=c;0<this.s.iLeftColumns&&(this.dom.grid.left.wrapper=e,this.dom.grid.left.head=e.childNodes[0],this.dom.grid.left.body=e.childNodes[1],this.dom.grid.left.liner=d("div.DTFC_LeftBodyLiner",c)[0],c.appendChild(e));0<this.s.iRightColumns&&(this.dom.grid.right.wrapper=f,this.dom.grid.right.head=f.childNodes[0],this.dom.grid.right.body=f.childNodes[1],this.dom.grid.right.liner=
d("div.DTFC_RightBodyLiner",c)[0],f.style.right=a.bar+"px",b=d("div.DTFC_RightHeadBlocker",c)[0],b.style.width=a.bar+"px",b.style.right=-a.bar+"px",this.dom.grid.right.headBlock=b,b=d("div.DTFC_RightFootBlocker",c)[0],b.style.width=a.bar+"px",b.style.right=-a.bar+"px",this.dom.grid.right.footBlock=b,c.appendChild(f));if(this.s.dt.nTFoot&&(this.dom.footer=this.s.dt.nTFoot.parentNode,0<this.s.iLeftColumns&&(this.dom.grid.left.foot=e.childNodes[2]),0<this.s.iRightColumns))this.dom.grid.right.foot=f.childNodes[2];
this.s.rtl&&d("div.DTFC_RightHeadBlocker",c).css({left:-a.bar+"px",right:""})},_fnGridLayout:function(){var a=this,b=this.dom.grid;d(b.wrapper).width();var c=this.s.dt.nTable.parentNode.offsetHeight,e=this.s.dt.nTable.parentNode.parentNode.offsetHeight,f=this._fnDTOverflow(),g=this.s.iLeftWidth,h=this.s.iRightWidth,i="rtl"===d(this.dom.body).css("direction"),j=function(b,c){f.bar?a._firefoxScrollError()?34<d(b).height()&&(b.style.width=c+f.bar+"px"):b.style.width=c+f.bar+"px":(b.style.width=c+20+
"px",b.style.paddingRight="20px",b.style.boxSizing="border-box")};f.x&&(c-=f.bar);b.wrapper.style.height=e+"px";0<this.s.iLeftColumns&&(e=b.left.wrapper,e.style.width=g+"px",e.style.height="1px",i?(e.style.left="",e.style.right=0):(e.style.left=0,e.style.right=""),b.left.body.style.height=c+"px",b.left.foot&&(b.left.foot.style.top=(f.x?f.bar:0)+"px"),j(b.left.liner,g),b.left.liner.style.height=c+"px",b.left.liner.style.maxHeight=c+"px");0<this.s.iRightColumns&&(e=b.right.wrapper,e.style.width=h+"px",
e.style.height="1px",this.s.rtl?(e.style.left=f.y?f.bar+"px":0,e.style.right=""):(e.style.left="",e.style.right=f.y?f.bar+"px":0),b.right.body.style.height=c+"px",b.right.foot&&(b.right.foot.style.top=(f.x?f.bar:0)+"px"),j(b.right.liner,h),b.right.liner.style.height=c+"px",b.right.liner.style.maxHeight=c+"px",b.right.headBlock.style.display=f.y?"block":"none",b.right.footBlock.style.display=f.y?"block":"none")},_fnDTOverflow:function(){var a=this.s.dt.nTable,b=a.parentNode,c={x:!1,y:!1,bar:this.s.dt.oScroll.iBarWidth};
a.offsetWidth>b.clientWidth&&(c.x=!0);a.offsetHeight>b.clientHeight&&(c.y=!0);return c},_fnDraw:function(a){this._fnGridLayout();this._fnCloneLeft(a);this._fnCloneRight(a);null!==this.s.fnDrawCallback&&this.s.fnDrawCallback.call(this,this.dom.clone.left,this.dom.clone.right);d(this).trigger("draw.dtfc",{leftClone:this.dom.clone.left,rightClone:this.dom.clone.right})},_fnCloneRight:function(a){if(!(0>=this.s.iRightColumns)){var b,c=[];for(b=this.s.iTableColumns-this.s.iRightColumns;b<this.s.iTableColumns;b++)this.s.dt.aoColumns[b].bVisible&&
c.push(b);this._fnClone(this.dom.clone.right,this.dom.grid.right,c,a)}},_fnCloneLeft:function(a){if(!(0>=this.s.iLeftColumns)){var b,c=[];for(b=0;b<this.s.iLeftColumns;b++)this.s.dt.aoColumns[b].bVisible&&c.push(b);this._fnClone(this.dom.clone.left,this.dom.grid.left,c,a)}},_fnCopyLayout:function(a,b,c){for(var e=[],f=[],g=[],h=0,i=a.length;h<i;h++){var j=[];j.nTr=d(a[h].nTr).clone(c,!1)[0];for(var l=0,o=this.s.iTableColumns;l<o;l++)if(-1!==d.inArray(l,b)){var q=d.inArray(a[h][l].cell,g);-1===q?(q=
d(a[h][l].cell).clone(c,!1)[0],f.push(q),g.push(a[h][l].cell),j.push({cell:q,unique:a[h][l].unique})):j.push({cell:f[q],unique:a[h][l].unique})}e.push(j)}return e},_fnClone:function(a,b,c,e){var f=this,g,h,i,j,l,o,q,n,m,k=this.s.dt;if(e){d(a.header).remove();a.header=d(this.dom.header).clone(!0,!1)[0];a.header.className+=" DTFC_Cloned";a.header.style.width="100%";b.head.appendChild(a.header);n=this._fnCopyLayout(k.aoHeader,c,!0);j=d(">thead",a.header);j.empty();g=0;for(h=n.length;g<h;g++)j[0].appendChild(n[g].nTr);
k.oApi._fnDrawHead(k,n,!0)}else{n=this._fnCopyLayout(k.aoHeader,c,!1);m=[];k.oApi._fnDetectHeader(m,d(">thead",a.header)[0]);g=0;for(h=n.length;g<h;g++){i=0;for(j=n[g].length;i<j;i++)m[g][i].cell.className=n[g][i].cell.className,d("span.DataTables_sort_icon",m[g][i].cell).each(function(){this.className=d("span.DataTables_sort_icon",n[g][i].cell)[0].className})}}this._fnEqualiseHeights("thead",this.dom.header,a.header);"auto"==this.s.sHeightMatch&&d(">tbody>tr",f.dom.body).css("height","auto");null!==
a.body&&(d(a.body).remove(),a.body=null);a.body=d(this.dom.body).clone(!0)[0];a.body.className+=" DTFC_Cloned";a.body.style.paddingBottom=k.oScroll.iBarWidth+"px";a.body.style.marginBottom=2*k.oScroll.iBarWidth+"px";null!==a.body.getAttribute("id")&&a.body.removeAttribute("id");d(">thead>tr",a.body).empty();d(">tfoot",a.body).remove();var p=d("tbody",a.body)[0];d(p).empty();if(0<k.aiDisplay.length){h=d(">thead>tr",a.body)[0];for(q=0;q<c.length;q++)l=c[q],o=d(k.aoColumns[l].nTh).clone(!0)[0],o.innerHTML=
"",j=o.style,j.paddingTop="0",j.paddingBottom="0",j.borderTopWidth="0",j.borderBottomWidth="0",j.height=0,j.width=f.s.aiInnerWidths[l]+"px",h.appendChild(o);d(">tbody>tr",f.dom.body).each(function(a){var a=f.s.dt.oFeatures.bServerSide===false?f.s.dt.aiDisplay[f.s.dt._iDisplayStart+a]:a,b=f.s.dt.aoData[a].anCells||d(this).children("td, th"),e=this.cloneNode(false);e.removeAttribute("id");e.setAttribute("data-dt-row",a);for(q=0;q<c.length;q++){l=c[q];if(b.length>0){o=d(b[l]).clone(true,true)[0];o.removeAttribute("id");
o.setAttribute("data-dt-row",a);o.setAttribute("data-dt-column",l);e.appendChild(o)}}p.appendChild(e)})}else d(">tbody>tr",f.dom.body).each(function(){o=this.cloneNode(true);o.className=o.className+" DTFC_NoData";d("td",o).html("");p.appendChild(o)});a.body.style.width="100%";a.body.style.margin="0";a.body.style.padding="0";k.oScroller!==t&&(h=k.oScroller.dom.force,b.forcer?b.forcer.style.height=h.style.height:(b.forcer=h.cloneNode(!0),b.liner.appendChild(b.forcer)));b.liner.appendChild(a.body);this._fnEqualiseHeights("tbody",
f.dom.body,a.body);if(null!==k.nTFoot){if(e){null!==a.footer&&a.footer.parentNode.removeChild(a.footer);a.footer=d(this.dom.footer).clone(!0,!0)[0];a.footer.className+=" DTFC_Cloned";a.footer.style.width="100%";b.foot.appendChild(a.footer);n=this._fnCopyLayout(k.aoFooter,c,!0);b=d(">tfoot",a.footer);b.empty();g=0;for(h=n.length;g<h;g++)b[0].appendChild(n[g].nTr);k.oApi._fnDrawHead(k,n,!0)}else{n=this._fnCopyLayout(k.aoFooter,c,!1);b=[];k.oApi._fnDetectHeader(b,d(">tfoot",a.footer)[0]);g=0;for(h=n.length;g<
h;g++){i=0;for(j=n[g].length;i<j;i++)b[g][i].cell.className=n[g][i].cell.className}}this._fnEqualiseHeights("tfoot",this.dom.footer,a.footer)}b=k.oApi._fnGetUniqueThs(k,d(">thead",a.header)[0]);d(b).each(function(a){l=c[a];this.style.width=f.s.aiInnerWidths[l]+"px"});null!==f.s.dt.nTFoot&&(b=k.oApi._fnGetUniqueThs(k,d(">tfoot",a.footer)[0]),d(b).each(function(a){l=c[a];this.style.width=f.s.aiInnerWidths[l]+"px"}))},_fnGetTrNodes:function(a){for(var b=[],c=0,d=a.childNodes.length;c<d;c++)"TR"==a.childNodes[c].nodeName.toUpperCase()&&
b.push(a.childNodes[c]);return b},_fnEqualiseHeights:function(a,b,c){if(!("none"==this.s.sHeightMatch&&"thead"!==a&&"tfoot"!==a)){var e,f,g=b.getElementsByTagName(a)[0],c=c.getElementsByTagName(a)[0],a=d(">"+a+">tr:eq(0)",b).children(":first");a.outerHeight();a.height();for(var g=this._fnGetTrNodes(g),b=this._fnGetTrNodes(c),h=[],c=0,a=b.length;c<a;c++)e=g[c].offsetHeight,f=b[c].offsetHeight,e=f>e?f:e,"semiauto"==this.s.sHeightMatch&&(g[c]._DTTC_iHeight=e),h.push(e);c=0;for(a=b.length;c<a;c++)b[c].style.height=
h[c]+"px",g[c].style.height=h[c]+"px"}},_firefoxScrollError:function(){if(u===t){var a=d("<div/>").css({position:"absolute",top:0,left:0,height:10,width:50,overflow:"scroll"}).appendTo("body");u=a[0].clientWidth===a[0].offsetWidth&&0!==this._fnDTOverflow().bar;a.remove()}return u}});m.defaults={iLeftColumns:1,iRightColumns:0,fnDrawCallback:null,sHeightMatch:"semiauto"};m.version="3.2.5";s.Api.register("fixedColumns()",function(){return this});s.Api.register("fixedColumns().update()",function(){return this.iterator("table",
function(a){a._oFixedColumns&&a._oFixedColumns.fnUpdate()})});s.Api.register("fixedColumns().relayout()",function(){return this.iterator("table",function(a){a._oFixedColumns&&a._oFixedColumns.fnRedrawLayout()})});s.Api.register("rows().recalcHeight()",function(){return this.iterator("row",function(a,b){a._oFixedColumns&&a._oFixedColumns.fnRecalculateHeight(this.row(b).node())})});s.Api.register("fixedColumns().rowIndex()",function(a){a=d(a);return a.parents(".DTFC_Cloned").length?this.rows({page:"current"}).indexes()[a.index()]:
this.row(a).index()});s.Api.register("fixedColumns().cellIndex()",function(a){a=d(a);if(a.parents(".DTFC_Cloned").length){var b=a.parent().index(),b=this.rows({page:"current"}).indexes()[b],a=a.parents(".DTFC_LeftWrapper").length?a.index():this.columns().flatten().length-this.context[0]._oFixedColumns.s.iRightColumns+a.index();return{row:b,column:this.column.index("toData",a),columnVisible:a}}return this.cell(a).index()});d(r).on("init.dt.fixedColumns",function(a,b){if("dt"===a.namespace){var c=b.oInit.fixedColumns,
e=s.defaults.fixedColumns;if(c||e)e=d.extend({},c,e),!1!==c&&new m(b,e)}});d.fn.dataTable.FixedColumns=m;return d.fn.DataTable.FixedColumns=m});
/*!
FixedHeader 3.1.4
©2009-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return d(g,window,document)}):"object"===typeof exports?module.exports=function(g,i){g||(g=window);if(!i||!i.fn.dataTable)i=require("datatables.net")(g,i).$;return d(i,g,g.document)}:d(jQuery,window,document)})(function(d,g,i,k){var j=d.fn.dataTable,l=0,h=function(a,b){if(!(this instanceof h))throw"FixedHeader must be initialised with the 'new' keyword.";!0===b&&(b={});a=new j.Api(a);this.c=d.extend(!0,
{},h.defaults,b);this.s={dt:a,position:{theadTop:0,tbodyTop:0,tfootTop:0,tfootBottom:0,width:0,left:0,tfootHeight:0,theadHeight:0,windowHeight:d(g).height(),visible:!0},headerMode:null,footerMode:null,autoWidth:a.settings()[0].oFeatures.bAutoWidth,namespace:".dtfc"+l++,scrollLeft:{header:-1,footer:-1},enable:!0};this.dom={floatingHeader:null,thead:d(a.table().header()),tbody:d(a.table().body()),tfoot:d(a.table().footer()),header:{host:null,floating:null,placeholder:null},footer:{host:null,floating:null,
placeholder:null}};this.dom.header.host=this.dom.thead.parent();this.dom.footer.host=this.dom.tfoot.parent();var e=a.settings()[0];if(e._fixedHeader)throw"FixedHeader already initialised on table "+e.nTable.id;e._fixedHeader=this;this._constructor()};d.extend(h.prototype,{enable:function(a){this.s.enable=a;this.c.header&&this._modeChange("in-place","header",!0);this.c.footer&&this.dom.tfoot.length&&this._modeChange("in-place","footer",!0);this.update()},headerOffset:function(a){a!==k&&(this.c.headerOffset=
a,this.update());return this.c.headerOffset},footerOffset:function(a){a!==k&&(this.c.footerOffset=a,this.update());return this.c.footerOffset},update:function(){this._positions();this._scroll(!0)},_constructor:function(){var a=this,b=this.s.dt;d(g).on("scroll"+this.s.namespace,function(){a._scroll()}).on("resize"+this.s.namespace,j.util.throttle(function(){a.s.position.windowHeight=d(g).height();a.update()},50));var e=d(".fh-fixedHeader");!this.c.headerOffset&&e.length&&(this.c.headerOffset=e.outerHeight());
e=d(".fh-fixedFooter");!this.c.footerOffset&&e.length&&(this.c.footerOffset=e.outerHeight());b.on("column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc responsive-display.dt.dtfc",function(){a.update()});b.on("destroy.dtfc",function(){a.c.header&&a._modeChange("in-place","header",true);a.c.footer&&a.dom.tfoot.length&&a._modeChange("in-place","footer",true);b.off(".dtfc");d(g).off(a.s.namespace)});this._positions();this._scroll()},_clone:function(a,b){var e=this.s.dt,
c=this.dom[a],f="header"===a?this.dom.thead:this.dom.tfoot;!b&&c.floating?c.floating.removeClass("fixedHeader-floating fixedHeader-locked"):(c.floating&&(c.placeholder.remove(),this._unsize(a),c.floating.children().detach(),c.floating.remove()),c.floating=d(e.table().node().cloneNode(!1)).css("table-layout","fixed").attr("aria-hidden","true").removeAttr("id").append(f).appendTo("body"),c.placeholder=f.clone(!1),c.placeholder.find("*[id]").removeAttr("id"),c.host.prepend(c.placeholder),this._matchWidths(c.placeholder,
c.floating))},_matchWidths:function(a,b){var e=function(b){return d(b,a).map(function(){return d(this).width()}).toArray()},c=function(a,c){d(a,b).each(function(a){d(this).css({width:c[a],minWidth:c[a]})})},f=e("th"),e=e("td");c("th",f);c("td",e)},_unsize:function(a){var b=this.dom[a].floating;b&&("footer"===a||"header"===a&&!this.s.autoWidth)?d("th, td",b).css({width:"",minWidth:""}):b&&"header"===a&&d("th, td",b).css("min-width","")},_horizontal:function(a,b){var e=this.dom[a],c=this.s.position,
d=this.s.scrollLeft;e.floating&&d[a]!==b&&(e.floating.css("left",c.left-b),d[a]=b)},_modeChange:function(a,b,e){var c=this.dom[b],f=this.s.position,g=this.dom["footer"===b?"tfoot":"thead"],h=d.contains(g[0],i.activeElement)?i.activeElement:null;h&&h.blur();if("in-place"===a){if(c.placeholder&&(c.placeholder.remove(),c.placeholder=null),this._unsize(b),"header"===b?c.host.prepend(g):c.host.append(g),c.floating)c.floating.remove(),c.floating=null}else"in"===a?(this._clone(b,e),c.floating.addClass("fixedHeader-floating").css("header"===
b?"top":"bottom",this.c[b+"Offset"]).css("left",f.left+"px").css("width",f.width+"px"),"footer"===b&&c.floating.css("top","")):"below"===a?(this._clone(b,e),c.floating.addClass("fixedHeader-locked").css("top",f.tfootTop-f.theadHeight).css("left",f.left+"px").css("width",f.width+"px")):"above"===a&&(this._clone(b,e),c.floating.addClass("fixedHeader-locked").css("top",f.tbodyTop).css("left",f.left+"px").css("width",f.width+"px"));h&&h!==i.activeElement&&setTimeout(function(){h.focus()},10);this.s.scrollLeft.header=
-1;this.s.scrollLeft.footer=-1;this.s[b+"Mode"]=a},_positions:function(){var a=this.s.dt.table(),b=this.s.position,e=this.dom,a=d(a.node()),c=a.children("thead"),f=a.children("tfoot"),e=e.tbody;b.visible=a.is(":visible");b.width=a.outerWidth();b.left=a.offset().left;b.theadTop=c.offset().top;b.tbodyTop=e.offset().top;b.theadHeight=b.tbodyTop-b.theadTop;f.length?(b.tfootTop=f.offset().top,b.tfootBottom=b.tfootTop+f.outerHeight(),b.tfootHeight=b.tfootBottom-b.tfootTop):(b.tfootTop=b.tbodyTop+e.outerHeight(),
b.tfootBottom=b.tfootTop,b.tfootHeight=b.tfootTop)},_scroll:function(a){var b=d(i).scrollTop(),e=d(i).scrollLeft(),c=this.s.position,f;if(this.s.enable&&(this.c.header&&(f=!c.visible||b<=c.theadTop-this.c.headerOffset?"in-place":b<=c.tfootTop-c.theadHeight-this.c.headerOffset?"in":"below",(a||f!==this.s.headerMode)&&this._modeChange(f,"header",a),this._horizontal("header",e)),this.c.footer&&this.dom.tfoot.length))b=!c.visible||b+c.windowHeight>=c.tfootBottom+this.c.footerOffset?"in-place":c.windowHeight+
b>c.tbodyTop+c.tfootHeight+this.c.footerOffset?"in":"above",(a||b!==this.s.footerMode)&&this._modeChange(b,"footer",a),this._horizontal("footer",e)}});h.version="3.1.4";h.defaults={header:!0,footer:!1,headerOffset:0,footerOffset:0};d.fn.dataTable.FixedHeader=h;d.fn.DataTable.FixedHeader=h;d(i).on("init.dt.dtfh",function(a,b){if("dt"===a.namespace){var e=b.oInit.fixedHeader,c=j.defaults.fixedHeader;if((e||c)&&!b._fixedHeader)c=d.extend({},c,e),!1!==e&&new h(b,c)}});j.Api.register("fixedHeader()",function(){});
j.Api.register("fixedHeader.adjust()",function(){return this.iterator("table",function(a){(a=a._fixedHeader)&&a.update()})});j.Api.register("fixedHeader.enable()",function(a){return this.iterator("table",function(b){b=b._fixedHeader;a=a!==k?a:!0;b&&a!==b.s.enable&&b.enable(a)})});j.Api.register("fixedHeader.disable()",function(){return this.iterator("table",function(a){(a=a._fixedHeader)&&a.s.enable&&a.enable(!1)})});d.each(["header","footer"],function(a,b){j.Api.register("fixedHeader."+b+"Offset()",
function(a){var c=this.context;return a===k?c.length&&c[0]._fixedHeader?c[0]._fixedHeader[b+"Offset"]():k:this.iterator("table",function(c){if(c=c._fixedHeader)c[b+"Offset"](a)})})});return h});
/*!
Copyright 2009-2018 SpryMedia Ltd.
This source file is free software, available under the following license:
MIT license - http://datatables.net/license/mit
This source file is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
For details please refer to: http://www.datatables.net
KeyTable 2.5.0
©2009-2018 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,g,e){b!=Array.prototype&&b!=Object.prototype&&(b[g]=e.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(b){var g=0;return $jscomp.iteratorPrototype(function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.iteratorFromArray=function(b,g){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var e=0,n={next:function(){if(e<b.length){var l=e++;return{value:g(l,b[l]),done:!1}}n.next=function(){return{done:!0,value:void 0}};return n.next()}};n[Symbol.iterator]=function(){return n};return n};
$jscomp.polyfill=function(b,g,e,n){if(g){e=$jscomp.global;b=b.split(".");for(n=0;n<b.length-1;n++){var l=b[n];l in e||(e[l]={});e=e[l]}b=b[b.length-1];n=e[b];g=g(n);g!=n&&null!=g&&$jscomp.defineProperty(e,b,{configurable:!0,writable:!0,value:g})}};$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return b(g,window,document)}):"object"===typeof exports?module.exports=function(g,e){g||(g=window);e&&e.fn.dataTable||(e=require("datatables.net")(g,e).$);return b(e,g,g.document)}:b(jQuery,window,document)})(function(b,g,e,n){var l=b.fn.dataTable,p=function(a,c){if(!l.versionCheck||!l.versionCheck("1.10.8"))throw"KeyTable requires DataTables 1.10.8 or newer";this.c=b.extend(!0,{},l.defaults.keyTable,
p.defaults,c);this.s={dt:new l.Api(a),enable:!0,focusDraw:!1,waitingForDraw:!1,lastFocus:null};this.dom={};a=this.s.dt.settings()[0];if(c=a.keytable)return c;a.keytable=this;this._constructor()};b.extend(p.prototype,{blur:function(){this._blur()},enable:function(a){this.s.enable=a},focus:function(a,c){this._focus(this.s.dt.cell(a,c))},focused:function(a){if(!this.s.lastFocus)return!1;var c=this.s.lastFocus.cell.index();return a.row===c.row&&a.column===c.column},_constructor:function(){this._tabInput();
var a=this,c=this.s.dt,d=b(c.table().node());"static"===d.css("position")&&d.css("position","relative");b(c.table().body()).on("click.keyTable","th, td",function(b){if(!1!==a.s.enable){var d=c.cell(this);d.any()&&a._focus(d,null,!1,b)}});b(e).on("keydown.keyTable",function(b){a._key(b)});if(this.c.blurable)b(e).on("mousedown.keyTable",function(d){b(d.target).parents(".dataTables_filter").length&&a._blur();b(d.target).parents().filter(c.table().container()).length||b(d.target).parents("div.DTE").length||
b(d.target).parents("div.editor-datetime").length||b(d.target).parents().filter(".DTFC_Cloned").length||a._blur()});if(this.c.editor){var k=this.c.editor;k.on("open.keyTableMain",function(b,c,d){"inline"!==c&&a.s.enable&&(a.enable(!1),k.one("close.keyTable",function(){a.enable(!0)}))});if(this.c.editOnFocus)c.on("key-focus.keyTable key-refocus.keyTable",function(b,c,d,f){a._editor(null,f,!0)});c.on("key.keyTable",function(b,c,d,f,k){a._editor(d,k,!1)});b(c.table().body()).on("dblclick.keyTable","th, td",
function(b){!1!==a.s.enable&&c.cell(this).any()&&a._editor(null,b,!0)})}if(c.settings()[0].oFeatures.bStateSave)c.on("stateSaveParams.keyTable",function(b,c,d){d.keyTable=a.s.lastFocus?a.s.lastFocus.cell.index():null});c.on("draw.keyTable",function(d){if(!a.s.focusDraw){var f=a.s.lastFocus;if(f&&f.node&&b(f.node).closest("body")===e.body){f=a.s.lastFocus.relative;var k=c.page.info(),m=f.row+k.start;0!==k.recordsDisplay&&(m>=k.recordsDisplay&&(m=k.recordsDisplay-1),a._focus(m,f.column,!0,d))}}});this.c.clipboard&&
this._clipboard();c.on("destroy.keyTable",function(){c.off(".keyTable");b(c.table().body()).off("click.keyTable","th, td");b(e).off("keydown.keyTable").off("click.keyTable").off("copy.keyTable").off("paste.keyTable")});var f=c.state.loaded();if(f&&f.keyTable)c.one("init",function(){var a=c.cell(f.keyTable);a.any()&&a.focus()});else this.c.focus&&c.cell(this.c.focus).focus()},_blur:function(){if(this.s.enable&&this.s.lastFocus){var a=this.s.lastFocus.cell;b(a.node()).removeClass(this.c.className);
this.s.lastFocus=null;this._updateFixedColumns(a.index().column);this._emitEvent("key-blur",[this.s.dt,a])}},_clipboard:function(){var a=this.s.dt,c=this;g.getSelection&&(b(e).on("copy.keyTable",function(a){a=a.originalEvent;var b=g.getSelection().toString(),d=c.s.lastFocus;!b&&d&&(a.clipboardData.setData("text/plain",d.cell.render(c.c.clipboardOrthogonal)),a.preventDefault())}),b(e).on("paste.keyTable",function(b){b=b.originalEvent;var d=c.s.lastFocus,f=e.activeElement,m=c.c.editor,h;!d||f&&"body"!==
f.nodeName.toLowerCase()||(b.preventDefault(),g.clipboardData&&g.clipboardData.getData?h=g.clipboardData.getData("Text"):b.clipboardData&&b.clipboardData.getData&&(h=b.clipboardData.getData("text/plain")),m?m.inline(d.cell.index()).set(m.displayed()[0],h).submit():(d.cell.data(h),a.draw(!1)))}))},_columns:function(){var a=this.s.dt,b=a.columns(this.c.columns).indexes(),d=[];a.columns(":visible").every(function(a){-1!==b.indexOf(a)&&d.push(a)});return d},_editor:function(a,c,d){var k=this,f=this.s.dt,
m=this.c.editor,h=this.s.lastFocus.cell;if(!(b("div.DTE",h.node()).length||null!==a&&(0<=a&&9>=a||11===a||12===a||14<=a&&31>=a||112<=a&&123>=a||127<=a&&159>=a))){c.stopPropagation();13===a&&c.preventDefault();var g=function(){m.one("open.keyTable",function(){m.off("cancelOpen.keyTable");d||b("div.DTE_Field_InputControl input, div.DTE_Field_InputControl textarea").select();f.keys.enable(d?"tab-only":"navigation-only");f.on("key-blur.editor",function(){m.displayed()&&m.submit()});d&&b(f.table().container()).addClass("dtk-focus-alt");
m.on("submitUnsuccessful.keyTable",function(){k._focus(h,null,!1)});m.one("close",function(){f.keys.enable(!0);f.off("key-blur.editor");m.off(".keyTable");b(f.table().container()).removeClass("dtk-focus-alt")})}).one("cancelOpen.keyTable",function(){m.off(".keyTable")}).inline(h.index())};13===a?(d=!0,b(e).one("keyup",function(){g()})):g()}},_emitEvent:function(a,c){this.s.dt.iterator("table",function(d,k){b(d.nTable).triggerHandler(a,c)})},_focus:function(a,c,d,k){var f=this,m=this.s.dt,h=m.page.info(),
q=this.s.lastFocus;k||(k=null);if(this.s.enable){if("number"!==typeof a){if(!a.any())return;var l=a.index();c=l.column;a=m.rows({filter:"applied",order:"applied"}).indexes().indexOf(l.row);if(0>a)return;h.serverSide&&(a+=h.start)}if(-1!==h.length&&(a<h.start||a>=h.start+h.length))this.s.focusDraw=!0,this.s.waitingForDraw=!0,m.one("draw",function(){f.s.focusDraw=!1;f.s.waitingForDraw=!1;f._focus(a,c,n,k)}).page(Math.floor(a/h.length)).draw(!1);else if(-1!==b.inArray(c,this._columns())){h.serverSide&&
(a-=h.start);h=m.cells(null,c,{search:"applied",order:"applied"}).flatten();h=m.cell(h[a]);if(q){if(q.node===h.node()){this._emitEvent("key-refocus",[this.s.dt,h,k||null]);return}this._blur()}q=b(h.node());q.addClass(this.c.className);this._updateFixedColumns(c);if(d===n||!0===d)this._scroll(b(g),b(e.body),q,"offset"),d=m.table().body().parentNode,d!==m.table().header().parentNode&&(d=b(d.parentNode),this._scroll(d,d,q,"position"));this.s.lastFocus={cell:h,node:h.node(),relative:{row:m.rows({page:"current"}).indexes().indexOf(h.index().row),
column:h.index().column}};this._emitEvent("key-focus",[this.s.dt,h,k||null]);m.state.save()}}},_key:function(a){if(this.s.waitingForDraw)a.preventDefault();else{var c=this.s.enable,d=!0===c||"navigation-only"===c;if(c&&(!(0===a.keyCode||a.ctrlKey||a.metaKey||a.altKey)||a.ctrlKey&&a.altKey)&&this.s.lastFocus){var k=this.s.dt,f=this.s.dt.settings()[0].oScroll.sY?!0:!1;if(!this.c.keys||-1!==b.inArray(a.keyCode,this.c.keys))switch(a.keyCode){case 9:this._shift(a,a.shiftKey?"left":"right",!0);break;case 27:this.s.blurable&&
!0===c&&this._blur();break;case 33:case 34:d&&!f&&(a.preventDefault(),k.page(33===a.keyCode?"previous":"next").draw(!1));break;case 35:case 36:d&&(a.preventDefault(),c=k.cells({page:"current"}).indexes(),d=this._columns(),this._focus(k.cell(c[35===a.keyCode?c.length-1:d[0]]),null,!0,a));break;case 37:d&&this._shift(a,"left");break;case 38:d&&this._shift(a,"up");break;case 39:d&&this._shift(a,"right");break;case 40:d&&this._shift(a,"down");break;default:!0===c&&this._emitEvent("key",[k,a.keyCode,this.s.lastFocus.cell,
a])}}}},_scroll:function(a,b,d,k){var c=d[k](),m=d.outerHeight(),h=d.outerWidth(),g=b.scrollTop(),e=b.scrollLeft(),l=a.height();a=a.width();"position"===k&&(c.top+=parseInt(d.closest("table").css("top"),10));c.top<g&&b.scrollTop(c.top);c.left<e&&b.scrollLeft(c.left);c.top+m>g+l&&m<l&&b.scrollTop(c.top+m-l);c.left+h>e+a&&h<a&&b.scrollLeft(c.left+h-a)},_shift:function(a,c,d){var k=this.s.dt,f=k.page.info(),g=f.recordsDisplay,h=this.s.lastFocus.cell,e=this._columns();if(h){var l=k.rows({filter:"applied",
order:"applied"}).indexes().indexOf(h.index().row);f.serverSide&&(l+=f.start);k=k.columns(e).indexes().indexOf(h.index().column);f=e[k];"right"===c?k>=e.length-1?(l++,f=e[0]):f=e[k+1]:"left"===c?0===k?(l--,f=e[e.length-1]):f=e[k-1]:"up"===c?l--:"down"===c&&l++;0<=l&&l<g&&-1!==b.inArray(f,e)?(a.preventDefault(),this._focus(l,f,!0,a)):d&&this.c.blurable?this._blur():a.preventDefault()}},_tabInput:function(){var a=this,c=this.s.dt,d=null!==this.c.tabIndex?this.c.tabIndex:c.settings()[0].iTabIndex;if(-1!=
d)b('<div><input type="text" tabindex="'+d+'"/></div>').css({position:"absolute",height:1,width:0,overflow:"hidden"}).insertBefore(c.table().node()).children().on("focus",function(b){c.cell(":eq(0)",{page:"current"}).any()&&a._focus(c.cell(":eq(0)","0:visible",{page:"current"}),null,!0,b)})},_updateFixedColumns:function(a){var b=this.s.dt,d=b.settings()[0];if(d._oFixedColumns){var e=d.aoColumns.length-d._oFixedColumns.s.iRightColumns;(a<d._oFixedColumns.s.iLeftColumns||a>=e)&&b.fixedColumns().update()}}});
p.defaults={blurable:!0,className:"focus",clipboard:!0,clipboardOrthogonal:"display",columns:"",editor:null,editOnFocus:!1,focus:null,keys:null,tabIndex:null};p.version="2.5.0";b.fn.dataTable.KeyTable=p;b.fn.DataTable.KeyTable=p;l.Api.register("cell.blur()",function(){return this.iterator("table",function(a){a.keytable&&a.keytable.blur()})});l.Api.register("cell().focus()",function(){return this.iterator("cell",function(a,b,d){a.keytable&&a.keytable.focus(b,d)})});l.Api.register("keys.disable()",
function(){return this.iterator("table",function(a){a.keytable&&a.keytable.enable(!1)})});l.Api.register("keys.enable()",function(a){return this.iterator("table",function(b){b.keytable&&b.keytable.enable(a===n?!0:a)})});l.ext.selector.cell.push(function(a,b,d){b=b.focused;a=a.keytable;var c=[];if(!a||b===n)return d;for(var f=0,e=d.length;f<e;f++)(!0===b&&a.focused(d[f])||!1===b&&!a.focused(d[f]))&&c.push(d[f]);return c});b(e).on("preInit.dt.dtk",function(a,c,d){"dt"===a.namespace&&(a=c.oInit.keys,
d=l.defaults.keys,a||d)&&(d=b.extend({},d,a),!1!==a&&new p(c,d))});return p});
/*!
Responsive 2.2.2
2014-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(l){return d(l,window,document)}):"object"===typeof exports?module.exports=function(l,j){l||(l=window);if(!j||!j.fn.dataTable)j=require("datatables.net")(l,j).$;return d(j,l,l.document)}:d(jQuery,window,document)})(function(d,l,j,q){function t(a,b,c){var e=b+"-"+c;if(n[e])return n[e];for(var d=[],a=a.cell(b,c).node().childNodes,b=0,c=a.length;b<c;b++)d.push(a[b]);return n[e]=d}function r(a,b,d){var e=b+
"-"+d;if(n[e]){for(var a=a.cell(b,d).node(),d=n[e][0].parentNode.childNodes,b=[],f=0,g=d.length;f<g;f++)b.push(d[f]);d=0;for(f=b.length;d<f;d++)a.appendChild(b[d]);n[e]=q}}var o=d.fn.dataTable,i=function(a,b){if(!o.versionCheck||!o.versionCheck("1.10.10"))throw"DataTables Responsive requires DataTables 1.10.10 or newer";this.s={dt:new o.Api(a),columns:[],current:[]};this.s.dt.settings()[0].responsive||(b&&"string"===typeof b.details?b.details={type:b.details}:b&&!1===b.details?b.details={type:!1}:
b&&!0===b.details&&(b.details={type:"inline"}),this.c=d.extend(!0,{},i.defaults,o.defaults.responsive,b),a.responsive=this,this._constructor())};d.extend(i.prototype,{_constructor:function(){var a=this,b=this.s.dt,c=b.settings()[0],e=d(l).width();b.settings()[0]._responsive=this;d(l).on("resize.dtr orientationchange.dtr",o.util.throttle(function(){var b=d(l).width();b!==e&&(a._resize(),e=b)}));c.oApi._fnCallbackReg(c,"aoRowCreatedCallback",function(e){-1!==d.inArray(!1,a.s.current)&&d(">td, >th",
e).each(function(e){e=b.column.index("toData",e);!1===a.s.current[e]&&d(this).css("display","none")})});b.on("destroy.dtr",function(){b.off(".dtr");d(b.table().body()).off(".dtr");d(l).off("resize.dtr orientationchange.dtr");d.each(a.s.current,function(b,e){!1===e&&a._setColumnVis(b,!0)})});this.c.breakpoints.sort(function(a,b){return a.width<b.width?1:a.width>b.width?-1:0});this._classLogic();this._resizeAuto();c=this.c.details;!1!==c.type&&(a._detailsInit(),b.on("column-visibility.dtr",function(){a._timer&&
clearTimeout(a._timer);a._timer=setTimeout(function(){a._timer=null;a._classLogic();a._resizeAuto();a._resize();a._redrawChildren()},100)}),b.on("draw.dtr",function(){a._redrawChildren()}),d(b.table().node()).addClass("dtr-"+c.type));b.on("column-reorder.dtr",function(){a._classLogic();a._resizeAuto();a._resize()});b.on("column-sizing.dtr",function(){a._resizeAuto();a._resize()});b.on("preXhr.dtr",function(){var e=[];b.rows().every(function(){this.child.isShown()&&e.push(this.id(true))});b.one("draw.dtr",
function(){a._resizeAuto();a._resize();b.rows(e).every(function(){a._detailsDisplay(this,false)})})});b.on("init.dtr",function(){a._resizeAuto();a._resize();d.inArray(false,a.s.current)&&b.columns.adjust()});this._resize()},_columnsVisiblity:function(a){var b=this.s.dt,c=this.s.columns,e,f,g=c.map(function(a,b){return{columnIdx:b,priority:a.priority}}).sort(function(a,b){return a.priority!==b.priority?a.priority-b.priority:a.columnIdx-b.columnIdx}),h=d.map(c,function(e,c){return!1===b.column(c).visible()?
"not-visible":e.auto&&null===e.minWidth?!1:!0===e.auto?"-":-1!==d.inArray(a,e.includeIn)}),m=0;e=0;for(f=h.length;e<f;e++)!0===h[e]&&(m+=c[e].minWidth);e=b.settings()[0].oScroll;e=e.sY||e.sX?e.iBarWidth:0;m=b.table().container().offsetWidth-e-m;e=0;for(f=h.length;e<f;e++)c[e].control&&(m-=c[e].minWidth);var s=!1;e=0;for(f=g.length;e<f;e++){var k=g[e].columnIdx;"-"===h[k]&&(!c[k].control&&c[k].minWidth)&&(s||0>m-c[k].minWidth?(s=!0,h[k]=!1):h[k]=!0,m-=c[k].minWidth)}g=!1;e=0;for(f=c.length;e<f;e++)if(!c[e].control&&
!c[e].never&&!1===h[e]){g=!0;break}e=0;for(f=c.length;e<f;e++)c[e].control&&(h[e]=g),"not-visible"===h[e]&&(h[e]=!1);-1===d.inArray(!0,h)&&(h[0]=!0);return h},_classLogic:function(){var a=this,b=this.c.breakpoints,c=this.s.dt,e=c.columns().eq(0).map(function(a){var b=this.column(a),e=b.header().className,a=c.settings()[0].aoColumns[a].responsivePriority;a===q&&(b=d(b.header()).data("priority"),a=b!==q?1*b:1E4);return{className:e,includeIn:[],auto:!1,control:!1,never:e.match(/\bnever\b/)?!0:!1,priority:a}}),
f=function(a,b){var c=e[a].includeIn;-1===d.inArray(b,c)&&c.push(b)},g=function(d,c,g,k){if(g)if("max-"===g){k=a._find(c).width;c=0;for(g=b.length;c<g;c++)b[c].width<=k&&f(d,b[c].name)}else if("min-"===g){k=a._find(c).width;c=0;for(g=b.length;c<g;c++)b[c].width>=k&&f(d,b[c].name)}else{if("not-"===g){c=0;for(g=b.length;c<g;c++)-1===b[c].name.indexOf(k)&&f(d,b[c].name)}}else e[d].includeIn.push(c)};e.each(function(a,e){for(var c=a.className.split(" "),f=!1,i=0,l=c.length;i<l;i++){var j=d.trim(c[i]);
if("all"===j){f=!0;a.includeIn=d.map(b,function(a){return a.name});return}if("none"===j||a.never){f=!0;return}if("control"===j){f=!0;a.control=!0;return}d.each(b,function(a,b){var d=b.name.split("-"),c=j.match(RegExp("(min\\-|max\\-|not\\-)?("+d[0]+")(\\-[_a-zA-Z0-9])?"));c&&(f=!0,c[2]===d[0]&&c[3]==="-"+d[1]?g(e,b.name,c[1],c[2]+c[3]):c[2]===d[0]&&!c[3]&&g(e,b.name,c[1],c[2]))})}f||(a.auto=!0)});this.s.columns=e},_detailsDisplay:function(a,b){var c=this,e=this.s.dt,f=this.c.details;if(f&&!1!==f.type){var g=
f.display(a,b,function(){return f.renderer(e,a[0],c._detailsObj(a[0]))});(!0===g||!1===g)&&d(e.table().node()).triggerHandler("responsive-display.dt",[e,a,g,b])}},_detailsInit:function(){var a=this,b=this.s.dt,c=this.c.details;"inline"===c.type&&(c.target="td:first-child, th:first-child");b.on("draw.dtr",function(){a._tabIndexes()});a._tabIndexes();d(b.table().body()).on("keyup.dtr","td, th",function(a){a.keyCode===13&&d(this).data("dtr-keyboard")&&d(this).click()});var e=c.target;d(b.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",
"string"===typeof e?e:"td, th",function(c){if(d(b.table().node()).hasClass("collapsed")&&d.inArray(d(this).closest("tr").get(0),b.rows().nodes().toArray())!==-1){if(typeof e==="number"){var g=e<0?b.columns().eq(0).length+e:e;if(b.cell(this).index().column!==g)return}g=b.row(d(this).closest("tr"));c.type==="click"?a._detailsDisplay(g,false):c.type==="mousedown"?d(this).css("outline","none"):c.type==="mouseup"&&d(this).blur().css("outline","")}})},_detailsObj:function(a){var b=this,c=this.s.dt;return d.map(this.s.columns,
function(e,d){if(!e.never&&!e.control)return{title:c.settings()[0].aoColumns[d].sTitle,data:c.cell(a,d).render(b.c.orthogonal),hidden:c.column(d).visible()&&!b.s.current[d],columnIndex:d,rowIndex:a}})},_find:function(a){for(var b=this.c.breakpoints,c=0,e=b.length;c<e;c++)if(b[c].name===a)return b[c]},_redrawChildren:function(){var a=this,b=this.s.dt;b.rows({page:"current"}).iterator("row",function(c,e){b.row(e);a._detailsDisplay(b.row(e),!0)})},_resize:function(){var a=this,b=this.s.dt,c=d(l).width(),
e=this.c.breakpoints,f=e[0].name,g=this.s.columns,h,m=this.s.current.slice();for(h=e.length-1;0<=h;h--)if(c<=e[h].width){f=e[h].name;break}var i=this._columnsVisiblity(f);this.s.current=i;e=!1;h=0;for(c=g.length;h<c;h++)if(!1===i[h]&&!g[h].never&&!g[h].control&&!1===!b.column(h).visible()){e=!0;break}d(b.table().node()).toggleClass("collapsed",e);var k=!1,j=0;b.columns().eq(0).each(function(b,c){!0===i[c]&&j++;i[c]!==m[c]&&(k=!0,a._setColumnVis(b,i[c]))});k&&(this._redrawChildren(),d(b.table().node()).trigger("responsive-resize.dt",
[b,this.s.current]),0===b.page.info().recordsDisplay&&d("td",b.table().body()).eq(0).attr("colspan",j))},_resizeAuto:function(){var a=this.s.dt,b=this.s.columns;if(this.c.auto&&-1!==d.inArray(!0,d.map(b,function(a){return a.auto}))){d.isEmptyObject(n)||d.each(n,function(b){b=b.split("-");r(a,1*b[0],1*b[1])});a.table().node();var c=a.table().node().cloneNode(!1),e=d(a.table().header().cloneNode(!1)).appendTo(c),f=d(a.table().body()).clone(!1,!1).empty().appendTo(c),g=a.columns().header().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display",
"table-cell").css("min-width",0);d(f).append(d(a.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display","");if(f=a.table().footer()){var f=d(f.cloneNode(!1)).appendTo(c),h=a.columns().footer().filter(function(b){return a.column(b).visible()}).to$().clone(!1).css("display","table-cell");d("<tr/>").append(h).appendTo(f)}d("<tr/>").append(g).appendTo(e);"inline"===this.c.details.type&&d(c).addClass("dtr-inline collapsed");d(c).find("[name]").removeAttr("name");d(c).css("position","relative");
c=d("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(c);c.insertBefore(a.table().node());g.each(function(c){c=a.column.index("fromVisible",c);b[c].minWidth=this.offsetWidth||0});c.remove()}},_setColumnVis:function(a,b){var c=this.s.dt,e=b?"":"none";d(c.column(a).header()).css("display",e);d(c.column(a).footer()).css("display",e);c.column(a).nodes().to$().css("display",e);d.isEmptyObject(n)||c.cells(null,a).indexes().each(function(a){r(c,a.row,a.column)})},_tabIndexes:function(){var a=
this.s.dt,b=a.cells({page:"current"}).nodes().to$(),c=a.settings()[0],e=this.c.details.target;b.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");"number"===typeof e?a.cells(null,e,{page:"current"}).nodes().to$().attr("tabIndex",c.iTabIndex).data("dtr-keyboard",1):("td:first-child, th:first-child"===e&&(e=">td:first-child, >th:first-child"),d(e,a.rows({page:"current"}).nodes()).attr("tabIndex",c.iTabIndex).data("dtr-keyboard",1))}});i.breakpoints=[{name:"desktop",width:Infinity},{name:"tablet-l",
width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}];i.display={childRow:function(a,b,c){if(b){if(d(a.node()).hasClass("parent"))return a.child(c(),"child").show(),!0}else{if(a.child.isShown())return a.child(!1),d(a.node()).removeClass("parent"),!1;a.child(c(),"child").show();d(a.node()).addClass("parent");return!0}},childRowImmediate:function(a,b,c){if(!b&&a.child.isShown()||!a.responsive.hasHidden())return a.child(!1),d(a.node()).removeClass("parent"),
!1;a.child(c(),"child").show();d(a.node()).addClass("parent");return!0},modal:function(a){return function(b,c,e){if(c)d("div.dtr-modal-content").empty().append(e());else{var f=function(){g.remove();d(j).off("keypress.dtr")},g=d('<div class="dtr-modal"/>').append(d('<div class="dtr-modal-display"/>').append(d('<div class="dtr-modal-content"/>').append(e())).append(d('<div class="dtr-modal-close">&times;</div>').click(function(){f()}))).append(d('<div class="dtr-modal-background"/>').click(function(){f()})).appendTo("body");
d(j).on("keyup.dtr",function(a){27===a.keyCode&&(a.stopPropagation(),f())})}a&&a.header&&d("div.dtr-modal-content").prepend("<h2>"+a.header(b)+"</h2>")}}};var n={};i.renderer={listHiddenNodes:function(){return function(a,b,c){var e=d('<ul data-dtr-index="'+b+'" class="dtr-details"/>'),f=!1;d.each(c,function(b,c){c.hidden&&(d('<li data-dtr-index="'+c.columnIndex+'" data-dt-row="'+c.rowIndex+'" data-dt-column="'+c.columnIndex+'"><span class="dtr-title">'+c.title+"</span> </li>").append(d('<span class="dtr-data"/>').append(t(a,
c.rowIndex,c.columnIndex))).appendTo(e),f=!0)});return f?e:!1}},listHidden:function(){return function(a,b,c){return(a=d.map(c,function(a){return a.hidden?'<li data-dtr-index="'+a.columnIndex+'" data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><span class="dtr-title">'+a.title+'</span> <span class="dtr-data">'+a.data+"</span></li>":""}).join(""))?d('<ul data-dtr-index="'+b+'" class="dtr-details"/>').append(a):!1}},tableAll:function(a){a=d.extend({tableClass:""},a);return function(b,
c,e){b=d.map(e,function(a){return'<tr data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><td>'+a.title+":</td> <td>"+a.data+"</td></tr>"}).join("");return d('<table class="'+a.tableClass+' dtr-details" width="100%"/>').append(b)}}};i.defaults={breakpoints:i.breakpoints,auto:!0,details:{display:i.display.childRow,renderer:i.renderer.listHidden(),target:0,type:"inline"},orthogonal:"display"};var p=d.fn.dataTable.Api;p.register("responsive()",function(){return this});p.register("responsive.index()",
function(a){a=d(a);return{column:a.data("dtr-index"),row:a.parent().data("dtr-index")}});p.register("responsive.rebuild()",function(){return this.iterator("table",function(a){a._responsive&&a._responsive._classLogic()})});p.register("responsive.recalc()",function(){return this.iterator("table",function(a){a._responsive&&(a._responsive._resizeAuto(),a._responsive._resize())})});p.register("responsive.hasHidden()",function(){var a=this.context[0];return a._responsive?-1!==d.inArray(!1,a._responsive.s.current):
!1});p.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(a,b){return a._responsive?a._responsive.s.current[b]:!1},1)});i.version="2.2.2";d.fn.dataTable.Responsive=i;d.fn.DataTable.Responsive=i;d(j).on("preInit.dt.dtr",function(a,b){if("dt"===a.namespace&&(d(b.nTable).hasClass("responsive")||d(b.nTable).hasClass("dt-responsive")||b.oInit.responsive||o.defaults.responsive)){var c=b.oInit.responsive;!1!==c&&new i(b,d.isPlainObject(c)?
c:{})}});return i});
/*!
Copyright 2017-2018 SpryMedia Ltd.
This source file is free software, available under the following license:
MIT license - http://datatables.net/license/mit
This source file is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
For details please refer to: http://www.datatables.net
RowGroup 1.1.0
©2017-2018 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,d,c){a instanceof String&&(a=String(a));for(var e=a.length,f=0;f<e;f++){var h=a[f];if(d.call(c,h,f,a))return{i:f,v:h}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,c){a!=Array.prototype&&a!=Object.prototype&&(a[d]=c.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,d,c,e){if(d){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var f=a[e];f in c||(c[f]={});c=c[f]}a=a[a.length-1];e=c[a];d=d(e);d!=e&&null!=d&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:d})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(d){return a(d,window,document)}):"object"===typeof exports?module.exports=function(d,c){d||(d=window);c&&c.fn.dataTable||(c=require("datatables.net")(d,c).$);return a(c,d,d.document)}:a(jQuery,window,document)})(function(a,d,c,e){var f=a.fn.dataTable,h=function(b,g){if(!f.versionCheck||!f.versionCheck("1.10.8"))throw"RowGroup requires DataTables 1.10.8 or newer";this.c=a.extend(!0,{},f.defaults.rowGroup,
h.defaults,g);this.s={dt:new f.Api(b)};this.dom={};b=this.s.dt.settings()[0];if(g=b.rowGroup)return g;b.rowGroup=this;this._constructor()};a.extend(h.prototype,{dataSrc:function(b){if(b===e)return this.c.dataSrc;var g=this.s.dt;this.c.dataSrc=b;a(g.table().node()).triggerHandler("rowgroup-datasrc.dt",[g,b]);return this},disable:function(){this.c.enable=!1;return this},enable:function(b){if(!1===b)return this.disable();this.c.enable=!0;return this},_constructor:function(){var b=this,a=this.s.dt;a.on("draw.dtrg",
function(){b.c.enable&&b._draw()});a.on("column-visibility.dt.dtrg responsive-resize.dt.dtrg",function(){b._adjustColspan()});a.on("destroy",function(){a.off(".dtrg")});a.on("responsive-resize.dt",function(){b._adjustColspan()})},_adjustColspan:function(){a("tr."+this.c.className,this.s.dt.table().body()).find("td").attr("colspan",this._colspan())},_colspan:function(){return this.s.dt.columns().visible().reduce(function(b,a){return b+a},0)},_draw:function(){var b=this._group(0,this.s.dt.rows({page:"current"}).indexes());
this._groupDisplay(0,b)},_group:function(b,g){for(var c=a.isArray(this.c.dataSrc)?this.c.dataSrc:[this.c.dataSrc],d=f.ext.oApi._fnGetObjectDataFn(c[b]),h=this.s.dt,l,n,m=[],k=0,p=g.length;k<p;k++){var q=g[k];l=h.row(q).data();l=d(l);if(null===l||l===e)l=that.c.emptyDataGroup;if(n===e||l!==n)m.push({dataPoint:l,rows:[]}),n=l;m[m.length-1].rows.push(q)}if(c[b+1]!==e)for(k=0,p=m.length;k<p;k++)m[k].children=this._group(b+1,m[k].rows);return m},_groupDisplay:function(b,a){for(var c=this.s.dt,g,d=0,f=
a.length;d<f;d++){var e=a[d],h=e.dataPoint,k=e.rows;this.c.startRender&&(g=this.c.startRender.call(this,c.rows(k),h,b),(g=this._rowWrap(g,this.c.startClassName,b))&&g.insertBefore(c.row(k[0]).node()));this.c.endRender&&(g=this.c.endRender.call(this,c.rows(k),h,b),(g=this._rowWrap(g,this.c.endClassName,b))&&g.insertAfter(c.row(k[k.length-1]).node()));e.children&&this._groupDisplay(b+1,e.children)}},_rowWrap:function(b,g,c){if(null===b||""===b)b=this.c.emptyDataGroup;return b===e?null:("object"===typeof b&&
b.nodeName&&"tr"===b.nodeName.toLowerCase()?a(b):b instanceof a&&b.length&&"tr"===b[0].nodeName.toLowerCase()?b:a("<tr/>").append(a("<td/>").attr("colspan",this._colspan()).append(b))).addClass(this.c.className).addClass(g).addClass("dtrg-level-"+c)}});h.defaults={className:"dtrg-group",dataSrc:0,emptyDataGroup:"No group",enable:!0,endClassName:"dtrg-end",endRender:null,startClassName:"dtrg-start",startRender:function(a,c){return c}};h.version="1.1.0";a.fn.dataTable.RowGroup=h;a.fn.DataTable.RowGroup=
h;f.Api.register("rowGroup()",function(){return this});f.Api.register("rowGroup().disable()",function(){return this.iterator("table",function(a){a.rowGroup&&a.rowGroup.enable(!1)})});f.Api.register("rowGroup().enable()",function(a){return this.iterator("table",function(b){b.rowGroup&&b.rowGroup.enable(a===e?!0:a)})});f.Api.register("rowGroup().dataSrc()",function(a){return a===e?this.context[0].rowGroup.dataSrc():this.iterator("table",function(b){b.rowGroup&&b.rowGroup.dataSrc(a)})});a(c).on("preInit.dt.dtrg",
function(b,c,d){"dt"===b.namespace&&(b=c.oInit.rowGroup,d=f.defaults.rowGroup,b||d)&&(d=a.extend({},d,b),!1!==b&&new h(c,d))});return h});
/*!
RowReorder 1.2.4
2015-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(f){return d(f,window,document)}):"object"===typeof exports?module.exports=function(f,g){f||(f=window);if(!g||!g.fn.dataTable)g=require("datatables.net")(f,g).$;return d(g,f,f.document)}:d(jQuery,window,document)})(function(d,f,g,m){var h=d.fn.dataTable,k=function(c,b){if(!h.versionCheck||!h.versionCheck("1.10.8"))throw"DataTables RowReorder requires DataTables 1.10.8 or newer";this.c=d.extend(!0,{},h.defaults.rowReorder,
k.defaults,b);this.s={bodyTop:null,dt:new h.Api(c),getDataFn:h.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),middles:null,scroll:{},scrollInterval:null,setDataFn:h.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),start:{top:0,left:0,offsetTop:0,offsetLeft:0,nodes:[]},windowHeight:0,documentOuterHeight:0,domCloneOuterHeight:0};this.dom={clone:null,dtScroll:d("div.dataTables_scrollBody",this.s.dt.table().container())};var a=this.s.dt.settings()[0],e=a.rowreorder;if(e)return e;a.rowreorder=this;this._constructor()};
d.extend(k.prototype,{_constructor:function(){var c=this,b=this.s.dt,a=d(b.table().node());"static"===a.css("position")&&a.css("position","relative");d(b.table().container()).on("mousedown.rowReorder touchstart.rowReorder",this.c.selector,function(a){if(c.c.enable){if(d(a.target).is(c.c.excludedChildren))return!0;var i=d(this).closest("tr"),j=b.row(i);if(j.any())return c._emitEvent("pre-row-reorder",{node:j.node(),index:j.index()}),c._mouseDown(a,i),!1}});b.on("destroy.rowReorder",function(){d(b.table().container()).off(".rowReorder");
b.off(".rowReorder")})},_cachePositions:function(){var c=this.s.dt,b=d(c.table().node()).find("thead").outerHeight(),a=d.unique(c.rows({page:"current"}).nodes().toArray()),e=d.map(a,function(a){return d(a).position().top-b}),a=d.map(e,function(a,b){return e.length<b-1?(a+e[b+1])/2:(a+a+d(c.row(":last-child").node()).outerHeight())/2});this.s.middles=a;this.s.bodyTop=d(c.table().body()).offset().top;this.s.windowHeight=d(f).height();this.s.documentOuterHeight=d(g).outerHeight()},_clone:function(c){var b=
d(this.s.dt.table().node().cloneNode(!1)).addClass("dt-rowReorder-float").append("<tbody/>").append(c.clone(!1)),a=c.outerWidth(),e=c.outerHeight(),i=c.children().map(function(){return d(this).width()});b.width(a).height(e).find("tr").children().each(function(a){this.style.width=i[a]+"px"});b.appendTo("body");this.dom.clone=b;this.s.domCloneOuterHeight=b.outerHeight()},_clonePosition:function(c){var b=this.s.start,a=this._eventToPage(c,"Y")-b.top,c=this._eventToPage(c,"X")-b.left,e=this.c.snapX,a=
a+b.offsetTop,b=!0===e?b.offsetLeft:"number"===typeof e?b.offsetLeft+e:c+b.offsetLeft;0>a?a=0:a+this.s.domCloneOuterHeight>this.s.documentOuterHeight&&(a=this.s.documentOuterHeight-this.s.domCloneOuterHeight);this.dom.clone.css({top:a,left:b})},_emitEvent:function(c,b){this.s.dt.iterator("table",function(a){d(a.nTable).triggerHandler(c+".dt",b)})},_eventToPage:function(c,b){return-1!==c.type.indexOf("touch")?c.originalEvent.touches[0]["page"+b]:c["page"+b]},_mouseDown:function(c,b){var a=this,e=this.s.dt,
i=this.s.start,j=b.offset();i.top=this._eventToPage(c,"Y");i.left=this._eventToPage(c,"X");i.offsetTop=j.top;i.offsetLeft=j.left;i.nodes=d.unique(e.rows({page:"current"}).nodes().toArray());this._cachePositions();this._clone(b);this._clonePosition(c);this.dom.target=b;b.addClass("dt-rowReorder-moving");d(g).on("mouseup.rowReorder touchend.rowReorder",function(b){a._mouseUp(b)}).on("mousemove.rowReorder touchmove.rowReorder",function(b){a._mouseMove(b)});d(f).width()===d(g).width()&&d(g.body).addClass("dt-rowReorder-noOverflow");
e=this.dom.dtScroll;this.s.scroll={windowHeight:d(f).height(),windowWidth:d(f).width(),dtTop:e.length?e.offset().top:null,dtLeft:e.length?e.offset().left:null,dtHeight:e.length?e.outerHeight():null,dtWidth:e.length?e.outerWidth():null}},_mouseMove:function(c){this._clonePosition(c);for(var b=this._eventToPage(c,"Y")-this.s.bodyTop,a=this.s.middles,e=null,i=this.s.dt,j=i.table().body(),g=0,f=a.length;g<f;g++)if(b<a[g]){e=g;break}null===e&&(e=a.length);if(null===this.s.lastInsert||this.s.lastInsert!==
e)0===e?this.dom.target.prependTo(j):(b=d.unique(i.rows({page:"current"}).nodes().toArray()),e>this.s.lastInsert?this.dom.target.insertAfter(b[e-1]):this.dom.target.insertBefore(b[e])),this._cachePositions(),this.s.lastInsert=e;this._shiftScroll(c)},_mouseUp:function(){var c=this,b=this.s.dt,a,e,i=this.c.dataSrc;this.dom.clone.remove();this.dom.clone=null;this.dom.target.removeClass("dt-rowReorder-moving");d(g).off(".rowReorder");d(g.body).removeClass("dt-rowReorder-noOverflow");clearInterval(this.s.scrollInterval);
this.s.scrollInterval=null;var j=this.s.start.nodes,f=d.unique(b.rows({page:"current"}).nodes().toArray()),k={},h=[],l=[],n=this.s.getDataFn,m=this.s.setDataFn;a=0;for(e=j.length;a<e;a++)if(j[a]!==f[a]){var o=b.row(f[a]).id(),s=b.row(f[a]).data(),p=b.row(j[a]).data();o&&(k[o]=n(p));h.push({node:f[a],oldData:n(s),newData:n(p),newPosition:a,oldPosition:d.inArray(f[a],j)});l.push(f[a])}var q=[h,{dataSrc:i,nodes:l,values:k,triggerRow:b.row(this.dom.target)}];this._emitEvent("row-reorder",q);var r=function(){if(c.c.update){a=
0;for(e=h.length;a<e;a++){var d=b.row(h[a].node).data();m(d,h[a].newData);b.columns().every(function(){this.dataSrc()===i&&b.cell(h[a].node,this.index()).invalidate("data")})}c._emitEvent("row-reordered",q);b.draw(!1)}};this.c.editor?(this.c.enable=!1,this.c.editor.edit(l,!1,d.extend({submit:"changed"},this.c.formOptions)).multiSet(i,k).one("preSubmitCancelled.rowReorder",function(){c.c.enable=!0;c.c.editor.off(".rowReorder");b.draw(!1)}).one("submitUnsuccessful.rowReorder",function(){b.draw(!1)}).one("submitSuccess.rowReorder",
function(){r()}).one("submitComplete",function(){c.c.enable=!0;c.c.editor.off(".rowReorder")}).submit()):r()},_shiftScroll:function(c){var b=this,a=this.s.scroll,e=!1,d=c.pageY-g.body.scrollTop,f,h;65>d?f=-5:d>a.windowHeight-65&&(f=5);null!==a.dtTop&&c.pageY<a.dtTop+65?h=-5:null!==a.dtTop&&c.pageY>a.dtTop+a.dtHeight-65&&(h=5);f||h?(a.windowVert=f,a.dtVert=h,e=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null);!this.s.scrollInterval&&e&&(this.s.scrollInterval=
setInterval(function(){if(a.windowVert)g.body.scrollTop=g.body.scrollTop+a.windowVert;if(a.dtVert){var c=b.dom.dtScroll[0];if(a.dtVert)c.scrollTop=c.scrollTop+a.dtVert}},20))}});k.defaults={dataSrc:0,editor:null,enable:!0,formOptions:{},selector:"td:first-child",snapX:!1,update:!0,excludedChildren:"a"};var l=d.fn.dataTable.Api;l.register("rowReorder()",function(){return this});l.register("rowReorder.enable()",function(c){c===m&&(c=!0);return this.iterator("table",function(b){b.rowreorder&&(b.rowreorder.c.enable=
c)})});l.register("rowReorder.disable()",function(){return this.iterator("table",function(c){c.rowreorder&&(c.rowreorder.c.enable=!1)})});k.version="1.2.4";d.fn.dataTable.RowReorder=k;d.fn.DataTable.RowReorder=k;d(g).on("init.dt.dtr",function(c,b){if("dt"===c.namespace){var a=b.oInit.rowReorder,e=h.defaults.rowReorder;if(a||e)e=d.extend({},a,e),!1!==a&&new k(b,e)}});return k});
/*!
Copyright 2011-2018 SpryMedia Ltd.
This source file is free software, available under the following license:
MIT license - http://datatables.net/license/mit
This source file is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
For details please refer to: http://www.datatables.net
Scroller 2.0.0
©2011-2018 SpryMedia Ltd - datatables.net/license
*/
(function(d){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(h){return d(h,window,document)}):"object"===typeof exports?module.exports=function(h,k){h||(h=window);k&&k.fn.dataTable||(k=require("datatables.net")(h,k).$);return d(k,h,h.document)}:d(jQuery,window,document)})(function(d,h,k,n){var p=d.fn.dataTable,g=function(a,b){this instanceof g?(b===n&&(b={}),a=d.fn.dataTable.Api(a),this.s={dt:a.settings()[0],dtApi:a,tableTop:0,tableBottom:0,redrawTop:0,redrawBottom:0,
autoHeight:!0,viewportRows:0,stateTO:null,drawTO:null,heights:{jump:null,page:null,virtual:null,scroll:null,row:null,viewport:null,labelFactor:1},topRowFloat:0,scrollDrawDiff:null,loaderVisible:!1,forceReposition:!1,baseRowTop:0,baseScrollTop:0,mousedown:!1,lastScrollTop:0},this.s=d.extend(this.s,g.oDefaults,b),this.s.heights.row=this.s.rowHeight,this.dom={force:k.createElement("div"),label:d('<div class="dts_label">0</div>'),scroller:null,table:null,loader:null},this.s.dt.oScroller||(this.s.dt.oScroller=
this,this.construct())):alert("Scroller warning: Scroller must be initialised with the 'new' keyword.")};d.extend(g.prototype,{measure:function(a){this.s.autoHeight&&this._calcRowHeight();var b=this.s.heights;b.row&&(b.viewport=d.contains(k,this.dom.scroller)?this.dom.scroller.clientHeight:this._parseHeight(d(this.dom.scroller).css("height")),b.viewport||(b.viewport=this._parseHeight(d(this.dom.scroller).css("max-height"))),this.s.viewportRows=parseInt(b.viewport/b.row,10)+1,this.s.dt._iDisplayLength=
this.s.viewportRows*this.s.displayBuffer);var c=this.dom.label.outerHeight();b.labelFactor=(b.viewport-c)/b.scroll;(a===n||a)&&this.s.dt.oInstance.fnDraw(!1)},pageInfo:function(){var a=this.dom.scroller.scrollTop,b=this.s.dt.fnRecordsDisplay(),c=Math.ceil(this.pixelsToRow(a+this.s.heights.viewport,!1,this.s.ani));return{start:Math.floor(this.pixelsToRow(a,!1,this.s.ani)),end:b<c?b-1:c-1}},pixelsToRow:function(a,b,c){a-=this.s.baseScrollTop;c=c?(this._domain("physicalToVirtual",this.s.baseScrollTop)+
a)/this.s.heights.row:a/this.s.heights.row+this.s.baseRowTop;return b||b===n?parseInt(c,10):c},rowToPixels:function(a,b,c){a-=this.s.baseRowTop;c=c?this._domain("virtualToPhysical",this.s.baseScrollTop):this.s.baseScrollTop;c+=a*this.s.heights.row;return b||b===n?parseInt(c,10):c},scrollToRow:function(a,b){var c=this,e=!1,f=this.rowToPixels(a),m=a-(this.s.displayBuffer-1)/2*this.s.viewportRows;0>m&&(m=0);(f>this.s.redrawBottom||f<this.s.redrawTop)&&this.s.dt._iDisplayStart!==m&&(e=!0,f=this._domain("virtualToPhysical",
a*this.s.heights.row),this.s.redrawTop<f&&f<this.s.redrawBottom&&(this.s.forceReposition=!0,b=!1));"undefined"==typeof b||b?(this.s.ani=e,d(this.dom.scroller).animate({scrollTop:f},function(){setTimeout(function(){c.s.ani=!1},25)})):d(this.dom.scroller).scrollTop(f)},construct:function(){var a=this,b=this.s.dtApi;if(this.s.dt.oFeatures.bPaginate){this.dom.force.style.position="relative";this.dom.force.style.top="0px";this.dom.force.style.left="0px";this.dom.force.style.width="1px";this.dom.scroller=
d("div."+this.s.dt.oClasses.sScrollBody,this.s.dt.nTableWrapper)[0];this.dom.scroller.appendChild(this.dom.force);this.dom.scroller.style.position="relative";this.dom.table=d(">table",this.dom.scroller)[0];this.dom.table.style.position="absolute";this.dom.table.style.top="0px";this.dom.table.style.left="0px";d(b.table().container()).addClass("dts DTS");this.s.loadingIndicator&&(this.dom.loader=d('<div class="dataTables_processing dts_loading">'+this.s.dt.oLanguage.sLoadingRecords+"</div>").css("display",
"none"),d(this.dom.scroller.parentNode).css("position","relative").append(this.dom.loader));this.dom.label.appendTo(this.dom.scroller);this.s.heights.row&&"auto"!=this.s.heights.row&&(this.s.autoHeight=!1);this.measure(!1);this.s.ingnoreScroll=!0;this.s.stateSaveThrottle=this.s.dt.oApi._fnThrottle(function(){a.s.dtApi.state.save()},500);d(this.dom.scroller).on("scroll.dt-scroller",function(b){a._scroll.call(a)});d(this.dom.scroller).on("touchstart.dt-scroller",function(){a._scroll.call(a)});d(this.dom.scroller).on("mousedown.dt-scroller",
function(){a.s.mousedown=!0}).on("mouseup.dt-scroller",function(){a.s.mouseup=!1;a.dom.label.css("display","none")});d(h).on("resize.dt-scroller",function(){a.measure(!1);a._info()});var c=!0,e=b.state.loaded();b.on("stateSaveParams.scroller",function(b,d,h){h.scroller={topRow:c&&e&&e.scroller?e.scroller.topRow:a.s.topRowFloat,baseScrollTop:a.s.baseScrollTop,baseRowTop:a.s.baseRowTop};c=!1});e&&e.scroller&&(this.s.topRowFloat=e.scroller.topRow,this.s.baseScrollTop=e.scroller.baseScrollTop,this.s.baseRowTop=
e.scroller.baseRowTop);b.on("init.scroller",function(){a.measure(!1);a._draw();b.on("draw.scroller",function(){a._draw()})});b.on("preDraw.dt.scroller",function(){a._scrollForce()});b.on("destroy.scroller",function(){d(h).off("resize.dt-scroller");d(a.dom.scroller).off(".dt-scroller");d(a.s.dt.nTable).off(".scroller");d(a.s.dt.nTableWrapper).removeClass("DTS");d("div.DTS_Loading",a.dom.scroller.parentNode).remove();a.dom.table.style.position="";a.dom.table.style.top="";a.dom.table.style.left=""})}else this.s.dt.oApi._fnLog(this.s.dt,
0,"Pagination must be enabled for Scroller")},_calcRowHeight:function(){var a=this.s.dt,b=a.nTable,c=b.cloneNode(!1),e=d("<tbody/>").appendTo(c),f=d('<div class="'+a.oClasses.sWrapper+' DTS"><div class="'+a.oClasses.sScrollWrapper+'"><div class="'+a.oClasses.sScrollBody+'"></div></div></div>');d("tbody tr:lt(4)",b).clone().appendTo(e);var m=d("tr",e).length;if(1===m)e.prepend("<tr><td>&#160;</td></tr>"),e.append("<tr><td>&#160;</td></tr>");else for(;3>m;m++)e.append("<tr><td>&#160;</td></tr>");d("div."+
a.oClasses.sScrollBody,f).append(c);a=this.s.dt.nHolding||b.parentNode;d(a).is(":visible")||(a="body");f.appendTo(a);this.s.heights.row=d("tr",e).eq(1).outerHeight();f.remove()},_draw:function(){var a=this,b=this.s.heights,c=this.dom.scroller.scrollTop,e=d(this.s.dt.nTable).height(),f=this.s.dt._iDisplayStart,m=this.s.dt._iDisplayLength,h=this.s.dt.fnRecordsDisplay();this.s.skip=!0;!this.s.dt.bSorted&&!this.s.dt.bFiltered||0!==f||this.s.dt._drawHold||(this.s.topRowFloat=0);c="jump"===this.scrollType?
this._domain("physicalToVirtual",this.s.topRowFloat*b.row):c;d(a.dom.scroller).scrollTop(c);this.s.baseScrollTop=c;this.s.baseRowTop=this.s.topRowFloat;var g=c-(this.s.topRowFloat-f)*b.row;0===f?g=0:f+m>=h&&(g=b.scroll-e);this.dom.table.style.top=g+"px";this.s.tableTop=g;this.s.tableBottom=e+this.s.tableTop;e=(c-this.s.tableTop)*this.s.boundaryScale;this.s.redrawTop=c-e;this.s.redrawBottom=c+e>b.scroll-b.viewport-b.row?b.scroll-b.viewport-b.row:c+e;this.s.skip=!1;this.s.dt.oFeatures.bStateSave&&null!==
this.s.dt.oLoadedState&&"undefined"!=typeof this.s.dt.oLoadedState.iScroller?((c=!this.s.dt.sAjaxSource&&!a.s.dt.ajax||this.s.dt.oFeatures.bServerSide?!1:!0)&&2==this.s.dt.iDraw||!c&&1==this.s.dt.iDraw)&&setTimeout(function(){d(a.dom.scroller).scrollTop(a.s.dt.oLoadedState.iScroller);a.s.redrawTop=a.s.dt.oLoadedState.iScroller-b.viewport/2;setTimeout(function(){a.s.ingnoreScroll=!1},0)},0):a.s.ingnoreScroll=!1;this.s.dt.oFeatures.bInfo&&setTimeout(function(){a._info.call(a)},0);this.dom.loader&&this.s.loaderVisible&&
(this.dom.loader.css("display","none"),this.s.loaderVisible=!1)},_domain:function(a,b){var c=this.s.heights;if(c.virtual===c.scroll||1E4>b)return b;if("virtualToPhysical"===a&&b>c.virtual-1E4)return b=c.virtual-b,c.scroll-b;if("physicalToVirtual"===a&&b>c.scroll-1E4)return b=c.scroll-b,c.virtual-b;c=(("virtualToPhysical"===a?c.scroll:c.virtual)-1E4)/(("virtualToPhysical"===a?c.virtual:c.scroll)-1E4);return c*b+(1E4-1E4*c)},_info:function(){if(this.s.dt.oFeatures.bInfo){var a=this.s.dt,b=a.oLanguage,
c=this.dom.scroller.scrollTop,e=Math.floor(this.pixelsToRow(c,!1,this.s.ani)+1),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay();c=Math.ceil(this.pixelsToRow(c+this.s.heights.viewport,!1,this.s.ani));c=g<c?g:c;var h=a.fnFormatNumber(e),k=a.fnFormatNumber(c),l=a.fnFormatNumber(f),n=a.fnFormatNumber(g);h=0===a.fnRecordsDisplay()&&a.fnRecordsDisplay()==a.fnRecordsTotal()?b.sInfoEmpty+b.sInfoPostFix:0===a.fnRecordsDisplay()?b.sInfoEmpty+" "+b.sInfoFiltered.replace("_MAX_",l)+b.sInfoPostFix:a.fnRecordsDisplay()==
a.fnRecordsTotal()?b.sInfo.replace("_START_",h).replace("_END_",k).replace("_MAX_",l).replace("_TOTAL_",n)+b.sInfoPostFix:b.sInfo.replace("_START_",h).replace("_END_",k).replace("_MAX_",l).replace("_TOTAL_",n)+" "+b.sInfoFiltered.replace("_MAX_",a.fnFormatNumber(a.fnRecordsTotal()))+b.sInfoPostFix;(b=b.fnInfoCallback)&&(h=b.call(a.oInstance,a,e,c,f,g,h));e=a.aanFeatures.i;if("undefined"!=typeof e)for(f=0,g=e.length;f<g;f++)d(e[f]).html(h);d(a.nTable).triggerHandler("info.dt")}},_parseHeight:function(a){var b,
c=/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|em|rem|vh)$/.exec(a);if(null===c)return 0;a=parseFloat(c[1]);c=c[2];"px"===c?b=a:"vh"===c?b=a/100*d(h).height():"rem"===c?b=a*parseFloat(d(":root").css("font-size")):"em"===c&&(b=a*parseFloat(d("body").css("font-size")));return b?b:0},_scroll:function(){var a=this,b=this.s.heights,c=this.dom.scroller.scrollTop;if(!this.s.skip&&!this.s.ingnoreScroll&&c!==this.s.lastScrollTop)if(this.s.dt.bFiltered||this.s.dt.bSorted)this.s.lastScrollTop=0;else{this._info();clearTimeout(this.s.stateTO);
this.s.stateTO=setTimeout(function(){a.s.dtApi.state.save()},250);this.s.scrollType=Math.abs(c-this.s.lastScrollTop)>b.viewport?"jump":"cont";this.s.topRowFloat="cont"===this.s.scrollType?this.pixelsToRow(c,!1,!1):this._domain("physicalToVirtual",c)/b.row;0>this.s.topRowFloat&&(this.s.topRowFloat=0);if(this.s.forceReposition||c<this.s.redrawTop||c>this.s.redrawBottom){var e=Math.ceil((this.s.displayBuffer-1)/2*this.s.viewportRows);var f=parseInt(this.s.topRowFloat,10)-e;this.s.forceReposition=!1;
0>=f?f=0:f+this.s.dt._iDisplayLength>this.s.dt.fnRecordsDisplay()?(f=this.s.dt.fnRecordsDisplay()-this.s.dt._iDisplayLength,0>f&&(f=0)):0!==f%2&&f++;f!=this.s.dt._iDisplayStart&&(this.s.tableTop=d(this.s.dt.nTable).offset().top,this.s.tableBottom=d(this.s.dt.nTable).height()+this.s.tableTop,e=function(){null===a.s.scrollDrawReq&&(a.s.scrollDrawReq=c);a.s.dt._iDisplayStart=f;a.s.dt.oApi._fnDraw(a.s.dt)},this.s.dt.oFeatures.bServerSide?(clearTimeout(this.s.drawTO),this.s.drawTO=setTimeout(e,this.s.serverWait)):
e(),this.dom.loader&&!this.s.loaderVisible&&(this.dom.loader.css("display","block"),this.s.loaderVisible=!0))}else this.s.topRowFloat=this.pixelsToRow(c,!1,!0);this.s.lastScrollTop=c;this.s.stateSaveThrottle();"jump"===this.s.scrollType&&this.s.mousedown&&this.dom.label.html(this.s.dt.fnFormatNumber(parseInt(this.s.topRowFloat,10)+1)).css("top",c+c*b.labelFactor).css("display","block")}},_scrollForce:function(){var a=this.s.heights;a.virtual=a.row*this.s.dt.fnRecordsDisplay();a.scroll=a.virtual;1E6<
a.scroll&&(a.scroll=1E6);this.dom.force.style.height=a.scroll>this.s.heights.row?a.scroll+"px":this.s.heights.row+"px"}});g.defaults={boundaryScale:.5,displayBuffer:9,loadingIndicator:!1,rowHeight:"auto",serverWait:200};g.oDefaults=g.defaults;g.version="2.0.0";d(k).on("preInit.dt.dtscroller",function(a,b){if("dt"===a.namespace){a=b.oInit.scroller;var c=p.defaults.scroller;if(a||c)c=d.extend({},a,c),!1!==a&&new g(b,c)}});d.fn.dataTable.Scroller=g;d.fn.DataTable.Scroller=g;var l=d.fn.dataTable.Api;
l.register("scroller()",function(){return this});l.register("scroller().rowToPixels()",function(a,b,c){var d=this.context;if(d.length&&d[0].oScroller)return d[0].oScroller.rowToPixels(a,b,c)});l.register("scroller().pixelsToRow()",function(a,b,c){var d=this.context;if(d.length&&d[0].oScroller)return d[0].oScroller.pixelsToRow(a,b,c)});l.register(["scroller().scrollToRow()","scroller.toPosition()"],function(a,b){this.iterator("table",function(c){c.oScroller&&c.oScroller.scrollToRow(a,b)});return this});
l.register("row().scrollTo()",function(a){var b=this;this.iterator("row",function(c,d){c.oScroller&&(d=b.rows({order:"applied",search:"applied"}).indexes().indexOf(d),c.oScroller.scrollToRow(d,a))});return this});l.register("scroller.measure()",function(a){this.iterator("table",function(b){b.oScroller&&b.oScroller.measure(a)});return this});l.register("scroller.page()",function(){var a=this.context;if(a.length&&a[0].oScroller)return a[0].oScroller.pageInfo()});return g});
/*!
Copyright 2015-2018 SpryMedia Ltd.
This source file is free software, available under the following license:
MIT license - http://datatables.net/license/mit
This source file is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
For details please refer to: http://www.datatables.net/extensions/select
Select for DataTables 1.3.0
2015-2018 SpryMedia Ltd - datatables.net/license/mit
*/
(function(f){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(k){return f(k,window,document)}):"object"===typeof exports?module.exports=function(k,m){k||(k=window);m&&m.fn.dataTable||(m=require("datatables.net")(k,m).$);return f(m,k,k.document)}:f(jQuery,window,document)})(function(f,k,m,h){function z(a,b,c){var d=function(c,b){if(c>b){var d=b;b=c;c=d}var e=!1;return a.columns(":visible").indexes().filter(function(a){a===c&&(e=!0);return a===b?(e=!1,!0):e})};var e=
function(c,b){var d=a.rows({search:"applied"}).indexes();if(d.indexOf(c)>d.indexOf(b)){var e=b;b=c;c=e}var f=!1;return d.filter(function(a){a===c&&(f=!0);return a===b?(f=!1,!0):f})};a.cells({selected:!0}).any()||c?(d=d(c.column,b.column),c=e(c.row,b.row)):(d=d(0,b.column),c=e(0,b.row));c=a.cells(c,d).flatten();a.cells(b,{selected:!0}).any()?a.cells(c).deselect():a.cells(c).select()}function v(a){var b=a.settings()[0]._select.selector;f(a.table().container()).off("mousedown.dtSelect",b).off("mouseup.dtSelect",
b).off("click.dtSelect",b);f("body").off("click.dtSelect"+a.table().node().id)}function A(a){var b=f(a.table().container()),c=a.settings()[0],d=c._select.selector,e;b.on("mousedown.dtSelect",d,function(a){if(a.shiftKey||a.metaKey||a.ctrlKey)b.css("-moz-user-select","none").one("selectstart.dtSelect",d,function(){return!1});k.getSelection&&(e=k.getSelection())}).on("mouseup.dtSelect",d,function(){b.css("-moz-user-select","")}).on("click.dtSelect",d,function(c){var b=a.select.items();if(e){var d=k.getSelection();
if((!d.anchorNode||f(d.anchorNode).closest("table")[0]===a.table().node())&&d!==e)return}d=a.settings()[0];var l=f.trim(a.settings()[0].oClasses.sWrapper).replace(/ +/g,".");if(f(c.target).closest("div."+l)[0]==a.table().container()&&(l=a.cell(f(c.target).closest("td, th")),l.any())){var g=f.Event("user-select.dt");n(a,g,[b,l,c]);g.isDefaultPrevented()||(g=l.index(),"row"===b?(b=g.row,w(c,a,d,"row",b)):"column"===b?(b=l.index().column,w(c,a,d,"column",b)):"cell"===b&&(b=l.index(),w(c,a,d,"cell",b)),
d._select_lastCell=g)}});f("body").on("click.dtSelect"+a.table().node().id,function(b){!c._select.blurable||f(b.target).parents().filter(a.table().container()).length||0===f(b.target).parents("html").length||f(b.target).parents("div.DTE").length||r(c,!0)})}function n(a,b,c,d){if(!d||a.flatten().length)"string"===typeof b&&(b+=".dt"),c.unshift(a),f(a.table().node()).trigger(b,c)}function B(a){var b=a.settings()[0];if(b._select.info&&b.aanFeatures.i&&"api"!==a.select.style()){var c=a.rows({selected:!0}).flatten().length,
d=a.columns({selected:!0}).flatten().length,e=a.cells({selected:!0}).flatten().length,l=function(b,c,d){b.append(f('<span class="select-item"/>').append(a.i18n("select."+c+"s",{_:"%d "+c+"s selected",0:"",1:"1 "+c+" selected"},d)))};f.each(b.aanFeatures.i,function(b,a){a=f(a);b=f('<span class="select-info"/>');l(b,"row",c);l(b,"column",d);l(b,"cell",e);var g=a.children("span.select-info");g.length&&g.remove();""!==b.text()&&a.append(b)})}}function D(a){var b=new g.Api(a);a.aoRowCreatedCallback.push({fn:function(b,
d,e){d=a.aoData[e];d._select_selected&&f(b).addClass(a._select.className);b=0;for(e=a.aoColumns.length;b<e;b++)(a.aoColumns[b]._select_selected||d._selected_cells&&d._selected_cells[b])&&f(d.anCells[b]).addClass(a._select.className)},sName:"select-deferRender"});b.on("preXhr.dt.dtSelect",function(){var a=b.rows({selected:!0}).ids(!0).filter(function(b){return b!==h}),d=b.cells({selected:!0}).eq(0).map(function(a){var c=b.row(a.row).id(!0);return c?{row:c,column:a.column}:h}).filter(function(b){return b!==
h});b.one("draw.dt.dtSelect",function(){b.rows(a).select();d.any()&&d.each(function(a){b.cells(a.row,a.column).select()})})});b.on("draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt",function(){B(b)});b.on("destroy.dtSelect",function(){v(b);b.off(".dtSelect")})}function C(a,b,c,d){var e=a[b+"s"]({search:"applied"}).indexes();d=f.inArray(d,e);var g=f.inArray(c,e);if(a[b+"s"]({selected:!0}).any()||-1!==d){if(d>g){var u=g;g=d;d=u}e.splice(g+1,e.length);e.splice(0,d)}else e.splice(f.inArray(c,
e)+1,e.length);a[b](c,{selected:!0}).any()?(e.splice(f.inArray(c,e),1),a[b+"s"](e).deselect()):a[b+"s"](e).select()}function r(a,b){if(b||"single"===a._select.style)a=new g.Api(a),a.rows({selected:!0}).deselect(),a.columns({selected:!0}).deselect(),a.cells({selected:!0}).deselect()}function w(a,b,c,d,e){var f=b.select.style(),g=b[d](e,{selected:!0}).any();"os"===f?a.ctrlKey||a.metaKey?b[d](e).select(!g):a.shiftKey?"cell"===d?z(b,e,c._select_lastCell||null):C(b,d,e,c._select_lastCell?c._select_lastCell[d]:
null):(a=b[d+"s"]({selected:!0}),g&&1===a.flatten().length?b[d](e).deselect():(a.deselect(),b[d](e).select())):"multi+shift"==f?a.shiftKey?"cell"===d?z(b,e,c._select_lastCell||null):C(b,d,e,c._select_lastCell?c._select_lastCell[d]:null):b[d](e).select(!g):b[d](e).select(!g)}function t(a,b){return function(c){return c.i18n("buttons."+a,b)}}function x(a){a=a._eventNamespace;return"draw.dt.DT"+a+" select.dt.DT"+a+" deselect.dt.DT"+a}function E(a,b){return-1!==f.inArray("rows",b.limitTo)&&a.rows({selected:!0}).any()||
-1!==f.inArray("columns",b.limitTo)&&a.columns({selected:!0}).any()||-1!==f.inArray("cells",b.limitTo)&&a.cells({selected:!0}).any()?!0:!1}var g=f.fn.dataTable;g.select={};g.select.version="1.3.0";g.select.init=function(a){var b=a.settings()[0],c=b.oInit.select,d=g.defaults.select;c=c===h?d:c;d="row";var e="api",l=!1,u=!0,k="td, th",n="selected",m=!1;b._select={};!0===c?(e="os",m=!0):"string"===typeof c?(e=c,m=!0):f.isPlainObject(c)&&(c.blurable!==h&&(l=c.blurable),c.info!==h&&(u=c.info),c.items!==
h&&(d=c.items),e=c.style!==h?c.style:"os",m=!0,c.selector!==h&&(k=c.selector),c.className!==h&&(n=c.className));a.select.selector(k);a.select.items(d);a.select.style(e);a.select.blurable(l);a.select.info(u);b._select.className=n;f.fn.dataTable.ext.order["select-checkbox"]=function(b,a){return this.api().column(a,{order:"index"}).nodes().map(function(a){return"row"===b._select.items?f(a).parent().hasClass(b._select.className):"cell"===b._select.items?f(a).hasClass(b._select.className):!1})};!m&&f(a.table().node()).hasClass("selectable")&&
a.select.style("os")};f.each([{type:"row",prop:"aoData"},{type:"column",prop:"aoColumns"}],function(a,b){g.ext.selector[b.type].push(function(a,d,e){d=d.selected;var c=[];if(!0!==d&&!1!==d)return e;for(var f=0,g=e.length;f<g;f++){var h=a[b.prop][e[f]];(!0===d&&!0===h._select_selected||!1===d&&!h._select_selected)&&c.push(e[f])}return c})});g.ext.selector.cell.push(function(a,b,c){b=b.selected;var d=[];if(b===h)return c;for(var e=0,f=c.length;e<f;e++){var g=a.aoData[c[e].row];(!0===b&&g._selected_cells&&
!0===g._selected_cells[c[e].column]||!(!1!==b||g._selected_cells&&g._selected_cells[c[e].column]))&&d.push(c[e])}return d});var p=g.Api.register,q=g.Api.registerPlural;p("select()",function(){return this.iterator("table",function(a){g.select.init(new g.Api(a))})});p("select.blurable()",function(a){return a===h?this.context[0]._select.blurable:this.iterator("table",function(b){b._select.blurable=a})});p("select.info()",function(a){return B===h?this.context[0]._select.info:this.iterator("table",function(b){b._select.info=
a})});p("select.items()",function(a){return a===h?this.context[0]._select.items:this.iterator("table",function(b){b._select.items=a;n(new g.Api(b),"selectItems",[a])})});p("select.style()",function(a){return a===h?this.context[0]._select.style:this.iterator("table",function(b){b._select.style=a;b._select_init||D(b);var c=new g.Api(b);v(c);"api"!==a&&A(c);n(new g.Api(b),"selectStyle",[a])})});p("select.selector()",function(a){return a===h?this.context[0]._select.selector:this.iterator("table",function(b){v(new g.Api(b));
b._select.selector=a;"api"!==b._select.style&&A(new g.Api(b))})});q("rows().select()","row().select()",function(a){var b=this;if(!1===a)return this.deselect();this.iterator("row",function(b,a){r(b);b.aoData[a]._select_selected=!0;f(b.aoData[a].nTr).addClass(b._select.className)});this.iterator("table",function(a,d){n(b,"select",["row",b[d]],!0)});return this});q("columns().select()","column().select()",function(a){var b=this;if(!1===a)return this.deselect();this.iterator("column",function(b,a){r(b);
b.aoColumns[a]._select_selected=!0;a=(new g.Api(b)).column(a);f(a.header()).addClass(b._select.className);f(a.footer()).addClass(b._select.className);a.nodes().to$().addClass(b._select.className)});this.iterator("table",function(a,d){n(b,"select",["column",b[d]],!0)});return this});q("cells().select()","cell().select()",function(a){var b=this;if(!1===a)return this.deselect();this.iterator("cell",function(b,a,e){r(b);a=b.aoData[a];a._selected_cells===h&&(a._selected_cells=[]);a._selected_cells[e]=
!0;a.anCells&&f(a.anCells[e]).addClass(b._select.className)});this.iterator("table",function(a,d){n(b,"select",["cell",b[d]],!0)});return this});q("rows().deselect()","row().deselect()",function(){var a=this;this.iterator("row",function(b,a){b.aoData[a]._select_selected=!1;f(b.aoData[a].nTr).removeClass(b._select.className)});this.iterator("table",function(b,c){n(a,"deselect",["row",a[c]],!0)});return this});q("columns().deselect()","column().deselect()",function(){var a=this;this.iterator("column",
function(a,c){a.aoColumns[c]._select_selected=!1;var b=new g.Api(a),e=b.column(c);f(e.header()).removeClass(a._select.className);f(e.footer()).removeClass(a._select.className);b.cells(null,c).indexes().each(function(b){var c=a.aoData[b.row],d=c._selected_cells;!c.anCells||d&&d[b.column]||f(c.anCells[b.column]).removeClass(a._select.className)})});this.iterator("table",function(b,c){n(a,"deselect",["column",a[c]],!0)});return this});q("cells().deselect()","cell().deselect()",function(){var a=this;
this.iterator("cell",function(a,c,d){c=a.aoData[c];c._selected_cells[d]=!1;c.anCells&&!a.aoColumns[d]._select_selected&&f(c.anCells[d]).removeClass(a._select.className)});this.iterator("table",function(b,c){n(a,"deselect",["cell",a[c]],!0)});return this});var y=0;f.extend(g.ext.buttons,{selected:{text:t("selected","Selected"),className:"buttons-selected",limitTo:["rows","columns","cells"],init:function(a,b,c){var d=this;c._eventNamespace=".select"+y++;a.on(x(c),function(){d.enable(E(a,c))});this.disable()},
destroy:function(a,b,c){a.off(c._eventNamespace)}},selectedSingle:{text:t("selectedSingle","Selected single"),className:"buttons-selected-single",init:function(a,b,c){var d=this;c._eventNamespace=".select"+y++;a.on(x(c),function(){var b=a.rows({selected:!0}).flatten().length+a.columns({selected:!0}).flatten().length+a.cells({selected:!0}).flatten().length;d.enable(1===b)});this.disable()},destroy:function(a,b,c){a.off(c._eventNamespace)}},selectAll:{text:t("selectAll","Select all"),className:"buttons-select-all",
action:function(){this[this.select.items()+"s"]().select()}},selectNone:{text:t("selectNone","Deselect all"),className:"buttons-select-none",action:function(){r(this.settings()[0],!0)},init:function(a,b,c){var d=this;c._eventNamespace=".select"+y++;a.on(x(c),function(){var b=a.rows({selected:!0}).flatten().length+a.columns({selected:!0}).flatten().length+a.cells({selected:!0}).flatten().length;d.enable(0<b)});this.disable()},destroy:function(a,b,c){a.off(c._eventNamespace)}}});f.each(["Row","Column",
"Cell"],function(a,b){var c=b.toLowerCase();g.ext.buttons["select"+b+"s"]={text:t("select"+b+"s","Select "+c+"s"),className:"buttons-select-"+c+"s",action:function(){this.select.items(c)},init:function(a){var b=this;a.on("selectItems.dt.DT",function(a,d,e){b.active(e===c)})}}});f(m).on("preInit.dt.dtSelect",function(a,b){"dt"===a.namespace&&g.select.init(new g.Api(b))});return g.select});
;/* extensions/RedHat/web/alertify/alertify.min.js */
/*! alertifyjs - v1.13.1 - Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) */
!function(a){"use strict";function b(a,b){a.className+=" "+b}function c(a,b){for(var c=a.className.split(" "),d=b.split(" "),e=0;e<d.length;e+=1){var f=c.indexOf(d[e]);f>-1&&c.splice(f,1)}a.className=c.join(" ")}function d(){return"rtl"===a.getComputedStyle(document.body).direction}function e(){return document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop}function f(){return document.documentElement&&document.documentElement.scrollLeft||document.body.scrollLeft}function g(a){for(;a.lastChild;)a.removeChild(a.lastChild)}function h(a){if(null===a)return a;var b;if(Array.isArray(a)){b=[];for(var c=0;c<a.length;c+=1)b.push(h(a[c]));return b}if(a instanceof Date)return new Date(a.getTime());if(a instanceof RegExp)return b=new RegExp(a.source),b.global=a.global,b.ignoreCase=a.ignoreCase,b.multiline=a.multiline,b.lastIndex=a.lastIndex,b;if("object"==typeof a){b={};for(var d in a)a.hasOwnProperty(d)&&(b[d]=h(a[d]));return b}return a}function i(a,b){if(a.elements){var c=a.elements.root;c.parentNode.removeChild(c),delete a.elements,a.settings=h(a.__settings),a.__init=b,delete a.__internal}}function j(a,b){return function(){if(arguments.length>0){for(var c=[],d=0;d<arguments.length;d+=1)c.push(arguments[d]);return c.push(a),b.apply(a,c)}return b.apply(a,[null,a])}}function k(a,b){return{index:a,button:b,cancel:!1}}function l(a,b){if("function"==typeof b.get(a))return b.get(a).call(b)}function m(){function a(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function b(a){var b=d[a].dialog;return b&&"function"==typeof b.__init&&b.__init(b),b}function c(b,c,e,f){var g={dialog:null,factory:c};return void 0!==f&&(g.factory=function(){return a(new d[f].factory,new c)}),e||(g.dialog=a(new g.factory,w)),d[b]=g}var d={};return{defaults:p,dialog:function(d,e,f,g){if("function"!=typeof e)return b(d);if(this.hasOwnProperty(d))throw new Error("alertify.dialog: name already exists");var h=c(d,e,f,g);this[d]=f?function(){if(0===arguments.length)return h.dialog;var b=a(new h.factory,w);return b&&"function"==typeof b.__init&&b.__init(b),b.main.apply(b,arguments),b.show.apply(b)}:function(){if(h.dialog&&"function"==typeof h.dialog.__init&&h.dialog.__init(h.dialog),0===arguments.length)return h.dialog;var a=h.dialog;return a.main.apply(h.dialog,arguments),a.show.apply(h.dialog)}},closeAll:function(a){for(var b=q.slice(0),c=0;c<b.length;c+=1){var d=b[c];void 0!==a&&a===d||d.close()}},setting:function(a,c,d){if("notifier"===a)return x.setting(c,d);var e=b(a);return e?e.setting(c,d):void 0},set:function(a,b,c){return this.setting(a,b,c)},get:function(a,b){return this.setting(a,b)},notify:function(a,b,c,d){return x.create(b,d).push(a,c)},message:function(a,b,c){return x.create(null,c).push(a,b)},success:function(a,b,c){return x.create("success",c).push(a,b)},error:function(a,b,c){return x.create("error",c).push(a,b)},warning:function(a,b,c){return x.create("warning",c).push(a,b)},dismissAll:function(){x.dismissAll()}}}var n=":not(:disabled):not(.ajs-reset)",o={ENTER:13,ESC:27,F1:112,F12:123,LEFT:37,RIGHT:39,TAB:9},p={autoReset:!0,basic:!1,closable:!0,closableByDimmer:!0,invokeOnCloseOff:!1,frameless:!1,defaultFocusOff:!1,maintainFocus:!0,maximizable:!0,modal:!0,movable:!0,moveBounded:!1,overflow:!0,padding:!0,pinnable:!0,pinned:!0,preventBodyShift:!1,resizable:!0,startMaximized:!1,transition:"pulse",transitionOff:!1,tabbable:["button","[href]","input","select","textarea",'[tabindex]:not([tabindex^="-"])'+n].join(n+","),notifier:{delay:5,position:"bottom-right",closeButton:!1,classes:{base:"alertify-notifier",prefix:"ajs-",message:"ajs-message",top:"ajs-top",right:"ajs-right",bottom:"ajs-bottom",left:"ajs-left",center:"ajs-center",visible:"ajs-visible",hidden:"ajs-hidden",close:"ajs-close"}},glossary:{title:"AlertifyJS",ok:"OK",cancel:"Cancel",acccpt:"Accept",deny:"Deny",confirm:"Confirm",decline:"Decline",close:"Close",maximize:"Maximize",restore:"Restore"},theme:{input:"ajs-input",ok:"ajs-ok",cancel:"ajs-cancel"},hooks:{preinit:function(){},postinit:function(){}}},q=[],r=!1;try{var s=Object.defineProperty({},"passive",{get:function(){r=!0}});a.addEventListener("test",s,s),a.removeEventListener("test",s,s)}catch(z){}var t=function(a,b,c,d,e){a.addEventListener(b,c,r?{capture:d,passive:e}:!0===d)},u=function(a,b,c,d,e){a.removeEventListener(b,c,r?{capture:d,passive:e}:!0===d)},v=function(){var a,b,c=!1,d={animation:"animationend",OAnimation:"oAnimationEnd oanimationend",msAnimation:"MSAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};for(a in d)if(void 0!==document.documentElement.style[a]){b=d[a],c=!0;break}return{type:b,supported:c}}(),w=function(){function m(a){if(!a.__internal){y.defaults.hooks.preinit(a),delete a.__init,a.__settings||(a.__settings=h(a.settings));var c;"function"==typeof a.setup?(c=a.setup(),c.options=c.options||{},c.focus=c.focus||{}):c={buttons:[],focus:{element:null,select:!1},options:{}},"object"!=typeof a.hooks&&(a.hooks={});var d=[];if(Array.isArray(c.buttons))for(var e=0;e<c.buttons.length;e+=1){var f=c.buttons[e],g={};for(var i in f)f.hasOwnProperty(i)&&(g[i]=f[i]);d.push(g)}var k=a.__internal={isOpen:!1,activeElement:document.body,timerIn:void 0,timerOut:void 0,buttons:d,focus:c.focus,options:{title:void 0,modal:void 0,basic:void 0,frameless:void 0,defaultFocusOff:void 0,pinned:void 0,movable:void 0,moveBounded:void 0,resizable:void 0,autoReset:void 0,closable:void 0,closableByDimmer:void 0,invokeOnCloseOff:void 0,maximizable:void 0,startMaximized:void 0,pinnable:void 0,transition:void 0,transitionOff:void 0,padding:void 0,overflow:void 0,onshow:void 0,onclosing:void 0,onclose:void 0,onfocus:void 0,onmove:void 0,onmoved:void 0,onresize:void 0,onresized:void 0,onmaximize:void 0,onmaximized:void 0,onrestore:void 0,onrestored:void 0},resetHandler:void 0,beginMoveHandler:void 0,beginResizeHandler:void 0,bringToFrontHandler:void 0,modalClickHandler:void 0,buttonsClickHandler:void 0,commandsClickHandler:void 0,transitionInHandler:void 0,transitionOutHandler:void 0,destroy:void 0},l={};l.root=document.createElement("div"),l.root.style.display="none",l.root.className=Ha.base+" "+Ha.hidden+" ",l.root.innerHTML=Ga.dimmer+Ga.modal,l.dimmer=l.root.firstChild,l.modal=l.root.lastChild,l.modal.innerHTML=Ga.dialog,l.dialog=l.modal.firstChild,l.dialog.innerHTML=Ga.reset+Ga.commands+Ga.header+Ga.body+Ga.footer+Ga.resizeHandle+Ga.reset,l.reset=[],l.reset.push(l.dialog.firstChild),l.reset.push(l.dialog.lastChild),l.commands={},l.commands.container=l.reset[0].nextSibling,l.commands.pin=l.commands.container.firstChild,l.commands.maximize=l.commands.pin.nextSibling,l.commands.close=l.commands.maximize.nextSibling,l.header=l.commands.container.nextSibling,l.body=l.header.nextSibling,l.body.innerHTML=Ga.content,l.content=l.body.firstChild,l.footer=l.body.nextSibling,l.footer.innerHTML=Ga.buttons.auxiliary+Ga.buttons.primary,l.resizeHandle=l.footer.nextSibling,l.buttons={},l.buttons.auxiliary=l.footer.firstChild,l.buttons.primary=l.buttons.auxiliary.nextSibling,l.buttons.primary.innerHTML=Ga.button,l.buttonTemplate=l.buttons.primary.firstChild,l.buttons.primary.removeChild(l.buttonTemplate);for(var m=0;m<a.__internal.buttons.length;m+=1){var n=a.__internal.buttons[m];Ca.indexOf(n.key)<0&&Ca.push(n.key),n.element=l.buttonTemplate.cloneNode(),n.element.innerHTML=n.text,"string"==typeof n.className&&""!==n.className&&b(n.element,n.className);for(var o in n.attrs)"className"!==o&&n.attrs.hasOwnProperty(o)&&n.element.setAttribute(o,n.attrs[o]);"auxiliary"===n.scope?l.buttons.auxiliary.appendChild(n.element):l.buttons.primary.appendChild(n.element)}a.elements=l,k.resetHandler=j(a,Z),k.beginMoveHandler=j(a,ea),k.beginResizeHandler=j(a,ka),k.bringToFrontHandler=j(a,D),k.modalClickHandler=j(a,T),k.buttonsClickHandler=j(a,V),k.commandsClickHandler=j(a,H),k.transitionInHandler=j(a,aa),k.transitionOutHandler=j(a,ba);for(var p in k.options)void 0!==c.options[p]?a.set(p,c.options[p]):y.defaults.hasOwnProperty(p)?a.set(p,y.defaults[p]):"title"===p&&a.set(p,y.defaults.glossary[p]);"function"==typeof a.build&&a.build(),y.defaults.hooks.postinit(a)}document.body.appendChild(a.elements.root)}function n(){Aa=f(),Ba=e()}function r(){a.scrollTo(Aa,Ba)}function s(){for(var a=0,d=0;d<q.length;d+=1){var e=q[d];(e.isModal()||e.isMaximized())&&(a+=1)}0===a&&document.body.className.indexOf(Ha.noOverflow)>=0?(c(document.body,Ha.noOverflow),w(!1)):a>0&&document.body.className.indexOf(Ha.noOverflow)<0&&(w(!0),b(document.body,Ha.noOverflow))}function w(d){y.defaults.preventBodyShift&&(d&&document.documentElement.scrollHeight>document.documentElement.clientHeight?(Ja=Ba,Ia=a.getComputedStyle(document.body).top,b(document.body,Ha.fixed),document.body.style.top=-Ba+"px"):d||(Ba=Ja,document.body.style.top=Ia,c(document.body,Ha.fixed),r()))}function x(a,d,e){"string"==typeof e&&c(a.elements.root,Ha.prefix+e),b(a.elements.root,Ha.prefix+d),Da=a.elements.root.offsetWidth}function z(a){a.get("transitionOff")?b(a.elements.root,Ha.noTransition):c(a.elements.root,Ha.noTransition)}function A(a){a.get("modal")?(c(a.elements.root,Ha.modeless),a.isOpen()&&(ta(a),P(a),s())):(b(a.elements.root,Ha.modeless),a.isOpen()&&(sa(a),P(a),s()))}function B(a){a.get("basic")?b(a.elements.root,Ha.basic):c(a.elements.root,Ha.basic)}function C(a){a.get("frameless")?b(a.elements.root,Ha.frameless):c(a.elements.root,Ha.frameless)}function D(a,b){for(var c=q.indexOf(b),d=c+1;d<q.length;d+=1)if(q[d].isModal())return;return document.body.lastChild!==b.elements.root&&(document.body.appendChild(b.elements.root),q.splice(q.indexOf(b),1),q.push(b),Y(b)),!1}function E(a,d,e,f){switch(d){case"title":a.setHeader(f);break;case"modal":A(a);break;case"basic":B(a);break;case"frameless":C(a);break;case"pinned":Q(a);break;case"closable":S(a);break;case"maximizable":R(a);break;case"pinnable":M(a);break;case"movable":ia(a);break;case"resizable":oa(a);break;case"padding":f?c(a.elements.root,Ha.noPadding):a.elements.root.className.indexOf(Ha.noPadding)<0&&b(a.elements.root,Ha.noPadding);break;case"overflow":f?c(a.elements.root,Ha.noOverflow):a.elements.root.className.indexOf(Ha.noOverflow)<0&&b(a.elements.root,Ha.noOverflow);break;case"transition":x(a,f,e);break;case"transitionOff":z(a)}"function"==typeof a.hooks.onupdate&&a.hooks.onupdate.call(a,d,e,f)}function F(a,b,c,d,e){var f={op:void 0,items:[]};if(void 0===e&&"string"==typeof d)f.op="get",b.hasOwnProperty(d)?(f.found=!0,f.value=b[d]):(f.found=!1,f.value=void 0);else{var g;if(f.op="set","object"==typeof d){var h=d;for(var i in h)b.hasOwnProperty(i)?(b[i]!==h[i]&&(g=b[i],b[i]=h[i],c.call(a,i,g,h[i])),f.items.push({key:i,value:h[i],found:!0})):f.items.push({key:i,value:h[i],found:!1})}else{if("string"!=typeof d)throw new Error("args must be a string or object");b.hasOwnProperty(d)?(b[d]!==e&&(g=b[d],b[d]=e,c.call(a,d,g,e)),f.items.push({key:d,value:e,found:!0})):f.items.push({key:d,value:e,found:!1})}}return f}function G(a){var b;U(a,function(c){return b=!0!==a.get("invokeOnCloseOff")&&!0===c.invokeOnClose}),!b&&a.isOpen()&&a.close()}function H(a,b){switch(a.srcElement||a.target){case b.elements.commands.pin:b.isPinned()?J(b):I(b);break;case b.elements.commands.maximize:b.isMaximized()?L(b):K(b);break;case b.elements.commands.close:G(b)}return!1}function I(a){a.set("pinned",!0)}function J(a){a.set("pinned",!1)}function K(a){l("onmaximize",a),b(a.elements.root,Ha.maximized),a.isOpen()&&s(),l("onmaximized",a)}function L(a){l("onrestore",a),c(a.elements.root,Ha.maximized),a.isOpen()&&s(),l("onrestored",a)}function M(a){a.get("pinnable")?b(a.elements.root,Ha.pinnable):c(a.elements.root,Ha.pinnable)}function N(a){var b=f();a.elements.modal.style.marginTop=e()+"px",a.elements.modal.style.marginLeft=b+"px",a.elements.modal.style.marginRight=-b+"px"}function O(a){var b=parseInt(a.elements.modal.style.marginTop,10),c=parseInt(a.elements.modal.style.marginLeft,10);if(a.elements.modal.style.marginTop="",a.elements.modal.style.marginLeft="",a.elements.modal.style.marginRight="",a.isOpen()){var d=0,g=0;""!==a.elements.dialog.style.top&&(d=parseInt(a.elements.dialog.style.top,10)),a.elements.dialog.style.top=d+(b-e())+"px",""!==a.elements.dialog.style.left&&(g=parseInt(a.elements.dialog.style.left,10)),a.elements.dialog.style.left=g+(c-f())+"px"}}function P(a){a.get("modal")||a.get("pinned")?O(a):N(a)}function Q(a){a.get("pinned")?(c(a.elements.root,Ha.unpinned),a.isOpen()&&O(a)):(b(a.elements.root,Ha.unpinned),a.isOpen()&&!a.isModal()&&N(a))}function R(a){a.get("maximizable")?b(a.elements.root,Ha.maximizable):c(a.elements.root,Ha.maximizable)}function S(a){a.get("closable")?(b(a.elements.root,Ha.closable),ya(a)):(c(a.elements.root,Ha.closable),za(a))}function T(a,b){if(a.timeStamp-La>200&&(La=a.timeStamp)&&!Ka){var c=a.srcElement||a.target;!0===b.get("closableByDimmer")&&c===b.elements.modal&&G(b)}Ka=!1}function U(a,b){if(Date.now()-Ma>200&&(Ma=Date.now()))for(var c=0;c<a.__internal.buttons.length;c+=1){var d=a.__internal.buttons[c];if(!d.element.disabled&&b(d)){var e=k(c,d);"function"==typeof a.callback&&a.callback.apply(a,[e]),!1===e.cancel&&a.close();break}}}function V(a,b){var c=a.srcElement||a.target;U(b,function(a){return a.element===c&&(Na=!0)})}function W(a){if(Na)return void(Na=!1);var b=q[q.length-1],c=a.keyCode;return 0===b.__internal.buttons.length&&c===o.ESC&&!0===b.get("closable")?(G(b),!1):Ca.indexOf(c)>-1?(U(b,function(a){return a.key===c}),!1):void 0}function X(a){var b=q[q.length-1],c=a.keyCode;if(c===o.LEFT||c===o.RIGHT){for(var d=b.__internal.buttons,e=0;e<d.length;e+=1)if(document.activeElement===d[e].element)switch(c){case o.LEFT:return void d[(e||d.length)-1].element.focus();case o.RIGHT:return void d[(e+1)%d.length].element.focus()}}else if(c<o.F12+1&&c>o.F1-1&&Ca.indexOf(c)>-1)return a.preventDefault(),a.stopPropagation(),U(b,function(a){return a.key===c}),!1}function Y(a,b){if(b)b.focus();else{var c=a.__internal.focus,d=c.element;switch(typeof c.element){case"number":a.__internal.buttons.length>c.element&&(d=!0===a.get("basic")?a.elements.reset[0]:a.__internal.buttons[c.element].element);break;case"string":d=a.elements.body.querySelector(c.element);break;case"function":d=c.element.call(a)}!0!==a.get("defaultFocusOff")&&(void 0!==d&&null!==d||0!==a.__internal.buttons.length)||(d=a.elements.reset[0]),d&&d.focus&&(d.focus(),c.select&&d.select&&d.select())}}function Z(a,b){if(!b)for(var c=q.length-1;c>-1;c-=1)if(q[c].isModal()){b=q[c];break}if(b&&b.isModal()){var d,e=b.elements.reset[0],f=b.elements.reset[1],g=a.relatedTarget,h=b.elements.root.contains(g),i=a.srcElement||a.target;if(i===e&&!h||i===f&&g===e)return;i===f||i===document.body?d=e:i===e&&g===f?d=$(b):i===e&&h&&(d=$(b,!0)),Y(b,d)}}function $(a,b){var c=[].slice.call(a.elements.dialog.querySelectorAll(p.tabbable));b&&c.reverse();for(var d=0;d<c.length;d+=1){var e=c[d];if(e.offsetParent||e.offsetWidth||e.offsetHeight||e.getClientRects().length)return e}}function _(a){var b=q[q.length-1];b&&a.shiftKey&&a.keyCode===o.TAB&&b.elements.reset[1].focus()}function aa(a,b){clearTimeout(b.__internal.timerIn),Y(b),Na=!1,l("onfocus",b),u(b.elements.dialog,v.type,b.__internal.transitionInHandler),c(b.elements.root,Ha.animationIn)}function ba(a,b){clearTimeout(b.__internal.timerOut),u(b.elements.dialog,v.type,b.__internal.transitionOutHandler),ha(b),na(b),b.isMaximized()&&!b.get("startMaximized")&&L(b),"function"==typeof b.__internal.destroy&&b.__internal.destroy.apply(b)}function ca(a,b){var c=a[Ra]-Pa,d=a[Sa]-Qa;Ua&&(d-=document.body.scrollTop),b.style.left=c+"px",b.style.top=d+"px"}function da(a,b){var c=a[Ra]-Pa,d=a[Sa]-Qa;Ua&&(d-=document.body.scrollTop),b.style.left=Math.min(Ta.maxLeft,Math.max(Ta.minLeft,c))+"px",b.style.top=Ua?Math.min(Ta.maxTop,Math.max(Ta.minTop,d))+"px":Math.max(Ta.minTop,d)+"px"}function ea(a,c){if(null===Wa&&!c.isMaximized()&&c.get("movable")){var d,e=0,f=0;if("touchstart"===a.type?(a.preventDefault(),d=a.targetTouches[0],Ra="clientX",Sa="clientY"):0===a.button&&(d=a),d){var g=c.elements.dialog;if(b(g,Ha.capture),g.style.left&&(e=parseInt(g.style.left,10)),g.style.top&&(f=parseInt(g.style.top,10)),Pa=d[Ra]-e,Qa=d[Sa]-f,c.isModal()?Qa+=c.elements.modal.scrollTop:c.isPinned()&&(Qa-=document.body.scrollTop),c.get("moveBounded")){var h=g,i=-e,j=-f;do{i+=h.offsetLeft,j+=h.offsetTop}while(h=h.offsetParent);Ta={maxLeft:i,minLeft:-i,maxTop:document.documentElement.clientHeight-g.clientHeight-j,minTop:-j},Va=da}else Ta=null,Va=ca;return l("onmove",c),Ua=!c.isModal()&&c.isPinned(),Oa=c,Va(d,g),b(document.body,Ha.noSelection),!1}}}function fa(a){if(Oa){var b;"touchmove"===a.type?(a.preventDefault(),b=a.targetTouches[0]):0===a.button&&(b=a),b&&Va(b,Oa.elements.dialog)}}function ga(){if(Oa){var a=Oa;Oa=Ta=null,c(document.body,Ha.noSelection),c(a.elements.dialog,Ha.capture),l("onmoved",a)}}function ha(a){Oa=null;var b=a.elements.dialog;b.style.left=b.style.top=""}function ia(a){a.get("movable")?(b(a.elements.root,Ha.movable),a.isOpen()&&ua(a)):(ha(a),c(a.elements.root,Ha.movable),a.isOpen()&&va(a))}function ja(a,b,c){var e=b,f=0,g=0;do{f+=e.offsetLeft,g+=e.offsetTop}while(e=e.offsetParent);var h,i;!0===c?(h=a.pageX,i=a.pageY):(h=a.clientX,i=a.clientY);var j=d();if(j&&(h=document.body.offsetWidth-h,isNaN(Xa)||(f=document.body.offsetWidth-f-b.offsetWidth)),b.style.height=i-g+$a+"px",b.style.width=h-f+$a+"px",!isNaN(Xa)){var k=.5*Math.abs(b.offsetWidth-Ya);j&&(k*=-1),b.offsetWidth>Ya?b.style.left=Xa+k+"px":b.offsetWidth>=Za&&(b.style.left=Xa-k+"px")}}function ka(a,c){if(!c.isMaximized()){var d;if("touchstart"===a.type?(a.preventDefault(),d=a.targetTouches[0]):0===a.button&&(d=a),d){l("onresize",c),Wa=c,$a=c.elements.resizeHandle.offsetHeight/2;var e=c.elements.dialog;return b(e,Ha.capture),Xa=parseInt(e.style.left,10),e.style.height=e.offsetHeight+"px",e.style.minHeight=c.elements.header.offsetHeight+c.elements.footer.offsetHeight+"px",e.style.width=(Ya=e.offsetWidth)+"px","none"!==e.style.maxWidth&&(e.style.minWidth=(Za=e.offsetWidth)+"px"),e.style.maxWidth="none",b(document.body,Ha.noSelection),!1}}}function la(a){if(Wa){var b;"touchmove"===a.type?(a.preventDefault(),b=a.targetTouches[0]):0===a.button&&(b=a),b&&ja(b,Wa.elements.dialog,!Wa.get("modal")&&!Wa.get("pinned"))}}function ma(){if(Wa){var a=Wa;Wa=null,c(document.body,Ha.noSelection),c(a.elements.dialog,Ha.capture),Ka=!0,l("onresized",a)}}function na(a){Wa=null;var b=a.elements.dialog;"none"===b.style.maxWidth&&(b.style.maxWidth=b.style.minWidth=b.style.width=b.style.height=b.style.minHeight=b.style.left="",Xa=Number.Nan,Ya=Za=$a=0)}function oa(a){a.get("resizable")?(b(a.elements.root,Ha.resizable),a.isOpen()&&wa(a)):(na(a),c(a.elements.root,Ha.resizable),a.isOpen()&&xa(a))}function pa(){for(var a=0;a<q.length;a+=1){var b=q[a];b.get("autoReset")&&(ha(b),na(b))}}function qa(b){1===q.length&&(t(a,"resize",pa),t(document.body,"keyup",W),t(document.body,"keydown",X),t(document.body,"focus",Z),t(document.documentElement,"mousemove",fa),t(document.documentElement,"touchmove",fa,!1,!1),t(document.documentElement,"mouseup",ga),t(document.documentElement,"touchend",ga),t(document.documentElement,"mousemove",la),t(document.documentElement,"touchmove",la,!1,!1),t(document.documentElement,"mouseup",ma),t(document.documentElement,"touchend",ma)),t(b.elements.commands.container,"click",b.__internal.commandsClickHandler),t(b.elements.footer,"click",b.__internal.buttonsClickHandler),t(b.elements.reset[0],"focusin",b.__internal.resetHandler),t(b.elements.reset[0],"keydown",_),t(b.elements.reset[1],"focusin",b.__internal.resetHandler),Na=!0,t(b.elements.dialog,v.type,b.__internal.transitionInHandler),b.get("modal")||sa(b),b.get("resizable")&&wa(b),b.get("movable")&&ua(b)}function ra(b){1===q.length&&(u(a,"resize",pa),u(document.body,"keyup",W),u(document.body,"keydown",X),u(document.body,"focus",Z),u(document.documentElement,"mousemove",fa),u(document.documentElement,"mouseup",ga),u(document.documentElement,"mousemove",la),u(document.documentElement,"mouseup",ma)),u(b.elements.commands.container,"click",b.__internal.commandsClickHandler),u(b.elements.footer,"click",b.__internal.buttonsClickHandler),u(b.elements.reset[0],"focusin",b.__internal.resetHandler),u(b.elements.reset[0],"keydown",_),u(b.elements.reset[1],"focusin",b.__internal.resetHandler),t(b.elements.dialog,v.type,b.__internal.transitionOutHandler),b.get("modal")||ta(b),b.get("movable")&&va(b),b.get("resizable")&&xa(b)}function sa(a){t(a.elements.dialog,"focus",a.__internal.bringToFrontHandler,!0)}function ta(a){u(a.elements.dialog,"focus",a.__internal.bringToFrontHandler,!0)}function ua(a){t(a.elements.header,"mousedown",a.__internal.beginMoveHandler),t(a.elements.header,"touchstart",a.__internal.beginMoveHandler,!1,!1)}function va(a){u(a.elements.header,"mousedown",a.__internal.beginMoveHandler),u(a.elements.header,"touchstart",a.__internal.beginMoveHandler,!1,!1)}function wa(a){t(a.elements.resizeHandle,"mousedown",a.__internal.beginResizeHandler),t(a.elements.resizeHandle,"touchstart",a.__internal.beginResizeHandler,!1,!1)}function xa(a){u(a.elements.resizeHandle,"mousedown",a.__internal.beginResizeHandler),u(a.elements.resizeHandle,"touchstart",a.__internal.beginResizeHandler,!1,!1)}function ya(a){t(a.elements.modal,"click",a.__internal.modalClickHandler)}function za(a){u(a.elements.modal,"click",a.__internal.modalClickHandler)}var Aa,Ba,Ca=[],Da=null,Ea=!1,Fa=a.navigator.userAgent.indexOf("Safari")>-1&&a.navigator.userAgent.indexOf("Chrome")<0,Ga={dimmer:'<div class="ajs-dimmer"></div>',modal:'<div class="ajs-modal" tabindex="0"></div>',dialog:'<div class="ajs-dialog" tabindex="0"></div>',reset:'<button class="ajs-reset"></button>',commands:'<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',header:'<div class="ajs-header"></div>',body:'<div class="ajs-body"></div>',content:'<div class="ajs-content"></div>',footer:'<div class="ajs-footer"></div>',buttons:{primary:'<div class="ajs-primary ajs-buttons"></div>',auxiliary:'<div class="ajs-auxiliary ajs-buttons"></div>'},button:'<button class="ajs-button"></button>',resizeHandle:'<div class="ajs-handle"></div>'},Ha={animationIn:"ajs-in",animationOut:"ajs-out",base:"alertify",basic:"ajs-basic",capture:"ajs-capture",closable:"ajs-closable",fixed:"ajs-fixed",frameless:"ajs-frameless",hidden:"ajs-hidden",maximize:"ajs-maximize",maximized:"ajs-maximized",maximizable:"ajs-maximizable",modeless:"ajs-modeless",movable:"ajs-movable",noSelection:"ajs-no-selection",noOverflow:"ajs-no-overflow",noPadding:"ajs-no-padding",pin:"ajs-pin",pinnable:"ajs-pinnable",prefix:"ajs-",resizable:"ajs-resizable",restore:"ajs-restore",shake:"ajs-shake",unpinned:"ajs-unpinned",noTransition:"ajs-no-transition"},Ia="",Ja=0,Ka=!1,La=0,Ma=0,Na=!1,Oa=null,Pa=0,Qa=0,Ra="pageX",Sa="pageY",Ta=null,Ua=!1,Va=null,Wa=null,Xa=Number.Nan,Ya=0,Za=0,$a=0;return{__init:m,isOpen:function(){return this.__internal.isOpen},isModal:function(){return this.elements.root.className.indexOf(Ha.modeless)<0},isMaximized:function(){return this.elements.root.className.indexOf(Ha.maximized)>-1},isPinned:function(){return this.elements.root.className.indexOf(Ha.unpinned)<0},maximize:function(){return this.isMaximized()||K(this),this},restore:function(){return this.isMaximized()&&L(this),this},pin:function(){return this.isPinned()||I(this),this},unpin:function(){return this.isPinned()&&J(this),this},bringToFront:function(){return D(null,this),this},moveTo:function(a,b){if(!isNaN(a)&&!isNaN(b)){l("onmove",this);var c=this.elements.dialog,e=c,f=0,g=0;c.style.left&&(f-=parseInt(c.style.left,10)),c.style.top&&(g-=parseInt(c.style.top,10));do{f+=e.offsetLeft,g+=e.offsetTop}while(e=e.offsetParent);var h=a-f,i=b-g;d()&&(h*=-1),c.style.left=h+"px",c.style.top=i+"px",l("onmoved",this)}return this},resizeTo:function(a,b){var c=parseFloat(a),d=parseFloat(b),e=/(\d*\.\d+|\d+)%/;if(!isNaN(c)&&!isNaN(d)&&!0===this.get("resizable")){l("onresize",this),(""+a).match(e)&&(c=c/100*document.documentElement.clientWidth),(""+b).match(e)&&(d=d/100*document.documentElement.clientHeight);var f=this.elements.dialog;"none"!==f.style.maxWidth&&(f.style.minWidth=(Za=f.offsetWidth)+"px"),f.style.maxWidth="none",f.style.minHeight=this.elements.header.offsetHeight+this.elements.footer.offsetHeight+"px",f.style.width=c+"px",f.style.height=d+"px",l("onresized",this)}return this},setting:function(a,b){var c=this,d=F(this,this.__internal.options,function(a,b,d){E(c,a,b,d)},a,b);if("get"===d.op)return d.found?d.value:void 0!==this.settings?F(this,this.settings,this.settingUpdated||function(){},a,b).value:void 0;if("set"===d.op){if(d.items.length>0)for(var e=this.settingUpdated||function(){},f=0;f<d.items.length;f+=1){var g=d.items[f];g.found||void 0===this.settings||F(this,this.settings,e,g.key,g.value)}return this}},set:function(a,b){return this.setting(a,b),this},get:function(a){return this.setting(a)},setHeader:function(b){return"string"==typeof b?(g(this.elements.header),this.elements.header.innerHTML=b):b instanceof a.HTMLElement&&this.elements.header.firstChild!==b&&(g(this.elements.header),this.elements.header.appendChild(b)),this},setContent:function(b){return"string"==typeof b?(g(this.elements.content),this.elements.content.innerHTML=b):b instanceof a.HTMLElement&&this.elements.content.firstChild!==b&&(g(this.elements.content),this.elements.content.appendChild(b)),this},showModal:function(a){return this.show(!0,a)},show:function(a,d){if(m(this),this.__internal.isOpen){ha(this),na(this),b(this.elements.dialog,Ha.shake);var e=this;setTimeout(function(){c(e.elements.dialog,Ha.shake)},200)}else{if(this.__internal.isOpen=!0,q.push(this),y.defaults.maintainFocus&&(this.__internal.activeElement=document.activeElement),document.body.hasAttribute("tabindex")||document.body.setAttribute("tabindex",Ea="0"),"function"==typeof this.prepare&&this.prepare(),qa(this),void 0!==a&&this.set("modal",a),n(),s(),"string"==typeof d&&""!==d&&(this.__internal.className=d,b(this.elements.root,d)),this.get("startMaximized")?this.maximize():this.isMaximized()&&L(this),P(this),this.elements.root.removeAttribute("style"),c(this.elements.root,Ha.animationOut),b(this.elements.root,Ha.animationIn),clearTimeout(this.__internal.timerIn),this.__internal.timerIn=setTimeout(this.__internal.transitionInHandler,v.supported?1e3:100),Fa){var f=this.elements.root;f.style.display="none",setTimeout(function(){f.style.display="block"},0)}Da=this.elements.root.offsetWidth,c(this.elements.root,Ha.hidden),r(),"function"==typeof this.hooks.onshow&&this.hooks.onshow.call(this),l("onshow",this)}return this},close:function(){return this.__internal.isOpen&&!1!==l("onclosing",this)&&(ra(this),c(this.elements.root,Ha.animationIn),b(this.elements.root,Ha.animationOut),clearTimeout(this.__internal.timerOut),this.__internal.timerOut=setTimeout(this.__internal.transitionOutHandler,v.supported?1e3:100),b(this.elements.root,Ha.hidden),Da=this.elements.modal.offsetWidth,y.defaults.maintainFocus&&this.__internal.activeElement&&(this.__internal.activeElement.focus(),this.__internal.activeElement=null),void 0!==this.__internal.className&&""!==this.__internal.className&&c(this.elements.root,this.__internal.className),"function"==typeof this.hooks.onclose&&this.hooks.onclose.call(this),l("onclose",this),q.splice(q.indexOf(this),1),this.__internal.isOpen=!1,s()),q.length||"0"!==Ea||document.body.removeAttribute("tabindex"),this},closeOthers:function(){return y.closeAll(this),this},destroy:function(){return this.__internal&&(this.__internal.isOpen?(this.__internal.destroy=function(){i(this,m)},this.close()):this.__internal.destroy||i(this,m)),this}}}(),x=function(){function d(a){if(!a.__internal){a.__internal={position:y.defaults.notifier.position,delay:y.defaults.notifier.delay},l=document.createElement("DIV");("transitionOff"in p.notifier?p.notifier.transitionOff:p.transitionOff)&&(o=n.base+" ajs-no-transition"),h(a)}l.parentNode!==document.body&&document.body.appendChild(l)}function e(a){a.__internal.pushed=!0,m.push(a)}function f(a){m.splice(m.indexOf(a),1),a.__internal.pushed=!1}function h(a){switch(l.className=o,a.__internal.position){case"top-right":b(l,n.top+" "+n.right);break;case"top-left":b(l,n.top+" "+n.left);break;case"top-center":b(l,n.top+" "+n.center);break;case"bottom-left":b(l,n.bottom+" "+n.left);break;case"bottom-center":b(l,n.bottom+" "+n.center);break;default:case"bottom-right":b(l,n.bottom+" "+n.right)}}function i(d,h){function i(a,b){b.__internal.closeButton&&"true"!==a.target.getAttribute("data-close")||b.dismiss(!0)}function m(a,b){u(b.element,v.type,m),l.removeChild(b.element)}function o(a){return a.__internal||(a.__internal={pushed:!1,delay:void 0,timer:void 0,clickHandler:void 0,transitionEndHandler:void 0,transitionTimeout:void 0},a.__internal.clickHandler=j(a,i),a.__internal.transitionEndHandler=j(a,m)),a}function p(a){clearTimeout(a.__internal.timer),clearTimeout(a.__internal.transitionTimeout)}return o({element:d,push:function(a,c){if(!this.__internal.pushed){e(this),p(this);var d,f;switch(arguments.length){case 0:f=this.__internal.delay;break;case 1:"number"==typeof a?f=a:(d=a,f=this.__internal.delay);break;case 2:d=a,f=c}return this.__internal.closeButton=y.defaults.notifier.closeButton,void 0!==d&&this.setContent(d),x.__internal.position.indexOf("top")<0?l.appendChild(this.element):l.insertBefore(this.element,l.firstChild),k=this.element.offsetWidth,b(this.element,n.visible),t(this.element,"click",this.__internal.clickHandler),this.delay(f)}return this},ondismiss:function(){},callback:h,dismiss:function(a){return this.__internal.pushed&&(p(this),"function"==typeof this.ondismiss&&!1===this.ondismiss.call(this)||(u(this.element,"click",this.__internal.clickHandler),void 0!==this.element&&this.element.parentNode===l&&(this.__internal.transitionTimeout=setTimeout(this.__internal.transitionEndHandler,v.supported?1e3:100),c(this.element,n.visible),"function"==typeof this.callback&&this.callback.call(this,a)),f(this))),this},delay:function(a){if(p(this),this.__internal.delay=void 0===a||isNaN(+a)?x.__internal.delay:+a,this.__internal.delay>0){var b=this;this.__internal.timer=setTimeout(function(){b.dismiss()},1e3*this.__internal.delay)}return this},setContent:function(c){if("string"==typeof c?(g(this.element),this.element.innerHTML=c):c instanceof a.HTMLElement&&this.element.firstChild!==c&&(g(this.element),this.element.appendChild(c)),this.__internal.closeButton){var d=document.createElement("span");b(d,n.close),d.setAttribute("data-close",!0),this.element.appendChild(d)}return this},dismissOthers:function(){return x.dismissAll(this),this}})}var k,l,m=[],n=p.notifier.classes,o=n.base;return{setting:function(a,b){if(d(this),void 0===b)return this.__internal[a];switch(a){case"position":this.__internal.position=b,h(this);break;case"delay":this.__internal.delay=b}return this},set:function(a,b){return this.setting(a,b),this},get:function(a){return this.setting(a)},create:function(a,b){d(this);var c=document.createElement("div");return c.className=n.message+("string"==typeof a&&""!==a?" "+n.prefix+a:""),i(c,b)},dismissAll:function(a){for(var b=m.slice(0),c=0;c<b.length;c+=1){var d=b[c];void 0!==a&&a===d||d.dismiss()}}}}(),y=new m;y.dialog("alert",function(){return{main:function(a,b,c){var d,e,f;switch(arguments.length){case 1:e=a;break;case 2:"function"==typeof b?(e=a,f=b):(d=a,e=b);break;case 3:d=a,e=b,f=c}return this.set("title",d),this.set("message",e),this.set("onok",f),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.ok}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(a){this.setContent(a)},settings:{message:void 0,onok:void 0,label:void 0},settingUpdated:function(a,b,c){switch(a){case"message":this.setMessage(c);break;case"label":this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=c)}},
callback:function(a){if("function"==typeof this.get("onok")){var b=this.get("onok").call(this,a);void 0!==b&&(a.cancel=!b)}}}}),y.dialog("confirm",function(){function a(a){null!==c.timer&&(clearInterval(c.timer),c.timer=null,a.__internal.buttons[c.index].element.innerHTML=c.text)}function b(b,d,e){a(b),c.duration=e,c.index=d,c.text=b.__internal.buttons[d].element.innerHTML,c.timer=setInterval(j(b,c.task),1e3),c.task(null,b)}var c={timer:null,index:null,text:null,duration:null,task:function(b,d){if(d.isOpen()){if(d.__internal.buttons[c.index].element.innerHTML=c.text+" (&#8207;"+c.duration+"&#8207;) ",c.duration-=1,-1===c.duration){a(d);var e=d.__internal.buttons[c.index],f=k(c.index,e);"function"==typeof d.callback&&d.callback.apply(d,[f]),!1!==f.close&&d.close()}}else a(d)}};return{main:function(a,b,c,d){var e,f,g,h;switch(arguments.length){case 1:f=a;break;case 2:f=a,g=b;break;case 3:f=a,g=b,h=c;break;case 4:e=a,f=b,g=c,h=d}return this.set("title",e),this.set("message",f),this.set("onok",g),this.set("oncancel",h),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ENTER,className:y.defaults.theme.ok},{text:y.defaults.glossary.cancel,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.cancel}],focus:{element:0,select:!1},options:{maximizable:!1,resizable:!1}}},build:function(){},prepare:function(){},setMessage:function(a){this.setContent(a)},settings:{message:null,labels:null,onok:null,oncancel:null,defaultFocus:null,reverseButtons:null},settingUpdated:function(a,b,c){switch(a){case"message":this.setMessage(c);break;case"labels":"ok"in c&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].text=c.ok,this.__internal.buttons[0].element.innerHTML=c.ok),"cancel"in c&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].text=c.cancel,this.__internal.buttons[1].element.innerHTML=c.cancel);break;case"reverseButtons":!0===c?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element);break;case"defaultFocus":this.__internal.focus.element="ok"===c?0:1}},callback:function(b){a(this);var c;switch(b.index){case 0:"function"==typeof this.get("onok")&&void 0!==(c=this.get("onok").call(this,b))&&(b.cancel=!c);break;case 1:"function"==typeof this.get("oncancel")&&void 0!==(c=this.get("oncancel").call(this,b))&&(b.cancel=!c)}},autoOk:function(a){return b(this,0,a),this},autoCancel:function(a){return b(this,1,a),this}}}),y.dialog("prompt",function(){var b=document.createElement("INPUT"),c=document.createElement("P");return{main:function(a,b,c,d,e){var f,g,h,i,j;switch(arguments.length){case 1:g=a;break;case 2:g=a,h=b;break;case 3:g=a,h=b,i=c;break;case 4:g=a,h=b,i=c,j=d;break;case 5:f=a,g=b,h=c,i=d,j=e}return this.set("title",f),this.set("message",g),this.set("value",h),this.set("onok",i),this.set("oncancel",j),this},setup:function(){return{buttons:[{text:y.defaults.glossary.ok,key:o.ENTER,className:y.defaults.theme.ok},{text:y.defaults.glossary.cancel,key:o.ESC,invokeOnClose:!0,className:y.defaults.theme.cancel}],focus:{element:b,select:!0},options:{maximizable:!1,resizable:!1}}},build:function(){b.className=y.defaults.theme.input,b.setAttribute("type","text"),b.value=this.get("value"),this.elements.content.appendChild(c),this.elements.content.appendChild(b)},prepare:function(){},setMessage:function(b){"string"==typeof b?(g(c),c.innerHTML=b):b instanceof a.HTMLElement&&c.firstChild!==b&&(g(c),c.appendChild(b))},settings:{message:void 0,labels:void 0,onok:void 0,oncancel:void 0,value:"",type:"text",reverseButtons:void 0},settingUpdated:function(a,c,d){switch(a){case"message":this.setMessage(d);break;case"value":b.value=d;break;case"type":switch(d){case"text":case"color":case"date":case"datetime-local":case"email":case"month":case"number":case"password":case"search":case"tel":case"time":case"week":b.type=d;break;default:b.type="text"}break;case"labels":d.ok&&this.__internal.buttons[0].element&&(this.__internal.buttons[0].element.innerHTML=d.ok),d.cancel&&this.__internal.buttons[1].element&&(this.__internal.buttons[1].element.innerHTML=d.cancel);break;case"reverseButtons":!0===d?this.elements.buttons.primary.appendChild(this.__internal.buttons[0].element):this.elements.buttons.primary.appendChild(this.__internal.buttons[1].element)}},callback:function(a){var c;switch(a.index){case 0:this.settings.value=b.value,"function"==typeof this.get("onok")&&void 0!==(c=this.get("onok").call(this,a,this.settings.value))&&(a.cancel=!c);break;case 1:"function"==typeof this.get("oncancel")&&void 0!==(c=this.get("oncancel").call(this,a))&&(a.cancel=!c),a.cancel||(b.value=this.settings.value)}}}}),"object"==typeof module&&"object"==typeof module.exports?module.exports=y:"function"==typeof define&&define.amd?define([],function(){return y}):a.alertify||(a.alertify=y)}("undefined"!=typeof window?window:this);
;/* extensions/RedHat/web/colResize/dataTables.colResize.js */
/*! ColResize 0.0.11
*/
/**
* @summary     ColResize
* @description Provide the ability to resize columns in a DataTable
* @version     0.0.11
* @file        dataTables.colResize.js
* @author      Silvacom Ltd.
*
* For details please refer to: http://www.datatables.net
*
* Special thank to everyone who has contributed to this plug in
* - dykstrad
* - tdillan (for 0.0.3 and 0.0.5 bug fixes)
* - kylealonius (for 0.0.8 bug fix)
* - the86freak (for 0.0.9 bug fix)
*/
(function (window, document, undefined) {
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* DataTables plug-in API functions test
*
* This are required by ColResize in order to perform the tasks required, and also keep this
* code portable, to be used for other column resize projects with DataTables, if needed.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
var factory = function ($, DataTable) {
"use strict";
/**
* Plug-in for DataTables which will resize the columns depending on the handle clicked
*  @method  $.fn.dataTableExt.oApi.fnColResize
*  @param   object oSettings DataTables settings object - automatically added by DataTables!
*  @param   int iCol Take the column to be resized
*  @returns void
*/
$.fn.dataTableExt.oApi.fnColResize = function (oSettings, iCol) {
var v110 = $.fn.dataTable.Api ? true : false;
/*
* Update DataTables' event handlers
*/
/* Fire an event so other plug-ins can update */
$(oSettings.oInstance).trigger('column-resize', [oSettings, {
"iCol": iCol
}]);
};
/**
* ColResize provides column resize control for DataTables
* @class ColResize
* @constructor
* @param {object} dt DataTables settings object
* @param {object} opts ColResize options
*/
var ColResize = function (dt, opts) {
var oDTSettings;
if ($.fn.dataTable.Api) {
oDTSettings = new $.fn.dataTable.Api(dt).settings()[0];
}
else if (dt.fnSettings) {
oDTSettings = dt.fnSettings();
}
else if (typeof dt === 'string') {
if ($.fn.dataTable.fnIsDataTable($(dt)[0])) {
oDTSettings = $(dt).eq(0).dataTable().fnSettings();
}
}
else if (dt.nodeName && dt.nodeName.toLowerCase() === 'table') {
if ($.fn.dataTable.fnIsDataTable(dt.nodeName)) {
oDTSettings = $(dt.nodeName).dataTable().fnSettings();
}
}
else if (dt instanceof jQuery) {
if ($.fn.dataTable.fnIsDataTable(dt[0])) {
oDTSettings = dt.eq(0).dataTable().fnSettings();
}
}
else {
oDTSettings = dt;
}
if ($.fn.dataTable.camelToHungarian) {
$.fn.dataTable.camelToHungarian(ColResize.defaults, opts || {});
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Public class variables
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
* @namespace Settings object which contains customizable information for ColResize instance
*/
this.s = {
/**
* DataTables settings object
*  @property dt
*  @type     Object
*  @default  null
*/
"dt": null,
/**
* Initialisation object used for this instance
*  @property init
*  @type     object
*  @default  {}
*/
"init": $.extend(true, {}, ColResize.defaults, opts),
/**
* @namespace Information used for the mouse drag
*/
"mouse": {
"startX": -1,
"startY": -1,
"targetIndex": -1,
"targetColumn": -1,
"neighbourIndex": -1,
"neighbourColumn": -1
},
/**
* Status variable keeping track of mouse down status
*  @property isMousedown
*  @type     boolean
*  @default  false
*/
"isMousedown": false
};
/**
* @namespace Common and useful DOM elements for the class instance
*/
this.dom = {
/**
* Resizing element (the one the mouse is resizing)
*  @property resize
*  @type     element
*  @default  null
*/
"resizeCol": null,
/**
* Resizing element neighbour (the column next to the one the mouse is resizing)
* This is for fixed table resizing.
*  @property resize
*  @type     element
*  @default  null
*/
"resizeColNeighbour": null,
/**
*  Array of events to be restored, used for overriding existing events from other plugins for a time.
*  @property restoreEvents
*  @type     array
*  @default  []
*/
"restoreEvents": []
};
/* Constructor logic */
this.s.dt = oDTSettings.oInstance.fnSettings();
this.s.dt._colResize = this;
this._fnConstruct();
/* Add destroy callback */
oDTSettings.oApi._fnCallbackReg(oDTSettings, 'aoDestroyCallback', $.proxy(this._fnDestroy, this), 'ColResize');
return this;
};
ColResize.prototype = {
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Public methods
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
* Reset the column widths to the original widths that was detected on
* start up.
*  @return {this} Returns `this` for chaining.
*
*  @example
*    // DataTables initialisation with ColResize
*    var table = $('#example').dataTable( {
*        "sDom": 'Zlfrtip'
*    } );
*
*    // Add click event to a button to reset the ordering
*    $('#resetOrdering').click( function (e) {
*        e.preventDefault();
*        $.fn.dataTable.ColResize( table ).fnReset();
*    } );
*/
"fnReset": function () {
var a = [];
for (var i = 0, iLen = this.s.dt.aoColumns.length; i < iLen; i++) {
this.s.dt.aoColumns[i].width = this.s.dt.aoColumns[i]._ColResize_iOrigWidth;
}
this.s.dt.adjust().draw();
return this;
},
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Private methods (they are of course public in JS, but recommended as private)
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
* Constructor logic
*  @method  _fnConstruct
*  @returns void
*  @private
*/
"_fnConstruct": function () {
var that = this;
var iLen = that.s.dt.aoColumns.length;
var i;
that._fnSetupMouseListeners();
/* Add event handlers for the resize handles */
for (i = 0; i < iLen; i++) {
/* Mark the original column width for later reference */
this.s.dt.aoColumns[i]._ColResize_iOrigWidth = this.s.dt.aoColumns[i].width;
}
this._fnSetColumnIndexes();
/* State saving */
this.s.dt.oApi._fnCallbackReg(this.s.dt, 'aoStateSaveParams', function (oS, oData) {
that._fnStateSave.call(that, oData);
}, "ColResize_State");
this._fnStateLoad();
},
/**
* @method  _fnStateSave
* @param   object oState DataTables state
* @private
*/
"_fnStateSave": function (oState) {
this.s.dt.aoColumns.forEach(function (col, index) {
oState.columns[index].width = col.sWidthOrig;
});
},
/**
* If state has been loaded, apply the saved widths to the columns
* @method  _fnStateLoad
* @private
*/
"_fnStateLoad": function () {
var that = this,
loadedState = this.s.dt.oLoadedState;
if (loadedState && loadedState.columns) {
var colStates = loadedState.columns,
currCols = this.s.dt.aoColumns;
if (colStates.length > 0 && colStates.length === currCols.length) {
colStates.forEach(function (state, index) {
var col = that.s.dt.aoColumns[index];
if (state.width) {
col.sWidthOrig = col.sWidth = state.width;
}
});
}
}
},
/**
* Remove events of type from obj add it to restoreEvents array to be restored at a later time
* @param until string flag when to restore the event
* @param obj Object to remove events from
* @param type type of event to remove
* @param namespace namespace of the event being removed
*/
"_fnDelayEvents": function (until, obj, type, namespace) {
var that = this;
var events = $._data($(obj).get(0), 'events');
$.each(events, function (i, o) {
if (i == type) {
$.each(o, function (k, v) {
if (v) {
if (namespace) {
that.dom.restoreEvents.push({ "until": until, "obj": obj, "type": v.type, "namespace": v.namespace, "handler": v.handler });
if (v.namespace == namespace) {
$(obj).off(type + "." + namespace);
}
} else {
that.dom.restoreEvents.push({ "until": until, "obj": obj, "type": v.type, "namespace": null, "handler": v.handler });
$(obj).off(type);
}
}
});
}
});
},
/**
* Loop through restoreEvents array and restore the events on the elements provided
*/
"_fnRestoreEvents": function (until) {
var that = this;
var i;
for (i = that.dom.restoreEvents.length; i--;) {
if (that.dom.restoreEvents[i].until == undefined || that.dom.restoreEvents[i].until == null || that.dom.restoreEvents[i].until == until) {
if (that.dom.restoreEvents[i].namespace) {
$(that.dom.restoreEvents[i].obj).off(that.dom.restoreEvents[i].type + "." + that.dom.restoreEvents[i].namespace).on(that.dom.restoreEvents[i].type + "." + that.dom.restoreEvents[i].namespace, that.dom.restoreEvents[i].handler);
that.dom.restoreEvents.splice(i, 1);
} else {
$(that.dom.restoreEvents[i].obj).off(that.dom.restoreEvents[i].type).on(that.dom.restoreEvents[i].type, that.dom.restoreEvents[i].handler);
that.dom.restoreEvents.splice(i, 1);
}
}
}
},
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Mouse drop and drag
*/
"_fnSetupMouseListeners": function () {
var that = this;
$(that.s.dt.nTableWrapper).off("mouseenter.ColResize").on("mouseenter.ColResize", "th", function (e) {
e.preventDefault();
that._fnMouseEnter.call(that, e, this);
});
$(that.s.dt.nTableWrapper).off("mouseleave.ColResize").on("mouseleave.ColResize", "th", function (e) {
e.preventDefault();
that._fnMouseLeave.call(that, e, this);
});
},
/**
* Add mouse listeners to the resize handle on TH element
*  @method  _fnMouseListener
*  @param   i Column index
*  @param   nTh TH resize handle element clicked on
*  @returns void
*  @private
*/
"_fnMouseListener": function (i, nTh) {
var that = this;
$(nTh).off('mouseenter.ColResize').on('mouseenter.ColResize', function (e) {
e.preventDefault();
that._fnMouseEnter.call(that, e, nTh);
});
$(nTh).off('mouseleave.ColResize').on('mouseleave.ColResize', function (e) {
e.preventDefault();
that._fnMouseLeave.call(that, e, nTh);
});
},
/**
*
* @param e Mouse event
* @param nTh TH element that the mouse is over
*/
"_fnMouseEnter": function (e, nTh) {
var that = this;
if (!that.s.isMousedown) {
$(nTh).off('mousemove.ColResizeHandle').on('mousemove.ColResizeHandle', function (e) {
e.preventDefault();
that._fnResizeHandleCheck.call(that, e, nTh);
});
}
},
/**
* Clear mouse events when the mouse has left the th
* @param e Mouse event
* @param nTh TH element that the mouse has just left
*/
"_fnMouseLeave": function (e, nTh) {
$(nTh).off('mousemove.ColResizeHandle');
},
/**
* Mouse down on a TH element in the table header
*  @method  _fnMouseDown
*  @param   event e Mouse event
*  @param   element nTh TH element to be resized
*  @returns void
*  @private
*/
"_fnMouseDown": function (e, nTh) {
var that = this;
that.s.isMousedown = true;
/* Store information about the mouse position */
var target = $(e.target).closest('th, td');
var offset = target.offset();
/* Store information about the mouse position for resize calculations in mouse move function */
this.s.mouse.startX = e.pageX;
this.s.mouse.startY = e.pageY;
var idx = parseInt(that.dom.resizeCol.attr("data-column-index"));
if (that.dom.resizeColNeighbour[0] === undefined) {
var idxNeighbour = 0;
} else {
var idxNeighbour = parseInt(that.dom.resizeColNeighbour.attr("data-column-index"));
}
if (idx === undefined) {
return;
}
this.s.mouse.targetIndex = idx;
this.s.mouse.targetColumn = this.s.dt.aoColumns[idx];
this.s.mouse.neighbourIndex = idxNeighbour;
this.s.mouse.neighbourColumn = this.s.dt.aoColumns[idxNeighbour];
/* Add event handlers to the document */
$(document)
.off('mousemove.ColResize').on('mousemove.ColResize', function (e) {
that._fnMouseMove.call(that, e);
})
.off('mouseup.ColResize').on('mouseup.ColResize', function (e) {
that._fnMouseUp.call(that, e);
});
},
/**
* Deal with a mouse move event while dragging to resize a column
*  @method  _fnMouseMove
*  @param   e Mouse event
*  @returns void
*  @private
*/
"_fnMouseMove": function (e) {
var that = this;
var offset = $(that.s.mouse.targetColumn.nTh).offset();
var relativeX = (e.pageX - offset.left);
var distFromLeft = relativeX;
var distFromRight = $(that.s.mouse.targetColumn.nTh).outerWidth() - relativeX - 1;
var dx = e.pageX - that.s.mouse.startX;
var minColumnWidth = Math.max(parseInt($(that.s.mouse.targetColumn.nTh).css('min-width')), 10);
var prevWidth = $(that.s.mouse.targetColumn.nTh).width();
if ((dx > 0 && distFromRight <= 0) || (dx < 0 && distFromRight >= 0)) {
if (!that.s.init.tableWidthFixed) {
var newColWidth = Math.max(minColumnWidth, prevWidth + dx);
var widthDiff = newColWidth - prevWidth;
var colResizeIdx = parseInt(that.dom.resizeCol.attr("data-column-index"));
that.s.mouse.targetColumn.sWidthOrig = that.s.mouse.targetColumn.sWidth = that.s.mouse.targetColumn.width = newColWidth + "px";
var domCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='" + colResizeIdx + "']");
domCols.parents("table").each(function () {
if (!$(this).parent().hasClass("DTFC_LeftBodyLiner")) {
var newWidth = $(this).width() + widthDiff;
$(this).width(newWidth);
} else {
var newWidth = $(that.s.dt.nTableWrapper).find(".DTFC_LeftHeadWrapper").children("table").width();
$(this).parents(".DTFC_LeftWrapper").width(newWidth);
$(this).parent().width(newWidth + 15);
$(this).width(newWidth);
}
});
domCols.width(that.s.mouse.targetColumn.width);
} else {
if (that.s.mouse.neighbourColumn) {
var minColumnNeighbourWidth = Math.max(parseInt($(that.s.mouse.neighbourColumn.nTh).css('min-width')), 10);
var prevNeighbourWidth = $(that.s.mouse.neighbourColumn.nTh).width();
var newColWidth = Math.max(minColumnWidth, prevWidth + dx);
var newColNeighbourWidth = Math.max(minColumnNeighbourWidth, prevNeighbourWidth - dx);
var widthDiff = newColWidth - prevWidth;
var widthDiffNeighbour = newColNeighbourWidth - prevNeighbourWidth;
var colResizeIdx = parseInt(that.dom.resizeCol.attr("data-column-index"));
var neighbourColResizeIdx = parseInt(that.dom.resizeColNeighbour.attr("data-column-index"));
that.s.mouse.neighbourColumn.sWidthOrig = that.s.mouse.neighbourColumn.sWidth = that.s.mouse.neighbourColumn.width = newColNeighbourWidth + "px";
that.s.mouse.targetColumn.sWidthOrig = that.s.mouse.targetColumn.sWidth = that.s.mouse.targetColumn.width = newColWidth + "px";
var domNeighbourCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='" + neighbourColResizeIdx + "']");
var domCols = $(that.s.dt.nTableWrapper).find("th[data-column-index='" + colResizeIdx + "']");
if (dx > 0) {
domNeighbourCols.width(that.s.mouse.neighbourColumn.width);
domCols.width(that.s.mouse.targetColumn.width);
} else {
domCols.width(that.s.mouse.targetColumn.width);
domNeighbourCols.width(that.s.mouse.neighbourColumn.width);
}
}
}
}
that.s.mouse.startX = e.pageX;
},
/**
* Check to see if the mouse is over the resize handle area
* @param e
* @param nTh
*/
"_fnResizeHandleCheck": function (e, nTh) {
var that = this;
var offset = $(nTh).offset();
var relativeX = (e.pageX - offset.left);
var relativeY = (e.pageY - offset.top);
var distFromLeft = relativeX;
var distFromRight = $(nTh).outerWidth() - relativeX - 1;
var handleBuffer = this.s.init.handleWidth / 2;
var leftHandleOn = distFromLeft < handleBuffer;
var rightHandleOn = distFromRight < handleBuffer;
if ($(nTh).prev("th").length == 0) {
if (this.s.init.rtl)
rightHandleOn = false;
else
leftHandleOn = false;
}
if ($(nTh).next("th").length == 0 && this.s.init.tableWidthFixed) {
if (this.s.init.rtl)
leftHandleOn = false;
else
rightHandleOn = false;
}
var resizeAvailable = leftHandleOn || rightHandleOn;
if (that.s.init.rtl) {
if (leftHandleOn) {
that.dom.resizeCol = $(nTh);
that.dom.resizeColNeighbour = $(nTh).next();
} else if (rightHandleOn) {
that.dom.resizeCol = $(nTh).prev();
that.dom.resizeColNeighbour = $(nTh);
}
} else {
if (rightHandleOn) {
that.dom.resizeCol = $(nTh);
that.dom.resizeColNeighbour = $(nTh).next();
} else if (leftHandleOn) {
that.dom.resizeCol = $(nTh).prev();
that.dom.resizeColNeighbour = $(nTh);
}
}
if (this.s.init.tableWidthFixed)
resizeAvailable &= this.s.init.exclude.indexOf(parseInt($(that.dom.resizeCol).attr("data-column-index"))) == -1 && this.s.init.exclude.indexOf(parseInt($(that.dom.resizeColNeighbour).attr("data-column-index"))) == -1;
else
resizeAvailable &= this.s.init.exclude.indexOf(parseInt($(that.dom.resizeCol).attr("data-column-index"))) == -1;
$(nTh).off('mousedown.ColResize');
if (resizeAvailable) {
$(nTh).css("cursor", "ew-resize");
that._fnDelayEvents(null, nTh, "mousedown", "ColReorder");
that._fnDelayEvents("click", nTh, "click", "DT");
$(nTh).off('mousedown.ColResize').on('mousedown.ColResize', function (e) {
e.preventDefault();
that._fnMouseDown.call(that, e, nTh);
})
.off('click.ColResize').on('click.ColResize', function (e) {
that._fnClick.call(that, e);
});
} else {
$(nTh).css("cursor", "pointer");
$(nTh).off('mousedown.ColResize click.ColResize');
that._fnRestoreEvents();
if (!that.s.isMousedown)
this._fnRestoreEvents("click");
}
},
"_fnClick": function (e) {
var that = this;
that.s.isMousedown = false;
e.stopImmediatePropagation();
},
/**
* Finish off the mouse drag
*  @method  _fnMouseUp
*  @param   e Mouse event
*  @returns void
*  @private
*/
"_fnMouseUp": function (e) {
var that = this;
that.s.isMousedown = false;
that.s.mouse.targetColumn.width = that.dom.resizeCol.width();
$(document).off('mousemove.ColResize mouseup.ColResize');
this.s.dt.oInstance.fnAdjustColumnSizing();
var LeftWrapper = $(that.s.dt.nTableWrapper).find(".DTFC_LeftWrapper");
var DTFC_LeftWidth = LeftWrapper.width();
LeftWrapper.children(".DTFC_LeftHeadWrapper").children("table").width(DTFC_LeftWidth);
if (that.s.init.resizeCallback) {
that.s.init.resizeCallback.call(that, that.s.mouse.targetColumn);
}
},
/**
* Clean up ColResize memory references and event handlers
*  @method  _fnDestroy
*  @returns void
*  @private
*/
"_fnDestroy": function () {
var i, iLen;
for (i = 0, iLen = this.s.dt.aoDrawCallback.length; i < iLen; i++) {
if (this.s.dt.aoDrawCallback[i].sName === 'ColResize_Pre') {
this.s.dt.aoDrawCallback.splice(i, 1);
break;
}
}
$(this.s.dt.nTHead).find('*').off('.ColResize');
$.each(this.s.dt.aoColumns, function (i, column) {
$(column.nTh).removeAttr('data-column-index');
});
this.s.dt._colResize = null;
this.s = null;
},
/**
* Add a data attribute to the column headers, so we know the index of
* the row to be reordered. This allows fast detection of the index, and
* for this plug-in to work with FixedHeader which clones the nodes.
*  @private
*/
"_fnSetColumnIndexes": function () {
$.each(this.s.dt.aoColumns, function (i, column) {
$(column.nTh).attr('data-column-index', i);
});
}
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Static parameters
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
* ColResize default settings for initialisation
*  @namespace
*  @static
*/
ColResize.defaults = {
/**
* Callback function that is fired when columns are resized
*  @type function():void
*  @default null
*  @static
*/
"resizeCallback": null,
/**
* Exclude array for columns that are not resizable
*  @property exclude
*  @type     array of indexes that are excluded from resizing
*  @default  []
*/
"exclude": [],
/**
* Check to see if user is using a fixed table width or dynamic
* if true:
*      -Columns will resize themselves and their neighbour
*      -If neighbour is excluded resize will not occur
* if false:
*      -Columns will resize themselves and increase or decrease the width of the table accordingly
*/
"tableWidthFixed": true,
/**
* Width of the resize handle in pixels
*  @property handleWidth
*  @type     int (pixels)
*  @default  10
*/
"handleWidth": 10,
/**
* Right to left support, when true flips which column they are resizing on mouse down
*  @property rtl
*  @type     bool
*  @default  false
*/
"rtl": false
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* Constants
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
* ColResize version
*  @constant  version
*  @type      String
*  @default   As code
*/
ColResize.version = "0.0.11";
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* DataTables interfaces
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
$.fn.dataTable.ColResize = ColResize;
$.fn.DataTable.ColResize = ColResize;
if (typeof $.fn.dataTable == "function" &&
typeof $.fn.dataTableExt.fnVersionCheck == "function" &&
$.fn.dataTableExt.fnVersionCheck('1.9.3')) {
$.fn.dataTableExt.aoFeatures.push({
"fnInit": function (settings) {
var table = settings.oInstance;
if (!settings._colResize) {
var dtInit = settings.oInit;
var opts = dtInit.colResize || dtInit.oColResize || {};
new ColResize(settings, opts);
}
else {
table.oApi._fnLog(settings, 1, "ColResize attempted to initialise twice. Ignoring second");
}
return null;
/* No node for DataTables to insert */
},
"cFeature": "Z",
"sFeature": "ColResize"
});
} else {
alert("Warning: ColResize requires DataTables 1.9.3 or greater - www.datatables.net/download");
}
if ($.fn.dataTable.Api) {
$.fn.dataTable.Api.register('colResize.reset()', function () {
return this.iterator('table', function (ctx) {
ctx._colResize.fnReset();
});
});
}
return ColResize;
}; // /factory
if (typeof define === 'function' && define.amd) {
define(['jquery', 'datatables'], factory);
}
else if (typeof exports === 'object') {
factory(require('jquery'), require('datatables'));
}
else if (jQuery && !jQuery.fn.dataTable.ColResize) {
factory(jQuery, jQuery.fn.dataTable);
}
})(window, document);
;/* extensions/RedHat/web/js/redhat.js */
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
var keys = {
ENTER: 13,
ESC: 27,
F1: 112,
F12: 123,
LEFT: 37,
RIGHT: 39,
TAB: 9
};
alertify.defaults.notifier.position = 'top-right';
alertify.defaults.transitionOff = true;
alertify.defaults.modal = false;
if (!alertify.editCommentBox) {
alertify.dialog('editCommentBox', function factory() {
var input = $('<textarea rows="15" cols="50"></textarea>');
var sec_label = $('<label>Lock history: </label>');
var sec_input = $('<input type="checkbox"></input>');
var comment;
var c_count;
return {
main: function (text_elem, comment_id, comment_count, message, allow_secure) {
comment = text_elem;
this.comment_id = comment_id;
c_count = comment_count;
this.message = message;
this.set('title', 'Edit comment ' + comment_count);
this.secure = allow_secure;
},
setup: function () {
return {
buttons: [{
text: alertify.defaults.glossary.ok,
className: alertify.defaults.theme.ok,
},
{
text: alertify.defaults.glossary.cancel,
key: keys.ESC,
invokeOnClose: true,
className: alertify.defaults.theme.cancel,
}
],
focus: {
element: null,
select: false
},
};
},
build: function () {
input.className = alertify.defaults.theme.input;
this.elements.content.appendChild(input[0]);
},
prepare: function () {
$(input).val(this.message);
if (this.secure) {
this.elements.content.appendChild(sec_label[0]);
this.elements.content.appendChild(sec_input[0]);
}
},
callback: function (closeEvent) {
var returnValue;
switch (closeEvent.index) {
case 0:
var new_val = input[0].value;
if (new_val !== this.message) {
$(input)._onAjaxSend();
var rpc = new Rpc('RedHat', 'edit_comment', {
comment: this.comment_id,
text: new_val,
render: 1,
security: $(sec_input).prop("checked") ? 1 : 0,
new_token: 1
})
.complete(function () {
$(input)._onAjaxComplete();
})
.fail(function (error) {
warn(error);
})
.done(function (res) {
old_ts = res['delta_ts'];
old_time = new Date(old_ts).getTime()
$('[name="delta_ts"]').val(old_ts);
$('[name="token"]').val(res['new_token']);
$(comment).html(res['html']);
$('#comment_history_' + c_count).removeClass('bz_default_hidden');
$('#comment_activity_count_' + c_count).html(res['activity_count']);
});
} else {
alertify.warning("No changes detected!");
}
break;
case 1:
break;
}
$(input).remove();
}
};
}, true);
}
function edit_comment(comment_id, comment_count, allow_secure) {
var text_elem = document.getElementById('comment_text_' + comment_count);
var text = getText(text_elem);
alertify.editCommentBox(text_elem, comment_id, comment_count, text, allow_secure).resizeTo('80%', '70%');
}
;/* extensions/SelectizeJS/web/js/standalone/selectize.min.js */
(function(root,factory){if(typeof define==='function'&&define.amd){define('sifter',factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.Sifter=factory();}}(this,function(){var Sifter=function(items,settings){this.items=items;this.settings=settings||{diacritics:true};};Sifter.prototype.tokenize=function(query){query=trim(String(query||'').toLowerCase());if(!query||!query.length)return[];var i,n,regex,letter;var tokens=[];var words=query.split(/ +/);for(i=0,n=words.length;i<n;i++){regex=escape_regex(words[i]);if(this.settings.diacritics){for(letter in DIACRITICS){if(DIACRITICS.hasOwnProperty(letter)){regex=regex.replace(new RegExp(letter,'g'),DIACRITICS[letter]);}}}
tokens.push({string:words[i],regex:new RegExp(regex,'i')});}
return tokens;};Sifter.prototype.iterator=function(object,callback){var iterator;if(is_array(object)){iterator=Array.prototype.forEach||function(callback){for(var i=0,n=this.length;i<n;i++){callback(this[i],i,this);}};}else{iterator=function(callback){for(var key in this){if(this.hasOwnProperty(key)){callback(this[key],key,this);}}};}
iterator.apply(object,[callback]);};Sifter.prototype.getScoreFunction=function(search,options){var self,fields,tokens,token_count,nesting;self=this;search=self.prepareSearch(search,options);tokens=search.tokens;fields=search.options.fields;token_count=tokens.length;nesting=search.options.nesting;var scoreValue=function(value,token){var score,pos;if(!value)return 0;value=String(value||'');pos=value.search(token.regex);if(pos===-1)return 0;score=token.string.length/value.length;if(pos===0)score+=0.5;return score;};var scoreObject=(function(){var field_count=fields.length;if(!field_count){return function(){return 0;};}
if(field_count===1){return function(token,data){return scoreValue(getattr(data,fields[0],nesting),token);};}
return function(token,data){for(var i=0,sum=0;i<field_count;i++){sum+=scoreValue(getattr(data,fields[i],nesting),token);}
return sum/field_count;};})();if(!token_count){return function(){return 0;};}
if(token_count===1){return function(data){return scoreObject(tokens[0],data);};}
if(search.options.conjunction==='and'){return function(data){var score;for(var i=0,sum=0;i<token_count;i++){score=scoreObject(tokens[i],data);if(score<=0)return 0;sum+=score;}
return sum/token_count;};}else{return function(data){for(var i=0,sum=0;i<token_count;i++){sum+=scoreObject(tokens[i],data);}
return sum/token_count;};}};Sifter.prototype.getSortFunction=function(search,options){var i,n,self,field,fields,fields_count,multiplier,multipliers,get_field,implicit_score,sort;self=this;search=self.prepareSearch(search,options);sort=(!search.query&&options.sort_empty)||options.sort;get_field=function(name,result){if(name==='$score')return result.score;return getattr(self.items[result.id],name,options.nesting);};fields=[];if(sort){for(i=0,n=sort.length;i<n;i++){if(search.query||sort[i].field!=='$score'){fields.push(sort[i]);}}}
if(search.query){implicit_score=true;for(i=0,n=fields.length;i<n;i++){if(fields[i].field==='$score'){implicit_score=false;break;}}
if(implicit_score){fields.unshift({field:'$score',direction:'desc'});}}else{for(i=0,n=fields.length;i<n;i++){if(fields[i].field==='$score'){fields.splice(i,1);break;}}}
multipliers=[];for(i=0,n=fields.length;i<n;i++){multipliers.push(fields[i].direction==='desc'?-1:1);}
fields_count=fields.length;if(!fields_count){return null;}else if(fields_count===1){field=fields[0].field;multiplier=multipliers[0];return function(a,b){return multiplier*cmp(get_field(field,a),get_field(field,b));};}else{return function(a,b){var i,result,a_value,b_value,field;for(i=0;i<fields_count;i++){field=fields[i].field;result=multipliers[i]*cmp(get_field(field,a),get_field(field,b));if(result)return result;}
return 0;};}};Sifter.prototype.prepareSearch=function(query,options){if(typeof query==='object')return query;options=extend({},options);var option_fields=options.fields;var option_sort=options.sort;var option_sort_empty=options.sort_empty;if(option_fields&&!is_array(option_fields))options.fields=[option_fields];if(option_sort&&!is_array(option_sort))options.sort=[option_sort];if(option_sort_empty&&!is_array(option_sort_empty))options.sort_empty=[option_sort_empty];return{options:options,query:String(query||'').toLowerCase(),tokens:this.tokenize(query),total:0,items:[]};};Sifter.prototype.search=function(query,options){var self=this,value,score,search,calculateScore;var fn_sort;var fn_score;search=this.prepareSearch(query,options);options=search.options;query=search.query;fn_score=options.score||self.getScoreFunction(search);if(query.length){self.iterator(self.items,function(item,id){score=fn_score(item);if(options.filter===false||score>0){search.items.push({'score':score,'id':id});}});}else{self.iterator(self.items,function(item,id){search.items.push({'score':1,'id':id});});}
fn_sort=self.getSortFunction(search,options);if(fn_sort)search.items.sort(fn_sort);search.total=search.items.length;if(typeof options.limit==='number'){search.items=search.items.slice(0,options.limit);}
return search;};var cmp=function(a,b){if(typeof a==='number'&&typeof b==='number'){return a>b?1:(a<b?-1:0);}
a=asciifold(String(a||''));b=asciifold(String(b||''));if(a>b)return 1;if(b>a)return-1;return 0;};var extend=function(a,b){var i,n,k,object;for(i=1,n=arguments.length;i<n;i++){object=arguments[i];if(!object)continue;for(k in object){if(object.hasOwnProperty(k)){a[k]=object[k];}}}
return a;};var getattr=function(obj,name,nesting){if(!obj||!name)return;if(!nesting)return obj[name];var names=name.split(".");while(names.length&&(obj=obj[names.shift()]));return obj;};var trim=function(str){return(str+'').replace(/^\s+|\s+$|/g,'');};var escape_regex=function(str){return(str+'').replace(/([.?*+^$[\]\\(){}|-])/g,'\\$1');};var is_array=Array.isArray||(typeof $!=='undefined'&&$.isArray)||function(object){return Object.prototype.toString.call(object)==='[object Array]';};var DIACRITICS={'a':'[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]','b':'[b␢βΒB฿𐌁ᛒ]','c':'[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]','d':'[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]','e':'[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]','f':'[fƑƒḞḟ]','g':'[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]','h':'[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]','i':'[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]','j':'[jȷĴĵɈɉʝɟʲ]','k':'[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]','l':'[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]','n':'[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]','o':'[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]','p':'[pṔṕṖṗⱣᵽƤƥᵱ]','q':'[qꝖꝗʠɊɋꝘꝙq̃]','r':'[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]','s':'[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]','t':'[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]','u':'[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]','v':'[vṼṽṾṿƲʋꝞꝟⱱʋ]','w':'[wẂẃẀẁŴŵẄẅẆẇẈẉ]','x':'[xẌẍẊẋχ]','y':'[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]','z':'[zŹźẐẑŽžŻżẒẓẔẕƵƶ]'};var asciifold=(function(){var i,n,k,chunk;var foreignletters='';var lookup={};for(k in DIACRITICS){if(DIACRITICS.hasOwnProperty(k)){chunk=DIACRITICS[k].substring(2,DIACRITICS[k].length-1);foreignletters+=chunk;for(i=0,n=chunk.length;i<n;i++){lookup[chunk.charAt(i)]=k;}}}
var regexp=new RegExp('['+foreignletters+']','g');return function(str){return str.replace(regexp,function(foreignletter){return lookup[foreignletter];}).toLowerCase();};})();return Sifter;}));(function(root,factory){if(typeof define==='function'&&define.amd){define('microplugin',factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.MicroPlugin=factory();}}(this,function(){var MicroPlugin={};MicroPlugin.mixin=function(Interface){Interface.plugins={};Interface.prototype.initializePlugins=function(plugins){var i,n,key;var self=this;var queue=[];self.plugins={names:[],settings:{},requested:{},loaded:{}};if(utils.isArray(plugins)){for(i=0,n=plugins.length;i<n;i++){if(typeof plugins[i]==='string'){queue.push(plugins[i]);}else{self.plugins.settings[plugins[i].name]=plugins[i].options;queue.push(plugins[i].name);}}}else if(plugins){for(key in plugins){if(plugins.hasOwnProperty(key)){self.plugins.settings[key]=plugins[key];queue.push(key);}}}
while(queue.length){self.require(queue.shift());}};Interface.prototype.loadPlugin=function(name){var self=this;var plugins=self.plugins;var plugin=Interface.plugins[name];if(!Interface.plugins.hasOwnProperty(name)){throw new Error('Unable to find "'+name+'" plugin');}
plugins.requested[name]=true;plugins.loaded[name]=plugin.fn.apply(self,[self.plugins.settings[name]||{}]);plugins.names.push(name);};Interface.prototype.require=function(name){var self=this;var plugins=self.plugins;if(!self.plugins.loaded.hasOwnProperty(name)){if(plugins.requested[name]){throw new Error('Plugin has circular dependency ("'+name+'")');}
self.loadPlugin(name);}
return plugins.loaded[name];};Interface.define=function(name,fn){Interface.plugins[name]={'name':name,'fn':fn};};};var utils={isArray:Array.isArray||function(vArg){return Object.prototype.toString.call(vArg)==='[object Array]';}};return MicroPlugin;}));(function(root,factory){if(typeof define==='function'&&define.amd){define('selectize',['jquery','sifter','microplugin'],factory);}else if(typeof exports==='object'){module.exports=factory(require('jquery'),require('sifter'),require('microplugin'));}else{root.Selectize=factory(root.jQuery,root.Sifter,root.MicroPlugin);}}(this,function($,Sifter,MicroPlugin){'use strict';var highlight=function($element,pattern){if(typeof pattern==='string'&&!pattern.length)return;var regex=(typeof pattern==='string')?new RegExp(pattern,'i'):pattern;var highlight=function(node){var skip=0;if(node.nodeType===3){var pos=node.data.search(regex);if(pos>=0&&node.data.length>0){var match=node.data.match(regex);var spannode=document.createElement('span');spannode.className='highlight';var middlebit=node.splitText(pos);var endbit=middlebit.splitText(match[0].length);var middleclone=middlebit.cloneNode(true);spannode.appendChild(middleclone);middlebit.parentNode.replaceChild(spannode,middlebit);skip=1;}}
else if(node.nodeType===1&&node.childNodes&&!/(script|style)/i.test(node.tagName)&&(node.className!=='highlight'||node.tagName!=='SPAN')){for(var i=0;i<node.childNodes.length;++i){i+=highlight(node.childNodes[i]);}}
return skip;};return $element.each(function(){highlight(this);});};$.fn.removeHighlight=function(){return this.find("span.highlight").each(function(){this.parentNode.firstChild.nodeName;var parent=this.parentNode;parent.replaceChild(this.firstChild,this);parent.normalize();}).end();};var MicroEvent=function(){};MicroEvent.prototype={on:function(event,fct){this._events=this._events||{};this._events[event]=this._events[event]||[];this._events[event].push(fct);},off:function(event,fct){var n=arguments.length;if(n===0)return delete this._events;if(n===1)return delete this._events[event];this._events=this._events||{};if(event in this._events===false)return;this._events[event].splice(this._events[event].indexOf(fct),1);},trigger:function(event ){this._events=this._events||{};if(event in this._events===false)return;for(var i=0;i<this._events[event].length;i++){this._events[event][i].apply(this,Array.prototype.slice.call(arguments,1));}}};MicroEvent.mixin=function(destObject){var props=['on','off','trigger'];for(var i=0;i<props.length;i++){destObject.prototype[props[i]]=MicroEvent.prototype[props[i]];}};var IS_MAC=/Mac/.test(navigator.userAgent);var KEY_A=65;var KEY_COMMA=188;var KEY_RETURN=13;var KEY_ESC=27;var KEY_LEFT=37;var KEY_UP=38;var KEY_P=80;var KEY_RIGHT=39;var KEY_DOWN=40;var KEY_N=78;var KEY_BACKSPACE=8;var KEY_DELETE=46;var KEY_SHIFT=16;var KEY_CMD=IS_MAC?91:17;var KEY_CTRL=IS_MAC?18:17;var KEY_TAB=9;var TAG_SELECT=1;var TAG_INPUT=2;var SUPPORTS_VALIDITY_API=!/android/i.test(window.navigator.userAgent)&&!!document.createElement('input').validity;var isset=function(object){return typeof object!=='undefined';};var hash_key=function(value){if(typeof value==='undefined'||value===null)return null;if(typeof value==='boolean')return value?'1':'0';return value+'';};var escape_html=function(str){return(str+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');};var escape_replace=function(str){return(str+'').replace(/\$/g,'$$$$');};var hook={};hook.before=function(self,method,fn){var original=self[method];self[method]=function(){fn.apply(self,arguments);return original.apply(self,arguments);};};hook.after=function(self,method,fn){var original=self[method];self[method]=function(){var result=original.apply(self,arguments);fn.apply(self,arguments);return result;};};var once=function(fn){var called=false;return function(){if(called)return;called=true;fn.apply(this,arguments);};};var debounce=function(fn,delay){var timeout;return function(){var self=this;var args=arguments;window.clearTimeout(timeout);timeout=window.setTimeout(function(){fn.apply(self,args);},delay);};};var debounce_events=function(self,types,fn){var type;var trigger=self.trigger;var event_args={};self.trigger=function(){var type=arguments[0];if(types.indexOf(type)!==-1){event_args[type]=arguments;}else{return trigger.apply(self,arguments);}};fn.apply(self,[]);self.trigger=trigger;for(type in event_args){if(event_args.hasOwnProperty(type)){trigger.apply(self,event_args[type]);}}};var watchChildEvent=function($parent,event,selector,fn){$parent.on(event,selector,function(e){var child=e.target;while(child&&child.parentNode!==$parent[0]){child=child.parentNode;}
e.currentTarget=child;return fn.apply(this,[e]);});};var getSelection=function(input){var result={};if('selectionStart'in input){result.start=input.selectionStart;result.length=input.selectionEnd-result.start;}else if(document.selection){input.focus();var sel=document.selection.createRange();var selLen=document.selection.createRange().text.length;sel.moveStart('character',-input.value.length);result.start=sel.text.length-selLen;result.length=selLen;}
return result;};var transferStyles=function($from,$to,properties){var i,n,styles={};if(properties){for(i=0,n=properties.length;i<n;i++){styles[properties[i]]=$from.css(properties[i]);}}else{styles=$from.css();}
$to.css(styles);};var measureString=function(str,$parent){if(!str){return 0;}
if(!Selectize.$testInput){Selectize.$testInput=$('<span />').css({position:'absolute',top:-99999,left:-99999,width:'auto',padding:0,whiteSpace:'pre'}).appendTo('body');}
Selectize.$testInput.text(str);transferStyles($parent,Selectize.$testInput,['letterSpacing','fontSize','fontFamily','fontWeight','textTransform']);return Selectize.$testInput.width();};var autoGrow=function($input){var currentWidth=null;var update=function(e,options){var value,keyCode,printable,placeholder,width;var shift,character,selection;e=e||window.event||{};options=options||{};if(e.metaKey||e.altKey)return;if(!options.force&&$input.data('grow')===false)return;value=$input.val();if(e.type&&e.type.toLowerCase()==='keydown'){keyCode=e.keyCode;printable=((keyCode>=48&&keyCode<=57)||(keyCode>=65&&keyCode<=90)||(keyCode>=96&&keyCode<=111)||(keyCode>=186&&keyCode<=222)||keyCode===32);if(keyCode===KEY_DELETE||keyCode===KEY_BACKSPACE){selection=getSelection($input[0]);if(selection.length){value=value.substring(0,selection.start)+value.substring(selection.start+selection.length);}else if(keyCode===KEY_BACKSPACE&&selection.start){value=value.substring(0,selection.start-1)+value.substring(selection.start+1);}else if(keyCode===KEY_DELETE&&typeof selection.start!=='undefined'){value=value.substring(0,selection.start)+value.substring(selection.start+1);}}else if(printable){shift=e.shiftKey;character=String.fromCharCode(e.keyCode);if(shift)character=character.toUpperCase();else character=character.toLowerCase();value+=character;}}
placeholder=$input.attr('placeholder');if(!value&&placeholder){value=placeholder;}
width=measureString(value,$input)+4;if(width!==currentWidth){currentWidth=width;$input.width(width);$input.triggerHandler('resize');}};$input.on('keydown keyup update blur',update);update();};var domToString=function(d){var tmp=document.createElement('div');tmp.appendChild(d.cloneNode(true));return tmp.innerHTML;};var logError=function(message,options){if(!options)options={};var component="Selectize";console.error(component+": "+message)
if(options.explanation){if(console.group)console.group();console.error(options.explanation);if(console.group)console.groupEnd();}}
var Selectize=function($input,settings){var key,i,n,dir,input,self=this;input=$input[0];input.selectize=self;var computedStyle=window.getComputedStyle&&window.getComputedStyle(input,null);dir=computedStyle?computedStyle.getPropertyValue('direction'):input.currentStyle&&input.currentStyle.direction;dir=dir||$input.parents('[dir]:first').attr('dir')||'';$.extend(self,{order:0,settings:settings,$input:$input,tabIndex:$input.attr('tabindex')||'',tagType:input.tagName.toLowerCase()==='select'?TAG_SELECT:TAG_INPUT,rtl:/rtl/i.test(dir),eventNS:'.selectize'+(++Selectize.count),highlightedValue:null,isBlurring:false,isOpen:false,isDisabled:false,isRequired:$input.is('[required]'),isInvalid:false,isLocked:false,isFocused:false,isInputHidden:false,isSetup:false,isShiftDown:false,isCmdDown:false,isCtrlDown:false,ignoreFocus:false,ignoreBlur:false,ignoreHover:false,hasOptions:false,currentResults:null,lastValue:'',caretPos:0,loading:0,loadedSearches:{},$activeOption:null,$activeItems:[],optgroups:{},options:{},userOptions:{},items:[],renderCache:{},onSearchChange:settings.loadThrottle===null?self.onSearchChange:debounce(self.onSearchChange,settings.loadThrottle)});self.sifter=new Sifter(this.options,{diacritics:settings.diacritics});if(self.settings.options){for(i=0,n=self.settings.options.length;i<n;i++){self.registerOption(self.settings.options[i]);}
delete self.settings.options;}
if(self.settings.optgroups){for(i=0,n=self.settings.optgroups.length;i<n;i++){self.registerOptionGroup(self.settings.optgroups[i]);}
delete self.settings.optgroups;}
self.settings.mode=self.settings.mode||(self.settings.maxItems===1?'single':'multi');if(typeof self.settings.hideSelected!=='boolean'){self.settings.hideSelected=self.settings.mode==='multi';}
self.initializePlugins(self.settings.plugins);self.setupCallbacks();self.setupTemplates();self.setup();};MicroEvent.mixin(Selectize);if(typeof MicroPlugin!=="undefined"){MicroPlugin.mixin(Selectize);}else{logError("Dependency MicroPlugin is missing",{explanation:"Make sure you either: (1) are using the \"standalone\" "+
"version of Selectize, or (2) require MicroPlugin before you "+
"load Selectize."});}
$.extend(Selectize.prototype,{setup:function(){var self=this;var settings=self.settings;var eventNS=self.eventNS;var $window=$(window);var $document=$(document);var $input=self.$input;var $wrapper;var $control;var $control_input;var $dropdown;var $dropdown_content;var $dropdown_parent;var inputMode;var timeout_blur;var timeout_focus;var classes;var classes_plugins;var inputId;inputMode=self.settings.mode;classes=$input.attr('class')||'';$wrapper=$('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);$control=$('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);$control_input=$('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex',$input.is(':disabled')?'-1':self.tabIndex);$dropdown_parent=$(settings.dropdownParent||$wrapper);$dropdown=$('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);$dropdown_content=$('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);if(inputId=$input.attr('id')){$control_input.attr('id',inputId+'-selectized');$("label[for='"+inputId+"']").attr('for',inputId+'-selectized').addClass('selectized');}
if(self.settings.copyClassesToDropdown){$dropdown.addClass(classes);}
$wrapper.css({width:$input[0].style.width});if(self.plugins.names.length){classes_plugins='plugin-'+self.plugins.names.join(' plugin-');$wrapper.addClass(classes_plugins);$dropdown.addClass(classes_plugins);}
if((settings.maxItems===null||settings.maxItems>1)&&self.tagType===TAG_SELECT){$input.attr('multiple','multiple');}
if(self.settings.placeholder){$control_input.attr('placeholder',settings.placeholder);}
if(!self.settings.splitOn&&self.settings.delimiter){var delimiterEscaped=self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');self.settings.splitOn=new RegExp('\\s*'+delimiterEscaped+'+\\s*');}
if($input.attr('autocorrect')){$control_input.attr('autocorrect',$input.attr('autocorrect'));}
if($input.attr('autocapitalize')){$control_input.attr('autocapitalize',$input.attr('autocapitalize'));}
$control_input[0].type=$input[0].type;self.$wrapper=$wrapper;self.$control=$control;self.$control_input=$control_input;self.$dropdown=$dropdown;self.$dropdown_content=$dropdown_content;$dropdown.on('mouseenter mousedown click','[data-disabled]>[data-selectable]',function(e){e.stopImmediatePropagation();});$dropdown.on('mouseenter','[data-selectable]',function(){return self.onOptionHover.apply(self,arguments);});$dropdown.on('mousedown click','[data-selectable]',function(){return self.onOptionSelect.apply(self,arguments);});watchChildEvent($control,'mousedown','*:not(input)',function(){return self.onItemSelect.apply(self,arguments);});autoGrow($control_input);$control.on({mousedown:function(){return self.onMouseDown.apply(self,arguments);},click:function(){return self.onClick.apply(self,arguments);}});$control_input.on({mousedown:function(e){e.stopPropagation();},keydown:function(){return self.onKeyDown.apply(self,arguments);},keyup:function(){return self.onKeyUp.apply(self,arguments);},keypress:function(){return self.onKeyPress.apply(self,arguments);},resize:function(){self.positionDropdown.apply(self,[]);},blur:function(){return self.onBlur.apply(self,arguments);},focus:function(){self.ignoreBlur=false;return self.onFocus.apply(self,arguments);},paste:function(){return self.onPaste.apply(self,arguments);}});$document.on('keydown'+eventNS,function(e){self.isCmdDown=e[IS_MAC?'metaKey':'ctrlKey'];self.isCtrlDown=e[IS_MAC?'altKey':'ctrlKey'];self.isShiftDown=e.shiftKey;});$document.on('keyup'+eventNS,function(e){if(e.keyCode===KEY_CTRL)self.isCtrlDown=false;if(e.keyCode===KEY_SHIFT)self.isShiftDown=false;if(e.keyCode===KEY_CMD)self.isCmdDown=false;});$document.on('mousedown'+eventNS,function(e){if(self.isFocused){if(e.target===self.$dropdown[0]||e.target.parentNode===self.$dropdown[0]){return false;}
if(!self.$control.has(e.target).length&&e.target!==self.$control[0]){self.blur(e.target);}}});$window.on(['scroll'+eventNS,'resize'+eventNS].join(' '),function(){if(self.isOpen){self.positionDropdown.apply(self,arguments);}});$window.on('mousemove'+eventNS,function(){self.ignoreHover=false;});this.revertSettings={$children:$input.children().detach(),tabindex:$input.attr('tabindex')};$input.attr('tabindex',-1).hide().after(self.$wrapper);if($.isArray(settings.items)){self.setValue(settings.items);delete settings.items;}
if(SUPPORTS_VALIDITY_API){$input.on('invalid'+eventNS,function(e){e.preventDefault();self.isInvalid=true;self.refreshState();});}
self.updateOriginalInput();self.refreshItems();self.refreshState();self.updatePlaceholder();self.isSetup=true;if($input.is(':disabled')){self.disable();}
self.on('change',this.onChange);$input.data('selectize',self);$input.addClass('selectized');self.trigger('initialize');if(settings.preload===true){self.onSearchChange('');}},setupTemplates:function(){var self=this;var field_label=self.settings.labelField;var field_optgroup=self.settings.optgroupLabelField;var templates={'optgroup':function(data){return'<div class="optgroup">'+data.html+'</div>';},'optgroup_header':function(data,escape){return'<div class="optgroup-header">'+escape(data[field_optgroup])+'</div>';},'option':function(data,escape){return'<div class="option" title="'+escape(data['title'])+'">'+escape(data[field_label])+'</div>';},'item':function(data,escape){return'<div class="item" title="'+escape(data['title'])+'">'+escape(data[field_label])+'</div>';},'option_create':function(data,escape){return'<div class="create">Add <strong>'+escape(data.input)+'</strong>&hellip;</div>';}};self.settings.render=$.extend({},templates,self.settings.render);},setupCallbacks:function(){var key,fn,callbacks={'initialize':'onInitialize','change':'onChange','item_add':'onItemAdd','item_remove':'onItemRemove','clear':'onClear','option_add':'onOptionAdd','option_remove':'onOptionRemove','option_clear':'onOptionClear','optgroup_add':'onOptionGroupAdd','optgroup_remove':'onOptionGroupRemove','optgroup_clear':'onOptionGroupClear','dropdown_open':'onDropdownOpen','dropdown_close':'onDropdownClose','type':'onType','load':'onLoad','focus':'onFocus','blur':'onBlur'};for(key in callbacks){if(callbacks.hasOwnProperty(key)){fn=this.settings[callbacks[key]];if(fn)this.on(key,fn);}}},onClick:function(e){var self=this;if(!self.isFocused||!self.isOpen){self.focus();e.preventDefault();}},onMouseDown:function(e){var self=this;var defaultPrevented=e.isDefaultPrevented();var $target=$(e.target);if(self.isFocused){if(e.target!==self.$control_input[0]){if(self.settings.mode==='single'){self.isOpen?self.close():self.open();}else if(!defaultPrevented){self.setActiveItem(null);}
return false;}}else{if(!defaultPrevented){window.setTimeout(function(){self.focus();},0);}}},onChange:function(){this.$input.trigger('change');},onPaste:function(e){var self=this;if(self.isFull()||self.isInputHidden||self.isLocked){e.preventDefault();return;}
if(self.settings.splitOn){setTimeout(function(){var pastedText=self.$control_input.val();if(!pastedText.match(self.settings.splitOn)){return}
var splitInput=$.trim(pastedText).split(self.settings.splitOn);for(var i=0,n=splitInput.length;i<n;i++){self.createItem(splitInput[i]);}},0);}},onKeyPress:function(e){if(this.isLocked)return e&&e.preventDefault();var character=String.fromCharCode(e.keyCode||e.which);if(this.settings.create&&this.settings.mode==='multi'&&character===this.settings.delimiter){this.createItem();e.preventDefault();return false;}},onKeyDown:function(e){var isInput=e.target===this.$control_input[0];var self=this;if(self.isLocked){if(e.keyCode!==KEY_TAB){e.preventDefault();}
return;}
switch(e.keyCode){case KEY_A:if(self.isCmdDown){self.selectAll();return;}
break;case KEY_ESC:if(self.isOpen){e.preventDefault();e.stopPropagation();self.close();}
return;case KEY_N:if(!e.ctrlKey||e.altKey)break;case KEY_DOWN:if(!self.isOpen&&self.hasOptions){self.open();}else if(self.$activeOption){self.ignoreHover=true;var $next=self.getAdjacentOption(self.$activeOption,1);if($next.length)self.setActiveOption($next,true,true);}
e.preventDefault();return;case KEY_P:if(!e.ctrlKey||e.altKey)break;case KEY_UP:if(self.$activeOption){self.ignoreHover=true;var $prev=self.getAdjacentOption(self.$activeOption,-1);if($prev.length)self.setActiveOption($prev,true,true);}
e.preventDefault();return;case KEY_RETURN:if(self.isOpen&&self.$activeOption){self.onOptionSelect({currentTarget:self.$activeOption});e.preventDefault();}
return;case KEY_LEFT:self.advanceSelection(-1,e);return;case KEY_RIGHT:self.advanceSelection(1,e);return;case KEY_TAB:if(self.settings.selectOnTab&&self.isOpen&&self.$activeOption&&(self.lastValue !== '')){self.onOptionSelect({currentTarget:self.$activeOption});if(!self.isFull()){e.preventDefault();}}
if(self.settings.create&&self.createItem()){e.preventDefault();}
return;case KEY_BACKSPACE:case KEY_DELETE:self.deleteSelection(e);return;}
if((self.isFull()||self.isInputHidden)&&!(IS_MAC?e.metaKey:e.ctrlKey)){e.preventDefault();return;}},onKeyUp:function(e){var self=this;if(self.isLocked)return e&&e.preventDefault();var value=self.$control_input.val()||'';if(self.lastValue!==value){self.lastValue=value;self.onSearchChange(value);self.refreshOptions();self.trigger('type',value);}},onSearchChange:function(value){var self=this;var fn=self.settings.load;if(!fn)return;if(self.loadedSearches.hasOwnProperty(value))return;self.loadedSearches[value]=true;self.load(function(callback){fn.apply(self,[value,callback]);});},onFocus:function(e){var self=this;var wasFocused=self.isFocused;if(self.isDisabled){self.blur();e&&e.preventDefault();return false;}
if(self.ignoreFocus)return;self.isFocused=true;if(self.settings.preload==='focus')self.onSearchChange('');if(!wasFocused)self.trigger('focus');if(!self.$activeItems.length){self.showInput();self.setActiveItem(null);self.refreshOptions(!!self.settings.openOnFocus);}
self.refreshState();},onBlur:function(e,dest){var self=this;if(!self.isFocused)return;self.isFocused=false;if(self.ignoreFocus){return;}else if(!self.ignoreBlur&&document.activeElement===self.$dropdown_content[0]){self.ignoreBlur=true;self.onFocus(e);return;}
var deactivate=function(){self.close();self.setTextboxValue('');self.setActiveItem(null);self.setActiveOption(null);self.setCaret(self.items.length);self.refreshState();dest&&dest.focus&&dest.focus();self.isBlurring=false;self.ignoreFocus=false;self.trigger('blur');};self.isBlurring=true;self.ignoreFocus=true;if(self.settings.create&&self.settings.createOnBlur){self.createItem(null,false,deactivate);}else{deactivate();}},onOptionHover:function(e){if(this.ignoreHover)return;this.setActiveOption(e.currentTarget,false);},onOptionSelect:function(e){var value,$target,$option,self=this;if(e.preventDefault){e.preventDefault();e.stopPropagation();}
$target=$(e.currentTarget);if($target.hasClass('create')){self.createItem(null,function(){if(self.settings.closeAfterSelect){self.close();}});}else{value=$target.attr('data-value');if(typeof value!=='undefined'){self.setTextboxValue('');self.addItem(value);if(self.settings.closeAfterSelect){self.close();}else if(!self.settings.hideSelected&&e.type&&/mouse/.test(e.type)){self.setActiveOption(self.getOption(value));}}}},onItemSelect:function(e){var self=this;if(self.isLocked)return;if(self.settings.mode==='multi'){e.preventDefault();self.setActiveItem(e.currentTarget,e);}},load:function(fn){var self=this;var $wrapper=self.$wrapper.addClass(self.settings.loadingClass);self.loading++;fn.apply(self,[function(results){self.loading=Math.max(self.loading-1,0);if(results&&results.length){self.addOption(results);self.refreshOptions(self.isFocused&&!self.isInputHidden);}
if(!self.loading){$wrapper.removeClass(self.settings.loadingClass);}
self.trigger('load',results);}]);},setTextboxValue:function(value){var $input=this.$control_input;var changed=$input.val()!==value;if(changed){$input.val(value).triggerHandler('update');this.lastValue=value;}},getValue:function(){if(this.tagType===TAG_SELECT&&this.$input.attr('multiple')){return this.items;}else{return this.items.join(this.settings.delimiter);}},setValue:function(value,silent){var events=silent?[]:['change'];debounce_events(this,events,function(){this.clear(silent);this.addItems(value,silent);});},setActiveItem:function($item,e){var self=this;var eventName;var i,idx,begin,end,item,swap;var $last;if(self.settings.mode==='single')return;$item=$($item);if(!$item.length){$(self.$activeItems).removeClass('active');self.$activeItems=[];if(self.isFocused){self.showInput();}
return;}
eventName=e&&e.type.toLowerCase();if(eventName==='mousedown'&&self.isShiftDown&&self.$activeItems.length){$last=self.$control.children('.active:last');begin=Array.prototype.indexOf.apply(self.$control[0].childNodes,[$last[0]]);end=Array.prototype.indexOf.apply(self.$control[0].childNodes,[$item[0]]);if(begin>end){swap=begin;begin=end;end=swap;}
for(i=begin;i<=end;i++){item=self.$control[0].childNodes[i];if(self.$activeItems.indexOf(item)===-1){$(item).addClass('active');self.$activeItems.push(item);}}
e.preventDefault();}else if((eventName==='mousedown'&&self.isCtrlDown)||(eventName==='keydown'&&this.isShiftDown)){if($item.hasClass('active')){idx=self.$activeItems.indexOf($item[0]);self.$activeItems.splice(idx,1);$item.removeClass('active');}else{self.$activeItems.push($item.addClass('active')[0]);}}else{$(self.$activeItems).removeClass('active');self.$activeItems=[$item.addClass('active')[0]];}
self.hideInput();if(!this.isFocused){self.focus();}},setActiveOption:function($option,scroll,animate){var height_menu,height_item,y;var scroll_top,scroll_bottom;var self=this;if(self.$activeOption)self.$activeOption.removeClass('active');self.$activeOption=null;$option=$($option);if(!$option.length)return;self.$activeOption=$option.addClass('active');if(scroll||!isset(scroll)){height_menu=self.$dropdown_content.height();height_item=self.$activeOption.outerHeight(true);scroll=self.$dropdown_content.scrollTop()||0;y=self.$activeOption.offset().top-self.$dropdown_content.offset().top+scroll;scroll_top=y;scroll_bottom=y-height_menu+height_item;if(y+height_item>height_menu+scroll){self.$dropdown_content.stop().animate({scrollTop:scroll_bottom},animate?self.settings.scrollDuration:0);}else if(y<scroll){self.$dropdown_content.stop().animate({scrollTop:scroll_top},animate?self.settings.scrollDuration:0);}}},selectAll:function(){var self=this;if(self.settings.mode==='single')return;self.$activeItems=Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));if(self.$activeItems.length){self.hideInput();self.close();}
self.focus();},hideInput:function(){var self=this;if(self.$wrapper.hasClass('plugin-drag_drop'))return;self.setTextboxValue('');self.$control_input.css({opacity:0,position:'absolute',left:self.rtl?10000:-10000});self.isInputHidden=true;},showInput:function(){this.$control_input.css({opacity:1,position:'relative',left:0});this.isInputHidden=false;},focus:function(){var self=this;if(self.isDisabled)return;self.ignoreFocus=true;self.$control_input[0].focus();window.setTimeout(function(){self.ignoreFocus=false;self.onFocus();},0);},blur:function(dest){this.$control_input[0].blur();this.onBlur(null,dest);},getScoreFunction:function(query){return this.sifter.getScoreFunction(query,this.getSearchOptions());},getSearchOptions:function(){var settings=this.settings;var sort=settings.sortField;if(typeof sort==='string'){sort=[{field:sort}];}
return{fields:settings.searchField,conjunction:settings.searchConjunction,sort:sort,nesting:settings.nesting};},search:function(query){var i,value,score,result,calculateScore;var self=this;var settings=self.settings;var options=this.getSearchOptions();if(settings.score){calculateScore=self.settings.score.apply(this,[query]);if(typeof calculateScore!=='function'){throw new Error('Selectize "score" setting must be a function that returns a function');}}
if(query!==self.lastQuery){self.lastQuery=query;result=self.sifter.search(query,$.extend(options,{score:calculateScore}));self.currentResults=result;}else{result=self.currentResults||{};}
return result;},refreshOptions:function(triggerDropdown,force){var i,j,k,n,groups,groups_order,option,option_html,optgroup,optgroups,html,html_children,has_create_option;var $active,$active_before,$create;if(typeof triggerDropdown==='undefined'){triggerDropdown=true;}
var self=this;var query=$.trim(self.$control_input.val());var current_results=self.currentResults;var results=self.search(query);var $dropdown_content=self.$dropdown_content;var active_before=self.$activeOption&&hash_key(self.$activeOption.attr('data-value'));if(force||results!==current_results){n=results.items.length;if(typeof self.settings.maxOptions==='number'){n=Math.min(n,self.settings.maxOptions);}
groups={};groups_order=[];for(i=0;i<n;i++){option=self.options[results.items[i].id];option_html=self.render('option',option);optgroup=option[self.settings.optgroupField]||'';optgroups=$.isArray(optgroup)?optgroup:[optgroup];for(j=0,k=optgroups&&optgroups.length;j<k;j++){optgroup=optgroups[j];if(!self.optgroups.hasOwnProperty(optgroup)){optgroup='';}
if(!groups.hasOwnProperty(optgroup)){groups[optgroup]=document.createDocumentFragment();groups_order.push(optgroup);}
groups[optgroup].appendChild(option_html);}}
if(this.settings.lockOptgroupOrder&&optgroups.length>1){groups_order.sort(function(a,b){var a_order=self.optgroups[a].$order||0;var b_order=b===""?0:self.optgroups[b].$order||0;return a_order-b_order;});}
html=document.createDocumentFragment();for(i=0,n=groups_order.length;i<n;i++){optgroup=groups_order[i];if(self.optgroups.hasOwnProperty(optgroup)&&groups[optgroup].childNodes.length){html_children=document.createDocumentFragment();html_children.appendChild(self.render('optgroup_header',self.optgroups[optgroup]));html_children.appendChild(groups[optgroup]);html.appendChild(self.render('optgroup',$.extend({},self.optgroups[optgroup],{html:domToString(html_children),dom:html_children})));}else{html.appendChild(groups[optgroup]);}}
$dropdown_content.html(html);}
if(self.settings.highlight){$dropdown_content.removeHighlight();if(results.query.length&&results.tokens.length){for(i=0,n=results.tokens.length;i<n;i++){highlight($dropdown_content,results.tokens[i].regex);}}}
if(self.settings.hideSelected){$dropdown_content.find("div:not('[data-selectable]')").attr("data-selectable","").show();}
else{$dropdown_content.find("div").removeClass('selected');}
for(i=0,n=self.items.length;i<n;i++){if(!self.settings.hideSelected){self.getOption(self.items[i]).addClass('selected');}
else{self.getOption(self.items[i]).removeAttr("data-selectable").hide();}}
has_create_option=self.canCreate(query);if(has_create_option){$dropdown_content.prepend(self.render('option_create',{input:query}));$create=$($dropdown_content[0].childNodes[0]);}
self.hasOptions=results.items.length>0||has_create_option;if(self.hasOptions){if(results.items.length>0){$active_before=active_before&&self.getOption(active_before);if($active_before&&$active_before.length){$active=$active_before;}else if(self.settings.mode==='single'&&self.items.length){$active=self.getOption(self.items[0]);}
if(!$active||!$active.length){if($create&&!self.settings.addPrecedence){$active=self.getAdjacentOption($create,1);}else{$active=$dropdown_content.find('[data-selectable]:first');}}}else{$active=$create;}
self.setActiveOption($active);if(triggerDropdown&&!self.isOpen){self.open();}}else{self.setActiveOption(null);if(triggerDropdown&&self.isOpen){self.close();}}},addOption:function(data){var i,n,value,self=this;if($.isArray(data)){for(i=0,n=data.length;i<n;i++){self.addOption(data[i]);}
return;}
if(value=self.registerOption(data)){self.userOptions[value]=true;self.lastQuery=null;self.trigger('option_add',value,data);}},registerOption:function(data){var key=hash_key(data[this.settings.valueField]);if(typeof key==='undefined'||key===null||this.options.hasOwnProperty(key))return false;data.$order=data.$order||++this.order;this.options[key]=data;return key;},registerOptionGroup:function(data){var key=hash_key(data[this.settings.optgroupValueField]);if(!key)return false;data.$order=data.$order||++this.order;this.optgroups[key]=data;return key;},addOptionGroup:function(id,data){data[this.settings.optgroupValueField]=id;if(id=this.registerOptionGroup(data)){this.trigger('optgroup_add',id,data);}},removeOptionGroup:function(id){if(this.optgroups.hasOwnProperty(id)){delete this.optgroups[id];this.renderCache={};this.trigger('optgroup_remove',id);}},clearOptionGroups:function(){this.optgroups={};this.renderCache={};this.trigger('optgroup_clear');},updateOption:function(value,data){var self=this;var $item,$item_new;var value_new,index_item,cache_items,cache_options,order_old;value=hash_key(value);value_new=hash_key(data[self.settings.valueField]);if(value===null)return;if(!self.options.hasOwnProperty(value))return;if(typeof value_new!=='string')throw new Error('Value must be set in option data');order_old=self.options[value].$order;if(value_new!==value){delete self.options[value];index_item=self.items.indexOf(value);if(index_item!==-1){self.items.splice(index_item,1,value_new);}}
data.$order=data.$order||order_old;self.options[value_new]=data;cache_items=self.renderCache['item'];cache_options=self.renderCache['option'];if(cache_items){delete cache_items[value];delete cache_items[value_new];}
if(cache_options){delete cache_options[value];delete cache_options[value_new];}
if(self.items.indexOf(value_new)!==-1){$item=self.getItem(value);$item_new=$(self.render('item',data));if($item.hasClass('active'))$item_new.addClass('active');$item.replaceWith($item_new);}
self.lastQuery=null;if(self.isOpen){self.refreshOptions(false);}},removeOption:function(value,silent){var self=this;value=hash_key(value);var cache_items=self.renderCache['item'];var cache_options=self.renderCache['option'];if(cache_items)delete cache_items[value];if(cache_options)delete cache_options[value];delete self.userOptions[value];delete self.options[value];self.lastQuery=null;self.trigger('option_remove',value);self.removeItem(value,silent);},clearOptions:function(){var self=this;self.loadedSearches={};self.userOptions={};self.renderCache={};var options=self.options;$.each(self.options,function(key,value){if(self.items.indexOf(key)==-1){delete options[key];}});self.options=self.sifter.items=options;self.lastQuery=null;self.trigger('option_clear');self.clear();},getOption:function(value){return this.getElementWithValue(value,this.$dropdown_content.find('[data-selectable]'));},getAdjacentOption:function($option,direction){var $options=this.$dropdown.find('[data-selectable]');var index=$options.index($option)+direction;return index>=0&&index<$options.length?$options.eq(index):$();},getElementWithValue:function(value,$els){value=hash_key(value);if(typeof value!=='undefined'&&value!==null){for(var i=0,n=$els.length;i<n;i++){if($els[i].getAttribute('data-value')===value){return $($els[i]);}}}
return $();},getItem:function(value){return this.getElementWithValue(value,this.$control.children());},addItems:function(values,silent){this.buffer=document.createDocumentFragment();var childNodes=this.$control[0].childNodes;for(var i=0;i<childNodes.length;i++){this.buffer.appendChild(childNodes[i]);}
var items=$.isArray(values)?values:[values];for(var i=0,n=items.length;i<n;i++){this.isPending=(i<n-1);this.addItem(items[i],silent);}
var control=this.$control[0];control.insertBefore(this.buffer,control.firstChild);this.buffer=null;},addItem:function(value,silent){var events=silent?[]:['change'];debounce_events(this,events,function(){var $item,$option,$options;var self=this;var inputMode=self.settings.mode;var i,active,value_next,wasFull;value=hash_key(value);if(self.items.indexOf(value)!==-1){if(inputMode==='single')self.close();return;}
if(!self.options.hasOwnProperty(value))return;if(inputMode==='single')self.clear(silent);if(inputMode==='multi'&&self.isFull())return;$item=$(self.render('item',self.options[value]));wasFull=self.isFull();self.items.splice(self.caretPos,0,value);self.insertAtCaret($item);if(!self.isPending||(!wasFull&&self.isFull())){self.refreshState();}
if(self.isSetup){$options=self.$dropdown_content.find('[data-selectable]');if(!self.isPending){$option=self.getOption(value);value_next=self.getAdjacentOption($option,1).attr('data-value');self.refreshOptions(self.isFocused&&inputMode!=='single');if(value_next){self.setActiveOption(self.getOption(value_next));}}
if(!$options.length||self.isFull()){self.close();}else if(!self.isPending){self.positionDropdown();}
self.updatePlaceholder();self.trigger('item_add',value,$item);if(!self.isPending){self.updateOriginalInput({silent:silent});}}});},removeItem:function(value,silent){var self=this;var $item,i,idx;$item=(value instanceof $)?value:self.getItem(value);value=hash_key($item.attr('data-value'));i=self.items.indexOf(value);if(i!==-1){$item.remove();if($item.hasClass('active')){idx=self.$activeItems.indexOf($item[0]);self.$activeItems.splice(idx,1);}
self.items.splice(i,1);if(!self.settings.persist&&self.userOptions.hasOwnProperty(value)){self.removeOption(value,silent);}
if(i<self.caretPos){self.setCaret(self.caretPos-1);}
self.refreshState();self.updatePlaceholder();self.updateOriginalInput({silent:silent});self.positionDropdown();self.trigger('item_remove',value,$item);}},createItem:function(input,triggerDropdown){var self=this;var caret=self.caretPos;input=input||$.trim(self.$control_input.val()||'');var callback=arguments[arguments.length-1];if(typeof callback!=='function')callback=function(){};if(typeof triggerDropdown!=='boolean'){triggerDropdown=true;}
if(!self.canCreate(input)){callback();return false;}
self.lock();var setup=(typeof self.settings.create==='function')?this.settings.create:function(input){var data={};data[self.settings.labelField]=input;data[self.settings.valueField]=input;return data;};var create=once(function(data){self.unlock();if(!data||typeof data!=='object')return callback();var value=hash_key(data[self.settings.valueField]);if(typeof value!=='string')return callback();self.setTextboxValue('');self.addOption(data);self.setCaret(caret);self.addItem(value);self.refreshOptions(triggerDropdown&&self.settings.mode!=='single');callback(data);});var output=setup.apply(this,[input,create]);if(typeof output!=='undefined'){create(output);}
return true;},refreshItems:function(){this.lastQuery=null;if(this.isSetup){this.addItem(this.items);}
this.refreshState();this.updateOriginalInput();},refreshState:function(){this.refreshValidityState();this.refreshClasses();},refreshValidityState:function(){if(!this.isRequired)return false;var invalid=!this.items.length;this.isInvalid=invalid;this.$control_input.prop('required',invalid);this.$input.prop('required',!invalid);},refreshClasses:function(){var self=this;var isFull=self.isFull();var isLocked=self.isLocked;self.$wrapper.toggleClass('rtl',self.rtl);self.$control.toggleClass('focus',self.isFocused).toggleClass('disabled',self.isDisabled).toggleClass('required',self.isRequired).toggleClass('invalid',self.isInvalid).toggleClass('locked',isLocked).toggleClass('full',isFull).toggleClass('not-full',!isFull).toggleClass('input-active',self.isFocused&&!self.isInputHidden).toggleClass('dropdown-active',self.isOpen).toggleClass('has-options',!$.isEmptyObject(self.options)).toggleClass('has-items',self.items.length>0);self.$control_input.data('grow',!isFull&&!isLocked);},isFull:function(){return this.settings.maxItems!==null&&this.items.length>=this.settings.maxItems;},updateOriginalInput:function(opts){var i,n,options,label,self=this;opts=opts||{};if(self.tagType===TAG_SELECT){options=[];for(i=0,n=self.items.length;i<n;i++){label=self.options[self.items[i]][self.settings.labelField]||'';options.push('<option value="'+escape_html(self.items[i])+'" selected="selected">'+escape_html(label)+'</option>');}
if(!options.length&&!this.$input.attr('multiple')){options.push('<option value="" selected="selected"></option>');}
self.$input.html(options.join(''));}else{self.$input.val(self.getValue());self.$input.attr('value',self.$input.val());}
if(self.isSetup){if(!opts.silent){self.trigger('change',self.$input.val());}}},updatePlaceholder:function(){if(!this.settings.placeholder)return;var $input=this.$control_input;if(this.items.length){$input.removeAttr('placeholder');}else{$input.attr('placeholder',this.settings.placeholder);}
$input.triggerHandler('update',{force:true});},open:function(){var self=this;if(self.isLocked||self.isOpen||(self.settings.mode==='multi'&&self.isFull()))return;self.focus();self.isOpen=true;self.refreshState();self.$dropdown.css({visibility:'hidden',display:'block'});self.positionDropdown();self.$dropdown.css({visibility:'visible'});self.trigger('dropdown_open',self.$dropdown);},close:function(){var self=this;var trigger=self.isOpen;if(self.settings.mode==='single'&&self.items.length){self.hideInput();if(!self.isBlurring){self.$control_input.blur();}}
self.isOpen=false;self.$dropdown.hide();self.setActiveOption(null);self.refreshState();if(trigger)self.trigger('dropdown_close',self.$dropdown);},positionDropdown:function(){var $control=this.$control;var offset=this.settings.dropdownParent==='body'?$control.offset():$control.position();offset.top+=$control.outerHeight(true);this.$dropdown.css({width:$control[0].getBoundingClientRect().width,top:offset.top,left:offset.left});},clear:function(silent){var self=this;if(!self.items.length)return;self.$control.children(':not(input)').remove();self.items=[];self.setCaret(0);self.setActiveItem(null);self.updatePlaceholder();self.updateOriginalInput({silent:silent});self.refreshState();self.showInput();self.trigger('clear');},insertAtCaret:function($el){var caret=Math.min(this.caretPos,this.items.length);var el=$el[0];var target=this.buffer||this.$control[0];if(caret===0){target.insertBefore(el,target.firstChild);}else{target.insertBefore(el,target.childNodes[caret]);}
this.setCaret(caret+1);},deleteSelection:function(e){var i,n,direction,selection,values,caret,option_select,$option_select,$tail;var self=this;direction=(e&&e.keyCode===KEY_BACKSPACE)?-1:1;selection=getSelection(self.$control_input[0]);if(self.$activeOption&&!self.settings.hideSelected){option_select=self.getAdjacentOption(self.$activeOption,-1).attr('data-value');}
values=[];if(self.$activeItems.length){$tail=self.$control.children('.active:'+(direction>0?'last':'first'));caret=self.$control.children(':not(input)').index($tail);if(direction>0){caret++;}
for(i=0,n=self.$activeItems.length;i<n;i++){values.push($(self.$activeItems[i]).attr('data-value'));}
if(e){e.preventDefault();e.stopPropagation();}}else if((self.isFocused||self.settings.mode==='single')&&self.items.length){if(direction<0&&selection.start===0&&selection.length===0){values.push(self.items[self.caretPos-1]);}else if(direction>0&&selection.start===self.$control_input.val().length){values.push(self.items[self.caretPos]);}}
if(!values.length||(typeof self.settings.onDelete==='function'&&self.settings.onDelete.apply(self,[values])===false)){return false;}
if(typeof caret!=='undefined'){self.setCaret(caret);}
while(values.length){self.removeItem(values.pop());}
self.showInput();self.positionDropdown();self.refreshOptions(true);if(option_select){$option_select=self.getOption(option_select);if($option_select.length){self.setActiveOption($option_select);}}
return true;},advanceSelection:function(direction,e){var tail,selection,idx,valueLength,cursorAtEdge,$tail;var self=this;if(direction===0)return;if(self.rtl)direction*=-1;tail=direction>0?'last':'first';selection=getSelection(self.$control_input[0]);if(self.isFocused&&!self.isInputHidden){valueLength=self.$control_input.val().length;cursorAtEdge=direction<0?selection.start===0&&selection.length===0:selection.start===valueLength;if(cursorAtEdge&&!valueLength){self.advanceCaret(direction,e);}}else{$tail=self.$control.children('.active:'+tail);if($tail.length){idx=self.$control.children(':not(input)').index($tail);self.setActiveItem(null);self.setCaret(direction>0?idx+1:idx);}}},advanceCaret:function(direction,e){var self=this,fn,$adj;if(direction===0)return;fn=direction>0?'next':'prev';if(self.isShiftDown){$adj=self.$control_input[fn]();if($adj.length){self.hideInput();self.setActiveItem($adj);e&&e.preventDefault();}}else{self.setCaret(self.caretPos+direction);}},setCaret:function(i){var self=this;if(self.settings.mode==='single'){i=self.items.length;}else{i=Math.max(0,Math.min(self.items.length,i));}
if(!self.isPending){var j,n,fn,$children,$child;$children=self.$control.children(':not(input)');for(j=0,n=$children.length;j<n;j++){$child=$($children[j]).detach();if(j<i){self.$control_input.before($child);}else{self.$control.append($child);}}}
self.caretPos=i;},lock:function(){this.close();this.isLocked=true;this.refreshState();},unlock:function(){this.isLocked=false;this.refreshState();},disable:function(){var self=this;self.$input.prop('disabled',true);self.$control_input.prop('disabled',true).prop('tabindex',-1);self.isDisabled=true;self.lock();},enable:function(){var self=this;self.$input.prop('disabled',false);self.$control_input.prop('disabled',false).prop('tabindex',self.tabIndex);self.isDisabled=false;self.unlock();},destroy:function(){var self=this;var eventNS=self.eventNS;var revertSettings=self.revertSettings;self.trigger('destroy');self.off();self.$wrapper.remove();self.$dropdown.remove();self.$input.html('').append(revertSettings.$children).removeAttr('tabindex').removeClass('selectized').attr({tabindex:revertSettings.tabindex}).show();self.$control_input.removeData('grow');self.$input.removeData('selectize');if(--Selectize.count==0&&Selectize.$testInput){Selectize.$testInput.remove();Selectize.$testInput=undefined;}
$(window).off(eventNS);$(document).off(eventNS);$(document.body).off(eventNS);delete self.$input[0].selectize;},render:function(templateName,data){var value,id,label;var html='';var cache=false;var self=this;var regex_tag=/^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;if(templateName==='option'||templateName==='item'){value=hash_key(data[self.settings.valueField]);cache=!!value;}
if(cache){if(!isset(self.renderCache[templateName])){self.renderCache[templateName]={};}
if(self.renderCache[templateName].hasOwnProperty(value)){return self.renderCache[templateName][value];}}
html=$(self.settings.render[templateName].apply(this,[data,escape_html]));if(templateName==='option'||templateName==='option_create'){if(!data[self.settings.disabledField]){html.attr('data-selectable','');}}
else if(templateName==='optgroup'){id=data[self.settings.optgroupValueField]||'';html.attr('data-group',id);if(data[self.settings.disabledField]){html.attr('data-disabled','');}}
if(templateName==='option'||templateName==='item'){html.attr('data-value',value||'');}
if(cache){self.renderCache[templateName][value]=html[0];}
return html[0];},clearCache:function(templateName){var self=this;if(typeof templateName==='undefined'){self.renderCache={};}else{delete self.renderCache[templateName];}},canCreate:function(input){var self=this;if(!self.settings.create)return false;var filter=self.settings.createFilter;return input.length&&(typeof filter!=='function'||filter.apply(self,[input]))&&(typeof filter!=='string'||new RegExp(filter).test(input))&&(!(filter instanceof RegExp)||filter.test(input));}});Selectize.count=0;Selectize.defaults={options:[],optgroups:[],plugins:[],delimiter:',',splitOn:null,persist:true,diacritics:true,create:false,createOnBlur:false,createFilter:null,highlight:true,openOnFocus:true,maxOptions:1000,maxItems:null,hideSelected:null,addPrecedence:false,selectOnTab:false,preload:false,allowEmptyOption:false,closeAfterSelect:false,scrollDuration:60,loadThrottle:300,loadingClass:'loading',dataAttr:'data-data',optgroupField:'optgroup',valueField:'value',labelField:'text',disabledField:'disabled',optgroupLabelField:'label',optgroupValueField:'value',lockOptgroupOrder:false,sortField:'$order',searchField:['text'],searchConjunction:'and',mode:null,wrapperClass:'selectize-control',inputClass:'selectize-input',dropdownClass:'selectize-dropdown',dropdownContentClass:'selectize-dropdown-content',dropdownParent:null,copyClassesToDropdown:true,render:{}};$.fn.selectize=function(settings_user){var defaults=$.fn.selectize.defaults;var settings=$.extend({},defaults,settings_user);var attr_data=settings.dataAttr;var field_label=settings.labelField;var field_value=settings.valueField;var field_disabled=settings.disabledField;var field_optgroup=settings.optgroupField;var field_optgroup_label=settings.optgroupLabelField;var field_optgroup_value=settings.optgroupValueField;var init_textbox=function($input,settings_element){var i,n,values,option;var data_raw=$input.attr(attr_data);if(!data_raw){var value=$.trim($input.val()||'');if(!settings.allowEmptyOption&&!value.length)return;values=value.split(settings.delimiter);for(i=0,n=values.length;i<n;i++){option={};option[field_label]=values[i];option[field_value]=values[i];settings_element.options.push(option);}
settings_element.items=values;}else{settings_element.options=JSON.parse(data_raw);for(i=0,n=settings_element.options.length;i<n;i++){settings_element.items.push(settings_element.options[i][field_value]);}}};var init_select=function($input,settings_element){var i,n,tagName,$children,order=0;var options=settings_element.options;var optionsMap={};var readData=function($el){var data=attr_data&&$el.attr(attr_data);if(typeof data==='string'&&data.length){return JSON.parse(data);}
return null;};var addOption=function($option,group){$option=$($option);var value=hash_key($option.val());if(!value&&!settings.allowEmptyOption)return;if(optionsMap.hasOwnProperty(value)){if(group){var arr=optionsMap[value][field_optgroup];if(!arr){optionsMap[value][field_optgroup]=group;}else if(!$.isArray(arr)){optionsMap[value][field_optgroup]=[arr,group];}else{arr.push(group);}}
return;}
var option=readData($option)||{};option[field_label]=option[field_label]||$option.text();option[field_value]=option[field_value]||value;option[field_disabled]=option[field_disabled]||$option.prop('disabled');option[field_optgroup]=option[field_optgroup]||group;option['title']=$option.attr('title')||option['title']||'';option['id']=$option.attr('id')||option['id']||'';optionsMap[value]=option;options.push(option);if($option.is(':selected')){settings_element.items.push(option[field_value]);}};var addGroup=function($optgroup){var i,n,id,optgroup,$options;$optgroup=$($optgroup);id=$optgroup.attr('label');if(id){optgroup=readData($optgroup)||{};optgroup[field_optgroup_label]=id;optgroup[field_optgroup_value]=id;optgroup[field_disabled]=$optgroup.prop('disabled');settings_element.optgroups.push(optgroup);}
$options=$('option',$optgroup);for(i=0,n=$options.length;i<n;i++){addOption($options[i],id);}};settings_element.maxItems=$input.attr('multiple')?null:1;$children=$input.children();for(i=0,n=$children.length;i<n;i++){tagName=$children[i].tagName.toLowerCase();if(tagName==='optgroup'){addGroup($children[i]);}else if(tagName==='option'){addOption($children[i]);}}};return this.each(function(){if(this.selectize)return;var instance;var $input=$(this);var tag_name=this.tagName.toLowerCase();var placeholder=$input.attr('placeholder')||$input.attr('data-placeholder');if(!placeholder&&!settings.allowEmptyOption){placeholder=$input.children('option[value=""]').text();}
var settings_element={'placeholder':placeholder,'options':[],'optgroups':[],'items':[]};if(tag_name==='select'){init_select($input,settings_element);}else{init_textbox($input,settings_element);}
instance=new Selectize($input,$.extend(true,{},defaults,settings_element,settings_user));});};$.fn.selectize.defaults=Selectize.defaults;$.fn.selectize.support={validity:SUPPORTS_VALIDITY_API};Selectize.define('drag_drop',function(options){if(!$.fn.sortable)throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');if(this.settings.mode!=='multi')return;var self=this;self.lock=(function(){var original=self.lock;return function(){var sortable=self.$control.data('sortable');if(sortable)sortable.disable();return original.apply(self,arguments);};})();self.unlock=(function(){var original=self.unlock;return function(){var sortable=self.$control.data('sortable');if(sortable)sortable.enable();return original.apply(self,arguments);};})();self.setup=(function(){var original=self.setup;return function(){original.apply(this,arguments);var $control=self.$control.sortable({items:'[data-value]',forcePlaceholderSize:true,disabled:self.isLocked,start:function(e,ui){ui.placeholder.css('width',ui.helper.css('width'));$control.css({overflow:'visible'});},stop:function(){$control.css({overflow:'hidden'});var active=self.$activeItems?self.$activeItems.slice():null;var values=[];$control.children('[data-value]').each(function(){values.push($(this).attr('data-value'));});self.setValue(values);self.setActiveItem(active);}});};})();});Selectize.define('dropdown_header',function(options){var self=this;options=$.extend({title:'Untitled',headerClass:'selectize-dropdown-header',titleRowClass:'selectize-dropdown-header-title',labelClass:'selectize-dropdown-header-label',closeClass:'selectize-dropdown-header-close',html:function(data){return('<div class="'+data.headerClass+'">'+
'<div class="'+data.titleRowClass+'">'+
'<span class="'+data.labelClass+'">'+data.title+'</span>'+
'<a href="javascript:void(0)" class="'+data.closeClass+'">&times;</a>'+
'</div>'+
'</div>');}},options);self.setup=(function(){var original=self.setup;return function(){original.apply(self,arguments);self.$dropdown_header=$(options.html(options));self.$dropdown.prepend(self.$dropdown_header);};})();});Selectize.define('optgroup_columns',function(options){var self=this;options=$.extend({equalizeWidth:true,equalizeHeight:true},options);this.getAdjacentOption=function($option,direction){var $options=$option.closest('[data-group]').find('[data-selectable]');var index=$options.index($option)+direction;return index>=0&&index<$options.length?$options.eq(index):$();};this.onKeyDown=(function(){var original=self.onKeyDown;return function(e){var index,$option,$options,$optgroup;if(this.isOpen&&(e.keyCode===KEY_LEFT||e.keyCode===KEY_RIGHT)){self.ignoreHover=true;$optgroup=this.$activeOption.closest('[data-group]');index=$optgroup.find('[data-selectable]').index(this.$activeOption);if(e.keyCode===KEY_LEFT){$optgroup=$optgroup.prev('[data-group]');}else{$optgroup=$optgroup.next('[data-group]');}
$options=$optgroup.find('[data-selectable]');$option=$options.eq(Math.min($options.length-1,index));if($option.length){this.setActiveOption($option);}
return;}
return original.apply(this,arguments);};})();var getScrollbarWidth=function(){var div;var width=getScrollbarWidth.width;var doc=document;if(typeof width==='undefined'){div=doc.createElement('div');div.innerHTML='<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';div=div.firstChild;doc.body.appendChild(div);width=getScrollbarWidth.width=div.offsetWidth-div.clientWidth;doc.body.removeChild(div);}
return width;};var equalizeSizes=function(){var i,n,height_max,width,width_last,width_parent,$optgroups;$optgroups=$('[data-group]',self.$dropdown_content);n=$optgroups.length;if(!n||!self.$dropdown_content.width())return;if(options.equalizeHeight){height_max=0;for(i=0;i<n;i++){height_max=Math.max(height_max,$optgroups.eq(i).height());}
$optgroups.css({height:height_max});}
if(options.equalizeWidth){width_parent=self.$dropdown_content.innerWidth()-getScrollbarWidth();width=Math.round(width_parent/n);$optgroups.css({width:width});if(n>1){width_last=width_parent-width*(n-1);$optgroups.eq(n-1).css({width:width_last});}}};if(options.equalizeHeight||options.equalizeWidth){hook.after(this,'positionDropdown',equalizeSizes);hook.after(this,'refreshOptions',equalizeSizes);}});Selectize.define('remove_button',function(options){if(this.settings.mode==='single')return;options=$.extend({label:'&times;',title:'Remove',className:'remove',append:true},options);var singleClose=function(thisRef,options){options.className='remove-single';var self=thisRef;var html='<a href="javascript:void(0)" class="'+options.className+'" tabindex="-1" title="'+escape_html(options.title)+'">'+options.label+'</a>';var append=function(html_container,html_element){return $('<span>').append(html_container).append(html_element);};thisRef.setup=(function(){var original=self.setup;return function(){if(options.append){var id=$(self.$input.context).attr('id');var selectizer=$('#'+id);var render_item=self.settings.render.item;self.settings.render.item=function(data){return append(render_item.apply(thisRef,arguments),html);};}
original.apply(thisRef,arguments);thisRef.$control.on('click','.'+options.className,function(e){e.preventDefault();if(self.isLocked)return;self.clear();});};})();};var multiClose=function(thisRef,options){var self=thisRef;var html='<a href="javascript:void(0)" class="'+options.className+'" tabindex="-1" title="'+escape_html(options.title)+'">'+options.label+'</a>';var append=function(html_container,html_element){var pos=html_container.search(/(<\/[^>]+>\s*)$/);return html_container.substring(0,pos)+html_element+html_container.substring(pos);};thisRef.setup=(function(){var original=self.setup;return function(){if(options.append){var render_item=self.settings.render.item;self.settings.render.item=function(data){return append(render_item.apply(thisRef,arguments),html);};}
original.apply(thisRef,arguments);thisRef.$control.on('click','.'+options.className,function(e){e.preventDefault();if(self.isLocked)return;var $item=$(e.currentTarget).parent();self.setActiveItem($item);if(self.deleteSelection()){self.setCaret(self.items.length);}});};})();};if(this.settings.mode==='single'){singleClose(this,options);return;}else{multiClose(this,options);}});Selectize.define('restore_on_backspace',function(options){var self=this;options.text=options.text||function(option){return option[this.settings.labelField];};this.onKeyDown=(function(){var original=self.onKeyDown;return function(e){var index,option;if(e.keyCode===KEY_BACKSPACE&&this.$control_input.val()===''&&!this.$activeItems.length){index=this.caretPos-1;if(index>=0&&index<this.items.length){option=this.options[this.items[index]];if(this.deleteSelection(e)){this.setTextboxValue(options.text.apply(this,[option]));this.refreshOptions(true);}
e.preventDefault();return;}}
return original.apply(this,arguments);};})();});return Selectize;}));
;/* extensions/SelectizeJS/web/js/SelectizeJS.js */
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
var show_alerts = true;
$(document).ready(function () {
	$(window).on('beforeunload', function () {
		show_alerts = false;
	});
});
function load_hist(myid) {
	var state = window.history.state;
	if (state !== null && state !== undefined) {
		var data = JSON.parse(state);
		if (data["selectize"] && data[myid]) {
			$('#' + myid).html(data[myid]);
			$('#bz_' + myid + '_input_th').removeClass('bz_default_hidden');
			$('#bz_' + myid + '_input_td').removeClass('bz_default_hidden');
			$('#defined_' + myid).val(1);
			return (1);
		}
	}
	return (0);
}
/*
This plugin reloads ajax values in to selects when hitting the back button
*/
Selectize.define('form_history', function (options) {
	var self = this;
	this.onChange = (function () {
		var original = self.onChange;
		return function () {
			original.apply(this, arguments);
			var myid = self.$input.attr('id');
			var state = window.history.state;
			if (state !== null && state !== undefined) {
				var data = JSON.parse(state);
				data[myid] = $('#' + myid).html();
				history.replaceState(JSON.stringify(data), window.location);
			} else {
				var data = {
					selectize: 1
				};
				data[myid] = $('#' + myid).html();
				history.pushState(JSON.stringify(data), window.location);
			}
		};
	})();
});
Selectize.define('minimum_search_length', function () {
	var self = this;
	var min_length = this.settings.minimum_search_length || null;
	min_length = (!min_length || min_length <= 0) ? 1 : min_length;
	var KEY_TAB = 9;
	var KEY_RETURN = 13;
	this.onKeyUp = (function () {
		var original = self.onKeyUp;
		return function (e) {
			// Ignore tab and enter key to avoid unnecessary check
			if (e.keyCode !== KEY_TAB && e.keyCode !== KEY_RETURN) {
				var value = this.$control_input.val() || '';
				// Make sure it won't close the list if search text is empty because
				// Selectlize will list all the loaded options.
				if (value.length && value.length < min_length) {
					this.close();
					e.preventDefault();
					return;
				}
				// Make sure it reopens the closed list if the new query matches the previous query.
				var last_val = self.lastValue;
				if (last_val.length >= min_length && last_val === value && !self.isOpen) this.open();
			}
			return original.apply(this, arguments);
		};
	})();
});
/**
* This plugin provides extra keyboard commands for users to navigate the select list.
*/
Selectize.define('extra_keys_control', function () {
	var self = this;
	var KEY_PAGEUP = 33;
	var KEY_PAGEDOWN = 34;
	var KEY_HOME = 36;
	var KEY_END = 35;
	var KEY_A = 65;
	var list_all = this.settings.list_all || function () {};
	this.onKeyDown = (function () {
		var original = self.onKeyDown;
		return function (e) {
			switch (e.keyCode) {
				/*
				Copy from https://github.com/daimor/selectize.js/commit/f0bc92568a4d668a90b5919b8fa98512c396b37d
				This forked commit make changes into selectize.js directly. Instead of doing this, I think it is better
				to write it as a plugin.
				*/
				case KEY_PAGEUP:
					if (self.$activeOption) {
						self.ignoreHover = true;
						var pageSize = Math.round(self.$dropdown_content.innerHeight() / self.$activeOption.outerHeight()) - 1;
						var $prev = self.getAdjacentOption(self.$activeOption, -pageSize);
						if ($prev.length) self.setActiveOption($prev, true, true);
					}
					e.preventDefault();
					return;
				case KEY_PAGEDOWN:
					if (self.$activeOption) {
						self.ignoreHover = true;
						var pageSize = Math.round(self.$dropdown_content.innerHeight() / self.$activeOption.outerHeight()) - 1;
						var $next = self.getAdjacentOption(self.$activeOption, pageSize);
						if ($next.length) self.setActiveOption($next, true, true);
					}
					e.preventDefault();
					return;
				case KEY_HOME:
					if (self.$activeOption) {
						self.ignoreHover = true;
						var $home = this.$dropdown.find('[data-selectable]:first');
						if ($home.length) self.setActiveOption($home, true, true);
						e.preventDefault();
					}
					return;
				case KEY_END:
					if (self.$activeOption) {
						self.ignoreHover = true;
						var $end = this.$dropdown.find('[data-selectable]:last');
						if ($end.length) self.setActiveOption($end, true, true);
						e.preventDefault();
					}
					return;
					/*
					End commit https://github.com/daimor/selectize.js/commit/f0bc92568a4d668a90b5919b8fa98512c396b37d
					*/
					// Load all data when Ctrl + SHIFT + a is pressed.
				case KEY_A:
					if (e.ctrlKey && e.shiftKey) {
						list_all(self);
						e.preventDefault();
					}
					return;
			}
			return original.apply(this, arguments);
		};
	})();
});
/**
*	If the number of elements not matching in the other array is shorter than the
*	number of elements in the array then something matches, and vice-versa
*/
function any_matches(array1, array2) {
	return $(array1).not(array2).length != $(array1).length ||
		$(array2).not(array1).length != $(array2).length;
}
/*
This plugin hides fields, and values in fields, base on the values in this field
When product changes, show/hide fields on prod.name in array
When cf_fu changes, show/hide values in cf_bar, base on cf_fu.selected in array
e.g. Only show value fubar in cf_bar if cf_fu == 'cu fu'
var RELATED_FIELDS = {
'product': {
		'fields': {
			'cf_fu': ['Prod 1', 'Prod 5', 'Fu Prod'],
			'cf_bar': ['Prod 1', 'Prod 3', 'Bar Prod']
		}
	},	
	cf_fu {
		'values': {
			'cu fu': {
				'cf_bar': ['fubar']
			}
		},
	}
};
*/
Selectize.define('related_fields', function () {
	var self = this;
	this.onChange = (function () {
		var original = self.onChange;
		return function () {
			original.apply(this, arguments);
			var my_id = self.$input.attr('id');
			if (typeof RELATED_FIELDS[my_id] === 'undefined') return;
			var selected_values = $('#' + my_id).get_selected_items();
			if (typeof RELATED_FIELDS[my_id]['fields'] !== 'undefined') {
				$.each(RELATED_FIELDS[my_id]['fields'], function (field, val) {
					/* If none of selected_values are in the this.values */
					if (any_matches(selected_values, val)) {
						$('#' + field).show_field();
					} else {
						$('#' + field).hide_field()
					}
				});
			}
			if (typeof RELATED_FIELDS[my_id]['values'] !== 'undefined') {
				$.each(RELATED_FIELDS[my_id]['values'], function (the_value, fields) {
					if (any_matches(selected_values, [the_value])) {
						$.each(fields, function (the_field, values) {
							$('#' + the_field).show_values(values);
						});
					} else {
						$.each(fields, function (the_field, values) {
							$('#' + the_field).hide_values(values)
						});
					}
				});
			}
		};
	})();
});
Selectize.define('load_from_js', function () {
	var self = this;
	$(this).attr('loaded', false);
	this.onFocus = (function () {
		var original = self.onFocus;
		return function () {
			if ($(this).attr('loaded') == false) {
				var my_id = self.$input.attr('id');
				$('#' + my_id).load_from_js();
				$(this).attr('loaded', true);
			}
			original.apply(this, arguments);
		};
	})();
});
jQuery.fn.extend({
	load_from_js: function () {
		if (!$(this).hasClass('selectized')) return;
		var $sel = $(this).selectize()[0].selectize;
		var my_id = $sel.$input.attr('id');
		if (my_id === 'pool_id') {
			$.each(AGILE_TEAMS, function (team_name, team) {
				if(permitted_teams && ! any_matches(permitted_teams, [team['id']])) {
					return true;
				}
				$sel.addOptionGroup(team['name'], {
					'label': team['name'],
					'value': team['name']
				});
				$.each(team['pools'], function (indexedDB, pool) {
					if (team_name.match('^sst_') && pool['is_sprint'] === 1) {
						return true;
					}
					var data = {};
					data['value'] = pool['id'];
					data['text'] = pool['name'];
					if (default_pool_id && pool['id'] === default_pool_id) {
						data['text'] = pool['name'] + ' *';
					}
					data['optgroup'] = team['name'];
					$sel.addOption(data, team['name']);
				});
			});
			$sel.refreshOptions(true);
		} else if (my_id === 'keywords') {
			$.each(KEYWORDS, function (i, obj) {
				var data = {};
				data['value'] = obj['name'];
				data['text'] = obj['name'];
				data['title'] = obj['title'];
				$sel.addOption(data);
			});
			$sel.refreshOptions(true);
		}
	},
	show_values: function (values) {
		if (!$(this).hasClass('selectized')) return;
		var $sel = $(this).selectize()[0].selectize;
		$.each(values, function (i, value) {
			if ($sel.options[value].disabled === true) {
				$sel.options[value].disabled = false;
				delete $sel.renderCache['option'][value];
			}
		});
		$sel.refreshOptions(false, true);
	},
	hide_values: function (values) {
		if (!$(this).hasClass('selectized')) return;
		var $sel = $(this).selectize()[0].selectize;
		$.each(values, function (i, value) {
			if ($sel.options[value].disabled == false) {
				$sel.options[value].disabled = true;
				delete $sel.renderCache['option'][value];
			}
		});
		$sel.refreshOptions(false, true);
	},
	show_field: function () {
		if ($(this).hasClass('selectized')) {
			var $sel = $(this).selectize()[0].selectize;
			if (($sel).$input.prop('disabled') == true) {
				var myid = $(this).attr('id');
				$sel.enable();
				$('#bz_' + myid + '_input_th').removeClass('bz_default_hidden');
				$("#bz_" + myid + '_input_td').removeClass('bz_default_hidden');
			}
		} else {
			$(this).removeClass('bz_default_hidden');
		}
	},
	hide_field: function () {
		if ($(this).hasClass('selectized')) {
			var $sel = $(this).selectize()[0].selectize;
			if (($sel).$input.prop('disabled') == false) {
				var myid = $(this).attr('id');
				$sel.disable();
				$("#bz_" + myid + '_input_th').addClass('bz_default_hidden');
				$("#bz_" + myid + '_input_td').addClass('bz_default_hidden');
			}
		} else {
			$(this).addClass('bz_default_hidden');
		}
	},
	clearComponentSearch: function (id) {
		var $sel = $(this).selectize()[0].selectize;
		var selected_items = $sel.items;
		$(this).clear_unselected(id);
		$("#component").data('noajax', false);
		if (id) {
			if ($("#product").selectize()[0].selectize.items.length == 0) {
				set_comp_multi(1);
				init_components({
					placehold_text: 'Select a product first'
				});
				$("#component").selectize()[0].selectize.disable();
				$("div.fetch_all").css("display", "none");
			} else {
				set_comp_multi(1);
				init_components({
					select_items: selected_items
				});
				$("#component").selectize()[0].selectize.enable();
				$("div.fetch_all").css("display", "block");
			}
			return;
		}
		var multi = 0;
		if ($("#product").selectize()[0].selectize.items.length == 0) {
			// NOP ATM, might be coder later on
		} else if ($("#product").selectize()[0].selectize.items.length > 1) {
			set_comp_multi(1);
			init_components({
				select_items: selected_items,
				sub_components: show_sub_components
			});
		} else {
			$("#product")._onAjaxSend();
			var rpc = new Rpc('SelectizeJS', 'is_prod_multi', {
					product: $("#product").get_sel_ids()
				})
				.complete(function (cb) {
					$("#product")._onAjaxComplete();
				})
				.fail(function (error) {
					warn(error);
				})
				.done(function (data) {
					set_comp_multi(data.ismulti);
					init_components({
						select_items: selected_items,
						sub_components: show_sub_components
					});
				});
		}
	},
	clearSel: function (id) {
		if (!$(this).hasClass('selectized')) {
			return;
		}
		var $selHandle = $(this).selectize()[0].selectize;
		$selHandle.clearOptions();
		$selHandle.lastQuery = null;
		$selHandle.loadedSearches = {};
		$selHandle.currentResults = null;
		$selHandle.refreshOptions(false);
	}
});
/*
NOTE: This method is related to 'js/field-ajax.js' which might be deleted in Bugzilla 5.0 so we
will need to review this code during the Bugzilla 5.0 upgrades for other solution.
The purpose of this method is to make the ajax request to exclude unnecessary component field
in show_bug.cgi page when the product field changes. Fetching components could be expensive for
some products, such as Fedora.
*/
function getBzFieldList(exclude_fields) {
	return $.grep(bz_field_list, function (field) {
		if ($.inArray(field, exclude_fields) === -1) return true;
		return false;
	});
}
function warn(error) {
	if (show_alerts) {
		$('#message').append('<div id="errormsg">' + error.message + '</div>');
		$("#errormsg").dialog({
			buttons: {
				OK: function () {
					$(this).dialog("close");
				}
			},
			title: "RPC Error",
		});
	}
}
function set_comp_multi(multi) {
	var mytest = $('#component').attr('multiple');
	if (multi != mytest) {
		var $select = $('#component');
		var attributes = $select.prop("attributes");
		$('#bz_component_input').html("");
		$select = $('<select></select>');
		$.each(attributes, function () {
			if (this.name == 'onchange') {
				return;
			}
			$select.attr(this.name, this.value);
		});
		if (multi != "0") {
			$select.attr('multiple', true);
		} else {
			$select.attr('multiple', false);
		}
		$('#bz_component_input').append($select);
		$('#bz_component_input').append('<div class="fetch_all" onclick="$(\'#component\').fetch_all()"><i class="fa fa-download"></i><span title="Click to list all components">Click to list all components</span></div>');
	}
}
function _value_id(field_name, id) {
	return 'v' + id + '_' + field_name;
}
jQuery.fn.extend({
	update_displayed_values: function (target_field_id, rules) {
		var $sel = $(this).selectize()[0].selectize;
		if (!$('#' + target_field_id).hasClass('selectized')) return;
		var $target = $('#' + target_field_id).selectize()[0].selectize;
		var my_name = $(this).attr('id');
		var selected_id = $sel.options[$sel.items[0]].id;
		for (var key in $target.options) {
			var show = 1;
			var opt = $target.options[key];
			$.each(rules, function (id, vals) {
				id = _value_id(my_name, id);
				// not not is true
				if (id !== selected_id) {
					$.each(vals, function (opt_idx, opt_id) {
						opt_id = _value_id(target_field_id, opt_id);
						if (opt.id == opt_id) {
							show = 0;
						}
					});
				}
			});
			if (show) {
				if ($target.options[key].disabled == true) {
					$target.options[key].disabled = false;
					delete $target.renderCache['option'][key];
				}
			} else {
				if ($target.options[key].disabled == false) {
					$target.options[key].disabled = true;
					delete $target.renderCache['option'][key];
				}
			}
		};
		$target.refreshOptions(false, true);
		return;
	},
	select_first: function () {
		var $sel;
		var $selize = $(this).selectize();
		if ($selize[0] !== undefined) {
			$sel = $selize[0].selectize;
		} else {
			$sel = $selize.selectize;
		}
		var lowest = Number.MAX_SAFE_INTEGER;
		var found;
		for (var key in $sel.options) {
			if ($sel.options[key].$order < lowest) {
				lowest = $sel.options[key].$order
				found = key
			}
		}
		if (typeof found !== 'undefined') {
			$sel.setValue($sel.options[found].value);
		}
	},
	// Set description for component
	set_descr: function () {
		var $sel = $(this).selectize()[0].selectize;
		var text = '';
		$(this).find('option').each(function () {
			if ($(this).is(":selected") && $(this).val().length) {
				var $obj = $sel.options[$(this).val()];
				text = text + $obj['title'] + "<br>";
			}
		});
		$("#comp_desc").html(text);
	},
	// Fetch all options for this select
	fetch_all: function (quiet, force, select_items) {
		var $sel = $(this).selectize()[0].selectize;
		var query = '..';
		// Don't fetch all again if we already did
		if (force || $sel.$input.data('noajax') === undefined || !$sel.$input.data('noajax')) {
			$sel.$input.data('noajax', false);
			$.each($sel.options, function (myval) {
				if (!$sel.items || $sel.items.indexOf(myval) === -1) {
					$sel.removeOption(myval);
				}
			});
			$sel.select_items = select_items;
			$sel.lastQuery = null;
			$sel.loadedSearches = {};
			$sel.currentResults = null;
			$sel.onSearchChange(query);
			$sel.unlock();
			$sel.enable();
		}
		if (!quiet) $sel.open();
	},
	// Get the ID of all selected items
	get_sel_ids: function () {
		var $sel = $(this).selectize()[0].selectize;
		return $.map($sel.items, function (value) {
			return $sel.options[value]['id']
		}).join(',');
	},
	get_selected_items: function () {
		var $sel = $(this).selectize()[0].selectize;
		var texts = [];
		$.each($sel.items, function (idx, value) {
			texts.push(value);
		});
		return texts;
	},
	get_selected_item: function () {
		var $sel = $(this).selectize()[0].selectize;
		var text = '';
		if ($sel.items[0]) {
			text = $sel.items[0];
		}
		return text;
	},
	get_selected_item_text: function () {
		var $sel = $(this).selectize()[0].selectize;
		var text = '';
		if ($sel.items[0]) {
			text = $sel.getItem($sel.items[0]).text().trim();
		}
		return text;
	},
	clear_unselected: function (id) {
		var $selize = $(this).selectize();
		if ($selize[0] !== undefined) {
			$sel = $selize[0].selectize;
		} else {
			$sel = $selize.selectize;
		}
		$.each($sel.options, function (myval) {
			if ((id && $('#' + id).selectize()[0].selectize.items.length == 0) || $sel.items.indexOf(myval) === -1) {
				$sel.removeOption(myval);
			}
		});
		$(this).find('optgroup:empty').each(function () {
			$sel.removeOptionGroup($(this).value);
		});
		$sel.lastQuery = null;
		$sel.loadedSearches = {};
		$sel.currentResults = null;
		$sel.refreshOptions(false);
	},
	update_select: function (fields, id, rpc_comp, rpc_func, rpc_id_field, inactive) {
		var $selize;
		// This is required because the forms sometimes have text instead of selects.
		if (!$(this).hasClass('selectized')) {
			$(this).html('<select id="' + $(this).attr('id') + '"><option>---</option></select>');
			$selize = $(this).selectize({
				selectOnTab: true
			});
		} else {
			$selize = $(this).selectize();
		}
		if ($selize === Array) {
			$sel = $selize[0].selectize;
		} else {
			$sel = $selize.selectize;
		}
		var $me = $(this);
		var rpc;
		var data = {};
		rpc_id_field = rpc_id_field || 'names';
		if ($("#" + id).selectize()[0].selectize.items.length == 0) {
			$me.clear_unselected();
			if ($sel.items.length == 0) {
				$sel.settings.placeholder = 'Select a ' + id + ' first';
				$sel.updatePlaceholder();
				$sel.disable();
				return
			}
		}
		data[rpc_id_field] = $("#" + id).selectize()[0].selectize.getValue();
		data['include_fields'] = fields;
		$me._onAjaxSend();
		return rpc = new Rpc(rpc_comp, rpc_func, data)
			.complete(function (cb) {
				$me._onAjaxComplete();
			})
			.fail(function (error) {
				warn(error);
			})
			.done(function (res) {
				var data = [];
				var field = fields[0];
				$me.clear_unselected();
				var count = 0;
				if (res[id + "s"] === undefined) return;
				for (i = 0, n = res[id + "s"].length; i < n; i++) {
					var outer = res[id + "s"][i];
					if (outer[field] === undefined) continue;
					for (j = 0, m = outer[field].length; j < m; j++) {
						var inner = outer[field][j];
						if (!inactive && inner.is_active === false) continue;
						data[count] = {
							text: inner.name,
							value: inner.name,
							id: "v" + inner.id + "_" + id
						};
						count = count + 1;
					}
				}
				$sel.addOption(data);
				$sel.refreshOptions(false);
				if (count > 1) {
					$sel.enable();
				} else {
					$sel.setValue(data[0].value);
					$sel.disable();
				}
				$sel.settings.placeholder = ' ';
				$sel.updatePlaceholder();
			});
	},
	reset_select: function (id, rpc_comp, rpc_func) {
		var $sel = $(this).selectize()[0].selectize;
		var $me = $(this);
		var rpc;
		var data = {};
		$me.clearSel();
		data['id'] = $("#" + id).selectize()[0].selectize.getValue();
		$("#" + id)._onAjaxSend();
		return rpc = new Rpc(rpc_comp, rpc_func, data)
			.complete(function (cb) {
				$("#" + id)._onAjaxComplete();
			})
			.fail(function (error) {
				warn(error);
			})
			.done(function (res) {
				var data = [];
				var count = 0;
				for (i = 0, n = res.length; i < n; i++) {
					var rec = res[i];
					data[count] = {
						text: rec[1],
						value: rec[0]
					};
					count = count + 1;
				}
				$sel.addOption(data);
				$sel.refreshOptions(false);
				$sel.enable();
				$sel.settings.placeholder = ' ';
				$sel.updatePlaceholder();
			});
	},
	// Can be called on selects (selectized) or text boxes
	_onAjaxSend: function () {
		var node = this.parent();
		if (this[0] && this[0].selectize) {
			node = this[0].selectize.$control_input.parent();
		}
		if (!node.find('.fa-spinner').length) {
			node.append('<i class="fa fa-spinner fa-pulse"></i>');
		}
	},
	// Can be called on selects (selectized) or text boxes
	_onAjaxComplete: function () {
		var node = this.parent();
		node.find('.fa-spinner').remove();
	}
});
function init_components(args) {
	args = args || {};
	args.mywidth = args.mywidth || "25em";
	args.placehold_text = args.placehold_text || "Type a component name. Ctrl+Shift+A to list all";
	args.disabled = args.disabled || 0;
	args.sub_components = args.sub_components || null;
	args.id = args.id || 'component';
	args.product_id = args.product_id || 'product';
	args.follow_product = args.follow_product || 0;
	load_hist(args.id);
	args.product = args.product || null;
	var foo;
	$("#" + args.id).attr('placeholder', args.placehold_text);
	var $sel = $("#" + args.id).selectize({
		sortField: {
			field: 'text',
			direction: 'asc'
		},
		loadThrottle: 1000,
		selectOnTab: true,
		maxOptions: null,
		// Set this to false because it will open the dropdown list even if you just tab pass this element
		// which I think is quite annoying. The native selectbox won't expand the list when focus. User
		// can either click the caret or hit the down arrow key to open the dropdown.
		openOnFocus: false,
		onInitialize: function () {
			fetch_all_listener(this, args);
		},
		// Provides a callback function to fetch all list when shortcut key is pressed.
		list_all: function () {
			$("#" + args.id).fetch_all();
		},
		plugins: ['remove_button', 'minimum_search_length', 'extra_keys_control', 'form_history', 'related_fields'],
		render: {
			option: function (item, escape) {
				return '<div title="' + escape(item.title || "") + '">' +
					'<span>' + escape(item.value) + '</span>' +
					'</div>';
			}
		},
		load: function (query, callback) {
			var $sel = this;
			$sel.$input.data('noajax', args.noajax || $sel.$input.data('noajax') || false);
			args.noajax = false;
			if (!query.length) return callback();
			if ($sel.$input.data('noajax')) return callback();
			if (args.auto) $sel.$input.data('noajax', true);
			var data = {};
			data['term'] = query;
			data['descrs'] = args.descrs;
			data['disabled'] = args.disabled;
			data['product'] = args.product || $("input[name=product]").val() || $("#" + args.product_id).get_sel_ids();
			if (!data['product'].length) return callback();
			$("#" + args.id)._onAjaxSend();
			return foo = new Rpc('SelectizeJS', 'list_components', data)
				.complete(function () {
					$("#" + args.id)._onAjaxComplete();
				})
				.fail(function (error) {
					warn(error);
				})
				.done(function (res) {
					// Don't do rpc again if we got the full list.
					if (query === '..') $sel.$input.data('noajax', true);
					callback(res);
				});
		}
	})[0].selectize;
	$("#container_component .selectize-control input").attr('placeholder', args.placehold_text);
	if (args.auto) {
		$("#" + args.id).fetch_all(1);
	}
	var select_items = args.select_items || [];
	if (!args.auto && select_items.length) {
		var params = {};
		params['components'] = select_items
		params['product'] = args.product || $("input[name=product]").val() || $("#" + args.product_id).get_sel_ids();
		if (params['product'] && params['product'].length) {
			$sel.clearOptions();
			$("#" + args.id)._onAjaxSend();
			new Rpc('SelectizeJS', 'list_components', params)
				.complete(function () {
					$("#" + args.id)._onAjaxComplete();
				})
				.fail(function (error) {
					warn(error);
				})
				.done(function (res) {
					$.each(res, function (idx, data) {
						$sel.addOption(data);
						$sel.addItem(data['value']);
					});
					if (args.sub_components) {
						args.sub_components();
						$("#" + args.id).on('change', function () {
							args.sub_components();
							assign_to_default();
						});
					}
				});
		}
		return;
	} else if (select_items.length) {
		$sel.items = [];
		$sel.addItems(select_items);
	}
	if (args.sub_components) args.sub_components();
	if (args.auto) {
		$("#" + args.id).fetch_all(true);
	}
	if (args.follow_product) {
		$('#' + args.product_id).on('change', function () {
			$('#' + args.id).clearComponentSearch(args.product_id);
		});
	}
}
function init_products(args) {
	args = args || {};
	args.mywidth = args.mywidth || "25em";
	args.placehold_text = args.placehold_text || "";
	args.disabled = args.disabled || 0;
	args.id = args.id || 'product';
	args.classification_id = args.classification_id || 'classification';
	args.classification_id = '#' + args.classification_id;
	var foo;
	load_hist(args.id);
	if (args.def) $("#" + args.id + " option:selected").remove();
	$("#" + args.id).attr('placeholder', args.placehold_text);
	var $sel = $("#" + args.id).selectize({
		sortField: {
			field: 'text',
			direction: 'asc'
		},
		loadThrottle: 1000,
		selectOnTab: true,
		maxOptions: null,
		openOnFocus: false,
		optgroupField: "classification",
		optgroupValueField: "name",
		optgroupLabelField: "description",
		lockOptgroupOrder: true,
		optgroups: c_optgroups,
		onInitialize: function () {
			fetch_all_listener(this, args);
		},
		plugins: ['remove_button', 'extra_keys_control', 'related_fields'],
		render: {
			option: function (item, escape) {
				return '<div class="option" title="' + escape(item.title) + '" id="' + escape(item.id) + '" data-value="' + escape(item.value) + '">' +
					'<span>' + escape(item.text) + '</span>' +
					'</div>';
			}
		},
		load: function (query, callback) {
			var $sel = this;
			$sel.$input.data('noajax', args.noajax || $sel.$input.data('noajax') || false);
			args.noajax = false;
			if (!query.length) return callback();
			if ($sel.$input.data('noajax')) return callback();
			if (args.auto) $sel.$input.data('noajax', true);
			if (args.onclick) $sel.$input.data('noajax', true);
			var data = {};
			data['term'] = query;
			data['descrs'] = args.descrs;
			data['disabled'] = args.disabled;
			if (args.classification) {
				data['classification'] = $(args.classification_id).selectize()[0].selectize.getValue();
			}
			$("#" + args.id)._onAjaxSend();
			return foo = new Rpc('SelectizeJS', 'list_products', data)
				.complete(function (cb) {
					$("#" + args.id)._onAjaxComplete();
					if (args.def) $sel.setValue(args.def);
					if (args.callback) args.callback();
				})
				.fail(function (error) {
					warn(error);
				})
				.done(function (res) {
					// Don't do rpc again if we got the full list.
					if (query === '..') $sel.$input.data('noajax', true);
					callback(res);
				});
		}
	})[0].selectize;
	$("#field_container_product .selectize-control input").attr('placeholder', args.placehold_text);
	if (args.auto) {
		$("#" + args.id).fetch_all(true);
	}
	$("#" + args.id).selectize()[0].selectize.close();
	if (args.classification) {
		$(args.classification_id).on('change', function () {
			var select_items = get_selected_items_text($(args.classification_id).selectize()[0].selectize);
			$("#" + args.id).fetch_all(true, true, select_items);
		});
	}
}
function init_sub_components(args) {
	args = args || {};
	args.mywidth = args.mywidth || "25em";
	args.placehold_text = args.placehold_text || "Type a sub-component name";
	args.disabled = args.disabled || 0;
	args.valueField = args.valueField || 'value';
	args.use_name = args.use_name || 0;
	args.hook_component = args.hook_component || 0;
	var foo;
	var myid = args.myid || 'rh_sub_component';
	var show = load_hist(myid);
	args.nohide = args.nohide || show || 0;
	$("#" + myid).attr('placeholder', args.placehold_text);
	$("#" + myid).selectize({
		valueField: args.valueField,
		loadThrottle: 1000,
		selectOnTab: true,
		maxOptions: null,
		openOnFocus: false,
		onInitialize: function () {
			fetch_all_listener(this, args);
		},
		plugins: ['remove_button', 'minimum_search_length', 'extra_keys_control', 'form_history', 'related_fields'],
		render: {
			option: function (item, escape) {
				return '<div title="' + escape(item.title || "") + '">' +
					'<span>' + Array(3 * (item.level || 0)).join("&nbsp;") + escape(item.text) + '</span>' +
					'</div>';
			}
		},
		onOptionAdd: function (value, data) {
			if (data['selected']) this.addItem(value);
		},
		load: function (query, callback) {
			var $sel = this;
			if (!query.length) return callback();
			$sel.$input.data('noajax', args.noajax || $sel.$input.data('noajax') || false);
			args.noajax = false;
			if ($sel.$input.data('noajax')) return callback();
			if (args.auto) $sel.$input.data('noajax');
			var data = {};
			data['term'] = query;
			if (this.select_items) data['select'] = this.select_items.slice();
			this.select_items = null;
			data['product'] = args.product || $("input[name=product]").val() || $("#product").get_sel_ids();
			data['component'] = $("#component").selectize()[0].selectize.getValue();
			data['descrs'] = args.descrs;
			data['disabled'] = args.disabled;
			if (!data['product'].length) return callback();
			if (!data['component'].length) return callback();
			// On some pages we stick the ID in another field
			if (!/^v\d+/.test(data['product'])) data['product'] = $("input[name=product_id]").val();
			if (!/^v\d+/.test(data['product'])) return callback();
			if (args.use_name) data['use_name'] = 1;
			$("#" + myid)._onAjaxSend();
			return foo = new Rpc('SelectizeJS', 'list_subcomponents', data)
				.complete(function () {
					$("#" + myid)._onAjaxComplete();
					if (args.def) $sel.addItem(args.def);
				})
				.fail(function (error) {
					warn(error);
				})
				.done(function (data) {
					if (data[0] == undefined) {
						if (args.nohide === 0) hide_and_clear_sub_components(myid);
					} else {
						$('#bz_' + myid + '_input_th').removeClass('bz_default_hidden');
						$('#bz_' + myid + '_input_td').removeClass('bz_default_hidden');
						$('#defined_' + myid).val(1);
						$('#container_' + myid + ' .selectize-control input').attr('placeholder', args.placehold_text);
						callback(data);
					}
				});
		}
	});
	$('#container_' + myid + ' .selectize-control input').attr('placeholder', args.placehold_text);
	if (args.auto) {
		$("#" + myid).fetch_all(1);
	}
	if (args.hook_component) {
		$("#component").on('change', function () {
			show_sub_components(myid);
		});
	}
}
function show_sub_components(myid) {
	if (myid === undefined) myid = "rh_sub_component";
	var $sub_comp_sel = $("#" + myid).selectize()[0].selectize;
	var product = $("input[name=product]").val() || $("#product").get_sel_ids();
	var component = $("#component").selectize()[0].selectize.getValue();
	var select_items = get_selected_items_text($sub_comp_sel);
	hide_and_clear_sub_components(myid);
	if (component === "") return;
	$("#" + myid).fetch_all(1, true, select_items);
}
function get_selected_items_text($sel) {
	var texts = [];
	$.each($sel.items, function (idx, value) {
		//		texts.push($sel.getItem(value).text().trim());
		texts.push(value.trim());
	});
	return texts;
}
function hide_and_clear_sub_components(myid) {
	$("#bz_" + myid + '_input_th').addClass('bz_default_hidden');
	$("#bz_" + myid + '_input_td').addClass('bz_default_hidden');
	$('#defined_rh_sub_component').val(0);
	$("#" + myid).clearSel();
	$("#" + myid).selectize()[0].selectize.disable();
}
function fetch_all_listener($sel, args) {
	var KEY_DOWN = 40;
	$(document).on('mousedown.bz', function (e) {
		// Open or fetch all data when user clicks the selectize control.
		if (e.target === $sel.$control[0] && !$sel.isFocused) {
			fetch_all_or_open($sel, args.onclick);
		}
	});
	$sel.$control_input.on('keydown.bz', function (e) {
		// Open or fetch all data when user hit the down arrow key.
		if (e.keyCode === KEY_DOWN) {
			fetch_all_or_open($sel, args.onclick);
		}
	});
}
function fetch_all_or_open($sel, fetch) {
	if (fetch) {
		$sel.$input.fetch_all()
	} else if (!$sel.isOpen) {
		$sel.open();
	}
}
function assign_to_default() {
	var fields = ['set_default_assignee', 'set_default_qa_contact', 'set_default_docs_contact', 'set_default_pool'];
	for (var i in fields) {
		if ($("#" + fields[i])) {
			$("#" + fields[i]).attr('checked', true);
			$("#" + fields[i]).parent().removeClass('bz_default_hidden');
			$("#" + fields[i] + "_label").css("font-weight", "bold");
		}
	}
}
function reassign_to_default(subcomp) {
	var product = $("input[name=product]").val() || $("#product").selectize()[0].selectize.getValue();
	var compSelHandle = $("#component").selectize()[0].selectize;
	var component = compSelHandle.getValue();
	if (!product || component === "" || component.length === 0) return;
	var subcomponent;
	if (subcomp) {
		subcomponent = $("#" + subcomp + " option:selected").val();
	}
	var fields = ['assignee', 'qa_contact', 'docs_contact', 'initial_cc'];
	for (var id in fields) {
		$('#' + fields[id])._onAjaxSend();
	}
	var rpc = new Rpc('SelectizeJS', 'list_roles', {
			product: product,
			component: component,
			subcomponent: subcomponent
		})
		.fail(function (error) {
			warn(error);
		})
		.done(function (data) {
			for (var id in fields) {
				$('#' + fields[id])._onAjaxComplete();
			}
			if (data == null || data[0] == undefined) {
				return;
			}
			for (var i in fields) {
				if ($("#" + fields[i])) {
					var id = "#" + fields[i];
					if (i == 0) {
						id = '#assigned_to';
					}
					var cur_val = $(id).val();
					var new_val = data[0][fields[i]];
					if(new_val === undefined){
						$(id).val('');
						$(id).text('');
						continue;
					}
					if (cur_val == new_val) {
						continue;
					}
					if (id == '#initial_cc') {
						$(id).text(new_val);
					} else {
						$(id).val(new_val['login']);
						if (new_val['insider']) {
							$(id).addClass('redhat_user');
						} else {
							$(id).removeClass('redhat_user');
						}
					}
				}
			}
			$("#flags tbody.bz_flag_type").each(function () {
				var not_found = 1;
				var $sel = $(this).find('select');
				for (var j in data[0]['flags']['bug']) {
					if ($sel.attr('id') == 'flag_type-' + data[0]['flags']['bug'][j]['id']) {
						if (data[0]['flags']['bug'][j]['is_requestable'] == 1) {
							$(this).removeClass('bz_default_hidden');
							not_found = 0;
						}
						break;
					}
				}
				if (not_found) {
					$(this).addClass('bz_default_hidden');
				}
			});
		});
}
function update_selects(empty, inactive) {
	inactive = inactive ? true : false;
	if (empty) {
		$('#version').clearSel();
		$('#target_milestone').clearSel();
		if ($('#target_release').length > 0) {
			$('#target_release').clearSel();
		}
	}
	$('#version').update_select(['versions'], 'product', 'Product', 'get', 'names', inactive);
	$('#target_milestone').update_select(['milestones'], 'product', 'Product', 'get', 'names', inactive);
	if ($('#target_release').length > 0) {
		$('#target_release').update_select(['releases'], 'product', 'Product', 'get', 'names', inactive);
	}
}
