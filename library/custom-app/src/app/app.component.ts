import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('disperse', [
      state('show', style({
        height: '*',
        opacity: 1
      })),
      state('hide', style({
        height: 0,
        opacity: 0
      })),
      transition('*<=>*', animate('0.3s linear'))
    ]
    )
  ]
})
export class AppComponent {
  constructor() {}

  arr = this.itr(8);

  numOfItr:any[] = [1,2];
  numOfItr2:any[] = [1];

  itr(n:any) {
    let brr = [];
    for (let i = 1; i <= n; i++) {
      brr[i] = i;
    }
    return brr;
  }


  mouseDown: boolean[] = [];
  showArrow:boolean[]=[];
  startX:any[] = [];
  nextX:any[] = [];
  prevX:any[] = []; 

  startX2: Map<string, any[]>=new Map();
  mouseDown2: Map<string, any[]>=new Map();
  showArrow2: Map<string, any[]>=new Map();
  prevX2: Map<string, any[]>=new Map();
  nextX2: Map<string, any[]>=new Map();

  leftArrowState: Map<string,string[]>=new Map();

  ngOnInit() {

    // if((this.startX.length == 0) && (this.prevX.length == 0) && (this.nextX.length == 0) && (this.mouseDown.length == 0) && (this.showArrow.length == 0)){
        
    //   for(let i=0;i<this.numOfItr.length;i++){
    //     this.startX[i]=this.prevX[i]=this.nextX[i]=0;
    //     this.mouseDown[i]=this.showArrow[i]=false;
    //   }
    // }
    // let n=this.numOfItr.length;
    // for(let i=0;i<this.numOfItr.length;i++){
    //   this.leftArrowState.set('hold-'+i, this.assignArray(n,'hide'));
    //   this.startX2.set('hold-'+i, this.assignArray(n,0));
    //   this.mouseDown2.set('hold-'+i, this.assignArray(n,false));
    //   this.showArrow2.set('hold-'+i, this.assignArray(n,false));
    //   this.prevX2.set('hold-'+i, this.assignArray(n,0));
    //   this.nextX2.set('hold-'+i, this.assignArray(n,0));
    // }
    let arr=[this.numOfItr]
        let str=['A']
        arr.forEach((item,itr:number)=>{  
          let n=item.length;
          this.leftArrowState.set(`hold${str[itr]}`, this.assignArray(n,'hide'));
          this.startX2.set(`hold${str[itr]}`, this.assignArray(n,0));
          this.mouseDown2.set(`hold${str[itr]}`, this.assignArray(n,false));
          this.showArrow2.set(`hold${str[itr]}`, this.assignArray(n,false));
          this.prevX2.set(`hold${str[itr]}`, this.assignArray(n,0));
          this.nextX2.set(`hold${str[itr]}`, this.assignArray(n,0));
        })

  }



  onMouseDown(holdId:any,itr:any,event:any,contId:any, arrLength:number) {
    // event.preventDefault();
  

    this.setValue(this.mouseDown2,holdId,itr,true);
    // this.mouseDown[itr] = true;
    this.setValue(this.startX2,holdId,itr,event.clientX);
    // this.startX[itr] = event.clientX;
    document.getElementById(contId)!.style.transition = 'none';
  }

  onMouseLeave(holdId:any,itr:any,mainId:any,contId:any,cardId:any, arrLength:any) {
    // this.mouseDown[itr] = false;
    this.setValue(this.mouseDown2,holdId,itr,false);
    document.getElementById(mainId)!.style.cursor = 'initial';
    document.getElementById(contId)!.style.transition = 'none';

    if(!this.checkArrow(contId,cardId,arrLength))
    {

    // this.prevX[itr]=(this.nextX[itr]);

    this.setValue(this.prevX2,holdId,itr,this.getValue(this.nextX2,holdId,itr));
    
      let cardMove=this.getTranslateX(document.getElementById(contId)!.style.transform);

      if(cardMove>0){
        this.moveToFirst(holdId,itr,contId,0.4);
      }

      let numOfCardsOnView:any=((document.getElementById(mainId)!.clientWidth)/(document.getElementById(cardId)!.clientWidth+15)).toFixed(1);

      let percOfOneCard:any=( ( (document.getElementById(cardId)!.clientWidth+15) / (document.getElementById(contId)!.clientWidth) ) * 100 ).toFixed(1);

      let rightMax:any=(percOfOneCard * (arrLength - numOfCardsOnView)).toFixed(1);

      if(Math.abs(cardMove) >= (rightMax) && this.getValue(this.prevX2,holdId,itr) < 0){
        this.moveToLast(holdId,itr,contId,-rightMax); 
        // this.showArrow[itr]=false;
        this.setValue(this.showArrow2,holdId,itr,false);
      }
      else{
        if(!this.getValue(this.showArrow2,holdId,itr)){
          // this.showArrow[itr]=true;
        this.setValue(this.showArrow2,holdId,itr,true);
        }
      }
      
    }
    else{
        this.moveToFirst(holdId,itr,contId,0.4);
      // this.showArrow[itr]=false;
        this.setValue(this.showArrow2,holdId,itr,false);
        this.setValue(this.leftArrowState,holdId,itr,'hide');
    }
  }

