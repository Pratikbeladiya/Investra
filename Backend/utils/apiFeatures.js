class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sort() {
    this.query = this.query.sort('-createdAt');
    return this;
  }
}
module.exports = APIFeatures;
