import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function boot(saved=null){
 const elements=new Map(),events={},timers=[],frames=[];let time=0;
 function element(){return {value:'',children:[],attrs:{},disabled:false,textContent:'',tagName:'DIV',append(b){this.children.push(b);},prepend(b){this.children.unshift(b);},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){this[k]=f;},focus(){},get lastChild(){const p=this;return {remove(){p.children.pop();}};},getBoundingClientRect(){return {left:0,top:0,width:1100,height:680};}};}
 function get(s){if(!elements.has(s))elements.set(s,element());return elements.get(s);}
 const tableButtons=[element(),element(),element()];
 const gradient={addColorStop(){}};const ctx=new Proxy({createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},{get:(o,k)=>k in o?o[k]:()=>{},set:(o,k,v)=>(o[k]=v,true)});
 get('#scene').getContext=()=>ctx;get('#wish').value='Chúc cả bàn sức khỏe!';
 const sandbox={document:{querySelector:get,querySelectorAll:()=>tableButtons,createElement:element},matchMedia:()=>({matches:false}),localStorage:{getItem:()=>saved,setItem(){}},performance:{now:()=>time},requestAnimationFrame:f=>frames.push(f),setTimeout:f=>timers.push(f),addEventListener:(k,f)=>events[k]=f,Math,console};
 vm.createContext(sandbox);vm.runInContext(readFileSync(new URL('./game.js',import.meta.url),'utf8').replaceAll('export ',''),sandbox);
 return {get,tableButtons,events,frames,timers,step(ms=50){time+=ms;frames.shift()(time);},run(code){return vm.runInContext(code,sandbox);}};
}
test('15 characters, profile fallback, scene renders and arrival unlocks clink',()=>{const g=boot('{broken');assert.equal(g.get('#characters').children.length,15);assert.equal(g.get('#clink').disabled,true);g.tableButtons[0].onclick();for(let i=0;i<50;i++)g.step();assert.match(g.get('#seat-status').textContent,/Bàn 01/);assert.equal(g.get('#clink').disabled,false);g.get('#clink').onclick();assert.match(g.get('#bubble').textContent,/Keng/);assert.equal(g.get('#count').textContent,'1 niềm vui');g.get('#leave').onclick();assert.equal(g.get('#clink').disabled,true);});
test('pointer and keyboard movement, character choice, wish and bounded log',()=>{const g=boot();g.get('#characters').children[14].onclick();assert.match(g.get('#character-name').textContent,/Quân/);g.get('#scene').pointerdown({clientX:900,clientY:620});for(let i=0;i<60;i++)g.step();assert.equal(g.run('player.x'),900);g.events.keydown({key:'ArrowLeft',target:{tagName:'CANVAS'},preventDefault(){}});g.step();g.events.keyup({key:'ArrowLeft'});assert.ok(g.run('player.x')<900);for(let i=0;i<10;i++)g.get('#send-wish').onclick();assert.equal(g.get('#log').children.length,5);assert.match(g.get('#bubble').textContent,/sức khỏe/);});
test('cheer counts down, ignores duplicate and restores button',async()=>{const g=boot();const promise=g.get('#cheer').onclick();assert.equal(g.get('#bubble').textContent,'1…');await g.get('#cheer').onclick();assert.equal(g.get('#cheer').disabled,true);for(let i=0;i<3;i++){g.timers.shift()();await Promise.resolve();}await promise;assert.equal(g.get('#cheer').disabled,false);assert.equal(g.get('#count').textContent,'1 niềm vui');assert.match(g.get('#bubble').textContent,/DZÔ/);});
