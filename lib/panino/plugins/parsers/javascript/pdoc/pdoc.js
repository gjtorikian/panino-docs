/* Jison generated parser */
var pdoc = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"0":33,"1":36,"2":38,"3":40,"4":42,"5":45,"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"VERSION":16,"..":17,"BUBBLES":18,"CANCELABLE":19,"TEXT":20,"READONLY":21,"INTERNAL":22,"HIDE":23,"PRIVATE":24,"CHAINABLE":25,"SECTION":26,"ALIASOF":27,"RELATEDTO":28,"BELONGSTO":29,"EXTENSION":30,"JSON":31,"stability_list":32,"-":34,"Deprecated":35,"Experimental":37,"Unstable":39,"Stable":41,"API":43,"Frozen":44,"Locked":46,"panino":47,"INCLUDES":48,"names":49,"section":50,"namespace":51,"class":52,"mixin":53,">":54,"signatures":55,"argument_descriptions":56,"return_descriptions":57,"argument_description":58,"*-":59,"NAME":60,"popen":61,"names_alternation":62,"pclose":63,"**":64,"{":65,"}":66,"return_description":67,"*+":68,"(":69,"):":70,"events":71,"event":72,".":73,"@":74,"EVENTEND":75,"name_or_namespace":76,"name":77,"#":78,"?":79,"`":80,"[":81,"]":82,"|":83,"value":84,"STRING":85,"NUMBER":86,"BOOLEAN":87,"REGEXP":88,"value_list":89,"...":90,"key_value_list":91,"value2":92,"TRUE":93,"FALSE":94,"NULL":95,"key":96,"name_or_value":97,"==":98,"string":99,"CLASS":100,"<":101,"MIXIN":102,"property":103,"->":104,"returns":105,"constant":106,"=":107,"signature":108,"method":109,"NEW":110,"arguments":111,")":112,"arg":113,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"VERSION",17:"..",18:"BUBBLES",19:"CANCELABLE",20:"TEXT",21:"READONLY",22:"INTERNAL",23:"HIDE",24:"PRIVATE",25:"CHAINABLE",26:"SECTION",27:"ALIASOF",28:"RELATEDTO",29:"BELONGSTO",30:"EXTENSION",31:"JSON",33:"0",34:"-",35:"Deprecated",36:"1",37:"Experimental",38:"2",39:"Unstable",40:"3",41:"Stable",42:"4",43:"API",44:"Frozen",45:"5",46:"Locked",48:"INCLUDES",54:">",59:"*-",60:"NAME",64:"**",65:"{",66:"}",68:"*+",69:"(",70:"):",73:".",74:"@",75:"EVENTEND",78:"#",79:"?",80:"`",81:"[",82:"]",83:"|",85:"STRING",86:"NUMBER",87:"BOOLEAN",88:"REGEXP",90:"...",93:"TRUE",94:"FALSE",95:"NULL",98:"==",99:"string",100:"CLASS",101:"<",102:"MIXIN",104:"->",107:"=",110:"NEW",112:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,3],[12,1],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[12,1],[32,3],[32,3],[32,3],[32,3],[32,4],[32,3],[8,1],[8,3],[9,0],[9,1],[47,1],[47,1],[47,1],[47,1],[47,2],[47,1],[47,2],[47,2],[47,3],[56,1],[56,2],[58,6],[58,6],[57,1],[57,2],[67,5],[61,1],[61,1],[63,1],[63,1],[71,1],[71,3],[72,1],[72,3],[72,3],[72,3],[72,2],[76,1],[76,3],[77,1],[77,3],[77,3],[49,1],[49,3],[62,1],[62,1],[62,3],[62,3],[62,3],[84,1],[84,1],[84,1],[84,1],[84,1],[84,3],[84,4],[84,3],[92,1],[92,1],[92,1],[92,1],[92,1],[92,1],[92,1],[92,3],[92,4],[92,3],[89,0],[89,1],[89,3],[91,0],[91,3],[91,5],[96,1],[96,1],[97,1],[50,3],[50,3],[51,1],[52,2],[52,4],[53,2],[103,3],[103,3],[106,3],[55,1],[55,2],[108,1],[108,3],[108,3],[108,1],[108,1],[108,2],[109,4],[109,5],[105,1],[105,1],[105,3],[111,0],[111,1],[111,3],[111,5],[111,4],[113,1],[113,4],[113,3],[113,2]],
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
      console.error("Error:".red + ": in " + x.id + " you tried to provide a stability of " + firstLine + 
                ", but I didn't recognize it!");
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
      console.warn("Warning".yellow + ": name clash: " + x.id);
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
case 17: this.$ = {private: true} 
break;
case 18: this.$ = {chainable: true} 
break;
case 19: this.$ = {section: $$[$0]} 
break;
case 20: this.$ = {alias_of: $$[$0]} 
break;
case 21: this.$ = {related_to: $$[$0]} 
break;
case 22: this.$ = {belongs_to: $$[$0]} 
break;
case 23: this.$ = {extension: true} 
break;
case 24: this.$ = {metadata: JSON.parse($$[$0])} 
break;
case 32: this.$.included_mixins = $$[$0] 
break;
case 33: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 34: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 39: this.$ = {stability: $$[$0]} 
break;
case 41: 
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
                console.warn("Warning".yellow + ": Couldn't find argument ", argName, " in\n ", $$[$0], "\n--did you misspell something?");
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
                      console.warn("Warning".yellow + ": Couldn't find argument ", cbArgName, " in\n ", $$[$0], "\n--did you misspell something?");
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
case 42: this.$.returns = $$[$0] 
break;
case 43: 
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
                  console.warn("Warning".yellow + ": No callback found here. Your argument list might be incorrect.");
                  console.warn(signature);
                  console.warn($$[$0-2]);
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
case 44: this.$ = [$$[$0]] 
break;
case 45: this.$.push($$[$0]) 
break;
case 46:
       if (yy.useAsterisk) {
         console.error("Fatal".red + ": You can't use dashes for " + $$[$0-4]);
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
case 47:
      if (yy.useDash) {
         console.error("Fatal: You can't use asterisks for " + $$[$0-4]);
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
case 48: this.$ = [$$[$0]] 
break;
case 49: this.$.push($$[$0]) 
break;
case 50:
      $$[$0] = $$[$0].split("\n").map(function(element, idx) {
        return element.replace(/^\s{4}/g, '');
      });

      this.$ = {
          type: $$[$0-2][0],
          isArray: $$[$0-2].isArray,
          description: $$[$0].join("\n\n")
        };
     
break;
case 51:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("Fatal".red + ": You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 52:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("Fatal".red + ": You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 53:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("Fatal".red + ": You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 54:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("Fatal".red + ": You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 55: this.$ = [$$[$0]] 
break;
case 56: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 58: this.$ += $$[$0-1] + $$[$0] 
break;
case 59: this.$ += $$[$0-1] + $$[$0] 
break;
case 60: this.$ += $$[$0-1] + $$[$0] 
break;
case 61: this.$ += $$[$0] 
break;
case 63: this.$ += $$[$0-1] + $$[$0] 
break;
case 65: this.$ += $$[$0-1] + $$[$0] 
break;
case 66: this.$ += $$[$0-1] + $$[$0] 
break;
case 67: this.$ = [$$[$0]] 
break;
case 68: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 69: this.$ = [] 
break;
case 70: this.$ = [$$[$0]] 
break;
case 71: this.$ = [$$[$0-1]] 
break;
case 72: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 73: this.$.push($$[$0]) 
break;
case 74: this.$ = String($$[$0]) 
break;
case 75: this.$ = Number($$[$0]) 
break;
case 76: this.$ = $$[$0] === 'true' ? true : false 
break;
case 77: this.$ = new RegExp($$[$0]) 
break;
case 79: this.$ = $$[$0-1]; this.$.array = true 
break;
case 80: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 81: this.$ = $$[$0-1] 
break;
case 82: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 83: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 84: this.$ = {value: true, type: 'boolean'} 
break;
case 85: this.$ = {value: false, type: 'boolean'} 
break;
case 86: this.$ = {value: null, type: 'null'} 
break;
case 87: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 88: this.$ = {value: $$[$0], type: 'name'} 
break;
case 89: this.$ = $$[$0-1]; this.$.array = true 
break;
case 90: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 91: this.$ = $$[$0-1] 
break;
case 92: this.$ = [] 
break;
case 93: this.$ = [$$[$0]] 
break;
case 94: this.$.push($$[$0]) 
break;
case 95: this.$ = {} 
break;
case 96: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 97: this.$[$$[$0-2]] = $$[$0] 
break;
case 101: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 102: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 103: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 104: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 105: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 106: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 107: 
      if (yy.useComma) {
        console.error("Fatal".red + ": You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 108: 
      if (yy.useArrow) {
        console.error("Fatal".red + ": You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 109: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 110:
    this.$ = $$[$0];
    this.$.signatures = [{arguments: $$[$0].arguments, returns: $$[$0].returns}];
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 111:
    this.$.signatures.push({arguments: $$[$0].arguments, returns: $$[$0].returns});
    delete this.$.arguments;
    delete this.$.returns;
  
break;
case 113:
      if (yy.useArrow) {
        console.error("Fatal".red + ": You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 114:
      if (yy.useComma) {
        console.error("Fatal".red + ": You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 117: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 118: this.$ = {id: $$[$0-3], type: 'method', arguments: $$[$0-1]} 
break;
case 119: this.$ = {id: $$[$0-4], type: 'method', arguments: $$[$0-1], bound: true} 
break;
case 120: this.$ = [{type: '?'}] 
break;
case 121:
    var x = $$[$0];
    var ret = {
      type: String(x)
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 122:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 123: this.$ = [] 
break;
case 124: this.$ = [$$[$0]] 
break;
case 125: this.$.push($$[$0]) 
break;
case 126:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 127:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 128: this.$ = {name: $$[$0]} 
break;
case 129: this.$ = {name: $$[$0-3], arguments: $$[$0-1], callback: true}; 
break;
case 130: this.$.default_value = $$[$0] 
break;
case 131: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],21:[1,11],22:[1,12],23:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],29:[1,19],30:[1,20],31:[1,21],54:[2,4],60:[2,4],98:[2,4],100:[2,4],102:[2,4],110:[2,4]},{8:22,47:23,50:24,51:25,52:26,53:27,54:[1,28],55:29,60:[1,40],76:35,77:31,98:[1,30],100:[1,32],102:[1,33],103:37,106:38,108:34,109:36,110:[1,39]},{13:[1,41],54:[2,5],60:[2,5],98:[2,5],100:[2,5],102:[2,5],110:[2,5]},{13:[2,6],54:[2,6],60:[2,6],98:[2,6],100:[2,6],102:[2,6],110:[2,6]},{13:[2,8],15:[1,42],54:[2,8],60:[2,8],98:[2,8],100:[2,8],102:[2,8],110:[2,8]},{13:[2,11],54:[2,11],60:[2,11],98:[2,11],100:[2,11],102:[2,11],110:[2,11]},{13:[2,12],15:[1,43],54:[2,12],60:[2,12],98:[2,12],100:[2,12],102:[2,12],110:[2,12]},{13:[2,14],54:[2,14],60:[2,14],98:[2,14],100:[2,14],102:[2,14],110:[2,14]},{13:[2,15],54:[2,15],60:[2,15],98:[2,15],100:[2,15],102:[2,15],110:[2,15]},{13:[2,16],54:[2,16],60:[2,16],98:[2,16],100:[2,16],102:[2,16],110:[2,16]},{13:[2,17],54:[2,17],60:[2,17],98:[2,17],100:[2,17],102:[2,17],110:[2,17]},{13:[2,18],54:[2,18],60:[2,18],98:[2,18],100:[2,18],102:[2,18],110:[2,18]},{15:[1,44]},{15:[1,45]},{15:[1,46]},{15:[1,47]},{13:[2,23],54:[2,23],60:[2,23],98:[2,23],100:[2,23],102:[2,23],110:[2,23]},{13:[2,24],54:[2,24],60:[2,24],98:[2,24],100:[2,24],102:[2,24],110:[2,24]},{9:48,10:[2,33],20:[1,49]},{10:[2,31],20:[2,31],48:[1,50]},{10:[2,35],20:[2,35],48:[2,35]},{10:[2,36],20:[2,36],48:[2,36]},{10:[2,37],20:[2,37],48:[2,37]},{10:[2,38],20:[2,38],48:[2,38]},{32:51,33:[1,52],36:[1,53],38:[1,54],40:[1,55],42:[1,56],45:[1,57]},{10:[2,40],20:[2,40],48:[2,40],56:58,57:59,58:61,59:[1,63],60:[1,40],64:[1,64],67:62,68:[1,65],76:35,77:66,103:37,106:38,108:60,109:36,110:[1,39]},{60:[1,68],99:[1,67]},{10:[2,103],13:[1,71],20:[2,103],48:[2,103],69:[1,69],104:[1,70],107:[1,72]},{60:[1,40],76:35,77:73},{60:[1,40],76:35,77:74},{10:[2,110],20:[2,110],48:[2,110],59:[2,110],60:[2,110],64:[2,110],68:[2,110],110:[2,110]},{10:[2,64],13:[2,64],20:[2,64],48:[2,64],59:[2,64],60:[2,64],64:[2,64],66:[2,64],68:[2,64],69:[2,64],70:[2,64],73:[1,77],74:[1,76],78:[1,75],80:[2,64],81:[2,64],82:[2,64],83:[2,64],90:[2,64],101:[2,64],104:[2,64],107:[2,64],110:[2,64],112:[2,64]},{10:[2,112],13:[1,78],20:[2,112],48:[2,112],59:[2,112],60:[2,112],64:[2,112],68:[2,112],104:[1,79],110:[2,112]},{10:[2,115],20:[2,115],48:[2,115],59:[2,115],60:[2,115],64:[2,115],68:[2,115],110:[2,115]},{10:[2,116],20:[2,116],48:[2,116],59:[2,116],60:[2,116],64:[2,116],68:[2,116],110:[2,116]},{60:[1,40],76:35,77:81,109:80},{10:[2,62],13:[2,62],20:[2,62],48:[2,62],59:[2,62],60:[2,62],64:[2,62],66:[2,62],68:[2,62],69:[2,62],70:[2,62],73:[2,62],74:[2,62],78:[2,62],80:[2,62],81:[2,62],82:[2,62],83:[2,62],90:[2,62],101:[2,62],104:[2,62],107:[2,62],110:[2,62],112:[2,62]},{12:82,14:[1,8],18:[1,9],19:[1,10],21:[1,11],22:[1,12],23:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],29:[1,19],30:[1,20],31:[1,21]},{16:[1,83]},{20:[1,84]},{20:[1,85]},{20:[1,86]},{20:[1,87]},{20:[1,88]},{10:[1,89]},{10:[2,34]},{49:90,60:[1,40],76:35,77:91},{10:[2,39],20:[2,39],48:[2,39]},{34:[1,92]},{34:[1,93]},{34:[1,94]},{34:[1,95]},{34:[1,96]},{34:[1,97]},{10:[2,41],20:[2,41],48:[2,41],57:98,58:99,59:[1,63],64:[1,64],67:62,68:[1,65]},{10:[2,42],20:[2,42],48:[2,42],67:100,68:[1,65]},{10:[2,111],20:[2,111],48:[2,111],59:[2,111],60:[2,111],64:[2,111],68:[2,111],110:[2,111]},{10:[2,44],20:[2,44],48:[2,44],59:[2,44],64:[2,44],68:[2,44]},{10:[2,48],20:[2,48],48:[2,48],68:[2,48]},{60:[1,101]},{60:[1,102]},{61:103,65:[1,105],69:[1,104]},{13:[1,71],69:[1,69],104:[1,70],107:[1,72]},{98:[1,106]},{98:[1,107]},{13:[2,123],60:[1,111],74:[1,109],81:[2,123],111:108,112:[2,123],113:110},{60:[1,40],65:[1,122],76:35,77:120,79:[1,113],81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:114,105:112},{60:[1,40],65:[1,122],76:35,77:120,79:[1,113],81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:114,105:123},{60:[1,40],65:[1,122],76:35,77:120,79:[1,113],81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:114,105:124},{10:[2,104],20:[2,104],48:[2,104],101:[1,125]},{10:[2,106],20:[2,106],48:[2,106]},{60:[1,126]},{60:[1,128],72:127},{60:[1,129]},{60:[1,40],65:[1,122],76:35,77:120,79:[1,113],81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:114,105:130},{60:[1,40],65:[1,122],76:35,77:120,79:[1,113],81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:114,105:131},{10:[2,117],20:[2,117],48:[2,117],59:[2,117],60:[2,117],64:[2,117],68:[2,117],110:[2,117]},{69:[1,69]},{13:[2,7],54:[2,7],60:[2,7],98:[2,7],100:[2,7],102:[2,7],110:[2,7]},{13:[2,9],17:[1,132],54:[2,9],60:[2,9],98:[2,9],100:[2,9],102:[2,9],110:[2,9]},{13:[2,13],54:[2,13],60:[2,13],98:[2,13],100:[2,13],102:[2,13],110:[2,13]},{13:[2,19],54:[2,19],60:[2,19],98:[2,19],100:[2,19],102:[2,19],110:[2,19]},{13:[2,20],54:[2,20],60:[2,20],98:[2,20],100:[2,20],102:[2,20],110:[2,20]},{13:[2,21],54:[2,21],60:[2,21],98:[2,21],100:[2,21],102:[2,21],110:[2,21]},{13:[2,22],54:[2,22],60:[2,22],98:[2,22],100:[2,22],102:[2,22],110:[2,22]},{5:[2,3],6:[2,3]},{10:[2,32],13:[1,133],20:[2,32]},{10:[2,67],13:[2,67],20:[2,67]},{35:[1,134]},{37:[1,135]},{39:[1,136]},{41:[1,137]},{43:[1,138]},{46:[1,139]},{10:[2,43],20:[2,43],48:[2,43],67:100,68:[1,65]},{10:[2,45],20:[2,45],48:[2,45],59:[2,45],64:[2,45],68:[2,45]},{10:[2,49],20:[2,49],48:[2,49],68:[2,49]},{61:140,65:[1,105],69:[1,104]},{65:[1,141]},{60:[1,40],62:142,76:35,77:144,79:[1,143],80:[1,145],81:[1,146]},{60:[2,51],79:[2,51],80:[2,51],81:[2,51]},{60:[2,52],79:[2,52],80:[2,52],81:[2,52]},{10:[2,101],20:[2,101],48:[2,101]},{10:[2,102],20:[2,102],48:[2,102]},{13:[1,148],81:[1,149],112:[1,147]},{13:[2,123],60:[1,111],81:[2,123],111:150,112:[2,123],113:110},{13:[2,124],81:[2,124],82:[2,124],90:[1,152],107:[1,151],112:[2,124]},{13:[2,128],69:[1,153],81:[2,128],82:[2,128],90:[2,128],107:[2,128],112:[2,128]},{10:[2,107],20:[2,107],48:[2,107],59:[2,107],60:[2,107],64:[2,107],68:[2,107],83:[1,154],110:[2,107]},{10:[2,120],20:[2,120],48:[2,120],59:[2,120],60:[2,120],64:[2,120],68:[2,120],83:[2,120],110:[2,120]},{10:[2,121],20:[2,121],48:[2,121],59:[2,121],60:[2,121],64:[2,121],68:[2,121],83:[2,121],110:[2,121]},{10:[2,100],13:[2,100],20:[2,100],48:[2,100],59:[2,100],60:[2,100],64:[2,100],68:[2,100],81:[2,100],82:[2,100],83:[2,100],90:[2,100],107:[2,100],110:[2,100],112:[2,100]},{10:[2,74],13:[2,74],20:[2,74],48:[2,74],59:[2,74],60:[2,74],64:[2,74],66:[2,74],68:[2,74],81:[2,74],82:[2,74],83:[2,74],90:[2,74],107:[2,74],110:[2,74],112:[2,74]},{10:[2,75],13:[2,75],20:[2,75],48:[2,75],59:[2,75],60:[2,75],64:[2,75],66:[2,75],68:[2,75],81:[2,75],82:[2,75],83:[2,75],90:[2,75],107:[2,75],110:[2,75],112:[2,75]},{10:[2,76],13:[2,76],20:[2,76],48:[2,76],59:[2,76],60:[2,76],64:[2,76],66:[2,76],68:[2,76],81:[2,76],82:[2,76],83:[2,76],90:[2,76],107:[2,76],110:[2,76],112:[2,76]},{10:[2,77],13:[2,77],20:[2,77],48:[2,77],59:[2,77],60:[2,77],64:[2,77],66:[2,77],68:[2,77],81:[2,77],82:[2,77],83:[2,77],90:[2,77],107:[2,77],110:[2,77],112:[2,77]},{10:[2,78],13:[2,78],20:[2,78],48:[2,78],59:[2,78],60:[2,78],64:[2,78],66:[2,78],68:[2,78],81:[2,78],82:[2,78],83:[2,78],90:[2,78],107:[2,78],110:[2,78],112:[2,78]},{13:[2,92],60:[1,40],65:[1,122],76:35,77:120,81:[1,121],82:[2,92],84:156,85:[1,116],86:[1,117],87:[1,118],88:[1,119],89:155,90:[2,92]},{13:[2,95],60:[1,160],66:[2,95],85:[1,159],91:157,96:158},{10:[2,108],20:[2,108],48:[2,108],59:[2,108],60:[2,108],64:[2,108],68:[2,108],83:[1,154],110:[2,108]},{10:[2,109],20:[2,109],48:[2,109],59:[2,109],60:[2,109],64:[2,109],68:[2,109],83:[1,154],110:[2,109]},{60:[1,40],76:35,77:161},{10:[2,65],13:[2,65],20:[2,65],48:[2,65],59:[2,65],60:[2,65],64:[2,65],66:[2,65],68:[2,65],69:[2,65],70:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],90:[2,65],101:[2,65],104:[2,65],107:[2,65],110:[2,65],112:[2,65]},{10:[2,66],13:[2,66],15:[1,162],20:[2,66],48:[2,66],59:[2,66],60:[2,66],64:[2,66],66:[2,66],68:[2,66],69:[2,66],70:[2,66],73:[1,163],74:[1,164],75:[1,165],80:[2,66],81:[2,66],82:[2,66],83:[2,66],90:[2,66],101:[2,66],104:[2,66],107:[2,66],110:[2,66],112:[2,66]},{10:[2,57],13:[2,57],15:[2,57],20:[2,57],48:[2,57],59:[2,57],60:[2,57],64:[2,57],66:[2,57],68:[2,57],69:[2,57],70:[2,57],73:[2,57],74:[2,57],75:[2,57],80:[2,57],81:[2,57],82:[2,57],83:[2,57],90:[2,57],101:[2,57],104:[2,57],107:[2,57],110:[2,57],112:[2,57]},{10:[2,63],13:[2,63],20:[2,63],48:[2,63],59:[2,63],60:[2,63],64:[2,63],66:[2,63],68:[2,63],69:[2,63],70:[2,63],73:[2,63],74:[2,63],78:[2,63],80:[2,63],81:[2,63],82:[2,63],83:[2,63],90:[2,63],101:[2,63],104:[2,63],107:[2,63],110:[2,63],112:[2,63]},{10:[2,113],20:[2,113],48:[2,113],59:[2,113],60:[2,113],64:[2,113],68:[2,113],83:[1,154],110:[2,113]},{10:[2,114],20:[2,114],48:[2,114],59:[2,114],60:[2,114],64:[2,114],68:[2,114],83:[1,154],110:[2,114]},{16:[1,166]},{60:[1,40],76:35,77:167},{10:[2,25],20:[2,25],48:[2,25]},{10:[2,26],20:[2,26],48:[2,26]},{10:[2,27],20:[2,27],48:[2,27]},{10:[2,28],20:[2,28],48:[2,28]},{44:[1,168]},{10:[2,30],20:[2,30],48:[2,30]},{60:[1,40],62:169,76:35,77:144,79:[1,143],80:[1,145],81:[1,146]},{60:[1,40],62:170,76:35,77:144,79:[1,143],80:[1,145],81:[1,146]},{63:171,66:[1,174],70:[1,173],83:[1,172]},{66:[2,69],70:[2,69],83:[2,69]},{66:[2,70],70:[2,70],83:[2,70]},{60:[1,40],76:35,77:175},{60:[1,40],76:35,77:176},{10:[2,118],13:[2,118],20:[2,118],48:[2,118],59:[2,118],60:[2,118],64:[2,118],68:[2,118],104:[2,118],110:[2,118]},{60:[1,111],81:[1,178],113:177},{13:[2,123],60:[1,111],81:[2,123],82:[2,123],111:179,113:110},{13:[1,148],81:[1,149],112:[1,180]},{60:[1,40],65:[1,122],76:35,77:120,81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:181},{13:[2,131],81:[2,131],82:[2,131],90:[2,131],107:[2,131],112:[2,131]},{13:[2,123],60:[1,111],81:[2,123],111:182,112:[2,123],113:110},{60:[1,40],65:[1,122],76:35,77:120,81:[1,121],84:115,85:[1,116],86:[1,117],87:[1,118],88:[1,119],97:183},{13:[1,186],82:[1,184],90:[1,185]},{13:[2,93],82:[2,93],90:[2,93]},{13:[1,188],66:[1,187]},{15:[1,189]},{15:[2,98]},{15:[2,99]},{10:[2,105],20:[2,105],48:[2,105]},{60:[1,190]},{60:[1,191]},{60:[1,192]},{10:[2,61],13:[2,61],15:[2,61],20:[2,61],48:[2,61],59:[2,61],60:[2,61],64:[2,61],66:[2,61],68:[2,61],69:[2,61],70:[2,61],73:[2,61],74:[2,61],75:[2,61],80:[2,61],81:[2,61],82:[2,61],83:[2,61],90:[2,61],101:[2,61],104:[2,61],107:[2,61],110:[2,61],112:[2,61]},{13:[2,10],54:[2,10],60:[2,10],98:[2,10],100:[2,10],102:[2,10],110:[2,10]},{10:[2,68],13:[2,68],20:[2,68]},{10:[2,29],20:[2,29],48:[2,29]},{63:193,66:[1,174],70:[1,173],83:[1,172]},{66:[1,194],83:[1,172]},{20:[1,195]},{60:[1,40],76:35,77:196},{20:[2,53]},{20:[2,54]},{80:[1,197]},{82:[1,198]},{13:[2,125],81:[2,125],82:[2,125],90:[1,152],107:[1,151],112:[2,125]},{13:[2,123],60:[1,111],81:[2,123],82:[2,123],111:199,113:110},{13:[1,148],81:[1,149],82:[1,200]},{10:[2,119],13:[2,119],20:[2,119],48:[2,119],59:[2,119],60:[2,119],64:[2,119],68:[2,119],104:[2,119],110:[2,119]},{13:[2,130],81:[2,130],82:[2,130],90:[2,130],107:[2,130],112:[2,130]},{13:[1,148],81:[1,149],112:[1,201]},{10:[2,122],20:[2,122],48:[2,122],59:[2,122],60:[2,122],64:[2,122],68:[2,122],83:[2,122],110:[2,122]},{10:[2,79],13:[2,79],20:[2,79],48:[2,79],59:[2,79],60:[2,79],64:[2,79],66:[2,79],68:[2,79],81:[2,79],82:[2,79],83:[2,79],90:[2,79],107:[2,79],110:[2,79],112:[2,79]},{82:[1,202]},{60:[1,40],65:[1,122],76:35,77:120,81:[1,121],84:203,85:[1,116],86:[1,117],87:[1,118],88:[1,119]},{10:[2,81],13:[2,81],20:[2,81],48:[2,81],59:[2,81],60:[2,81],64:[2,81],66:[2,81],68:[2,81],81:[2,81],82:[2,81],83:[2,81],90:[2,81],107:[2,81],110:[2,81],112:[2,81]},{60:[1,160],85:[1,159],96:204},{60:[1,40],65:[1,122],76:35,77:120,81:[1,121],84:205,85:[1,116],86:[1,117],87:[1,118],88:[1,119]},{10:[2,58],13:[2,58],15:[2,58],20:[2,58],48:[2,58],59:[2,58],60:[2,58],64:[2,58],66:[2,58],68:[2,58],69:[2,58],70:[2,58],73:[2,58],74:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],90:[2,58],101:[2,58],104:[2,58],107:[2,58],110:[2,58],112:[2,58]},{10:[2,59],13:[2,59],15:[2,59],20:[2,59],48:[2,59],59:[2,59],60:[2,59],64:[2,59],66:[2,59],68:[2,59],69:[2,59],70:[2,59],73:[2,59],74:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],90:[2,59],101:[2,59],104:[2,59],107:[2,59],110:[2,59],112:[2,59]},{10:[2,60],13:[2,60],15:[2,60],20:[2,60],48:[2,60],59:[2,60],60:[2,60],64:[2,60],66:[2,60],68:[2,60],69:[2,60],70:[2,60],73:[2,60],74:[2,60],75:[2,60],80:[2,60],81:[2,60],82:[2,60],83:[2,60],90:[2,60],101:[2,60],104:[2,60],107:[2,60],110:[2,60],112:[2,60]},{20:[1,206]},{20:[1,207]},{10:[2,50],20:[2,50],48:[2,50],68:[2,50]},{66:[2,73],70:[2,73],83:[2,73]},{66:[2,71],70:[2,71],83:[2,71]},{66:[2,72],70:[2,72],83:[2,72]},{13:[1,148],81:[1,149],82:[1,208]},{13:[2,127],81:[2,127],82:[2,127],112:[2,127]},{13:[2,129],81:[2,129],82:[2,129],90:[2,129],107:[2,129],112:[2,129]},{10:[2,80],13:[2,80],20:[2,80],48:[2,80],59:[2,80],60:[2,80],64:[2,80],66:[2,80],68:[2,80],81:[2,80],82:[2,80],83:[2,80],90:[2,80],107:[2,80],110:[2,80],112:[2,80]},{13:[2,94],82:[2,94],90:[2,94]},{15:[1,209]},{13:[2,96],66:[2,96]},{10:[2,46],20:[2,46],48:[2,46],59:[2,46],64:[2,46],68:[2,46]},{10:[2,47],20:[2,47],48:[2,47],59:[2,47],64:[2,47],68:[2,47]},{13:[2,126],81:[2,126],82:[2,126],112:[2,126]},{60:[1,40],65:[1,122],76:35,77:120,81:[1,121],84:210,85:[1,116],86:[1,117],87:[1,118],88:[1,119]},{13:[2,97],66:[2,97]}],
defaultActions: {3:[2,1],49:[2,34],159:[2,98],160:[2,99],173:[2,53],174:[2,54]},
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
case 9:return 78
break;
case 10:return 73
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 86
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
case 23:return 27
break;
case 24:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 27
break;
case 25:return 28
break;
case 26:return 28
break;
case 27:return 29
break;
case 28:return 30
break;
case 29:return 31
break;
case 30:return 20
break;
case 31:return 75
break;
case 32:this.popState(); return 10
break;
case 33:return 20
break;
case 34:/* skip whitespaces */
break;
case 35:this.begin('arg'); return 70
break;
case 36:this.begin('arg'); return 66
break;
case 37:return 64
break;
case 38:return 59
break;
case 39:return 68
break;
case 40:return 'FIRES'
break;
case 41:return 48
break;
case 42:/*return '*'*/
break;
case 43:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 85
break;
case 44:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 85
break;
case 45:return 86
break;
case 46:return 88
break;
case 47:return 87
break;
case 48:return 87
break;
case 49:return 78
break;
case 50:return 74
break;
case 51:return 79
break;
case 52:return 90
break;
case 53:return 73
break;
case 54:return 13
break;
case 55:return 104
break;
case 56:return 98
break;
case 57:return 107
break;
case 58:return 101
break;
case 59:return 15
break;
case 60:return 69
break;
case 61:return 112
break;
case 62:return 65
break;
case 63:return 66
break;
case 64:return 81
break;
case 65:return 82
break;
case 66:return 83
break;
case 67:return 80
break;
case 68:return 100
break;
case 69:return 102
break;
case 70:return 110
break;
case 71:return 60
break;
case 72:return 85
break;
case 73:return 75
break;
case 74:this.popState(); return 20
break;
case 75:this.popState(); console.log('LEFTCOMM'); return 20
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:[0-9]+(?:\.[0-9]+)*\b)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:bubbles\b)/,/^(?:cancelable\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:private\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:see\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:((?:\{["':$_a-zA-Z0-9 \,]*\})))/,/^(?:.+)/,/^(?:((?:[^@(\s]+)))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z0-9 ]*)))/,/^(?:((?:[^@(\s]+)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":false},"def":{"rules":[0,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73],"inclusive":false},"arg":{"rules":[0,74],"inclusive":false},"comment":{"rules":[0,75],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = pdoc;
exports.parse = function () { return pdoc.parse.apply(pdoc, arguments); }
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