
const FullView = ({ content }) => {
  const splitIntoParagraphs = ({ content }) => {
    return content.split('\n').filter(line => line.trim() !== '')
  };

  const getTokens = ({ content }) => {
    // Split 'content' into array of tokens which are either text or links.
    return content.split(' ').map(word => {
      return {
        content: word,
        type: word.startsWith('http') ? 'link' : 'text'
      }
    })
  };

  return (
    <div className="text-lg flex flex-col gap-4">
      {splitIntoParagraphs({ content }).map((paragraph, index) => {
        const wordsOrLinks = getTokens({ content: paragraph }).map(token => {
          if (token.type === 'link') {
            return (
              <a href={token.content} target="_blank" className="gradient-text font-bold">
                {token.content}&nbsp;
              </a>
            )
          } else {
            return `${token.content} `
          }
        })

        return (
          <p key={index}>{wordsOrLinks}</p>
        );
      })}
    </div>
  )
};

export default FullView;
