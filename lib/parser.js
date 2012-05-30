/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"METADATA":28,"JSON":29,"panino":30,"INCLUDES":31,"names":32,"TEXT":33,"section":34,"namespace":35,"class":36,"mixin":37,"signatures":38,"argument_descriptions":39,"return_descriptions":40,"argument_description":41,"*-":42,"NAME":43,"popen":44,"names_alternation":45,"pclose":46,"**":47,"{":48,"}":49,"return_description":50,"*+":51,"(":52,"):":53,"events":54,"event":55,".":56,"#":57,"@":58,"?":59,"`":60,"[":61,"]":62,"|":63,"value":64,"STRING":65,"BOOLEAN":66,"REGEXP":67,"value_list":68,"...":69,"key_value_list":70,"value2":71,"TRUE":72,"FALSE":73,"NULL":74,"key":75,"name_or_value":76,"==":77,"string":78,"CLASS":79,"<":80,"MIXIN":81,"property":82,"->":83,"returns":84,"constant":85,"=":86,"signature":87,"method":88,"NEW":89,"args":90,")":91,"arg":92,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",28:"METADATA",29:"JSON",31:"INCLUDES",33:"TEXT",42:"*-",43:"NAME",47:"**",48:"{",49:"}",51:"*+",52:"(",53:"):",56:".",57:"#",58:"@",59:"?",60:"`",61:"[",62:"]",63:"|",65:"STRING",66:"BOOLEAN",67:"REGEXP",69:"...",72:"TRUE",73:"FALSE",74:"NULL",77:"==",78:"string",79:"CLASS",80:"<",81:"MIXIN",83:"->",86:"=",89:"NEW",91:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[12,3],[8,1],[8,3],[9,0],[9,1],[30,1],[30,1],[30,1],[30,1],[30,1],[30,2],[30,2],[30,3],[39,1],[39,2],[41,6],[41,6],[40,1],[40,2],[50,5],[44,1],[44,1],[46,1],[46,1],[54,1],[54,3],[55,1],[55,3],[23,1],[23,3],[23,3],[23,3],[32,1],[32,3],[45,1],[45,1],[45,3],[45,3],[45,3],[64,1],[64,1],[64,1],[64,1],[64,1],[64,3],[64,4],[64,3],[71,1],[71,1],[71,1],[71,1],[71,1],[71,1],[71,1],[71,3],[71,4],[71,3],[68,0],[68,1],[68,3],[70,0],[70,3],[70,5],[75,1],[75,1],[76,1],[34,3],[34,3],[35,1],[36,2],[36,4],[37,2],[82,3],[82,3],[85,3],[38,1],[38,2],[87,1],[87,3],[87,3],[87,1],[87,1],[87,2],[88,4],[88,5],[84,1],[84,1],[84,3],[90,0],[90,1],[90,3],[90,5],[90,4],[92,1],[92,4],[92,3],[92,2]],
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
case 20: this.$ = {metadata: $$[$0]} 
break;
case 22: this.$.included_mixins = $$[$0] 
break;
case 23: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 24: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 30: this.$.arguments = $$[$0] 
break;
case 31: this.$.retDesc = $$[$0] 
break;
case 32: this.$.arguments = $$[$0-1]; this.$.retDesc = $$[$0] 
break;
case 33: this.$ = [$$[$0]] 
break;
case 34: this.$.push($$[$0]) 
break;
case 35:
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
case 36:
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
case 37: this.$ = [$$[$0]] 
break;
case 38: this.$.push($$[$0]) 
break;
case 39:
       this.$ = {
          types: $$[$0-2],
          isArray: $$[$0-2].isArray,
          description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
        };
     
