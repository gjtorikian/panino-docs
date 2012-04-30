# Syntax

This document describes the various syntax rules for code files, as well as Markdown files. Note that some of these options can be overwritten with the `-p` argument, and are noted as such.

## Comments

**For Source Files**: Documentation comments start with `/**` and end with `**/`. Each new line starts with `*`. 

    /** ...
     *  ...
     **/

**For Markdown Files**: This rule obviously does not apply.

## Tags (optional)

**For Source Files**: the opening line of a comment is reserved for tags. Tags are optional, and separated by a comma followed by optional whitespace(s) (`, `). They can be either a tag name or a key / value pair separated by a colon and optional whitespace(s) (`: `):

    tagName ': ' tagValue [', ' tagName ': ' tagValue]...

Currently supported tags are:

  * `section: <name>`: Defines what section a description belongs to
  * `alias of: <name>`: Identifies an alias for the member
  * `related to: <name>`: Identifies a related member
  * `read-only`: Identifies a member as read-only
  * `internal`: Identifies a member as private 
  * `hide`: Identifies that the member should not be shown in resulting HTML builds
  * `extension`: Identifies that the member is not a part of the current file or class. This is very typical in, for example, Javascript documentation. Suppose you have two classes, one called `Vehicle` and the other called `Bicycle`, in two different files. `Bicycle` can extended the functions in `Vehicle`, but they should be marked with the `extension` tag, to prevent the parser from considering the extension as part of `Bicycle`.
  * `chainable`: Identifies that a method can be chained, _i.e._ the return value is the same object to which method belongs, like `$(...).on(...).on(...)`
  * `deprecated`: Identifies that the member is considered deprecated. The deprecation tag can also specify version, like this:
    * `deprecated: <from>`: The member is deprecated starting from version `from`
    * `deprecated: <from>..<out>`. The member is deprecated starting from version `from` and will be removed by version `out`

For example:

```
/** deprecated: 1.0..2.0, section: DOM, alias of: Element#descendantOf, chainable
 *  Element#childOf(@element, className) -> Element
 *
 *  ...
 **/
```

**For Markdown Files**: Tags come in a parenthesis list _after_ all the signature and return type descriptions. For example:

```
### Element#childOf(@element, className) -> Element
- element (DOMElement): blah blah
- className (String): blather blather
(deprecated: 1.0..2.0, section: DOM, alias of: Element#descendantOf, chainable)
...

## Extended Backus–Naur Form ([EBNF](http://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form))

**For Source Files**: The lines _directly following_ tags are reserved for the EBNF description of the documented object. Typically, there's only one EBNF per documented object:

```
/** 
 *  Element#down(@element[, cssSelector][, index]) -> Element | null
 *
 *  ...
 **/
```

However, methods, functions, e.t.c. may have several signatures, and may require more than one description line, in which case description lines directly follow each other:

```
/** 
 *  Element#writeAttribute(@element, attribute[, value = true]) -> Element
 *  Element#writeAttribute(@element, attributes) -> Element
 *
 *  ...
 **/
```

**For Markdown Files**: All EBNF descriptions are preceeded by the `#` notation for H3:

```
### Element#down(@element[, cssSelector][, index]) -> Element | null
```

For multiple signatures, continue to add H3 headers:

```
### Element#writeAttribute(@element, attribute[, value = true]) -> Element
### Element#writeAttribute(@element, attributes) -> Element
```

In these descriptions, `->` is being used to signify a "return." You can override this to be `, ` by setting the parse options with `-p`.

### Arguments

**For Source and Markdown Files**: For all methods, functions, e.t.c., parentheses around the arguments are required even if no arguments are present. The syntax for arguments is as follows:

#### Required Arguments

    Event.stop(event) -> Event
     
#### Optional Arguments

Optional arguments are surrounded by squared brackets (`[]`).

    String#evalJSON([sanitize]) -> Object | Array

#### Default Values

A default value may be indicated using the equal sign (`=`).
     
    String#evalJSON([sanitize = false]) -> Object | Array

   
