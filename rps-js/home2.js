let score=JSON.parse(localStorage.getItem('Scores')) ||{
        win:0,
        lost:0,
        tie:0
      } ;
      updateScore();
      function computerMove(){
        let computerSelected='';
        let random=Math.random();
        if(random>=0 && random <1/3){
          computerSelected='Rock';
        }
        else if(random>=1/3 && random<2/3){
          computerSelected='Paper';
        }
        else if(random>=2/3 && random<1){
          computerSelected='Scissor';
        } 
        return computerSelected;
       }

       let isautoPlaying=false;
       let intervalId;
       function autoPlay(){
        if(!isautoPlaying){
        intervalId = setInterval(function(){
          let playerMove=computerMove();
          gameResult(playerMove);
        },1000);
        isautoPlaying=true;
        document.querySelector('.autoplay-button').innerHTML=`Stop Play`;
        }
        else{
          clearInterval(intervalId);
          isautoPlaying=false;
          document.querySelector('.autoplay-button').innerHTML=`Auto Play`;
        }
       }

       function gameResult(move){
        let computerSelected=computerMove();
        let owrMove=move;
        let result='';
        if(move === 'Rock'){
          if(computerSelected === 'Rock'){
            score.tie += 1;
          }
          else if(computerSelected === 'Paper'){
            score.lost += 1;
          }
          else if(computerSelected === 'Scissor'){
            score.win += 1;
          }
        }
        else if(move === 'Paper'){
          if(computerSelected === 'Rock'){
            score.win += 1;
          }
          else if(computerSelected === 'Paper'){
            score.tie += 1;
          }
          else if(computerSelected === 'Scissor'){
            score.lost += 1;
          }
        }
        else if(move === 'Scissor'){
          if(computerSelected === 'Rock'){
            score.lost += 1;
          }
          else if(computerSelected === 'Paper'){
            score.win += 1;
          }
          else if(computerSelected === 'Scissor'){
            score.tie += 1;
          }
        }
        localStorage.setItem('Scores',JSON.stringify(score));

        document.querySelector('.show-moves').innerHTML=`You <img src="rps-images/${move}-emoji.png" class="move-icon" >  <img src="rps-images/${computerSelected}-emoji.png" class="move-icon"> Computer`;
        if(score.win>score.lost && score.win>score.lost){
          result='You Win';
        }
        else if(score.lost>score.tie && score.lost>score.win){
          result='You Lost';
        }
        else if(score.tie>score.win && score.tie>score.lost){
          result='Tie Play Again';
        }
        if(score.win === 5 || score.lost === 5 || score.tie === 5){
          resetResult(result);
          resetScore();
        }
        else{
          resetResult('Playy...');
        }
        updateScore();
       }

       function resetResult(result){
        document.querySelector('.show-result').innerHTML=`${result}.`;
       }

       function updateScore(){
        document.querySelector('.show-score').innerHTML=`Wins : ${score.win}, Losts : ${score.lost}, Ties : ${score.tie}.`;
       }
       function resetScore(){
        score.win=0;
        score.lost=0;
        score.tie=0;
        localStorage.removeItem('Scores');
        updateScore();
       }
