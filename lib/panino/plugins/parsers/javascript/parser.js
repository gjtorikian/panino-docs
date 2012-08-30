/* Jison generated parser */
var jsParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"0":31,"1":34,"2":36,"3":38,"4":40,"5":43,"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"VERSION":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"METADATA":28,"JSON":29,"stability_list":30,"-":32,"Deprecated":33,"Experimental":35,"Unstable":37,"Stable":39,"API":41,"Frozen":42,"Locked":44,"panino":45,"INCLUDES":46,"names":47,"TEXT":48,"section":49,"namespace":50,"class":51,"mixin":52,">":53,"signatures":54,"argument_descriptions":55,"return_descriptions":56,"argument_description":57,"*-":58,"NAME":59,"popen":60,"names_alternation":61,"pclose":62,"**":63,"{":64,"}":65,"return_description":66,"*+":67,"(":68,"):":69,"events":70,"event":71,".":72,"@":73,"EVENTEND":74,"name_or_namespace":75,"#":76,"?":77,"`":78,"[":79,"]":80,"|":81,"value":82,"STRING":83,"NUMBER":84,"BOOLEAN":85,"REGEXP":86,"value_list":87,"...":88,"key_value_list":89,"value2":90,"TRUE":91,"FALSE":92,"NULL":93,"key":94,"name_or_value":95,"==":96,"string":97,"CLASS":98,"<":99,"MIXIN":100,"property":101,"->":102,"returns":103,"constant":104,"=":105,"signature":106,"method":107,"NEW":108,"arguments":109,")":110,"arg":111,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"VERSION",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",28:"METADATA",29:"JSON",31:"0",32:"-",33:"Deprecated",34:"1",35:"Experimental",36:"2",37:"Unstable",38:"3",39:"Stable",40:"4",41:"API",42:"Frozen",43:"5",44:"Locked",46:"INCLUDES",48:"TEXT",53:">",58:"*-",59:"NAME",63:"**",64:"{",65:"}",67:"*+",68:"(",69:"):",72:".",73:"@",74:"EVENTEND",76:"#",77:"?",78:"`",79:"[",80:"]",81:"|",83:"STRING",84:"NUMBER",85:"BOOLEAN",86:"REGEXP",88:"...",91:"TRUE",92:"FALSE",93:"NULL",96:"==",97:"string",98:"CLASS",99:"<",100:"MIXIN",102:"->",105:"=",108:"NEW",110:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[12,3],[30,3],[30,3],[30,3],[30,3],[30,4],[30,3],[8,1],[8,3],[9,0],[9,1],[45,1],[45,1],[45,1],[45,1],[45,2],[45,1],[45,2],[45,2],[45,3],[55,1],[55,2],[57,6],[57,6],[56,1],[56,2],[66,5],[60,1],[60,1],[62,1],[62,1],[70,1],[70,3],[71,1],[71,3],[71,3],[71,3],[71,2],[75,1],[75,3],[23,1],[23,3],[23,3],[47,1],[47,3],[61,1],[61,1],[61,3],[61,3],[61,3],[82,1],[82,1],[82,1],[82,1],[82,1],[82,3],[82,4],[82,3],[90,1],[90,1],[90,1],[90,1],[90,1],[90,1],[90,1],[90,3],[90,4],[90,3],[87,0],[87,1],[87,3],[89,0],[89,3],[89,5],[94,1],[94,1],[95,1],[49,3],[49,3],[50,1],[51,2],[51,4],[52,2],[101,3],[101,3],[104,3],[54,1],[54,2],[106,1],[106,3],[106,3],[106,1],[106,1],[106,2],[107,4],[107,5],[103,1],[103,1],[103,3],[109,0],[109,1],[109,3],[109,5],[109,4],[111,1],[111,4],[111,3],[111,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return this.$ 
break;
case 2: this.$ = {} 
break;
case 3:
    var x = $$[$0-2];
    for (var i in $$[$0-3]) x[i] = $$[$0-3][i];
    // amend description
    var desq = $$[$0-1].text;
    // strip leading *
    desq = desq.replace(/\s*\n\s*\*/g, '\n').replace(/^\*\n*/, ''); 
    // trim leading spaces from description
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

    x.line = ($$[$0-1].line + 1);
    // register
    if (this.$[x.id]) {
      throw new Error('FATAL: name clash: ' + x.id);
    }
    this.$[x.id] = x;
  
