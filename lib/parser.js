/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"file":3,"world":4,"EOF":5,"/**":6,"tags":7,"panino_and_includes_and_fires":8,"comment":9,"**/":10,"tag_list":11,"tag":12,",":13,"DEPRECATED":14,":":15,"NUMBER":16,"..":17,"READONLY":18,"INTERNAL":19,"CHAINABLE":20,"SECTION":21,"name":22,"ALIASOF":23,"RELATEDTO":24,"BELONGSTO":25,"panino":26,"INCLUDES":27,"names":28,"TEXT":29,"section":30,"namespace":31,"class":32,"mixin":33,"signatures":34,"argument_descriptions":35,"argument_description":36,"BULLET":37,"NAME":38,"(":39,"names_alternation":40,")":41,"):":42,"events":43,"event":44,".":45,"#":46,"@":47,"?":48,"|":49,"value":50,"STRING":51,"BOOLEAN":52,"REGEXP":53,"[":54,"value_list":55,"]":56,"...":57,"{":58,"key_value_list":59,"}":60,"value2":61,"TRUE":62,"FALSE":63,"NULL":64,"key":65,"name_or_value":66,"==":67,"string":68,"CLASS":69,"<":70,"MIXIN":71,"property":72,"->":73,"returns":74,"constant":75,"=":76,"signature":77,"method":78,"NEW":79,"args":80,"arg":81,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"/**",10:"**/",13:",",14:"DEPRECATED",15:":",16:"NUMBER",17:"..",18:"READONLY",19:"INTERNAL",20:"CHAINABLE",21:"SECTION",23:"ALIASOF",24:"RELATEDTO",25:"BELONGSTO",27:"INCLUDES",29:"TEXT",37:"BULLET",38:"NAME",39:"(",41:")",42:"):",45:".",46:"#",47:"@",48:"?",49:"|",51:"STRING",52:"BOOLEAN",53:"REGEXP",54:"[",56:"]",57:"...",58:"{",60:"}",62:"TRUE",63:"FALSE",64:"NULL",67:"==",68:"string",69:"CLASS",70:"<",71:"MIXIN",73:"->",76:"=",79:"NEW"},
productions_: [0,[3,2],[4,0],[4,6],[7,0],[7,1],[11,1],[11,3],[12,1],[12,3],[12,5],[12,1],[12,1],[12,1],[12,3],[12,3],[12,3],[12,3],[8,1],[8,3],[9,0],[9,1],[26,1],[26,1],[26,1],[26,1],[26,1],[26,2],[35,1],[35,2],[36,5],[36,6],[43,1],[43,3],[44,1],[44,3],[22,1],[22,3],[22,3],[22,3],[28,1],[28,3],[40,1],[40,1],[40,3],[50,1],[50,1],[50,1],[50,1],[50,1],[50,3],[50,4],[50,3],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,1],[61,3],[61,4],[61,3],[55,0],[55,1],[55,3],[59,0],[59,3],[59,5],[65,1],[65,1],[66,1],[30,3],[30,3],[31,1],[32,2],[32,4],[33,2],[72,3],[72,3],[75,3],[34,1],[34,2],[77,1],[77,3],[77,3],[77,1],[77,1],[77,2],[78,4],[78,5],[74,1],[74,1],[74,3],[80,0],[80,1],[80,3],[80,5],[80,4],[81,1],[81,4],[81,3],[81,2]],
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
      console.error('ERROR: name clash: ' + x.id);
      process.exit(1);
    }
    this.$[x.id] = x;
    // FIXME: remove once tree is build ok
    /*this.$[x.id] = {
      id: x.id,
      type: x.type,
      section: x.section
    };*/
  
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
case 13: this.$ = {chainable: true} 
break;
case 14: this.$ = {section: $$[$0]} 
break;
case 15: this.$ = {alias_of: $$[$0]} 
break;
case 16: this.$ = {related_to: $$[$0]} 
break;
case 17: this.$ = {belongs_to: $$[$0]} 
break;
case 19: this.$.included_mixins = $$[$0] 
break;
case 20: this.$ = {text: '', line: yy.lexer.yylloc.last_line} 
break;
case 21: this.$ = {text: $$[$0], line: yy.lexer.yylloc.last_line} 
break;
case 27: this.$.arguments = $$[$0] 
break;
case 28: this.$ = [$$[$0]] 
break;
case 29: this.$.push($$[$0]) 
break;
case 30: this.$ = {name: $$[$0-3], types: $$[$0-1]} 
break;
case 31:
    this.$ = {
      name: $$[$0-4],
      types: $$[$0-2],
      description: $$[$0].replace(/(?:\s*\*\s*|\s+)/g, ' ').replace(/(^\s*|\s*$)/g, '')
    };
  
