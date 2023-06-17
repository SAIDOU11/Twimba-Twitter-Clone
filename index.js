import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter((tweet) => {
    return tweet.uuid === tweetId;
  })[0];

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else {
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetID) {
  const targetTweetObj = tweetsData.filter((tweet) => {
    return tweet.uuid === tweetID;
  })[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else {
    targetTweetObj.retweets--;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
}

function handleReplyClick(replyId) {
  const divReply = document.getElementById(`replies-${replyId}`);
  divReply.classList.toggle("hidden");
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: "@Scrimba 💯",
      profilePic: "images/scrimbalogo.png",
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    render();
  }
  tweetInput.value = "";
}

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach((replier) => {
        repliesHtml += `<div class="tweet-reply">
        <div class="tweet-inner">
            <img src= ${replier.profilePic} class="profile-pic">
                <div>
                    <p class="handle">${replier.handle}</p>
                    <p class="tweet-text">${replier.tweetText}</p>
                </div>
            </div>
    </div>`;
      });
    }

    feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text  ">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i data-reply=${tweet.uuid} class="fa-regular fa-comment-dots "></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i data-like=${tweet.uuid} class="fa-solid fa-heart ${likeIconClass} "></i>
                ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i data-retweet=${tweet.uuid} class="fa-solid fa-retweet ${retweetIconClass} "></i>
                ${tweet.retweets}
                </span>
               
            </div>   
        </div>            
    </div>
    <div  id="replies-${tweet.uuid}">
    ${repliesHtml}
    </div>
</div> `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
