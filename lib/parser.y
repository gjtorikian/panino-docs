%lex

esc     "\\"
int     "-"?(?:[0-9]|[1-9][0-9]+)
exp     (?:[eE][-+]?[0-9]+)
frac    (?:\.[\.0-9]+)
name    (?:[$_a-zA-Z][$_a-zA-Z0-9]*)
string  (?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)
json    (?:\{["':$_a-zA-Z0-9 \,]*\})
notdef  (?!"class"|"mixin"|"new"|"=="|[$_a-zA-Z][$_a-zA-Z0-9.#]*\s*(?:$|[(=]|"->"|", "))
%x INITIAL tags def arg comment

%%

<*><<EOF>>                  return 'EOF'

<INITIAL>\s+                /* skip whitespaces */
<INITIAL>"/**"/([^/])       this.begin('tags'); return '/**'
<INITIAL>.*                 /* skip vanilla code */

<tags>"**/"                 this.popState(); return '**/'
<tags>\s*[\n]               this.popState(); this.begin('def')
<tags>", "                  return ',' /* list separator */
<tags>": "                  return ':' /* key/value delimiter */
<tags>".."                  return '..' /* range */
<tags>"#"                   return '#'
<tags>"."                   return '.'
<tags>\s+                   /* skip whitespaces */
<tags>{int}{frac}?{exp}?\b  return 'NUMBER'
<tags>"deprecated"          return 'DEPRECATED'
<tags>"read-only"           return 'READONLY'
<tags>"internal"            return 'INTERNAL'
<tags>"hide"                return 'HIDE'
<tags>"chainable"           return 'CHAINABLE'
<tags>"section"             return 'SECTION'
<tags>"alias of"            return 'ALIASOF'
<tags>"alias"               /* N.B. shouldn't it be ALIAS, and reversed sense */ return 'ALIASOF'
<tags>"related to"          return 'RELATEDTO'
<tags>"belongs to"          return 'BELONGSTO'
<tags>"extension"           return 'EXTENSION'
<tags>"metadata"            return 'METADATA'
<tags>{name}                return 'NAME'
<tags>{string}              return 'STRING'
<tags>{json}                return 'JSON'

<def>"**/"                  this.popState(); return '**/'
<def>"*"\s*?[\n][\s\S]*?/"**/" return 'TEXT'
<def>\s+                    /* skip whitespaces */
<def>")"\s*":"              this.begin('arg'); return '):'
<def>"}"\s+                 this.begin('arg'); return '}'
<def>"*"\s*"*"              return '**'
<def>"*"\s*"-"              return '*-'
<def>"*"\s*"+"              return '*+'
<def>"*"\s*"fires"          return 'FIRES'
<def>"*"\s*"includes"       return 'INCLUDES'
<def>"*"                    /*return '*'*/
<def>\"(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])*\"  yytext = yytext.substr(1,yyleng-2); return 'STRING'
<def>\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^'{esc}])*\'  yytext = yytext.substr(1,yyleng-2); return 'STRING'
<def>{int}{frac}?{exp}?\b   return 'NUMBER'
<def>\/(?:[^\/]|"\\/")*\/[gim]* return 'REGEXP'
<def>"true"                 return 'BOOLEAN'
<def>"false"                return 'BOOLEAN'
<def>"#"                    return '#'
<def>"@"                    return '@'
<def>"?"                    return '?'
<def>"..."                  return '...'
<def>"."                    return '.'
<def>","                    return ','
<def>"->"                   return '->'
<def>"=="                   return '=='
<def>"="                    return '='
<def>"<"                    return '<'
<def>":"                    return ':'
<def>"("                    return '('
<def>")"                    return ')'
<def>"{"                    return '{'
<def>"}"                    return '}'
<def>"["                    return '['
<def>"]"                    return ']'
<def>"|"                    return '|'
<def>"`"                    return '`'
<def>"class"                return 'CLASS'
<def>"mixin"                return 'MIXIN'
<def>"new"                  return 'NEW'
<def>{name}                 return 'NAME'
<def>{string}               return 'STRING'

<arg>[\s\S]*?/("*"\s*[\-\+\n]) this.popState(); return 'TEXT'

<comment>[\s\S]*?/"**/"     this.popState(); console.log('LEFTCOMM'); return 'TEXT'

/lex

%start file

%%


file

  : world EOF { return $$ }
  ;


world

  : /* empty */ { $$ = {} }

  | world '/**' tags panino_and_includes_and_fires comment '**/' %{
    var x = $4;
    for (var i in $3) x[i] = $3[i];
    // amend description
    var desq = $5.text;
    // strip leading *
    desq = desq.replace(/\s*\n\s*\*/g, '\n').replace(/^\*\n*/, ''); 

    // trim leading spaces from description (might be buggy with namp, consider removing)
    var lead = desq.match(/^\s+/);
    if (lead) {
      var re = new RegExp('\n' + lead[0], 'g');
      desq = desq.substring(lead[0].length).replace(re, '\n');
    }
    x.description = desq.trim();

	var stabilityList = ["0 - Deprecated", "1 - Experimental", "2 - Unstable", "3 - Stable", 
						 "4 - API Frozen", "5 - Locked" ];
	var stabilityPrefix = "> Stability: ";
	if (x.description.indexOf(stabilityPrefix) == 0) {
		x.description = x.description.substr(stabilityPrefix.length);
		var firstLine = x.description.replace(/\n\n[\s\S]*$/, '\n');
		var stability = stabilityList.filter(function(s) {
			if (s == firstLine.trim())
				return true;
			return false;
		});
		if (stability.length <= 0) {
			console.error("In " + x.id + " you tried to provide a stability of " + firstLine + 
					      ", but I didn't recognize it!");
			process.exit(1);
		}
		else {
			x.stability = stability[0];
			x.description = x.description.substr(firstLine.length);
		}
	}

    // short description lasts until the first empty line
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    
    x.ellipsis_description = x.short_description;
    if (x.ellipsis_description.length > 120)
    {
      x.ellipsis_description = x.ellipsis_description.substring(0, 120 - 4) + "..."
    }
    else
      x.ellipsis_description = x.ellipsis_description + " ..."

    x.line = ($5.line + 1);
    // register
    if ($$[x.id]) {
      console.error('FATAL: name clash: ' + x.id);
      process.exit(1);
    }
    $$[x.id] = x;
  }%

  ;


tags

  : /* empty */ { $$ = {} }
  | tag_list
  ;


tag_list

  : tag { $$ = {}; for (var i in $1) $$[i] = $1[i] }
  | tag_list ',' tag { for (var i in $3) $$[i] = $3[i] }
  ;


tag

  : DEPRECATED { $$ = {deprecated: true} }
  | DEPRECATED ':' NUMBER { $$ = {deprecated: {from: $3}} }
  | DEPRECATED ':' NUMBER '..' NUMBER { $$ = {deprecated: {from: $3, off: $5}} }
  | READONLY { $$ = {readonly: true} }
  | INTERNAL { $$ = {internal: true} }
  | HIDE     { $$ = {hide: true} }
  | CHAINABLE { $$ = {chainable: true} }
  | SECTION ':' name { $$ = {section: $3} }
  | ALIASOF ':' name { $$ = {alias_of: $3} }
  | RELATEDTO ':' name { $$ = {related_to: $3} }
  | BELONGSTO ':' name { $$ = {belongs_to: $3} }
  | EXTENSION { $$ = {extension: true} }
  | METADATA ':' JSON { $$ = {metadata: JSON.parse($3)} }
  ;

stability_list
  : '0 - Deprecated'
  | '1 - Experimental'
  | '2 - Unstable'
  | '3 - Stable'
  | '4 - API Frozen'
  | '5 - Locked'
  ;

panino_and_includes_and_fires

  : panino
  | panino INCLUDES names { $$.included_mixins = $3 }
  /*| panino FIRES events { $$.events = $3 }*/
  ;


comment
  : /* empty */ { $$ = {text: '', line: yy.lexer.yylloc.last_line} }
  | TEXT { $$ = {text: $1, line: yy.lexer.yylloc.last_line} }
  ;


panino

  : section
  | namespace
  | class
  | mixin
  | '>' stability_list { $$ = {stability: $2} }
  | signatures
  | signatures argument_descriptions %{ 
    if ($1.signatures) {
      $1.signatures.forEach(function (signature) {
        if (signature.args) {
          var types = $2.types;
          var c = -1;
          var cArgPos = 0;
          for (var a = 0; a < $2.length; a++) {
            if (signature.args[a])
              signature.args[a].types = $2[a].types;
            else { // we're looking at args for a callback
              if (c < 0)
                c = a == 0 ? a : a - 1;

                signature.callback.args[cArgPos].type = $2[a].types;
                signature.callback.args[cArgPos].optional = $2[a].optional;
                signature.callback.args[cArgPos].ellipsis = $2[a].ellipsis;
            }
          }
        }
      });
    }
    $$.arguments = $2;
  }%
  | signatures return_descriptions { $$.retDesc = $2 }
  | signatures argument_descriptions return_descriptions %{ 
    if ($1.signatures) {
      $1.signatures.forEach(function (signature) {
        if (signature.args) {
          var types = $2.types;
          var c = -1;
          var cArgPos = 0;
          for (var a = 0; a < $2.length; a++) {
            if (signature.args[a])
              signature.args[a].types = $2[a].types;
            else { // we're looking at args for a callback
              if (c < 0)
                c = a == 0 ? a : a - 1;

                signature.callback.args[cArgPos].type = $2[a].types;
                signature.callback.args[cArgPos].optional = $2[a].optional;
                signature.callback.args[cArgPos].ellipsis = $2[a].ellipsis;
            }
          }
        }
      });
    }
    $$.arguments = $2;
	  $$.retDesc = $3;
  }% 
  ;


argument_descriptions

  : argument_description { $$ = [$1] }
  | argument_descriptions argument_description { $$.push($2) }
  ;


argument_description

  : '*-' NAME popen names_alternation pclose TEXT %{
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $2);
         process.exit(1);
       }
      $$ = {
        name: $2,
        types: $4,
        description: $6.replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    }%
  | '**' NAME '{' names_alternation '}' TEXT %{
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $2);
         process.exit(1);
       }
      $$ = {
        name: $2,
        types: $4,
        description: $6.replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    }%
  ;

return_descriptions

  : return_description { $$ = [$1] }
  | return_descriptions return_description { $$.push($2) }
  ;

return_description

  :  '*+' popen names_alternation pclose TEXT %{
       $$ = {
          types: $3,
          isArray: $3.isArray,
          description: $5.replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
        };
     }%
  ;

popen
  : '(' %{
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $0 + "'");
          process.exit(1);
       }
     }%
  | '{' %{
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $0 + "'");
          process.exit(1);
       }
     }%
  ;