break;
case 40:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 41:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 42:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 43:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 44: this.$ = [$$[$0]] 
break;
case 45: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 47: this.$ += $$[$0-1] + $$[$0] 
break;
case 49: this.$ += $$[$0-1] + $$[$0] 
break;
case 50: this.$ += $$[$0-1] + $$[$0] 
break;
case 51: this.$ += $$[$0-1] + $$[$0] 
break;
case 52: this.$ = [$$[$0]] 
break;
case 53: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 54: this.$ = [] 
break;
case 55: this.$ = [$$[$0]] 
break;
case 56: this.$ = [$$[$0-1]] 
break;
case 57: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 58: this.$.push($$[$0]) 
break;
case 59: this.$ = String($$[$0]) 
break;
case 60: this.$ = Number($$[$0]) 
break;
case 61: this.$ = $$[$0] === 'true' ? true : false 
break;
case 62: this.$ = new RegExp($$[$0]) 
break;
case 64: this.$ = $$[$0-1]; this.$.array = true 
break;
case 65: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 66: this.$ = $$[$0-1] 
break;
case 67: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 68: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 69: this.$ = {value: true, type: 'boolean'} 
break;
case 70: this.$ = {value: false, type: 'boolean'} 
break;
case 71: this.$ = {value: null, type: 'null'} 
break;
case 72: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 73: this.$ = {value: $$[$0], type: 'name'} 
break;
case 74: this.$ = $$[$0-1]; this.$.array = true 
break;
case 75: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 76: this.$ = $$[$0-1] 
break;
case 77: this.$ = [] 
break;
case 78: this.$ = [$$[$0]] 
break;
case 79: this.$.push($$[$0]) 
break;
case 80: this.$ = {} 
break;
case 81: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 82: this.$[$$[$0-2]] = $$[$0] 
break;
case 86: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 87: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 88: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 89: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 90: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 91: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 92: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 93: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 94: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 95:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 96:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 98:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 99:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 102: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 103: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 104: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 105: this.$ = [{type: '?'}] 
break;
case 106:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 107:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 108: this.$ = [] 
break;
case 109: this.$ = [$$[$0]] 
break;
case 110: this.$.push($$[$0]) 
break;
case 111:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 112:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 113: this.$ = {name: $$[$0]} 
break;
case 114: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 115: this.$.default_value = $$[$0] 
break;
case 116: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18],43:[2,4],77:[2,4],79:[2,4],81:[2,4],89:[2,4]},{8:19,23:27,30:20,34:21,35:22,36:23,37:24,38:25,43:[1,31],77:[1,26],79:[1,28],81:[1,29],82:33,85:34,87:30,88:32,89:[1,35]},{13:[1,36],43:[2,5],77:[2,5],79:[2,5],81:[2,5],89:[2,5]},{13:[2,6],43:[2,6],77:[2,6],79:[2,6],81:[2,6],89:[2,6]},{13:[2,8],15:[1,37],43:[2,8],77:[2,8],79:[2,8],81:[2,8],89:[2,8]},{13:[2,11],43:[2,11],77:[2,11],79:[2,11],81:[2,11],89:[2,11]},{13:[2,12],43:[2,12],77:[2,12],79:[2,12],81:[2,12],89:[2,12]},{13:[2,13],43:[2,13],77:[2,13],79:[2,13],81:[2,13],89:[2,13]},{13:[2,14],43:[2,14],77:[2,14],79:[2,14],81:[2,14],89:[2,14]},{15:[1,38]},{15:[1,39]},{15:[1,40]},{15:[1,41]},{13:[2,19],43:[2,19],77:[2,19],79:[2,19],81:[2,19],89:[2,19]},{15:[1,42]},{9:43,10:[2,23],33:[1,44]},{10:[2,21],31:[1,45],33:[2,21]},{10:[2,25],31:[2,25],33:[2,25]},{10:[2,26],31:[2,26],33:[2,26]},{10:[2,27],31:[2,27],33:[2,27]},{10:[2,28],31:[2,28],33:[2,28]},{10:[2,29],23:54,31:[2,29],33:[2,29],39:46,40:47,41:49,42:[1,51],43:[1,31],47:[1,52],50:50,51:[1,53],82:33,85:34,87:48,88:32,89:[1,35]},{43:[1,56],78:[1,55]},{10:[2,88],13:[1,62],31:[2,88],33:[2,88],52:[1,60],56:[1,57],57:[1,58],58:[1,59],83:[1,61],86:[1,63]},{23:64,43:[1,31]},{23:65,43:[1,31]},{10:[2,95],31:[2,95],33:[2,95],42:[2,95],43:[2,95],47:[2,95],51:[2,95],89:[2,95]},{10:[2,48],13:[2,48],31:[2,48],33:[2,48],42:[2,48],43:[2,48],47:[2,48],49:[2,48],51:[2,48],52:[2,48],53:[2,48],56:[2,48],57:[2,48],58:[2,48],60:[2,48],61:[2,48],62:[2,48],63:[2,48],69:[2,48],77:[2,48],79:[2,48],80:[2,48],81:[2,48],83:[2,48],86:[2,48],89:[2,48],91:[2,48]},{10:[2,97],13:[1,66],31:[2,97],33:[2,97],42:[2,97],43:[2,97],47:[2,97],51:[2,97],83:[1,67],89:[2,97]},{10:[2,100],31:[2,100],33:[2,100],42:[2,100],43:[2,100],47:[2,100],51:[2,100],89:[2,100]},{10:[2,101],31:[2,101],33:[2,101],42:[2,101],43:[2,101],47:[2,101],51:[2,101],89:[2,101]},{23:69,43:[1,31],88:68},{12:70,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],28:[1,18]},{16:[1,71]},{23:72,43:[1,31]},{23:73,43:[1,31]},{23:74,43:[1,31]},{23:75,43:[1,31]},{29:[1,76]},{10:[1,77]},{10:[2,24]},{23:79,32:78,43:[1,31]},{10:[2,30],31:[2,30],33:[2,30],40:80,41:81,42:[1,51],47:[1,52],50:50,51:[1,53]},{10:[2,31],31:[2,31],33:[2,31],50:82,51:[1,53]},{10:[2,96],31:[2,96],33:[2,96],42:[2,96],43:[2,96],47:[2,96],51:[2,96],89:[2,96]},{10:[2,33],31:[2,33],33:[2,33],42:[2,33],47:[2,33],51:[2,33]},{10:[2,37],31:[2,37],33:[2,37],51:[2,37]},{43:[1,83]},{43:[1,84]},{44:85,48:[1,87],52:[1,86]},{13:[1,62],52:[1,60],56:[1,57],57:[1,58],58:[1,59],83:[1,61],86:[1,63]},{77:[1,88]},{77:[1,89]},{43:[1,90]},{43:[1,91]},{43:[1,92]},{13:[2,108],43:[1,96],58:[1,94],61:[2,108],90:93,91:[2,108],92:95},{16:[1,102],23:105,43:[1,31],48:[1,107],59:[1,98],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:99,84:97},{16:[1,102],23:105,43:[1,31],48:[1,107],59:[1,98],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:99,84:108},{16:[1,102],23:105,43:[1,31],48:[1,107],59:[1,98],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:99,84:109},{10:[2,89],31:[2,89],33:[2,89],56:[1,57],57:[1,58],58:[1,59],80:[1,110]},{10:[2,91],31:[2,91],33:[2,91],56:[1,57],57:[1,58],58:[1,59]},{16:[1,102],23:105,43:[1,31],48:[1,107],59:[1,98],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:99,84:111},{16:[1,102],23:105,43:[1,31],48:[1,107],59:[1,98],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:99,84:112},{10:[2,102],31:[2,102],33:[2,102],42:[2,102],43:[2,102],47:[2,102],51:[2,102],89:[2,102]},{52:[1,60],56:[1,57],57:[1,58],58:[1,59]},{13:[2,7],43:[2,7],77:[2,7],79:[2,7],81:[2,7],89:[2,7]},{13:[2,9],17:[1,113],43:[2,9],77:[2,9],79:[2,9],81:[2,9],89:[2,9]},{13:[2,15],43:[2,15],56:[1,57],57:[1,58],58:[1,59],77:[2,15],79:[2,15],81:[2,15],89:[2,15]},{13:[2,16],43:[2,16],56:[1,57],57:[1,58],58:[1,59],77:[2,16],79:[2,16],81:[2,16],89:[2,16]},{13:[2,17],43:[2,17],56:[1,57],57:[1,58],58:[1,59],77:[2,17],79:[2,17],81:[2,17],89:[2,17]},{13:[2,18],43:[2,18],56:[1,57],57:[1,58],58:[1,59],77:[2,18],79:[2,18],81:[2,18],89:[2,18]},{13:[2,20],43:[2,20],77:[2,20],79:[2,20],81:[2,20],89:[2,20]},{5:[2,3],6:[2,3]},{10:[2,22],13:[1,114],33:[2,22]},{10:[2,52],13:[2,52],33:[2,52],56:[1,57],57:[1,58],58:[1,59]},{10:[2,32],31:[2,32],33:[2,32],50:82,51:[1,53]},{10:[2,34],31:[2,34],33:[2,34],42:[2,34],47:[2,34],51:[2,34]},{10:[2,38],31:[2,38],33:[2,38],51:[2,38]},{44:115,48:[1,87],52:[1,86]},{48:[1,116]},{23:119,43:[1,31],45:117,59:[1,118],60:[1,120],61:[1,121]},{43:[2,40],59:[2,40],60:[2,40],61:[2,40]},{43:[2,41],59:[2,41],60:[2,41],61:[2,41]},{10:[2,86],31:[2,86],33:[2,86]},{10:[2,87],31:[2,87],33:[2,87]},{10:[2,49],13:[2,49],31:[2,49],33:[2,49],42:[2,49],43:[2,49],47:[2,49],49:[2,49],51:[2,49],52:[2,49],53:[2,49],56:[2,49],57:[2,49],58:[2,49],60:[2,49],61:[2,49],62:[2,49],63:[2,49],69:[2,49],77:[2,49],79:[2,49],80:[2,49],81:[2,49],83:[2,49],86:[2,49],89:[2,49],91:[2,49]},{10:[2,50],13:[2,50],31:[2,50],33:[2,50],42:[2,50],43:[2,50],47:[2,50],49:[2,50],51:[2,50],52:[2,50],53:[2,50],56:[2,50],57:[2,50],58:[2,50],60:[2,50],61:[2,50],62:[2,50],63:[2,50],69:[2,50],77:[2,50],79:[2,50],80:[2,50],81:[2,50],83:[2,50],86:[2,50],89:[2,50],91:[2,50]},{10:[2,51],13:[2,51],31:[2,51],33:[2,51],42:[2,51],43:[2,51],47:[2,51],49:[2,51],51:[2,51],52:[2,51],53:[2,51],56:[2,51],57:[2,51],58:[2,51],60:[2,51],61:[2,51],62:[2,51],63:[2,51],69:[2,51],77:[2,51],79:[2,51],80:[2,51],81:[2,51],83:[2,51],86:[2,51],89:[2,51],91:[2,51]},{13:[1,123],61:[1,124],91:[1,122]},{13:[2,108],43:[1,96],61:[2,108],90:125,91:[2,108],92:95},{13:[2,109],61:[2,109],62:[2,109],69:[1,127],86:[1,126],91:[2,109]},{13:[2,113],52:[1,128],61:[2,113],62:[2,113],69:[2,113],86:[2,113],91:[2,113]},{10:[2,92],31:[2,92],33:[2,92],42:[2,92],43:[2,92],47:[2,92],51:[2,92],63:[1,129],89:[2,92]},{10:[2,105],31:[2,105],33:[2,105],42:[2,105],43:[2,105],47:[2,105],51:[2,105],63:[2,105],89:[2,105]},{10:[2,106],31:[2,106],33:[2,106],42:[2,106],43:[2,106],47:[2,106],51:[2,106],63:[2,106],89:[2,106]},{10:[2,85],13:[2,85],31:[2,85],33:[2,85],42:[2,85],43:[2,85],47:[2,85],51:[2,85],61:[2,85],62:[2,85],63:[2,85],69:[2,85],86:[2,85],89:[2,85],91:[2,85]},{10:[2,59],13:[2,59],31:[2,59],33:[2,59],42:[2,59],43:[2,59],47:[2,59],49:[2,59],51:[2,59],61:[2,59],62:[2,59],63:[2,59],69:[2,59],86:[2,59],89:[2,59],91:[2,59]},{10:[2,60],13:[2,60],31:[2,60],33:[2,60],42:[2,60],43:[2,60],47:[2,60],49:[2,60],51:[2,60],61:[2,60],62:[2,60],63:[2,60],69:[2,60],86:[2,60],89:[2,60],91:[2,60]},{10:[2,61],13:[2,61],31:[2,61],33:[2,61],42:[2,61],43:[2,61],47:[2,61],49:[2,61],51:[2,61],61:[2,61],62:[2,61],63:[2,61],69:[2,61],86:[2,61],89:[2,61],91:[2,61]},{10:[2,62],13:[2,62],31:[2,62],33:[2,62],42:[2,62],43:[2,62],47:[2,62],49:[2,62],51:[2,62],61:[2,62],62:[2,62],63:[2,62],69:[2,62],86:[2,62],89:[2,62],91:[2,62]},{10:[2,63],13:[2,63],31:[2,63],33:[2,63],42:[2,63],43:[2,63],47:[2,63],49:[2,63],51:[2,63],56:[1,57],57:[1,58],58:[1,59],61:[2,63],62:[2,63],63:[2,63],69:[2,63],86:[2,63],89:[2,63],91:[2,63]},{13:[2,77],16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],62:[2,77],64:131,65:[1,101],66:[1,103],67:[1,104],68:130,69:[2,77]},{13:[2,80],43:[1,135],49:[2,80],65:[1,134],70:132,75:133},{10:[2,93],31:[2,93],33:[2,93],42:[2,93],43:[2,93],47:[2,93],51:[2,93],63:[1,129],89:[2,93]},{10:[2,94],31:[2,94],33:[2,94],42:[2,94],43:[2,94],47:[2,94],51:[2,94],63:[1,129],89:[2,94]},{23:136,43:[1,31]},{10:[2,98],31:[2,98],33:[2,98],42:[2,98],43:[2,98],47:[2,98],51:[2,98],63:[1,129],89:[2,98]},{10:[2,99],31:[2,99],33:[2,99],42:[2,99],43:[2,99],47:[2,99],51:[2,99],63:[1,129],89:[2,99]},{16:[1,137]},{23:138,43:[1,31]},{23:119,43:[1,31],45:139,59:[1,118],60:[1,120],61:[1,121]},{23:119,43:[1,31],45:140,59:[1,118],60:[1,120],61:[1,121]},{46:141,49:[1,144],53:[1,143],63:[1,142]},{49:[2,54],53:[2,54],63:[2,54]},{49:[2,55],53:[2,55],56:[1,57],57:[1,58],58:[1,59],63:[2,55]},{23:145,43:[1,31]},{23:146,43:[1,31]},{10:[2,103],13:[2,103],31:[2,103],33:[2,103],42:[2,103],43:[2,103],47:[2,103],51:[2,103],83:[2,103],89:[2,103]},{43:[1,96],61:[1,148],92:147},{13:[2,108],43:[1,96],61:[2,108],62:[2,108],90:149,92:95},{13:[1,123],61:[1,124],91:[1,150]},{16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:151},{13:[2,116],61:[2,116],62:[2,116],69:[2,116],86:[2,116],91:[2,116]},{13:[2,108],43:[1,96],61:[2,108],90:152,91:[2,108],92:95},{16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],64:100,65:[1,101],66:[1,103],67:[1,104],76:153},{13:[1,156],62:[1,154],69:[1,155]},{13:[2,78],62:[2,78],69:[2,78]},{13:[1,158],49:[1,157]},{15:[1,159]},{15:[2,83]},{15:[2,84]},{10:[2,90],31:[2,90],33:[2,90],56:[1,57],57:[1,58],58:[1,59]},{13:[2,10],43:[2,10],77:[2,10],79:[2,10],81:[2,10],89:[2,10]},{10:[2,53],13:[2,53],33:[2,53],56:[1,57],57:[1,58],58:[1,59]},{46:160,49:[1,144],53:[1,143],63:[1,142]},{49:[1,161],63:[1,142]},{33:[1,162]},{23:163,43:[1,31]},{33:[2,42]},{33:[2,43]},{56:[1,57],57:[1,58],58:[1,59],60:[1,164]},{56:[1,57],57:[1,58],58:[1,59],62:[1,165]},{13:[2,110],61:[2,110],62:[2,110],69:[1,127],86:[1,126],91:[2,110]},{13:[2,108],43:[1,96],61:[2,108],62:[2,108],90:166,92:95},{13:[1,123],61:[1,124],62:[1,167]},{10:[2,104],13:[2,104],31:[2,104],33:[2,104],42:[2,104],43:[2,104],47:[2,104],51:[2,104],83:[2,104],89:[2,104]},{13:[2,115],61:[2,115],62:[2,115],69:[2,115],86:[2,115],91:[2,115]},{13:[1,123],61:[1,124],91:[1,168]},{10:[2,107],31:[2,107],33:[2,107],42:[2,107],43:[2,107],47:[2,107],51:[2,107],63:[2,107],89:[2,107]},{10:[2,64],13:[2,64],31:[2,64],33:[2,64],42:[2,64],43:[2,64],47:[2,64],49:[2,64],51:[2,64],61:[2,64],62:[2,64],63:[2,64],69:[2,64],86:[2,64],89:[2,64],91:[2,64]},{62:[1,169]},{16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],64:170,65:[1,101],66:[1,103],67:[1,104]},{10:[2,66],13:[2,66],31:[2,66],33:[2,66],42:[2,66],43:[2,66],47:[2,66],49:[2,66],51:[2,66],61:[2,66],62:[2,66],63:[2,66],69:[2,66],86:[2,66],89:[2,66],91:[2,66]},{43:[1,135],65:[1,134],75:171},{16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],64:172,65:[1,101],66:[1,103],67:[1,104]},{33:[1,173]},{33:[1,174]},{10:[2,39],31:[2,39],33:[2,39],51:[2,39]},{49:[2,58],53:[2,58],56:[1,57],57:[1,58],58:[1,59],63:[2,58]},{49:[2,56],53:[2,56],63:[2,56]},{49:[2,57],53:[2,57],63:[2,57]},{13:[1,123],61:[1,124],62:[1,175]},{13:[2,112],61:[2,112],62:[2,112],91:[2,112]},{13:[2,114],61:[2,114],62:[2,114],69:[2,114],86:[2,114],91:[2,114]},{10:[2,65],13:[2,65],31:[2,65],33:[2,65],42:[2,65],43:[2,65],47:[2,65],49:[2,65],51:[2,65],61:[2,65],62:[2,65],63:[2,65],69:[2,65],86:[2,65],89:[2,65],91:[2,65]},{13:[2,79],62:[2,79],69:[2,79]},{15:[1,176]},{13:[2,81],49:[2,81]},{10:[2,35],31:[2,35],33:[2,35],42:[2,35],47:[2,35],51:[2,35]},{10:[2,36],31:[2,36],33:[2,36],42:[2,36],47:[2,36],51:[2,36]},{13:[2,111],61:[2,111],62:[2,111],91:[2,111]},{16:[1,102],23:105,43:[1,31],48:[1,107],61:[1,106],64:177,65:[1,101],66:[1,103],67:[1,104]},{13:[2,82],49:[2,82]}],
defaultActions: {3:[2,1],44:[2,24],134:[2,83],135:[2,84],143:[2,42],144:[2,43]},
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
case 9:return 57
break;
case 10:return 56
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
case 24:return 28
break;
case 25:return 43
break;
case 26:return 65
break;
case 27:return 29
break;
case 28:this.popState(); return 10
break;
case 29:return 33
break;
case 30:/* skip whitespaces */
break;
case 31:this.begin('arg'); return 53
break;
case 32:this.begin('arg'); return 49
break;
case 33:return 47
break;
case 34:return 42
break;
case 35:return 51
break;
case 36:return 'FIRES'
break;
case 37:return 31
break;
case 38:/*return '*'*/
break;
case 39:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 65
break;
case 40:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 65
break;
case 41:return 16
break;
case 42:return 67
break;
case 43:return 66
break;
case 44:return 66
break;
case 45:return 57
break;
case 46:return 58
break;
case 47:return 59
break;
case 48:return 69
break;
case 49:return 56
break;
case 50:return 13
break;
case 51:return 83
break;
case 52:return 77
break;
case 53:return 86
break;
case 54:return 80
break;
case 55:return 15
break;
case 56:return 52
break;
case 57:return 91
break;
case 58:return 48
break;
case 59:return 49
break;
case 60:return 61
break;
case 61:return 62
break;
case 62:return 63
break;
case 63:return 60
break;
case 64:return 79
break;
case 65:return 81
break;
case 66:return 89
break;
case 67:return 43
break;
case 68:return 65
break;
case 69:this.popState(); return 33
break;
case 70:this.popState(); console.log('LEFTCOMM'); return 33
break;
}
};
lexer.rules = [/^(?:$)/,/^(?:\s+)/,/^(?:\/\*\*(?=([^/])))/,/^(?:.*)/,/^(?:\*\*\/)/,/^(?:\s*[\n])/,/^(?:, )/,/^(?:: )/,/^(?:\.\.)/,/^(?:#)/,/^(?:\.)/,/^(?:\s+)/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:deprecated\b)/,/^(?:read-only\b)/,/^(?:internal\b)/,/^(?:hide\b)/,/^(?:chainable\b)/,/^(?:section\b)/,/^(?:alias of\b)/,/^(?:alias\b)/,/^(?:related to\b)/,/^(?:belongs to\b)/,/^(?:extension\b)/,/^(?:metadata\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:((?:\{["':$_a-zA-Z0-9 \,]*\})))/,/^(?:\*\*\/)/,/^(?:\*\s*?[\n][\s\S]*?(?=\*\*\/))/,/^(?:\s+)/,/^(?:\)\s*:)/,/^(?:\}\s+)/,/^(?:\*\s*\*)/,/^(?:\*\s*-)/,/^(?:\*\s*\+)/,/^(?:\*\s*fires\b)/,/^(?:\*\s*includes\b)/,/^(?:\*)/,/^(?:"(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])*")/,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^'(\\)])*')/,/^(?:(-?(?:[0-9]|[1-9][0-9]+))((?:\.[\.0-9]+))?((?:[eE][-+]?[0-9]+))?\b)/,/^(?:\/(?:[^\/]|\\\/)*\/[gim]*)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:#)/,/^(?:@)/,/^(?:\?)/,/^(?:\.\.\.)/,/^(?:\.)/,/^(?:,)/,/^(?:->)/,/^(?:==)/,/^(?:=)/,/^(?:<)/,/^(?::)/,/^(?:\()/,/^(?:\))/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:\|)/,/^(?:`)/,/^(?:class\b)/,/^(?:mixin\b)/,/^(?:new\b)/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9]*)))/,/^(?:((?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)))/,/^(?:[\s\S]*?(?=(\*\s*[\-\+\n])))/,/^(?:[\s\S]*?(?=\*\*\/))/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],"inclusive":false},"def":{"rules":[0,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68],"inclusive":false},"arg":{"rules":[0,69],"inclusive":false},"comment":{"rules":[0,70],"inclusive":false}};
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