# Simplified AB-Test Example

> "Write programs that do one thing and do it well." — Doug McIlroy, Unix philosophy 

Make user-driven decisions with a simplified A/B test system. The client side is self contained without external dependencies. The client uses cryptographically random A/B test variant and track the results to a microservice backend.

* [Live AB-Test Example](http://mikebild.github.io/ab-test-example)
* [Ad-Hoc-Statistics](https://demoabtest.subkit.io/api/AB-css-colored-button-stats)

##Setup Example

###Client

```
open app/index.html
```

###Service

```
cd services
subkit update abtest
subkit start abtest
```

##How-To 
Testing different versions of text, backend rendered HTML templates, different backend APIs, layouts, images, or colors in the browser has never been more simple.

### add variants
Register the a/b test variants. e.g.

```
AB.test(['red','green','blue'], 1);
```

### frequently you want to run the a/b tests
* 1 will always run the a/b test
* 0.5 will run the test 50% of the time
* 0.2 will run the test two out of ten times
* 0.001 will run the test one thousandth of the time

### track `shown` and `chose`

**Track impression**

```
AB.track({shown:cssClass});
```

**Track visit**

```
AB.track({chose:cssClass});
```

##Conversion rate statistics
How you analyze the actionable data is up to you. In this simplified example the client uses one microservice for a AB-Test created with [Subkit](http://subkit.io) to track the impressions and visits for different feature variants.

An ad-hoc Event-Log-Projection is used to analyse and calculate the conversion rates for different feature `css-colored-button` variants.

[Ad-Hoc-Statistics](https://demoabtest.subkit.io/api/AB-css-colored-button-stats)

````
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
  ```
