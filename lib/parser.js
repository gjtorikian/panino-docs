/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"HIDE":20,"CHAINABLE":21,"SECTION":22,"name":23,"ALIASOF":24,"RELATEDTO":25,"BELONGSTO":26,"EXTENSION":27,"panino":28,"INCLUDES":29,"names":30,"TEXT":31,"section":32,"namespace":33,"class":34,"mixin":35,"signatures":36,"argument_descriptions":37,"return_descriptions":38,"argument_description":39,"*-":40,"NAME":41,"popen":42,"names_alternation":43,"pclose":44,"**":45,"{":46,"}":47,"return_description":48,"*+":49,"(":50,"):":51,"events":52,"event":53,".":54,"#":55,"@":56,"?":57,"`":58,"[":59,"]":60,"|":61,"value":62,"STRING":63,"BOOLEAN":64,"REGEXP":65,"value_list":66,"...":67,"key_value_list":68,"value2":69,"TRUE":70,"FALSE":71,"NULL":72,"key":73,"name_or_value":74,"==":75,"string":76,"CLASS":77,"<":78,"MIXIN":79,"property":80,"->":81,"returns":82,"constant":83,"=":84,"signature":85,"method":86,"NEW":87,"args":88,")":89,"arg":90,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"HIDE",21:"CHAINABLE",22:"SECTION",24:"ALIASOF",25:"RELATEDTO",26:"BELONGSTO",27:"EXTENSION",29:"INCLUDES",31:"TEXT",40:"*-",41:"NAME",45:"**",46:"{",47:"}",49:"*+",50:"(",51:"):",54:".",55:"#",56:"@",57:"?",58:"`",59:"[",60:"]",61:"|",63:"STRING",64:"BOOLEAN",65:"REGEXP",67:"...",70:"TRUE",71:"FALSE",72:"NULL",75:"==",76:"string",77:"CLASS",78:"<",79:"MIXIN",81:"->",84:"=",87:"NEW",89:")"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[12,1],[8,1],[8,3],[9,0],[9,1],[28,1],[28,1],[28,1],[28,1],[28,1],[28,2],[28,2],[28,3],[37,1],[37,2],[39,6],[39,6],[38,1],[38,2],[48,5],[42,1],[42,1],[44,1],[44,1],[52,1],[52,3],[53,1],[53,3],[23,1],[23,3],[23,3],[23,3],[30,1],[30,3],[43,1],[43,1],[43,3],[43,3],[43,3],[62,1],[62,1],[62,1],[62,1],[62,1],[62,3],[62,4],[62,3],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,1],[69,3],[69,4],[69,3],[66,0],[66,1],[66,3],[68,0],[68,3],[68,5],[73,1],[73,1],[74,1],[32,3],[32,3],[33,1],[34,2],[34,4],[35,2],[80,3],[80,3],[83,3],[36,1],[36,2],[85,1],[85,3],[85,3],[85,1],[85,1],[85,2],[86,4],[86,5],[82,1],[82,1],[82,3],[88,0],[88,1],[88,3],[88,5],[88,4],[90,1],[90,4],[90,3],[90,2]],
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
       this.$ = {
          types: $$[$0-2],
          isArray: $$[$0-2].isArray,
          description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
        };
     