Arguments can be described below the EBNF description using the following syntax:
    
    - argumentName (acceptedType | additionalAcceptedType | ...): description.

Two things are default here:

* A `-` is required when listing each argument's description. With `-p`, you can specify this as being `*`.
* The description is defined as existing within a `( ):` notation. **For Markdown Files**, you can specify this as being `{ }`.
    
### Supported EBNF Types

**BIG FAT WARNING**: EBNF descriptions **must be separated by an empty comment line** from the rest of description:

    String#evalJSON([sanitize = false]) -> Object | Array

    Here goes markdown for String#evalJSON description.
     

    Event.findElement(event[, cssSelector]) -> Element | null
    - event (Event): a native Event instance
    - cssSelector (String): a optional CSS selector which uses
    the same syntax found in regular CSS.
    
    Regular method markdown goes here.

Descriptions are parsed as GitHub Flavored Markdown.
     
## Namespace

    /** 
     *  Ajax
     *
     *  ...
     **/
     
    /** 
     *  Prototype.Browser
     *
     *  ...
     **/
     
## Classes

Classes require a `class` prefix:

    /** 
     *  class Ajax.Base
     *
     *  ...
     **/

Sub-classes can indicate their parent just like in the Ruby syntax:

    /** 
     *  class Ajax.Request < Ajax.Base
     *
     *  ...
     **/

Where `Ajax.Base` is the parent class and `Ajax.Request` the subclass.

Included mixins are indicated like so:

    /** 
     *  class CustomHash
     *  includes Enumerable, Comparable
     *
     *  ...
     **/

## Mixins

Mixins are indicated by a `mixin` prefix:

    /** 
     *  mixin Enumerable
     *
     *  ...
     **/

## Constructors

Constructors require the `new` prefix and their arguments.

    /** 
     *  new Element(tagName[, attributes])
     *
     *  ...
     **/
          
    /** 
     *  new Foobar()
     *
     *  ...
     **/
     
## Class Methods

Class methods are identified by a dot (`.`).

    /** 
     *  Array.from([iterable]) -> Array
     *
     *  ...
     **/

## Instance Methods

Instance methods are identified by the hash symbol (`#`).

    /** 
     *  Array#first() -> Array element
     *
     *  ...
     **/
     
## Utilities

Utilities are global functions starting with a dollar-sign (`$`).

    /** 
     *  $w(string) -> Array
     *
     *  ...
     **/
     
## Methodized Methods

Methodized methods are methods which are both available as a class method and an instance method, in which case the first argument becomes the instance object itself. For example, all of `Element`'s instance methods are methodized and thus also available as class methods of `Element`. Methodized methods are indicated by prefixing their first argument with the `@` symbol.

    /** 
     *  Element#hide(@element) -> Element
     *
     *  ...
     **/
     
## Class Properties

Class properties are identified by a dot (`.`).

    /** 
     *  Ajax.Responders.responders -> Array
     *
     *  ...
     **/
     
## Instance Properties

Instance properties are identified by the hash symbol (`#`).

    /** 
     *  Ajax.Response#responseText -> String
     *
     *  ...
     **/
     
## Constants

Constant must have their value specified using the equal sign (`=`).

    /** 
     *  Prototype.JSONFilter = /^\/\*-secure-([\s\S]*)\*\/\s*$/
     *
     *  ...
     **/
     
## Events

Events are identified by `@`:

    /** 
     *  Features@head(request, socket, head)
     *
     *  ...
     **/

## Additional Sugar

### Sections

Sections are grouped parts of documentation. They don't add to element hierarchy, but just help to organize documentation.

    /** 
     *  == Section Name ==
     *
     *  Describe this section here.
     **/

### Short links

Short links help to quickly refer some element. Supported are two flavors:

  * `[[Method.Name]]`: Renders to `<a href=HREF>Method.Name</a>`
  * `[[Method.Name TEXT]]`: Renders to `<a href=HREF>TEXT</a>`