pclose
  : '):' %{
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $0 + "'");
          process.exit(1);
       }
     }%
  | '}' %{
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $0 + "'");
          process.exit(1);
       }
     }%
  ;

events

  : event { $$ = [$1] }
  | events ',' event { $$ = $1; $$.push($3) }
  ;


event

  : NAME
  | event ':' NAME { $$ += $2 + $3 }
  ;


name

  : NAME
  | name '.' NAME { $$ += $2 + $3 }
  | name '#' NAME { $$ += $2 + $3 }
  | name '@' NAME { $$ += $2 + $3 }
  ;


names

  : name { $$ = [$1] }
  | names ',' name { $$ = $1; $$.push($3) }
  ;


names_alternation

  : '?' { $$ = [] }
  | name { $$ = [$1] }
  | '`' name '`' { $$ = [$2] }
  | '[' name ']' { $$ = [$2]; $$.isArray = true }
  | names_alternation '|' name { $$.push($3) }
  ;


value

  : STRING { $$ = String($1) }
  | NUMBER { $$ = Number($1) }
  | BOOLEAN { $$ = $1 === 'true' ? true : false }
  | REGEXP { $$ = new RegExp($1) }
  | name
  | '[' value_list ']' { $$ = $2; $$.array = true }
  | '[' value_list '...' ']' { $$ = $2; $$.array = true; $$.ellipsis = true }
  | '{' key_value_list '}' { $$ = $2 }
  ;


