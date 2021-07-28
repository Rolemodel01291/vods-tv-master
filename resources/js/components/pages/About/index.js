import React from 'react'
import styled from 'styled-components';
import AdSense from 'react-adsense';

export const StyledDiv = styled.div`
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background-color: #f3f4f5;
  & p {
    color: #737272;
  }
`;

<a href="url">link text</a>

const About = () => {
  return (
    <div className="container">
      <StyledDiv>
        <h1 className="mt-3 mb-3">About Us</h1>
        <p>When <a href="https://www.twitch.tv/">Twitch</a> came out, the excitement and frenzy with the content on the site was unprecedented.</p>
        <p>From the highlights to streams, broadcasts and podcasts, everyone had something to binge on.</p>
        <p>We bring back the Twitch vods magic and provide you with the content you miss from earlier streams and new uploads from your favorite content creators.</p>
        <p>Our developers and content providers work tirelessly to provide our visitors with the whole twitch vods experience from most viewed videos, trending vods and the option to search for vods by other twitch streamers or games. Our platform is a go-to haven for all your favorite twitch videos as they come out and those you missed their upload.</p>
        <p>Catch up on last broadcasts, browse the activity feed or search for popular Twitch vods, we have it all.</p>
        <p>Our visitors can view gameplay sessions, watch previous live twitch stream or browse the catalog of new Twitch vods as they are uploaded.</p>
        <p>For twitch fans looking to catch up on archived VODs, expired streams or previous broadcasts, our curated catalog of twitch VODs will be of immense help.</p>
        <p>We guarantee you with an unmatched entertainment experience.</p>
        <p className="mb-5">All Twitch vods content on our platform are owned by twitch.tv, and not by us.</p>
        <p className="mb-2"><span>Contact us:&nbsp;</span><a href="mailto: Support@Vods.tv">Support@Vods.tv</a></p>
        <p><span>Advertisement:&nbsp;</span><a href="mailto: Advertisement@Vods.tv">Advertisement@Vods.tv</a></p>


      </StyledDiv>
    </div>
  )
}

export default About