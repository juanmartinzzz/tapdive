const getTapDate = ({timestamp}) => {
    const date = new Date(timestamp.seconds * 1000);

    const shouldShowYear = date.getFullYear() !== new Date().getFullYear();

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: shouldShowYear ? 'numeric' : undefined
    });
};

const string = {
  getTapDate,
}

export default string;