value2

  : STRING { $$ = {value: String($1), type: 'string'} }
  | NUMBER { $$ = {value: Number($1), type: 'number'} }
  | TRUE { $$ = {value: true, type: 'boolean'} }
  | FALSE { $$ = {value: false, type: 'boolean'} }
  | NULL { $$ = {value: null, type: 'null'} }
  | REGEXP { $$ = {value: $1, type: 'regexp'} }
  | name { $$ = {value: $1, type: 'name'} }
  | '[' value_list ']' { $$ = $2; $$.array = true }
  | '[' value_list '...' ']' { $$ = $2; $$.array = true; $$.ellipsis = true }
  | '{' key_value_list '}' { $$ = $2 }
  ;


value_list

  : /* empty */ { $$ = [] }
  | value { $$ = [$1] }
  | value_list ',' value { $$.push($3) }
  ;


key_value_list

  : /* empty */ { $$ = {} }
  | key ':' value { $$ = {}; $$[$1] = $3 }
  | key_value_list ',' key ':' value { $$[$3] = $5 }
  ;

key
  : STRING
  | NAME
  ;

name_or_value

  : value
  ;


section

  : '==' string '==' { $$ = {id: $2, type: 'section'}; }
  | '==' NAME '==' { $$ = {id: $2, type: 'section'}; }
  ;

