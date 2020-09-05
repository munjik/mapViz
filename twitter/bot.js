//basically calling in the config.js file and then creating a new instance of twit with T.
const config=require('./config');
const twit = require('./twit');
const T = new twit(config);

//
// function retweet() {
//   let param = {
//     q:'#ironman',
//       result_type: 'recent',
//       count:100
//   };
//   T.get('search/tweets',param,)
//
// }

var param = {
  q:'#ironman',
  result_type: 'recent',
  count:100
};

T.get('serach/tweets',param, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses
}
