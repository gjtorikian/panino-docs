/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"panino":28,"INCLUDES":29,"names":30,"TEXT":31,"section":32,"namespace":33,"class":34,"mixin":35,"signatures":36,"argument_descriptions":37,"return_descriptions":38,"argument_description":39,"*-":40,"NAME":41,"{":42,"names_alternation":43,"}":44,"**":45,"return_description":46,"*+":47,"(":48,")":49,"):":50,"events":51,"event":52,".":53,"#":54,"@":55,"?":56,"`":57,"[":58,"]":59,"|":60,"value":61,"STRING":62,"BOOLEAN":63,"REGEXP":64,"value_list":65,"...":66,"key_value_list":67,"value2":68,"TRUE":69,"FALSE":70,"NULL":71,"key":72,"name_or_value":73,"==":74,"string":75,"CLASS":76,"<":77,"MIXIN":78,"property":79,"->":80,"returns":81,"constant":82,"=":83,"signature":84,"method":85,"NEW":86,"args":87,"arg":88,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",29:"INCLUDES",31:"TEXT",40:"*-",41:"NAME",42:"{",44:"}",45:"**",47:"*+",48:"(",49:")",50:"):",53:".",54:"#",55:"@",56:"?",57:"`",58:"[",59:"]",60:"|",62:"STRING",63:"BOOLEAN",64:"REGEXP",66:"...",69:"TRUE",70:"FALSE",71:"NULL",74:"==",75:"string",76:"CLASS",77:"<",78:"MIXIN",80:"->",83:"=",86:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[8,1],[8,3],[9,0],[9,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,2],[28,2],[28,3],[37,1],[37,2],[39,6],[39,6],[38,1],[38,2],[46,4],[46,5],[51,1],[51,3],[52,1],[52,3],[23,1],[23,3],[23,3],[23,3],[30,1],[30,3],[43,1],[43,1],[43,3],[43,3],[43,3],[61,1],[61,1],[61,1],[61,1],[61,1],[61,3],[61,4],[61,3],[68,1],[68,1],[68,1],[68,1],[68,1],[68,1],[68,1],[68,3],[68,4],[68,3],[65,0],[65,1],[65,3],[67,0],[67,3],[67,5],[72,1],[72,1],[73,1],[32,3],[32,3],[33,1],[34,2],[34,4],[35,2],[79,3],[79,3],[82,3],[36,1],[36,2],[84,1],[84,3],[84,3],[84,1],[84,1],[84,2],[85,4],[85,5],[81,1],[81,1],[81,3],[87,0],[87,1],[87,3],[87,5],[87,4],[88,1],[88,4],[88,3],[88,2]],
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

    // trim leading spaces from description (might be buggy with namp, consider removing)
    var lead = desq.match(/^\s+/);
    if (lead) {
      var re = new RegExp('\n' + lead[0], 'g');
      desq = desq.substring(lead[0].length).replace(re, '\n');
    }
    x.description = desq.trim();

    // short description lasts until the first empty line
    x.short_description = x.description.replace(/\n\n[\s\S]*$/, '\n');
    
    x.ellipsis_description = x.short_description;
    if (x.ellipsis_description.length > 120)
    {
      x.ellipsis_description = x.ellipsis_description.substring(0, 120 - 4) + "..."
    }
    else
      x.ellipsis_description = x.ellipsis_description + " ..."

    x.line = ($$[$0-1].line + 1);
    // register
    if (this.$[x.id]) {
      console.error('FATAL: name clash: ' + x.id);
      process.exit(1);
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
case 9: this.$ = {deprecated: {from: $$[$0]}} 
break;
case 10: this.$ = {deprecated: {from: $$[$0-2], off: $$[$0]}} 
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
case 21: this.$.included_mixins = $$[$0] 
break;
case 22: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 23: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 29: this.$.arguments = $$[$0] 
break;
case 30: this.$.retDesc = $$[$0] 
break;
case 31: this.$.arguments = $$[$0-1]; this.$.retDesc = $$[$0] 
break;
case 32: this.$ = [$$[$0]] 
break;
case 33: this.$.push($$[$0]) 
break;
case 34:
       if (yy.useAsterisk) {
         console.error("FATAL: You can't use dashes for " + $$[$0-4]);
         process.exit(1);
       }
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    
break;
case 35:
       if (yy.useDash) {
         console.error("FATAL: You can't use asterisks for " + $$[$0-4]);
         process.exit(1);
       }
      this.$ = {
        name: $$[$0-4],
        types: $$[$0-2],
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
    
break;
case 36: this.$ = [$$[$0]] 
break;
case 37: this.$.push($$[$0]) 
break;
case 38:
       this.$ = { types: $$[$0-1]} 
     
break;
case 39:
      this.$ = {
        types: $$[$0-2],
        isArray: $$[$0-2].isArray,
        description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
      };
     
break;
case 40: this.$ = [$$[$0]] 
break;
case 41: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 43: this.$ += $$[$0-1] + $$[$0] 
break;
case 45: this.$ += $$[$0-1] + $$[$0] 
break;
case 46: this.$ += $$[$0-1] + $$[$0] 
break;
case 47: this.$ += $$[$0-1] + $$[$0] 
break;
case 48: this.$ = [$$[$0]] 
break;
case 49: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 50: this.$ = [] 
break;
case 51: this.$ = [$$[$0]] 
break;
case 52: this.$ = [$$[$0-1]] 
break;
case 53: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 54: this.$.push($$[$0]) 
break;
case 55: this.$ = String($$[$0]) 
break;
case 56: this.$ = Number($$[$0]) 
break;
case 57: this.$ = $$[$0] === 'true' ? true : false 
break;
case 58: this.$ = new RegExp($$[$0]) 
break;
case 60: this.$ = $$[$0-1]; this.$.array = true 
break;
case 61: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 62: this.$ = $$[$0-1] 
break;
case 63: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 64: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 65: this.$ = {value: true, type: 'boolean'} 
break;
case 66: this.$ = {value: false, type: 'boolean'} 
break;
case 67: this.$ = {value: null, type: 'null'} 
break;
case 68: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 69: this.$ = {value: $$[$0], type: 'name'} 
break;
case 70: this.$ = $$[$0-1]; this.$.array = true 
break;
case 71: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 72: this.$ = $$[$0-1] 
break;
case 73: this.$ = [] 
break;
case 74: this.$ = [$$[$0]] 
break;
case 75: this.$.push($$[$0]) 
break;
case 76: this.$ = {} 
break;
case 77: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 78: this.$[$$[$0-2]] = $$[$0] 
break;
case 82: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 83: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 84: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 85: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 86: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 87: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 88: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 89: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 90: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 91:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 92:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 94:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 95:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 98: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 99: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 100: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 101: this.$ = [{type: '?'}] 
break;
case 102:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 103:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 104: this.$ = [] 
break;
case 105: this.$ = [$$[$0]] 
break;
case 106: this.$.push($$[$0]) 
break;
case 107:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 108:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 109: this.$ = {name: $$[$0]} 
break;
case 110: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 111: this.$.default_value = $$[$0] 
break;
case 112: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],41:[2,4],74:[2,4],76:[2,4],78:[2,4],86:[2,4]},{8:18,23:26,28:19,32:20,33:21,34:22,35:23,36:24,41:[1,30],74:[1,25],76:[1,27],78:[1,28],79:32,82:33,84:29,85:31,86:[1,34]},{13:[1,35],41:[2,5],74:[2,5],76:[2,5],78:[2,5],86:[2,5]},{13:[2,6],41:[2,6],74:[2,6],76:[2,6],78:[2,6],86:[2,6]},{13:[2,8],15:[1,36],41:[2,8],74:[2,8],76:[2,8],78:[2,8],86:[2,8]},{13:[2,11],41:[2,11],74:[2,11],76:[2,11],78:[2,11],86:[2,11]},{13:[2,12],41:[2,12],74:[2,12],76:[2,12],78:[2,12],86:[2,12]},{13:[2,13],41:[2,13],74:[2,13],76:[2,13],78:[2,13],86:[2,13]},{13:[2,14],41:[2,14],74:[2,14],76:[2,14],78:[2,14],86:[2,14]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{15:[1,40]},{13:[2,19],41:[2,19],74:[2,19],76:[2,19],78:[2,19],86:[2,19]},{9:41,10:[2,22],31:[1,42]},{10:[2,20],29:[1,43],31:[2,20]},{10:[2,24],29:[2,24],31:[2,24]},{10:[2,25],29:[2,25],31:[2,25]},{10:[2,26],29:[2,26],31:[2,26]},{10:[2,27],29:[2,27],31:[2,27]},{10:[2,28],23:52,29:[2,28],31:[2,28],37:44,38:45,39:47,40:[1,49],41:[1,30],45:[1,50],46:48,47:[1,51],79:32,82:33,84:46,85:31,86:[1,34]},{41:[1,54],75:[1,53]},{10:[2,84],13:[1,60],29:[2,84],31:[2,84],48:[1,58],53:[1,55],54:[1,56],55:[1,57],80:[1,59],83:[1,61]},{23:62,41:[1,30]},{23:63,41:[1,30]},{10:[2,91],29:[2,91],31:[2,91],40:[2,91],41:[2,91],45:[2,91],47:[2,91],86:[2,91]},{10:[2,44],13:[2,44],29:[2,44],31:[2,44],40:[2,44],41:[2,44],44:[2,44],45:[2,44],47:[2,44],48:[2,44],49:[2,44],50:[2,44],53:[2,44],54:[2,44],55:[2,44],57:[2,44],58:[2,44],59:[2,44],60:[2,44],66:[2,44],74:[2,44],76:[2,44],77:[2,44],78:[2,44],80:[2,44],83:[2,44],86:[2,44]},{10:[2,93],13:[1,64],29:[2,93],31:[2,93],40:[2,93],41:[2,93],45:[2,93],47:[2,93],80:[1,65],86:[2,93]},{10:[2,96],29:[2,96],31:[2,96],40:[2,96],41:[2,96],45:[2,96],47:[2,96],86:[2,96]},{10:[2,97],29:[2,97],31:[2,97],40:[2,97],41:[2,97],45:[2,97],47:[2,97],86:[2,97]},{23:67,41:[1,30],85:66},{12:68,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17]},{16:[1,69]},{23:70,41:[1,30]},{23:71,41:[1,30]},{23:72,41:[1,30]},{23:73,41:[1,30]},{10:[1,74]},{10:[2,23]},{23:76,30:75,41:[1,30]},{10:[2,29],29:[2,29],31:[2,29],38:77,39:78,40:[1,49],45:[1,50],46:48,47:[1,51]},{10:[2,30],29:[2,30],31:[2,30],46:79,47:[1,51]},{10:[2,92],29:[2,92],31:[2,92],40:[2,92],41:[2,92],45:[2,92],47:[2,92],86:[2,92]},{10:[2,32],29:[2,32],31:[2,32],40:[2,32],45:[2,32],47:[2,32]},{10:[2,36],29:[2,36],31:[2,36],47:[2,36]},{41:[1,80]},{41:[1,81]},{48:[1,82]},{13:[1,60],48:[1,58],53:[1,55],54:[1,56],55:[1,57],80:[1,59],83:[1,61]},{74:[1,83]},{74:[1,84]},{41:[1,85]},{41:[1,86]},{41:[1,87]},{13:[2,104],41:[1,91],49:[2,104],55:[1,89],58:[2,104],87:88,88:90},{16:[1,97],23:100,41:[1,30],42:[1,102],56:[1,93],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:94,81:92},{16:[1,97],23:100,41:[1,30],42:[1,102],56:[1,93],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:94,81:103},{16:[1,97],23:100,41:[1,30],42:[1,102],56:[1,93],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:94,81:104},{10:[2,85],29:[2,85],31:[2,85],53:[1,55],54:[1,56],55:[1,57],77:[1,105]},{10:[2,87],29:[2,87],31:[2,87],53:[1,55],54:[1,56],55:[1,57]},{16:[1,97],23:100,41:[1,30],42:[1,102],56:[1,93],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:94,81:106},{16:[1,97],23:100,41:[1,30],42:[1,102],56:[1,93],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:94,81:107},{10:[2,98],29:[2,98],31:[2,98],40:[2,98],41:[2,98],45:[2,98],47:[2,98],86:[2,98]},{48:[1,58],53:[1,55],54:[1,56],55:[1,57]},{13:[2,7],41:[2,7],74:[2,7],76:[2,7],78:[2,7],86:[2,7]},{13:[2,9],17:[1,108],41:[2,9],74:[2,9],76:[2,9],78:[2,9],86:[2,9]},{13:[2,15],41:[2,15],53:[1,55],54:[1,56],55:[1,57],74:[2,15],76:[2,15],78:[2,15],86:[2,15]},{13:[2,16],41:[2,16],53:[1,55],54:[1,56],55:[1,57],74:[2,16],76:[2,16],78:[2,16],86:[2,16]},{13:[2,17],41:[2,17],53:[1,55],54:[1,56],55:[1,57],74:[2,17],76:[2,17],78:[2,17],86:[2,17]},{13:[2,18],41:[2,18],53:[1,55],54:[1,56],55:[1,57],74:[2,18],76:[2,18],78:[2,18],86:[2,18]},{5:[2,3],6:[2,3]},{10:[2,21],13:[1,109],31:[2,21]},{10:[2,48],13:[2,48],31:[2,48],53:[1,55],54:[1,56],55:[1,57]},{10:[2,31],29:[2,31],31:[2,31],46:79,47:[1,51]},{10:[2,33],29:[2,33],31:[2,33],40:[2,33],45:[2,33],47:[2,33]},{10:[2,37],29:[2,37],31:[2,37],47:[2,37]},{42:[1,110]},{42:[1,111]},{23:114,41:[1,30],43:112,56:[1,113],57:[1,115],58:[1,116]},{10:[2,82],29:[2,82],31:[2,82]},{10:[2,83],29:[2,83],31:[2,83]},{10:[2,45],13:[2,45],29:[2,45],31:[2,45],40:[2,45],41:[2,45],44:[2,45],45:[2,45],47:[2,45],48:[2,45],49:[2,45],50:[2,45],53:[2,45],54:[2,45],55:[2,45],57:[2,45],58:[2,45],59:[2,45],60:[2,45],66:[2,45],74:[2,45],76:[2,45],77:[2,45],78:[2,45],80:[2,45],83:[2,45],86:[2,45]},{10:[2,46],13:[2,46],29:[2,46],31:[2,46],40:[2,46],41:[2,46],44:[2,46],45:[2,46],47:[2,46],48:[2,46],49:[2,46],50:[2,46],53:[2,46],54:[2,46],55:[2,46],57:[2,46],58:[2,46],59:[2,46],60:[2,46],66:[2,46],74:[2,46],76:[2,46],77:[2,46],78:[2,46],80:[2,46],83:[2,46],86:[2,46]},{10:[2,47],13:[2,47],29:[2,47],31:[2,47],40:[2,47],41:[2,47],44:[2,47],45:[2,47],47:[2,47],48:[2,47],49:[2,47],50:[2,47],53:[2,47],54:[2,47],55:[2,47],57:[2,47],58:[2,47],59:[2,47],60:[2,47],66:[2,47],74:[2,47],76:[2,47],77:[2,47],78:[2,47],80:[2,47],83:[2,47],86:[2,47]},{13:[1,118],49:[1,117],58:[1,119]},{13:[2,104],41:[1,91],49:[2,104],58:[2,104],87:120,88:90},{13:[2,105],49:[2,105],58:[2,105],59:[2,105],66:[1,122],83:[1,121]},{13:[2,109],48:[1,123],49:[2,109],58:[2,109],59:[2,109],66:[2,109],83:[2,109]},{10:[2,88],29:[2,88],31:[2,88],40:[2,88],41:[2,88],45:[2,88],47:[2,88],60:[1,124],86:[2,88]},{10:[2,101],29:[2,101],31:[2,101],40:[2,101],41:[2,101],45:[2,101],47:[2,101],60:[2,101],86:[2,101]},{10:[2,102],29:[2,102],31:[2,102],40:[2,102],41:[2,102],45:[2,102],47:[2,102],60:[2,102],86:[2,102]},{10:[2,81],13:[2,81],29:[2,81],31:[2,81],40:[2,81],41:[2,81],45:[2,81],47:[2,81],49:[2,81],58:[2,81],59:[2,81],60:[2,81],66:[2,81],83:[2,81],86:[2,81]},{10:[2,55],13:[2,55],29:[2,55],31:[2,55],40:[2,55],41:[2,55],44:[2,55],45:[2,55],47:[2,55],49:[2,55],58:[2,55],59:[2,55],60:[2,55],66:[2,55],83:[2,55],86:[2,55]},{10:[2,56],13:[2,56],29:[2,56],31:[2,56],40:[2,56],41:[2,56],44:[2,56],45:[2,56],47:[2,56],49:[2,56],58:[2,56],59:[2,56],60:[2,56],66:[2,56],83:[2,56],86:[2,56]},{10:[2,57],13:[2,57],29:[2,57],31:[2,57],40:[2,57],41:[2,57],44:[2,57],45:[2,57],47:[2,57],49:[2,57],58:[2,57],59:[2,57],60:[2,57],66:[2,57],83:[2,57],86:[2,57]},{10:[2,58],13:[2,58],29:[2,58],31:[2,58],40:[2,58],41:[2,58],44:[2,58],45:[2,58],47:[2,58],49:[2,58],58:[2,58],59:[2,58],60:[2,58],66:[2,58],83:[2,58],86:[2,58]},{10:[2,59],13:[2,59],29:[2,59],31:[2,59],40:[2,59],41:[2,59],44:[2,59],45:[2,59],47:[2,59],49:[2,59],53:[1,55],54:[1,56],55:[1,57],58:[2,59],59:[2,59],60:[2,59],66:[2,59],83:[2,59],86:[2,59]},{13:[2,73],16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],59:[2,73],61:126,62:[1,96],63:[1,98],64:[1,99],65:125,66:[2,73]},{13:[2,76],41:[1,130],44:[2,76],62:[1,129],67:127,72:128},{10:[2,89],29:[2,89],31:[2,89],40:[2,89],41:[2,89],45:[2,89],47:[2,89],60:[1,124],86:[2,89]},{10:[2,90],29:[2,90],31:[2,90],40:[2,90],41:[2,90],45:[2,90],47:[2,90],60:[1,124],86:[2,90]},{23:131,41:[1,30]},{10:[2,94],29:[2,94],31:[2,94],40:[2,94],41:[2,94],45:[2,94],47:[2,94],60:[1,124],86:[2,94]},{10:[2,95],29:[2,95],31:[2,95],40:[2,95],41:[2,95],45:[2,95],47:[2,95],60:[1,124],86:[2,95]},{16:[1,132]},{23:133,41:[1,30]},{23:114,41:[1,30],43:134,56:[1,113],57:[1,115],58:[1,116]},{23:114,41:[1,30],43:135,56:[1,113],57:[1,115],58:[1,116]},{49:[1,136],50:[1,137],60:[1,138]},{44:[2,50],49:[2,50],50:[2,50],60:[2,50]},{44:[2,51],49:[2,51],50:[2,51],53:[1,55],54:[1,56],55:[1,57],60:[2,51]},{23:139,41:[1,30]},{23:140,41:[1,30]},{10:[2,99],13:[2,99],29:[2,99],31:[2,99],40:[2,99],41:[2,99],45:[2,99],47:[2,99],80:[2,99],86:[2,99]},{41:[1,91],58:[1,142],88:141},{13:[2,104],41:[1,91],58:[2,104],59:[2,104],87:143,88:90},{13:[1,118],49:[1,144],58:[1,119]},{16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:145},{13:[2,112],49:[2,112],58:[2,112],59:[2,112],66:[2,112],83:[2,112]},{13:[2,104],41:[1,91],49:[2,104],58:[2,104],87:146,88:90},{16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],61:95,62:[1,96],63:[1,98],64:[1,99],73:147},{13:[1,150],59:[1,148],66:[1,149]},{13:[2,74],59:[2,74],66:[2,74]},{13:[1,152],44:[1,151]},{15:[1,153]},{15:[2,79]},{15:[2,80]},{10:[2,86],29:[2,86],31:[2,86],53:[1,55],54:[1,56],55:[1,57]},{13:[2,10],41:[2,10],74:[2,10],76:[2,10],78:[2,10],86:[2,10]},{10:[2,49],13:[2,49],31:[2,49],53:[1,55],54:[1,56],55:[1,57]},{44:[1,154],60:[1,138]},{44:[1,155],60:[1,138]},{10:[2,38],29:[2,38],31:[2,38],47:[2,38]},{31:[1,156]},{23:157,41:[1,30]},{53:[1,55],54:[1,56],55:[1,57],57:[1,158]},{53:[1,55],54:[1,56],55:[1,57],59:[1,159]},{13:[2,106],49:[2,106],58:[2,106],59:[2,106],66:[1,122],83:[1,121]},{13:[2,104],41:[1,91],58:[2,104],59:[2,104],87:160,88:90},{13:[1,118],58:[1,119],59:[1,161]},{10:[2,100],13:[2,100],29:[2,100],31:[2,100],40:[2,100],41:[2,100],45:[2,100],47:[2,100],80:[2,100],86:[2,100]},{13:[2,111],49:[2,111],58:[2,111],59:[2,111],66:[2,111],83:[2,111]},{13:[1,118],49:[1,162],58:[1,119]},{10:[2,103],29:[2,103],31:[2,103],40:[2,103],41:[2,103],45:[2,103],47:[2,103],60:[2,103],86:[2,103]},{10:[2,60],13:[2,60],29:[2,60],31:[2,60],40:[2,60],41:[2,60],44:[2,60],45:[2,60],47:[2,60],49:[2,60],58:[2,60],59:[2,60],60:[2,60],66:[2,60],83:[2,60],86:[2,60]},{59:[1,163]},{16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],61:164,62:[1,96],63:[1,98],64:[1,99]},{10:[2,62],13:[2,62],29:[2,62],31:[2,62],40:[2,62],41:[2,62],44:[2,62],45:[2,62],47:[2,62],49:[2,62],58:[2,62],59:[2,62],60:[2,62],66:[2,62],83:[2,62],86:[2,62]},{41:[1,130],62:[1,129],72:165},{16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],61:166,62:[1,96],63:[1,98],64:[1,99]},{31:[1,167]},{31:[1,168]},{10:[2,39],29:[2,39],31:[2,39],47:[2,39]},{44:[2,54],49:[2,54],50:[2,54],53:[1,55],54:[1,56],55:[1,57],60:[2,54]},{44:[2,52],49:[2,52],50:[2,52],60:[2,52]},{44:[2,53],49:[2,53],50:[2,53],60:[2,53]},{13:[1,118],58:[1,119],59:[1,169]},{13:[2,108],49:[2,108],58:[2,108],59:[2,108]},{13:[2,110],49:[2,110],58:[2,110],59:[2,110],66:[2,110],83:[2,110]},{10:[2,61],13:[2,61],29:[2,61],31:[2,61],40:[2,61],41:[2,61],44:[2,61],45:[2,61],47:[2,61],49:[2,61],58:[2,61],59:[2,61],60:[2,61],66:[2,61],83:[2,61],86:[2,61]},{13:[2,75],59:[2,75],66:[2,75]},{15:[1,170]},{13:[2,77],44:[2,77]},{10:[2,34],29:[2,34],31:[2,34],40:[2,34],45:[2,34],47:[2,34]},{10:[2,35],29:[2,35],31:[2,35],40:[2,35],45:[2,35],47:[2,35]},{13:[2,107],49:[2,107],58:[2,107],59:[2,107]},{16:[1,97],23:100,41:[1,30],42:[1,102],58:[1,101],61:171,62:[1,96],63:[1,98],64:[1,99]},{13:[2,78],44:[2,78]}],
defaultActions: {3:[2,1],42:[2,23],129:[2,79],130:[2,80]},
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
case 9:return 54
break;
case 10:return 53
break;
case 11:/* skip whitespaces */
break;
case 12:return 16
break;
case 13:return 14
break;
case 14:return 18
break;
case 15:return 19
break;
case 16:return 20
break;
case 17:return 21
break;
case 18:return 22
break;
case 19:return 24
break;
case 20:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 24
break;
case 21:return 25
break;
case 22:return 26
break;
case 23:return 27
break;
case 24:return 41
break;
case 25:return 62
break;
case 26:this.popState(); return 10
break;
case 27:return 31
break;
case 28:/* skip whitespaces */
break;
case 29:this.begin('arg'); return 50
break;
case 30:this.begin('arg'); return 44
break;
case 31:return 45
break;
case 32:return 40
break;
case 33:return 47
break;
case 34:return 'FIRES'
break;
case 35:return 29
break;
case 36:/*return '*'*/
break;
case 37:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 62
break;
case 38:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 62
break;
case 39:return 16
break;
case 40:return 64
break;
case 41:return 63
break;
case 42:return 63
break;
case 43:return 54
break;
case 44:return 55
break;
case 45:return 56
break;
case 46:return 66
break;
case 47:return 53
break;
case 48:return 13
break;
case 49:return 80
break;
case 50:return 74
break;
case 51:return 83
break;
case 52:return 77
break;
case 53:return 15
break;
case 54:return 48
break;
case 55:return 49
break;
case 56:return 42
break;
case 57:return 44
break;
case 58:return 58
break;
case 59:return 59
break;
case 60:return 60
break;
case 61:return 57
break;
case 62:return 76
break;
case 63:return 78
break;
case 64:return 86
break;
case 65:return 41
break;
case 66:return 62
break;
case 67:this.popState(); return 31
break;
case 68:this.popState(); console.log('LEFTCOMM'); return 31
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],"inclusive":false},"def":{"rules":[0,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],"inclusive":false},"arg":{"rules":[0,67],"inclusive":false},"comment":{"rules":[0,68],"inclusive":false}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
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