  onMouseUp(holdId:any,itr:any,mainId:any,contId:any,cardId:any,arrLength:any) {
    // this.mouseDown[itr] = false;
    this.setValue(this.mouseDown2,holdId,itr,false);
    
    document.getElementById(mainId)!.style.cursor = 'initial';
    document.getElementById(contId)!.style.transition = 'none';

    if(!this.checkArrow(contId,cardId,arrLength))
    {
    
    // this.prevX[itr]=this.nextX[itr];
    this.setValue(this.prevX2,holdId,itr,this.getValue(this.nextX2,holdId,itr));

      let cardMove=this.getTranslateX(document.getElementById(contId)!.style.transform);

      if(cardMove>0){
        this.moveToFirst(holdId,itr,contId,0.4);
      }

      let numOfCardsOnView:any=((document.getElementById(mainId)!.clientWidth)/(document.getElementById(cardId)!.clientWidth+15)).toFixed(1);

      let percOfOneCard:any=( ( (document.getElementById(cardId)!.clientWidth+15) / (document.getElementById(contId)!.clientWidth) ) * 100 ).toFixed(1);

      let rightMax:any=(percOfOneCard * (arrLength - numOfCardsOnView)).toFixed(1);

      if(Math.abs(cardMove) >= (rightMax) && this.getValue(this.prevX2,holdId,itr) < 0){
        this.moveToLast(holdId,itr,contId,-rightMax); 
        // this.showArrow[itr]=false;
        this.setValue(this.showArrow2,holdId,itr,false);
      }
      else{
        if(!this.getValue(this.showArrow2,holdId,itr)){
          // this.showArrow[itr]=true;
        this.setValue(this.showArrow2,holdId,itr,true);
        }
      }
    }
    else{
      this.moveToFirst(holdId,itr,contId,0.4);
      // this.showArrow[itr]=false;
        this.setValue(this.showArrow2,holdId,itr,false);
        this.setValue(this.leftArrowState,holdId,itr,'hide');
    }
  }

  onMouseMove(holdId:any,itr:any,event:any,mainId:any,contId:any,cardId:any,arrLength:any) {
    // if (!this.mouseDown[itr]) {
    //   return;
    // }
    
    if(!this.getValue(this.mouseDown2,holdId,itr)){
      return;
    }
    document.getElementById(mainId)!.style.cursor = 'grabbing';

    // const mouseDiff = event.clientX - this.startX[itr];

    const mouseDiff = event.clientX - this.getValue(this.startX2,holdId,itr);

    const movePercentage = (mouseDiff / document.getElementById(mainId)!.offsetWidth) * 100;

    // let nextPercentage = movePercentage + parseFloat(this.prevX[itr]);
    let nextPercentage = movePercentage + parseFloat(this.getValue(this.prevX2,holdId,itr));

    // this.nextX[itr] = nextPercentage;   

    document.getElementById(contId)!.style.transform = `translateX(${nextPercentage}%)`;

    document.getElementById(contId)!.style.transition = 'none';

    this.setValue(this.nextX2,holdId,itr,nextPercentage);

    if(!this.checkArrow(contId,cardId,arrLength)){
    
      if(nextPercentage < 0){
        this.setValue(this.leftArrowState,holdId,itr,'show');
      }
      else{
        this.setValue(this.leftArrowState,holdId,itr,'hide');
        this.setValue(this.showArrow2,holdId,itr,false);
      }

    }
  }

