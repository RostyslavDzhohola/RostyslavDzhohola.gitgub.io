import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function CoinTweets(props) {
  return (
    <div>
      Twitter
      <TwitterTimelineEmbed
        sourceType="timeline"
        screenName="bitcoin"
        options={{height: 400}}
      />
    </div>
  )
}
