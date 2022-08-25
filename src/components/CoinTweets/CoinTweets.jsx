import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function CoinTweets(props) {
  // debugger;
  return (
    <div>
      Twitter feed for {props.coinTwitter}
      <TwitterTimelineEmbed
        sourceType="timeline"
        onLoad={function noRefCheck(){}}
        screenName={props.coinTwitter}
        // make twitter embed scrollable 
        options={{
          height: 400, 
          width: 400
        }}
        
      />
    </div>
  )
}