namespace

  : name { $$ = {id: $1, type: 'namespace'}; }
  ;


class

  /* vanilla */
  : CLASS name { $$ = {id: $2, type: 'class'}; }

  /* inherited from another class */
  | CLASS name '<' name { $$ = {id: $2, type: 'class', superclass: $4}; }
  ;


mixin

  : MIXIN name { $$ = {id: $2, type: 'mixin'} }
  ;


property

  : name '->' returns %{ 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $1.id);
        process.exit(1);
      }
      $$ = {id: $1, type: 'property', returns: $3} 
    }%
  | name ',' returns %{ 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $1.id);
        process.exit(1);
      }
      $$ = {id: $1, type: 'property', returns: $3} 
    }%
  ;


constant

  : name '=' returns { $$ = {id: $1, type: 'constant', returns: $3} }
  ;


signatures
  : signature %{
    $$ = $1;
    if ($1.args) {
      for (var a = 0; a < $1.args.length; a++) {
        if ($1.args[a].callback) {
          $1.callback = $1.args[a];
          break;
        }
      }
    }
    $$.signatures = [{args: $1.args, callback: $1.callback, returns: $1.returns}];
    delete $$.args;
    delete $$.callback;
    delete $$.returns;
  }%
  | signatures signature %{
    if ($1.args) {
      for (var a = 0; a < $1.args.length; a++) {
        if ($1.args[a].callback) {
          $1.callback = $1.args[a];
          break;
        }
      }
    }
    $$.signatures = [{args: $1.args, callback: $1.callback, returns: $1.returns}];
    delete $$.args;
    delete $$.callback;
    delete $$.returns;
  }%
  ;

signature

  /* void method */
  : method

  /* method returning value */
  | method ',' returns %{
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $1.id);
        process.exit(1);
      }
      $$.returns = $3 
    }%

  | method '->' returns %{
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $1.id);
        process.exit(1);
      }
      $$.returns = $3 
    }%

  /* property */
  | property

  /* constant */
  | constant

  /* constructor */
  | NEW method { $$ = $2; $$.id = $$.id + '.' + $1; $$.type = 'constructor' }
  ;


method

  /* vanilla */
  : name '(' args ')' { $$ = {id: $1, type: 'method', args: $3} }

  /* with bound `this` */
  | name '(' '@' args ')' { $$ = {id: $1, type: 'method', args: $4, bound: true} }
  ;


returns

  /* anything */
  : '?' { $$ = [{type: '?'}] }

  /* single */
  /* N.B. $1 can be either [NAME] with array and ellipsis attributes, or String NAME */
  | name_or_value %{
    var x = $1;
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    $$ = [ret];
  }%

  /* alternation */
  /* N.B. $3 can be either [NAME] with array and ellipsis attributes, or String NAME */
  | returns '|' name_or_value %{
    var x = $3;
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    $$.push(ret);
  }%
  ;


args

  : /* empty */ { $$ = [] }

  /* single argument */
  | arg { $$ = [$1] }

  /* comma-separated list of arguments */
  | args ',' arg { $$.push($3) }

  /* comma-separated list of optional arguments */
  | args ',' '[' args ']' %{
    $4.forEach(function(a) {
      a.optional = true;
      $args1.push(a);
    });
  }%

  /* comma-separated list of optional arguments */
  | args '[' args ']' %{
    $3.forEach(function(a) {
      a.optional = true;
      $args1.push(a);
    });
  }%
  ;


arg

  /* vanilla */
  : NAME { $$ = {name: $1} }

  /* callback */
  | NAME '(' args ')' { $$ = {name: $1, args: $3, callback: true}; }

  /* with default value */
  | arg '=' name_or_value { $$.default_value = $3 }

  /* with ellipsis */
  | arg '...' { $$.ellipsis = true }
  ;
