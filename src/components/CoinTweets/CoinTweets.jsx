import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import styled from 'styled-components';

const TwitterDiv = styled.div`
  height: 600px;

  overflow: scroll;
`

export default function CoinTweets(props) {
  // debugger;
  return (
    <TwitterDiv>
      <TwitterTimelineEmbed
        sourceType="profile"
        onLoad={function noRefCheck(){}}
        screenName={props.coinTwitter}
        // make twitter embed scrollable 
        options={{ 
          width: 550,
        }}
      />
    </TwitterDiv>
  )
}
