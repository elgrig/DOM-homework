export const renderComments = ({ comments }) => {
    const container = document.querySelector(".container");
    const commentsHtml = comments.map((comment, index) => {
        return `    
      <li class="comment">
      <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
      </div>
      <div class="comment-body" data-index="${index}">    
          <div class="comment-text">
          ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>")}
          </div>
      </div>
      <div class="comment-footer">
          <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comments[index].isLiked ? "-active-like" : ""}"></button>
      </div>
      </div >
      </li > 
      `
    }).join("");

    container.innerHTML = `<ul class="comments">${commentsHtml}</ul>`;
}