break;
case 32: this.$ = [$$[$0]] 
break;
case 33: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 35: this.$ += $$[$0-1] + $$[$0] 
break;
case 37: this.$ += $$[$0-1] + $$[$0] 
break;
case 38: this.$ += $$[$0-1] + $$[$0] 
break;
case 39: this.$ += $$[$0-1] + $$[$0] 
break;
case 40: this.$ = [$$[$0]] 
break;
case 41: this.$ = $$[$0-2]; this.$.push($$[$0]) 
break;
case 42: this.$ = [] 
break;
case 43: this.$ = [$$[$0]] 
break;
case 44: this.$.push($$[$0]) 
break;
case 45: this.$ = String($$[$0]) 
break;
case 46: this.$ = Number($$[$0]) 
break;
case 47: this.$ = $$[$0] === 'true' ? true : false 
break;
case 48: this.$ = new RegExp($$[$0]) 
break;
case 50: this.$ = $$[$0-1]; this.$.array = true 
break;
case 51: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 52: this.$ = $$[$0-1] 
break;
case 53: this.$ = {value: String($$[$0]), type: 'string'} 
break;
case 54: this.$ = {value: Number($$[$0]), type: 'number'} 
break;
case 55: this.$ = {value: true, type: 'boolean'} 
break;
case 56: this.$ = {value: false, type: 'boolean'} 
break;
case 57: this.$ = {value: null, type: 'null'} 
break;
case 58: this.$ = {value: $$[$0], type: 'regexp'} 
break;
case 59: this.$ = {value: $$[$0], type: 'name'} 
break;
case 60: this.$ = $$[$0-1]; this.$.array = true 
break;
case 61: this.$ = $$[$0-2]; this.$.array = true; this.$.ellipsis = true 
break;
case 62: this.$ = $$[$0-1] 
break;
case 63: this.$ = [] 
break;
case 64: this.$ = [$$[$0]] 
break;
case 65: this.$.push($$[$0]) 
break;
case 66: this.$ = {} 
break;
case 67: this.$ = {}; this.$[$$[$0-2]] = $$[$0] 
break;
case 68: this.$[$$[$0-2]] = $$[$0] 
break;
case 72: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 73: this.$ = {id: $$[$0-1], type: 'section'}; 
break;
case 74: this.$ = {id: $$[$0], type: 'namespace'}; 
break;
case 75: this.$ = {id: $$[$0], type: 'class'}; 
break;
case 76: this.$ = {id: $$[$0-2], type: 'class', superclass: $$[$0]}; 
break;
case 77: this.$ = {id: $$[$0], type: 'mixin'} 
break;
case 78: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 79: this.$ = {id: $$[$0-2], type: 'property', returns: $$[$0]} 
break;
case 80: this.$ = {id: $$[$0-2], type: 'constant', returns: $$[$0]} 
break;
case 81:
    this.$ = $$[$0];
    this.$.signatures = [{args: $$[$0].args, returns: $$[$0].returns}];
    delete this.$.args;
    delete this.$.returns;
  
break;
case 82:
    this.$.signatures.push({args: $$[$0].args, returns: $$[$0].returns});
    delete this.$.args;
    delete this.$.returns;
  
