/* Jison generated parser */
var pdocParser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"0":32,"1":35,"2":37,"3":39,"4":41,"5":44,"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"VERSION":16,"..":17,"BUBBLES":18,"CANCELABLE":19,"TEXT":20,"READONLY":21,"INTERNAL":22,"HIDE":23,"CHAINABLE":24,"SECTION":25,"ALIASOF":26,"RELATEDTO":27,"BELONGSTO":28,"EXTENSION":29,"JSON":30,"stability_list":31,"-":33,"Deprecated":34,"Experimental":36,"Unstable":38,"Stable":40,"API":42,"Frozen":43,"Locked":45,"panino":46,"INCLUDES":47,"names":48,"section":49,"namespace":50,"class":51,"mixin":52,">":53,"signatures":54,"argument_descriptions":55,"return_descriptions":56,"argument_description":57,"*-":58,"NAME":59,"popen":60,"names_alternation":61,"pclose":62,"**":63,"{":64,"}":65,"return_description":66,"*+":67,"(":68,"):":69,"events":70,"event":71,".":72,"@":73,"EVENTEND":74,"name_or_namespace":75,"name":76,"#":77,"?":78,"`":79,"[":80,"]":81,"|":82,"value":83,"STRING":84,"NUMBER":85,"BOOLEAN":86,"REGEXP":87,"value_list":88,"...":89,"key_value_list":90,"value2":91,"TRUE":92,"FALSE":93,"NULL":94,"key":95,"name_or_value":96,"==":97,"string":98,"CLASS":99,"<":100,"MIXIN":101,"property":102,"->":103,"returns":104,"constant":105,"=":106,"signature":107,"method":108,"NEW":109,"arguments":110,")":111,"arg":112,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"VERSION",17:"..",18:"BUBBLES",19:"CANCELABLE",20:"TEXT",21:"READONLY",22:"INTERNAL",23:"HIDE",24:"CHAINABLE",25:"SECTION",26:"ALIASOF",27:"RELATEDTO",28:"BELONGSTO",29:"EXTENSION",30:"JSON",32:"0",33:"-",34:"Deprecated",35:"1",36:"Experimental",37:"2",38:"Unstable",39:"3",40:"Stable",41:"4",42:"API",43:"Frozen",44:"5",45:"Locked",47:"INCLUDES",53:">",58:"*-",59:"NAME",63:"**",64:"{",65:"}",67:"*+",68:"(",69:"):",72:".",73:"@",74:"EVENTEND",77:"#",78:"?",79:"`",80:"[",81:"]",82:"|",84:"STRING",85:"NUMBER",86:"BOOLEAN",87:"REGEXP",89:"...",92:"TRUE",93:"FALSE",94:"NULL",97:"==",98:"string",99:"CLASS",100:"<",101:"MIXIN",103:"->",106:"=",109:"NEW",111:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,3],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[12,1],[31,3],[31,3],[31,3],[31,3],[31,4],[31,3],[8,1],[8,3],[9,0],[9,1],[46,1],[46,1],[46,1],[46,1],[46,2],[46,1],[46,2],[46,2],[46,3],[55,1],[55,2],[57,6],[57,6],[56,1],[56,2],[66,5],[60,1],[60,1],[62,1],[62,1],[70,1],[70,3],[71,1],[71,3],[71,3],[71,3],[71,2],[75,1],[75,3],[76,1],[76,3],[76,3],[48,1],[48,3],[61,1],[61,1],[61,3],[61,3],[61,3],[83,1],[83,1],[83,1],[83,1],[83,1],[83,3],[83,4],[83,3],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,1],[91,3],[91,4],[91,3],[88,0],[88,1],[88,3],[90,0],[90,3],[90,5],[95,1],[95,1],[96,1],[49,3],[49,3],[50,1],[51,2],[51,4],[52,2],[102,3],[102,3],[105,3],[54,1],[54,2],[107,1],[107,3],[107,3],[107,1],[107,1],[107,2],[108,4],[108,5],[104,1],[104,1],[104,3],[110,0],[110,1],[110,3],[110,5],[110,4],[112,1],[112,4],[112,3],[112,2]],
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
case 11: this.$ = {bubbles: true} 
break;
case 12: this.$ = {cancelable: {description: ""}} 
break;
case 13: this.$ = {cancelable: {description: $$[$0]}} 
break;
case 14: this.$ = {readonly: true} 
break;
case 15: this.$ = {internal: true} 
break;
case 16: this.$ = {hide: true} 
break;
case 17: this.$ = {chainable: true} 
break;
case 18: this.$ = {section: $$[$0]} 
break;
case 19: this.$ = {alias_of: $$[$0]} 
break;
case 20: this.$ = {related_to: $$[$0]} 
break;
case 21: this.$ = {belongs_to: $$[$0]} 
break;
case 22: this.$ = {extension: true} 
break;
case 23: this.$ = {metadata: JSON.parse($$[$0])} 
break;
case 31: this.$.included_mixins = $$[$0] 
break;
case 32: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 33: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 38: this.$ = {stability: $$[$0]} 
break;
case 40: 
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
case 41: this.$.returns = $$[$0] 
break;
case 42: 
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
case 43: this.$ = [$$[$0]] 
break;
case 44: this.$.push($$[$0]) 
break;
case 45:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-4]);
         process.exit(1);
       }

      $$[$0] = $$[$0].split("\n").map(function(element, idx) {
        return element.replace(/^\s{4}/g, '');
      });

      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].join("\n\n")
      };

    
