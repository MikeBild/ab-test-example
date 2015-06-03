task.eventsource  
  .from(['AB-css-colored-button'])  
  .run({
    $init: function(){
      return {
        visit: {
          count: 0
        },
        impression: {
          count: 0
        },
        conversion: {}
      };      
    },
    $any: function(state, e){
      if(e.shown){
        state.conversion[e.shown] = 0;
        state.impression.count += 1;
        if(!state.impression[e.shown]) state.impression[e.shown] = 0;
        state.impression[e.shown] += 1;
      }

      if(e.chose){
        state.conversion[e.chose] = 0;
        state.visit.count += 1;
        if(!state.visit[e.chose]) state.visit[e.chose] = 0;
        state.visit[e.chose] += 1;
      }      

      return state;
    },
    $completed: function(state){
      for(var idx in state.conversion){
        state.conversion[idx] = state.visit[idx] / state.impression[idx] * 100 || 0;
      } 
      return state;
    }
  }, task.done);