break;
case 84: this.$.returns = $$[$0] 
break;
case 85: this.$.returns = $$[$0] 
break;
case 88: this.$ = $$[$0]; this.$.id = this.$.id + '.' + $$[$0-1]; this.$.type = 'constructor' 
break;
case 89: this.$ = {id: $$[$0-3], type: 'method', args: $$[$0-1]} 
break;
case 90: this.$ = {id: $$[$0-4], type: 'method', args: $$[$0-1], bound: true} 
break;
case 91: this.$ = [{type: '?'}] 
break;
case 92:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$ = [ret];
  
break;
case 93:
    var x = $$[$0];
    var ret = {
      type: x
    };
    if (x.array) ret.array = x.array;
    if (x.ellipsis) ret.ellipsis = x.ellipsis;
    this.$.push(ret);
  
break;
case 94: this.$ = [] 
break;
case 95: this.$ = [$$[$0]] 
break;
case 96: this.$.push($$[$0]) 
break;
case 97:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-4].push(a);
    });
  
break;
case 98:
    $$[$0-1].forEach(function(a) {
      a.optional = true;
      $$[$0-3].push(a);
    });
  
break;
case 99: this.$ = {name: $$[$0]} 
break;
case 100: this.$ = {name: $$[$0-3], args: $$[$0-1]} 
break;
case 101: this.$.default_value = $$[$0] 
break;
case 102: this.$.ellipsis = true 
break;
}
},
table: [{3:1,4:2,5:[2,2],6:[2,2]},{1:[3]},{5:[1,3],6:[1,4]},{1:[2,1]},{7:5,11:6,12:7,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15],38:[2,4],67:[2,4],69:[2,4],71:[2,4],79:[2,4]},{8:16,22:24,26:17,30:18,31:19,32:20,33:21,34:22,38:[1,28],67:[1,23],69:[1,25],71:[1,26],72:30,75:31,77:27,78:29,79:[1,32]},{13:[1,33],38:[2,5],67:[2,5],69:[2,5],71:[2,5],79:[2,5]},{13:[2,6],38:[2,6],67:[2,6],69:[2,6],71:[2,6],79:[2,6]},{13:[2,8],15:[1,34],38:[2,8],67:[2,8],69:[2,8],71:[2,8],79:[2,8]},{13:[2,11],38:[2,11],67:[2,11],69:[2,11],71:[2,11],79:[2,11]},{13:[2,12],38:[2,12],67:[2,12],69:[2,12],71:[2,12],79:[2,12]},{13:[2,13],38:[2,13],67:[2,13],69:[2,13],71:[2,13],79:[2,13]},{15:[1,35]},{15:[1,36]},{15:[1,37]},{15:[1,38]},{9:39,10:[2,20],29:[1,40]},{10:[2,18],27:[1,41],29:[2,18]},{10:[2,22],27:[2,22],29:[2,22]},{10:[2,23],27:[2,23],29:[2,23]},{10:[2,24],27:[2,24],29:[2,24]},{10:[2,25],27:[2,25],29:[2,25]},{10:[2,26],22:46,27:[2,26],29:[2,26],35:42,36:44,37:[1,45],38:[1,28],72:30,75:31,77:43,78:29,79:[1,32]},{38:[1,48],68:[1,47]},{10:[2,74],13:[1,54],27:[2,74],29:[2,74],39:[1,52],45:[1,49],46:[1,50],47:[1,51],73:[1,53],76:[1,55]},{22:56,38:[1,28]},{22:57,38:[1,28]},{10:[2,81],27:[2,81],29:[2,81],37:[2,81],38:[2,81],79:[2,81]},{10:[2,36],13:[2,36],27:[2,36],29:[2,36],37:[2,36],38:[2,36],39:[2,36],41:[2,36],42:[2,36],45:[2,36],46:[2,36],47:[2,36],49:[2,36],54:[2,36],56:[2,36],57:[2,36],60:[2,36],67:[2,36],69:[2,36],70:[2,36],71:[2,36],73:[2,36],76:[2,36],79:[2,36]},{10:[2,83],13:[1,59],27:[2,83],29:[2,83],37:[2,83],38:[2,83],73:[1,58],79:[2,83]},{10:[2,86],27:[2,86],29:[2,86],37:[2,86],38:[2,86],79:[2,86]},{10:[2,87],27:[2,87],29:[2,87],37:[2,87],38:[2,87],79:[2,87]},{22:61,38:[1,28],78:60},{12:62,14:[1,8],18:[1,9],19:[1,10],20:[1,11],21:[1,12],23:[1,13],24:[1,14],25:[1,15]},{16:[1,63]},{22:64,38:[1,28]},{22:65,38:[1,28]},{22:66,38:[1,28]},{22:67,38:[1,28]},{10:[1,68]},{10:[2,21]},{22:70,28:69,38:[1,28]},{10:[2,27],27:[2,27],29:[2,27],36:71,37:[1,45]},{10:[2,82],27:[2,82],29:[2,82],37:[2,82],38:[2,82],79:[2,82]},{10:[2,28],27:[2,28],29:[2,28],37:[2,28]},{38:[1,72]},{13:[1,54],39:[1,52],45:[1,49],46:[1,50],47:[1,51],73:[1,53],76:[1,55]},{67:[1,73]},{67:[1,74]},{38:[1,75]},{38:[1,76]},{38:[1,77]},{13:[2,94],38:[1,81],41:[2,94],47:[1,79],54:[2,94],80:78,81:80},{16:[1,87],22:90,38:[1,28],48:[1,83],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:84,74:82},{16:[1,87],22:90,38:[1,28],48:[1,83],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:84,74:93},{16:[1,87],22:90,38:[1,28],48:[1,83],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:84,74:94},{10:[2,75],27:[2,75],29:[2,75],45:[1,49],46:[1,50],47:[1,51],70:[1,95]},{10:[2,77],27:[2,77],29:[2,77],45:[1,49],46:[1,50],47:[1,51]},{16:[1,87],22:90,38:[1,28],48:[1,83],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:84,74:96},{16:[1,87],22:90,38:[1,28],48:[1,83],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:84,74:97},{10:[2,88],27:[2,88],29:[2,88],37:[2,88],38:[2,88],79:[2,88]},{39:[1,52],45:[1,49],46:[1,50],47:[1,51]},{13:[2,7],38:[2,7],67:[2,7],69:[2,7],71:[2,7],79:[2,7]},{13:[2,9],17:[1,98],38:[2,9],67:[2,9],69:[2,9],71:[2,9],79:[2,9]},{13:[2,14],38:[2,14],45:[1,49],46:[1,50],47:[1,51],67:[2,14],69:[2,14],71:[2,14],79:[2,14]},{13:[2,15],38:[2,15],45:[1,49],46:[1,50],47:[1,51],67:[2,15],69:[2,15],71:[2,15],79:[2,15]},{13:[2,16],38:[2,16],45:[1,49],46:[1,50],47:[1,51],67:[2,16],69:[2,16],71:[2,16],79:[2,16]},{13:[2,17],38:[2,17],45:[1,49],46:[1,50],47:[1,51],67:[2,17],69:[2,17],71:[2,17],79:[2,17]},{5:[2,3],6:[2,3]},{10:[2,19],13:[1,99],29:[2,19]},{10:[2,40],13:[2,40],29:[2,40],45:[1,49],46:[1,50],47:[1,51]},{10:[2,29],27:[2,29],29:[2,29],37:[2,29]},{39:[1,100]},{10:[2,72],27:[2,72],29:[2,72]},{10:[2,73],27:[2,73],29:[2,73]},{10:[2,37],13:[2,37],27:[2,37],29:[2,37],37:[2,37],38:[2,37],39:[2,37],41:[2,37],42:[2,37],45:[2,37],46:[2,37],47:[2,37],49:[2,37],54:[2,37],56:[2,37],57:[2,37],60:[2,37],67:[2,37],69:[2,37],70:[2,37],71:[2,37],73:[2,37],76:[2,37],79:[2,37]},{10:[2,38],13:[2,38],27:[2,38],29:[2,38],37:[2,38],38:[2,38],39:[2,38],41:[2,38],42:[2,38],45:[2,38],46:[2,38],47:[2,38],49:[2,38],54:[2,38],56:[2,38],57:[2,38],60:[2,38],67:[2,38],69:[2,38],70:[2,38],71:[2,38],73:[2,38],76:[2,38],79:[2,38]},{10:[2,39],13:[2,39],27:[2,39],29:[2,39],37:[2,39],38:[2,39],39:[2,39],41:[2,39],42:[2,39],45:[2,39],46:[2,39],47:[2,39],49:[2,39],54:[2,39],56:[2,39],57:[2,39],60:[2,39],67:[2,39],69:[2,39],70:[2,39],71:[2,39],73:[2,39],76:[2,39],79:[2,39]},{13:[1,102],41:[1,101],54:[1,103]},{13:[2,94],38:[1,81],41:[2,94],54:[2,94],80:104,81:80},{13:[2,95],41:[2,95],54:[2,95],56:[2,95],57:[1,106],76:[1,105]},{13:[2,99],39:[1,107],41:[2,99],54:[2,99],56:[2,99],57:[2,99],76:[2,99]},{10:[2,78],27:[2,78],29:[2,78],37:[2,78],38:[2,78],49:[1,108],79:[2,78]},{10:[2,91],27:[2,91],29:[2,91],37:[2,91],38:[2,91],49:[2,91],79:[2,91]},{10:[2,92],27:[2,92],29:[2,92],37:[2,92],38:[2,92],49:[2,92],79:[2,92]},{10:[2,71],13:[2,71],27:[2,71],29:[2,71],37:[2,71],38:[2,71],41:[2,71],49:[2,71],54:[2,71],56:[2,71],57:[2,71],76:[2,71],79:[2,71]},{10:[2,45],13:[2,45],27:[2,45],29:[2,45],37:[2,45],38:[2,45],41:[2,45],49:[2,45],54:[2,45],56:[2,45],57:[2,45],60:[2,45],76:[2,45],79:[2,45]},{10:[2,46],13:[2,46],27:[2,46],29:[2,46],37:[2,46],38:[2,46],41:[2,46],49:[2,46],54:[2,46],56:[2,46],57:[2,46],60:[2,46],76:[2,46],79:[2,46]},{10:[2,47],13:[2,47],27:[2,47],29:[2,47],37:[2,47],38:[2,47],41:[2,47],49:[2,47],54:[2,47],56:[2,47],57:[2,47],60:[2,47],76:[2,47],79:[2,47]},{10:[2,48],13:[2,48],27:[2,48],29:[2,48],37:[2,48],38:[2,48],41:[2,48],49:[2,48],54:[2,48],56:[2,48],57:[2,48],60:[2,48],76:[2,48],79:[2,48]},{10:[2,49],13:[2,49],27:[2,49],29:[2,49],37:[2,49],38:[2,49],41:[2,49],45:[1,49],46:[1,50],47:[1,51],49:[2,49],54:[2,49],56:[2,49],57:[2,49],60:[2,49],76:[2,49],79:[2,49]},{13:[2,63],16:[1,87],22:90,38:[1,28],50:110,51:[1,86],52:[1,88],53:[1,89],54:[1,91],55:109,56:[2,63],57:[2,63],58:[1,92]},{13:[2,66],38:[1,114],51:[1,113],59:111,60:[2,66],65:112},{10:[2,79],27:[2,79],29:[2,79],37:[2,79],38:[2,79],49:[1,108],79:[2,79]},{10:[2,80],27:[2,80],29:[2,80],37:[2,80],38:[2,80],49:[1,108],79:[2,80]},{22:115,38:[1,28]},{10:[2,84],27:[2,84],29:[2,84],37:[2,84],38:[2,84],49:[1,108],79:[2,84]},{10:[2,85],27:[2,85],29:[2,85],37:[2,85],38:[2,85],49:[1,108],79:[2,85]},{16:[1,116]},{22:117,38:[1,28]},{22:120,38:[1,28],40:118,48:[1,119]},{10:[2,89],13:[2,89],27:[2,89],29:[2,89],37:[2,89],38:[2,89],73:[2,89],79:[2,89]},{38:[1,81],54:[1,122],81:121},{13:[2,94],38:[1,81],54:[2,94],56:[2,94],80:123,81:80},{13:[1,102],41:[1,124],54:[1,103]},{16:[1,87],22:90,38:[1,28],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:125},{13:[2,102],41:[2,102],54:[2,102],56:[2,102],57:[2,102],76:[2,102]},{13:[2,94],38:[1,81],41:[2,94],54:[2,94],80:126,81:80},{16:[1,87],22:90,38:[1,28],50:85,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92],66:127},{13:[1,130],56:[1,128],57:[1,129]},{13:[2,64],56:[2,64],57:[2,64]},{13:[1,132],60:[1,131]},{15:[1,133]},{15:[2,69]},{15:[2,70]},{10:[2,76],27:[2,76],29:[2,76],45:[1,49],46:[1,50],47:[1,51]},{13:[2,10],38:[2,10],67:[2,10],69:[2,10],71:[2,10],79:[2,10]},{10:[2,41],13:[2,41],29:[2,41],45:[1,49],46:[1,50],47:[1,51]},{41:[1,134],42:[1,135],49:[1,136]},{41:[2,42],42:[2,42],49:[2,42]},{41:[2,43],42:[2,43],45:[1,49],46:[1,50],47:[1,51],49:[2,43]},{13:[2,96],41:[2,96],54:[2,96],56:[2,96],57:[1,106],76:[1,105]},{13:[2,94],38:[1,81],54:[2,94],56:[2,94],80:137,81:80},{13:[1,102],54:[1,103],56:[1,138]},{10:[2,90],13:[2,90],27:[2,90],29:[2,90],37:[2,90],38:[2,90],73:[2,90],79:[2,90]},{13:[2,101],41:[2,101],54:[2,101],56:[2,101],57:[2,101],76:[2,101]},{13:[1,102],41:[1,139],54:[1,103]},{10:[2,93],27:[2,93],29:[2,93],37:[2,93],38:[2,93],49:[2,93],79:[2,93]},{10:[2,50],13:[2,50],27:[2,50],29:[2,50],37:[2,50],38:[2,50],41:[2,50],49:[2,50],54:[2,50],56:[2,50],57:[2,50],60:[2,50],76:[2,50],79:[2,50]},{56:[1,140]},{16:[1,87],22:90,38:[1,28],50:141,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92]},{10:[2,52],13:[2,52],27:[2,52],29:[2,52],37:[2,52],38:[2,52],41:[2,52],49:[2,52],54:[2,52],56:[2,52],57:[2,52],60:[2,52],76:[2,52],79:[2,52]},{38:[1,114],51:[1,113],65:142},{16:[1,87],22:90,38:[1,28],50:143,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92]},{10:[2,30],27:[2,30],29:[2,30],37:[2,30]},{29:[1,144]},{22:145,38:[1,28]},{13:[1,102],54:[1,103],56:[1,146]},{13:[2,98],41:[2,98],54:[2,98],56:[2,98]},{13:[2,100],41:[2,100],54:[2,100],56:[2,100],57:[2,100],76:[2,100]},{10:[2,51],13:[2,51],27:[2,51],29:[2,51],37:[2,51],38:[2,51],41:[2,51],49:[2,51],54:[2,51],56:[2,51],57:[2,51],60:[2,51],76:[2,51],79:[2,51]},{13:[2,65],56:[2,65],57:[2,65]},{15:[1,147]},{13:[2,67],60:[2,67]},{10:[2,31],27:[2,31],29:[2,31],37:[2,31]},{41:[2,44],42:[2,44],45:[1,49],46:[1,50],47:[1,51],49:[2,44]},{13:[2,97],41:[2,97],54:[2,97],56:[2,97]},{16:[1,87],22:90,38:[1,28],50:148,51:[1,86],52:[1,88],53:[1,89],54:[1,91],58:[1,92]},{13:[2,68],60:[2,68]}],
defaultActions: {3:[2,1],40:[2,21],113:[2,69],114:[2,70]},
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
case 9:return 46
break;
case 10:return 45
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
case 18:return 23
break;
case 19:/* N.B. shouldn't it be ALIAS, and reversed sense */ return 23
break;
case 20:return 24
break;
case 21:return 25
break;
case 22:return 38
break;
case 23:return 51
break;
case 24:this.popState(); return 10
break;
case 25:return 29
break;
case 26:/* skip whitespaces */
break;
case 27:this.begin('arg'); return 42
break;
case 28:return !yy.useAsterisk ? 'BULLET' : '*-'
break;
case 29:return 'FIRES'
break;
case 30:return 27
break;
case 31:/*return '*'*/
break;
case 32:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 51
break;
case 33:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 51
break;
case 34:return 16
break;
case 35:return 53
break;
case 36:return 52
break;
case 37:return 52
break;
case 38:return 46
break;
case 39:return 47
break;
case 40:return 48
break;
case 41:return 57
break;
case 42:return 45
break;
case 43:return 13
break;
case 44:return 73
break;
case 45:return 67
break;
case 46:return 76
break;
case 47:return 70
break;
case 48:return 15
break;
case 49:return 39
break;
case 50:return 41
break;
case 51:return 54
break;
case 52:return 56
break;
case 53:return 58
break;
case 54:return 60
break;
case 55:return 49
break;
case 56:return 69
break;
case 57:return 71
break;
case 58:return 79
break;
case 59:return 38
break;
case 60:return 51
break;
case 61:this.popState(); return 29
break;
case 62:this.popState(); console.log('LEFTCOMM'); return 29
break;
}
};
lexer.rules = [/^$/,/^\s+/,/^\/\*\*(?=([^/]))/,/^.*/,/^\*\*\//,/^\s*[\n]/,/^, /,/^: /,/^\.\./,/^#/,/^\./,/^\s+/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^deprecated\b/,/^read-only\b/,/^internal\b/,/^chainable\b/,/^section\b/,/^alias of\b/,/^alias\b/,/^related to\b/,/^belongs to\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^\*\*\//,/^\*\s*?[\n][\s\S]*?(?=\*\*\/)/,/^\s+/,/^\)\s*:/,/^\*\s*-/,/^\*\s*fires\b/,/^\*\s*includes\b/,/^\*/,/^"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,/^'(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/,/^-?(?:[0-9]|[1-9][0-9]+)(?:\.[\.0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,/^\/(?:[^\/]|\\\/)*\/[gim]*/,/^true\b/,/^false\b/,/^#/,/^@/,/^\?/,/^\.\.\./,/^\./,/^,/,/^->/,/^==/,/^=/,/^</,/^:/,/^\(/,/^\)/,/^\[/,/^\]/,/^\{/,/^\}/,/^\|/,/^class\b/,/^mixin\b/,/^new\b/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9]*)/,/^(?:[$_a-zA-Z][$_a-zA-Z0-9 ]*)/,/^[\s\S]*?(?=(\*\s*[-\n]))/,/^[\s\S]*?(?=\*\*\/)/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3],"inclusive":true},"tags":{"rules":[0,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"inclusive":false},"def":{"rules":[0,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],"inclusive":false},"arg":{"rules":[0,61],"inclusive":false},"comment":{"rules":[0,62],"inclusive":false}};
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