break;
case 4: this.$ = {} 
break;
case 6: this.$ = {}; for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 7: for (var i in $$[$0]) this.$[i] = $$[$0][i] 
break;
case 8: this.$ = {deprecated: true} 
break;
case 9: this.$ = {deprecated: {since: $$[$0]}} 
break;
case 10: this.$ = {deprecated: {since: $$[$0-2], off: $$[$0]}} 
break;
case 11: this.$ = {readonly: true} 
break;
case 12: this.$ = {internal: true} 
break;
case 13: this.$ = {hide: true} 
break;
case 14: this.$ = {chainable: true} 
break;
case 15: this.$ = {section: $$[$0]} 
break;
case 16: this.$ = {alias_of: $$[$0]} 
break;
case 17: this.$ = {related_to: $$[$0]} 
break;
case 18: this.$ = {belongs_to: $$[$0]} 
break;
case 19: this.$ = {extension: true} 
break;
case 20: this.$ = {metadata: JSON.parse($$[$0])} 
break;
case 28: this.$.included_mixins = $$[$0] 
break;
case 29: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 30: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 35: this.$ = {stability: $$[$0]} 
break;
case 37: 
    if ($$[$0-1].signatures) {
      $$[$0-1].signatures.forEach(function (signature) {
        if (signature && signature.arguments) {
          var types = $$[$0].types;
          var cArgPos = 0;
          var cbPos = -1;
          for (var a = 0; a < $$[$0].length; a++) {
            if (signature.arguments[a]) {
              var argName = signature.arguments[a].name;
              for (var r = 0; r < $$[$0].length; r++) {
                if ($$[$0][r].name == argName)
                  break;
              }

              if (r == $$[$0].length) {
                console.error("ERROR: Couldn't find argument ", argName, " in\n ", $$[$0], "\n--did you misspell something?");
                process.exit(1);
              }

              signature.arguments[a].types = $$[$0][r].types;
              signature.arguments[a].description = $$[$0][r].description;
            }
            else { // we're looking at arguments for a callback
              cbPos = cbPos === -1 ? a - 1 : 0;

              // in case of multiple sigs, where one sig has no arguments
              // e.g. stream.WritableStream.end
              if (signature.arguments.length === 0) {
                continue;
              }

              if (signature.arguments[cbPos].callback) {
                  for (var c = cbPos + 1; c < $$[$0].length; c++) {

                    if (signature.arguments[cbPos].arguments[cArgPos] === undefined) // cb has no arguments, get out.
                      continue;

                    var cbArgName = signature.arguments[cbPos].arguments[cArgPos].name;
                    for (var r = 0; r < $$[$0].length; r++) {
                      if ($$[$0][r].name == cbArgName)
                        break;
                    }

                    if (r == $$[$0].length) {
                      console.error("ERROR: Couldn't find argument ", cbArgName, " in\n ", $$[$0], "\n--did you misspell something?");
                      process.exit(1);
                    }

                    signature.arguments[cbPos].arguments[cArgPos].description = $$[$0][r].description;
                    signature.arguments[cbPos].arguments[cArgPos].types = $$[$0][r].types;
                    signature.arguments[cbPos].arguments[cArgPos].optional = $$[$0][r].optional;
                    signature.arguments[cbPos].arguments[cArgPos].ellipsis = $$[$0][r].ellipsis;
                    cArgPos++;
                  }
                  break; // get out of outer for loop
              }
            }
          }
        }
      });
    }
    this.$.arguments = $$[$0];
  
break;
case 38: this.$.returns = $$[$0] 
break;
case 39: 
    if ($$[$0-2].signatures) {
      $$[$0-2].signatures.forEach(function (signature) {
        if (signature && signature.arguments) {
          var types = $$[$0-1].types;
          var c = -1;
          var cArgPos = 0;
          for (var a = 0; a < $$[$0-1].length; a++) {
            if (signature.arguments[a]) {
              signature.arguments[a].types = $$[$0-1][a].types;
              signature.arguments[a].description = $$[$0-1][a].description;
            }
            else { // we're looking at arguments for a callback
              if (signature.callback) {
                  signature.callback.arguments[cArgPos].types = $$[$0-1][a].types;
                  signature.callback.arguments[cArgPos].optional = $$[$0-1][a].optional;
                  signature.callback.arguments[cArgPos].ellipsis = $$[$0-1][a].ellipsis;
                  signature.callback.arguments[cArgPos].description = $$[$0-1][a].description;
                  cArgPos++;
              }
              else {
                  console.error("Error: No callback found here. Your argument list might be incorrect.");
                  console.error(signature);
                  console.error($$[$0-2]);
                  process.exit(1);
              } 
            }
          }
        }
        if (signature && signature.returns) {
          signature.returns = $$[$0];
        }
      });
    }
    this.$.arguments = $$[$0-1];
    this.$.returns = $$[$0];
  
break;
case 40: this.$ = [$$[$0]] 
break;
case 41: this.$.push($$[$0]) 
break;
case 42:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-4]);
         process.exit(1);
       }

      $$[$0] = $$[$0].split("\n").map(function(element, idx) {
        return element.replace(/^\s+/g, '');
      });

      console.log($$[$0])
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].join("\n\n")
      };

      console.log(this.$.description)
    
