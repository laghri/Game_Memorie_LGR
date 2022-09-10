document.querySelector('.control-buttons span').onclick=function(){
    let YourName=prompt("What your Name");
    if(YourName==null || YourName==""){
        document.querySelector('.name span').innerHTML='Unkonw';
        
    }
    else {
        document.querySelector('.name span').innerHTML= YourName;
    }
    document.querySelector('.control-buttons').remove();
    blocks.forEach((block)=>{
        block.classList.add('is-fliped');
       
     })
    setTimeout(()=>{
    
        blocks.forEach((block)=>{
            block.classList.remove('is-fliped');
           
         })
    
    
    },duration)
   
};
 


let duration=1000;
let blocksContainer=document.querySelector('.memory-game-blocks');
let blocks=Array.from(blocksContainer.children);
let orderRange=[...Array(blocks.length).keys()];

shuffle(orderRange);
//add order css prperties to game blocks
blocks.forEach( (block,index)=>{
    block.style.order=orderRange[index]; 
    block.addEventListener('click',function(){
        flipBlock(block);
        
    })
});


// shuffle function
function shuffle(array){
    //setting vars

    let current=array.length,
         temps,
         random;
       
  while(current>0){
        //get random number
        random=Math.floor(Math.random()*current);
        //decrise legth by 1
       current--;
    //    save current element in Stash
    temp=array[current];
    //current element =random element
    array[current]=array[random];
    //random element =get element from stash
    array[random]=temp;

     
    }
    return array;
}
//flip function
function flipBlock(selectBlok){
    //add class is-flipped
    selectBlok.classList.add('is-fliped');
    //collect all fliped cart
    let AllflipedBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-fliped'));

 
    //If there two selected bloks
 if(AllflipedBlocks.length===2){
     //stop clicked
     stopCliking();
     //chek match function
     checkMatcheBlocks(AllflipedBlocks[0],AllflipedBlocks[1]);
 }


}
//cheked matching blocks
function checkMatcheBlocks(firstBlock,secondBlock){
    let triesElement=document.querySelector('.tries span');
    if(firstBlock.dataset.nature===secondBlock.dataset.nature){
        firstBlock.classList.remove('is-fliped');
        secondBlock.classList.remove('is-fliped');
        firstBlock.classList.add('is-match');
        secondBlock.classList.add('is-match');
        document.getElementById('win').play();
    }
    else{
        triesElement.innerHTML=parseInt( triesElement.innerHTML)+1;
      
        setTimeout(()=>{
            firstBlock.classList.remove('is-fliped');
            secondBlock.classList.remove('is-fliped');

        },duration);
        document.getElementById('lose').play();
    
    }
}
//stop cliking function
function stopCliking(){
    //add class no clikinng on main container
    blocksContainer.classList.add('no-cliking');
    setTimeout(()=>{
        //remove class no cliking after the duration
        blocksContainer.classList.remove('no-cliking');

    },duration)
}
