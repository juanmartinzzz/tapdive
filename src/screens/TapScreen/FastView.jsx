import emojiData from '../../components/EmojiPicker/list.json';

const getWordsOrEmojis = ({ content }) => {
  return content.split(' ').map(word => {
    // If the word is an emoji
    if (emojiData.emojis.find(emoji => emoji.emoji === word)) {
      return <span className="text-white">{word}&nbsp;</span>;
    }

    return `${word} `;
  });
};
const FastView = ({ content, index }) => {
  return (
    <h1 className={`pb-1.5 font-bold ${index === 0 ? 'text-3xl md:text-5xl gradient-text' : 'text-2xl md:text-4xl'} leading-none`}>
      {getWordsOrEmojis({ content })}
    </h1>
  )
};

export default FastView;