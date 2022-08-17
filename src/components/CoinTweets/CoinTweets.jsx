import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function CoinTweets(props) {
  // debugger;
  return (
    <div>
      Twitter feed for {props.coinTwitter}
      <TwitterTimelineEmbed
        sourceType="timeline"
        screenName={props.coinTwitter}
        options={{height: 400}}
      />
    </div>
  )
}
