import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import APINYT from "../../utils/APINYT";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, Date, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startDate: "",
    endDate: ""
  };

  // componentDidMount() {
  //   this.loadSavedArticles();
  // }

  // loadNYTArticles = () => {
  //   APINYT.getArticlesfromAPI(this.state.topic, this.state.startDate, this.state.endDate)
  //     // .then(res =>
  //     //  console.log(res.body)
  //     // )
  //     // .catch(err => console.log(err));
  // };
  
  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", url: "", date: "" })
      )
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  removeArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startDate) {
      APINYT.getArticlesfromAPI(this.state.topic, this.state.startDate, this.state.endDate)
      //   API.getArticles({
    //     topic: this.state.topic,
    //     startDate: this.state.startDate,
    //     endDate: this.state.endDate
    //   })
    //     .then(res => this.loadArticles())
    //     .catch(err => console.log(err));
      console.log(this.state);  
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>NYT Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Date
                value={this.state.startDate}
                onChange={this.handleInputChange}
                name="startDate"
                placeholder="Start Date (required)"
              />
              <Date
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                placeholder="End Date (Required)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startDate && this.state.endDate)}
                onClick={this.handleFormSubmit}
              >
                Search for Articles
              </FormBtn>
            </form>
          </Col>
          </Row>
          <Row>
            <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} url: {article.url}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => this.saveArticle(article._data)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
          <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} url: {article.url}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
