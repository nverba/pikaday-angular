angular-pikaday
===============

[Demo](http://nverba.github.io/angular-pikaday) with examples.

### Pikaday is a refreshing JavaScript Datepicker

- Lightweight (less than 5kb minified and gzipped)
- No dependencies (but plays well with Moment.js)
- Modular CSS classes for easy styling

[ See Pikaday on Github ](https://github.com/dbushell/Pikaday)

------------------------------------------------------------


angular-pikaday is yet another AngularJS Directive for Pikaday. It aims to make deploying and configuring date pickers as simple as possible. Most of Pikaday's config options can be passed as attributes in the HTML element. The assigned angular model exposes the Pikaday object directly, allowing for easy manipulation of the datepicker.

#### Basic example

simply assign pikaday to a scope property to create a new date picker.

```html
<input pikaday="myPicker"></input>
<span>{{ myPicker.getDate() | date:'MM/dd/yyyy' }}</span>
```

#### Available Attributes

- `trigger=` use a different element to trigger opening the datepicker, see trigger example (defaults to directive DOM element)
- `bound=` automatically show/hide the datepicker on field focus (default true)
- `format=` the default output format for .toString() and field value (requires Moment.js for custom formatting)
- `default-date=` the initial date to view when first opened
- `setDefault-date=` make the defaultDate the initial selected value
- `first-day=` first day of the week (0: Sunday, 1: Monday, etc)
- `min-date=` the minimum/earliest date that can be selected
- `max-date=` the maximum/latest date that can be selected
- `year-range=` number of years either side of the year select drop down (e.g. 10) or array of upper/lower range (e.g. [1900,2012])
- `is-r-t-l=` reverse the calendar for right-to-left languages (default false)
- `year-suffix=` additional text to append to the year in the title
- `show-month-after-year=` render the month after year in the title (default false)


#### Get and set date

From the basic example, using `myPicker` as the assigned model.

`myPicker.toString()`

Returns the selected date in a string format. If Moment.js exists, then Pikaday can return any format that Moment understands.

`myPicker.getDate()`

Returns a basic JavaScript Date object of the selected day, or null if no selection, this can be formatted using angulars built in date formatters.

`myPicker.setDate('2012-01-01')`

Set the current selection. This will be restricted within the bounds of minDate and maxDate options if they're specified.

`myPicker.getMoment()`

Returns a Moment.js object for the selected date (Moment must be loaded before Pikaday).

`myPicker.setMoment(moment('14th February 2013', 'DDo MMMM YYYY'))`

Set the current selection with a Moment.js object (passed on to setDate).