break;
case 46:
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
case 47: this.$ = [$$[$0]] 
break;
case 48: this.$.push($$[$0]) 
break;
case 49:
      $$[$0] = $$[$0].split("\n").map(function(element, idx) {
        return element.replace(/^\s{4}/g, '');
      });

      this.$ = {
          type: $$[$0-2][0],
          isArray: $$[$0-2].isArray,
          description: $$[$0].join("\n\n")
        };
     
break;
case 50:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 51:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 52:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 53:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 54: this.$ = [$$[$0]] 
break;
case 55: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 57: this.$ += $$[$0-1] + $$[$0] 
break;
case 58: this.$ += $$[$0-1] + $$[$0] 
break;
case 59: this.$ += $$[$0-1] + $$[$0] 
break;
case 60: this.$ += $$[$0] 
break;
case 62: this.$ += $$[$0-1] + $$[$0] 
break;
case 64: this.$ += $$[$0-1] + $$[$0] 
break;
case 65: this.$ += $$[$0-1] + $$[$0] 
break;
case 66: this.$ = [$$[$0]] 
break;
case 67: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 68: this.$ = [] 
break;
case 69: this.$ = [$$[$0]] 
break;
case 70: this.$ = [$$[$0-1]] 
break;
case 71: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 72: this.$.push($$[$0]) 
break;
case 73: this.$ = String($$[$0]) 
break;
case 74: this.$ = Number($$[$0]) 
break;
case 75: this.$ = $$[$0] === 'true' ? true : false 
break;
case 76: this.$ = new RegExp($$[$0]) 
break;
case 78: this.$ = $$[$0-1]; this.$.array = true 
break;
case 79: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 80: this.$ = $$[$0-1] 
break;
case 81: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 82: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 83: this.$ = {value: true, type: 'boolean'} 
break;
case 84: this.$ = {value: false, type: 'boolean'} 
break;
case 85: this.$ = {value: null, type: 'null'} 
break;
case 86: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 87: this.$ = {value: $$[$0], type: 'name'} 
break;
case 88: this.$ = $$[$0-1]; this.$.array = true 
break;
case 89: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 90: this.$ = $$[$0-1] 
break;
case 91: this.$ = [] 
break;
case 92: this.$ = [$$[$0]] 
break;
case 93: this.$.push($$[$0]) 
break;
case 94: this.$ = {} 
break;
case 95: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 96: this.$[$$[$0-2]] = $$[$0] 
break;
case 100: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 101: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 102: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 103: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 104: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 105: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 106: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 107: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 108: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 109:
    this.$ = $$[$0];
    this.$.signatures = [{arguments: $$[$0].arguments, returns: $$[$0].returns}];
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 110:
    this.$.signatures.push({arguments: $$[$0].arguments, returns: $$[$0].returns});
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 112:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 113:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 116: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 117: this.$ = {id: $$[$0-3], type: 'method', arguments: $$[$0-1]} 
break;
case 118: this.$ = {id: $$[$0-4], type: 'method', arguments: $$[$0-1], bound: true} 
break;
case 119: this.$ = [{type: '?'}] 
break;
case 120:
    var x = $$[$0];
    var ret = {
      type: String(x)
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 121:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 122: this.$ = [] 
break;
case 123: this.$ = [$$[$0]] 
break;
case 124: this.$.push($$[$0]) 
break;
case 125:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 126:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 127: this.$ = {name: $$[$0]} 
break;
case 128: this.$ = {name: $$[$0-3], arguments: $$[$0-1], callback: true}; 
break;
case 129: this.$.default_value = $$[$0] 
break;
case 130: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],21:[1,11],22:[1,12],23:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],29:[1,19],30:[1,20],53:[2,4],59:[2,4],97:[2,4],99:[2,4],101:[2,4],109:[2,4]},{8:21,46:22,49:23,50:24,51:25,52:26,53:[1,27],54:28,59:[1,39],75:34,76:30,97:[1,29],99:[1,31],101:[1,32],102:36,105:37,107:33,108:35,109:[1,38]},{13:[1,40],53:[2,5],59:[2,5],97:[2,5],99:[2,5],101:[2,5],109:[2,5]},{13:[2,6],53:[2,6],59:[2,6],97:[2,6],99:[2,6],101:[2,6],109:[2,6]},{13:[2,8],15:[1,41],53:[2,8],59:[2,8],97:[2,8],99:[2,8],101:[2,8],109:[2,8]},{13:[2,11],53:[2,11],59:[2,11],97:[2,11],99:[2,11],101:[2,11],109:[2,11]},{13:[2,12],15:[1,42],53:[2,12],59:[2,12],97:[2,12],99:[2,12],101:[2,12],109:[2,12]},{13:[2,14],53:[2,14],59:[2,14],97:[2,14],99:[2,14],101:[2,14],109:[2,14]},{13:[2,15],53:[2,15],59:[2,15],97:[2,15],99:[2,15],101:[2,15],109:[2,15]},{13:[2,16],53:[2,16],59:[2,16],97:[2,16],99:[2,16],101:[2,16],109:[2,16]},{13:[2,17],53:[2,17],59:[2,17],97:[2,17],99:[2,17],101:[2,17],109:[2,17]},{15:[1,43]},{15:[1,44]},{15:[1,45]},{15:[1,46]},{13:[2,22],53:[2,22],59:[2,22],97:[2,22],99:[2,22],101:[2,22],109:[2,22]},{13:[2,23],53:[2,23],59:[2,23],97:[2,23],99:[2,23],101:[2,23],109:[2,23]},{9:47,10:[2,32],20:[1,48]},{10:[2,30],20:[2,30],47:[1,49]},{10:[2,34],20:[2,34],47:[2,34]},{10:[2,35],20:[2,35],47:[2,35]},{10:[2,36],20:[2,36],47:[2,36]},{10:[2,37],20:[2,37],47:[2,37]},{31:50,32:[1,51],35:[1,52],37:[1,53],39:[1,54],41:[1,55],44:[1,56]},{10:[2,39],20:[2,39],47:[2,39],55:57,56:58,57:60,58:[1,62],59:[1,39],63:[1,63],66:61,67:[1,64],75:34,76:65,102:36,105:37,107:59,108:35,109:[1,38]},{59:[1,67],98:[1,66]},{10:[2,102],13:[1,70],20:[2,102],47:[2,102],68:[1,68],103:[1,69],106:[1,71]},{59:[1,39],75:34,76:72},{59:[1,39],75:34,76:73},{10:[2,109],20:[2,109],47:[2,109],58:[2,109],59:[2,109],63:[2,109],67:[2,109],109:[2,109]},{10:[2,63],13:[2,63],20:[2,63],47:[2,63],58:[2,63],59:[2,63],63:[2,63],65:[2,63],67:[2,63],68:[2,63],69:[2,63],72:[1,76],73:[1,75],77:[1,74],79:[2,63],80:[2,63],81:[2,63],82:[2,63],89:[2,63],100:[2,63],103:[2,63],106:[2,63],109:[2,63],111:[2,63]},{10:[2,111],13:[1,77],20:[2,111],47:[2,111],58:[2,111],59:[2,111],63:[2,111],67:[2,111],103:[1,78],109:[2,111]},{10:[2,114],20:[2,114],47:[2,114],58:[2,114],59:[2,114],63:[2,114],67:[2,114],109:[2,114]},{10:[2,115],20:[2,115],47:[2,115],58:[2,115],59:[2,115],63:[2,115],67:[2,115],109:[2,115]},{59:[1,39],75:34,76:80,108:79},{10:[2,61],13:[2,61],20:[2,61],47:[2,61],58:[2,61],59:[2,61],63:[2,61],65:[2,61],67:[2,61],68:[2,61],69:[2,61],72:[2,61],73:[2,61],77:[2,61],79:[2,61],80:[2,61],81:[2,61],82:[2,61],89:[2,61],100:[2,61],103:[2,61],106:[2,61],109:[2,61],111:[2,61]},{12:81,14:[1,8],18:[1,9],19:[1,10],21:[1,11],22:[1,12],23:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],29:[1,19],30:[1,20]},{16:[1,82]},{20:[1,83]},{20:[1,84]},{20:[1,85]},{20:[1,86]},{20:[1,87]},{10:[1,88]},{10:[2,33]},{48:89,59:[1,39],75:34,76:90},{10:[2,38],20:[2,38],47:[2,38]},{33:[1,91]},{33:[1,92]},{33:[1,93]},{33:[1,94]},{33:[1,95]},{33:[1,96]},{10:[2,40],20:[2,40],47:[2,40],56:97,57:98,58:[1,62],63:[1,63],66:61,67:[1,64]},{10:[2,41],20:[2,41],47:[2,41],66:99,67:[1,64]},{10:[2,110],20:[2,110],47:[2,110],58:[2,110],59:[2,110],63:[2,110],67:[2,110],109:[2,110]},{10:[2,43],20:[2,43],47:[2,43],58:[2,43],63:[2,43],67:[2,43]},{10:[2,47],20:[2,47],47:[2,47],67:[2,47]},{59:[1,100]},{59:[1,101]},{60:102,64:[1,104],68:[1,103]},{13:[1,70],68:[1,68],103:[1,69],106:[1,71]},{97:[1,105]},{97:[1,106]},{13:[2,122],59:[1,110],73:[1,108],80:[2,122],110:107,111:[2,122],112:109},{59:[1,39],64:[1,121],75:34,76:119,78:[1,112],80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:113,104:111},{59:[1,39],64:[1,121],75:34,76:119,78:[1,112],80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:113,104:122},{59:[1,39],64:[1,121],75:34,76:119,78:[1,112],80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:113,104:123},{10:[2,103],20:[2,103],47:[2,103],100:[1,124]},{10:[2,105],20:[2,105],47:[2,105]},{59:[1,125]},{59:[1,127],71:126},{59:[1,128]},{59:[1,39],64:[1,121],75:34,76:119,78:[1,112],80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:113,104:129},{59:[1,39],64:[1,121],75:34,76:119,78:[1,112],80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:113,104:130},{10:[2,116],20:[2,116],47:[2,116],58:[2,116],59:[2,116],63:[2,116],67:[2,116],109:[2,116]},{68:[1,68]},{13:[2,7],53:[2,7],59:[2,7],97:[2,7],99:[2,7],101:[2,7],109:[2,7]},{13:[2,9],17:[1,131],53:[2,9],59:[2,9],97:[2,9],99:[2,9],101:[2,9],109:[2,9]},{13:[2,13],53:[2,13],59:[2,13],97:[2,13],99:[2,13],101:[2,13],109:[2,13]},{13:[2,18],53:[2,18],59:[2,18],97:[2,18],99:[2,18],101:[2,18],109:[2,18]},{13:[2,19],53:[2,19],59:[2,19],97:[2,19],99:[2,19],101:[2,19],109:[2,19]},{13:[2,20],53:[2,20],59:[2,20],97:[2,20],99:[2,20],101:[2,20],109:[2,20]},{13:[2,21],53:[2,21],59:[2,21],97:[2,21],99:[2,21],101:[2,21],109:[2,21]},{5:[2,3],6:[2,3]},{10:[2,31],13:[1,132],20:[2,31]},{10:[2,66],13:[2,66],20:[2,66]},{34:[1,133]},{36:[1,134]},{38:[1,135]},{40:[1,136]},{42:[1,137]},{45:[1,138]},{10:[2,42],20:[2,42],47:[2,42],66:99,67:[1,64]},{10:[2,44],20:[2,44],47:[2,44],58:[2,44],63:[2,44],67:[2,44]},{10:[2,48],20:[2,48],47:[2,48],67:[2,48]},{60:139,64:[1,104],68:[1,103]},{64:[1,140]},{59:[1,39],61:141,75:34,76:143,78:[1,142],79:[1,144],80:[1,145]},{59:[2,50],78:[2,50],79:[2,50],80:[2,50]},{59:[2,51],78:[2,51],79:[2,51],80:[2,51]},{10:[2,100],20:[2,100],47:[2,100]},{10:[2,101],20:[2,101],47:[2,101]},{13:[1,147],80:[1,148],111:[1,146]},{13:[2,122],59:[1,110],80:[2,122],110:149,111:[2,122],112:109},{13:[2,123],80:[2,123],81:[2,123],89:[1,151],106:[1,150],111:[2,123]},{13:[2,127],68:[1,152],80:[2,127],81:[2,127],89:[2,127],106:[2,127],111:[2,127]},{10:[2,106],20:[2,106],47:[2,106],58:[2,106],59:[2,106],63:[2,106],67:[2,106],82:[1,153],109:[2,106]},{10:[2,119],20:[2,119],47:[2,119],58:[2,119],59:[2,119],63:[2,119],67:[2,119],82:[2,119],109:[2,119]},{10:[2,120],20:[2,120],47:[2,120],58:[2,120],59:[2,120],63:[2,120],67:[2,120],82:[2,120],109:[2,120]},{10:[2,99],13:[2,99],20:[2,99],47:[2,99],58:[2,99],59:[2,99],63:[2,99],67:[2,99],80:[2,99],81:[2,99],82:[2,99],89:[2,99],106:[2,99],109:[2,99],111:[2,99]},{10:[2,73],13:[2,73],20:[2,73],47:[2,73],58:[2,73],59:[2,73],63:[2,73],65:[2,73],67:[2,73],80:[2,73],81:[2,73],82:[2,73],89:[2,73],106:[2,73],109:[2,73],111:[2,73]},{10:[2,74],13:[2,74],20:[2,74],47:[2,74],58:[2,74],59:[2,74],63:[2,74],65:[2,74],67:[2,74],80:[2,74],81:[2,74],82:[2,74],89:[2,74],106:[2,74],109:[2,74],111:[2,74]},{10:[2,75],13:[2,75],20:[2,75],47:[2,75],58:[2,75],59:[2,75],63:[2,75],65:[2,75],67:[2,75],80:[2,75],81:[2,75],82:[2,75],89:[2,75],106:[2,75],109:[2,75],111:[2,75]},{10:[2,76],13:[2,76],20:[2,76],47:[2,76],58:[2,76],59:[2,76],63:[2,76],65:[2,76],67:[2,76],80:[2,76],81:[2,76],82:[2,76],89:[2,76],106:[2,76],109:[2,76],111:[2,76]},{10:[2,77],13:[2,77],20:[2,77],47:[2,77],58:[2,77],59:[2,77],63:[2,77],65:[2,77],67:[2,77],80:[2,77],81:[2,77],82:[2,77],89:[2,77],106:[2,77],109:[2,77],111:[2,77]},{13:[2,91],59:[1,39],64:[1,121],75:34,76:119,80:[1,120],81:[2,91],83:155,84:[1,115],85:[1,116],86:[1,117],87:[1,118],88:154,89:[2,91]},{13:[2,94],59:[1,159],65:[2,94],84:[1,158],90:156,95:157},{10:[2,107],20:[2,107],47:[2,107],58:[2,107],59:[2,107],63:[2,107],67:[2,107],82:[1,153],109:[2,107]},{10:[2,108],20:[2,108],47:[2,108],58:[2,108],59:[2,108],63:[2,108],67:[2,108],82:[1,153],109:[2,108]},{59:[1,39],75:34,76:160},{10:[2,64],13:[2,64],20:[2,64],47:[2,64],58:[2,64],59:[2,64],63:[2,64],65:[2,64],67:[2,64],68:[2,64],69:[2,64],79:[2,64],80:[2,64],81:[2,64],82:[2,64],89:[2,64],100:[2,64],103:[2,64],106:[2,64],109:[2,64],111:[2,64]},{10:[2,65],13:[2,65],15:[1,161],20:[2,65],47:[2,65],58:[2,65],59:[2,65],63:[2,65],65:[2,65],67:[2,65],68:[2,65],69:[2,65],72:[1,162],73:[1,163],74:[1,164],79:[2,65],80:[2,65],81:[2,65],82:[2,65],89:[2,65],100:[2,65],103:[2,65],106:[2,65],109:[2,65],111:[2,65]},{10:[2,56],13:[2,56],15:[2,56],20:[2,56],47:[2,56],58:[2,56],59:[2,56],63:[2,56],65:[2,56],67:[2,56],68:[2,56],69:[2,56],72:[2,56],73:[2,56],74:[2,56],79:[2,56],80:[2,56],81:[2,56],82:[2,56],89:[2,56],100:[2,56],103:[2,56],106:[2,56],109:[2,56],111:[2,56]},{10:[2,62],13:[2,62],20:[2,62],47:[2,62],58:[2,62],59:[2,62],63:[2,62],65:[2,62],67:[2,62],68:[2,62],69:[2,62],72:[2,62],73:[2,62],77:[2,62],79:[2,62],80:[2,62],81:[2,62],82:[2,62],89:[2,62],100:[2,62],103:[2,62],106:[2,62],109:[2,62],111:[2,62]},{10:[2,112],20:[2,112],47:[2,112],58:[2,112],59:[2,112],63:[2,112],67:[2,112],82:[1,153],109:[2,112]},{10:[2,113],20:[2,113],47:[2,113],58:[2,113],59:[2,113],63:[2,113],67:[2,113],82:[1,153],109:[2,113]},{16:[1,165]},{59:[1,39],75:34,76:166},{10:[2,24],20:[2,24],47:[2,24]},{10:[2,25],20:[2,25],47:[2,25]},{10:[2,26],20:[2,26],47:[2,26]},{10:[2,27],20:[2,27],47:[2,27]},{43:[1,167]},{10:[2,29],20:[2,29],47:[2,29]},{59:[1,39],61:168,75:34,76:143,78:[1,142],79:[1,144],80:[1,145]},{59:[1,39],61:169,75:34,76:143,78:[1,142],79:[1,144],80:[1,145]},{62:170,65:[1,173],69:[1,172],82:[1,171]},{65:[2,68],69:[2,68],82:[2,68]},{65:[2,69],69:[2,69],82:[2,69]},{59:[1,39],75:34,76:174},{59:[1,39],75:34,76:175},{10:[2,117],13:[2,117],20:[2,117],47:[2,117],58:[2,117],59:[2,117],63:[2,117],67:[2,117],103:[2,117],109:[2,117]},{59:[1,110],80:[1,177],112:176},{13:[2,122],59:[1,110],80:[2,122],81:[2,122],110:178,112:109},{13:[1,147],80:[1,148],111:[1,179]},{59:[1,39],64:[1,121],75:34,76:119,80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:180},{13:[2,130],80:[2,130],81:[2,130],89:[2,130],106:[2,130],111:[2,130]},{13:[2,122],59:[1,110],80:[2,122],110:181,111:[2,122],112:109},{59:[1,39],64:[1,121],75:34,76:119,80:[1,120],83:114,84:[1,115],85:[1,116],86:[1,117],87:[1,118],96:182},{13:[1,185],81:[1,183],89:[1,184]},{13:[2,92],81:[2,92],89:[2,92]},{13:[1,187],65:[1,186]},{15:[1,188]},{15:[2,97]},{15:[2,98]},{10:[2,104],20:[2,104],47:[2,104]},{59:[1,189]},{59:[1,190]},{59:[1,191]},{10:[2,60],13:[2,60],15:[2,60],20:[2,60],47:[2,60],58:[2,60],59:[2,60],63:[2,60],65:[2,60],67:[2,60],68:[2,60],69:[2,60],72:[2,60],73:[2,60],74:[2,60],79:[2,60],80:[2,60],81:[2,60],82:[2,60],89:[2,60],100:[2,60],103:[2,60],106:[2,60],109:[2,60],111:[2,60]},{13:[2,10],53:[2,10],59:[2,10],97:[2,10],99:[2,10],101:[2,10],109:[2,10]},{10:[2,67],13:[2,67],20:[2,67]},{10:[2,28],20:[2,28],47:[2,28]},{62:192,65:[1,173],69:[1,172],82:[1,171]},{65:[1,193],82:[1,171]},{20:[1,194]},{59:[1,39],75:34,76:195},{20:[2,52]},{20:[2,53]},{79:[1,196]},{81:[1,197]},{13:[2,124],80:[2,124],81:[2,124],89:[1,151],106:[1,150],111:[2,124]},{13:[2,122],59:[1,110],80:[2,122],81:[2,122],110:198,112:109},{13:[1,147],80:[1,148],81:[1,199]},{10:[2,118],13:[2,118],20:[2,118],47:[2,118],58:[2,118],59:[2,118],63:[2,118],67:[2,118],103:[2,118],109:[2,118]},{13:[2,129],80:[2,129],81:[2,129],89:[2,129],106:[2,129],111:[2,129]},{13:[1,147],80:[1,148],111:[1,200]},{10:[2,121],20:[2,121],47:[2,121],58:[2,121],59:[2,121],63:[2,121],67:[2,121],82:[2,121],109:[2,121]},{10:[2,78],13:[2,78],20:[2,78],47:[2,78],58:[2,78],59:[2,78],63:[2,78],65:[2,78],67:[2,78],80:[2,78],81:[2,78],82:[2,78],89:[2,78],106:[2,78],109:[2,78],111:[2,78]},{81:[1,201]},{59:[1,39],64:[1,121],75:34,76:119,80:[1,120],83:202,84:[1,115],85:[1,116],86:[1,117],87:[1,118]},{10:[2,80],13:[2,80],20:[2,80],47:[2,80],58:[2,80],59:[2,80],63:[2,80],65:[2,80],67:[2,80],80:[2,80],81:[2,80],82:[2,80],89:[2,80],106:[2,80],109:[2,80],111:[2,80]},{59:[1,159],84:[1,158],95:203},{59:[1,39],64:[1,121],75:34,76:119,80:[1,120],83:204,84:[1,115],85:[1,116],86:[1,117],87:[1,118]},{10:[2,57],13:[2,57],15:[2,57],20:[2,57],47:[2,57],58:[2,57],59:[2,57],63:[2,57],65:[2,57],67:[2,57],68:[2,57],69:[2,57],72:[2,57],73:[2,57],74:[2,57],79:[2,57],80:[2,57],81:[2,57],82:[2,57],89:[2,57],100:[2,57],103:[2,57],106:[2,57],109:[2,57],111:[2,57]},{10:[2,58],13:[2,58],15:[2,58],20:[2,58],47:[2,58],58:[2,58],59:[2,58],63:[2,58],65:[2,58],67:[2,58],68:[2,58],69:[2,58],72:[2,58],73:[2,58],74:[2,58],79:[2,58],80:[2,58],81:[2,58],82:[2,58],89:[2,58],100:[2,58],103:[2,58],106:[2,58],109:[2,58],111:[2,58]},{10:[2,59],13:[2,59],15:[2,59],20:[2,59],47:[2,59],58:[2,59],59:[2,59],63:[2,59],65:[2,59],67:[2,59],68:[2,59],69:[2,59],72:[2,59],73:[2,59],74:[2,59],79:[2,59],80:[2,59],81:[2,59],82:[2,59],89:[2,59],100:[2,59],103:[2,59],106:[2,59],109:[2,59],111:[2,59]},{20:[1,205]},{20:[1,206]},{10:[2,49],20:[2,49],47:[2,49],67:[2,49]},{65:[2,72],69:[2,72],82:[2,72]},{65:[2,70],69:[2,70],82:[2,70]},{65:[2,71],69:[2,71],82:[2,71]},{13:[1,147],80:[1,148],81:[1,207]},{13:[2,126],80:[2,126],81:[2,126],111:[2,126]},{13:[2,128],80:[2,128],81:[2,128],89:[2,128],106:[2,128],111:[2,128]},{10:[2,79],13:[2,79],20:[2,79],47:[2,79],58:[2,79],59:[2,79],63:[2,79],65:[2,79],67:[2,79],80:[2,79],81:[2,79],82:[2,79],89:[2,79],106:[2,79],109:[2,79],111:[2,79]},{13:[2,93],81:[2,93],89:[2,93]},{15:[1,208]},{13:[2,95],65:[2,95]},{10:[2,45],20:[2,45],47:[2,45],58:[2,45],63:[2,45],67:[2,45]},{10:[2,46],20:[2,46],47:[2,46],58:[2,46],63:[2,46],67:[2,46]},{13:[2,125],80:[2,125],81:[2,125],111:[2,125]},{59:[1,39],64:[1,121],75:34,76:119,80:[1,120],83:209,84:[1,115],85:[1,116],86:[1,117],87:[1,118]},{13:[2,96],65:[2,96]}],
defaultActions: {3:[2,1],48:[2,33],158:[2,97],159:[2,98],172:[2,52],173:[2,53]},
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
case 9:return 77
break;
case 10:return 72
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 85
break;
case 14:return 14
break;
case 15:return 18
break;
case 16:return 19
break;
case 17:return 21
break;
case 18:return 22
break;
case 19:return 23
break;
case 20:return 24
break;
case 21:return 25
break;
case 22:return 26
break;
case 23:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 26
break;
case 24:return 27
break;
case 25:return 27
break;
case 26:return 28
break;
case 27:return 29
break;
case 28:return 30
break;
case 29:return 20
break;
case 30:return 74
break;
case 31:this.popState(); return 10
break;
case 32:return 20
break;
case 33:/* skip whitespaces */
break;
case 34:this.begin('arg'); return 69
break;
case 35:this.begin('arg'); return 65
break;
case 36:return 63
break;
case 37:return 58
break;
case 38:return 67
break;
case 39:return 'FIRES'
break;
case 40:return 47
break;
case 41:/*return '*'*/
break;
case 42:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 84
break;
case 43:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 84
break;
case 44:return 85
break;
case 45:return 87
break;
case 46:return 86
break;
case 47:return 86
break;
case 48:return 77
break;
case 49:return 73
break;
case 50:return 78
break;
case 51:return 89
break;
case 52:return 72
break;
case 53:return 13
break;
case 54:return 103
break;
case 55:return 97
break;
case 56:return 106
break;
case 57:return 100
break;
case 58:return 15
break;
case 59:return 68
break;
case 60:return 111
break;
case 61:return 64
break;
case 62:return 65
break;
case 63:return 80
break;
case 64:return 81
break;
case 65:return 82
break;
case 66:return 79
break;
case 67:return 99
break;
case 68:return 101
break;
case 69:return 109
break;
case 70:return 59
break;
case 71:return 84
break;
case 72:return 74
break;
case 73:this.popState(); return 20
break;
case 74:this.popState(); console.log('LEFTCOMM'); return 20
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:[0-9]+(?:\.[0-9]+)*\b)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:bubbles\b)/,/^(?:cancelable\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:see\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:((?:\{["':$_a-zA-Z0-9 \,]*\})))/,/^(?:.+)/,/^(?:((?:[^@(\s]+)))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z0-9 ]*)))/,/^(?:((?:[^@(\s]+)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],"inclusive":false},"def":{"rules":[0,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72],"inclusive":false},"arg":{"rules":[0,73],"inclusive":false},"comment":{"rules":[0,74],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = pdocParser;
exports.parse = function () { return pdocParser.parse.apply(pdocParser, arguments); }
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