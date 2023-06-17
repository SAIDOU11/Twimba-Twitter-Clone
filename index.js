import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", () => {
  console.log(tweetInput.value);
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
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

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach((tweet) => {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "limegreen";
    }

    feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text ${retweetIconClass} ">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i data-reply=${tweet.uuid} class="fa-regular fa-comment-dots"></i>
                ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i data-like=${tweet.uuid} class="fa-solid fa-heart ${likeIconClass} "></i>
                ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i data-retweet=${tweet.uuid} class="fa-solid fa-retweet"></i>
                ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div> `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}
render();