  moveNext(holdId:any,itr:any,contId:any, cardId:any,arrLength:any){ 

    let leftMove= this.getValue(this.prevX2,'hold-'+itr,itr);
    if(leftMove < 0){
      if(this.getValue(this.leftArrowState,holdId,itr) == 'hide'){
        this.setValue(this.leftArrowState,holdId,itr,'show');
      }
    }


    let moved=this.getTranslateX(document.getElementById(contId)!.style.transform);

    let numOfCardsOnView:any=((document.getElementById(contId)!.clientWidth)/(document.getElementById(cardId)!.clientWidth+15)).toFixed(1);

    let percOfOneCard:any=( ( (document.getElementById(cardId)!.clientWidth+15) / (document.getElementById(contId)!.clientWidth) ) * 100 ).toFixed(1);

    let rightMax:any=(percOfOneCard * (arrLength - numOfCardsOnView)).toFixed(1);

    if(Math.abs(moved) >= (rightMax)){
      this.setValue(this.showArrow2,holdId,itr,false);
      this.moveToLast(holdId,itr,contId,-rightMax); 
      // this.showArrow[itr]=false;
    }
    else{
      // this.showArrow[itr]=true;
      this.setValue(this.showArrow2,holdId,itr,true);

      let percentage=((document.getElementById(cardId)!.clientWidth+15)/document.getElementById(contId)!.clientWidth) * 100;
    
      percentage=(percentage.toFixed(1)) as any;
        
      document.getElementById(contId)!.style.transform =`translateX(${moved - percentage}%)`;

      // console.log("diff ",(moved - percentage)," r max ",rightMax, " m ",moved," perc ",percentage," itr ",itr);
  
      // this.prevX[itr]=this.nextX[itr]=moved-percentage;
      this.setValue(this.prevX2,holdId,itr,moved-percentage);
      this.setValue(this.nextX2,holdId,itr,moved-percentage);


      if(Math.abs(moved - percentage) >= (rightMax)){
        this.moveToLast(holdId,itr,contId,-rightMax); 
        // this.showArrow[itr]=false;
        this.setValue(this.showArrow2,holdId,itr,false);
      }
      
      if((moved - percentage) < 0){
        if(this.getValue(this.leftArrowState,holdId,itr) == 'hide'){
          this.setValue(this.leftArrowState,holdId,itr,'show');
        }
      }
  
      document.getElementById(contId)!.style.transition ='transform 0.3s linear';

    }

  }
  movePrev(holdId:any,itr:any,mainId:any,contId:any, cardId:any, arrLength:any){
    let moved=this.getTranslateX(document.getElementById(contId)!.style.transform);

    // if(Math.abs(moved) <=15 ){
    //   this.moveToFirst(holdId,itr,contId,0.4);
    // }
    // else{

    // }

    let percentage=((document.getElementById(cardId)!.clientWidth+15)/document.getElementById(contId)!.clientWidth) * 100;

    let nextPercentage = (parseFloat(moved)+parseFloat(percentage+'')).toFixed(1) as any;

    nextPercentage=Math.min(0 , nextPercentage);

    document.getElementById(contId)!.style.transform =`translateX(${nextPercentage}%)`;

    let numOfCardsOnView:any=((document.getElementById(mainId)!.clientWidth)/(document.getElementById(cardId)!.clientWidth+15)).toFixed(1);

    let percOfOneCard:any=( ( (document.getElementById(cardId)!.clientWidth+15) / (document.getElementById(contId)!.clientWidth) ) * 100 ).toFixed(1);

    let rightMax:any=(percOfOneCard * (arrLength - numOfCardsOnView)).toFixed(1);

    if(moved < rightMax){
      this.setValue(this.showArrow2,holdId,itr,true);
    }

    if(nextPercentage < 0){
      this.setValue(this.leftArrowState,holdId,itr,'show');
    }
    else{
      this.setValue(this.leftArrowState,holdId,itr,'hide');
    }

    // this.prevX[itr]=this.nextX[itr]=nextPercentage;
    this.setValue(this.prevX2,holdId,itr,nextPercentage);
    this.setValue(this.nextX2,holdId,itr,nextPercentage);

    document.getElementById(contId)!.style.transition ='transform 0.3s linear';
  }

  moveToFirst(holdId:any,itr:any,contId:any,n:any) {

    document.getElementById(contId)!.style.transition =`transform ${n}s linear`;
    document.getElementById(contId)!.style.transform = `translateX(-0%)`;
    // this.prevX[itr] = 0;
    this.setValue(this.prevX2,holdId,itr,0);
  }

  moveToLast(holdId:any,itr:any,contId:any,num:any) {

    document.getElementById(contId)!.style.transition =`transform 0.6s linear`;
    document.getElementById(contId)!.style.transform = `translateX(${num}%)`;
    // this.prevX[itr] = num;
    this.setValue(this.prevX2,holdId,itr,num);
  }

  getTranslateX(element:string):any { 
    if(!element) {return 0;}
    let i=11;
    let num: string='';
    while(element.charAt(i) != '%'){
      num+=element.charAt(i); 
      i++;
    }
    return parseFloat(num).toFixed(1);
  }

  checkArrow(contId:any,cardId:any,arrLength:any){
    return (((document.getElementById(cardId)!.clientWidth+15)*arrLength) <= (document.getElementById(contId)!.clientWidth)) ? true : false;
  }


  getOrDefault<K, V>(map: Map<K, V>, key: K,itr:number, defaultValue: V): V {
    const value = map.get(key) as any;
    return (value[itr]) ? value[itr] : defaultValue;
  }

  assignArray(arrLength:number,value:any){
    let arr=[];
    for(let i=0;i<arrLength;i++){
      arr[i]=value;
    }
    return arr;
  }

  getValue(map:Map<string,any[]>,key: string, index: number): any {
    const myArray = map.get(key);
    if (myArray && myArray.length > index) {
      return myArray[index];
    }
    return 0;
  }
  setValue(map:Map<string,any[]>,key: string,idx:number, value: any) {
    const arr = map.get(key);
    
    if (arr && arr.length > idx) {
      arr[idx]=value;
    }
  }
   

}
