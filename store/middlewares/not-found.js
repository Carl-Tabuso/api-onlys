const notFound = (req, res, next) => res.status(404).send('Api route doesn\'t exist');

export default notFound;