break;
case 39:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use opening parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 40:
       if (yy.useParenthesis === true || yy.useCurlies === false) {
          console.error("FATAL: You can't use opening curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 41:
       if (yy.useParenthesis === false || yy.useCurlies === true) {
          console.error("FATAL: You can't use closing parenthesis for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 42:
       if (yy.useParenthesis === true|| yy.useCurlies === false) {
          console.error("FATAL: You can't use closing curlies for the argument: '" + $$[$0-1] + "'");
          process.exit(1);
       }
     
break;
case 43: this.$ = [$$[$0]] 
break;
case 44: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 46: this.$ += $$[$0-1] + $$[$0] 
break;
case 48: this.$ += $$[$0-1] + $$[$0] 
break;
case 49: this.$ += $$[$0-1] + $$[$0] 
break;
case 50: this.$ += $$[$0-1] + $$[$0] 
break;
case 51: this.$ = [$$[$0]] 
break;
case 52: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 53: this.$ = [] 
break;
case 54: this.$ = [$$[$0]] 
break;
case 55: this.$ = [$$[$0-1]] 
break;
case 56: this.$ = [$$[$0-1]]; this.$.isArray = true 
break;
case 57: this.$.push($$[$0]) 
break;
case 58: this.$ = String($$[$0]) 
break;
case 59: this.$ = Number($$[$0]) 
break;
case 60: this.$ = $$[$0] === 'true' ? true : false 
break;
case 61: this.$ = new RegExp($$[$0]) 
break;
case 63: this.$ = $$[$0-1]; this.$.array = true 
break;
case 64: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 65: this.$ = $$[$0-1] 
break;
case 66: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 67: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 68: this.$ = {value: true, type: 'boolean'} 
break;
case 69: this.$ = {value: false, type: 'boolean'} 
break;
case 70: this.$ = {value: null, type: 'null'} 
break;
case 71: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 72: this.$ = {value: $$[$0], type: 'name'} 
break;
case 73: this.$ = $$[$0-1]; this.$.array = true 
break;
case 74: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 75: this.$ = $$[$0-1] 
break;
case 76: this.$ = [] 
break;
case 77: this.$ = [$$[$0]] 
break;
case 78: this.$.push($$[$0]) 
break;
case 79: this.$ = {} 
break;
case 80: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 81: this.$[$$[$0-2]] = $$[$0] 
break;
case 85: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 86: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 87: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 88: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 89: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 90: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 91: 
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 92: 
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
    
break;
case 93: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 94:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 95:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 97:
      if (yy.useArrow) {
        console.error("FATAL: You can't use commas for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 98:
      if (yy.useComma) {
        console.error("FATAL: You can't use arrows for " + $$[$0-2].id);
        process.exit(1);
      }
      this.$.returns = $$[$0] 
    
break;
case 101: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 102: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 103: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 104: this.$ = [{type: '?'}] 
break;
case 105:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 106:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 107: this.$ = [] 
break;
case 108: this.$ = [$$[$0]] 
break;
case 109: this.$.push($$[$0]) 
break;
case 110:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 111:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 112: this.$ = {name: $$[$0]} 
break;
case 113: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 114: this.$.default_value = $$[$0] 
break;
case 115: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17],41:[2,4],75:[2,4],77:[2,4],79:[2,4],87:[2,4]},{8:18,23:26,28:19,32:20,33:21,34:22,35:23,36:24,41:[1,30],75:[1,25],77:[1,27],79:[1,28],80:32,83:33,85:29,86:31,87:[1,34]},{13:[1,35],41:[2,5],75:[2,5],77:[2,5],79:[2,5],87:[2,5]},{13:[2,6],41:[2,6],75:[2,6],77:[2,6],79:[2,6],87:[2,6]},{13:[2,8],15:[1,36],41:[2,8],75:[2,8],77:[2,8],79:[2,8],87:[2,8]},{13:[2,11],41:[2,11],75:[2,11],77:[2,11],79:[2,11],87:[2,11]},{13:[2,12],41:[2,12],75:[2,12],77:[2,12],79:[2,12],87:[2,12]},{13:[2,13],41:[2,13],75:[2,13],77:[2,13],79:[2,13],87:[2,13]},{13:[2,14],41:[2,14],75:[2,14],77:[2,14],79:[2,14],87:[2,14]},{15:[1,37]},{15:[1,38]},{15:[1,39]},{15:[1,40]},{13:[2,19],41:[2,19],75:[2,19],77:[2,19],79:[2,19],87:[2,19]},{9:41,10:[2,22],31:[1,42]},{10:[2,20],29:[1,43],31:[2,20]},{10:[2,24],29:[2,24],31:[2,24]},{10:[2,25],29:[2,25],31:[2,25]},{10:[2,26],29:[2,26],31:[2,26]},{10:[2,27],29:[2,27],31:[2,27]},{10:[2,28],23:52,29:[2,28],31:[2,28],37:44,38:45,39:47,40:[1,49],41:[1,30],45:[1,50],48:48,49:[1,51],80:32,83:33,85:46,86:31,87:[1,34]},{41:[1,54],76:[1,53]},{10:[2,87],13:[1,60],29:[2,87],31:[2,87],50:[1,58],54:[1,55],55:[1,56],56:[1,57],81:[1,59],84:[1,61]},{23:62,41:[1,30]},{23:63,41:[1,30]},{10:[2,94],29:[2,94],31:[2,94],40:[2,94],41:[2,94],45:[2,94],49:[2,94],87:[2,94]},{10:[2,47],13:[2,47],29:[2,47],31:[2,47],40:[2,47],41:[2,47],45:[2,47],47:[2,47],49:[2,47],50:[2,47],51:[2,47],54:[2,47],55:[2,47],56:[2,47],58:[2,47],59:[2,47],60:[2,47],61:[2,47],67:[2,47],75:[2,47],77:[2,47],78:[2,47],79:[2,47],81:[2,47],84:[2,47],87:[2,47],89:[2,47]},{10:[2,96],13:[1,64],29:[2,96],31:[2,96],40:[2,96],41:[2,96],45:[2,96],49:[2,96],81:[1,65],87:[2,96]},{10:[2,99],29:[2,99],31:[2,99],40:[2,99],41:[2,99],45:[2,99],49:[2,99],87:[2,99]},{10:[2,100],29:[2,100],31:[2,100],40:[2,100],41:[2,100],45:[2,100],49:[2,100],87:[2,100]},{23:67,41:[1,30],86:66},{12:68,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],22:[1,13],24:[1,14],25:[1,15],26:[1,16],27:[1,17]},{16:[1,69]},{23:70,41:[1,30]},{23:71,41:[1,30]},{23:72,41:[1,30]},{23:73,41:[1,30]},{10:[1,74]},{10:[2,23]},{23:76,30:75,41:[1,30]},{10:[2,29],29:[2,29],31:[2,29],38:77,39:78,40:[1,49],45:[1,50],48:48,49:[1,51]},{10:[2,30],29:[2,30],31:[2,30],48:79,49:[1,51]},{10:[2,95],29:[2,95],31:[2,95],40:[2,95],41:[2,95],45:[2,95],49:[2,95],87:[2,95]},{10:[2,32],29:[2,32],31:[2,32],40:[2,32],45:[2,32],49:[2,32]},{10:[2,36],29:[2,36],31:[2,36],49:[2,36]},{41:[1,80]},{41:[1,81]},{42:82,46:[1,84],50:[1,83]},{13:[1,60],50:[1,58],54:[1,55],55:[1,56],56:[1,57],81:[1,59],84:[1,61]},{75:[1,85]},{75:[1,86]},{41:[1,87]},{41:[1,88]},{41:[1,89]},{13:[2,107],41:[1,93],56:[1,91],59:[2,107],88:90,89:[2,107],90:92},{16:[1,99],23:102,41:[1,30],46:[1,104],57:[1,95],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:96,82:94},{16:[1,99],23:102,41:[1,30],46:[1,104],57:[1,95],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:96,82:105},{16:[1,99],23:102,41:[1,30],46:[1,104],57:[1,95],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:96,82:106},{10:[2,88],29:[2,88],31:[2,88],54:[1,55],55:[1,56],56:[1,57],78:[1,107]},{10:[2,90],29:[2,90],31:[2,90],54:[1,55],55:[1,56],56:[1,57]},{16:[1,99],23:102,41:[1,30],46:[1,104],57:[1,95],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:96,82:108},{16:[1,99],23:102,41:[1,30],46:[1,104],57:[1,95],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:96,82:109},{10:[2,101],29:[2,101],31:[2,101],40:[2,101],41:[2,101],45:[2,101],49:[2,101],87:[2,101]},{50:[1,58],54:[1,55],55:[1,56],56:[1,57]},{13:[2,7],41:[2,7],75:[2,7],77:[2,7],79:[2,7],87:[2,7]},{13:[2,9],17:[1,110],41:[2,9],75:[2,9],77:[2,9],79:[2,9],87:[2,9]},{13:[2,15],41:[2,15],54:[1,55],55:[1,56],56:[1,57],75:[2,15],77:[2,15],79:[2,15],87:[2,15]},{13:[2,16],41:[2,16],54:[1,55],55:[1,56],56:[1,57],75:[2,16],77:[2,16],79:[2,16],87:[2,16]},{13:[2,17],41:[2,17],54:[1,55],55:[1,56],56:[1,57],75:[2,17],77:[2,17],79:[2,17],87:[2,17]},{13:[2,18],41:[2,18],54:[1,55],55:[1,56],56:[1,57],75:[2,18],77:[2,18],79:[2,18],87:[2,18]},{5:[2,3],6:[2,3]},{10:[2,21],13:[1,111],31:[2,21]},{10:[2,51],13:[2,51],31:[2,51],54:[1,55],55:[1,56],56:[1,57]},{10:[2,31],29:[2,31],31:[2,31],48:79,49:[1,51]},{10:[2,33],29:[2,33],31:[2,33],40:[2,33],45:[2,33],49:[2,33]},{10:[2,37],29:[2,37],31:[2,37],49:[2,37]},{42:112,46:[1,84],50:[1,83]},{46:[1,113]},{23:116,41:[1,30],43:114,57:[1,115],58:[1,117],59:[1,118]},{41:[2,39],57:[2,39],58:[2,39],59:[2,39]},{41:[2,40],57:[2,40],58:[2,40],59:[2,40]},{10:[2,85],29:[2,85],31:[2,85]},{10:[2,86],29:[2,86],31:[2,86]},{10:[2,48],13:[2,48],29:[2,48],31:[2,48],40:[2,48],41:[2,48],45:[2,48],47:[2,48],49:[2,48],50:[2,48],51:[2,48],54:[2,48],55:[2,48],56:[2,48],58:[2,48],59:[2,48],60:[2,48],61:[2,48],67:[2,48],75:[2,48],77:[2,48],78:[2,48],79:[2,48],81:[2,48],84:[2,48],87:[2,48],89:[2,48]},{10:[2,49],13:[2,49],29:[2,49],31:[2,49],40:[2,49],41:[2,49],45:[2,49],47:[2,49],49:[2,49],50:[2,49],51:[2,49],54:[2,49],55:[2,49],56:[2,49],58:[2,49],59:[2,49],60:[2,49],61:[2,49],67:[2,49],75:[2,49],77:[2,49],78:[2,49],79:[2,49],81:[2,49],84:[2,49],87:[2,49],89:[2,49]},{10:[2,50],13:[2,50],29:[2,50],31:[2,50],40:[2,50],41:[2,50],45:[2,50],47:[2,50],49:[2,50],50:[2,50],51:[2,50],54:[2,50],55:[2,50],56:[2,50],58:[2,50],59:[2,50],60:[2,50],61:[2,50],67:[2,50],75:[2,50],77:[2,50],78:[2,50],79:[2,50],81:[2,50],84:[2,50],87:[2,50],89:[2,50]},{13:[1,120],59:[1,121],89:[1,119]},{13:[2,107],41:[1,93],59:[2,107],88:122,89:[2,107],90:92},{13:[2,108],59:[2,108],60:[2,108],67:[1,124],84:[1,123],89:[2,108]},{13:[2,112],50:[1,125],59:[2,112],60:[2,112],67:[2,112],84:[2,112],89:[2,112]},{10:[2,91],29:[2,91],31:[2,91],40:[2,91],41:[2,91],45:[2,91],49:[2,91],61:[1,126],87:[2,91]},{10:[2,104],29:[2,104],31:[2,104],40:[2,104],41:[2,104],45:[2,104],49:[2,104],61:[2,104],87:[2,104]},{10:[2,105],29:[2,105],31:[2,105],40:[2,105],41:[2,105],45:[2,105],49:[2,105],61:[2,105],87:[2,105]},{10:[2,84],13:[2,84],29:[2,84],31:[2,84],40:[2,84],41:[2,84],45:[2,84],49:[2,84],59:[2,84],60:[2,84],61:[2,84],67:[2,84],84:[2,84],87:[2,84],89:[2,84]},{10:[2,58],13:[2,58],29:[2,58],31:[2,58],40:[2,58],41:[2,58],45:[2,58],47:[2,58],49:[2,58],59:[2,58],60:[2,58],61:[2,58],67:[2,58],84:[2,58],87:[2,58],89:[2,58]},{10:[2,59],13:[2,59],29:[2,59],31:[2,59],40:[2,59],41:[2,59],45:[2,59],47:[2,59],49:[2,59],59:[2,59],60:[2,59],61:[2,59],67:[2,59],84:[2,59],87:[2,59],89:[2,59]},{10:[2,60],13:[2,60],29:[2,60],31:[2,60],40:[2,60],41:[2,60],45:[2,60],47:[2,60],49:[2,60],59:[2,60],60:[2,60],61:[2,60],67:[2,60],84:[2,60],87:[2,60],89:[2,60]},{10:[2,61],13:[2,61],29:[2,61],31:[2,61],40:[2,61],41:[2,61],45:[2,61],47:[2,61],49:[2,61],59:[2,61],60:[2,61],61:[2,61],67:[2,61],84:[2,61],87:[2,61],89:[2,61]},{10:[2,62],13:[2,62],29:[2,62],31:[2,62],40:[2,62],41:[2,62],45:[2,62],47:[2,62],49:[2,62],54:[1,55],55:[1,56],56:[1,57],59:[2,62],60:[2,62],61:[2,62],67:[2,62],84:[2,62],87:[2,62],89:[2,62]},{13:[2,76],16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],60:[2,76],62:128,63:[1,98],64:[1,100],65:[1,101],66:127,67:[2,76]},{13:[2,79],41:[1,132],47:[2,79],63:[1,131],68:129,73:130},{10:[2,92],29:[2,92],31:[2,92],40:[2,92],41:[2,92],45:[2,92],49:[2,92],61:[1,126],87:[2,92]},{10:[2,93],29:[2,93],31:[2,93],40:[2,93],41:[2,93],45:[2,93],49:[2,93],61:[1,126],87:[2,93]},{23:133,41:[1,30]},{10:[2,97],29:[2,97],31:[2,97],40:[2,97],41:[2,97],45:[2,97],49:[2,97],61:[1,126],87:[2,97]},{10:[2,98],29:[2,98],31:[2,98],40:[2,98],41:[2,98],45:[2,98],49:[2,98],61:[1,126],87:[2,98]},{16:[1,134]},{23:135,41:[1,30]},{23:116,41:[1,30],43:136,57:[1,115],58:[1,117],59:[1,118]},{23:116,41:[1,30],43:137,57:[1,115],58:[1,117],59:[1,118]},{44:138,47:[1,141],51:[1,140],61:[1,139]},{47:[2,53],51:[2,53],61:[2,53]},{47:[2,54],51:[2,54],54:[1,55],55:[1,56],56:[1,57],61:[2,54]},{23:142,41:[1,30]},{23:143,41:[1,30]},{10:[2,102],13:[2,102],29:[2,102],31:[2,102],40:[2,102],41:[2,102],45:[2,102],49:[2,102],81:[2,102],87:[2,102]},{41:[1,93],59:[1,145],90:144},{13:[2,107],41:[1,93],59:[2,107],60:[2,107],88:146,90:92},{13:[1,120],59:[1,121],89:[1,147]},{16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:148},{13:[2,115],59:[2,115],60:[2,115],67:[2,115],84:[2,115],89:[2,115]},{13:[2,107],41:[1,93],59:[2,107],88:149,89:[2,107],90:92},{16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],62:97,63:[1,98],64:[1,100],65:[1,101],74:150},{13:[1,153],60:[1,151],67:[1,152]},{13:[2,77],60:[2,77],67:[2,77]},{13:[1,155],47:[1,154]},{15:[1,156]},{15:[2,82]},{15:[2,83]},{10:[2,89],29:[2,89],31:[2,89],54:[1,55],55:[1,56],56:[1,57]},{13:[2,10],41:[2,10],75:[2,10],77:[2,10],79:[2,10],87:[2,10]},{10:[2,52],13:[2,52],31:[2,52],54:[1,55],55:[1,56],56:[1,57]},{44:157,47:[1,141],51:[1,140],61:[1,139]},{47:[1,158],61:[1,139]},{31:[1,159]},{23:160,41:[1,30]},{31:[2,41]},{31:[2,42]},{54:[1,55],55:[1,56],56:[1,57],58:[1,161]},{54:[1,55],55:[1,56],56:[1,57],60:[1,162]},{13:[2,109],59:[2,109],60:[2,109],67:[1,124],84:[1,123],89:[2,109]},{13:[2,107],41:[1,93],59:[2,107],60:[2,107],88:163,90:92},{13:[1,120],59:[1,121],60:[1,164]},{10:[2,103],13:[2,103],29:[2,103],31:[2,103],40:[2,103],41:[2,103],45:[2,103],49:[2,103],81:[2,103],87:[2,103]},{13:[2,114],59:[2,114],60:[2,114],67:[2,114],84:[2,114],89:[2,114]},{13:[1,120],59:[1,121],89:[1,165]},{10:[2,106],29:[2,106],31:[2,106],40:[2,106],41:[2,106],45:[2,106],49:[2,106],61:[2,106],87:[2,106]},{10:[2,63],13:[2,63],29:[2,63],31:[2,63],40:[2,63],41:[2,63],45:[2,63],47:[2,63],49:[2,63],59:[2,63],60:[2,63],61:[2,63],67:[2,63],84:[2,63],87:[2,63],89:[2,63]},{60:[1,166]},{16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],62:167,63:[1,98],64:[1,100],65:[1,101]},{10:[2,65],13:[2,65],29:[2,65],31:[2,65],40:[2,65],41:[2,65],45:[2,65],47:[2,65],49:[2,65],59:[2,65],60:[2,65],61:[2,65],67:[2,65],84:[2,65],87:[2,65],89:[2,65]},{41:[1,132],63:[1,131],73:168},{16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],62:169,63:[1,98],64:[1,100],65:[1,101]},{31:[1,170]},{31:[1,171]},{10:[2,38],29:[2,38],31:[2,38],49:[2,38]},{47:[2,57],51:[2,57],54:[1,55],55:[1,56],56:[1,57],61:[2,57]},{47:[2,55],51:[2,55],61:[2,55]},{47:[2,56],51:[2,56],61:[2,56]},{13:[1,120],59:[1,121],60:[1,172]},{13:[2,111],59:[2,111],60:[2,111],89:[2,111]},{13:[2,113],59:[2,113],60:[2,113],67:[2,113],84:[2,113],89:[2,113]},{10:[2,64],13:[2,64],29:[2,64],31:[2,64],40:[2,64],41:[2,64],45:[2,64],47:[2,64],49:[2,64],59:[2,64],60:[2,64],61:[2,64],67:[2,64],84:[2,64],87:[2,64],89:[2,64]},{13:[2,78],60:[2,78],67:[2,78]},{15:[1,173]},{13:[2,80],47:[2,80]},{10:[2,34],29:[2,34],31:[2,34],40:[2,34],45:[2,34],49:[2,34]},{10:[2,35],29:[2,35],31:[2,35],40:[2,35],45:[2,35],49:[2,35]},{13:[2,110],59:[2,110],60:[2,110],89:[2,110]},{16:[1,99],23:102,41:[1,30],46:[1,104],59:[1,103],62:174,63:[1,98],64:[1,100],65:[1,101]},{13:[2,81],47:[2,81]}],
defaultActions: {3:[2,1],42:[2,23],131:[2,82],132:[2,83],140:[2,41],141:[2,42]},
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
case 9:return 55
break;
case 10:return 54
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
case 25:return 63
break;
case 26:this.popState(); return 10
break;
case 27:return 31
break;
case 28:/* skip whitespaces */
break;
case 29:this.begin('arg'); return 51
break;
case 30:this.begin('arg'); return 47
break;
case 31:return 45
break;
case 32:return 40
break;
case 33:return 49
break;
case 34:return 'FIRES'
break;
case 35:return 29
break;
case 36:/*return '*'*/
break;
case 37:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 63
break;
case 38:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 63
break;
case 39:return 16
break;
case 40:return 65
break;
case 41:return 64
break;
case 42:return 64
break;
case 43:return 55
break;
case 44:return 56
break;
case 45:return 57
break;
case 46:return 67
break;
case 47:return 54
break;
case 48:return 13
break;
case 49:return 81
break;
case 50:return 75
break;
case 51:return 84
break;
case 52:return 78
break;
case 53:return 15
break;
case 54:return 50
break;
case 55:return 89
break;
case 56:return 46
break;
case 57:return 47
break;
case 58:return 59
break;
case 59:return 60
break;
case 60:return 61
break;
case 61:return 58
break;
case 62:return 77
break;
case 63:return 79
break;
case 64:return 87
break;
case 65:return 41
break;
case 66:return 63
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