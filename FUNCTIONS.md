# Variables, Functions, and CSS to use for Jade Templates

* [Variables](#variables)
* [Functions](#functions)
* [CSS](#css)

<a name="variables" />

# Variables 

Here's a list of the variables you have access to in your Jade templates:

* `list`: This is a gigantic JSON object containing the definitions of all your classes, including members, subclasses, source file location, e.t.c. Use with discretion.
* `tree`: Very similar to `list`, except it represents the current object your template is iterating over. You have access to many, many properties, which are ironically undocumented at the moment. You can also print out a list of your AST by passing `-f ast` to your build.

You'll most likely always be working with this object by doing stuff like this:

    for obj in tree.children
        for child in obj.children.filter(function(x){return x.type === 'class method'}) // grab only members
            h3 Methods
                if child.description
                    mixin markdown(child.description) // convert description from Markdown to HTML

* `date`: The current date of the build
* `isIndex`: Checks if the current file is the index defined by the `-i` argument. Typically, you just want to include the content of this file into your template, because `tree` is empty and there's no member information to iterate over.
* `indexContent`: If the current file _is_ the index, this is its content.
* `title`: The title of your documentation, as defined by `-t`.
* `fileName`: The current file you're processing
* `options`: A JSON containing all the build options you passed into Panino

<a name="functions" />

# Functions

Here's a list of the functions you have access to:

* `markdown`: A function that converts Markdown into HTML (including conrefs). It takes two parameters:
    * `text`: The Markdown content to convert (required)
    * `inline`: A Boolean value which, if true, strips the surrounding `<p>` tages of the converted HTML. (optional)

* `signature`: A function that generates a member signature, including [linkifying everything](../README.md#linking). It takes three arguments:
    * `obj`: The parent object (required)
    * `sig`: The signature itself (required)
    * `classes`: An optional array of class names to surround the signature with (optional)

You'd use this function by doing something like this:

    for sig in obj.signatures // if the object even has signatures
        li.signature
            ul
              li.signature-call!= signature(obj, sig, ["methodClicker"]) // pass in each signature

* `link`: Renders any ID given to it as a link; throws an error if the ID does not exist. This method takes three arguments:
    * `text`: The ID to linkify. This can be anything, like the name of a class(`Bicycle`), to a member in the class (`Bicycle.pedal`) (required)
    * `classes`: An optional array of class names to surround the link with (optional)
    * `short`: A Boolean which, if specified, indicates that the link is coming from a `[[ ]]` notation. You should not set this yourself. (optional)

You'd use this function by doing something like this:

    if obj.alias_of // if this object has aliases
        li
            span.label.alias.single
                | Aliased as: 
                != link(obj.alias_of) // turn each alias into a link

* `argumentTable`: Generates a table of your member's arguments. You can place this anywhere you want in your description. This function takes four arguments:
    * `args`: The signature's arguments (required)
    * `tableClasses`: An optional array of class names to surround the table with (optional)
    * `trClasses`: An optional array of class names to surround the `<tr>`s with (optional)
    * `tdClasses`: An optional array of class names to surround the `<td>`s with (optional)

You'd use this function by doing something like this:

    if obj.arguments
        h4 Arguments
          != argumentTable(obj.arguments, ["argument-list", "zebra-striped", "bordered-table"])

* `returnLink`: Turns the return value of a member into a link. This method takes three arguments:
    * `obj`: The parent object (required)
    * `ret`: The return value itself (required)
    * `classes`: An optional array of class names to surround the link with (optional)

Building on the `signature()` example above, you'd use this function by doing something like this:

    for sig in obj.signatures // if the object even has signatures
        li.signature
            ul
              li.signature-call!= signature(obj, sig, ["methodClicker"]) // pass in each signature
                if sig.returns // if there's a return type
                  li.signature-returns
                    ul.argument-types
                      for ret in sig.returns
                        li.argument-type!= returnLink(obj, ret, []) // list out each return type

* `returnTable`: Generates a table of your member's return values. You can place this anywhere you want in your description. This function takes four arguments:
    * `returnVals`: The signature's return values (required)
    * `tableClasses`: An optional array of class names to surround the table with (optional)
    * `trClasses`: An optional array of class names to surround the `<tr>`s with (optional)
    * `tdClasses`: An optional array of class names to surround the `<td>`s with (optional)

You'd use this function by doing something like this:

    if obj.retDesc
        h4 Returns
            != returnTable(obj.retDesc, ["return-list", "zebra-striped", "bordered-table"]) 

<a name="css" />

# CSS

Some of the functions above render HTML with their own CSS. Here's a list of those class names, so that you can manipulate (or hide) the content any way you like:

#### From `link()`

* `link-short`: Applied to links that came from `[[ ]]` conversions

#### From `signature()`

* `constructorIdentifier`: Applied to the `new` tag in the method signature for constructors
* `member-name`: Applied to the entire member signature, for all types
* `sigClassName`: Applied to the class name of the signature, _e.g._ `Bicycle.` in `Bicycle.pedal()`. Note the intentional inclusion of the `.`
* `sigMemberName`: Applied to the member name in the signature, _e.g._ `pedal` in `Bicycle.pedal()`
* `eventObjName`: Applied to the event's name in a signature
* `eventListenerStart`: Applied to the start of an event's signature
* `eventMember`: Applied to _just_ the event name
* `sigArgList`: Applied to the argument list in a signature, _e.g._ `velocity, isPedaling` in `Bicycle.ride(velocity, isPedaling)`
* `eventListenerClose`: Applied to the closing of an event
* `eventFunctionOpen`: Applied to the starting callback of an event
* `argument`: Applied to every argument in a signature, _e.g._ `velocity` and `isPedaling` in `Bicycle.ride(velocity, isPedaling)`
* `eventFunctionClose`: Applied to the closing callback of an event

#### From `argumentTable()`

* `argumentTable`: Applied to the entire table
* `argumentRow`: Applied to every `<tr>`
* `argName`: Applied to the argument name
* `argType`: Applied to the argument type
* `argDescription`: Applied to the argument description

#### From `returnLink()`

* `returnType`: Applied to the return type

#### From `returnLink()`

* `returnTable`: Applied to the entire table
* `returnType`: Applied to the return type
* `returnDescription`: Applied to the return description