break;
case 43:
      if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-4]);
         process.exit(1);
      }

      $$[$0] = $$[$0].split("\n").map(function(element, idx) {
        return element.replace(/^\s+/g, '');
      });
      
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].join("\n\n")
      };
    
break;
case 44: this.$ = [$$[$0]] 
break;
case 45: this.$.push($$[$0]) 
break;
case 46:
       this.$ = {
          type: $$[$0-2][0],
          isArray: $$[$0-2].isArray,
          description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
        };
     
break;
case 47:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 48:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 49:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 50:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 51: this.$ = [$$[$0]] 
break;
case 52: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 54: this.$ += $$[$0-1] + $$[$0] 
break;
case 55: this.$ += $$[$0-1] + $$[$0] 
break;
case 56: this.$ += $$[$0-1] + $$[$0] 
break;
case 57: this.$ += $$[$0] 
break;
case 59: this.$ += $$[$0-1] + $$[$0] 
break;
case 61: this.$ += $$[$0-1] + $$[$0] 
break;
case 62: this.$ += $$[$0-1] + $$[$0] 
break;
case 63: this.$ = [$$[$0]] 
break;
case 64: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 65: this.$ = [] 
break;
case 66: this.$ = [$$[$0]] 
break;
case 67: this.$ = [$$[$0-1]] 
break;
case 68: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 69: this.$.push($$[$0]) 
break;
case 70: this.$ = String($$[$0]) 
break;
case 71: this.$ = Number($$[$0]) 
break;
case 72: this.$ = $$[$0] === 'true' ? true : false 
break;
case 73: this.$ = new RegExp($$[$0]) 
break;
case 75: this.$ = $$[$0-1]; this.$.array = true 
break;
case 76: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 77: this.$ = $$[$0-1] 
break;
case 78: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 79: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 80: this.$ = {value: true, type: 'boolean'} 
break;
case 81: this.$ = {value: false, type: 'boolean'} 
break;
case 82: this.$ = {value: null, type: 'null'} 
break;
case 83: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 84: this.$ = {value: $$[$0], type: 'name'} 
break;
case 85: this.$ = $$[$0-1]; this.$.array = true 
break;
case 86: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 87: this.$ = $$[$0-1] 
break;
case 88: this.$ = [] 
break;
case 89: this.$ = [$$[$0]] 
break;
case 90: this.$.push($$[$0]) 
break;
case 91: this.$ = {} 
break;
case 92: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 93: this.$[$$[$0-2]] = $$[$0] 
break;
case 97: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 98: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 99: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 100: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 101: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 102: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 103: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 104: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 105: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 106:
    this.$ = $$[$0];
    this.$.signatures = [{arguments: $$[$0].arguments, returns: $$[$0].returns}];
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 107:
    this.$.signatures.push({arguments: $$[$0].arguments, returns: $$[$0].returns});
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 109:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 110:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 113: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 114: this.$ = {id: $$[$0-3], type: 'method', arguments: $$[$0-1]} 
break;
case 115: this.$ = {id: $$[$0-4], type: 'method', arguments: $$[$0-1], bound: true} 
break;
case 116: this.$ = [{type: '?'}] 
break;
case 117:
    var x = $$[$0];
    var ret = {
      type: String(x)
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 118:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 119: this.$ = [] 
break;
case 120: this.$ = [$$[$0]] 
break;
case 121: this.$.push($$[$0]) 
break;
case 122:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 123:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 124: this.$ = {name: $$[$0]} 
break;
case 125: this.$ = {name: $$[$0-3], arguments: $$[$0-1], callback: true}; 
break;
case 126: this.$.default_value = $$[$0] 
break;
case 127: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],53:[2,4],59:[2,4],96:[2,4],98:[2,4],100:[2,4],108:[2,4]},{8:19,23:28,45:20,49:21,50:22,51:23,52:24,53:[1,25],54:26,59:[1,37],75:32,96:[1,27],98:[1,29],100:[1,30],101:34,104:35,106:31,107:33,108:[1,36]},{13:[1,38],53:[2,5],59:[2,5],96:[2,5],98:[2,5],100:[2,5],108:[2,5]},{13:[2,6],53:[2,6],59:[2,6],96:[2,6],98:[2,6],100:[2,6],108:[2,6]},{13:[2,8],15:[1,39],53:[2,8],59:[2,8],96:[2,8],98:[2,8],100:[2,8],108:[2,8]},{13:[2,11],53:[2,11],59:[2,11],96:[2,11],98:[2,11],100:[2,11],108:[2,11]},{13:[2,12],53:[2,12],59:[2,12],96:[2,12],98:[2,12],100:[2,12],108:[2,12]},{13:[2,13],53:[2,13],59:[2,13],96:[2,13],98:[2,13],100:[2,13],108:[2,13]},{13:[2,14],53:[2,14],59:[2,14],96:[2,14],98:[2,14],100:[2,14],108:[2,14]},{15:[1,40]},{15:[1,41]},{15:[1,42]},{15:[1,43]},{13:[2,19],53:[2,19],59:[2,19],96:[2,19],98:[2,19],100:[2,19],108:[2,19]},{15:[1,44]},{9:45,10:[2,29],48:[1,46]},{10:[2,27],46:[1,47],48:[2,27]},{10:[2,31],46:[2,31],48:[2,31]},{10:[2,32],46:[2,32],48:[2,32]},{10:[2,33],46:[2,33],48:[2,33]},{10:[2,34],46:[2,34],48:[2,34]},{30:48,31:[1,49],34:[1,50],36:[1,51],38:[1,52],40:[1,53],43:[1,54]},{10:[2,36],23:63,46:[2,36],48:[2,36],55:55,56:56,57:58,58:[1,60],59:[1,37],63:[1,61],66:59,67:[1,62],75:32,101:34,104:35,106:57,107:33,108:[1,36]},{59:[1,65],97:[1,64]},{10:[2,99],13:[1,68],46:[2,99],48:[2,99],68:[1,66],102:[1,67],105:[1,69]},{23:70,59:[1,37],75:32},{23:71,59:[1,37],75:32},{10:[2,106],46:[2,106],48:[2,106],58:[2,106],59:[2,106],63:[2,106],67:[2,106],108:[2,106]},{10:[2,60],13:[2,60],46:[2,60],48:[2,60],53:[2,60],58:[2,60],59:[2,60],63:[2,60],65:[2,60],67:[2,60],68:[2,60],69:[2,60],72:[1,74],73:[1,73],76:[1,72],78:[2,60],79:[2,60],80:[2,60],81:[2,60],88:[2,60],96:[2,60],98:[2,60],99:[2,60],100:[2,60],102:[2,60],105:[2,60],108:[2,60],110:[2,60]},{10:[2,108],13:[1,75],46:[2,108],48:[2,108],58:[2,108],59:[2,108],63:[2,108],67:[2,108],102:[1,76],108:[2,108]},{10:[2,111],46:[2,111],48:[2,111],58:[2,111],59:[2,111],63:[2,111],67:[2,111],108:[2,111]},{10:[2,112],46:[2,112],48:[2,112],58:[2,112],59:[2,112],63:[2,112],67:[2,112],108:[2,112]},{23:78,59:[1,37],75:32,107:77},{10:[2,58],13:[2,58],46:[2,58],48:[2,58],53:[2,58],58:[2,58],59:[2,58],63:[2,58],65:[2,58],67:[2,58],68:[2,58],69:[2,58],72:[2,58],73:[2,58],76:[2,58],78:[2,58],79:[2,58],80:[2,58],81:[2,58],88:[2,58],96:[2,58],98:[2,58],99:[2,58],100:[2,58],102:[2,58],105:[2,58],108:[2,58],110:[2,58]},{12:79,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18]},{16:[1,80]},{23:81,59:[1,37],75:32},{23:82,59:[1,37],75:32},{23:83,59:[1,37],75:32},{23:84,59:[1,37],75:32},{29:[1,85]},{10:[1,86]},{10:[2,30]},{23:88,47:87,59:[1,37],75:32},{10:[2,35],46:[2,35],48:[2,35]},{32:[1,89]},{32:[1,90]},{32:[1,91]},{32:[1,92]},{32:[1,93]},{32:[1,94]},{10:[2,37],46:[2,37],48:[2,37],56:95,57:96,58:[1,60],63:[1,61],66:59,67:[1,62]},{10:[2,38],46:[2,38],48:[2,38],66:97,67:[1,62]},{10:[2,107],46:[2,107],48:[2,107],58:[2,107],59:[2,107],63:[2,107],67:[2,107],108:[2,107]},{10:[2,40],46:[2,40],48:[2,40],58:[2,40],63:[2,40],67:[2,40]},{10:[2,44],46:[2,44],48:[2,44],67:[2,44]},{59:[1,98]},{59:[1,99]},{60:100,64:[1,102],68:[1,101]},{13:[1,68],68:[1,66],102:[1,67],105:[1,69]},{96:[1,103]},{96:[1,104]},{13:[2,119],59:[1,108],73:[1,106],79:[2,119],109:105,110:[2,119],111:107},{23:117,59:[1,37],64:[1,119],75:32,77:[1,110],79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:111,103:109},{23:117,59:[1,37],64:[1,119],75:32,77:[1,110],79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:111,103:120},{23:117,59:[1,37],64:[1,119],75:32,77:[1,110],79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:111,103:121},{10:[2,100],46:[2,100],48:[2,100],99:[1,122]},{10:[2,102],46:[2,102],48:[2,102]},{59:[1,123]},{59:[1,125],71:124},{59:[1,126]},{23:117,59:[1,37],64:[1,119],75:32,77:[1,110],79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:111,103:127},{23:117,59:[1,37],64:[1,119],75:32,77:[1,110],79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:111,103:128},{10:[2,113],46:[2,113],48:[2,113],58:[2,113],59:[2,113],63:[2,113],67:[2,113],108:[2,113]},{68:[1,66]},{13:[2,7],53:[2,7],59:[2,7],96:[2,7],98:[2,7],100:[2,7],108:[2,7]},{13:[2,9],17:[1,129],53:[2,9],59:[2,9],96:[2,9],98:[2,9],100:[2,9],108:[2,9]},{13:[2,15],53:[2,15],59:[2,15],96:[2,15],98:[2,15],100:[2,15],108:[2,15]},{13:[2,16],53:[2,16],59:[2,16],96:[2,16],98:[2,16],100:[2,16],108:[2,16]},{13:[2,17],53:[2,17],59:[2,17],96:[2,17],98:[2,17],100:[2,17],108:[2,17]},{13:[2,18],53:[2,18],59:[2,18],96:[2,18],98:[2,18],100:[2,18],108:[2,18]},{13:[2,20],53:[2,20],59:[2,20],96:[2,20],98:[2,20],100:[2,20],108:[2,20]},{5:[2,3],6:[2,3]},{10:[2,28],13:[1,130],48:[2,28]},{10:[2,63],13:[2,63],48:[2,63]},{33:[1,131]},{35:[1,132]},{37:[1,133]},{39:[1,134]},{41:[1,135]},{44:[1,136]},{10:[2,39],46:[2,39],48:[2,39],66:97,67:[1,62]},{10:[2,41],46:[2,41],48:[2,41],58:[2,41],63:[2,41],67:[2,41]},{10:[2,45],46:[2,45],48:[2,45],67:[2,45]},{60:137,64:[1,102],68:[1,101]},{64:[1,138]},{23:141,59:[1,37],61:139,75:32,77:[1,140],78:[1,142],79:[1,143]},{59:[2,47],77:[2,47],78:[2,47],79:[2,47]},{59:[2,48],77:[2,48],78:[2,48],79:[2,48]},{10:[2,97],46:[2,97],48:[2,97]},{10:[2,98],46:[2,98],48:[2,98]},{13:[1,145],79:[1,146],110:[1,144]},{13:[2,119],59:[1,108],79:[2,119],109:147,110:[2,119],111:107},{13:[2,120],79:[2,120],80:[2,120],88:[1,149],105:[1,148],110:[2,120]},{13:[2,124],68:[1,150],79:[2,124],80:[2,124],88:[2,124],105:[2,124],110:[2,124]},{10:[2,103],46:[2,103],48:[2,103],58:[2,103],59:[2,103],63:[2,103],67:[2,103],81:[1,151],108:[2,103]},{10:[2,116],46:[2,116],48:[2,116],58:[2,116],59:[2,116],63:[2,116],67:[2,116],81:[2,116],108:[2,116]},{10:[2,117],46:[2,117],48:[2,117],58:[2,117],59:[2,117],63:[2,117],67:[2,117],81:[2,117],108:[2,117]},{10:[2,96],13:[2,96],46:[2,96],48:[2,96],58:[2,96],59:[2,96],63:[2,96],67:[2,96],79:[2,96],80:[2,96],81:[2,96],88:[2,96],105:[2,96],108:[2,96],110:[2,96]},{10:[2,70],13:[2,70],46:[2,70],48:[2,70],58:[2,70],59:[2,70],63:[2,70],65:[2,70],67:[2,70],79:[2,70],80:[2,70],81:[2,70],88:[2,70],105:[2,70],108:[2,70],110:[2,70]},{10:[2,71],13:[2,71],46:[2,71],48:[2,71],58:[2,71],59:[2,71],63:[2,71],65:[2,71],67:[2,71],79:[2,71],80:[2,71],81:[2,71],88:[2,71],105:[2,71],108:[2,71],110:[2,71]},{10:[2,72],13:[2,72],46:[2,72],48:[2,72],58:[2,72],59:[2,72],63:[2,72],65:[2,72],67:[2,72],79:[2,72],80:[2,72],81:[2,72],88:[2,72],105:[2,72],108:[2,72],110:[2,72]},{10:[2,73],13:[2,73],46:[2,73],48:[2,73],58:[2,73],59:[2,73],63:[2,73],65:[2,73],67:[2,73],79:[2,73],80:[2,73],81:[2,73],88:[2,73],105:[2,73],108:[2,73],110:[2,73]},{10:[2,74],13:[2,74],46:[2,74],48:[2,74],58:[2,74],59:[2,74],63:[2,74],65:[2,74],67:[2,74],79:[2,74],80:[2,74],81:[2,74],88:[2,74],105:[2,74],108:[2,74],110:[2,74]},{13:[2,88],23:117,59:[1,37],64:[1,119],75:32,79:[1,118],80:[2,88],82:153,83:[1,113],84:[1,114],85:[1,115],86:[1,116],87:152,88:[2,88]},{13:[2,91],59:[1,157],65:[2,91],83:[1,156],89:154,94:155},{10:[2,104],46:[2,104],48:[2,104],58:[2,104],59:[2,104],63:[2,104],67:[2,104],81:[1,151],108:[2,104]},{10:[2,105],46:[2,105],48:[2,105],58:[2,105],59:[2,105],63:[2,105],67:[2,105],81:[1,151],108:[2,105]},{23:158,59:[1,37],75:32},{10:[2,61],13:[2,61],46:[2,61],48:[2,61],53:[2,61],58:[2,61],59:[2,61],63:[2,61],65:[2,61],67:[2,61],68:[2,61],69:[2,61],78:[2,61],79:[2,61],80:[2,61],81:[2,61],88:[2,61],96:[2,61],98:[2,61],99:[2,61],100:[2,61],102:[2,61],105:[2,61],108:[2,61],110:[2,61]},{10:[2,62],13:[2,62],15:[1,159],46:[2,62],48:[2,62],53:[2,62],58:[2,62],59:[2,62],63:[2,62],65:[2,62],67:[2,62],68:[2,62],69:[2,62],72:[1,160],73:[1,161],74:[1,162],78:[2,62],79:[2,62],80:[2,62],81:[2,62],88:[2,62],96:[2,62],98:[2,62],99:[2,62],100:[2,62],102:[2,62],105:[2,62],108:[2,62],110:[2,62]},{10:[2,53],13:[2,53],15:[2,53],46:[2,53],48:[2,53],53:[2,53],58:[2,53],59:[2,53],63:[2,53],65:[2,53],67:[2,53],68:[2,53],69:[2,53],72:[2,53],73:[2,53],74:[2,53],78:[2,53],79:[2,53],80:[2,53],81:[2,53],88:[2,53],96:[2,53],98:[2,53],99:[2,53],100:[2,53],102:[2,53],105:[2,53],108:[2,53],110:[2,53]},{10:[2,59],13:[2,59],46:[2,59],48:[2,59],53:[2,59],58:[2,59],59:[2,59],63:[2,59],65:[2,59],67:[2,59],68:[2,59],69:[2,59],72:[2,59],73:[2,59],76:[2,59],78:[2,59],79:[2,59],80:[2,59],81:[2,59],88:[2,59],96:[2,59],98:[2,59],99:[2,59],100:[2,59],102:[2,59],105:[2,59],108:[2,59],110:[2,59]},{10:[2,109],46:[2,109],48:[2,109],58:[2,109],59:[2,109],63:[2,109],67:[2,109],81:[1,151],108:[2,109]},{10:[2,110],46:[2,110],48:[2,110],58:[2,110],59:[2,110],63:[2,110],67:[2,110],81:[1,151],108:[2,110]},{16:[1,163]},{23:164,59:[1,37],75:32},{10:[2,21],46:[2,21],48:[2,21]},{10:[2,22],46:[2,22],48:[2,22]},{10:[2,23],46:[2,23],48:[2,23]},{10:[2,24],46:[2,24],48:[2,24]},{42:[1,165]},{10:[2,26],46:[2,26],48:[2,26]},{23:141,59:[1,37],61:166,75:32,77:[1,140],78:[1,142],79:[1,143]},{23:141,59:[1,37],61:167,75:32,77:[1,140],78:[1,142],79:[1,143]},{62:168,65:[1,171],69:[1,170],81:[1,169]},{65:[2,65],69:[2,65],81:[2,65]},{65:[2,66],69:[2,66],81:[2,66]},{23:172,59:[1,37],75:32},{23:173,59:[1,37],75:32},{10:[2,114],13:[2,114],46:[2,114],48:[2,114],58:[2,114],59:[2,114],63:[2,114],67:[2,114],102:[2,114],108:[2,114]},{59:[1,108],79:[1,175],111:174},{13:[2,119],59:[1,108],79:[2,119],80:[2,119],109:176,111:107},{13:[1,145],79:[1,146],110:[1,177]},{23:117,59:[1,37],64:[1,119],75:32,79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:178},{13:[2,127],79:[2,127],80:[2,127],88:[2,127],105:[2,127],110:[2,127]},{13:[2,119],59:[1,108],79:[2,119],109:179,110:[2,119],111:107},{23:117,59:[1,37],64:[1,119],75:32,79:[1,118],82:112,83:[1,113],84:[1,114],85:[1,115],86:[1,116],95:180},{13:[1,183],80:[1,181],88:[1,182]},{13:[2,89],80:[2,89],88:[2,89]},{13:[1,185],65:[1,184]},{15:[1,186]},{15:[2,94]},{15:[2,95]},{10:[2,101],46:[2,101],48:[2,101]},{59:[1,187]},{59:[1,188]},{59:[1,189]},{10:[2,57],13:[2,57],15:[2,57],46:[2,57],48:[2,57],53:[2,57],58:[2,57],59:[2,57],63:[2,57],65:[2,57],67:[2,57],68:[2,57],69:[2,57],72:[2,57],73:[2,57],74:[2,57],78:[2,57],79:[2,57],80:[2,57],81:[2,57],88:[2,57],96:[2,57],98:[2,57],99:[2,57],100:[2,57],102:[2,57],105:[2,57],108:[2,57],110:[2,57]},{13:[2,10],53:[2,10],59:[2,10],96:[2,10],98:[2,10],100:[2,10],108:[2,10]},{10:[2,64],13:[2,64],48:[2,64]},{10:[2,25],46:[2,25],48:[2,25]},{62:190,65:[1,171],69:[1,170],81:[1,169]},{65:[1,191],81:[1,169]},{48:[1,192]},{23:193,59:[1,37],75:32},{48:[2,49]},{48:[2,50]},{78:[1,194]},{80:[1,195]},{13:[2,121],79:[2,121],80:[2,121],88:[1,149],105:[1,148],110:[2,121]},{13:[2,119],59:[1,108],79:[2,119],80:[2,119],109:196,111:107},{13:[1,145],79:[1,146],80:[1,197]},{10:[2,115],13:[2,115],46:[2,115],48:[2,115],58:[2,115],59:[2,115],63:[2,115],67:[2,115],102:[2,115],108:[2,115]},{13:[2,126],79:[2,126],80:[2,126],88:[2,126],105:[2,126],110:[2,126]},{13:[1,145],79:[1,146],110:[1,198]},{10:[2,118],46:[2,118],48:[2,118],58:[2,118],59:[2,118],63:[2,118],67:[2,118],81:[2,118],108:[2,118]},{10:[2,75],13:[2,75],46:[2,75],48:[2,75],58:[2,75],59:[2,75],63:[2,75],65:[2,75],67:[2,75],79:[2,75],80:[2,75],81:[2,75],88:[2,75],105:[2,75],108:[2,75],110:[2,75]},{80:[1,199]},{23:117,59:[1,37],64:[1,119],75:32,79:[1,118],82:200,83:[1,113],84:[1,114],85:[1,115],86:[1,116]},{10:[2,77],13:[2,77],46:[2,77],48:[2,77],58:[2,77],59:[2,77],63:[2,77],65:[2,77],67:[2,77],79:[2,77],80:[2,77],81:[2,77],88:[2,77],105:[2,77],108:[2,77],110:[2,77]},{59:[1,157],83:[1,156],94:201},{23:117,59:[1,37],64:[1,119],75:32,79:[1,118],82:202,83:[1,113],84:[1,114],85:[1,115],86:[1,116]},{10:[2,54],13:[2,54],15:[2,54],46:[2,54],48:[2,54],53:[2,54],58:[2,54],59:[2,54],63:[2,54],65:[2,54],67:[2,54],68:[2,54],69:[2,54],72:[2,54],73:[2,54],74:[2,54],78:[2,54],79:[2,54],80:[2,54],81:[2,54],88:[2,54],96:[2,54],98:[2,54],99:[2,54],100:[2,54],102:[2,54],105:[2,54],108:[2,54],110:[2,54]},{10:[2,55],13:[2,55],15:[2,55],46:[2,55],48:[2,55],53:[2,55],58:[2,55],59:[2,55],63:[2,55],65:[2,55],67:[2,55],68:[2,55],69:[2,55],72:[2,55],73:[2,55],74:[2,55],78:[2,55],79:[2,55],80:[2,55],81:[2,55],88:[2,55],96:[2,55],98:[2,55],99:[2,55],100:[2,55],102:[2,55],105:[2,55],108:[2,55],110:[2,55]},{10:[2,56],13:[2,56],15:[2,56],46:[2,56],48:[2,56],53:[2,56],58:[2,56],59:[2,56],63:[2,56],65:[2,56],67:[2,56],68:[2,56],69:[2,56],72:[2,56],73:[2,56],74:[2,56],78:[2,56],79:[2,56],80:[2,56],81:[2,56],88:[2,56],96:[2,56],98:[2,56],99:[2,56],100:[2,56],102:[2,56],105:[2,56],108:[2,56],110:[2,56]},{48:[1,203]},{48:[1,204]},{10:[2,46],46:[2,46],48:[2,46],67:[2,46]},{65:[2,69],69:[2,69],81:[2,69]},{65:[2,67],69:[2,67],81:[2,67]},{65:[2,68],69:[2,68],81:[2,68]},{13:[1,145],79:[1,146],80:[1,205]},{13:[2,123],79:[2,123],80:[2,123],110:[2,123]},{13:[2,125],79:[2,125],80:[2,125],88:[2,125],105:[2,125],110:[2,125]},{10:[2,76],13:[2,76],46:[2,76],48:[2,76],58:[2,76],59:[2,76],63:[2,76],65:[2,76],67:[2,76],79:[2,76],80:[2,76],81:[2,76],88:[2,76],105:[2,76],108:[2,76],110:[2,76]},{13:[2,90],80:[2,90],88:[2,90]},{15:[1,206]},{13:[2,92],65:[2,92]},{10:[2,42],46:[2,42],48:[2,42],58:[2,42],63:[2,42],67:[2,42]},{10:[2,43],46:[2,43],48:[2,43],58:[2,43],63:[2,43],67:[2,43]},{13:[2,122],79:[2,122],80:[2,122],110:[2,122]},{23:117,59:[1,37],64:[1,119],75:32,79:[1,118],82:207,83:[1,113],84:[1,114],85:[1,115],86:[1,116]},{13:[2,93],65:[2,93]}],
defaultActions: {3:[2,1],46:[2,30],156:[2,94],157:[2,95],170:[2,49],171:[2,50]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this._input = this.match.slice(n) + this._input;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 5
break;
case 1:/* skip whitespaces */
break;
case 2:this.begin('tags'); return 6
break;
case 3:/* skip vanilla code */
break;
case 4:this.popState(); return 10
break;
case 5:this.popState(); this.begin('def')
break;
case 6:return 13 /* list separator */
break;
case 7:return 15 /* key/value delimiter */
break;
case 8:return 17 /* range */
break;
case 9:return 76
break;
case 10:return 72
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 84
break;
case 14:return 14
break;
case 15:return 18
break;
case 16:return 19
break;
case 17:return 20
break;
case 18:return 21
break;
case 19:return 22
break;
case 20:return 24
break;
case 21:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 24
break;
case 22:return 25
break;
case 23:return 26
break;
case 24:return 27
break;
case 25:return 28
break;
case 26:return 59
break;
case 27:return 29
break;
case 28:return 74
break;
case 29:return 74
break;
case 30:this.popState(); return 10
break;
case 31:return 48
break;
case 32:/* skip whitespaces */
break;
case 33:this.begin('arg'); return 69
break;
case 34:this.begin('arg'); return 65
break;
case 35:return 63
break;
case 36:return 58
break;
case 37:return 67
break;
case 38:return 'FIRES'
break;
case 39:return 46
break;
case 40:/*return '*'*/
break;
case 41:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 83
break;
case 42:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 83
break;
case 43:return 84
break;
case 44:return 86
break;
case 45:return 85
break;
case 46:return 85
break;
case 47:return 76
break;
case 48:return 73
break;
case 49:return 77
break;
case 50:return 88
break;
case 51:return 72
break;
case 52:return 13
break;
case 53:return 102
break;
case 54:return 96
break;
case 55:return 105
break;
case 56:return 99
break;
case 57:return 15
break;
case 58:return 68
break;
case 59:return 110
break;
case 60:return 64
break;
case 61:return 65
break;
case 62:return 79
break;
case 63:return 80
break;
case 64:return 81
break;
case 65:return 78
break;
case 66:return 98
break;
case 67:return 100
break;
case 68:return 108
break;
case 69:return 59
break;
case 70:return 83
break;
case 71:return 74
break;
case 72:this.popState(); return 48
break;
case 73:this.popState(); console.log('LEFTCOMM'); return 48
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:[0-9]+(?:\.[0-9]+)*\b)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:metadata\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:\{["':$_a-zA-Z0-9 \,]*\})))/,/^(?:((?:[^@(\s]+)))/,/^(?:((?:[^@(\s]+)))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:((?:[^@(\s]+)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],"inclusive":false},"def":{"rules":[0,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],"inclusive":false},"arg":{"rules":[0,72],"inclusive":false},"comment":{"rules":[0,73],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = jsParser;
exports.parse = function () { return jsParser.parse.apply(jsParser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}